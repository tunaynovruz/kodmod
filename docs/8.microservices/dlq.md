---
draft: true
title: Ölü Məktub Növbəsi (Dead Letter Queue)
description: Mikroservis mühitində Ölü Məktub Növbəsi (DLQ) konsepti, tətbiqi və faydaları
slug: /mikroservisler/dlq
authors: [tunay]
sidebar_position: 8
---

# Ölü Məktub Növbəsi (Dead Letter Queue)

## Ölü Məktub Növbəsi Nədir?

Ölü Məktub Növbəsi (Dead Letter Queue, DLQ), emal edilə bilməyən və ya uğursuz olan mesajların saxlanıldığı xüsusi bir növbədir. Bu, mikroservis mühitində etibarlı mesaj mübadiləsi üçün vacib bir mexanizmdir.

## DLQ-nin Məqsədi

DLQ-nin əsas məqsədləri:

1. **Mesaj itkisinin qarşısını almaq**: Emal edilə bilməyən mesajlar itmir, əksinə sonrakı analiz və ya yenidən emal üçün saxlanılır
2. **Sistem dayanıqlılığını artırmaq**: Problemli mesajlar əsas emal axınından kənarlaşdırılır, beləliklə sistemin qalan hissəsi normal işləməyə davam edə bilir
3. **Problemlərin aşkarlanması və diaqnostikası**: DLQ-də toplanan mesajlar, sistemdəki problemlərin müəyyən edilməsi və analizi üçün dəyərli məlumat mənbəyidir

## DLQ-nin İşləmə Mexanizmi

Tipik DLQ mexanizmi aşağıdakı kimi işləyir:

1. Mesaj əsas növbəyə daxil olur
2. İstehlakçı mesajı emal etməyə çalışır
3. Əgər emal uğursuz olarsa (məsələn, xəta baş verərsə və ya vaxt bitərsə):
   - Mesaj bir neçə dəfə təkrar emal edilməyə cəhd edilir (retry mexanizmi)
   - Təkrar cəhdlər də uğursuz olarsa, mesaj DLQ-yə göndərilir
4. DLQ-dəki mesajlar:
   - Manual müdaxilə ilə analiz edilə bilər
   - Avtomatik olaraq yenidən emal edilə bilər
   - Arxivlənə və ya silinə bilər

## DLQ Tətbiq Strategiyaları

### 1. Retry Mexanizmi ilə İnteqrasiya

DLQ-dən əvvəl adətən retry mexanizmi tətbiq edilir:

```
Mesaj → [Əsas Növbə] → [İstehlakçı] → Xəta
                           ↓
                      [Retry Mexanizmi] → Uğursuz → [DLQ]
                           ↓
                         Uğurlu
                           ↓
                      [Emal Tamamlandı]
```

Retry strategiyaları:
- **Immediate retry**: Dərhal təkrar cəhd
- **Fixed delay**: Sabit gecikmə ilə təkrar cəhd
- **Exponential backoff**: Hər uğursuz cəhddən sonra gözləmə müddəti artır
- **Retry with jitter**: Təsadüfi gecikmə əlavə edilir (yük balanslaşdırması üçün)

### 2. DLQ Monitorinqi və Bildirişlər

DLQ-nin effektiv istifadəsi üçün monitorinq vacibdir:
- DLQ-yə daxil olan mesajların sayı və tezliyi izlənilir
- Müəyyən hədd aşıldıqda avtomatik bildirişlər göndərilir
- Xəta növləri və trendləri analiz edilir

### 3. Avtomatik və Manual Yenidən Emal

DLQ-dəki mesajlar üçün yenidən emal strategiyaları:

- **Manual yenidən emal**: Operator mesajları analiz edir və problemləri həll etdikdən sonra yenidən emal üçün göndərir
- **Avtomatik yenidən emal**: Müəyyən şərtlər altında (məsələn, sistem yükü az olduqda) mesajlar avtomatik olaraq yenidən əsas növbəyə qaytarılır
- **Tədricən yenidən emal**: DLQ-dəki mesajlar kiçik partiyalarla yenidən emal edilir ki, sistem yüklənməsin

## Populyar Mesaj Brokerlərində DLQ

### Apache Kafka

