# Verilənlər Bazası Replikasiyası
draft: true

Replikasiya, verilənlər bazası məlumatlarının bir neçə nüsxəsinin müxtəlif serverlər və ya lokasiyalarda saxlanması və sinxronizasiyası prosesidir. Bu, yüksək əlçatanlıq, fault tolerance, performans və məlumat təhlükəsizliyi təmin etmək üçün istifadə olunur.

## Replikasiyanın Məqsədləri

### 1. Yüksək Əlçatanlıq (High Availability)

- **Təsvir:** Sistem komponentlərindən biri nasaz olduqda belə xidmətin davamlılığını təmin etmək.
- **Nümunə:** Əsas verilənlər bazası serveri çökdükdə, replika avtomatik olaraq onun yerini alır (failover).
- **Faydaları:** Dayanma vaxtının (downtime) minimuma endirilməsi, biznes davamlılığı.

### 2. Fault Tolerance (Xəta Dözümlülüyü)

- **Təsvir:** Sistem komponentlərinin nasazlığına baxmayaraq, sistemin işləməyə davam etməsi qabiliyyəti.
- **Nümunə:** Bir data mərkəzində elektrik kəsintisi olduqda, digər mərkəzdəki replikalar işləməyə davam edir.
- **Faydaları:** Məlumat itkisinin qarşısının alınması, sistem etibarlılığının artırılması.

### 3. Performans Optimallaşdırması

- **Təsvir:** Oxuma əməliyyatlarını müxtəlif serverlərə paylaşdırmaqla yükün balanslaşdırılması.
- **Nümunə:** İstifadəçilərə ən yaxın replika serverindən məlumatın təqdim edilməsi.
- **Faydaları:** Daha sürətli sorğu cavabları, əsas serverin yükünün azaldılması.

### 4. Məlumat Təhlükəsizliyi

- **Təsvir:** Məlumatın bir neçə nüsxəsinin saxlanması ilə məlumat itkisi riskinin azaldılması.
- **Nümunə:** Fəlakət halında bərpa (disaster recovery) üçün uzaq məsafədə replikaların saxlanması.
- **Faydaları:** Məlumatın qorunması, fəlakətdən sonra sürətli bərpa.

## Replikasiya Metodları

### 1. Master-Slave (Primary-Secondary) Replikasiya

- **Təsvir:** Yazı əməliyyatları yalnız əsas node (primary/master) tərəfindən qəbul edilir; ikinci dərəcəli node-lar (slave/secondary) yalnız oxuma əməliyyatları üçün istifadə olunur.
- **İşləmə Prinsipi:**
  1. Bütün yazı əməliyyatları master-ə göndərilir
  2. Master dəyişiklikləri öz verilənlər bazasına tətbiq edir
  3. Dəyişikliklər slave node-lara ötürülür (replication log vasitəsilə)
  4. Slave node-lar dəyişiklikləri öz lokal nüsxələrinə tətbiq edir
- **Üstünlüklər:**
  - Sadə arxitektura və idarəetmə
  - Oxuma əməliyyatları üçün yaxşı miqyaslanabilirlik
  - Yedəkləmə (redundancy) və yük balansı
- **Çatışmazlıqlar:**
  - Master tək nöqtə nasazlığı (single point of failure) ola bilər
  - Yazı əməliyyatları üçün miqyaslanabilirlik məhdudiyyətləri
  - Replikasiya gecikməsi (lag) səbəbindən məlumat uyğunsuzluğu
- **İstifadə halları:**
  - Oxuma-ağır iş yükləri
  - Hesabat və analitika sistemləri
  - Keşləmə sistemləri
- **Texnologiyalar:**
  - MySQL Replication
  - PostgreSQL Streaming Replication
  - MongoDB Replica Sets

### 2. Multi-Master (Master-Master) Replikasiya

- **Təsvir:** Bir neçə node həm yazı, həm də oxuma əməliyyatlarını qəbul edə bilir.
- **İşləmə Prinsipi:**
  1. Hər bir master node yazı əməliyyatlarını qəbul edir
  2. Dəyişikliklər digər master node-lara ötürülür
  3. Konflikt aşkarlanması və həlli mexanizmləri tətbiq olunur
- **Üstünlüklər:**
  - Yüksək əlçatanlıq (high availability)
  - Yazı əməliyyatları üçün yük balansı
  - Tək nöqtə nasazlığı (single point of failure) yoxdur
- **Çatışmazlıqlar:**
  - Konfliktlərin idarə edilməsi mürəkkəbdir
  - Məlumat uyğunluğunu (consistency) təmin etmək çətindir
  - Daha mürəkkəb konfiqurasiya və idarəetmə
