---
description: Mikroservis arxitekturasının əsasları, üstünlükləri və çətinlikləri
slug: /mikroservisler/giris
authors: [tunay]
sidebar_position: 1
---

# ⌛ Mikroservislər

## Niyə mikroservislərə ehtiyac var?

Müasir biznes mühitində tətbiqlər tez-tez və etibarlı şəkildə dəyişikliklər tələb edir. Böyük, mürəkkəb monolitik tətbiqlər bu tələblərə cavab verməkdə çətinlik çəkir. Mikroservislər bu problemi kiçik, müstəqil komponentlərə bölünməklə həll edir.

## Mikroservis hansı problemi həll edir?

Mikroservis arxitekturası əsasən aşağıdakı problemləri həll edir:

- **Komanda asılılığı**: Monolitik tətbiqlərdə komandalar bir-birini gözləməli olur
- **Ləng deployment prosesi**: Kiçik dəyişikliklər üçün də bütün tətbiqi yenidən deploy etmək lazımdır
- **Texnologiya məhdudiyyəti**: Bütün tətbiq eyni texnologiya stack-i istifadə etməlidir
- **Miqyaslanma problemləri**: Bütün tətbiqi miqyaslamaq lazımdır, yalnız lazım olan hissəni deyil

## Mikroservis nədir?

Mikroservis arxitekturası tətbiqi bir neçə müstəqil, zəif əlaqəli komponentə (servislərə) bölür. Hər servis:
- Bir və ya bir neçə subdomain-i əhatə edir
- Öz məlumat bazasına sahibdir
- Müstəqil deploy edilə bilir
- Komanda tərəfindən müstəqil idarə olunur

## Üstünlükləri

- **Komanda muxtariyyəti**: Hər komanda öz servisini müstəqil inkişaf etdirə, test edə və deploy edə bilər
- **Sürətli deployment**: Kiçik servislər daha tez test edilir və müstəqil deploy edilə bilir
- **Texnologiya müxtəlifliyi**: Müxtəlif servislər müxtəlif texnologiya stack-lərindən istifadə edə bilər
- **Miqyaslanma (scalability)**: Hər servis öz ehtiyacına görə ayrıca miqyaslanır
- **Əlçatanlıq (availability)**: Bir servisin nasazlığı bütün sistemi dayandırmır
- **Təhlükəsizlik seqmentasiyası**: Servislər təhlükəsizlik tələblərinə görə fərqli konfiqurasiya edilə bilər

## Problemlər və Çətinliklər

- **Mürəkkəb əməliyyatlar**: Bəzi əməliyyatlar bir neçə servisi əhatə edir və anlaşılması çətin ola bilər
- **Səmərəsizlik (performance) riski**: Şəbəkə əlaqələri və böyük data transferi səmərəsizliyə səbəb ola bilər
- **Tranzaksiya idarəetməsi**: ACID tranzaksiyalar əvəzinə eventually consistent sagalar istifadə etmək lazım gəlir
- **Runtime asılılığı**: Servislər arası sıx əlaqə mövcudluğu azalda və gecikmə artıra bilər
- **Design-time asılılığı**: Servislər arası sıx dizayn əlaqəsi lockstep dəyişikliklərinə səbəb olur

## Monolitik və Mikroservis Arasında Seçim

### Monolitik Seçin Əgər:
- Tətbiq sadə və kiçikdirsə
- Komanda kiçik və eyni yerdə işləyirsə
- Performans kritik əhəmiyyət daşıyırsa
- Əməliyyatlar əsasən lokal tranzaksiyalar tələb edirsə

### Mikroservis Seçin Əgər:
- Böyük, mürəkkəb tətbiq inkişaf etdirirsinizsə
- Birdən çox komanda müstəqil işləməlidir
- Tez-tez deployment və dəyişikliklər tələb olunur
- Müxtəlif texnologiya stack-lərindən istifadə etmək lazımdır
- Yüksək əlçatanlıq (high availability) tələb olunur

## Nəticə

Mikroservis arxitekturası güclü üstünlüklər təklif edir, lakin həmçinin əlavə mürəkkəblik gətirir. Seçim tətbiqin xüsusiyyətlərinə, komanda strukturuna və biznes tələblərinə əsaslanmalıdır.

## Mikroservis vs Serverless

| Aspekt | Mikroservis | Serverless |
|--------|-------------|-----------|
| **İnfrastruktur** | Dev komandalar idarə edir (Kubernetes) | Bulud təminatçısı idarə edir |
| **Miqyaslanma (Scaling)** | Manual idarəetmə, daha çox nəzarət | Avtomatik miqyaslanma |
| **Xərc** | Provision edilmiş infrastruktur üçün ödəniş | İstifadə əsasında ödəniş (pay-per-use) |
| **Mürəkkəblik** | Çoxlu xidmətlərə görə yüksək | Aşağı, amma icra limitləri var |
| **İstifadə sahələri** | Böyük, mürəkkəb tətbiqlər | Hadisə əsaslı (event-driven), qısa ömürlü tapşırıqlar |

