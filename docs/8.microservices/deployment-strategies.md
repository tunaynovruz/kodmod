---
draft: true
title: Mikroservis Deployment Strategiyaları
description: Mikroservislərin təhlükəsiz və etibarlı deployment üsulları və nümunələri
slug: /mikroservisler/deployment-strategies
authors: [tunay]
sidebar_position: 7
---

# Mikroservis Deployment Strategiyaları

## Deployment Strategiyaları Nədir?

Deployment strategiyaları, proqram təminatının yeni versiyalarının istehsal mühitinə necə yerləşdiriləcəyini müəyyən edən yanaşmalardır. Mikroservis mühitində, düzgün deployment strategiyası seçmək, xidmət fasiləsizliyini təmin etmək, riskləri azaltmaq və problemlər yarandıqda tez geri qayıtmaq imkanı yaratmaq üçün kritik əhəmiyyət daşıyır.

## Əsas Deployment Strategiyaları

### 1. Recreate (Yenidən Yaratma)

Ən sadə strategiya olub, köhnə versiyanı tamamilə dayandırıb, yeni versiyanı başlatmağı nəzərdə tutur.

#### İşləmə Prinsipi:
1. Köhnə versiya (v1) tamamilə dayandırılır
2. Yeni versiya (v2) başladılır

#### Diaqram:
```
v1 -------|
           |
v2         |------------>
```

#### Üstünlükləri:
- Sadə və başa düşülməsi asan
- Minimal infrastruktur tələbləri
- Tam yenilənmə təmin edir

#### Çatışmazlıqları:
- Xidmət fasiləsi yaradır (downtime)
- Geri qayıtma prosesi yavaşdır
- İstifadəçi təcrübəsinə mənfi təsir göstərir

#### İstifadə Halları:
- Development və test mühitləri
- Kritik olmayan xidmətlər
- Planlaşdırılmış texniki xidmət zamanı

### 2. Blue-Green Deployment

Bu strategiya, eyni anda iki identik istehsal mühitini (mavi və yaşıl) saxlamağı nəzərdə tutur. Bir mühit aktiv (canlı trafik qəbul edir), digəri isə qeyri-aktivdir.

#### İşləmə Prinsipi:
1. Köhnə versiya (v1) mavi mühitdə işləyir və bütün trafiki qəbul edir
2. Yeni versiya (v2) yaşıl mühitdə yerləşdirilir və test edilir
3. Trafik mavi mühitdən yaşıl mühitə yönləndirilir (router/load balancer vasitəsilə)
4. Problem yaranarsa, trafik dərhal mavi mühitə qaytarılır

#### Diaqram:
```
       Trafik
          |
v1 (Mavi) |--------|
                    |
v2 (Yaşıl)          |------->
```

#### Üstünlükləri:
- Sıfır xidmət fasiləsi (zero downtime)
- Sürətli geri qayıtma (rollback)
- Yeni versiya istehsal mühitində tam test edilə bilər

#### Çatışmazlıqları:
- İkiqat infrastruktur resursu tələb edir
- Verilənlər bazası sxeması dəyişiklikləri mürəkkəbdir
- Ani keçid (trafik birdən-birə yönləndirilir)

#### İstifadə Halları:
- Kritik biznes tətbiqləri
- Yüksək əlçatanlıq tələb edən xidmətlər
- Planlaşdırılmamış fasilələrin qəbuledilməz olduğu mühitlər

### 3. Canary Deployment

Canary deployment, yeni versiyanı əvvəlcə kiçik bir istifadəçi qrupuna təqdim etməyi və tədricən bütün istifadəçilərə yayılmağı nəzərdə tutur.

#### İşləmə Prinsipi:
1. Köhnə versiya (v1) bütün trafiki qəbul edir
2. Yeni versiya (v2) yerləşdirilir və trafikin kiçik bir hissəsi (məsələn, 5%) ona yönləndirilir
3. Yeni versiya monitorinq edilir və problemlər aşkar edilməzsə, tədricən daha çox trafik ona yönləndirilir
4. Nəhayət, bütün trafik yeni versiyaya keçirilir və köhnə versiya dayandırılır

#### Diaqram:
```
v1 ---------|------------|----------|
             \            \          \
v2            \------------|----------|--->
              5%           50%        100%
```

#### Üstünlükləri:
- Risk tədricən artırılır
- Real istifadəçi trafikində test imkanı
- Problemlər kiçik miqyasda aşkar edilir
- Tədricən yayılma nəzarəti

#### Çatışmazlıqları:
- Daha mürəkkəb konfiqurasiya
- Hər iki versiya eyni zamanda işləməlidir
- Versiyalar arası uyğunluq tələb olunur

#### İstifadə Halları:
- Yüksək riskli dəyişikliklər
- İstifadəçi davranışının yoxlanılması
- A/B testləri
- Böyük istifadəçi bazası olan tətbiqlər

### 4. Shadow Deployment (Kölgə Deployment)

