## NoSQL

### Nədir və necə işləyir

NoSQL ənənəvi SQL bazalarından fərqli olaraq, strukturlaşdırılmamış və ya yarı strukturlaşdırılmış verilənlərlə işləmək üçün nəzərdə tutulmuş verilənlər bazası növüdür.

### Populyar NoSQL bazaları

- **MongoDB:** Document database, BSON formatında saxlayır; sharding dəstəkləyir.
- **Redis:** In-memory key-value store; sürətli caching və real-time analytics üçün uyğundur.
- **Apache Cassandra:** Scalable, distributed wide-column store; yüksək Availability təmin edir.
- **Neo4j:** Graph database; mürəkkəb əlaqələrin idarəsi üçün.

### NoSQL-un üstünlükləri

- **Flexibility:** Schema-less, verilən modelinə asan adaptasiya.
- **Horizontal scalability:** Böyük həcmli məlumat və yazı yükünü idarə edir.
- **Performance:** Böyük həcmli yaddaş və spesifik yüklər üçün optimallaşdırılıb.

### NoSQL-un mənfi cəhətləri

- **CAP theorem trade-offs:** Tez-tez Consistency qurban verilir ki, Availability və Partition tolerance təmin olunsun.
- **Query complexity:** SQL qədər mürəkkəb sorğular yaratmaq çətin ola bilər.

---

### Index növləri və istifadə sahələri

| Növ               | İstifadə sahələri                       | Texnologiyalar                          |
|-------------------|---------------------------------------|-----------------------------------------|
| Key-value         | Session management, real-time analytics | Amazon Dynamo                           |
| In-memory key-value| Sürətli məlumat saxlanması (riskli)    | Redis, Memcache                         |
| Document-based    | İstifadəçi profilləri, məhsul kataloqları | MongoDB, CouchDB, Amazon DocumentDB     |
| Wide-column       | Telemetry, analytics                    | Cassandra, HBase                        |
| Graph             | Sosial şəbəkə qrafikləri                | Neo4j, Amazon Neptune                   |
| Ledger            | Qeydiyyat sistemləri                    | QLDB                                    |
| Time series       | IoT, DevOps, sənaye telemetriyası      | Graphite, Prometheus, Amazon Timestream |


