---
draft: true
title: Database Per Service Pattern
description: Mikroservislərə dair Database Per Service Pattern-in ətraflı izahı və tətbiqi
slug: /microservices/database-per-service-pattern
authors: [tunay]
tags: [mikroservislər, database, design patterns, arxitektura, məlumat idarəetməsi]
keywords: [Database Per Service, mikroservislər, məlumat bazası, service autonomy, data encapsulation]
hide_table_of_contents: false
---

# Database Per Service Pattern

## Database Per Service Pattern nədir?

Database Per Service Pattern mikroservislər arxitekturasında hər mikroservisə öz xüsusi məlumat bazasının təyin edildiyi dizayn prinsipidir. Bu, hər servisin mərkəzi, ortaq məlumat bazasından asılı olmadan müstəqil işləməsini təmin edir. Məlumat bazası həmin mikroservisin ehtiyaclarına uyğun olan istənilən növ ola bilər (SQL, NoSQL və s.).

## Əsas Məqsədlər

* **Müstəqillik:** Hər mikroservis öz xüsusi məlumat bazasına malikdir və bir servisdəki sxema dəyişiklikləri digərlərinə təsir etmir.
* **Enkapsulyasiya:** Məlumatlar mikroservis daxilində tam enkapsulyasiya edilir və yalnız müəyyən API-lər vasitəsilə əlçatan olur.
* **Texnoloji Seçim:** Hər servis öz ehtiyaclarına uyğun məlumat bazası texnologiyasını seçə bilər.
* **Genişlənmə və Performans:** Məlumat bazaları hər servisin tələblərinə uyğun müstəqil genişləndirilə bilər.
* **Dayanıqlılıq və Xəta İzolasiyası:** Bir servisdəki məlumat bazası nasazlıqları digərlərinə təsir etmir və sistemin dayanıqlılığını artırır.

## Digər Məlumat Bazası Pattern-ləri ilə Müqayisə

```
Database Per Service Pattern vs Shared Database Pattern:

Database Per Service:
- Hər servis → Ayrı DB
- Zəif bağlılıq
- Müstəqil genişlənmə
- Müstəqil sxema təkamülü
- Yaxşı xəta izolyasiyası

Shared Database Pattern:
- Çox servis → Tək DB
- Güclü bağlılıq
- Çətin genişlənmə
- Ortaq sxema dəyişiklikləri
- Kasıb xəta izolyasiyası
```

## Nə Vaxt İstifadə Etməli?

* **Mürəkkəb Modular Sistemlər:** Müxtəlif ehtiyaclara malik mürəkkəb sistemlər üçün uyğundur.
* **Müstəqil Komanda İşi:** Komandaların müstəqil işləməsi tələb olunan yerlərdə.
* **Çoxsaylı Texnoloji Tələblər:** Müxtəlif məlumat bazası texnologiyalarının lazım olduğu hallarda.
* **Yüksək Genişlənmə Tələbləri:** Servislərin müstəqil genişlənməsi vacib olan yerlərdə.
* **Xəta İzolasiyası:** Bir servisdəki problemin sistemin qalan hissəsinə təsir etməməsi üçün.

## Necə İşləyir?

```
Mikroservis Arxitekturasında DB Per Service:

[Müştəri Service]         [Sifariş Service]         [Məhsul Service]
       |                         |                         |
       v                         v                         v
[Müştəri DB]              [Sifariş DB]              [Məhsul DB]
   (MySQL)                   (PostgreSQL)              (MongoDB)
       |                         |                         |
       +-------------------------+-------------------------+
                                |
                                v
                        [API Gateway]
                                |
                                v
                          [Müştəri Tətbiqi]
```

Tətbiq Variantları:

1. **Private Tables Per Service:** Hər servis yalnız öz cədvəllərinə sahibdir
2. **Schema Per Service:** Hər servisin öz məlumat bazası sxeması vardır
3. **Database Server Per Service:** Hər servisin öz məlumat bazası serveri vardır

## Üstünlüklər

* **Yaxşılaşdırılmış Genişlənmə və Performans:** Müstəqil genişlənmə və servis ehtiyaclarına uyğun optimallaşdırılmış performans.
* **Gücləndirilmiş Xəta İzolasiyası və Dayanıqlılıq:** Yaxşı xəta tolerantlığı və servis müstəqilliyi.
* **Sadələşdirilmiş Servis Təkamülü və Deployment:** Servislərin müstəqil təkamülü və deployment-i.
* **Domain-Driven Design ilə Uyğunluq:** Bounded context-ləri və domain-spesifik məlumat idarəetməsini dəstəkləyir.
* **Texnoloji Müxtəliflik:** Hər servis öz ehtiyaclarına uyğun məlumat bazası texnologiyasını seçə bilər.
* **Komanda Müstəqilliyi:** Komandalar öz məlumat bazalarını müstəqil idarə edə bilər.

