# Verilənlər Bazası: Əlavə Mövzular

Bu sənəddə verilənlər bazası ilə bağlı müxtəlif əlavə mövzular və konsepsiyalar haqqında məlumat verilir.

## Məlumat Emalı Paradiqmaları

### Batch Processing (Toplu Emal)

- **Təsvir:** Böyük həcmli verilənlər qruplar halında, müəyyən vaxt intervallarında emal olunur.
- **Xüsusiyyətlər:**
  - Real-time emal tələb olunmur
  - Yüksək throughput
  - Adətən daha az resurs intensiv
  - Gecikmiş nəticələr (latency)
- **İstifadə sahələri:**
  - Gecə ərzində hesabatların hazırlanması
  - Billing sistemləri
  - Data warehouse yükləmələri
  - Böyük həcmli məlumat analizi
- **Texnologiyalar:** Hadoop MapReduce, Apache Spark Batch, ETL alətləri

### Stream Processing (Axın Emalı)

- **Təsvir:** Məlumat axını davamlı şəkildə, real vaxtda və ya ona yaxın vaxtda emal olunur.
- **Xüsusiyyətlər:**
  - Aşağı gecikmə (low latency)
  - Davamlı emal
  - Daha yüksək resurs tələbatı
  - Real-time nəticələr
- **İstifadə sahələri:**
  - Real-time analitika
  - Fırıldaqçılıq aşkarlanması
  - IoT məlumatlarının monitorinqi
  - Ticarət platformaları
- **Texnologiyalar:** Apache Kafka Streams, Apache Flink, Apache Storm

### Müqayisə

| Xüsusiyyət | Batch Processing | Stream Processing |
|------------|------------------|-------------------|
| Məlumat həcmi | Böyük paketlər | Kiçik hissələr (events) |
| Emal vaxtı | Periodik (saatlıq, günlük) | Davamlı (real-time) |
| Latency | Yüksək | Aşağı |
| Throughput | Yüksək | Orta |
| Mürəkkəblik | Nisbətən sadə | Daha mürəkkəb |
| Xəta dözümlülüyü | Yüksək (yenidən cəhd etmək asan) | Mürəkkəb (məlumat itkisi riski) |

## Consistency Modelləri

### Strong Consistency (Güclü Uyğunluq)

- **Təsvir:** Bütün oxunuşlar ən son yazılan məlumatı göstərir, bütün node-lar eyni məlumatı görür.
- **Xüsusiyyətlər:**
  - Yüksək data bütövlüyü
  - Aşağı availability
  - Yüksək latency
  - Partition tolerance-a qarşı həssas
- **İstifadə sahələri:**
  - Bank əməliyyatları
  - Rezervasiya sistemləri
  - Kritik biznes əməliyyatları
- **Texnologiyalar:** Relyasion verilənlər bazaları (PostgreSQL, MySQL), Consensus protokolları (Paxos, Raft)

### Eventual Consistency (Sonrakı Uyğunluq)

- **Təsvir:** Vaxt keçdikcə bütün nüsxələr uyğunlaşır, amma anlıq fərqlər ola bilər.
- **Xüsusiyyətlər:**
  - Yüksək availability
  - Aşağı latency
  - Yaxşı partition tolerance
  - Müvəqqəti uyğunsuzluqlar
- **İstifadə sahələri:**
  - Sosial media
  - Content delivery
  - Kataloq sistemləri
  - Yüksək miqyaslı web tətbiqləri
- **Texnologiyalar:** NoSQL bazaları (Cassandra, DynamoDB), DNS

### Digər Consistency Modelləri

- **Causal Consistency:** Səbəb-nəticə əlaqəsi olan əməliyyatlar düzgün sırada görünür.
- **Read-your-writes Consistency:** İstifadəçi öz yazdığı məlumatı həmişə görə bilir.
- **Session Consistency:** Bir sessiya daxilində strong consistency, sessiyalar arasında eventual consistency.
- **Monotonic Read Consistency:** Bir dəyəri oxuduqdan sonra, heç vaxt daha köhnə versiyasını görmürsən.

## Sistem Performansının Optimallaşdırılması

### Throughput-u Necə Yaxşılaşdırmaq Olar

Throughput, vahid zamanda emal edilən əməliyyatların sayıdır (məsələn, saniyədə sorğu sayı).

1. **Horizontal Scalability (Üfüqi Miqyaslanma):**
   - **Təsvir:** Yükü bölmək üçün əlavə serverlər əlavə etmək.
   - **Üstünlüklər:** Daha yaxşı miqyaslanabilirlik, daha yüksək fault tolerance.
   - **Tətbiq:** Sharding, replication, distributed sistemlər.
   - **Nümunə:** Read replica-lar əlavə etmək, database cluster qurmaq.

2. **Caching (Keşləmə):**
   - **Təsvir:** Tez-tez istifadə olunan məlumatları daha sürətli yaddaşda saxlamaq.
   - **Üstünlüklər:** Verilənlər bazasına yükü azaldır, sorğu cavab vaxtını qısaldır.
   - **Tətbiq:** In-memory cache, distributed cache, CDN.
   - **Nümunə:** Redis, Memcached, browser cache.

3. **Parallel Processing (Paralel Emal):**
   - **Təsvir:** Tapşırıqları eyni zamanda bir neçə thread və ya proses vasitəsilə icra etmək.
   - **Üstünlüklər:** CPU resurslarından daha yaxşı istifadə, daha sürətli emal.
   - **Tətbiq:** Multi-threading, distributed computing.
   - **Nümunə:** Map-reduce əməliyyatları, paralel sorğu emalı.

