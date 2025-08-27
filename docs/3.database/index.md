---
draft: true
sidebar_position: 3
title: Database
slug:  /db
---

# Verilənlər Bazası

Bu bölmədə verilənlər bazası ilə bağlı əsas konsepsiyalar, texnologiyalar və praktiki məsələlər haqqında ətraflı məlumat əldə edə bilərsiniz. Burada həm relyasion, həm də NoSQL verilənlər bazaları ilə bağlı mövzular əhatə olunur.

## Mövzuların Siyahısı

### Əsas Konsepsiyalar
- [ACID Prinsipləri](./acid.md) - Tranzaksiyaların etibarlılığını təmin edən dörd əsas xüsusiyyət
- [Tranzaksiyalar](./transactions.md) - Verilənlər bazasında əməliyyatların idarə edilməsi
- [Optimistic və Pessimistic Lock](./optimistic-vs-pessimistic-lock.md) - Konkurent əməliyyatların idarə edilməsi üsulları

### SQL və Relyasion Verilənlər Bazaları
- [SQL Əsasları](./sql.md) - DDL, DML və digər SQL əmrləri
- [İndekslər](./indexes.md) - Verilənlər bazasının performansını artırmaq üçün indeksləmə
- [Normalization və Denormalization](./umumi.md) - Verilənlər bazası sxemasının optimallaşdırılması

### Miqyaslanabilirlik və Yüksək Əlçatanlıq
- [Sharding](./sharding.md) - Horizontal partitioning vasitəsilə miqyaslanabilirlik
- [Replikasiya](./replication.md) - Verilənlərin nüsxələnməsi və sinxronizasiyası
- [Partitioning](./umumi.md) - Verilənlərin bölünməsi strategiyaları

### NoSQL və Alternativ Yanaşmalar
- [NoSQL Verilənlər Bazaları](./nosql.md) - Document, Key-Value, Column və Graph bazaları
- [RDBMS vs NoSQL](./nosql.md) - Fərqlər, üstünlüklər və istifadə halları

### Performans və Optimallaşdırma
- [Query Optimization](./sql.md) - Sorğuların performansının artırılması
- [Caching Strategiyaları](./misc.md) - Verilənlərə sürətli giriş üçün keşləmə
- [Throughput və Latency Optimallaşdırması](./misc.md) - Sistem performansının yaxşılaşdırılması

### Digər Mövzular
- [CAP Teoremi](./umumi.md) - Consistency, Availability və Partition Tolerance arasında balans
- [Distributed Verilənlər Bazaları](./misc.md) - Paylanmış sistemlərdə verilənlərin idarə edilməsi
