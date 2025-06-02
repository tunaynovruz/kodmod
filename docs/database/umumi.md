# Database üçün ümumi qeydlər


## DB-də istifadə olunan data strukturlar və tətbiq sahələri

- **Hashindex:** Açar dəyərlərə sürətli giriş üçün istifadə olunur, əsasən bərabər paylanmış verilənlərdə.
- **SSTable:** Diskdə saxlanılan sıralı key-value cütlükləri, LSM ağaclarında tətbiq edilir.
- **Inverted Index:** Mətn axtarışlarında sözlərdən sənədlərə keçid yaradır, full-text search üçün.
- **Suffix Tree:** Sətirin bütün sonluqlarını (suffix) saxlamaq üçün; sürətli string axtarışlarında istifadə olunur.
- **R-Tree:** Məkan məlumatlarının indeksləşdirilməsi üçün; coğrafi sorğular üçün optimallaşdırılmışdır.

---

## ACID prinsipləri

- **Atomicity:** Tranzaksiya ya tam, ya da heç yerinə yetirilməməlidir.
- **Consistency:** Tranzaksiya sonrası DB həmişə düzgün vəziyyətdə olur.
- **Isolation:** Paralel tranzaksiyalar bir-birinə təsir etmədən işləyir.
- **Durability:** Uğurlu tranzaksiyanın nəticəsi daimi olaraq saxlanılır.

- need ACID then RDBMS
---



---

## Sharding (horizontal partitioning)

- **Faydaları:**
    - Scalability artırır.
    - Məlumat izolyasiyası təmin edir.
    - Daha sürətli bərpa (recovery) imkanı verir.
    - Paralel processing dəstəkləyir.

### Sharding növləri

- **Range-based Sharding:** Açarlar aralıqlara bölünür.
- **Hash-based Sharding:** Açarların hash dəyərinə görə bölünmə.
- **Directory-based Sharding:** Mərkəzi kataloq vasitəsilə yönləndirmə.

---

## Partitioning (Vertical)

- Məlumat sütunlara bölünür, əlaqəli sahələr ayrı hissələrdə saxlanır.
- Məsələn, istifadəçinin şəxsi məlumatları və statistikaları fərqli partition-larda ola bilər.

---

## CAP Teoremi

- **Consistency:** Bütün node-larda məlumat eynidir.
- **Availability:** Hər sorğuya cavab verilir.
- **Partition Tolerance:** Şəbəkə bölünmələrinə (partition) qarşı dayanıqlıdır.

> CAP teoreminə görə, sistem eyni anda yalnız iki xüsusiyyəti tam təmin edə bilər. Partition tolerant sistemlərdə ya Consistency, ya da Availability qurban verilir.