Shadow deployment, yeni versiyanı "kölgə rejimində" işə salmağı nəzərdə tutur - yəni, canlı trafik həm köhnə, həm də yeni versiyaya göndərilir, lakin yalnız köhnə versiyanın cavabları istifadəçilərə qaytarılır.

#### İşləmə Prinsipi:
1. Köhnə versiya (v1) bütün trafiki qəbul edir və cavabları istifadəçilərə qaytarır
2. Yeni versiya (v2) yerləşdirilir
3. Canlı trafik həm v1, həm də v2-yə göndərilir, lakin v2-nin cavabları istifadəçilərə göstərilmir
4. v2-nin performansı və davranışı monitorinq edilir
5. v2 etibarlı hesab edildikdən sonra, tam canary və ya blue-green deployment ilə aktiv edilir

#### Diaqram:
```
                 |--> v1 --> İstifadəçi Cavabları
                 |
İstifadəçi Trafiki
                 |
                 |--> v2 --> (Cavablar atılır/monitorinq edilir)
```

#### Üstünlükləri:
- Sıfır risk (istifadəçilər yeni versiyadan təsirlənmir)
- Real trafik şəraitində tam test
- Performans və davranış müqayisəsi

#### Çatışmazlıqları:
- İkiqat sistem yükü
- Mürəkkəb konfiqurasiya
- Bəzi hallarda dəqiq test çətindir (məsələn, yazma əməliyyatları)

#### İstifadə Halları:
- Yüksək performans tələb edən sistemlər
- Mürəkkəb biznes məntiqinin doğrulanması
- Yeni alqoritmlərin və optimallaşdırmaların test edilməsi

### 5. A/B Testing

A/B testing, müxtəlif versiyaları müxtəlif istifadəçi qruplarına təqdim etməyi və hansının daha yaxşı nəticə verdiyini ölçməyi nəzərdə tutur.

#### İşləmə Prinsipi:
1. Müxtəlif versiyalar (A və B) eyni zamanda yerləşdirilir
2. İstifadəçilər müəyyən meyarlara əsasən (məsələn, coğrafi mövqe, cihaz növü) A və ya B versiyasına yönləndirilir
3. Hər versiya üçün müəyyən metrikalar (məsələn, konversiya dərəcəsi, istifadəçi məmnuniyyəti) ölçülür
4. Daha yaxşı nəticə göstərən versiya tam olaraq tətbiq edilir

#### Diaqram:
```
                 |--> Versiya A --> İstifadəçi Qrupu A
                 |
İstifadəçi Trafiki
                 |
                 |--> Versiya B --> İstifadəçi Qrupu B
```

#### Üstünlükləri:
- Məlumat əsaslı qərar qəbul etmə
- İstifadəçi davranışının daha yaxşı başa düşülməsi
- Biznes dəyərinin ölçülməsi

#### Çatışmazlıqları:
- Mürəkkəb analitika infrastrukturu tələb edir
- Nəticələrin düzgün şərh edilməsi çətin ola bilər
- Uzun müddətli test tələb edə bilər

#### İstifadə Halları:
- İstifadəçi interfeysi dəyişiklikləri
- Yeni xüsusiyyətlərin tətbiqi
- Qiymətləndirmə strategiyaları
- Marketinq kampaniyaları

### 6. Rolling Update (Davamlı Yeniləmə)

Rolling update, yeni versiyanı tədricən, bir neçə instansı eyni zamanda yeniləməklə tətbiq etməyi nəzərdə tutur.

#### İşləmə Prinsipi:
1. Sistem bir neçə instansdan ibarətdir, hamısı v1 versiyasını işlədir
2. Bir və ya bir neçə instans dayandırılır və v2 versiyası ilə əvəz edilir
3. Yeni instanslar sağlamlıq yoxlamasından keçdikdən sonra, trafik qəbul etməyə başlayır
4. Proses bütün instanslar yenilənənə qədər davam edir

#### Diaqram:
```
v1 ---|---|---|---|
v2    |---|---|---|---->
      25%  50%  75% 100%
```

#### Üstünlükləri:
- Minimal və ya sıfır xidmət fasiləsi
- Daha az resurs tələb edir (blue-green ilə müqayisədə)
- Nəzarət edilə bilən yeniləmə sürəti

#### Çatışmazlıqları:
- Versiyalar arası uyğunluq tələb olunur
- Geri qayıtma daha mürəkkəbdir
- Yeniləmə prosesi daha uzun çəkə bilər

#### İstifadə Halları:
- Böyük klaster mühitləri (Kubernetes)
- Stateless mikroservislər
- Orta risk səviyyəli dəyişikliklər

## Deployment Strategiyalarının Müqayisəsi

| Strategiya | Downtime | Resurs Tələbi | Risk | Geri Qayıtma Sürəti | Mürəkkəblik |
|------------|----------|---------------|------|---------------------|-------------|
| Recreate | Yüksək | Aşağı | Yüksək | Yavaş | Aşağı |
| Blue-Green | Yox | Yüksək | Orta | Çox sürətli | Orta |
| Canary | Yox | Orta | Aşağı | Sürətli | Yüksək |
| Shadow | Yox | Yüksək | Sıfır | N/A | Çox yüksək |
| A/B Testing | Yox | Orta | Orta | Orta | Yüksək |
| Rolling Update | Minimal | Aşağı | Orta | Orta | Orta |

