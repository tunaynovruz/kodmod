# İndekslər (Indexes)
draft: true

## İndeks Nədir?

İndeks, verilənlər bazasında məlumatların daha sürətli tapılmasını təmin edən xüsusi bir data strukturudur. Kitabın sonundakı məzmun siyahısına bənzəyir - konkret məlumatın verilənlər bazasında harada yerləşdiyini göstərir.

## İndekslərin Əsas Xüsusiyyətləri

- **Sürətli Axtarış:** Verilənlər bazasının performansını əhəmiyyətli dərəcədə artırır.
- **Fiziki Göstərici:** Məlumatın fiziki yerini göstərir, birbaşa giriş təmin edir.
- **Optimallaşdırılmış Sorğular:** Tam cədvəl skanlarından (full table scan) qaçmağa kömək edir.
- **Dinamik Struktur:** Məlumat dəyişdikcə avtomatik yenilənir.

## İndekslərin İstifadə Məqsədləri

### 1. Məlumatın Sürətli Əldə Edilməsi

- **Disk I/O Optimallaşdırması:** Fiziki disk oxuma əməliyyatlarının sayını əhəmiyyətli dərəcədə azaldır.
- **Nümunə:** 1 milyon sətirlik cədvəldə konkret bir müştərini tapmaq üçün bütün sətirləri oxumaq əvəzinə, indeks vasitəsilə birbaşa həmin sətrə daxil olmaq.

### 2. Sortlama və Sıralama Əməliyyatlarının Sürətləndirilməsi

- **Əvvəlcədən Sıralanmış Məlumat:** İndekslər adətən sıralanmış şəkildə saxlanılır.
- **ORDER BY Optimallaşdırması:** Sorğularda ORDER BY əmrinin performansını artırır.
- **Nümunə:** Müştəriləri soyadına görə sıralamaq üçün soyad sütununda indeks yaratmaq.

## İndekslər Sorğu Performansını Necə Artırır?

### Azaldılmış Cədvəl Skanları

- **Seçici Giriş:** Hər sətri ardıcıl oxumaq əvəzinə, yalnız indekslənmiş məlumatlara daxil olur.
- **Nümunə:** 
  ```sql
  -- İndekssiz (tam cədvəl skanı)
  SELECT * FROM musteriler WHERE email = 'example@mail.com';

  -- İndekslə (birbaşa giriş)
  CREATE INDEX idx_email ON musteriler(email);
  SELECT * FROM musteriler WHERE email = 'example@mail.com';
  ```

### Effektiv Məlumat Əldə Etmə

- **Dəqiq Yerləşmə:** Sorğu şərtlərinə uyğun sətrləri daha tez tapır.
- **Birləşmələrin (Joins) Optimallaşdırılması:** Cədvəllər arasında birləşmələri sürətləndirir.
- **Nümunə:** 
  ```sql
  -- İndekslənmiş birləşmə
  SELECT m.ad, s.tarix
  FROM musteriler m
  JOIN sifarisler s ON m.id = s.musteri_id
  WHERE m.seher = 'Bakı';
  ```

### İndeks Seçiciliyi (Index Selectivity)

- **Təsvir:** Unikal dəyərlərin sayının ümumi sətir sayına nisbəti.
- **Yüksək Seçicilik:** Yüksək seçicilik = az sətrin emalı = daha yaxşı performans.
- **Nümunə:** Şəxsiyyət vəsiqəsi nömrəsi yüksək seçiciliyə malikdir (hər şəxs unikaldır), amma cinsiyyət aşağı seçiciliyə malikdir (yalnız bir neçə dəyər var).

## İndekslər Yazı Performansını Necə Azaldır?

### Yazma Əməliyyatlarının Yavaşlaması

- **İndeks Yenilənməsi:** INSERT, UPDATE, DELETE əməliyyatları zamanı indekslər də yenilənməlidir.
- **Əlavə İş Yükü:** Hər yazı əməliyyatı əlavə indeks yeniləmə əməliyyatlarına səbəb olur.
- **Nümunə:** 5 indeksi olan bir cədvələ yeni sətir əlavə etdikdə, əslində 6 yazı əməliyyatı baş verir (1 data + 5 indeks).

### Yaddaş Xərci

- **Əlavə Saxlama Yeri:** İndekslər əlavə disk və ya yaddaş tutumu tələb edir.
- **Böyük Verilənlər Bazaları:** Böyük bazalarda indekslər əhəmiyyətli yaddaş tutumu işğal edə bilər.
- **Nümunə:** 1 GB ölçüsündə bir cədvəl üçün indekslər əlavə 300-500 MB tutum tələb edə bilər.

### Balans Vacibdir

