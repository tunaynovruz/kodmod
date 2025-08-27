---
draft: true
---
draft: true
# Proxy və onun istifadəsi

**Proxy** — istifadəçi ilə internet arasındakı serverdir.

- **Performance:** Keşləmə ilə sürəti artırır, gecikməni azaldır.
- **Security:** İstifadəçiləri birbaşa internetə çıxışdan qoruyur.
- **Anonimlik və Privacy:** Real IP-ni gizlədir, anonimlik təmin edir.
- **Load Balancing:** Trafiki bir neçə server arasında tarazlayır.
- **Centralized Control and Monitoring:** Trafikə mərkəzləşdirilmiş nəzarət.
- **Content Filtering və Access Control:** Məzmuna çıxışı məhdudlaşdırır.
- **Logging and Auditing:** İstifadəçi fəaliyyətlərini qeyd edir.
- **Application Level Gateway:** 

---

## Forward Proxy vs Reverse Proxy

| Xüsusiyyət             | Forward Proxy                         | Reverse Proxy                         |
|-----------------------|-------------------------------------|-------------------------------------|
| İstifadəçi/server tərəfi | İstifadəçi tərəfi, istifadəçini təmsil edir | Server tərəfi, serverləri təmsil edir |
| Əsas məqsəd            | İstifadəçi anonimliyi, çıxış vasitəçisi | Server qorunması, yük balansı       |
| Trafik istiqaməti      | İstifadəçidən serverə                 | Serverdən istifadəçiyə               |
| Misal                  | İnternetə çıxışda vasitəçi          | Veb server arxasında yerləşir       |

**Oxşarlıqlar:** Hər ikisi vasitəçi kimi fəaliyyət göstərir, trafiki idarə edir.

---

## VPN vs Proxy

| Xüsusiyyət          | VPN                                  | Proxy                             |
|--------------------|------------------------------------|----------------------------------|
| Şifrələmə          | Bütün trafik tam şifrələnir         | Yalnız bəzi trafik şifrələnir     |
| Trafik yönləndirilməsi | Bütün trafik VPN serverindən keçir | Yalnız müəyyən trafik proxy ilə keçir |
| Təhlükəsizlik       | Daha yüksək gizlilik və təhlükəsizlik | Daha məhdud təhlükəsizlik         |
| Performans         | Şifrələmə səbəbindən yavaş ola bilər | Daha sürətli                     |
