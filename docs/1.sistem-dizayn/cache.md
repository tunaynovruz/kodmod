---
draft: true
---
# Cache (Keş)
draft: true

## Cache Növləri

### In-Memory Cache
Yaddaşda saxlanılan ən sürətli cache növü. Brauzerdə statik fayllar (JS, CSS, şəkillər) və application məlumatları üçün istifadə olunur.

### Disk Cache
Sabit diskdə saxlanılan cache - böyük həcmli məlumatlar üçün uyğun. System restart zamanı məlumatlar qalır, lakin I/O səbəbindən yavaşdır.

### Database Cache
Tez-tez istifadə olunan SQL sorğularının keşlənməsi. MySQL Query Cache, PostgreSQL shared_buffers və application-level caching üçün istifadə olunur.

### Client-Side Cache
Client tərəfində məlumatların saxlanması. Browser cache, mobile app cache və desktop application cache-i daxildir.

### Server-Side Cache
Server tərəfində veb kontentin keşlənməsi. HTML səhifələri, API response-ları və Redis/Memcached ilə məlumat saxlanması üçün istifadə olunur.

### CDN Cache
Statik kontentin coğrafi olaraq paylanmış keşlənməsi. Şəkil, video, JS, CSS fayllarının sürətli çatdırılması və server yükünün azaldılması məqsədilə istifadə olunur.

### DNS Cache
Domenlərin IP ünvanlarla uyğunlaşdırılmasının keşlənməsi. DNS sorğularını sürətləndirmək üçün Azure DNS, Amazon Route 53, Google Cloud DNS kimi xidmətlərdə istifadə olunur.

## Cache Yerləşdirmə Strategiyası
Cache-lərin sistem arxitekturasında düzgün yerləşdirilməsi:
- Client-side cache
- CDN cache
- API Gateway cache
- Load Balancer cache
- Application Server cache
- Database cache
- Distributed File System cache
- Coordination Service cache (Zookeeper)

## Replacement Strategiyaları

### LRU (Least Recently Used)
Ən son istifadə olunan məlumatı silir - temporal locality prinsipinə uyğun, lakin implementation kompleksdir.

### LFU (Least Frequently Used)
Ən az istifadə olunan məlumatı silir - uzunmüddətli pattern-ləri yaxşı tutur, lakin counter saxlamaq lazımdır.

### FIFO (First In, First Out)
İlk daxil olan məlumatı ilk silir - sadə implementation, lakin məlumatın istifadə tezliyini nəzərə almır.

### Random Replacement
Təsadüfi məlumat seçib silir - ən sadə method, lakin optimal performans vermir.

## Cache Invalidation

### Write-Through
```
Client -> Cache -> Database -> Response
```
Məlumat eyni anda həm cache-ə həm də database-ə yazılır - data consistency yüksək, lakin write latency artır.

### Write-Around
```  
Client -> Database -> Response
Read: Cache Miss -> Database -> Cache -> Client
```
Məlumat birbaşa database-ə yazılır - write performansı yaxşı, lakin ilk read zamanı cache miss olur.

### Write-Back
```
Client -> Cache -> Response (Immediate)
Database <- (Asynchronous)  
```
Məlumat əvvəl cache-ə yazılır, sonra asinxron database-ə - yüksək write performansı, lakin cache crash zamanı məlumat itkisi riski var.

## Cache Reading Patterns

### Cache-Aside (Lazy Loading)
```
if data not in cache:
    data = database.get(key)
    cache.set(key, data)
return data
```
Application cache-i idarə edir - cache miss zamanı lazy loading, çox populyar pattern.

### Read-Through
```
return cache.get_with_fallback(key)
```
Cache özü database ilə əlaqə saxlayır - application üçün sadə, lakin cache provider dəstəyi lazım.

## Əlavə Terminlər
- **Purge**: cache-dəki bütün məlumatı silmək
- **Refresh**: cache-dəki məlumatları yeniləmək
- **TTL (Time To Live)**: cache-ə yazılan məlumatın expire olma müddəti
- **Pull CDN**: ilk request zamanı məlumatın mənbədən çəkilib CDN-də saxlanması
- **Push CDN**: server tərəfindən məlumatların aktiv olaraq CDN-ə göndərilməsi
- **Cache Hit**: axtarılan məlumatın cache-də tapılması
- **Cache Miss**: axtarılan məlumatın cache-də tapılmaması
- **Cache Ratio**: Hit/(Hit+Miss) nisbəti - cache effektivliyinin göstəricisi

## Best Practices
- Read-heavy workloads üçün Cache-aside + TTL istifadə edin
- Write-heavy workloads üçün Write-through strategiyası seçin
- Static content üçün uzun TTL (24+ saat), dynamic content üçün qısa TTL (5-15 dəqiqə) təyin edin
- Cache hit ratio-nu izləyin (80%+ optimal hesab olunur)
- Cache key design-ında consistent naming convention istifadə edin