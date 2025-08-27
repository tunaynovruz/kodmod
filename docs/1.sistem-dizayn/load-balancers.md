---
slug: /load-balancer
tags: [load-balancer]
sidebar_position: 1
---

# Load Balancer
Load Balancer gələn sorğuları serverlər arasında paylaşdırır. Bu sistem tətbiqlərin yaxşı performance və availability təmin etməsi üçün lazımdır.

### Nə üçün lazımdır?
- **Yük paylaşdırması:** Serverlərdə yükü bərabər paylaşdırır
- **SPOF riskini azaldır:** Heartbeat və health check istifadə edir
- **Performance artırır:** Cavab vaxtını azaldır
- **Yüksək availability:** Nasaz serverdən trafiği digərlərinə yönləndirir
- **Scale edə bilir:** Yeni serverlər əlavə etmək asandır

### Health Check
- **Heartbeat Check:** Serverlərin işləyib işləmədiyini yoxlayır
- **Health Check:** Serverlərin vəziyyətini daimi yoxlayır

### Növlər
- **Global:** Fərqli data mərkəzlərdə serverləri idarə edir
- **Local:** Yerli şəbəkədə işləyir
- **Stateful:** Sessiyaları yadda saxlayır
- **Stateless:** Hər sorğunu ayrıca idarə edir

### Yerləşdirmə
- Database əvvəlində
- Application əvvəlində
- TLS termination üçün
- Service discovery üçün
- Təhlükəsizlik üçün

### Load Balancing Alqoritmləri
- **Round Robin**: Sorğuları serverlərə növbə ilə göndərir. Sadədir, bərabər paylaşdırır. Server fərqlərini nəzərə almır
- **Weighted Round Robin**: Server gücünə görə çəki verir və ona uyğun paylaşdırır. Server fərqlərini nəzərə alır. Çəkiləri əl ilə təyin etmək lazımdır
- **Least Connection**: Ən az bağlantısı olan serverə göndərir. Yük fərqinə uyğunlaşır. Bağlantıları izləmək mürəkkəbdir
- **IP Hash**: IP ünvanına görə server seçir. Sessiya davamlılığı verir. Az istifadəçi olarsa balans problemi
- **Least Response Time**: Ən tez cavab verən serverə göndərir. İstifadəçi təcrübəsini yaxşılaşdırır. Vaxtları izləmək çətindir.
- **Random**: Təsadüfi server seçir. Çox sadədir. Sessiya problemi yaradır

### Texnologiyalar
- **Hardware Load Balancer**: Xüsusi cihazlar. Yüksək performance verir. Sürətli, təhlükəsiz. Bahalı, çətin konfiqurasiya
- **Software Load Balancer**: Adi serverlərdə proqram kimi işləyir. Ucuz, çevik. Hardware qədər sürətli deyil
- **Cloud Load Balancer**: Bulud xidməti kimi təklif edilir. Yüksək scale, sadə idarə. Provayderə bağlı

### Şəbəkə Səviyyələri
- **Layer 4 (TCP/UDP)**: Transport səviyyəsində işləyir. Sürətli. Az məlumat bilir
- **Layer 7 (HTTP)**: Tətbiq səviyyəsində işləyir. Daha ağıllı. Yavaş, çox resurs istəyir

### Əsas Problemlər
- **SPOF riski:** Load balancer özü nasaz ola bilər → Rezerv instance-lar istifadə et
- **Konfiqurasiya:** Yanlış tənzim performance problemləri yaradır → Avtomatik alətlər işlət
- **Scale məhdudluğu:** Çox traffic bottleneck yaradır → Horizontal/vertikal scale et
- **Latency:** Əlavə addım gecikmə yaradır → Coğrafi paylama et
- **Xərc:** Əlavə xərc → Açıq mənbə həllər işlət

```mermaid
graph TB
    Users[👥 İstifadəçilər] --> LB[⚖️ Load Balancer]
    
    LB -.->|Health Check| HC{💓 Health Check}
    
    LB -->|Round Robin| Server1[🖥️ Server 1<br/>✅ Healthy]
    LB -->|Weighted| Server2[🖥️ Server 2<br/>✅ Healthy] 
    LB -->|Least Connection| Server3[🖥️ Server 3<br/>✅ Healthy]
    LB -.->|Traffic yönləndirilmir| Server4[🖥️ Server 4<br/>❌ Nasaz]
    
    Server1 --> DB1[(💾 Database 1)]
    Server2 --> DB2[(💾 Database 2)]
    Server3 --> DB3[(💾 Database 3)]
    
    HC -.->|Heartbeat| Server1
    HC -.->|Heartbeat| Server2  
    HC -.->|Heartbeat| Server3
    HC -.->|Heartbeat| Server4
    
    LB --> Backup[🔄 Backup<br/>Load Balancer]
    
    subgraph "Alqoritmlər"
        RR[🔄 Round Robin]
        WRR[⚖️ Weighted Round Robin]
        LC[📊 Least Connection]
        IPH[🌐 IP Hash]
        RT[⏱️ Response Time]
        RAND[🎲 Random]
    end
    
    subgraph "Səviyyələr"
        L4[📡 Layer 4<br/>TCP/UDP]
        L7[🌐 Layer 7<br/>HTTP/HTTPS]
    end
    
    style LB fill:#e1f5fe
    style Server4 fill:#ffebee
    style HC fill:#f3e5f5
    style Backup fill:#e8f5e8
```