---
draft: true
---
# NoSQL Verilənlər Bazaları
draft: true

## NoSQL Nədir?

NoSQL ("Not Only SQL" və ya "Non-SQL"), ənənəvi relyasion verilənlər bazalarından (RDBMS) fərqli olaraq, strukturlaşdırılmamış, yarı-strukturlaşdırılmış və ya qeyri-relyasion verilənlərlə işləmək üçün nəzərdə tutulmuş verilənlər bazası texnologiyalarıdır. NoSQL verilənlər bazaları, böyük həcmli məlumatların emalı, yüksək miqyaslanabilirlik və çevik məlumat modelləri tələb edən müasir tətbiqlər üçün yaradılmışdır.

## NoSQL-in Əsas Xüsusiyyətləri

### 1. Schema-less (Sxemasız) Dizayn

- **Təsvir:** Məlumat strukturu əvvəlcədən təyin edilmir, dinamik şəkildə dəyişə bilər.
- **Üstünlüklər:** Tətbiq inkişaf etdikcə məlumat modelini asanlıqla dəyişdirmək mümkündür.
- **Nümunə:** MongoDB-də eyni kolleksiyada müxtəlif sahələrə malik sənədlər saxlamaq mümkündür.

### 2. Horizontal Scalability (Üfüqi Miqyaslanabilirlik)

- **Təsvir:** Sistem yükünü bir neçə server arasında paylaşdırmaq imkanı.
- **Üstünlüklər:** Böyük həcmli məlumatları və yüksək yazı/oxu əməliyyatlarını idarə etmək qabiliyyəti.
- **Nümunə:** Cassandra-nın ring arxitekturası, MongoDB-nin sharding xüsusiyyəti.

### 3. High Availability (Yüksək Əlçatanlıq)

- **Təsvir:** Sistem nasazlıqlarına baxmayaraq xidmətin davamlılığını təmin etmək.
- **Üstünlüklər:** Daha etibarlı sistem, daha az dayanma vaxtı.
- **Nümunə:** Cassandra-nın multi-master replikasiyası, MongoDB-nin replica set-ləri.

### 4. Eventual Consistency (Sonrakı Uyğunluq)

- **Təsvir:** Məlumat dərhal bütün node-larda sinxronlaşdırılmır, amma vaxt keçdikcə uyğunlaşır.
- **Üstünlüklər:** Daha yüksək performans və əlçatanlıq.
- **Nümunə:** DynamoDB-nin eventual consistency rejimi.

## NoSQL Verilənlər Bazası Növləri

### 1. Key-Value Stores (Açar-Dəyər Bazaları)

- **Təsvir:** Sadə açar-dəyər cütlüklərini saxlayan verilənlər bazaları.
- **Xüsusiyyətlər:**
  - Ən sadə NoSQL strukturu
  - Çox yüksək performans
  - Minimal sorğu imkanları
- **İstifadə sahələri:**
  - Session management
  - User preferences
  - Shopping carts
  - Real-time analytics
- **Populyar texnologiyalar:**
  - Redis
  - Amazon DynamoDB
  - Riak
  - Memcached

#### In-Memory Key-Value Stores (Yaddaşda Açar-Dəyər Bazaları)

- **Təsvir:** Məlumatları diskdə deyil, RAM-da saxlayan açar-dəyər bazaları.
- **Xüsusiyyətlər:**
  - Ultra-yüksək performans
  - Məhdud davamlılıq (persistence)
  - Yüksək sürətli keşləmə
- **İstifadə sahələri:**
  - Caching
  - Real-time analytics
  - Message brokers
- **Populyar texnologiyalar:**
  - Redis
  - Memcached
  - Hazelcast

### 2. Document Stores (Sənəd Bazaları)

- **Təsvir:** JSON, BSON və ya XML kimi formatda sənədləri saxlayan verilənlər bazaları.
- **Xüsusiyyətlər:**
  - Hər sənəd müxtəlif struktura malik ola bilər
  - Sənədlər daxilində iyerarxik məlumat
  - İndeksləmə və sorğu imkanları
- **İstifadə sahələri:**
  - Content management
  - E-commerce
  - User profiles
  - Game data
- **Populyar texnologiyalar:**
  - MongoDB
  - CouchDB
  - Amazon DocumentDB
  - Firebase Firestore

