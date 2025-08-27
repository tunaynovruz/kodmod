---
title: "Töhfə"
slug: /contribute
---
# 🤝 Layihəyə Töhfə Vermək

Kodmod layihəsinə töhfə vermək istədiyiniz üçün təşəkkür edirik! Bu bələdçi sizə layihəyə necə töhfə verəcəyinizi addım-addım izah edəcək.

## 📋 Töhfə Növləri

Siz aşağıdakı yollarla layihəyə töhfə verə bilərsiniz:

- 🐛 **Səhvləri düzəltmək** - Mövcud məzmunda olan səhvləri təmir etmək
- 📝 **Yeni məzmun əlavə etmək** - Yeni mövzular və məqalələr yazmaq
- 🎨 **Dizayn təkmilləşdirmələri** - İstifadəçi interfeysi təkmilləşdirmək
- 📚 **Sənədləşdirmə** - Mövcud sənədləri təkmilləşdirmək
- 🌐 **Tərcümələr** - Məzmunu digər dillərə tərcümə etmək

## 🚀 Başlamaq

### 1. Tələblər

Layihə ilə işləmək üçün aşağıdakılar lazımdır:

- **Node.js** (v16 və ya daha yeni versiya)
- **npm** və ya **yarn** paket meneceri
- **Git** versiya nəzarət sistemi
- **GitHub** hesabı

### 2. Repository-ni Fork etmək