- **İstifadə halları:**
  - Coğrafi olaraq paylanmış sistemlər
  - Yüksək əlçatanlıq tələb edən sistemlər
  - Yazı-ağır iş yükləri
- **Texnologiyalar:**
  - MySQL Group Replication
  - PostgreSQL BDR (Bi-Directional Replication)
  - MariaDB Galera Cluster

### 3. Read-Replica (Read-Only Replica)

- **Təsvir:** Yazı əməliyyatları əsas node-da, oxu əməliyyatları isə read-only replikalarda həyata keçirilir.
- **İşləmə Prinsipi:**
  1. Yazı əməliyyatları yalnız primary node-a göndərilir
  2. Dəyişikliklər read-replica-lara ötürülür
  3. Read-replica-lar yalnız oxuma sorğularına xidmət edir
- **Üstünlüklər:**
  - Oxuma əməliyyatları üçün miqyaslanabilirlik
  - Əsas node-un yükünün azaldılması
  - Asan konfiqurasiya və idarəetmə
- **Çatışmazlıqlar:**
  - Yazı performansına təsiri yoxdur
  - Replikasiya gecikməsi səbəbindən köhnəlmiş məlumat (stale data) problemi
  - Failover mexanizmi tələb edir
- **İstifadə halları:**
  - Hesabat və analitika
  - Oxuma-ağır veb tətbiqlər
  - Keşləmə
- **Texnologiyalar:**
  - AWS RDS Read Replicas
  - Google Cloud SQL Read Replicas
  - Azure SQL Database Read Replicas

### 4. Snapshot Replikasiya

- **Təsvir:** Məlumat müəyyən vaxtda tam şəkil (snapshot) kimi kopyalanır.
- **İşləmə Prinsipi:**
  1. Mənbə verilənlər bazasının tam şəkli (snapshot) alınır
  2. Snapshot hədəf serverə köçürülür
  3. Hədəf server snapshot-dan bərpa olunur
  4. Proses periodik olaraq təkrarlanır
- **Üstünlüklər:**
  - Sadə və anlaşılan
  - Hesabat və analitika üçün uyğundur
  - Mənbə sistemə minimal təsir
- **Çatışmazlıqlar:**
  - Real vaxtda deyil, periodik yeniləmə
  - Böyük snapshotlar üçün əhəmiyyətli resurs tələb edir
  - Snapshot alınması zamanı performans təsiri
- **İstifadə halları:**
  - Periodik hesabatlar
  - Data warehouse yükləmələri
  - Backup və arxivləmə
- **Texnologiyalar:**
  - PostgreSQL pg_dump/pg_restore
  - MySQL mysqldump
  - MongoDB mongodump/mongorestore

### 5. Cascade Replikasiya

- **Təsvir:** Replikalar özləri də digər replikalara məlumat ötürə bilir.
- **İşləmə Prinsipi:**
  1. Primary node birinci səviyyə replikalara məlumat ötürür
  2. Birinci səviyyə replikalar ikinci səviyyə replikalara məlumat ötürür
  3. Bu proses bir neçə səviyyədə davam edə bilər
- **Üstünlüklər:**
  - Primary node-un yükünün azaldılması
  - Coğrafi olaraq paylanmış sistemlər üçün effektiv
  - Şəbəkə trafikinin optimallaşdırılması
- **Çatışmazlıqlar:**
  - Hər səviyyədə əlavə replikasiya gecikməsi
  - Daha mürəkkəb konfiqurasiya və monitorinq
  - Nasazlıq halında daha mürəkkəb bərpa
- **İstifadə halları:**
  - Qlobal paylanmış sistemlər
  - Çoxsaylı replikalara malik sistemlər
  - Şəbəkə məhdudiyyətləri olan mühitlər
- **Texnologiyalar:**
  - PostgreSQL Cascading Replication
  - MySQL Relay Replication
  - SQL Server Distributing Publisher

## Replikasiya Strategiyaları

### 1. Sinxron Replikasiya

- **Təsvir:** Yazı əməliyyatı yalnız bütün (və ya müəyyən sayda) replikalarda təsdiqləndiyi zaman tamamlanmış hesab olunur.
- **İşləmə Prinsipi:**
  1. Yazı əməliyyatı primary node-a göndərilir
  2. Primary node dəyişikliyi replikalara ötürür
  3. Primary node replikalardan təsdiq gözləyir
  4. Yalnız təsdiq alındıqdan sonra əməliyyat tamamlanmış hesab olunur
