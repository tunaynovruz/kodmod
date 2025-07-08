# Verilənlər Bazası: Ümumi Konsepsiyalar

Bu sənəddə verilənlər bazası sistemlərinin əsas konsepsiyaları, data strukturları, prinsipləri və arxitektura yanaşmaları haqqında ümumi məlumat verilir.

## Verilənlər Bazasında İstifadə Olunan Data Strukturlar

Verilənlər bazası sistemləri müxtəlif data strukturlardan istifadə edir ki, məlumatı effektiv şəkildə saxlasın, əldə etsin və emal etsin. Hər bir data strukturun öz üstünlükləri və tətbiq sahələri var.

### 1. Hash Index

- **Təsvir:** Açar-dəyər cütlüklərini saxlayan və hash funksiyası vasitəsilə açarlara sürətli giriş təmin edən data strukturu.
- **İşləmə Prinsipi:** Açar hash funksiyasından keçirilir və alınan hash dəyəri yaddaş ünvanına çevrilir.
- **Üstünlüklər:** O(1) zamanda axtarış, əlavə etmə və silmə əməliyyatları.
- **Çatışmazlıqlar:** Aralıq sorğuları (range queries) dəstəkləmir, hash collision problemi.
- **Tətbiq Sahələri:**
  - In-memory key-value bazaları (Redis)
  - Məlumat keşləmə
  - Unique constraint-lərin yoxlanması
  - Session management

### 2. B-Tree və B+Tree

- **Təsvir:** Balanslaşdırılmış ağac strukturları, verilənlər bazası indeksləşdirməsində geniş istifadə olunur.
- **İşləmə Prinsipi:** Çoxsəviyyəli ağac strukturu, hər node bir neçə açar və uşaq node-lara istinad saxlayır.
- **Üstünlüklər:** Balanslaşdırılmış, aralıq sorğuları dəstəkləyir, disk I/O-nu minimuma endirir.
- **Çatışmazlıqlar:** Yazı əməliyyatları zamanı ağacın yenidən balanslaşdırılması lazım gələ bilər.
- **Tətbiq Sahələri:**
  - RDBMS indeksləri (MySQL, PostgreSQL)
  - Fayl sistemləri
  - Aralıq sorğuları tələb edən tətbiqlər

### 3. LSM Tree və SSTable

- **Təsvir:** Log-Structured Merge Tree, yazı-intensiv iş yükləri üçün optimallaşdırılmış data strukturu.
- **İşləmə Prinsipi:** Yazılar əvvəlcə yaddaşdakı memtable-a yazılır, sonra diskdəki SSTable-lara (Sorted String Table) köçürülür.
- **Üstünlüklər:** Yüksək yazma performansı, sequential disk I/O, yaxşı sıxlaşdırma.
- **Çatışmazlıqlar:** Oxuma əməliyyatları daha bahalı ola bilər, compaction prosesi resurs tələb edir.
- **Tətbiq Sahələri:**
  - NoSQL bazaları (LevelDB, RocksDB)
  - Time-series verilənlər
  - Log verilənləri
  - Yazı-intensiv sistemlər

### 4. Inverted Index

- **Təsvir:** Sözlərdən sənədlərə istinad edən indeks strukturu, full-text axtarış üçün istifadə olunur.
- **İşləmə Prinsipi:** Hər söz üçün, həmin sözün keçdiyi bütün sənədlərin siyahısı saxlanılır.
- **Üstünlüklər:** Sürətli mətn axtarışı, relevance scoring dəstəyi.
- **Çatışmazlıqlar:** Yaddaş tutumu, yeniləmə əməliyyatlarının bahalı olması.
- **Tətbiq Sahələri:**
  - Axtarış mühərrikləri
  - Full-text axtarış (Elasticsearch, Solr)
  - Document-oriented bazalar
  - Content management sistemləri

### 5. Suffix Tree və Suffix Array

- **Təsvir:** Sətirin bütün sonluqlarını (suffix) saxlayan data strukturu.
- **İşləmə Prinsipi:** Sətirin hər mümkün sonluğu ağacda və ya sıralanmış massivdə saxlanılır.
- **Üstünlüklər:** Substring axtarışı üçün çox effektiv, pattern matching.
- **Çatışmazlıqlar:** Yaddaş tutumu, qurulma mürəkkəbliyi.
- **Tətbiq Sahələri:**
  - DNA ardıcıllığı analizi
  - String matching alqoritmləri
  - Plagiarism aşkarlanması
  - Compression alqoritmləri