- **Çox İndeks Problemi:** Həddindən artıq indeks yazı performansını əhəmiyyətli dərəcədə zəiflədə bilər.
- **Optimal İndeks Sayı:** Yalnız tez-tez istifadə olunan sorğular üçün indekslər yaradın.
- **İndeks Monitorinqi:** İstifadə olunmayan indeksləri müəyyən edin və silin.


## İndekslərin Praktiki İstifadəsi

### Sorğu Nümunələri və İndeks Effektivliyi

- **Effektiv İndeks İstifadəsi:**
  ```sql
  -- Prefix axtarışı - indeks effektiv istifadə olunur
  SELECT * FROM musteriler WHERE ad LIKE 'Əli%';

  -- Dəqiq uyğunluq - indeks effektiv istifadə olunur
  SELECT * FROM musteriler WHERE email = 'ali@example.com';
  ```

- **Qeyri-effektiv İndeks İstifadəsi:**
  ```sql
  -- Suffix axtarışı - indeks istifadə olunmur, tam cədvəl skanı baş verir
  SELECT * FROM musteriler WHERE ad LIKE '%ov';

  -- Funksiya tətbiqi - indeks istifadə olunmur
  SELECT * FROM musteriler WHERE UPPER(email) = 'ALI@EXAMPLE.COM';
  ```

### İndekslərin Müxtəlif Əməliyyatlarda Davranışı

- **SELECT (Axtarış):** İndeksdən oxuma əməliyyatı, performansı artırır.
  ```sql
  SELECT * FROM musteriler WHERE musteri_id = 12345;
  ```

- **INSERT (Əlavə etmə):** İndeks yenilənir, əlavə iş yükü yaradır.
  ```sql
  INSERT INTO musteriler (ad, soyad, email) VALUES ('Əli', 'Məmmədov', 'ali@example.com');
  ```

- **UPDATE (Yeniləmə):** İndekslənmiş sütun yeniləndikdə, indeks də yenilənir.
  ```sql
  UPDATE musteriler SET email = 'yeni.email@example.com' WHERE musteri_id = 12345;
  ```

- **DELETE (Silmə):** İndeksdən qeyd silinir, yazı intensiv olduqda vaxt apara bilər.
  ```sql
  DELETE FROM musteriler WHERE musteri_id = 12345;
  ```

## İndeks Data Strukturları

### B-Tree İndeks

- **Təsvir:** Ən geniş istifadə olunan indeks növü, balanslaşdırılmış ağac strukturu.
- **Üstünlüklər:** Dəqiq axtarış, aralıq axtarışı və prefix axtarışı üçün effektivdir.
- **İstifadə sahəsi:** Ümumi məqsədli indeksləmə, əksər relyasion verilənlər bazalarında standart.
- **Nümunə:** 
  ```sql
  CREATE INDEX idx_musteri_soyad ON musteriler(soyad);
  ```

### Hash İndeks

- **Təsvir:** Hash funksiyası əsasında işləyir, dəqiq uyğunluq üçün çox sürətlidir.
- **Üstünlüklər:** O(1) zamanda axtarış, çox sürətli dəqiq uyğunluq.
- **Çatışmazlıqlar:** Aralıq axtarışı və sıralama üçün uyğun deyil.
- **İstifadə sahəsi:** Key-value store, dəqiq uyğunluq tələb edən sorğular.
- **Nümunə:** 
  ```sql
  -- PostgreSQL-də hash indeks
  CREATE INDEX idx_musteri_email_hash ON musteriler USING HASH (email);
  ```

## İndeks Növləri

### 1. Clustered Index (Klasterləşdirilmiş İndeks)

- **Təsvir:** Məlumatın fiziki sırası indeks ilə uyğun gəlir, yəni məlumat indeks əsasında fiziki olaraq sıralanır.
- **Xüsusiyyətlər:** 
  - Hər cədvəldə yalnız bir clustered index ola bilər.
  - Adətən primary key üzərində avtomatik yaradılır.
  - Digər indekslərə nisbətən daha sürətli oxuma təmin edir.
- **Nümunə:** Tələbə qeydlərinin tələbə ID-sinə görə sıralanması.
- **SQL:**
  ```sql
  -- SQL Server-də clustered index
  CREATE CLUSTERED INDEX idx_telebeler_id ON telebeler(telebe_id);
  ```

### 2. Non-Clustered Index (Qeyri-klasterləşdirilmiş İndeks)

- **Təsvir:** Fiziki məlumatdan ayrı strukturda saxlanılır, məlumatın yerini göstərən pointerlər saxlayır.
- **Xüsusiyyətlər:**
  - Bir cədvəldə bir neçə non-clustered index ola bilər.
  - Clustered indeksə nisbətən daha az effektiv, amma daha çevik.
  - Əlavə yaddaş tələb edir.
