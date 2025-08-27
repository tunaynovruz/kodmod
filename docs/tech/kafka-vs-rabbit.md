---
draft: true
---
# Kafka
draft: true

- **QUEUE:** 1 consumer, 1 data read.
- **Pub-Sub:** Bir neçə subscriber, mesaj bir neçə dəfə oxuna bilər.
- Kafka mesaj prioritetini dəstəkləmir.
- Kafka-da mesajların sırası yalnız bir partition daxilində qorunur.
- Apache Kafka açıq mənbəli, publish-subscribe əsaslı messaging sistemidir.
- Bütün mesajlarını disklərdə saxlayır; oxu və yazılar ardıcıl şəkildə həyata keçirilir.
- **Use cases:** Metrics, Log Aggregation, Stream processing, Commit Log, Website activity tracking, Product suggestions.
- **Broker:** Kafka serveri, broker adlanır.
- **Record:** Kafka-da mesaj və ya event; açar (key), dəyər (value), timestamp və opsional metadata daxildir.
- **Topic:** Mesajlar kateqoriyalara bölünür, hər biri topic adlanır; topic adı unikal olmalıdır.
    - Topic-dəki mesajlar istənilən sayda oxuna bilər, istehlakdan sonra silinmir.
    - Mesajlar müəyyən müddət və ya yaddaş limiti keçənə qədər saxlanır.
- **Kafka Cluster:** Bir və ya bir neçə brokerdən ibarət qruplaşma.
- **ZooKeeper:** Distribüt edilmiş key-value store; brokerlər arasında koordinasiya və metadata idarəçiliyi üçün istifadə olunur.
- **Dead Letter Queue (DLQ):** Emal edilə bilməyən səhvli mesajlar üçün ayrılmış queue; monitorinq və yenidən işləmə üçün istifadə olunur.

---

## RabbitMQ vs Kafka vs ActiveMQ

| Xüsusiyyət               | Kafka                                      | RabbitMQ                                 | ActiveMQ                                 |
|-------------------------|--------------------------------------------|-----------------------------------------|-----------------------------------------|
| Performance & Scalability| Yüksək throughput və horizontal scalabilty| Yüksək performans, amma Kafka-dan zəif  | Yüksək performans, amma Kafka-dan zəif  |
| Message Ordering        | Partition daxilində sıra təmin edilir      | Queue və topic daxilində sıra təmin edilir | Queue daxilində sıra təmin edilir        |
| Message Priority        | Dəstəkləmir                                | Prioritet dəstəyi var                    | Prioritet dəstəyi var                    |
| Message Model           | Distribüt edilmiş log əsaslı model          | Queue əsaslı (AMQP protokolu)            | Queue əsaslı (JMS standartı)             |
| Durability              | Log replikasiyası ilə daxili təminat       | Konfiqurasiya edilə bilən durability    | Master-Slave replikasiyası               |
| Message Routing         | Topic-partition əsaslı sadə routing         | Geniş routing imkanları (exchanges, bindings) | Seçicilər və topic-lər vasitəsilə routing |
| Replication             | Partition replikasiyası                     | Mirrored Queues ilə replikasiya          | Master-Slave mexanizmi                   |
| Stream Processing       | Kafka Streams vasitəsilə daxili dəstək     | Stream processing var                    | Üçüncü tərəf kitabxanaları ilə          |
| Latency                 | Orta səviyyədə                             | Aşağı latency, real-time tətbiqlər üçün | Orta səviyyədə                           |
| License                 | Apache 2.0                                | Mozilla Public License                   | Apache 2.0                              |