Kafka-da DLQ tətbiqi:
```
// Kafka-da DLQ tətbiqi
Properties props = new Properties();
props.put("enable.auto.commit", false);
props.put("max.poll.records", 1);

// DLQ mövzusu yaratmaq
final String DLQ_TOPIC = "orders-dlq";

// Mesaj emalı
try {
    // Normal emal...
    consumer.commitSync();
} catch (Exception e) {
    // DLQ-yə göndərmək
    ProducerRecord record = new ProducerRecord(DLQ_TOPIC, key, value);
    producer.send(record);
    consumer.commitSync();
    log.error("Mesaj DLQ-yə göndərildi: " + e.getMessage());
}
```

### RabbitMQ

RabbitMQ-da DLQ konfiqurasiyası:
```
// RabbitMQ-da DLQ konfiqurasiyası
// DLQ və əsas növbə yaratmaq
Map args = new HashMap();
args.put("x-dead-letter-exchange", "dlx");
args.put("x-dead-letter-routing-key", "dlq");
channel.queueDeclare("main-queue", true, false, false, args);

// DLQ üçün exchange və növbə
channel.exchangeDeclare("dlx", "direct");
channel.queueDeclare("dlq", true, false, false, null);
channel.queueBind("dlq", "dlx", "dlq");
```

### Amazon SQS

AWS SQS-də DLQ konfiqurasiyası:
```
// AWS SQS-də DLQ konfiqurasiyası
// DLQ yaratmaq
CreateQueueRequest dlqRequest = new CreateQueueRequest("MyDeadLetterQueue");
String dlqUrl = sqs.createQueue(dlqRequest).getQueueUrl();
String dlqArn = sqs.getQueueAttributes(dlqUrl, "QueueArn")
    .getAttributes().get("QueueArn");

// Əsas növbəni DLQ ilə əlaqələndirmək
Map attributes = new HashMap();
attributes.put("RedrivePolicy", 
    "{\"maxReceiveCount\":\"5\", \"deadLetterTargetArn\":\"" + dlqArn + "\"}");
CreateQueueRequest request = new CreateQueueRequest("MyQueue");
request.setAttributes(attributes);
sqs.createQueue(request);
```

## DLQ-nin Üstünlükləri

- **Dayanıqlılıq**: Problemli mesajlar sistemin qalan hissəsini bloklamır
- **Məlumat itkisinin qarşısını alma**: Heç bir mesaj itmir
- **Debugging imkanları**: Xətaların səbəbini analiz etmək üçün tam məlumat
- **Sistem sağlamlığının monitorinqi**: DLQ-yə daxil olan mesajların sayı sistem sağlamlığının göstəricisidir

## DLQ-nin Çətinlikləri və Həll Yolları

### Çətinliklər:

1. **DLQ-nin dolması**: Uzun müddət diqqət yetirilməyən DLQ dola bilər
2. **Köhnə mesajlar**: DLQ-də qalan mesajlar vaxt keçdikcə aktual olmaya bilər
3. **Təkrarlanan uğursuz emal**: Eyni mesajlar dəfələrlə uğursuz ola bilər
4. **Sıra pozulması**: Mesajların emal sırası pozula bilər

### Həll Yolları:

1. **TTL (Time-to-Live)**: DLQ-dəki mesajlar üçün yaşam müddəti təyin etmək
2. **Poison message handler**: Dəfələrlə uğursuz olan "zəhərli" mesajları ayrıca emal etmək
3. **Circuit breaker**: Sistemin bir hissəsi problemlidirsə, müvəqqəti olaraq mesaj axınını dayandırmaq
4. **Mesaj prioritetləşdirmə**: Kritik mesajlara daha yüksək prioritet vermək

## Nümunə Tətbiq Ssenarilərı

1. **Ödəniş sistemi**:
   - Uğursuz ödəniş əməliyyatları DLQ-yə göndərilir
   - Maliyyə komandası manual olaraq problemləri araşdırır
   - Düzəldilmiş mesajlar yenidən emal üçün göndərilir

2. **E-ticarət inventar sistemi**:
   - İnventar yeniləmə əməliyyatları uğursuz olduqda DLQ-yə göndərilir
   - Avtomatik sistem gecə saatlarında yenidən emal edir
   - Kritik məhsullar üçün dərhal bildiriş göndərilir

3. **Telemetriya sistemi**:
   - Sensor məlumatları emal edilə bilmədikdə DLQ-yə göndərilir
   - Məlumatlar aqreqasiya edilir və trend analizi aparılır
   - Yalnız anomaliyalar manual müdaxilə tələb edir

