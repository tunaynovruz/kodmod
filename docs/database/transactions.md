# Transactions (Tranzaksiyalar)

## Tranzaksiya Anomaliyaları (Transaction Phenomena)

Tranzaksiyaların paralel işləməsi zamanı müxtəlif anomaliyalar baş verə bilər. Bu anomaliyalar məlumatın bütövlüyünə və uyğunluğuna təsir göstərə bilər:

### Dirty Read (Çirkli Oxuma)

- **Təsvir:** Bir tranzaksiya, başqa bir tranzaksiyanın hələ commit edilməmiş (təsdiqlənməmiş) dəyişikliklərini oxuyur.
- **Problem:** Əgər yazı tranzaksiyası rollback edilərsə (geri qaytarılarsa), oxunan məlumat etibarsız olur.
- **Nümunə:** Tranzaksiya A hesaba 100 manat əlavə edir, amma hələ commit etmir. Tranzaksiya B yeni balansı oxuyur və istifadə edir. Sonra A rollback edilir.

### Nonrepeatable Read (Təkrarlanmayan Oxuma)

- **Təsvir:** Bir tranzaksiya əvvəl oxuduğu məlumatı yenidən oxuyur və görür ki, məlumat başqa bir tranzaksiya tərəfindən dəyişdirilib (ilk oxumadan sonra commit edilib).
- **Problem:** Eyni tranzaksiya daxilində eyni məlumatın müxtəlif dəyərləri alınır.
- **Nümunə:** Tranzaksiya A müştərinin balansını oxuyur (1000 manat). Tranzaksiya B balansı 900 manata dəyişdirir və commit edir. Tranzaksiya A balansı yenidən oxuyur və artıq 900 manat görür.

### Phantom Read (Fantom Oxuma)

- **Təsvir:** Bir tranzaksiya müəyyən şərtə uyğun sətirlər dəstini qaytaran sorğunu təkrar icra edir və görür ki, bu dəstə başqa bir tranzaksiyanın commit edilməsi nəticəsində dəyişib.
- **Problem:** Eyni sorğu müxtəlif nəticələr qaytarır, çünki başqa tranzaksiyalar yeni sətirlər əlavə edib və ya mövcud sətirləri silib.
- **Nümunə:** Tranzaksiya A "yaşı 30-dan çox olan bütün müştəriləri" seçir. Tranzaksiya B yeni 35 yaşlı müştəri əlavə edir və commit edir. Tranzaksiya A eyni sorğunu təkrar icra etdikdə, əlavə sətir görünür.

### Serialization Anomaly (Seriallaşdırma Anomaliyası)

- **Təsvir:** Bir qrup tranzaksiyanın uğurla commit edilməsinin nəticəsi, bu tranzaksiyaların bir-bir icra edilməsinin bütün mümkün sıralamalarına uyğun gəlmir.
- **Problem:** Paralel icra zamanı elə nəticələr əldə edilir ki, bu nəticələr heç bir ardıcıl icra ssenarisinə uyğun gəlmir.
- **Nümunə:** İki tranzaksiya eyni zamanda iki müxtəlif hesabdan pul çıxarır və bir-birinin hesabına köçürür. Paralel icra zamanı hər iki hesabda kifayət qədər vəsait olmaya bilər, amma ardıcıl icra zamanı problem yaranmaz.

## Verilənlər Bazasında Vacib Konsepsiyalar

### Consistency (Uyğunluq)

- **Təsvir:** Məlumatlar məntiqi cəhətdən düzgün olmalıdır.
- **Əhəmiyyəti:** Tranzaksiya verilənlər bazasını bir düzgün vəziyyətdən digər düzgün vəziyyətə keçirməlidir.
- **Nümunə:** Bank hesabından pul çıxarıldıqda, balans mənfi olmamalıdır (əgər overdraft icazəsi yoxdursa).

### Integrity (Bütövlük)

