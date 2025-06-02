# API Design

## Performance

- **Pagination:** Böyük nəticələrin hissə-hissə göndərilməsi.
- **Async Logging:** Girişlərin asinxron yazılması performansı artırır.
- **Caching:** Tez-tez soruşulan məlumatların saxlanması, sürətləndirmə.
- **Payload Compression:** Məlumatın ötürülmə ölçüsünü kiçiltmək üçün sıxılma.
- **Connection Pool:** Mövcud əlaqələrin təkrar istifadəsi, gecikməni azaldır.

## Code First vs API First

- **Code First:** API əvvəlcə kod kimi hazırlanır, sonra sənədləşdirilir.
- **API First:** API dizaynı əvvəlcə hazırlanır, sonra kod yazılır; daha planlı və standartlıdır.

## Plural Resource Names

- Resurs adları çoxluq şəklində istifadə edilir (məsələn, `/users`, `/orders`).
- Bu, daha aydın və REST prinsiplərinə uyğundur.

## Idempotency

- Eyni əməliyyatın təkrar icrası nəticəni dəyişdirməməlidir.
- Məsələn, PUT sorğusu idempotentdir; POST isə olmaya bilər.

## Versioning

- API dəyişiklikləri zamanı köhnə versiyalar qorunur.
- Versiya URI-də (`/v1/users`) və ya header-də göstərilə bilər.

## Rate Limiting

- İstifadəçi sorğularının sayı müəyyən limitlə məhdudlaşdırılır.
- Server yüklənməsinin qarşısını alır və DoS hücumlarına qarşı qoruyur.

## Diagram as Code

- API dizaynını kod şəklində yaratmaq (məsələn, Swagger/OpenAPI).
- Bu, avtomatlaşdırılmış sənədləşdirmə və testləri asanlaşdırır.