4. **Database Optimization (Verilənlər Bazası Optimallaşdırması):**
   - **Təsvir:** Verilənlərin saxlanmasını və çıxarılmasını optimallaşdırmaq.
   - **Üstünlüklər:** Daha sürətli sorğular, daha effektiv resurs istifadəsi.
   - **Tətbiq:** Indexing, partitioning, sharding, query optimization.
   - **Nümunə:** Sorğu planlarının analizi, indekslərin yaradılması.

5. **Asynchronous Processing (Asinxron Emal):**
   - **Təsvir:** Dərhal tamamlanması tələb olunmayan əməliyyatları asinxron icra etmək.
   - **Üstünlüklər:** Əsas thread-i bloklamamaq, daha yaxşı istifadəçi təcrübəsi.
   - **Tətbiq:** Message queues, event-driven architecture.
   - **Nümunə:** RabbitMQ, Apache Kafka, background jobs.

### Latency-ni Necə Azaltmaq Olar

Latency, bir əməliyyatın başlanğıcından tamamlanmasına qədər keçən vaxtdır.

1. **Network Optimization (Şəbəkə Optimallaşdırması):**
   - **Təsvir:** Şəbəkə gecikmələrini minimuma endirmək.
   - **Üstünlüklər:** Daha sürətli məlumat ötürülməsi, daha az gözləmə vaxtı.
   - **Tətbiq:** CDN, edge computing, coğrafi sharding.
   - **Nümunə:** CloudFlare, AWS CloudFront, istifadəçilərə yaxın serverlərdən xidmət göstərmək.

2. **Hardware Improvements (Aparat Təkmilləşdirmələri):**
   - **Təsvir:** Daha sürətli aparat komponentlərindən istifadə.
   - **Üstünlüklər:** Daha sürətli hesablama və yaddaş əməliyyatları.
   - **Tətbiq:** SSD, daha çox RAM, daha sürətli CPU.
   - **Nümunə:** NVMe SSD-lərə keçid, server RAM-ını artırmaq.

3. **Database Query Optimization (Verilənlər Bazası Sorğu Optimallaşdırması):**
   - **Təsvir:** Sorğuları daha effektiv icra etmək üçün optimallaşdırmaq.
   - **Üstünlüklər:** Daha sürətli sorğu nəticələri, daha az resurs istifadəsi.
   - **Tətbiq:** İndekslər, sorğu planları, denormalization.
   - **Nümunə:** EXPLAIN əmri ilə sorğuları analiz etmək, uyğun indekslər yaratmaq.

4. **In-Memory Computing (Yaddaşda Hesablama):**
   - **Təsvir:** Məlumatları diskdən oxumaq əvəzinə RAM-da saxlamaq.
   - **Üstünlüklər:** Disk I/O-nu aradan qaldırmaq, daha sürətli giriş.
   - **Tətbiq:** In-memory verilənlər bazaları, caching.
   - **Nümunə:** Redis, Memcached, SAP HANA.

5. **Code Optimization (Kod Optimallaşdırması):**
   - **Təsvir:** Tətbiq kodunu daha effektiv işləmək üçün optimallaşdırmaq.
   - **Üstünlüklər:** Daha az CPU və yaddaş istifadəsi, daha sürətli icra.
   - **Tətbiq:** Alqoritm seçimi, memory management, lazy loading.
   - **Nümunə:** O(n²) əvəzinə O(n log n) alqoritmlərdən istifadə, lazımsız hesablamalardan qaçınmaq.

## Distributed Verilənlər Bazası Konsepsiyaları

### CAP Teoremi

CAP teoremi (Brewer teoremi olaraq da tanınır), distributed verilənlər bazası sistemlərinin eyni zamanda aşağıdakı üç xüsusiyyətin hamısını təmin edə bilməyəcəyini bildirir:

- **Consistency (C):** Bütün node-lar eyni zamanda eyni məlumatı görür.
- **Availability (A):** Hər bir sorğu (uğurlu və ya uğursuz) cavab alır.
- **Partition Tolerance (P):** Sistem, node-lar arasında ünsiyyət kəsilsə belə işləməyə davam edir.

Distributed sistemlər adətən aşağıdakı kombinasiyalardan birini seçir:

- **CA:** Consistency və Availability təmin edilir, amma şəbəkə bölünmələrinə dözümsüzdür.
- **CP:** Consistency və Partition Tolerance təmin edilir, amma bəzi node-lar əlçatmaz olduqda availability qurban verilir.
- **AP:** Availability və Partition Tolerance təmin edilir, amma consistency zəifləyir (eventual consistency).

### Distributed Transaction Management

- **Two-Phase Commit (2PC):** Distributed tranzaksiyaların atomluğunu təmin etmək üçün protokol.
- **Three-Phase Commit (3PC):** 2PC-nin təkmilləşdirilmiş versiyası, daha yaxşı fault tolerance.
- **Saga Pattern:** Uzun müddətli tranzaksiyaları kiçik, lokal tranzaksiyalara bölmək.

### Distributed Consensus

- **Paxos:** Distributed sistemlərdə consensus əldə etmək üçün alqoritm.
- **Raft:** Paxos-a alternativ, daha anlaşılan consensus alqoritmi.
- **Byzantine Fault Tolerance:** Bədniyyətli node-lar olduqda belə consensus əldə etmək.
