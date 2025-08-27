---
draft: true
---
# Misc
draft: true

- **Bloom Filter:** Elementin siyahıda ola biləcəyini və ya mütləq olmadığını göstərən data strukturu.
- **Quorum:** Distribüt edilmiş mühitdə əməliyyatın uğurlu sayılması üçün lazım olan minimum server sayı.
- **Heartbeat:** Hər server mərkəzi monitorinq serverinə və ya digər serverlərə öz işlək olduğunu bildirmək üçün dövri mesaj göndərir.
- **Checksum:** Məlumat bütövlüyü və səhv aşkarlanması üçün MD5, SHA-1, SHA-256 və s. kimi kriptoqrafik hash funksiyaları ilə hesablanır; sabit uzunluqlu simvol zənciri əmələ gətirir.
- **Throughput:** Müəyyən vaxtda ötürülən və ya emal olunan məlumat həcmi (Mbps kimi ölçülür); yüksək throughput daha çox məlumatın işlənməsi deməkdir.
- **OAuth:** Authorization üçün istifadə olunur.
- **JWT (JSON Web Token):** Təhlükəsiz məlumat ötürmə formatı; standalone və ya OAuth daxilində istifadə edilə bilər (adətən). Stateless authentication təmin edir.
- **Fan-out / Fan-in:** Mesajların çoxsaylı istehlakçılara yayılması / toplanması prinsipi.
- **Asynchronism:** Asinxron proseslərin istifadəsi.
- **SDLC (Software Development Life Cycle):** Planlaşdırma → Kodlaşdırma → Qurma → Test → Release → Deploy mərhələləri.
- **Event Driven Architecture:** Producer → Channel → Consumer kimi işləyən hadisə əsaslı arxitektura.
- **Deployment Techniques:** Blue-Green, Canary, Shadow, Re-create kimi yerləşdirmə üsulları.
- **Service Mesh:** Xidmətlərarası (service-to-service) kommunikasiya üçün şəbəkə təbəqəsi.
- **Microfrontend:** Frontend-in mikroservis prinsipi ilə bölünməsi.
- **Kubernetes internals:** Nodes → Pods → Containers.

---

## Redis istifadə sahələri

- Microservices arasında session paylaşımı
- Cache
- Counter (məsələn, view sayğacı)
- Shopping cart
- Rate limiter (IP əsaslı)
