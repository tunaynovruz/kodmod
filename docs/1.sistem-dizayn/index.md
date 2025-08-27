---
draft: false
sidebar_position: 1
title: Sistem Dizayn
---

# Yanaşma və ümumi plan
Hər intervyuda fərqli yanaşma, tələb və s. ola bilər. Burdakı bütün addımlara fokuslanmaq əvəzinə müsahibə götürən şəxs sizi vacib bildiyi hissələrə yönləndirəcək.
1. Tələbi aydınlaşdırmaq üçün suallar verməli.
    - Hansı funksionallıqlar olacaq
    - Tələb olunan APİ necə olacaq
    - Günlük istifadəçi sayı nə qədərdir
    - Oxuma/yazma əməliyyatlarının nisbəti
    - 
2. Load, data estimation. Nə qədə data olacaq, sql yoxsa no sql lazım olacaq. Ümumi nə qədər bazaya ehtiyac var. və s.
3. İlk addımda High-level dizayn hazırlamaq. Bu ilkin versiyadır. Məsələn: client -> lb -> app server -> db
3. Bottleneck təyin etmək. Yükdən(load) asılı olaraq hansı hissədə replikasiya, sharding, partitioni və s. lazım olacaq.
4. Hər bir komponentin daha detallı dizayn etmək