# Database Sharding

## Sharding Nədir?

Sharding (və ya horizontal partitioning), böyük verilənlər bazasını daha kiçik, daha sürətli və daha idarə olunan hissələrə (shard-lara) bölmək üçün istifadə olunan bir texnikadır. Hər bir shard, eyni sxemaya malik ayrı bir verilənlər bazası server instansında saxlanılır, lakin hər bir shard fərqli məlumat dəstini saxlayır.

## Sharding-in Məqsədi

Sharding-in əsas məqsədi, verilənlər bazasının horizontal miqyaslanmasını (horizontal scaling) təmin etməkdir. Bu, aşağıdakı üstünlükləri təmin edir:

- **Yüksək Performans:** Sorğular paralel şəkildə müxtəlif shard-larda işlənə bilər, bu da ümumi sorğu vaxtını azaldır.
- **Miqyaslanabilirlik:** Sistem böyüdükcə, yeni shard-lar əlavə edilə bilər.
- **Yüksək Əlçatanlıq:** Bir shard-ın nasazlığı bütün sistemə təsir etmir.
- **Coğrafi Paylanma:** Shard-lar istifadəçilərə yaxın yerləşdirilə bilər, bu da gecikmələri azaldır.

## Sharding Strategiyaları

### 1. Key-Based Sharding (Hash Sharding)

- **Təsvir:** Məlumatın hansı shard-a gedəcəyini müəyyən etmək üçün shard key-in hash dəyərindən istifadə olunur.
- **Üstünlüklər:** Məlumatın bərabər paylanmasını təmin edir, shard-lar arasında balans yaradır.
- **Çatışmazlıqlar:** Yeni shard əlavə edildikdə, hash funksiyası dəyişir və məlumatın yenidən paylanması (resharding) tələb olunur.
- **Nümunə:** `shard_id = hash(customer_id) % num_shards`

### 2. Range-Based Sharding

- **Təsvir:** Məlumat müəyyən bir dəyər aralığına görə bölünür (məsələn, müştəri ID-ləri 1-1000 birinci shard-da, 1001-2000 ikinci shard-da və s.).
- **Üstünlüklər:** Range sorğuları effektivdir, yeni shard-lar asanlıqla əlavə edilə bilər.
- **Çatışmazlıqlar:** Qeyri-bərabər məlumat paylanması (data skew) riski var, "hot spot"-lar yarana bilər.
- **Nümunə:** Tarix əsaslı sharding, coğrafi sharding.

### 3. Directory-Based Sharding

- **Təsvir:** Xüsusi bir lookup service və ya cədvəl, hansı məlumatın hansı shard-da olduğunu izləyir.
- **Üstünlüklər:** Daha çevik, dinamik sharding imkanı verir, resharding daha asandır.
- **Çatışmazlıqlar:** Lookup service tək nöqtə nasazlığı (single point of failure) ola bilər, əlavə sorğu yükü yaradır.
- **Nümunə:** Mərkəzi bir kataloq xidməti istifadə edərək shard yerləşmələrini idarə etmək.

## Sharding-in Texniki Tətbiqi

### Shard Key Seçimi

Shard key, məlumatın hansı shard-a yerləşdiriləcəyini müəyyən edən əsas amildir. Yaxşı bir shard key:

- **Yüksək Kardinalitet:** Unikal dəyərlərin sayı çox olmalıdır.
- **Bərabər Paylanma:** Məlumatın bərabər paylanmasını təmin etməlidir.
- **Dəyişməzlik:** Dəyişdirilməməlidir, əks halda resharding tələb olunur.
- **Sorğu Nümunələri:** Tez-tez istifadə olunan sorğulara uyğun olmalıdır.

### Sharding Arxitekturası

1. **Proxy Layer:** Sorğuları uyğun shard-lara yönləndirir.
2. **Query Router:** Sorğuları analiz edir və hansı shard(lar)ın cavab verəcəyini müəyyən edir.
3. **Shard Manager:** Shard-ların vəziyyətini izləyir, yeni shard-ların əlavə edilməsini idarə edir.
4. **Metadata Store:** Shard konfiqurasiyası və məlumatın yerləşməsi haqqında məlumat saxlayır.