- **Təsvir:** Məlumatlar bütün məhdudiyyətlərə (constraints) uyğun olmalıdır.
- **Növləri:**
  - **Entity Integrity:** Hər bir sətir unikal identifikator ilə müəyyən edilməlidir (Primary Key).
  - **Referential Integrity:** Foreign key dəyərləri ya NULL olmalı, ya da əlaqəli cədvəldə mövcud olmalıdır.
  - **Domain Integrity:** Sütun dəyərləri müəyyən edilmiş data tipinə və məhdudiyyətlərə uyğun olmalıdır.
- **Nümunə:** Sifarişlər cədvəlindəki müştəri ID-si müştərilər cədvəlində mövcud olmalıdır.

## Tranzaksiya İzolyasiya Səviyyələri (Transaction Isolation Levels)

İzolyasiya səviyyələri, paralel işləyən tranzaksiyaların bir-birinə necə təsir göstərəcəyini müəyyən edir. SQL standartı dörd əsas izolyasiya səviyyəsini müəyyən edir:

### 1. Read Uncommitted (Təsdiqlənməmiş Oxuma)

- **Təsvir:** Ən aşağı izolyasiya səviyyəsi. Tranzaksiyalar digər tranzaksiyaların hələ commit edilməmiş dəyişikliklərini görə bilər.
- **Anomaliyalar:** Dirty read, nonrepeatable read və phantom read baş verə bilər.
- **İstifadə halları:** Dəqiqlik tələb olunmayan, ümumi statistika və ya trend analizi kimi əməliyyatlar üçün.
- **Performans:** Ən yüksək performans, amma ən az etibarlılıq.

### 2. Read Committed (Təsdiqlənmiş Oxuma)

- **Təsvir:** Tranzaksiyalar yalnız digər tranzaksiyaların commit edilmiş dəyişikliklərini görə bilər.
- **Mexanizm:** Oxu zamanı lock qoyulur və oxu bitəndən sonra buraxılır.
- **Anomaliyalar:** Nonrepeatable read və phantom read baş verə bilər, amma dirty read qarşısı alınır.
- **İstifadə halları:** Əksər biznes tətbiqləri üçün standart seçim.
- **Performans:** Yaxşı balanslaşdırılmış performans və etibarlılıq.

### 3. Repeatable Read (Təkrarlanan Oxuma)

- **Təsvir:** Tranzaksiya ərzində oxunan məlumat dəyişmir, eyni sorğu hər dəfə eyni nəticəni qaytarır.
- **Mexanizm:** Lock tranzaksiya sonuna qədər saxlanılır.
- **Anomaliyalar:** Phantom read baş verə bilər, amma dirty read və nonrepeatable read qarşısı alınır.
- **İstifadə halları:** Hesabat və analitik sorğular kimi, eyni məlumatın dəfələrlə oxunduğu əməliyyatlar.
- **Performans:** Orta performans, yüksək etibarlılıq.

### 4. Serializable (Seriallaşdırıla bilən)

- **Təsvir:** Ən yüksək izolyasiya səviyyəsi. Tranzaksiyalar bir-birindən tam təcrid olunur.
- **Mexanizm:** Oxu və yazı üçün geniş lock; tam ardıcıllıq təmin edir.
- **Anomaliyalar:** Bütün anomaliyaların qarşısı alınır.
- **İstifadə halları:** Maliyyə əməliyyatları, kritik biznes prosesləri kimi yüksək dəqiqlik tələb edən əməliyyatlar.
- **Performans:** Ən aşağı performans, ən yüksək etibarlılıq.

## Locking Mexanizmləri

Verilənlər bazası sistemləri, konkurent tranzaksiyaları idarə etmək üçün müxtəlif locking (kilid) mexanizmlərindən istifadə edir:

### Locking Strategiyaları

#### Pessimistic Locking (Bədbin Kilid)

