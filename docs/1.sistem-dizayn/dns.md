---
draft: true
slug: /dns
---

# DNS

- **UDP vs TCP:**
    - UDP yüngül, əlaqəsiz protokoldur; əsasən stream, video, chat kimi gecikməyə dözümlü tətbiqlərdə istifadə olunur.
    - TCP əlaqəli, etibarlı protokoldur; məlumatların ardıcıllığını və bütövlüyünü təmin edir.

- **DNS necə işləyir:**
    - İstifadəçi domain adını daxil edir → DNS server həmin adı IP-ə çevirir → Brauzer IP ilə əlaqə yaradır.

- **HTTP request flow:**
    - İstifadəçi sorğusu → DNS sorğusu → IP tapılır → TCP əlaqəsi qurulur → HTTP sorğusu göndərilir → Server cavab verir.

- **URI (Uniform Resource Identifier):** Resursun unikal identifikatorudur.
- **URL (Uniform Resource Locator):** Resursun yerini göstərən ünvan.

- **TCP/IP model:**
    - Data paketləri **segments** (transport layer) → **frames** (data link layer) → **datagram** (network layer) şəklində göndərilir.


- Resource Records (A, NS)
- Dns Resolver
- Root level name servers
- Top-level NS
- Authoritative NS
- Iterative query
- Recursive query
- DHCP
