---
title: Saga Nümunəsi
description: Mikroservis mühitində paylanmış tranzaksiyaların idarə edilməsi üçün Saga nümunəsi
slug: /mikroservisler/saga
authors: [tunay]
sidebar_position: 4
---

# Saga Nümunəsi

## Saga Nümunəsi Nədir?

Saga nümunəsi, mikroservis arxitekturasında paylanmış tranzaksiyaları idarə etmək üçün istifadə olunan bir dizayn nümunəsidir. Bu nümunə, bir neçə mikroservis arasında yayılmış biznes əməliyyatlarını koordinasiya etmək və hər hansı bir addımda xəta baş verdikdə sistemin ardıcıl vəziyyətini qorumaq üçün mexanizm təqdim edir.

## Problem: Paylanmış Tranzaksiyalar

Monolitik tətbiqlərdə, ACID (Atomicity, Consistency, Isolation, Durability) xüsusiyyətlərinə malik olan ənənəvi verilənlər bazası tranzaksiyaları istifadə edilir. Lakin mikroservis mühitində, hər servisin öz verilənlər bazası olduğundan, bir biznes əməliyyatı bir neçə servis və verilənlər bazası arasında paylanır.

Bu mühitdə ənənəvi iki fazalı commit (2PC) protokolu aşağıdakı səbəblərə görə problemlidir:

- Yüksək əlaqə (tight coupling) yaradır
- Bloklaşdırıcıdır (blocking)
- Performans problemləri yaradır
- Bütün servislər eyni zamanda əlçatan olmalıdır

## Həll: Saga Nümunəsi

Saga, paylanmış bir tranzaksiyanı bir sıra lokal tranzaksiyalara bölür. Hər lokal tranzaksiya bir servis tərəfindən yerinə yetirilir və nəticəsini (uğurlu və ya uğursuz) digər servislərə bildirir. Əgər bir lokal tranzaksiya uğursuz olarsa, əvvəlki tranzaksiyaların təsirini ləğv etmək üçün kompensasiya tranzaksiyaları (compensating transactions) icra edilir.

### Saga-nın Əsas Komponentləri

1. **Lokal Tranzaksiyalar**: Hər servis tərəfindən icra edilən ayrı-ayrı əməliyyatlar
2. **Hadisələr (Events)**: Lokal tranzaksiyaların nəticələrini bildirmək üçün istifadə olunur
3. **Kompensasiya Tranzaksiyaları**: Xəta halında əvvəlki əməliyyatları geri qaytarmaq üçün istifadə olunur

### Saga İmplementasiya Üsulları

#### 1. Xoreoqrafiya (Choreography) Əsaslı Saga

Xoreoqrafiya əsaslı yanaşmada, servislər bir-biri ilə birbaşa hadisələr vasitəsilə əlaqə qurur. Hər servis müəyyən hadisələrə abunə olur və öz lokal tranzaksiyasını icra etdikdən sonra digər hadisələr yayımlayır.

**Diaqram**:
```
Sifariş Servisi ---> [SifarişYaradıldı] ---> Ödəniş Servisi ---> [ÖdənişTamamlandı] ---> İnventar Servisi ---> [MəhsullarAyrıldı] ---> Çatdırılma Servisi
       ^                                           |
       |                                           | [ÖdənişUğursuz]
       |                                           v
       +-------------------------- [SifarişLəğvEdildi] 
```

**Üstünlükləri**:
- Zəif əlaqə (loose coupling)
- Sadə dizayn
- Mərkəzi koordinasiya nöqtəsi yoxdur
- Yeni servislər asanlıqla əlavə edilə bilər

**Çatışmazlıqları**:
- Mürəkkəb iş axınlarını izləmək çətindir
- Dövrələri aşkar etmək çətindir
- Debugging çətindir
- Hadisə asılılıqlarını idarə etmək çətinləşir

