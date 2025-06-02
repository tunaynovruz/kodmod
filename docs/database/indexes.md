# Index

## Indexes Overview

- Indexes verilənlər bazasının performansını artırır, məlumatların daha sürətli tapılmasını təmin edir.
- Məzmun siyahısına bənzəyir: məlumatın fiziki yerini göstərir.
- Tam cədvəl skanlarından qaçmağa kömək edir, sürətli giriş üçün.

## Nə üçün istifadə olunur?

- Məlumatın sürətli alınması: Disk I/O əməliyyatlarını azaldır.
- Sortlama və sıralama: Müəyyən kriteriyaya görə sıralamanı sürətləndirir.

## How Indexes Improve Query Performance

- Azaldılmış cədvəl skanları: Hər sətri oxumaq əvəzinə, yalnız index-lənmiş məlumatlara daxil olur.
- Effektiv məlumat əldə etmə: Sorğu şərtlərinə uyğun sətrləri tez tapır.
- Index selectivity: Yüksək selectivity = az sətrin emalı, daha yaxşı performans.

## How Indexes Decrease Write Performance

- Yazma əməliyyatları yavaşıyır: Insert, update, delete zamanı index də yenilənməlidir.
- Yaddaş xərci: Index-lər əlavə yaddaş tutumu tələb edir.
- Balans vacibdir: Çox index yazı performansını zəiflədə bilər.



### İstifadə nümunələri

- `indexed_column LIKE 'abc%'` — index istifadə olunur, axtarış daralır.
- `indexed_column LIKE '%abc'` — tam cədvəl skanı olur, index effektiv deyil.
- Search — index-dən oxuma.
- Insert — index yenilənir.
- Delete — index-dən silinir (yazı intensivdirsə, vaxt apara bilər).
- Index data strukturları: B-Tree, Hash index.

---

### Index növləri

1. **Clustered Index**
    - Məlumatın fiziki sırası index ilə uyğun gəlir.
    - Cədvəldə yalnız bir dənə ola bilər.
    - Nümunə: Doğum tarixinə görə sıralama.

2. **Non-Clustered Index**
    - Fiziki məlumatdan ayrı strukturda saxlanılır.
    - Cədvəldə bir neçə non-clustered index ola bilər.
    - Nümunə: Soyad üzrə index.

3. **Unique Index**
    - Duplicat dəyərlərə icazə vermir.
    - Nümunə: Email sütununda unikal index.

4. **Partial Index**
    - Yalnız müəyyən şərtlərə uyğun sətrlərdə index.
    - Nümunə: Status = 'Active'.

5. **Filtered Index (SQL Server)**
    - Partial index kimi, amma daha spesifik şərtlərlə.
    - Nümunə: Qiymət > 100.

6. **Full-Text Index**
    - Mətn axtarışlarını dəstəkləyir (natural language queries).
    - Nümunə: Description sütununda axtarış.

7. **Spatial Index**
    - Məkan məlumatlarına optimallaşdırılmış index.
    - Nümunə: GeoCoordinates üzrə yaxınlıq axtarışı.


## Digər

- Primary key (pk) avtomatik index olunur.
- Composite index — birdən çox sütuna tətbiq olunur.