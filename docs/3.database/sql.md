---
draft: true
---
# SQL (Structured Query Language)
draft: true

SQL, verilənlər bazası ilə əlaqə qurmaq üçün istifadə olunan standart sorğu dilidir. Bu dil vasitəsilə verilənlər bazasında məlumatları yaratmaq, oxumaq, yeniləmək və silmək mümkündür.

## SQL Kateqoriyaları

### Data Definition Language (DDL)

DDL, verilənlər bazasının strukturunu yaratmaq, dəyişdirmək və silmək üçün istifadə olunur.

- **CREATE:** Yeni verilənlər bazası obyektləri (cədvəllər, indekslər, görünüşlər) yaradır.
  ```sql
  CREATE TABLE istifadeciler (
      id INT PRIMARY KEY,
      ad VARCHAR(50),
      soyad VARCHAR(50),
      email VARCHAR(100) UNIQUE
  );
  ```

- **ALTER:** Mövcud obyektlərin strukturunu dəyişdirir.
  ```sql
  ALTER TABLE istifadeciler ADD COLUMN dogum_tarixi DATE;
  ```

- **DROP:** Obyektləri silir.
  ```sql
  DROP TABLE istifadeciler;
  ```

- **TRUNCATE:** Cədvəldəki bütün məlumatları silir, lakin cədvəl strukturunu saxlayır.
  ```sql
  TRUNCATE TABLE istifadeciler;
  ```

### Data Manipulation Language (DML)

DML, verilənlər bazasındakı məlumatları manipulyasiya etmək üçün istifadə olunur.

- **SELECT:** Məlumatları oxuyur.
  ```sql
  SELECT ad, soyad FROM istifadeciler WHERE yas > 25;
  ```

- **INSERT:** Yeni məlumat əlavə edir.
  ```sql
  INSERT INTO istifadeciler (id, ad, soyad, email) VALUES (1, 'Əli', 'Məmmədov', 'ali@example.com');
  ```

- **UPDATE:** Mövcud məlumatları yeniləyir.
  ```sql
  UPDATE istifadeciler SET yas = 30 WHERE id = 1;
  ```

- **DELETE:** Məlumatları silir.
  ```sql
  DELETE FROM istifadeciler WHERE id = 1;
  ```

### Data Control Language (DCL)

DCL, verilənlər bazasına giriş icazələrini idarə etmək üçün istifadə olunur.

- **GRANT:** İstifadəçilərə müəyyən icazələr verir.
  ```sql
  GRANT SELECT, INSERT ON istifadeciler TO user1;
  ```

- **REVOKE:** İstifadəçilərdən icazələri geri alır.
  ```sql
  REVOKE INSERT ON istifadeciler FROM user1;
  ```

### Transaction Control Language (TCL)

TCL, tranzaksiyaları idarə etmək üçün istifadə olunur və ACID prinsiplərinin tətbiqini təmin edir.

- **COMMIT:** Tranzaksiyanı təsdiqləyir və dəyişiklikləri daimi edir.
  ```sql
  BEGIN;
  UPDATE hesablar SET balans = balans - 100 WHERE hesab_id = 1;
  UPDATE hesablar SET balans = balans + 100 WHERE hesab_id = 2;
  COMMIT;
  ```

- **ROLLBACK:** Tranzaksiyanı geri qaytarır və dəyişiklikləri ləğv edir.
  ```sql
  BEGIN;
  UPDATE hesablar SET balans = balans - 100 WHERE hesab_id = 1;
  -- Xəta baş verdi
  ROLLBACK;
  ```

- **SAVEPOINT:** Tranzaksiya daxilində yaddaş nöqtəsi yaradır.
  ```sql
  BEGIN;
  SAVEPOINT sp1;
  -- Əməliyyatlar
  ROLLBACK TO sp1;
  COMMIT;
  ```

## SQL Sorğusunun İcra Mərhələləri

SQL sorğusu verilənlər bazası mühərriki tərəfindən bir neçə mərhələdə emal olunur:

1. **Parsing (Təhlil):** 
   - SQL sorğusu sintaksis və semantika baxımından yoxlanılır
   - Parse tree (sintaksis ağacı) yaradılır
   - Sorğunun düzgünlüyü təsdiqlənir

2. **Optimization (Optimallaşdırma):**
   - Query Planner müxtəlif icra planlarını qiymətləndirir
   - Statistika və indekslər əsasında ən effektiv plan seçilir
   - Execution plan (icra planı) yaradılır

3. **Execution (İcra):**
   - Seçilmiş plan üzrə məlumatlar oxunur
   - Filtrlər, birləşmələr (joins) və digər əməliyyatlar yerinə yetirilir
   - Nəticə dəsti formalaşdırılır

4. **Result Return (Nəticənin Qaytarılması):**
   - Emal edilmiş məlumatlar istifadəçiyə qaytarılır
   - Böyük nəticə dəstləri adətən hissə-hissə (chunk) qaytarılır

## SQL Optimallaşdırma Üsulları

### İndekslərdən İstifadə

```sql
CREATE INDEX idx_istifadeci_email ON istifadeciler(email);
```

### Sorğu Optimallaşdırması

- **WHERE şərtlərinin düzgün istifadəsi:**
  ```sql
  -- Yaxşı
  SELECT * FROM sifarisler WHERE musteri_id = 100;

  -- Pis (indeks istifadə edilmir)
  SELECT * FROM sifarisler WHERE YEAR(sifaris_tarixi) = 2023;
  ```

- **JOIN əməliyyatlarının optimallaşdırılması:**
  ```sql
  -- İndeksli sütunlar üzərində JOIN
  SELECT m.ad, s.mebleg
  FROM musteriler m
  JOIN sifarisler s ON m.id = s.musteri_id;
  ```

- **EXPLAIN istifadəsi:**
  ```sql
  EXPLAIN SELECT * FROM sifarisler WHERE musteri_id = 100;
  ```

## Ümumi SQL Funksiyaları

### Aqreqat Funksiyalar

- **COUNT:** Sətirlərin sayını hesablayır
  ```sql
  SELECT COUNT(*) FROM sifarisler WHERE musteri_id = 100;
  ```

- **SUM:** Dəyərlərin cəmini hesablayır
  ```sql
  SELECT SUM(mebleg) FROM sifarisler WHERE musteri_id = 100;
  ```

- **AVG, MIN, MAX:** Orta, minimum və maksimum dəyərləri hesablayır
  ```sql
  SELECT AVG(mebleg), MIN(mebleg), MAX(mebleg) FROM sifarisler;
  ```

### String Funksiyaları

- **CONCAT, SUBSTRING, UPPER, LOWER:** Mətn manipulyasiyaları
  ```sql
  SELECT CONCAT(ad, ' ', soyad) AS tam_ad FROM istifadeciler;
  ```

### Tarix Funksiyaları

- **NOW, DATE_ADD, DATEDIFF:** Tarix əməliyyatları
  ```sql
  SELECT * FROM sifarisler WHERE sifaris_tarixi > DATE_SUB(NOW(), INTERVAL 30 DAY);
  ```

## Nəticə

SQL, verilənlər bazası ilə işləmək üçün güclü və universal bir dildir. Düzgün istifadə edildikdə, SQL sorğuları vasitəsilə mürəkkəb məlumat əməliyyatlarını effektiv şəkildə həyata keçirmək mümkündür. Sorğuların optimallaşdırılması və indekslərin düzgün istifadəsi, verilənlər bazası tətbiqlərinin performansını əhəmiyyətli dərəcədə artıra bilər.