## Çətinliklər

* **Artan Mürəkkəblik:** Çoxsaylı məlumat bazalarının idarə edilməsi və tutarlılığın təmin edilməsi mürəkkəbdir.
* **Məlumat Dublikasiyası Potensialı:** Artıq məlumat və sinxronizasiya problemləri riski.
* **Mürəkkəb Tranzaksiyalar və Sorğular:** Distributed tranzaksiyaları və cross-service sorğularının idarə edilməsində çətinliklər.
* **Güclü Sinxronizasiya Mexanizmləri:** Məlumat tutarlılığı və sinxronizasiya üçün mexanizmlər tələb olunur.
* **Çox Servislər Arası Sorğular:** Müxtəlif servislərdən məlumat birləşdirən sorğular çətindir.
* **Distributed Tranzaksiyalar:** CAP teoreminə görə distributed tranzaksiyalar çətindir.

## Həllər və Pattern-lər

Cross-service tranzaksiyalar və sorğular üçün müxtəlif pattern-lər:

* **Saga Pattern:** Çox servislər arası tranzaksiyaları idarə etmək üçün.
* **API Composition:** Tətbiq məlumat bazası əvəzinə join əməliyyatı yerinə yetirir.
* **CQRS (Command Query Responsibility Segregation):** Çox servisdən məlumat ehtiva edən materialized view-lar saxlanır.
* **Event Sourcing:** Məlumat dəyişikliklərini event-lər kimi saxlayır.

## Tətbiq Strategiyaları

1. **Tələbləri Müəyyən Etmək:** Hər servisin məlumat tələblərini anlamaq.
2. **Məlumat Bazası Texnologiyası Seçmək:** Hər servis üçün uyğun DB texnologiyasını seçmək.
3. **Məlumat Modelini Dizayn Etmək:** Hər servis üçün optimal məlumat modelini yaratmaq.
4. **API Dizaynı:** Məlumat əlçatanlığı üçün API-ləri dizayn etmək.
5. **Sinxronizasiya Strategiyası:** Servisler arası məlumat sinxronizasiyasını planlaşdırmaq.
6. **Monitorinq və Metrik:** Hər məlumat bazasının performansını izləmək.
7. **Backup və Recovery:** Hər məlumat bazası üçün backup strategiyası.
8. **Təhlükəsizlik:** Hər servisdə müvafiq təhlükəsizlik tədbirləri.

## Praktiki Nümunə

```
E-ticarət Tətbiqi Nümunəsi:

Müştəri Service:
- Məlumat Bazası: PostgreSQL
- Məlumat: müştəri məlumatları, profil, ünvan

Sifariş Service:
- Məlumat Bazası: MySQL
- Məlumat: sifariş məlumatları, status, tarix

Məhsul Service:
- Məlumat Bazası: MongoDB
- Məlumat: məhsul kataloqu, təsvirlər, qiymətlər

Axtarış Service:
- Məlumat Bazası: Elasticsearch
- Məlumat: axtarış indeksləri, məhsul axtarışı
```

## Üstünlük Strategiyaları

1. **Məlumat Tutarlılığı:** Event-driven arxitektura və eventual consistency istifadə etmək.
2. **Cross-Service Sorğular:** API Gateway və ya BFF (Backend for Frontend) pattern-ləri.
3. **Performans Optimallaşdırması:** Keşləmə və read replica-lar.
4. **Xəta İdarəetməsi:** Circuit breaker və retry mexanizmləri.
5. **Məlumat Migrasyası:** Mərhələli migrasyası strategiyaları.

## Nəticə

Database Per Service Pattern mikroservislər arxitekturasında məlumat idarəetməsi üçün güclü və effektiv yanaşmadır. Bu pattern servislərin müstəqilliyini təmin edir, genişlənməni asanlaşdırır və texnoloji çevikliyi artırır. Lakin düzgün tətbiq üçün diqqətli planlaşdırma, uyğun pattern-lərin seçilməsi və məlumat tutarlılığı strategiyalarının həyata keçirilməsi vacibdir.

Pattern-in uğurlu tətbiqi komandaların koordinasiyası, monitorinq və məlumat sinxronizasiyası mexanizmlərinin düzgün qurulması ilə mümkündür.

---

**Növbəti Məqalələr:**
- [API Composition Pattern](./api-composition-pattern)
- [Saga Pattern](./saga-pattern)
- [CQRS Pattern](./cqrs-pattern)