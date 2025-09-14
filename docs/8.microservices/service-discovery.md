---
draft: true
title: Service Discovery Pattern
description: Mikroservislardə Service Discovery Pattern-nin ətraflı izahı və tətbiqi
slug: service-discovery-pattern
tags: [mikroservislər, service-discovery, distributed-systems, load-balancing]
keywords: [service discovery, mikroservice, service registry, load balancer]
hide_table_of_contents: false
---

# Service Discovery Pattern

## Giriş

Mikroservislər kiçik, loosely coupled distributed service-lərdir. Mikroservice architecture Monolithic Architecture-nin scalability, independently deployable və innovation problem-lərinin həlli kimi yaranıb. Bu bizə böyük application-ı efficiently manageable kiçik component-lərə bölməyə imkan verir.

## Service Discovery Nədir?

Mikroservice-lərdə service-lər bir-biri ilə kommunikasiya etməli olurlar. Monolithic application-da service-lər language-level method və ya procedure call-lar vasitəsilə bir-birini çağırırlar. Traditional distributed system deployment-da service-lər fixed, well-known location-larda (host və port) işləyirlər.

Lakin modern mikroservice-based application-lar adətən virtualized və ya containerized environment-larda işləyir ki, burada service instance-lərinin sayı və location-ları dinamik şəkildə dəyişir.

## Problem

Service-in client-i - API gateway və ya başqa service - service instance-in location-unu necə discover edə bilər?

## Context və Forces

- Hər service instance-i müəyyən location-da (host və port) remote API expose edir
- Service instance-lərinin sayı və location-ları dinamik dəyişir
- Virtual machine və container-lər adətən dynamic IP address-lər alırlar
- Service instance-lərinin sayı dinamik vary oluna bilər (məsələn, EC2 Autoscaling Group)

## Service Discovery Mexanizmi

Tutaq ki, Service-A və Service-B-miz var və Load Balancer ayrı serverdə yerləşdirilir. İndi Discovery Service-i təqdim edək.

Service-A və Service-B bir-biri ilə kommunikasiya etmək istədikdə, mikroservice-lərimizi start edərkən onları Discovery Service-ə register edirik. Bu discovery service Service-A və Service-B-nin IP və port nömrələrini bilir.

Əgər Service-B-nin müxtəlif instance-ləri varsa, bütün bu instance-lər öz information-larını Discovery Service-ə register edirlər. Bu, host və port nömrəsi information-larını manage etdiyimiz mərkəzi location-dur.

## Service Registry

Service Registry service identification-ın həlledici hissəsidir. Bu, service instance-lərinin network location-larını saxlayan database-dir. Service Registry yüksək availability və up-to-date olmalıdır.

Service Registry-də Service-B-nin 4 müxtəlif instance-i var və onlar müəyyən port nömrəsi və IP address-də işləyirlər. Eyni şəkildə, Service-A-nın bir instance-i var.

## Service Discovery Prosesi

1. **Registration**: Service-lər start olunduqda özlərini Discovery Service-ə register edirlər
2. **Query**: Service-A Service-B-yə connect olmaq istəyir
3. **Discovery**: Load Balancer Discovery Service-dən Service-B-nin instance-lərini soruşur
4. **Selection**: Load Balancer available instance-lər arasından birini seçir
5. **Communication**: Request seçilmiş instance-ə göndərilir

## Service Discovery Növləri

### 1. Client-Side Service Discovery
Client birbaşa service registry-ə query edir və available instance-lər arasından birini seçir.

### 2. Server-Side Service Discovery
Client request-i router-ə (load balancer) göndərir, router service registry-ni query edir və request-i available instance-ə forward edir.

## Server-Side Service Discovery

Server-Side Service Discovery-də client service registry ilə birbaşa əlaqə saxlamır. Bunun əvəzinə:

### Step 1: Client Request
Client (Service-A) server-ə (Load Balancer) request göndərir.

### Step 2: Registry Query
Server (Load Balancer) Discovery Service-ə query edir.

### Step 3: Response
Discovery Service available Service-B instance-lərinin siyahısını qaytarır.

### Step 4: Selection
Load Balancer instance-lərdan birini seçir və call edir.

### Step 5: No Direct Communication
Service-A Discovery Service ilə birbaşa danışmır.

## Advantages

- **Simplified Client Code**: Client-də discovery logic implement etmək lazım deyil
- **Language Independence**: Hər programming language üçün discovery logic yazmaq lazım deyil
- **Lightweight Service Consumer**: Client daha lightweight olur
- **Built-in Load Balancing**: Load Balancer load balancing işini görür
- **Cloud Environment Support**: Bəzi cloud environment-lər bu functionality-ni təmin edir

## Disadvantages

- **Additional Component**: Load Balancer əlavə system component-idir
- **Setup və Configuration**: Load Balancer setup və configure edilməlidir
- **High Availability**: Load Balancer replication availability üçün lazımdır
- **Protocol Support**: Router müxtəlif communication protocol-lərı support etməlidir
- **Network Hops**: Client-Side Discovery-yə nisbətən daha çox network hop lazımdır

## Real-World Example-lər

### AWS Elastic Load Balancer (ELB)
- Client HTTP(s) request-lərini ELB-yə göndərir
- ELB traffic-i EC2 instance-lər arasında load balance edir
- EC2 instance-lər ELB-yə API call və ya auto-scaling group vasitəsilə register olurlar

### NGINX
- Web server kimi də, reverse proxy, load balancer kimi də istifadə oluna bilər
- Free və open-source software-dir
- HTTP cache functionality-ni də dəstəkləyir

### Kubernetes və Marathon
- Hər host-da proxy işlədir
- Service-ə access üçün client local proxy-yə connect olur
- Proxy request-i cluster-də işləyən service instance-ə forward edir

## Implementation Considerations

### Service Registry Design
- **High Availability**: Service Registry highly available olmalıdır
- **Consistency**: Service information consistent olmalıdır
- **Performance**: Fast query response lazımdır
- **Scalability**: Çoxlu service-i handle edə bilməlidir

### Health Monitoring
- Service instance-lərinin health-ini monitor etmək
- Unhealthy instance-ləri registry-dən remove etmək
- Automatic failover mechanism-i təmin etmək

### Configuration Management
- Service endpoint-lərinin configuration-u
- Load balancing algorithm-larının seçimi
- Timeout və retry policy-lərinin təyini

## Best Practices

1. **Circuit Breaker Pattern**: Service Discovery ilə birlikdə istifadə edin
2. **Health Check**: Regular health check-lər implement edin
3. **Caching**: Service location-larını cache edin
4. **Monitoring**: Service discovery metrics-lərini monitor edin
5. **Security**: Service communication-u secure edin

## Nəticə

Service Discovery Pattern mikroservice architecture-da service-lər arasında communication-u təmin etmək üçün fundamental pattern-dir. Server-Side Service Discovery client-i sadələşdirir və load balancing functionality-ni təmin edir, lakin əlavə infrastructure component-lər tələb edir.

Düzgün implement edildikdə, Service Discovery pattern dynamic və scalable mikroservice environment-da reliable service communication təmin edir.