### 3. Wide-Column Stores (Geniş Sütun Bazaları)

- **Təsvir:** Məlumatları sütunlar şəklində saxlayan, yüksək miqyaslı verilənlər bazaları.
- **Xüsusiyyətlər:**
  - Sütun ailəsi konsepsiyası
  - Yüksək yazma/oxuma performansı
  - Böyük həcmli məlumatlar üçün optimallaşdırılmış
- **İstifadə sahələri:**
  - Time-series data
  - IoT
  - Weather data
  - Financial analytics
- **Populyar texnologiyalar:**
  - Apache Cassandra
  - HBase
  - Google Bigtable
  - ScyllaDB

### 4. Graph Databases (Qraf Bazaları)

- **Təsvir:** Məlumatları node-lar və əlaqələr (edges) şəklində saxlayan verilənlər bazaları.
- **Xüsusiyyətlər:**
  - Əlaqələr birinci dərəcəli vətəndaşlardır
  - Mürəkkəb əlaqələri effektiv şəkildə təsvir edir
  - Traversal sorğuları üçün optimallaşdırılmış
- **İstifadə sahələri:**
  - Social networks
  - Recommendation engines
  - Fraud detection
  - Knowledge graphs
- **Populyar texnologiyalar:**
  - Neo4j
  - Amazon Neptune
  - JanusGraph
  - OrientDB

### 5. Time Series Databases (Zaman Seriyası Bazaları)

- **Təsvir:** Zaman ilə əlaqəli məlumatları saxlamaq və analiz etmək üçün optimallaşdırılmış bazalar.
- **Xüsusiyyətlər:**
  - Zaman damğalı məlumatlar
  - Yüksək yazma sürəti
  - Zaman əsaslı sorğular üçün optimallaşdırılmış
- **İstifadə sahələri:**
  - IoT sensor data
  - System monitoring
  - Financial trading
  - Weather forecasting
- **Populyar texnologiyalar:**
  - InfluxDB
  - Prometheus
  - TimescaleDB
  - Amazon Timestream

## NoSQL vs RDBMS: Müqayisə

| Xüsusiyyət | NoSQL | RDBMS |
|------------|-------|-------|
| **Məlumat Modeli** | Sxemasız, çevik | Sabit sxema, strukturlaşdırılmış |
| **Miqyaslanabilirlik** | Horizontal (üfüqi) | Əsasən vertical (şaquli) |
| **Consistency** | Əsasən eventual consistency | ACID xüsusiyyətləri |
| **Sorğu Dili** | Texnologiyaya görə dəyişir | SQL (standartlaşdırılmış) |
| **Əlaqələr** | Əlaqələr olmaya bilər | Foreign keys ilə əlaqələr |
| **İstifadə sahəsi** | Big data, real-time web apps | Strukturlaşdırılmış biznes məlumatları |
| **Tranzaksiyalar** | Məhdud və ya yoxdur | Tam dəstəklənir |

## NoSQL-in Üstünlükləri

### 1. Flexibility (Çeviklik)

- **Təsvir:** Schema-less dizayn, məlumat modelinin asanlıqla dəyişdirilməsinə imkan verir.
- **Faydaları:** Tətbiq tələbləri dəyişdikcə, verilənlər bazası strukturunu dəyişdirmək üçün miqrasiyalara ehtiyac olmur.
- **Nümunə:** Yeni sahələr əlavə etmək üçün ALTER TABLE əmrlərinə ehtiyac yoxdur.

### 2. Scalability (Miqyaslanabilirlik)

- **Təsvir:** Horizontal scaling vasitəsilə sistem resurslarını asanlıqla artırmaq imkanı.
- **Faydaları:** Böyük həcmli məlumatları və yüksək trafiki idarə etmək qabiliyyəti.
- **Nümunə:** Cassandra cluster-inə yeni node-lar əlavə edərək yazma/oxuma əməliyyatlarını miqyaslandırmaq.

### 3. Performance (Performans)

- **Təsvir:** Spesifik iş yükləri üçün optimallaşdırılmış performans.
- **Faydaları:** Daha sürətli yazma/oxuma əməliyyatları, aşağı latency.
- **Nümunə:** Redis-in in-memory strukturu ilə millisaniyələrlə ölçülən cavab vaxtları.

