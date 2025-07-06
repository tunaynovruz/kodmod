# Replikasiya metodları

- **Master-Slave:** Yazılar yalnız əsas node (primary) tərəfindən idarə olunur; replikalar oxumaq üçündür.
    - Üstünlüklər: Yedəkləmə (redundancy), yük balansı, sadə tətbiq.
    - Mənfi cəhətlər: Yazı tıxacları, replikasiya gecikməsi.

- **Primary-Primary (Master-Master):** Bir neçə node həm oxuya, həm yazıya imkan verir.
    - Üstünlüklər: Yüksək mövcudluq (availability), yazı yükünün paylaşdırılması, tək nöqtə nasazlığı yoxdur.
    - Mənfi cəhətlər: Konfliktlərin idarə olunması, mürəkkəb, əlavə yük.

- **Multi-Master:** Bir neçə node yazı edə bilir.
    - Üstünlüklər: Yüksək mövcudluq, coğrafi yedəkləmə (redundancy).
    - Mənfi cəhətlər: Mürəkkəb, konflikt həlli problemləri, sinxronizasiya yükləri.

- **Read-Replica:** Yazılar əsas node-da, oxular replikalarda həyata keçirilir.
    - Üstünlüklər: Oxu performansının artırılması, asan qurulum.
    - Mənfi cəhətlər: Yazı performansına təsiri yoxdur, replikasiya gecikməsi ola bilər.

- **Snapshot:** Məlumat müəyyən vaxtda şəkil kimi kopyalanır.
    - Üstünlüklər: Sadə, hesabat üçün uyğundur.
    - Mənfi cəhətlər: Real vaxtda deyil, böyük snapshotlarda resurs tələb edir.

- **Hybrid:** Müxtəlif metodların qarışığı, ehtiyaca uyğun tənzimlənir.
    - Üstünlüklər: Elastik, performans və uyğunluq (consistency) arasında balans.
    - Mənfi cəhətlər: Mürəkkəb, replikasiya konflikt riski.

---

# Replikasiya strategiyaları

- **Sinxron replikasiya:** Yazı əməliyyatı bütün nüsxələrə eyni anda tətbiq olunur. Məlumat uyğunluğu (consistency) yüksəkdir, amma gecikmə ola bilər.

- **Asinxron replikasiya:** Yazı əməliyyatı əsas node-da tamamlanır, replikalar sonra yenilənir. Daha az gecikmə, amma məlumatda gecikmələr (stale data) ola bilər.

- **Semi-sinxron replikasiya:** Yazı əməliyyatı ən azı bir replikada təsdiqlənməlidir, tam sinxronla asinxron arasında balansdır.

- **Primary-Replica:** Bir əsas node yazır, digər nüsxələr yalnız oxuyur. Sadə və geniş istifadə olunur.

- **Peer-to-Peer Replica:** Bütün node-lar həm oxuya, həm yazıya imkan verir. Yüksək mövcudluq, amma konfliktlərin idarəsi çətindir.


---

# Redundancy və Replication fərqi

- **Redundancy:** Passiv; ehtiyat komponentlər yalnız nasazlıq zamanı istifadə olunur.
- **Replication:** Aktiv; bütün məlumat nüsxələri aktiv şəkildə işləyir (yük balansı və ya bərpa üçün).

- Redundancy sistemin etibarlılığı (reliability) və mövcudluğuna (availability) fokuslanır.
- Replication məlumatın mövcudluğu (availability) və uyğunluğuna (consistency) yönəlib.

- Redundancy bənzər ehtiyat sistem və komponentlərdən ibarətdir.
- Replication məlumatın müxtəlif sistemlərdə yayılması və sinxronizasiyasıdır.


Digər
- conflict həlləri
  - sonuncu yazan qalib gəlir
- leaderless replication
- distibuted vs centrilazied
- 