---
draft: true
---
# Git
draft: true

- **Paylanmış Versiya Nəzarət Sistemi:** Git proqram təminatının inkişafı zamanı mənbə kodundakı dəyişiklikləri izləyən paylanmış versiya nəzarət sistemidir.
- **Snapshot Əsaslı:** Git məlumatları zaman keçdikcə layihənin snapshot-ları kimi saxlayır, fayllar arasındakı fərqləri deyil.
- **Lokal Əməliyyatlar:** Git əməliyyatlarının əksəriyyəti lokal səviyyədə aparılır, bu da onu sürətli edir və offline işə imkan verir.
- **Məlumat Bütövlüyü:** Git məlumat bütövlüyünü təmin etmək üçün checksum-lardan istifadə edir.
- **Hazırlama Sahəsi:** Git-də commit-ləri tamamlamadan əvvəl onları formatlaşdırmağa və nəzərdən keçirməyə imkan verən hazırlama sahəsi (və ya indeks) var.
- **Budaqlama Modeli:** Git-in budaqlama modeli yüngüldür və asan kontekst dəyişikliklərinə imkan verir.

## Əsas Anlayışlar

### Git İş Axını

- **İş Qovluğu:** Faylları dəyişdirdiyiniz yer
- **Hazırlama Sahəsi (İndeks):** Commit üçün dəyişiklikləri hazırladığınız yer
- **Lokal Anbar:** Commit-lərin lokal şəkildə saxlandığı yer
- **Uzaq Anbar:** Commit-lərin serverdə saxlandığı yer

### Git Obyektləri

- **Blob:** Fayl məlumatlarını saxlayır
- **Tree:** Qovluq strukturunu təmsil edir
- **Commit:** Tree-yə işarə edir və metadata ehtiva edir (müəllif, vaxt, mesaj)
- **Tag:** Konkret commit-ə işarə edir (adətən relizlər üçün istifadə olunur)

### Git vs Digər Versiya Nəzarət Sistemləri

| Xüsusiyyət | Git | SVN | Mercurial |
|------------|-----|-----|-----------|
| Növ | Paylanmış | Mərkəzləşdirilmiş | Paylanmış |
| Sürət | Sürətli | Yavaş | Sürətli |
| Offline İş | Tam funksionallıq | Məhdud | Tam funksionallıq |
| Budaqlama | Yüngül | Ağır | Yüngül |
| Öyrənmə Əyrisi | Daha dik | Asanlaşdırılmış | Orta |
| Saxlama | Səmərəli sıxışdırma | Az səmərəli | Səmərəli |
| Populyarlıq | Ən populyar | Azalır | Az populyar |

## Ümumi Git Əmrləri

### Əsas Əmrlər

```bash
# Yeni Git anbarını inisializasiya et
git init

# Mövcud anbarı klonla
git clone <repository-url>

# İş qovluğunun statusunu yoxla
git status

# Faylları hazırlama sahəsinə əlavə et
git add <file-name>
git add .  # Bütün faylları əlavə et

# Dəyişiklikləri commit et
git commit -m "Commit mesajı"

# Commit tarixini göstər
git log
```

### Budaqlama və Birləşdirmə

```bash
# Yeni budaq yarat
git branch <branch-name>

# Budağa keç
git checkout <branch-name>

# Yeni budaq yarat və ona keç
git checkout -b <branch-name>

# Budağı cari budaqla birləşdir
git merge <branch-name>

# Budağı sil
git branch -d <branch-name>
```

### Uzaq Əməliyyatlar

```bash
# Uzaq anbar əlavə et
git remote add <name> <url>

# Uzaqdan dəyişiklikləri gətir
git fetch <remote>

# Uzaqdan dəyişiklikləri çək (fetch + merge)
git pull <remote> <branch>

# Dəyişiklikləri uzağa göndər
git push <remote> <branch>

# Uzaq anbarları göstər
git remote -v
```

### Geri Dönmə və Sıfırlama

```bash
# Son commit-i geri al (dəyişikliklər saxlanılır)
git reset --soft HEAD~1

# Son commit-i geri al (staging area təmizlənir)
git reset --mixed HEAD~1

# Son commit-i geri al (bütün dəyişikliklər itirilir)
git reset --hard HEAD~1

# Faylı əvvəlki vəziyyətinə qaytar
git checkout -- <file-name>

# Commit-i geri al (yeni commit yaradır)
git revert <commit-hash>
```

## Git İş Axını Strategiyaları

### Gitflow

- **Main branch:** Produksiya üçün hazır kod
- **Develop branch:** Növbəti reliz üçün inkişaf
- **Feature branches:** Yeni xüsusiyyətlərin inkişafı
- **Release branches:** Reliz hazırlığı
- **Hotfix branches:** Produksiyadakı kritik problemlər

### GitHub Flow

- Sadələşdirilmiş model
- Sadəcə main branch və feature branch-lər
- Pull request vasitəsilə kod nəzarəti

## İstifadə Halları

- **Mənbə Kod İdarəetməsi:** Təkmil versiyalama və dəyişiklik izləmə
- **Kollaborasiya:** Komanda üzvləri arasında koordinasiya
- **Backup və Ehtiyat:** Kodu çoxlu yerlərdə saxlama
- **Sənəd İdarəetməsi:** Markdown, konfiqurasiya faylları
- **Deployment:** CI/CD pipeline-ların bir hissəsi

## Ən Yaxşı Təcrübələr

- Commit mesajlarını aydın və təsviri yazın
- Kiçik, atomik commit-lər edin
- Mütəmadi olaraq push edin
- .gitignore faylından istifadə edin
- Branch-ları təmiz saxlayın
- Code review prosesini tətbiq edin
- Tag-lardan relizlər üçün istifadə edin
- Backup strategiyası hazırlayın
- Git hook-larından istifadə edin