1. [Kodmod repository](https://github.com/tunaynovruz/kodmod) səhifəsinə gedin
2. Səhifənin sağ üst hissəsində olan **Fork** düyməsinə basın
3. Öz GitHub hesabınıza repository-ni fork edin

### 3. Layihəni Lokal Olaraq Qurmaq

```bash
# Fork etdiyiniz repository-ni klonlayın
git clone https://github.com/[SIZIN-ISTIFADECI-ADINIZ]/kodmod.git

# Layihə qovluğuna keçin
cd kodmod

# Asılılıqları quraşdırın
npm install
# və ya
yarn install

# Development server-i işə salın
npm start
# və ya
yarn start
```

Layihə `http://localhost:3000` ünvanında açılacaq.

## 📝 Məzmun Əlavə Etmək

### Yeni Məqalə Yazmaq

1. **Uyğun qovluğu tapın**: Məzmun faylları `docs/` qovluğunda yerləşir
2. **Yeni markdown faylı yaradın**:
   ```
   docs/kateqoriya/yeni-meqale.md
   ```
3. **Front matter əlavə edin**:
   ```markdown
   ---
   id: yeni-meqale
   title: Yeni Məqalənin Başlığı
   sidebar_label: Qısa Başlıq
   description: Məqalənin qısa təsviri
   ---
   
   # Yeni Məqalənin Başlığı
   
   Məqalənin məzmunu buraya yazılır...
   ```

### Mövcud Məqaləni Redaktə Etmək

1. `docs/` qovluğunda uyğun `.md` faylını tapın
2. Dəyişikliklər edin
3. Dəyişiklikləri yoxlayın

### Şəkil və Media Faylları

1. Şəkilləri `static/img/` qovluğuna əlavə edin
2. Markdown-da belə istifadə edin:
   ```markdown
   ![Şəklin təsviri](/img/sekil-adi.png)
   ```

## 🔧 Texniki Dəyişikliklər

### Konfiqurasiya Dəyişiklikləri

- **Əsas konfiqurasiya**: `docusaurus.config.js`
- **Sidebar konfiqurasiyası**: `sidebars.js`
- **Tema dəyişiklikləri**: `src/` qovluğu

### Komponent Əlavə Etmək

1. Yeni komponenti `src/components/` qovluğuna əlavə edin
2. Komponenti lazımi səhifələrdə import edin

## 🧪 Test və Yoxlama

### Lokal Test

```bash
# Layihəni build edin
npm run build
# və ya
yarn build

# Build-i serve edin
npm run serve
# və ya
yarn serve
```

### Dil və Yazım Yoxlaması

- Azərbaycan dilinə uyğun yazım qaydalarına riayət edin
- Texniki terminləri düzgün istifadə edin
- Məzmunun aydın və anlaşılan olmasına diqqət yetirin

## 📋 Pull Request Göndərmək

### 1. Dəyişiklikləri Commit Etmək

```bash
# Dəyişiklikləri əlavə edin
git add .

# Aydın commit mesajı yazın
git commit -m "feat: yeni məqalə əlavə edildi - JavaScript əsasları"

# və ya səhv düzəltmək üçün
git commit -m "fix: Python funksiyalar səhifəsində yazım səhvi düzəldildi"
```

### 2. Commit Mesaj Formatı

Commit mesajları üçün aşağıdakı formatı istifadə edin:

- `feat:` - Yeni xüsusiyyət və ya məzmun
- `fix:` - Səhv düzəltmə
- `docs:` - Sənədləşdirmə dəyişikliyi
- `style:` - Stil və dizayn dəyişikliyi
- `refactor:` - Kod təkmilləşdirmə

### 3. Pull Request Yaratmaq

```bash
# Dəyişiklikləri GitHub-a göndərin
git push origin main
```

1. GitHub-da öz fork-unuza gedin
2. **Compare & pull request** düyməsinə basın
3. Aşağıdakı məlumatları doldurun:

**Pull Request Şablonu:**

```markdown
## 📝 Dəyişikliyin Təsviri

Bu PR-da nələr dəyişdirilmişdir?

## 📋 Dəyişiklik Növü

- [ ] 🐛 Səhv düzəltmə
- [ ] ✨ Yeni xüsusiyyət
- [ ] 📝 Sənədləşdirmə
- [ ] 🎨 Stil dəyişikliyi
- [ ] ♻️ Refaktor

## ✅ Yoxlama Siyahısı

- [ ] Kod yerli olaraq test edilmişdir
- [ ] Yazım və qrammatika yoxlanılmışdır
- [ ] Şəkillər və linklər işləyir
- [ ] Responsive dizayn yoxlanılmışdır

## 📸 Ekran Görüntüləri (əgər tətbiq olunursa)

Dəyişikliklərin vizual görüntüləri
```

## 🎯 Töhfə Təlimatları

### 📖 Məzmun Yazma Qaydaları

1. **Sadə və aydın dil** istifadə edin
2. **Praktik nümunələr** verin
3. **Addım-addım təlimatlar** yazın
4. **Kod nümunələrini** düzgün format edin

### 🖼️ Şəkil və Media

1. Şəkilləri **optimize** edin (WebP formatı üstünlük verilir)
2. **Alt text** əlavə etməyi unutmayın
3. Faylları **uyğun ölçüdə** saxlayın

### 🔗 Link və İstinadlar

1. **Daxili linkləri** yoxlayın
2. **Xarici linklərin** aktiv olduğuna əmin olun
3. **Mənbələri** düzgün qeyd edin

## 🤝 Kodeks və Davranış Qaydaları

### ✅ Edilməli

- Hörmətli və konstruktiv rəy verin
- Başqalarının töhfələrini dəstəkləyin
- Açıq mənbə ruhuna uyğun hərəkət edin

### ❌ Edilməməli

- Başqalarını təhqir etməyin
- Spam və ya əlaqəsiz məzmun paylaşmayın
- Müəllif hüquqlarını pozacaq məzmun əlavə etməyin

## 🆘 Kömək və Dəstək

### Sual və ya Problem var?

1. **Issues** bölməsində axtarış edin
2. Yeni **issue** açın
3. **Discussions** bölməsində müzakirə edin

### Əlaqə

- **GitHub Issues**: Texniki problemlər üçün
- **Email**: [email ünvanı] - Ümumi suallar üçün

## 🎉 Mükafat və Tanınma

Aktiv töhfə verənlər:

- **Contributors** siyahısında qeyd olunacaq
- Böyük töhfələr **README**-də vurğulanacaq
- Öz profil linkini əlavə edə biləcəksiniz

---

**Təşəkkür edirik!** 🙏 Sizin töhfəniz bu layihəni daha da yaxşılaşdırmağa kömək edir.

Hər hansı sualınız varsa, təmas etməkdən çəkinməyin!