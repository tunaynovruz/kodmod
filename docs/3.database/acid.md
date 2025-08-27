---
draft: true
---
# ACID Prinsipləri


## ACID Nədir?

ACID, verilənlər bazası tranzaksiyalarının etibarlılığını təmin edən dörd əsas xüsusiyyəti təsvir edən bir akronimdir. Bu prinsiplər, xüsusilə relyasion verilənlər bazalarında, məlumatların bütövlüyünü və etibarlılığını qorumaq üçün kritik əhəmiyyət daşıyır.

## ACID Komponentləri

### Atomicity (Atomluq)

- **Təsvir:** Tranzaksiya "ya hər şey, ya da heç nə" prinsipi ilə işləyir. Tranzaksiya ya tam şəkildə uğurla tamamlanır, ya da heç bir dəyişiklik tətbiq edilmir.
- **Nümunə:** Bank köçürməsi zamanı bir hesabdan pul çıxarılır və digərinə əlavə edilir. Əgər ikinci əməliyyat uğursuz olarsa, birinci əməliyyat da geri qaytarılmalıdır.
- **Texniki Tətbiq:** Rollback və commit mexanizmləri vasitəsilə həyata keçirilir.

### Consistency (Uyğunluq)

- **Təsvir:** Tranzaksiya yalnız verilənlər bazasını bir düzgün vəziyyətdən digər düzgün vəziyyətə keçirə bilər. Bütün məlumat bütövlüyü qaydaları, məhdudiyyətlər və triqqerlər qorunmalıdır.
- **Nümunə:** Əgər bir sütunda unikal dəyər məhdudiyyəti varsa, tranzaksiya bu məhdudiyyəti pozan dəyişiklik edə bilməz.
- **Texniki Tətbiq:** Constraints, foreign keys, triggers və digər bütövlük mexanizmləri ilə təmin edilir.

### Isolation (İzolyasiya)

- **Təsvir:** Paralel işləyən tranzaksiyalar bir-birindən təcrid olunur. Bir tranzaksiyanın dəyişiklikləri digər tranzaksiyalar tərəfindən yalnız commit edildikdən sonra görünür.
- **Nümunə:** İki istifadəçi eyni məlumatı eyni anda yeniləyərkən, dəyişikliklər bir-birini əvəz etmir, əksinə ardıcıl tətbiq olunur.
- **Texniki Tətbiq:** Müxtəlif izolyasiya səviyyələri (Read Uncommitted, Read Committed, Repeatable Read, Serializable) və locking mexanizmləri ilə idarə olunur.

### Durability (Davamlılıq)

- **Təsvir:** Uğurla tamamlanmış (commit edilmiş) tranzaksiyanın nəticələri, hətta sistem xətası baş versə belə, daimi olaraq saxlanılır.
- **Nümunə:** Əgər istifadəçi məlumat yeniləməsini tamamladıqdan sonra sistem çöksə belə, yenilənmiş məlumat itirilməməlidir.
- **Texniki Tətbiq:** Write-ahead logging (WAL), database checkpoints və backup strategiyaları ilə təmin edilir.

## ACID və NoSQL

NoSQL verilənlər bazaları adətən CAP teoreminə əsasən ACID prinsiplərindən güzəştə gedirlər:

- **BASE (Basically Available, Soft state, Eventually consistent):** NoSQL-in ACID-ə alternativ yanaşması.
- **Eventual Consistency:** Vaxt keçdikcə bütün nüsxələr uyğunlaşır, amma anlıq fərqlər ola bilər.
- **Partition Tolerance:** Şəbəkə bölünmələrinə qarşı dayanıqlılıq, adətən Consistency-dən güzəşt hesabına əldə edilir.

## ACID-in Praktiki Tətbiqləri

- **Maliyyə Əməliyyatları:** Bank köçürmələri, ödənişlər və hesab balansları.
- **İnventory İdarəetməsi:** Məhsul sayının dəqiq izlənməsi.
- **Rezervasiya Sistemləri:** Otel, təyyarə və ya restoran rezervasiyaları.
- **Sağlamlıq Məlumatları:** Pasiyent qeydləri və tibbi tarixçələr.

## ACID vs BASE

| Xüsusiyyət | ACID | BASE |
|------------|------|------|
| Consistency | İmmediate | Eventual |
| Availability | Güzəşt edilə bilər | Yüksək prioritet |
| Partition Tolerance | Aşağı | Yüksək |
| İstifadə sahəsi | Maliyyə, kritik məlumatlar | Böyük həcmli, paylanmış sistemlər |
| Nümunə DB | PostgreSQL, MySQL | MongoDB, Cassandra |

## Nəticə

ACID prinsipləri, xüsusilə məlumat bütövlüyünün kritik əhəmiyyət daşıdığı sistemlərdə, verilənlər bazası tranzaksiyalarının etibarlılığını təmin etmək üçün fundamental əhəmiyyət daşıyır. Müasir verilənlər bazası sistemləri, tətbiqin ehtiyaclarına uyğun olaraq, ACID və BASE prinsipləri arasında balans yaratmağa çalışır.