- **Təsvir:** Məlumat dəyişdirilmədən əvvəl kilid qoyulur və digər tranzaksiyaların həmin məlumatı dəyişdirməsinə icazə verilmir.
- **Mexanizm:** `SELECT ... FOR UPDATE` kimi əmrlərlə tətbiq olunur.
- **Üstünlüklər:** Konfliktlərin qarşısını əvvəlcədən alır, məlumat bütövlüyünü təmin edir.
- **Çatışmazlıqlar:** Deadlock riski, aşağı konkurentlik.

#### Optimistic Locking (Nikbin Kilid)

- **Təsvir:** Məlumat sərbəst dəyişdirilir, amma commit zamanı konflikt yoxlanılır.
- **Mexanizm:** Versiya nömrəsi və ya timestamp kimi izləmə mexanizmləri istifadə olunur.
- **Üstünlüklər:** Yüksək konkurentlik, deadlock riski yoxdur.
- **Çatışmazlıqlar:** Konflikt baş verdikdə əməliyyatın təkrarlanması lazım gəlir.

### 2-Phase Locking (2PL)

- **Təsvir:** Tranzaksiya iki fazada həyata keçirilir: əvvəlcə bütün lazımi kilidlər əldə edilir (growing phase), sonra isə kilidlər azad edilir (shrinking phase).
- **Məqsəd:** Seriallaşdırıla bilən tranzaksiyaları təmin etmək.
- **Üstünlüklər:** Məlumat uyğunluğunu (consistency) təmin edir.
- **Çatışmazlıqlar:** Deadlock riski, mürəkkəb idarəetmə.

### Kilid Növləri və İzolyasiya Səviyyələri

| Kilid Növü | Read Uncommitted | Read Committed | Repeatable Read | Serializable |
|------------|------------------|----------------|-----------------|--------------|
| **No Lock** | ✓ (Dirty reads icazəlidir) | ✗ | ✗ | ✗ |
| **Read Lock (Shared)** | ✗ | ✓ (Qısa müddətli) | ✓ (Tranzaksiya sonuna qədər saxlanılır) | ✓ (Tranzaksiya sonuna qədər saxlanılır) |
| **Write Lock (Exclusive)** | ✓ (Minimal) | ✓ (Dəyişdirilən məlumat üzərində) | ✓ (Dəyişdirilən məlumat üzərində) | ✓ (Dəyişdirilən məlumat üzərində) |
| **Range Lock** | ✗ | ✗ | ✗ | ✓ (Phantom read qarşısını alır) |
| **Intent Lock** | ✗ | ✓ (Hierarchical locking) | ✓ (Hierarchical locking) | ✓ (Hierarchical locking) |
| **Gap Lock** | ✗ | ✗ | ✓ (Bəzi verilənlər bazalarında) | ✓ (Phantom qarşısını alır) |

## Tranzaksiya İdarəetmə Praktikası

### Effektiv Tranzaksiya Dizaynı

1. **Qısa Tranzaksiyalar:** Tranzaksiyaları mümkün qədər qısa saxlayın ki, kilidlər tez azad edilsin.
2. **Minimal Əhatə:** Tranzaksiyaya yalnız zəruri əməliyyatları daxil edin.
3. **Uyğun İzolyasiya Səviyyəsi:** Tətbiqin tələblərinə uyğun izolyasiya səviyyəsi seçin.
4. **Deadlock İdarəetməsi:** Deadlock-ların qarşısını almaq üçün resursları həmişə eyni ardıcıllıqla kilid edin.

### Ümumi Problemlər və Həll Yolları

1. **Deadlock:** İki və ya daha çox tranzaksiya bir-birinin kilidini gözləyir.
   - **Həll:** Timeout mexanizmləri, deadlock detektoru, resurs sıralama.

2. **Livelock:** Tranzaksiyalar daim bir-birinə yol verir və heç biri tamamlanmır.
   - **Həll:** Random gözləmə müddətləri, prioritet mexanizmləri.

3. **Starvation:** Yüksək prioritetli tranzaksiyalar daim resursları tutur və aşağı prioritetli tranzaksiyalar heç vaxt icra olunmur.
   - **Həll:** Ədalətli növbə mexanizmləri, resurs limitləri.