**Nümunə Kod** (Spring Cloud Stream ilə):
```java
// Sifariş Servisi
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final StreamBridge streamBridge;

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order(request);
        orderRepository.save(order);

        // Hadisə yayımla
        streamBridge.send("orderCreated-out-0", 
            new OrderCreatedEvent(order.getId(), order.getCustomerId(), order.getAmount()));

        return order;
    }

    @Transactional
    @StreamListener(target = "paymentFailed-in-0")
    public void handlePaymentFailed(PaymentFailedEvent event) {
        Order order = orderRepository.findById(event.getOrderId())
            .orElseThrow(() -> new OrderNotFoundException(event.getOrderId()));

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        // Sifariş ləğv edildi hadisəsi yayımla
        streamBridge.send("orderCancelled-out-0", 
            new OrderCancelledEvent(order.getId()));
    }
}

// Ödəniş Servisi
@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final StreamBridge streamBridge;

    @Transactional
    @StreamListener(target = "orderCreated-in-0")
    public void processPayment(OrderCreatedEvent event) {
        try {
            Payment payment = new Payment(event.getOrderId(), event.getAmount());
            paymentRepository.save(payment);

            // Ödəniş gateway ilə əməliyyat
            boolean paymentSuccess = paymentGateway.processPayment(payment);

            if (paymentSuccess) {
                payment.setStatus(PaymentStatus.COMPLETED);
                paymentRepository.save(payment);

                // Uğurlu ödəniş hadisəsi yayımla
                streamBridge.send("paymentCompleted-out-0", 
                    new PaymentCompletedEvent(event.getOrderId(), payment.getId()));
            } else {
                throw new PaymentFailedException("Payment processing failed");
            }
        } catch (Exception e) {
            // Uğursuz ödəniş hadisəsi yayımla
            streamBridge.send("paymentFailed-out-0", 
                new PaymentFailedEvent(event.getOrderId(), e.getMessage()));
        }
    }
}
```

#### 2. Orkestrləşdirmə (Orchestration) Əsaslı Saga

Orkestrləşdirmə əsaslı yanaşmada, mərkəzi bir koordinator (orkestrator) bütün tranzaksiya addımlarını idarə edir. Orkestrator hər servisə komandalar göndərir və cavabları qəbul edir.

**Diaqram**:
```
                  +---> Sifariş Servisi
                  |
                  |
Saga Orkestratoru +---> Ödəniş Servisi
                  |
                  |
                  +---> İnventar Servisi
                  |
                  |
                  +---> Çatdırılma Servisi
```

**Üstünlükləri**:
- Mürəkkəb iş axınlarını idarə etmək asandır
- Mərkəzləşdirilmiş monitorinq və debugging
- Daha az hadisə asılılığı
- Daha yaxşı görünürlük və izlənilmə

**Çatışmazlıqları**:
- Mərkəzi nöqtə uğursuzluğu (single point of failure) riski
- Daha sıx əlaqə (tighter coupling)
- Orkestrator mürəkkəbliyi
- Yeni servislər əlavə etmək üçün orkestratoru dəyişdirmək lazımdır