- **Nümunə:** Tələbələrin soyadına görə indekslənməsi.
- **SQL:**
  ```sql
  CREATE INDEX idx_telebeler_soyad ON telebeler(soyad);
  ```

### 3. Unique Index (Unikal İndeks)

- **Təsvir:** Sütunda təkrarlanan dəyərlərin olmasına icazə vermir.
- **Xüsusiyyətlər:**
  - Data bütövlüyünü təmin edir.
  - Həm clustered, həm də non-clustered ola bilər.
  - Primary və unique constraint-lər avtomatik unikal indeks yaradır.
- **Nümunə:** Email ünvanlarının unikallığını təmin etmək.
- **SQL:**
  ```sql
  CREATE UNIQUE INDEX idx_musteriler_email ON musteriler(email);
  ```

### 4. Composite Index (Kompozit İndeks)

- **Təsvir:** Birdən çox sütuna tətbiq olunan indeks.
- **Xüsusiyyətlər:**
  - Sütunların sırası vacibdir (soldan sağa).
  - Bir neçə sütun üzrə filtrlənən sorğular üçün effektivdir.
  - İlk sütun üzrə filtrlənən sorğular üçün də istifadə oluna bilər.
- **Nümunə:** Ad və soyad kombinasiyası üzrə axtarış.
- **SQL:**
  ```sql
  CREATE INDEX idx_musteriler_ad_soyad ON musteriler(ad, soyad);
  ```

### 5. Partial/Filtered Index (Qismən/Filtrlənmiş İndeks)

- **Təsvir:** Yalnız müəyyən şərtlərə uyğun sətirlər üçün yaradılan indeks.
- **Xüsusiyyətlər:**
  - Daha az yaddaş tutumu.
  - Spesifik sorğular üçün daha yüksək performans.
  - Bütün verilənlər bazası sistemləri dəstəkləmir.
- **Nümunə:** Yalnız aktiv müştərilər üçün indeks.
- **SQL:**
  ```sql
  -- PostgreSQL-də partial index
  CREATE INDEX idx_sifarisler_aktiv ON sifarisler(sifaris_id) WHERE status = 'aktiv';
  ```

### 6. Full-Text Index (Tam Mətn İndeksi)

- **Təsvir:** Mətn axtarışlarını optimallaşdırmaq üçün xüsusi indeks növü.
- **Xüsusiyyətlər:**
  - Natural language queries dəstəkləyir.
  - Stemming, thesaurus, stop words kimi xüsusiyyətlər təqdim edir.
  - Böyük mətn sütunlarında effektiv axtarış.
- **Nümunə:** Məqalələrin mətnində açar sözlər üzrə axtarış.
- **SQL:**
  ```sql
  -- SQL Server-də full-text index
  CREATE FULLTEXT INDEX ON meqaleler(metn) KEY INDEX idx_meqale_id;
  ```

### 7. Spatial Index (Məkan İndeksi)

- **Təsvir:** Coğrafi və məkan məlumatları üçün optimallaşdırılmış indeks.
- **Xüsusiyyətlər:**
  - Məkan əsaslı sorğuları sürətləndirir.
  - Yaxınlıq axtarışı, kəsişmə və s. əməliyyatları dəstəkləyir.
  - Xüsusi alqoritmlər (R-tree, Quad-tree) istifadə edir.
- **Nümunə:** Müəyyən bir nöqtəyə yaxın yerləşən restoranların tapılması.
- **SQL:**
  ```sql
  -- PostgreSQL/PostGIS-də spatial index
  CREATE INDEX idx_restoranlar_yer ON restoranlar USING GIST (yer);
  ```

## İndeks İdarəetmə Praktikası

### Ən Yaxşı Təcrübələr

1. **Seçici İndeksləmə:** Yalnız tez-tez istifadə olunan sorğular üçün indekslər yaradın.
2. **İndeks Monitorinqi:** İstifadə olunmayan indeksləri müəyyən edin və silin.
3. **İndeks Baxımı:** Vaxtaşırı indeksləri yenidən qurma (rebuild) və ya yenidən təşkil etmə (reorganize).
4. **Primary Key Seçimi:** Effektiv primary key seçin, çünki bu avtomatik olaraq clustered index olur.
5. **Composite İndeks Sırası:** Ən çox filtrlənən sütunu əvvəldə yerləşdirin.

### Vacib Qeydlər

- **Primary Key Avtomatik İndekslənir:** Hər bir primary key avtomatik olaraq indekslənir.
- **İndeks Statistikası:** Verilənlər bazası mühərriki indeks statistikasından sorğu planı yaratmaq üçün istifadə edir.
- **İndeks Fragmentasiyası:** Zamanla indekslər fragmentasiya olunur və performans azalır.
- **İndeks Seçimi:** Query optimizer hansı indeksin istifadə olunacağına qərar verir.
