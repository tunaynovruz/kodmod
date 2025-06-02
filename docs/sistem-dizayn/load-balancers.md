---
slug: \load-balancer
---

# Load Balancer

## Nə üçün lazımdır?

- Serverlərə gələn sorğuları paylayaraq yükü balanslaşdırmaq və sistemin mövcudluğunu artırmaq.
- Single Point of Failure (SPOF) riskini azaltmaq üçün heartbeat check və health check istifadə olunur.

## Üstünlükləri

- **Heartbeat Check:** Serverlərin işləkliyini yoxlayır, nasaz serverləri aşkar edir.
- **Global vs Local Load Balancers:**
  - Global: Coğrafi yayılmış serverlər arasında yük paylayır.
  - Local: Lokal şəbəkə daxilində yükü balanslaşdırır.
- **Stateful vs Stateless LB:**
  - Stateful: İstifadəçi sessiyasını yadda saxlayır (session affinity).
  - Stateless: Hər sorğunu müstəqil yönləndirir.

## Load Balancing Alqoritmləri

- **Round Robin:** Sorğuları ardıcıl olaraq serverlər arasında paylayır, sonra dövr edir.
  - Çatışmazlıqlar: Yük fərqini nəzərə almır, sessiya bağlılığı yoxdur, fərqli server güclərində performans problemləri ola bilər.
  - Eyni ölçülü serverlər və stateless tətbiqlər üçün uyğundur.

- **Weighted Round Robin:** Serverlərin gücünə görə çəkilər təyin edir və ona uyğun paylayır.
- **Least Connection:** Ən az aktiv əlaqəsi olan serverə yönləndirir.
- **IP Hash:** İstifadəçinin IP ünvanına əsasən server seçir (sessiya bağlılığı üçün).
- **Random:** Sorğuları təsadüfi serverlərə paylayır.
- **Least Response Time:** Ən sürətli cavab verən serveri seçir.
- **Least Bandwidth:** Ən az bant genişliyindən istifadə edən serverə yönləndirir.
