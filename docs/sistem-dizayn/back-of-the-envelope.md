---
slug: /back-of-envelope
author: [tunay]
---

# Back-ofEnvelope nədir və necə hesablanır?
===========================================

- Bu addım problemi və onun yükünü başa düşmək üçün lazımdır.
- hazırlayacağımız sistemdə gündəlik istifadəçi sayını, sorğuları, yazılma və oxunma nisbətlərini bilməsək. 
- Hazırladığımız sistem də məqsədə uyğun olmayacaq.

## Proses
- SIstemin  artacaq yek və ya sorğu sayını necə handle edcəyini təyin etmək
- Hazırlayacağın sistemlə tələbin (requirement) üst-üstə düşməsinə kömək edir
- Bottleneck-in təyin olunması. Sistem üçün hansı hissə gələcəkdə problem ola bilər

## Hesablamanın növləri
- Load estimation - request per secon, data volume, user traffic etc.
- Storage estimation - Nə qədər data saxlanılacaq, nə qədər data generasiya olunacaq və s. (DB)
- Bandwith estimation - traffik və sorğu sayına uyğun bandwithin hesablanması
- Latency estimation - dizayn olunmuş sistemə əsasə response time-ın hesablanması.
- Resource estimation - tələb olunan server sayı, cpu və ya ram

## Nümunə