## Deployment Strategiyası Seçimi

Deployment strategiyası seçərkən nəzərə alınmalı faktorlar:

1. **Xidmət Səviyyəsi Razılaşmaları (SLA)**: Əlçatanlıq tələbləri
2. **Risk Tolerantlığı**: Biznesin risk qəbul etmə səviyyəsi
3. **Resurs Məhdudiyyətləri**: Mövcud infrastruktur və büdcə
4. **Dəyişikliyin Təbiəti**: Dəyişikliyin miqyası və təsiri
5. **Monitorinq İmkanları**: Problemləri aşkar etmə qabiliyyəti
6. **Komanda Təcrübəsi**: Komandanın texniki bacarıqları

## Deployment Strategiyalarının Tətbiqi

### Kubernetes-də Tətbiq

#### Blue-Green Deployment:
```yaml
# Blue deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: blue
  template:
    metadata:
      labels:
        app: my-app
        version: blue
    spec:
      containers:
      - name: my-app
        image: my-app:1.0
---
# Green deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: green
  template:
    metadata:
      labels:
        app: my-app
        version: green
    spec:
      containers:
      - name: my-app
        image: my-app:2.0
---
# Service (initially pointing to blue)
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
    version: blue
  ports:
  - port: 80
    targetPort: 8080
```

#### Canary Deployment:
```yaml
# Main deployment (90% of traffic)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-main
spec:
  replicas: 9
  selector:
    matchLabels:
      app: my-app
      version: v1
  template:
    metadata:
      labels:
        app: my-app
        version: v1
    spec:
      containers:
      - name: my-app
        image: my-app:1.0
---
# Canary deployment (10% of traffic)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-canary
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
      version: v2
  template:
    metadata:
      labels:
        app: my-app
        version: v2
    spec:
      containers:
      - name: my-app
        image: my-app:2.0
---
# Service (pointing to both deployments)
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 8080
```

### CI/CD Pipeline İnteqrasiyası

Deployment strategiyalarını CI/CD pipeline-larına inteqrasiya etmək üçün nümunə:

```yaml
# GitLab CI/CD Pipeline
stages:
  - build
  - test
  - deploy-canary
  - test-canary
  - deploy-production
  - rollback

build:
  stage: build
  script:
    - docker build -t my-app:$CI_COMMIT_SHA .
    - docker push my-app:$CI_COMMIT_SHA

test:
  stage: test
  script:
    - run-tests.sh

deploy-canary:
  stage: deploy-canary
  script:
    - kubectl set image deployment/my-app-canary my-app=my-app:$CI_COMMIT_SHA
  environment:
    name: canary

test-canary:
  stage: test-canary
  script:
    - sleep 60  # Wait for deployment
    - run-smoke-tests.sh
    - monitor-metrics.sh 300  # Monitor for 5 minutes

deploy-production:
  stage: deploy-production
  script:
    - kubectl set image deployment/my-app-main my-app=my-app:$CI_COMMIT_SHA
  environment:
    name: production
  when: manual

rollback:
  stage: rollback
  script:
    - kubectl rollout undo deployment/my-app-canary
    - kubectl rollout undo deployment/my-app-main
  when: manual
  only:
    - master
```

## Deployment Strategiyalarının Monitorinqi

Deployment prosesinin effektiv monitorinqi üçün izlənilməli metrikalar:

1. **Əlçatanlıq (Availability)**: Sistemin işlək olma faizi
2. **Xəta Dərəcəsi (Error Rate)**: Uğursuz sorğuların faizi
3. **Cavab Vaxtı (Response Time)**: Sorğuların emal müddəti
4. **Trafik Həcmi**: Sistemə daxil olan sorğuların sayı
5. **CPU/Yaddaş İstifadəsi**: Sistem resurslarının istifadəsi
6. **Biznes Metrikaları**: Konversiya dərəcəsi, istifadəçi aktivliyi və s.

## Nəticə

Mikroservis mühitində düzgün deployment strategiyasının seçilməsi, sistemin dayanıqlılığını, əlçatanlığını və təhlükəsizliyini təmin etmək üçün kritik əhəmiyyət daşıyır. Hər strategiyanın öz üstünlükləri və çatışmazlıqları var, və seçim konkret tətbiqin tələblərinə, risk tolerantlığına və mövcud resurslara əsaslanmalıdır.

Müasir deployment alətləri və platformaları (Kubernetes, Istio, Spinnaker və s.) bu strategiyaların tətbiqini asanlaşdırır və avtomatlaşdırır. Deployment prosesinin effektiv monitorinqi və avtomatlaşdırılmış geri qayıtma mexanizmləri, problemlərin tez aşkar edilməsini və həll edilməsini təmin edir.