### 6. R-Tree və Spatial Indexes

- **Təsvir:** Məkan məlumatlarını indeksləşdirmək üçün istifadə olunan ağac strukturu.
- **İşləmə Prinsipi:** Məkan obyektləri minimum bounding rectangle-lar ilə qruplaşdırılır.
- **Üstünlüklər:** Məkan sorğularını effektiv şəkildə dəstəkləyir (yaxınlıq, kəsişmə).
- **Çatışmazlıqlar:** Yeniləmə əməliyyatları mürəkkəb ola bilər, balanslaşdırma çətinlikləri.
- **Tətbiq Sahələri:**
  - GIS (Geographic Information Systems)
  - Location-based xidmətlər
  - Spatial verilənlər bazaları (PostGIS)
  - Kompüter qrafikası

## Normalization və Denormalization

### Normalization

Normalization, verilənlər bazası sxemasını təşkil etmək üçün istifadə olunan bir prosesdir ki, məlumat təkrarlanmasını azaltsın və məlumat bütövlüyünü təmin etsin.

#### Normalization Formaları

1. **Birinci Normal Forma (1NF):**
   - Hər sütun atomik (bölünməz) dəyərlər saxlamalıdır
   - Hər sətir unikal identifikator (primary key) ilə müəyyən edilməlidir
   - Eyni cədvəldə təkrarlanan qruplar olmamalıdır

2. **İkinci Normal Forma (2NF):**
   - 1NF-in bütün tələblərini qarşılamalıdır
   - Bütün non-key atributlar primary key-dən tam funksional asılı olmalıdır

3. **Üçüncü Normal Forma (3NF):**
   - 2NF-in bütün tələblərini qarşılamalıdır
   - Heç bir non-key atribut digər non-key atributdan tranzitiv asılı olmamalıdır

4. **Boyce-Codd Normal Forma (BCNF):**
   - 3NF-in daha güclü versiyası
   - Hər funksional asılılıq üçün, determinant superkey olmalıdır

5. **Dördüncü Normal Forma (4NF):**
   - BCNF-in bütün tələblərini qarşılamalıdır
   - Multi-valued dependencies aradan qaldırılmalıdır

#### Normalization-ın Üstünlükləri

- Məlumat təkrarlanmasının azaldılması
- Məlumat bütövlüyünün təmin edilməsi
- Daha az update anomaliyaları
- Daha kiçik cədvəl ölçüləri
- Daha yaxşı sorğu performansı (bəzi hallarda)

#### Normalization-ın Çatışmazlıqları

- Daha mürəkkəb sorğular (çoxlu JOIN əməliyyatları)
- Bəzi hallarda oxuma performansının azalması
- Daha mürəkkəb sxema dizaynı

### Denormalization

Denormalization, performans səbəbləri ilə normalization edilmiş verilənlər bazası sxemasına məqsədyönlü şəkildə redundancy (artıqlıq) əlavə etmək prosesidir.

#### Denormalization Texnikaları

1. **Cədvəllərin Birləşdirilməsi:**
   - Tez-tez birlikdə istifadə olunan cədvəllərin birləşdirilməsi
   - JOIN əməliyyatlarının sayını azaldır

2. **Hesablanmış Sütunlar:**
   - Tez-tez hesablanan dəyərlərin saxlanması
   - Sorğu zamanı hesablama yükünü azaldır

3. **Məlumat Təkrarlanması:**
   - Eyni məlumatın bir neçə cədvəldə saxlanması
   - JOIN əməliyyatlarını aradan qaldırır

4. **Materialized Views:**
   - Sorğu nəticələrinin əvvəlcədən hesablanıb saxlanması
   - Mürəkkəb sorğuların performansını artırır

#### Denormalization-ın Üstünlükləri

- Daha yaxşı oxuma performansı
- Daha az JOIN əməliyyatları
- Daha sadə sorğular
- Daha az indeks ehtiyacı

#### Denormalization-ın Çatışmazlıqları

- Məlumat təkrarlanması
- Daha çox disk tutumu
- Yazma əməliyyatlarının mürəkkəbləşməsi
- Məlumat uyğunsuzluğu (inconsistency) riski

### Nə Zaman Normalization və ya Denormalization İstifadə Etməli?