- **Üstünlüklər:**
  - Yüksək məlumat uyğunluğu (strong consistency)
  - Məlumat itkisi riski minimaldır
  - Bütün replikalarda eyni məlumat
- **Çatışmazlıqlar:**
  - Daha yüksək latency (gecikmə)
  - Replika nasazlığı halında yazı əməliyyatları bloklanır
  - Performans məhdudiyyətləri
- **İstifadə halları:**
  - Maliyyə sistemləri
  - Kritik biznes əməliyyatları
  - Məlumat bütövlüyünün kritik əhəmiyyət daşıdığı sistemlər

### 2. Asinxron Replikasiya

- **Təsvir:** Yazı əməliyyatı primary node-da tamamlanır, replikalar sonradan yenilənir.
- **İşləmə Prinsipi:**
  1. Yazı əməliyyatı primary node-da tamamlanır və təsdiqlənir
  2. Dəyişikliklər arxa planda replikalara ötürülür
  3. Replikalar öz tempində dəyişiklikləri tətbiq edir
- **Üstünlüklər:**
  - Daha aşağı latency (gecikmə)
  - Primary node-un performansına minimal təsir
  - Replika nasazlığı primary node-u bloklamır
- **Çatışmazlıqlar:**
  - Məlumat uyğunsuzluğu (eventual consistency)
  - Primary node nasazlığı zamanı məlumat itkisi riski
  - Köhnəlmiş məlumat (stale data) problemi
- **İstifadə halları:**
  - Sosial media platformaları
  - Content delivery sistemləri
  - Yüksək performans tələb edən sistemlər

### 3. Semi-Sinxron Replikasiya

- **Təsvir:** Yazı əməliyyatı ən azı bir (və ya müəyyən sayda) replikada təsdiqləndiyi zaman tamamlanmış hesab olunur.
- **İşləmə Prinsipi:**
  1. Yazı əməliyyatı primary node-a göndərilir
  2. Primary node dəyişikliyi replikalara ötürür
  3. Primary node müəyyən sayda replikadan təsdiq gözləyir
  4. Təsdiq alındıqdan sonra əməliyyat tamamlanmış hesab olunur
- **Üstünlüklər:**
  - Sinxron və asinxron arasında balans
  - Daha yaxşı performans/consistency nisbəti
  - Məlumat itkisi riskinin azaldılması
- **Çatışmazlıqlar:**
  - Hələ də müəyyən latency (gecikmə)
  - Konfiqurasiya mürəkkəbliyi
  - Bütün replikalarda eyni məlumat olmaya bilər
- **İstifadə halları:**
  - E-commerce platformaları
  - Online banking
  - Orta səviyyəli kritiklik tələb edən sistemlər

## Konflikt Həlli Mexanizmləri

Distributed sistemlərdə eyni məlumatın müxtəlif node-larda eyni zamanda dəyişdirilməsi konfliktlərə səbəb ola bilər. Bu konfliktləri həll etmək üçün müxtəlif mexanizmlər mövcuddur:

### 1. Last-Write-Wins (Sonuncu Yazan Qalib Gəlir)

- **Təsvir:** Zaman damğası (timestamp) əsasında ən son dəyişiklik qəbul edilir.
- **Üstünlüklər:** Sadə və anlaşılan, minimal əlavə metadata tələb edir.
- **Çatışmazlıqlar:** Məlumat itkisi riski, clock drift problemi.
- **Nümunə:** Cassandra-nın default konflikt həlli mexanizmi.

### 2. Vector Clocks

- **Təsvir:** Hər node üçün sayğaclardan ibarət vektor istifadə edərək səbəb-nəticə əlaqələrini izləyir.
- **Üstünlüklər:** Daha dəqiq konflikt aşkarlanması, səbəb-nəticə əlaqələrini qoruyur.
- **Çatışmazlıqlar:** Daha mürəkkəb, əlavə metadata tələb edir.
- **Nümunə:** Amazon DynamoDB, Riak.

### 3. Conflict-free Replicated Data Types (CRDTs)

- **Təsvir:** Riyazi xüsusiyyətləri sayəsində avtomatik konflikt həlli təmin edən data strukturları.
- **Üstünlüklər:** Avtomatik konflikt həlli, mərkəzi koordinasiya tələb etmir.
- **Çatışmazlıqlar:** Bütün data tipləri üçün uyğun deyil, əlavə yaddaş tələb edir.
- **Nümunə:** Redis Enterprise, Riak.

### 4. Application-Level Conflict Resolution

