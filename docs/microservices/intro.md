# Microservices və Serverless Architecture

## Microservices

- **Tərif:** Tətbiqin müstəqil, incə tərkibli xidmətlərdən ibarət olması.
- **Əsas xüsusiyyətlər:**
    - Modul: Xidmətlər bir-birindən zəif bağlıdır.
    - Ölçəklənə bilən (scalable): Hər xidmət müstəqil genişlənir.
    - CI/CD: Xidmətlər ayrıca yerləşdirilir (deploy).
    - Dil müstəqil: Müxtəlif proqramlaşdırma dilləri istifadə oluna bilər.
- **İstifadə sahələri:** Böyük tətbiqlər, müxtəlif modullara malik, komandaların müstəqil işləməsi.
- **Nümunə:** E-ticarət tətbiqi — inventar, sifarişlər, autentifikasiya üçün ayrı microservices.

## Microservices-in əsas xüsusiyyətləri

1. **Single Responsibility:** Hər xidmət konkret funksiya və ya domen üzrə ixtisaslaşır; bu, inkişafı və baxımı
   asanlaşdırır.
2. **Independence:** Xidmətlər müstəqil hazırlanır, yerləşdirilir və genişlənir; komandalar paralel işləyə bilir.
3. **Decentralization:** Hər xidmət öz məlumatına və biznes məntiqinə sahibdir; fərqli texnologiyalar seçmək imkanı.
4. **Communication:** Xidmətlər yüngül protokollarla (HTTP/REST, gRPC, message queues) əlaqə saxlayır.
    - Qeyd: RPC JSON-dan sürətlidir.
5. **Fault Tolerance:** Bir xidmətin nasazlığı bütün sistemi sarsıtmır, tətbiqin davamlılığını artırır.

## Serverless Architecture

- **Tərif:** Bulud təminatçısı server idarəsini həyata keçirir.
- **Əsas xüsusiyyətlər:**
    - Server idarəsi yoxdur: Koda fokus, infrastruktur yox.
    - Avtomatik ölçeklenir (auto-scaling).
    - Ödəniş istifadə əsasında (pay-per-use).
    - Hadisə əsaslıdır (event-driven).
- **İstifadə sahələri:** Dəyişkən yüklər, yüngül API-lər, avtomatlaşdırılmış tapşırıqlar.
- **Nümunə:** Buludda fayl yüklənəndə avtomatik şəkil ölçüsünün dəyişdirilməsi.

## Əsas fərqlər

| Aspekt        | Microservices                                   | Serverless                     |
|---------------|-------------------------------------------------|--------------------------------|
| İnfrastruktur | Dev komandalar idarə edir (məsələn, Kubernetes) | Bulud təminatçısı idarə edir   |
| Ölçəklənmə    | Komandalar idarə edir, daha çox nəzarət         | Avtomatik ölçeklenir           |
| Xərc          | Provision edilmiş infrastruktur üçün ödəniş     | İstifadə əsasında ödəniş       |
| Mürəkkəblik   | Çoxlu xidmətlərə görə yüksək                    | Aşağı, amma icra limitləri var |

## Nəticə

- Microservices: Böyük, mürəkkəb tətbiqlər üçün, resurslar üzərində tam nəzarət tələb edənlərə uyğundur.
- Serverless: Hadisə əsaslı, qısa ömürlü, dəyişkən trafik üçün ideal.

---