- **Normalization üçün:**
  - Məlumat bütövlüyü kritik əhəmiyyət daşıdıqda
  - Yazı əməliyyatları üstünlük təşkil etdikdə
  - Disk tutumu məhdud olduqda

- **Denormalization üçün:**
  - Oxuma əməliyyatları üstünlük təşkil etdikdə
  - Performans kritik əhəmiyyət daşıdıqda
  - Mürəkkəb analitik sorğular tez-tez icra olunduqda
  - Disk tutumu bol olduqda

## ACID Prinsipləri

ACID, relyasion verilənlər bazası tranzaksiyalarının etibarlılığını təmin edən dörd əsas xüsusiyyəti təsvir edən bir akronimdir.

### Atomicity (Atomluq)

- **Təsvir:** Tranzaksiya ya tam şəkildə uğurla tamamlanır, ya da heç bir dəyişiklik tətbiq edilmir.
- **Nümunə:** Bank köçürməsi zamanı bir hesabdan pul çıxarılır və digərinə əlavə edilir. Əgər ikinci əməliyyat uğursuz olarsa, birinci əməliyyat da geri qaytarılmalıdır.
- **Əhəmiyyəti:** Yarımçıq tranzaksiyaların qarşısını alır, məlumat bütövlüyünü qoruyur.

### Consistency (Uyğunluq)

- **Təsvir:** Tranzaksiya verilənlər bazasını bir düzgün vəziyyətdən digər düzgün vəziyyətə keçirir.
- **Nümunə:** Əgər bir sütunda unikal dəyər məhdudiyyəti varsa, tranzaksiya bu məhdudiyyəti pozan dəyişiklik edə bilməz.
- **Əhəmiyyəti:** Verilənlər bazasının bütün qaydaları və məhdudiyyətləri qorunur.

### Isolation (İzolyasiya)

- **Təsvir:** Paralel işləyən tranzaksiyalar bir-birindən təcrid olunur, sanki ardıcıl icra olunurlar.
- **Nümunə:** İki istifadəçi eyni məlumatı eyni anda yeniləyərkən, dəyişikliklər bir-birini əvəz etmir, əksinə ardıcıl tətbiq olunur.
- **Əhəmiyyəti:** Konkurent tranzaksiyalar arasında qarşılıqlı təsiri minimuma endirir.

### Durability (Davamlılıq)

- **Təsvir:** Uğurla tamamlanmış tranzaksiyanın nəticələri, hətta sistem xətası baş versə belə, daimi olaraq saxlanılır.
- **Nümunə:** Əgər istifadəçi məlumat yeniləməsini tamamladıqdan sonra sistem çöksə belə, yenilənmiş məlumat itirilməməlidir.
- **Əhəmiyyəti:** Məlumatın etibarlılığını və davamlılığını təmin edir.

### ACID-in Əhəmiyyəti

ACID prinsipləri, xüsusilə maliyyə, səhiyyə və digər kritik sistemlərdə məlumat bütövlüyünün və etibarlılığının təmin edilməsi üçün vacibdir. Əgər tətbiqiniz ACID uyğunluğu tələb edirsə, adətən relyasion verilənlər bazası (RDBMS) istifadə etmək məsləhət görülür.

## Partitioning Strategiyaları

Partitioning, böyük verilənlər bazası cədvəllərini daha kiçik, daha idarə olunan hissələrə bölmək üçün istifadə olunan bir texnikadır.

### Horizontal Partitioning (Sharding)

- **Təsvir:** Cədvəl sətirlərə görə bölünür, hər partition eyni sxemaya malik olur, amma fərqli sətirləri saxlayır.
- **Üstünlüklər:**
  - Miqyaslanabilirliyi (scalability) artırır
  - Sorğu performansını yaxşılaşdırır
  - Məlumat izolyasiyası təmin edir
  - Paralel emal imkanı verir
  - Daha sürətli bərpa (recovery) imkanı verir

#### Horizontal Partitioning Növləri

1. **Range-based Sharding:**
   - **Təsvir:** Məlumat müəyyən bir dəyər aralığına görə bölünür.
   - **Nümunə:** Müştəri ID-ləri 1-1000 birinci shard-da, 1001-2000 ikinci shard-da və s.
   - **Üstünlüklər:** Range sorğuları effektivdir, yeni shard-lar asanlıqla əlavə edilə bilər.
   - **Çatışmazlıqlar:** Qeyri-bərabər məlumat paylanması (data skew) riski var.