- **Təsvir:** Tətbiq səviyyəsində xüsusi biznes məntiqinə əsaslanan konflikt həlli.
- **Üstünlüklər:** Biznes qaydalarına uyğun həll, kontekst-spesifik qərarlar.
- **Çatışmazlıqlar:** Tətbiq mürəkkəbliyi, əlavə kod yazılması tələb edir.
- **Nümunə:** Custom conflict resolution handlers in MongoDB, CouchDB.

## Redundancy və Replication Fərqi

Bu iki termin tez-tez qarışdırılsa da, aralarında əhəmiyyətli fərqlər var:

### Redundancy (Artıqlıq)

- **Təsvir:** Eyni komponentin və ya məlumatın ehtiyat nüsxələrinin saxlanması.
- **Xüsusiyyətlər:**
  - Adətən passivdir - ehtiyat komponentlər yalnız əsas komponent nasaz olduqda istifadə olunur
  - Əsasən fault tolerance və availability üçün istifadə olunur
  - Sistemin etibarlılığını (reliability) artırır
- **Nümunə:** RAID sistemləri, ehtiyat güc təchizatı, hot standby serverlər.

### Replication (Replikasiya)

- **Təsvir:** Məlumatın aktiv şəkildə bir neçə nüsxəsinin sinxronizasiyası.
- **Xüsusiyyətlər:**
  - Adətən aktivdir - bütün nüsxələr aktiv şəkildə istifadə olunur
  - Həm fault tolerance, həm də performans üçün istifadə olunur
  - Məlumatın əlçatanlığını və uyğunluğunu təmin edir
- **Nümunə:** Database replication, distributed cache, content delivery networks.

## Distributed vs Centralized Replikasiya

### Centralized Replikasiya

- **Təsvir:** Bütün replikasiya prosesi mərkəzi bir node tərəfindən idarə olunur.
- **Xüsusiyyətlər:**
  - Sadə arxitektura və idarəetmə
  - Mərkəzi node tək nöqtə nasazlığı (single point of failure) ola bilər
  - Miqyaslanabilirlik məhdudiyyətləri
- **Nümunə:** Traditional Master-Slave replication.

### Distributed Replikasiya

- **Təsvir:** Replikasiya prosesi bir neçə node arasında paylaşdırılır, mərkəzi node olmadan.
- **Xüsusiyyətlər:**
  - Daha yüksək fault tolerance
  - Daha yaxşı miqyaslanabilirlik
  - Daha mürəkkəb idarəetmə və monitorinq
- **Nümunə:** Leaderless replication in Cassandra, Dynamo-style systems.

### Leaderless Replikasiya

- **Təsvir:** Lider (master) node olmadan bütün node-lar həm yazı, həm də oxu əməliyyatlarını qəbul edə bilir.
- **İşləmə Prinsipi:**
  1. Yazı əməliyyatı bir neçə node-a paralel göndərilir
  2. Quorum əsaslı təsdiqləmə istifadə olunur
  3. Oxuma zamanı bir neçə node-dan məlumat alınır və ən yeni versiya seçilir
- **Üstünlüklər:**
  - Tək nöqtə nasazlığı (single point of failure) yoxdur
  - Yüksək əlçatanlıq və miqyaslanabilirlik
  - Node-lar arasında simmetrik münasibət
- **Çatışmazlıqlar:**
  - Eventual consistency
  - Daha mürəkkəb konflikt həlli
  - Read repair və anti-entropy prosesləri tələb edir
- **Nümunə:** Amazon Dynamo, Apache Cassandra, Riak.

## Replikasiya Monitorinqi və İdarəetməsi

Effektiv replikasiya üçün aşağıdakı aspektlərin monitorinqi və idarə edilməsi vacibdir:

1. **Replikasiya Gecikməsi (Lag):** Primary və replica arasındakı gecikmə.
2. **Replikasiya Statusu:** Replikasiyanın aktiv olub-olmadığı, nasazlıqlar.
3. **Məlumat Uyğunluğu:** Replikalardakı məlumatın primary ilə uyğunluğu.
4. **Failover Mexanizmləri:** Primary nasazlığı halında avtomatik keçid.
5. **Konflikt Aşkarlanması və Həlli:** Konfliktlərin effektiv idarə edilməsi.

## Nəticə

Verilənlər bazası replikasiyası, müasir distributed sistemlərin əsas komponentlərindən biridir. Düzgün replikasiya strategiyasının seçilməsi, sistemin tələblərinə, iş yükünə və məlumat uyğunluğu (consistency) ehtiyaclarına əsaslanmalıdır. Hər bir replikasiya metodu və strategiyasının öz üstünlükləri və çatışmazlıqları var, və bunların balanslaşdırılması uğurlu bir replikasiya həllinin açarıdır.