## Sharding-in Çətinlikləri və Həll Yolları

### 1. Joins və Transactions

- **Problem:** Shard-lar arası join əməliyyatları və distributed transactions mürəkkəbdir.
- **Həll Yolları:**
  - Denormalization: Əlaqəli məlumatları eyni shard-da saxlamaq.
  - Application-level joins: Tətbiq səviyyəsində join əməliyyatlarını həyata keçirmək.
  - Distributed transaction managers: 2PC (Two-Phase Commit) kimi protokollardan istifadə etmək.

### 2. Resharding

- **Problem:** Sistem böyüdükcə, məlumatın yenidən paylanması tələb olunur.
- **Həll Yolları:**
  - Consistent hashing: Yalnız bir hissə məlumatın köçürülməsini tələb edir.
  - Online migration tools: Sistemin işləməsini dayandırmadan resharding.
  - Dual-write during migration: Köçürmə zamanı həm köhnə, həm də yeni shard-lara yazmaq.

### 3. Hotspots

- **Problem:** Bəzi shard-lar digərlərindən daha çox yüklənə bilər.
- **Həll Yolları:**
  - Shard balancing: Yükün bərabər paylanması üçün shard-ları yenidən balanslaşdırmaq.
  - Caching: Tez-tez istifadə olunan məlumatları keşləmək.
  - Read replicas: Oxuma əməliyyatları üçün əlavə replika yaratmaq.

### 4. Global Unique Identifiers

- **Problem:** Shard-lar arası unikal ID-lərin yaradılması.
- **Həll Yolları:**
  - UUID: Universally Unique Identifier istifadə etmək.
  - Snowflake IDs: Twitter-in istifadə etdiyi kimi zaman əsaslı unikal ID-lər.
  - ID allocation service: Mərkəzi bir xidmət vasitəsilə ID-ləri paylamaq.

## Sharding-in Praktiki Tətbiqləri

### Relyasion Verilənlər Bazalarında Sharding

- **MySQL Cluster:** NDB storage engine istifadə edərək auto-sharding.
- **PostgreSQL:** Citus extension və ya Foreign Data Wrappers istifadə edərək sharding.
- **Oracle:** Oracle Sharding xüsusiyyəti ilə.

### NoSQL Verilənlər Bazalarında Sharding

- **MongoDB:** Auto-sharding funksionallığı ilə.
- **Cassandra:** Consistent hashing ilə daxili sharding.
- **DynamoDB:** Partition key əsasında avtomatik sharding.

### Sharding Middleware

- **Vitess:** YouTube tərəfindən yaradılmış MySQL üçün sharding middleware.
- **ShardingSphere:** Apache-nin distributed database middleware ekosistemi.
- **Citus:** PostgreSQL üçün distributed database extension.

## Nə Zaman Sharding İstifadə Etməli?

Sharding, aşağıdakı hallarda nəzərdən keçirilməlidir:

- Verilənlər bazası ölçüsü tək bir server-in tutumunu aşdıqda.
- Sorğu performansı tələbləri tək bir server ilə qarşılana bilmədikdə.
- Yazma əməliyyatları tək bir server-in imkanlarını aşdıqda.
- Coğrafi olaraq paylanmış istifadəçilərə xidmət etmək lazım olduqda.

Lakin, sharding mürəkkəblik gətirir və kiçik və orta ölçülü sistemlər üçün vertical scaling (daha güclü server) və ya read replicas kimi daha sadə həllər daha uyğun ola bilər.

## Nəticə

Sharding, böyük miqyaslı verilənlər bazası sistemlərinin miqyaslanabilirlik və performans problemlərini həll etmək üçün güclü bir texnikadır. Lakin, bu üstünlüklər mürəkkəblik və əlavə idarəetmə yükü hesabına əldə edilir. Sharding strategiyasının seçimi və tətbiqi, konkret tətbiqin tələblərinə, məlumat modelinə və sorğu nümunələrinə əsaslanmalıdır.