**Nümunə Kod** (Spring Statemachine ilə):
```java
// Saga Orkestratoru
@Service
public class OrderSagaOrchestrator {

    private final StateMachineFactory<OrderSagaState, OrderSagaEvent> stateMachineFactory;
    private final OrderService orderService;
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    private final DeliveryService deliveryService;

    public String createOrder(OrderRequest request) {
        // Yeni sifariş yarat
        String orderId = orderService.createOrder(request);

        // Saga state machine başlat
        StateMachine<OrderSagaState, OrderSagaEvent> stateMachine = 
            stateMachineFactory.getStateMachine(orderId);

        stateMachine.start();

        // State machine-ə sifarişin yaradıldığını bildir
        stateMachine.sendEvent(MessageBuilder
            .withPayload(OrderSagaEvent.ORDER_CREATED)
            .setHeader("orderId", orderId)
            .build());

        return orderId;
    }

    @Bean
    public StateMachineListener<OrderSagaState, OrderSagaEvent> listener() {
        return new StateMachineListenerAdapter<OrderSagaState, OrderSagaEvent>() {
            @Override
            public void stateChanged(State<OrderSagaState, OrderSagaEvent> from, 
                                    State<OrderSagaState, OrderSagaEvent> to) {
                log.info("State changed from {} to {}", from == null ? "NONE" : from.getId(), to.getId());
            }
        };
    }

    @Bean
    public StateMachineConfiguration<OrderSagaState, OrderSagaEvent> config() {
        StateMachineTransitionConfigurer<OrderSagaState, OrderSagaEvent> transitions = 
            new StateMachineTransitionConfigurerAdapter<OrderSagaState, OrderSagaEvent>() {
                @Override
                public void configure(StateMachineTransitionConfigurer<OrderSagaState, OrderSagaEvent> transitions) 
                    throws Exception {
                    transitions
                        .withExternal()
                            .source(OrderSagaState.STARTED)
                            .target(OrderSagaState.ORDER_CREATED)
                            .event(OrderSagaEvent.ORDER_CREATED)
                            .action(orderCreatedAction())
                        .and()
                        .withExternal()
                            .source(OrderSagaState.ORDER_CREATED)
                            .target(OrderSagaState.PAYMENT_COMPLETED)
                            .event(OrderSagaEvent.PAYMENT_COMPLETED)
                            .action(paymentCompletedAction())
                        .and()
                        .withExternal()
                            .source(OrderSagaState.PAYMENT_COMPLETED)
                            .target(OrderSagaState.INVENTORY_ALLOCATED)
                            .event(OrderSagaEvent.INVENTORY_ALLOCATED)
                            .action(inventoryAllocatedAction())
                        .and()
                        .withExternal()
                            .source(OrderSagaState.INVENTORY_ALLOCATED)
                            .target(OrderSagaState.DELIVERY_SCHEDULED)
                            .event(OrderSagaEvent.DELIVERY_SCHEDULED)
                            .action(deliveryScheduledAction())
                        .and()
                        .withExternal()
                            .source(OrderSagaState.DELIVERY_SCHEDULED)
                            .target(OrderSagaState.SAGA_COMPLETED)
                            .event(OrderSagaEvent.SAGA_COMPLETED)
                        // Kompensasiya keçidləri...
                        .and()
                        .withExternal()
                            .source(OrderSagaState.PAYMENT_COMPLETED)
                            .target(OrderSagaState.PAYMENT_FAILED)
                            .event(OrderSagaEvent.PAYMENT_FAILED)
                            .action(paymentFailedAction());
                }
            };

        return new StateMachineConfiguration<>(transitions);
    }

    @Bean
    public Action<OrderSagaState, OrderSagaEvent> orderCreatedAction() {
        return context -> {
            String orderId = (String) context.getMessageHeader("orderId");
            try {
                // Ödəniş prosesini başlat
                paymentService.processPayment(orderId);
                context.getStateMachine().sendEvent(MessageBuilder
                    .withPayload(OrderSagaEvent.PAYMENT_COMPLETED)
                    .setHeader("orderId", orderId)
                    .build());
            } catch (Exception e) {
                context.getStateMachine().sendEvent(MessageBuilder
                    .withPayload(OrderSagaEvent.PAYMENT_FAILED)
                    .setHeader("orderId", orderId)
                    .setHeader("error", e.getMessage())
                    .build());
            }
        };
    }

    // Digər action metodları...
}
```

## Saga Nümunəsinin Tətbiqi

### Tranzaksiya Sərhədləri

Saga nümunəsində, hər lokal tranzaksiya bir servis daxilində icra edilir və ACID xüsusiyyətlərinə malikdir. Lakin ümumi saga yalnız eventual consistency (gec-tez ardıcıllıq) təmin edir.

### İdempotentlik

Saga nümunəsində, eyni hadisənin bir neçə dəfə emal edilməsi halında sistemin düzgün işləməsini təmin etmək üçün idempotentlik vacibdir. Bunu təmin etmək üçün:

- Unikal hadisə identifikatorları istifadə edin
- Emal edilmiş hadisələri izləyin
- İdempotent əməliyyatlar dizayn edin

### Kompensasiya Tranzaksiyaları

Kompensasiya tranzaksiyaları, xəta halında əvvəlki əməliyyatların təsirini ləğv etmək üçün istifadə olunur. Hər lokal tranzaksiya üçün bir kompensasiya tranzaksiyası olmalıdır.

**Nümunə**:
- Lokal tranzaksiya: `createOrder()`
- Kompensasiya: `cancelOrder()`

- Lokal tranzaksiya: `processPayment()`
- Kompensasiya: `refundPayment()`

- Lokal tranzaksiya: `allocateInventory()`
- Kompensasiya: `releaseInventory()`

### Saga Vəziyyətinin Saxlanması

Saga-nın cari vəziyyətini saxlamaq üçün bir neçə üsul var:

1. **Verilənlər bazasında saxlama**: Saga vəziyyəti və addımları verilənlər bazasında saxlanılır
2. **Event Sourcing**: Saga hadisələri ardıcıl olaraq saxlanılır və cari vəziyyət bu hadisələrdən yenidən qurulur
3. **State Machine**: Saga bir state machine kimi modelləşdirilir və vəziyyət keçidləri idarə olunur

## Saga vs. İki Fazalı Commit (2PC)

| Xüsusiyyət | Saga | İki Fazalı Commit (2PC) |
|------------|------|--------------------------|
| **Ardıcıllıq** | Eventual Consistency | Strong Consistency |
| **Bloklaşdırma** | Bloklaşdırmır | Bloklaşdırır |
| **Miqyaslanma** | Yaxşı miqyaslanır | Məhdud miqyaslanma |
| **Əlaqə** | Zəif əlaqə | Sıx əlaqə |
| **Xəta Bərpası** | Kompensasiya tranzaksiyaları | Avtomatik rollback |
| **Mürəkkəblik** | Daha mürəkkəb | Nisbətən sadə |