2. **Hash-based Sharding:**
   - **Təsvir:** Məlumatın hansı shard-a gedəcəyini müəyyən etmək üçün shard key-in hash dəyərindən istifadə olunur.
   - **Nümunə:** `shard_id = hash(customer_id) % num_shards`
   - **Üstünlüklər:** Məlumatın bərabər paylanmasını təmin edir.
   - **Çatışmazlıqlar:** Range sorğuları çətinləşir, yeni shard əlavə etdikdə resharding tələb olunur.

3. **Directory-based Sharding:**
   - **Təsvir:** Xüsusi bir lookup service və ya cədvəl, hansı məlumatın hansı shard-da olduğunu izləyir.
   - **Nümunə:** Mərkəzi bir kataloq xidməti istifadə edərək shard yerləşmələrini idarə etmək.
   - **Üstünlüklər:** Daha çevik, dinamik sharding imkanı verir.
   - **Çatışmazlıqlar:** Lookup service tək nöqtə nasazlığı (single point of failure) ola bilər.

### Vertical Partitioning

- **Təsvir:** Cədvəl sütunlara görə bölünür, əlaqəli sahələr ayrı cədvəllərdə saxlanır.
- **Nümunə:** İstifadəçi cədvəlində şəxsi məlumatlar (ad, soyad, email) bir cədvəldə, istifadəçi davranış məlumatları (login tarixləri, aktivlik) başqa bir cədvəldə saxlanır.
- **Üstünlüklər:**
  - I/O performansını artırır
  - Tez-tez istifadə olunan sütunları ayırmağa imkan verir
  - Məlumat təhlükəsizliyini yaxşılaşdırır
  - Cədvəl ölçüsünü azaldır
- **Çatışmazlıqlar:**
  - JOIN əməliyyatları tələb edə bilər
  - Sxema dizaynı mürəkkəbləşir

## CAP Teoremi

CAP teoremi (Brewer teoremi olaraq da tanınır), distributed verilənlər bazası sistemlərinin eyni zamanda aşağıdakı üç xüsusiyyətin hamısını təmin edə bilməyəcəyini bildirir:

### Consistency (C)

- **Təsvir:** Bütün node-lar eyni zamanda eyni məlumatı görür.
- **Əhəmiyyəti:** İstifadəçilər həmişə ən son yazılmış məlumatı oxuyurlar.
- **Nümunə:** Bank hesabı balansının bütün node-larda eyni olması.

### Availability (A)

- **Təsvir:** Hər bir sorğu (uğurlu və ya uğursuz) cavab alır.
- **Əhəmiyyəti:** Sistem həmişə əlçatan olur, hətta bəzi node-lar nasaz olsa belə.
- **Nümunə:** E-commerce saytının həmişə istifadəçi sorğularına cavab verməsi.

### Partition Tolerance (P)

- **Təsvir:** Sistem, node-lar arasında ünsiyyət kəsilsə belə işləməyə davam edir.
- **Əhəmiyyəti:** Şəbəkə problemləri zamanı sistem funksionallığını qoruyur.
- **Nümunə:** Bir data mərkəzi digərləri ilə əlaqəni itirdikdə belə işləməyə davam edir.

### CAP Seçimləri

Distributed sistemlər adətən aşağıdakı kombinasiyalardan birini seçir:

- **CA (Consistency + Availability):** Partition tolerance-ı qurban verir. Şəbəkə bölünmələrinə dözümsüzdür.
  - **Nümunə:** Traditional single-node RDBMS.

- **CP (Consistency + Partition Tolerance):** Availability-ni qurban verir. Şəbəkə bölünməsi zamanı bəzi node-lar əlçatmaz ola bilər.
  - **Nümunə:** HBase, MongoDB (default configuration).

- **AP (Availability + Partition Tolerance):** Consistency-ni qurban verir. Eventual consistency modelini istifadə edir.
  - **Nümunə:** Cassandra, Amazon DynamoDB.

> CAP teoreminə görə, sistem eyni anda yalnız iki xüsusiyyəti tam təmin edə bilər. Partition tolerant sistemlərdə ya Consistency, ya da Availability qurban verilir. Müasir distributed sistemlər çox vaxt bu iki xüsusiyyət arasında balans yaratmağa çalışır.
