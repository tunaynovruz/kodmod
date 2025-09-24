---
draft: true
---
# Docker
draft: true

- **Konteyner:** Tətbiqetməni işə salmaq üçün lazım olan hər şeyi ehtiva edən yüngül, müstəqil, icra oluna bilən proqram paketi.
- **Image (Təsvir):** Konteynerləri yaratmaq üçün istifadə olunan yalnız oxunan şablon, tətbiqetmə kodunu, kitabxanaları, asılılıqları, alətləri və digər faylları ehtiva edir.
- **Dockerfile:** Docker image qurmaq üçün təlimatları ehtiva edən mətn sənədi.
- **Docker Hub:** Konteyner təsvirlərini paylaşmaq və idarə etmək üçün bulud əsaslı qeydiyyat xidməti.
- **Docker Compose:** YAML faylları istifadə edərək çox-konteynerli Docker tətbiqetmələrini təyin etmək və işə salmaq üçün alət.
- **Docker Swarm:** Docker üçün yerli klasterləşdirmə və orkestraiya həlli.
- **Volume (Həcm):** Konteyner həyat dövrü xaricində mövcud olan daimi məlumat saxlama mexanizmi.
- **Şəbəkə:** Konteynerlərə bir-biri ilə və xarici dünya ilə əlaqə qurmağa imkan verən kommunikasiya sistemi.
- **Registry (Qeydiyyat):** Docker təsvirləri üçün saxlama və paylaşdırma sistemi.

## Əsas Anlayışlar

### Konteyner vs Virtual Maşın

| Xüsusiyyət | Konteyner | Virtual Maşın |
|------------|-----------|---------------|
| Virtuallaşdırma | OS səviyyəsində virtuallaşdırma | Aparat səviyyəsində virtuallaşdırma |
| Ölçü | Yüngül (MB-lar) | Ağır (GB-lar) |
| Başlanma vaxtı | Saniyələr | Dəqiqələr |
| Performans | Demək olar ki, doğma | Hipervisor səbəbindən əlavə yük |
| İzolyasiya | Proses izolyasiyası | Tam izolyasiya |
| OS | Host OS nüvəsini paylaşır | Tam OS tələb edir |
| Resurs istifadəsi | Səmərəli | Daha çox resurs istehlakı |

### Docker Arxitekturası

Docker müştəri-server arxitekturasından istifadə edir:
- **Docker Müştərisi:** Docker ilə qarşılıqlı təsir üçün əmr sətrəsi interfeysi
- **Docker Daemon:** Docker obyektlərini idarə edən arxa plan xidməti
- **Docker Registry:** Docker təsvirlərini saxlayır
- **Docker Obyektləri:** Təsvirlər, konteynerlər, şəbəkələr, həcmlər və s.

## Ümumi Docker Əmrləri

```bash
# Konteyner işə salın
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

# İşləyən konteynerləri sadalayın
docker ps

# Bütün konteynerləri sadalayın (dayandırılmış da daxil olmaqla)
docker ps -a

# Dockerfile-dan təsvir qurun
docker build -t image_name:tag .

# Docker Hub-dan təsvir çəkin
docker pull image_name:tag

# Docker Hub-a təsvir göndərin
docker push image_name:tag

# İşləyən konteyneri dayandırın
docker stop container_id

# Konteyneri silin
docker rm container_id

# Təsviri silin
docker rmi image_id

# Konteyner loglarına baxın
docker logs container_id
```

## İstifadə Halları

- **Mikroxidmətlər Arxitekturası:** Fərdi xidmətləri müstəqil şəkildə yerləşdirmək və miqyaslamaq
- **Davamlı İnteqrasiya/Davamlı Yerləşdirmə:** İnkişaf, test və istehsal arasında ardıcıl mühitlər
- **İnkişaf Mühitləri:** İzolə edilmiş, təkrarlana bilən inkişaf mühitlərinin yaradılması
- **Tətbiqetmə İzolyasiyası:** Eyni hostda müxtəlif asılılıqları olan çoxlu tətbiqetmələrin işlədilməsi
- **Köhnə Tətbiqetmə Miqrasiyası:** Asanlaşdırılmış idarəetmə üçün köhnə tətbiqetmələrin konteynerləşdirilməsi
- **Hibrid Bulud Yerləşdirmələri:** Müxtəlif bulud provayderlərində ardıcıl yerləşdirmə

## Ən Yaxşı Təcrübələr

- Mümkün olduqda rəsmi baza təsvirlərindən istifadə edin
- Təsvirləri kiçik və məqsədyönlü saxlayın
- Təsvir ölçüsünü azaltmaq üçün çox mərhələli qurmaları istifadə edin
- Konteynerləri root olaraq işlətməyin
- Daimi məlumatlar üçün həcmlərdən istifadə edin
- Sağlamlıq yoxlamalarını tətbiq edin
- Təsvirləri düzgün etiketləyin ("latest"-ə etibar etməyin)
- Çox-konteynerli tətbiqetmələr üçün Docker Compose istifadə edin
- Təsvirləri zəifliklərdən yoxlayın
