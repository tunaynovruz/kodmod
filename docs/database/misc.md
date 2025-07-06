# DB MISC

## Batch Processing və Stream Processing

- **Batch Processing:** Böyük verilənlər toplu şəkildə emal olunur; real-time tələb olunmur.
- **Stream Processing:** Məlumat axını davamlı şəkildə real vaxtda işlənir.

## Strong Consistency vs Eventual Consistency

- **Strong Consistency:** Bütün oxunuşlar ən son yazılan məlumatı göstərir.
- **Eventual Consistency:** Vaxt keçdikcə bütün nüsxələr uyğunlaşır, amma anlıq fərqlər ola bilər.

---

## Throughput-u necə yaxşılaşdırmaq olar

1. **Horizontal Scalability:** Yükü bölmək üçün əlavə serverlər əlavə edin; bu, adətən vertical scaling-dən effektivdir.
2. **Caching:** Tez-tez istifadə olunan məlumatları yaddaşda saxlayın.
3. **Parallel Processing:** Tapşırıqları paralel şəkildə işləyin.
4. **Batch Processing:** Real-time olmayan məlumatlar üçün toplu emal.
5. **Database Optimization:** Partitioning, sharding kimi üsullarla verilənlərin saxlanmasını və çıxarılmasını optimallaşdırın.
6. **Asynchronous Processing:** Dərhal tamamlanması tələb olunmayan əməliyyatları asinxron icra edin.
7. **Network Bandwidth:** Daha yüksək məlumat ötürmə sürəti üçün şəbəkə tutumunu artırın.

---

## Latency-ni necə azaltmaq olar

1. **Network Optimization:** CDN-lərdən istifadə edərək məlumatı istifadəçiyə daha yaxın serverlərdən verin.
2. **Hardware Upgrade:** Sürətli prosessorlar, əlavə yaddaş və SSD kimi sürətli yaddaşlardan istifadə edin.
3. **Faster Protocols:** HTTP/2 kimi protokollarla gecikməni azaldın (multiplexing, header compression).
4. **Database Optimization:** Indexing, optimallaşdırılmış sorğular və in-memory DB-lərdən istifadə edin.
5. **Load Balancing:** Gələn sorğuları serverlər arasında bərabər paylayın.
6. **Code Optimization:** Alqoritmləri optimallaşdırın, lazımsız hesablardan qaçının.
7. **Minimize External Calls:** Xarici API çağırışlarının sayını azaltmaq.

Strong consitency vs eventual consistency