## Saga Nümunəsinin Tətbiq Ssenarilərı

### 1. E-ticarət Sifarişi

**Addımlar**:
1. Sifariş yaradılır
2. Ödəniş emal edilir
3. İnventar ayrılır
4. Çatdırılma planlaşdırılır

**Kompensasiya**:
- Əgər ödəniş uğursuz olarsa: Sifarişi ləğv et
- Əgər inventar ayrılması uğursuz olarsa: Ödənişi geri qaytar və sifarişi ləğv et
- Əgər çatdırılma planlaşdırılması uğursuz olarsa: İnventarı azad et, ödənişi geri qaytar və sifarişi ləğv et

### 2. Səyahət Rezervasiyası

**Addımlar**:
1. Səyahət rezervasiyası yaradılır
2. Uçuş biletləri rezerv edilir
3. Otel rezerv edilir
4. Avtomobil kirayəsi rezerv edilir
5. Ödəniş emal edilir

**Kompensasiya**:
- Əgər otel rezervasiyası uğursuz olarsa: Uçuş biletlərini ləğv et
- Əgər avtomobil kirayəsi uğursuz olarsa: Otel və uçuş rezervasiyalarını ləğv et
- Əgər ödəniş uğursuz olarsa: Bütün rezervasiyaları ləğv et

## Saga Nümunəsinin Tətbiqində Qarşılaşılan Problemlər və Həll Yolları

### 1. İzolasiya Problemi

Saga-lar ACID tranzaksiyalarının "I" (İzolasiya) xüsusiyyətini təmin etmir. Bu, "dirty read" (çirkli oxuma) problemlərinə səbəb ola bilər.

**Həll Yolları**:
- **Semantik kilid (Semantic Lock)**: Dəyişdirilən məlumatları "emal olunur" kimi işarələyin
- **Kommutativ yeniləmələr (Commutative Updates)**: Əməliyyatları sıradan asılı olmayacaq şəkildə dizayn edin
- **Pessimist görünüş (Pessimistic View)**: İstifadəçilərə yalnız tamamlanmış tranzaksiyaları göstərin
- **Reread value (Dəyəri yenidən oxuma)**: Əməliyyatdan əvvəl dəyəri yenidən oxuyun

### 2. Saga Koordinasiyası Problemi

Xüsusilə xoreoqrafiya əsaslı saga-larda, hadisələrin idarə edilməsi və izlənilməsi çətin ola bilər.

**Həll Yolları**:
- **Saga Log**: Bütün saga addımlarını və vəziyyətini qeyd edin
- **Saga Monitorinq**: Saga-ların icrasını izləmək üçün monitorinq alətləri istifadə edin
- **Distributed Tracing**: Paylanmış izləmə alətləri ilə saga addımlarını izləyin

### 3. Xəta Bərpası Problemi

Kompensasiya tranzaksiyaları özləri də uğursuz ola bilər.

**Həll Yolları**:
- **Retry Mexanizmi**: Uğursuz kompensasiya tranzaksiyalarını təkrarlayın
- **Manual Müdaxilə**: Kritik hallarda manual müdaxilə üçün mexanizm təmin edin
- **Dead Letter Queue**: Uğursuz kompensasiya hadisələrini DLQ-yə göndərin

## Nəticə

Saga nümunəsi, mikroservis mühitində paylanmış tranzaksiyaları idarə etmək üçün güclü bir həll təqdim edir. Bu nümunə, ənənəvi ACID tranzaksiyalarının məhdudiyyətlərini aşmağa və mikroservislərin muxtariyyətini qorumağa imkan verir.

Xoreoqrafiya və orkestrləşdirmə yanaşmalarının hər birinin öz üstünlükləri və çatışmazlıqları var. Tətbiqin mürəkkəbliyi, komandanın təcrübəsi və texnoloji stack kimi faktorlara əsaslanaraq ən uyğun yanaşmanı seçmək lazımdır.

Saga nümunəsini tətbiq edərkən, idempotentlik, kompensasiya tranzaksiyaları və vəziyyət idarəetməsi kimi aspektlərə xüsusi diqqət yetirmək vacibdir. Bu aspektlərin düzgün idarə edilməsi, dayanıqlı və etibarlı mikroservis sistemlərinin yaradılmasına kömək edir.
