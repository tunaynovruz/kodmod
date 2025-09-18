---
draft: true
---
# Optimistic vs Pessimistic Lock
draft: true


Verilənlər bazasında konkurent (eyni zamanda) əməliyyatlar zamanı məlumatın bütövlüyünü qorumaq üçün iki əsas yanaşma mövcuddur: Optimistic Lock (nikbin kilid) və Pessimistic Lock (bədbin kilid). Bu iki strategiya, eyni məlumatın eyni zamanda bir neçə istifadəçi tərəfindən dəyişdirilməsi zamanı yaranan konfliktləri idarə etmək üçün fərqli metodlar təklif edir.

## Optimistic Lock (Nikbin Kilid)

### Əsas Prinsip

Optimistic Lock strategiyası "konfliktlər nadir hallarda baş verir" fərziyyəsinə əsaslanır. Bu yanaşmada, məlumat oxunarkən kilidlənmir, əksinə, məlumatın dəyişdirilməsi zamanı onun başqa bir proses tərəfindən dəyişdirilib-dəyişdirilmədiyini yoxlamaq üçün versiya nəzarəti istifadə olunur.

### Necə İşləyir

1. **Versiya İzləmə:** Hər bir yazı üçün version, timestamp və ya hash kimi bir izləmə mexanizmi saxlanılır.
2. **Oxuma:** Məlumat oxunarkən, cari versiya da götürülür.
3. **Yeniləmə:** Məlumat yenilənərkən, cari versiya ilə əvvəl oxunan versiya müqayisə edilir.
4. **Konflikt Yoxlaması:** Əgər versiyalar fərqlidirsə, bu o deməkdir ki, başqa bir proses artıq məlumatı dəyişdirib və konflikt baş verib.
5. **Həll:** Konflikt halında, əməliyyat geri qaytarılır (rollback) və ya xüsusi konflikt həlli tətbiq edilir.

### Üstünlükləri

- **Yüksək Konkurentlik:** Kilidlər olmadığı üçün daha çox paralel əməliyyata imkan verir.
- **Deadlock Yoxdur:** Kilidlər olmadığı üçün deadlock (qarşılıqlı bloklama) riski yoxdur.
- **Resurs Qənaəti:** Kilidlərin idarə edilməsi üçün əlavə sistem resursları tələb olunmur.

### Çatışmazlıqları

- **Konflikt Həlli Yükü:** Konflikt baş verdikdə, əməliyyatın təkrarlanması lazım gəlir ki, bu da əlavə iş deməkdir.
- **Tətbiq Mürəkkəbliyi:** Versiya izləmə və konflikt həlli mexanizmlərinin tətbiqi mürəkkəb ola bilər.
- **Yüksək Konflikt Mühitləri:** Tez-tez konflikt baş verən mühitlərdə performans problemi yarada bilər.

### İstifadə Halları

- **Oxu-Ağır Sistemlər:** Oxuma əməliyyatları yazma əməliyyatlarından daha çox olan sistemlər.
- **Nadir Konfliktlər:** Eyni məlumatın eyni zamanda dəyişdirilməsi ehtimalı aşağı olan sistemlər.
- **Web Tətbiqləri:** İstifadəçi sessiyaları qısa müddətli olan və konfliktlərin nadir olduğu web tətbiqləri.

## Pessimistic Lock (Bədbin Kilid)

### Əsas Prinsip

Pessimistic Lock strategiyası "konfliktlər tez-tez baş verir" fərziyyəsinə əsaslanır. Bu yanaşmada, məlumat dəyişdirilmədən əvvəl kilidlənir və digər proseslərin həmin məlumatı dəyişdirməsinə icazə verilmir.

### Necə İşləyir

1. **Kilid Əldə Etmə:** Məlumat oxunarkən və ya dəyişdirilərkən, əvvəlcə kilid əldə edilir.
2. **Əməliyyat:** Kilid əldə edildikdən sonra, məlumat üzərində əməliyyatlar aparılır.
3. **Kilid Azad Etmə:** Əməliyyat tamamlandıqdan sonra kilid azad edilir.
4. **Gözləmə:** Digər proseslər kilid azad edilənə qədər gözləməli olurlar.

### Üstünlükləri

- **Konflikt Qarşısının Alınması:** Konfliktlər əvvəlcədən qarşısı alınır, çünki eyni məlumat üzərində eyni zamanda yalnız bir proses işləyə bilər.
- **Məlumat Bütövlüyü:** Məlumatın bütövlüyünü təmin etmək daha asandır.
- **Sadə Tətbiq:** Bir çox verilənlər bazası sistemləri daxili pessimistic locking mexanizmləri təqdim edir.

### Çatışmazlıqları

- **Aşağı Konkurentlik:** Kilidlər digər prosesləri bloklaşdırdığı üçün konkurentlik azalır.
- **Deadlock Riski:** Qarşılıqlı kilid gözləmələri deadlock-a səbəb ola bilər.
- **Resurs Sərfiyyatı:** Kilidlərin idarə edilməsi əlavə sistem resursları tələb edir.

### İstifadə Halları

- **Yazı-Ağır Sistemlər:** Yazma əməliyyatları oxuma əməliyyatlarından daha çox və ya eyni dərəcədə olan sistemlər.
- **Tez-tez Konfliktlər:** Eyni məlumatın eyni zamanda dəyişdirilməsi ehtimalı yüksək olan sistemlər.
- **Maliyyə Sistemləri:** Məlumat bütövlüyünün kritik əhəmiyyət daşıdığı maliyyə və bank sistemləri.

## Müqayisə Cədvəli

| Xüsusiyyət | Optimistic Lock | Pessimistic Lock |
|------------|-----------------|------------------|
| Kilid Mexanizmi | Versiya izləmə | Fiziki kilid |
| Konflikt Həlli | Konflikt baş verdikdən sonra | Konflikt baş verməzdən əvvəl |
| Konkurentlik | Yüksək | Aşağı |
| Deadlock Riski | Yoxdur | Var |
| Resurs Sərfiyyatı | Aşağı | Yüksək |
| İstifadə Sahəsi | Oxu-ağır, nadir konfliktlər | Yazı-ağır, tez-tez konfliktlər |
| Performans (Yüksək Konflikt) | Aşağı | Yüksək |
| Performans (Aşağı Konflikt) | Yüksək | Orta |

## Praktiki Nümunələr

### Optimistic Lock Nümunəsi (SQL)

```sql
-- 1. Məlumatı oxu və versiyasını götür
SELECT id, data, version FROM items WHERE id = 1;

-- 2. Məlumatı yenilə, versiya yoxlaması ilə
UPDATE items 
SET data = 'new value', version = version + 1 
WHERE id = 1 AND version = 5;

-- 3. Əgər heç bir sətir yenilənməyibsə, konflikt baş verib
```

### Pessimistic Lock Nümunəsi (SQL)

```sql
-- 1. Tranzaksiya başlat və kilid əldə et
BEGIN TRANSACTION;
SELECT id, data FROM items WHERE id = 1 FOR UPDATE;

-- 2. Məlumatı yenilə
UPDATE items SET data = 'new value' WHERE id = 1;

-- 3. Tranzaksiyanı tamamla və kilidi azad et
COMMIT;
```

