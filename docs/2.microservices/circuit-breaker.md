---
draft: true
title: Circuit Breaker Pattern
description: Mikroservislardə Circuit Breaker Pattern-nin ətraflı izahı və tətbiqi
slug: circuit-breaker-pattern 
tags: [mikroservislər, circuit-breaker, fault-tolerance, distributed-systems]
keywords: [circuit breaker, mikroservice, fault tolerance, sistem dayanıqlığı]
hide_table_of_contents: false
---

# Circuit Breaker Pattern

## Giriş

Circuit Breaker pattern mikroservislər üçün təhlükəsizlik açarı kimi işləyir. Təsəvvür edin ki, payment service-dən asılı olan onlayn mağazanız var. Əgər bu payment service davamlı olaraq fail olmağa başlayırsa, mağazanızın onu dəfələrlə əlaqə saxlamağa çalışması əvəzinə (bu vəziyyəti daha da pisləşdirə bilər), circuit breaker "işə düşür" və müəyyən müddətə sonrakı cəhdləri dayandırır.

## Circuit Breaker Pattern Nədir?

Remote call-lar in-memory call-lardan fərqli olaraq fail ola və ya müəyyən timeout limitinə qədər cavabsız qala bilər. Daha pis olan odur ki, response verməyən supplier-də çoxlu caller varsa, kritik resurslar tükənə bilər və bu da çoxlu sistemlərdə cascading failure-lara səbəb ola bilər.

Michael Nygard öz "Release It" kitabında bu cür fəlakətli cascade-ın qarşısını almaq üçün Circuit Breaker pattern-ni məşhurlaşdırdı.

## Circuit Breaker Pattern-nin Əsas Prinsipi

Circuit Breaker-in əsas ideyası çox sadədir. Siz protected function call-u failure-ları monitor edən circuit breaker obyektinə wrap edirsiniz. Failure-lar müəyyən threshold-a çatdıqda, circuit breaker "trip" olur və protected call heç edilmədən bütün sonrakı call-lar error ilə return edilir.

## Example ilə Başa Düşmək

Gəlin circuit breaker pattern-ni bir example ilə başa düşək:

1. **Normal Vəziyyət**: Mağazanız payment service-ə payment process etmək üçün request göndərir. Hər şey yaxşı işləyir.

2. **Problem Yaranması**: Birdən payment service-də problem yaranır və ardıcıl üç dəfə fail olur.

3. **Circuit Breaker Open Olur**: Circuit breaker "open" state-ə keçir. İndi mağazanız payment service-ə müraciət etməyə çalışdıqda, yenidən connection qurmağa çalışmaq əvəzinə dərhal error response alır.

4. **Half-Open State**: Müəyyən müddətdən sonra circuit breaker "half-open" state-ə keçir. Payment service-nin yenidən online olub-olmadığını yoxlamaq üçün bir neçə test request-ə icazə verir.

5. **Recovery**: Əgər bu request-lər successful olarsa, circuit breaker "closed" state-ə qayıdır və hər şey normal vəziyyətə dönür. Əgər fail olarsa, daha çox müddət open qalır.

## Circuit Breaker Pattern-nin Xüsusiyyətləri

- **Fault Tolerance**: Ayrı-ayrı service-lərdə failure-ları isolate edərək və manage edərək sistemin dayanıqlığını artırır
- **Real-time Monitoring**: Service-lər arasında interaction-ları davamlı monitor edərək problem-ləri real-time detect edir
- **Cascading Failure Prevention**: Failing service-lərə request-ları temporarily dayandıraraq cascading failure-ların qarşısını alır
- **Graceful Degradation**: Service failure-ları zamanı client-lərə fallback response-lar təqdim edir
- **Automatic Recovery**: Failing service recover olunduqda automatically normal operation rejiminə qayıdır

## Circuit Breaker State-ləri

### 1. Closed State

- Circuit breaker normal şəkildə işləyir və request-ların service-lər arasında keçməsinə icazə verir
- Bu mərhələdə circuit breaker response time-lar, error rate-lər və ya timeout-lar kimi metrics toplayaraq downstream service-in health-ini monitor edir

### 2. Open State

- Monitor edilən metrics əvvəlcədən müəyyən edilmiş threshold-ləri aşdığında, circuit breaker "Open" state-ə keçir
- Open state-də circuit breaker failing service-ə request-ları dərhal stop edir
- Bu, cascading failure-ların qarşısını alır və system stability-ni saxlayır

### 3. Half-Open State

- Open state-də müəyyən timeout müddətindən sonra half-open state-ə keçir
- Downstream service-ə limited sayda trial request-lərin keçməsinə icazə verir
- Service-nin recover olunub-olunmadığını müəyyən etmək üçün response-ları monitor edir
- Trial request-lər successful olarsa, closed state-ə qayıdır
- Fail olarsa, yenidən open state-ə keçir

## State-lər Arasında Transition

## Circuit Breaker Pattern-nin Implementation-u

### Step 1: Dependency-ləri Müəyyən Etmək
Mikroservice-nin functional olması üçün lazım olan external service-ləri müəyyən edin.

### Step 2: Circuit Breaker Library Seçmək
Programming dilinizə və platform-a uyğun circuit breaker library seçin.

### Step 3: Circuit Breaker-i Code-a Integrate Etmək
Seçdiyiniz circuit breaker library-ni mikroservice code base-inə əlavə edin.

### Step 4: Failure Threshold-larını Define Etmək
Circuit breaker-in open state-ə keçməsi üçün failure və timeout threshold-larını set edin.

### Step 5: Fallback Mechanism-lərini Implement Etmək
Circuit breaker open olduqda istifadə ediləcək fallback mechanism-lərini təmin edin.

### Step 6: Circuit Breaker Metrics-lərini Monitor Etmək
Service-lərinizin health-ini və behavior-unu görmək üçün circuit breaker statistics-lərini monitor edin.

### Step 7: Configuration Parameter-lərini Tune Etmək
Timeout-lar, threshold-lar və retry method-larını mikroservice-lərinizin behavior-una uyğun tune edin.

### Step 8: Circuit Breaker Behavior-unu Test Etmək
Müxtəlif scenario-larda circuit breaker-in behavior-unu test edin.

### Step 9: Deploy və Monitoring
Mikroservice-inizi circuit breaker ilə production environment-a deploy edin.

## Üstünlüklər

- **System Reliability**: Ayrı-ayrı component-lərin failure-inin bütün sistemə təsirini minimize edir
- **Resource Protection**: Failing service-lərə unnecessary request-lər göndərməməklə system resource-larını protect edir
- **Fast Failure**: Uzun timeout gözləmək əvəzinə fast failure təmin edir
- **Automatic Recovery**: Service recover olunduqda automatically normal rejimdə işləməyə qayıdır

## Nəzərə Alınacaq Məsələlər

- **Fallback Strategy**: Uyğun fallback mechanism-lərinin hazırlanması vacibdir
- **Monitoring**: Circuit breaker-in state-ini və performance-ını davamlı monitor etmək lazımdır
- **Configuration**: Threshold-lar və timeout-lar düzgün configure edilməlidir
- **Testing**: Müxtəlif scenario-larda test edilməlidir

## Nəticə

Circuit Breaker Pattern mikroservice architecture-da system reliability-ni təmin etmək üçün vacib bir pattern-dir. Düzgün implement edildikdə, sistemin overall performance-ını və reliability-ni əhəmiyyətli dərəcədə improve edir.