### 4. Availability (Əlçatanlıq)

- **Təsvir:** Distributed arxitektura sayəsində yüksək əlçatanlıq.
- **Faydaları:** Sistem nasazlıqlarına qarşı daha dözümlü, daha az dayanma vaxtı.
- **Nümunə:** MongoDB replica set-ləri avtomatik failover təmin edir.

## NoSQL-in Çatışmazlıqları

### 1. Consistency Challenges (Uyğunluq Problemləri)

- **Təsvir:** CAP teoreminə görə, NoSQL sistemləri adətən consistency-dən güzəşt edir.
- **Nəticələri:** Stale data (köhnəlmiş məlumat) problemi, eventual consistency-nin idarə edilməsi çətinliyi.
- **Nümunə:** Distributed sistemdə bir node-da yazılan məlumatın digər node-larda dərhal görünməməsi.

### 2. Query Limitations (Sorğu Məhdudiyyətləri)

- **Təsvir:** SQL-in güclü sorğu imkanlarının olmaması.
- **Nəticələri:** Mürəkkəb sorğuların yazılması və optimallaşdırılması çətinliyi.
- **Nümunə:** JOIN əməliyyatlarının olmaması və ya məhdud olması.

### 3. Transaction Support (Tranzaksiya Dəstəyi)

- **Təsvir:** Tam ACID tranzaksiyalarının olmaması və ya məhdud olması.
- **Nəticələri:** Mürəkkəb biznes əməliyyatlarının idarə edilməsi çətinliyi.
- **Nümunə:** Multi-document tranzaksiyaların məhdudiyyətləri.

### 4. Maturity (Yetkinlik)

- **Təsvir:** Bəzi NoSQL texnologiyaları nisbətən yeni və daha az yetkindir.
- **Nəticələri:** Daha az sənədləşdirmə, daha az tooling, daha az təcrübəli mütəxəssislər.
- **Nümunə:** Yeni versiyalarda stabillik problemləri, feature dəyişiklikləri.

## NoSQL-in İstifadə Halları

### Uyğun İstifadə Halları

- **Big Data:** Petabaytlarla məlumatın saxlanması və emalı.
- **Real-time Web Applications:** Sosial media, online gaming, real-time analytics.
- **Content Management:** Bloqlar, CMS sistemləri, media platformaları.
- **IoT:** Sensor məlumatlarının toplanması və emalı.
- **Mobile Applications:** Offline-first tətbiqlər, sürətli sinxronizasiya.

### Uyğun Olmayan İstifadə Halları

- **Complex Transactions:** Bank əməliyyatları, maliyyə sistemləri.
- **Legacy System Integration:** SQL əsaslı köhnə sistemlərlə inteqrasiya.
- **Complex Reporting:** Mürəkkəb analitik hesabatlar, BI sistemləri.
- **Strong Consistency Requirements:** Kritik biznes məlumatları, inventory management.

## NoSQL Seçim Strategiyası

1. **İş tələblərini analiz edin:** Məlumat strukturu, həcmi, sorğu nümunələri, miqyaslanabilirlik ehtiyacları.
2. **Məlumat modelini müəyyən edin:** Key-value, document, column, graph?
3. **Consistency tələblərini qiymətləndirin:** ACID lazımdır, yoxsa eventual consistency kifayətdir?
4. **Performans hədəflərini təyin edin:** Latency, throughput, concurrent users.
5. **Ekosistem və inteqrasiya ehtiyaclarını nəzərə alın:** Mövcud sistemlər, tooling, komanda təcrübəsi.

## Nəticə

NoSQL verilənlər bazaları, müasir tətbiqlərin artan məlumat həcmi, çeviklik və miqyaslanabilirlik tələblərinə cavab vermək üçün yaradılmışdır. Relyasion verilənlər bazalarını əvəz etmək üçün deyil, onları tamamlamaq üçün nəzərdə tutulmuşdur. Düzgün istifadə halında, NoSQL həlləri böyük həcmli məlumatların idarə edilməsi, yüksək əlçatanlıq və performans kimi üstünlüklər təqdim edir. Lakin, hər layihə üçün ən uyğun verilənlər bazası texnologiyasını seçmək, konkret tətbiqin tələblərinə, məlumat strukturuna və iş yükünə əsaslanmalıdır.
