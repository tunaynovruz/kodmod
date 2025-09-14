---
draft: true
title: "Töhfə"
slug: /contribute
---
# Layihəyə Töhfə Vermək

Kodmod layihəsinə töhfə vermək istədiyiniz üçün təşəkkür edirik! Bu bələdçi sizə necə töhfə verəcəyinizi izah edəcək.

## Töhfə Növləri

- Səhvləri düzəltmək
- Yeni mövzular və məqalələr yazmaq
- Mövcud məzmunu təkmilləşdirmək

### Tələblər

- Node.js (v16 və ya daha yeni)
- Git
- GitHub hesabı

### Lokal Quraşdırma

```bash
# Repository-ni fork edin və klonlayın
git clone https://github.com/[SIZIN-ISTIFADECI-ADINIZ]/kodmod.git
cd kodmod

# Asılılıqları quraşdırın
npm install

# Development server-i işə salın
npm start
```

## Məzmun Əlavə Etmək

### Yeni Məqalə

1. `docs/` qovluğunda uyğun yerə `.md` faylı yaradın
2. Front matter əlavə edin:

```markdown
---
id: meqale-id
title: Məqalə Başlığı
sidebar_label: Qısa Başlıq
---

# Məqalə Başlığı

Məzmun...
```

### Şəkillər

Şəkilləri `static/img/` qovluğuna əlavə edin və belə istifadə edin:

```markdown
![Şəklin təsviri](/img/sekil.png)
```

## Pull Request Prosesi

### 1. Dəyişiklikləri Commit Etmək

```bash
git add .
git commit -m "yeni məqalə: JavaScript əsasları"
```

### 2. Commit Mesaj Formatı

- `yeni məqalə:` - Yeni məzmun əlavə etmək
- `düzəltmə:` - Səhvləri və typoları düzəltmək
- `yeniləmə:` - Mövcud məzmunu təkmilləşdirmək
- `şəkil:` - Media faylları əlavə etmək

### 3. Pull Request Göndərmək

```bash
git push origin main
```

GitHub-da **Compare & pull request** düyməsinə basın və aşağıdakı şablonu doldurun:

```markdown
## Dəyişikliyin Təsviri
Bu PR-da nələr dəyişdirilmişdir?

## Dəyişiklik Növü
- [ ] Yeni məzmun
- [ ] Səhv düzəltmə
- [ ] Məzmun yeniləməsi

## Yoxlama
- [ ] Yerli test edilmişdir
- [ ] Yazım yoxlanılmışdır
```

## Töhfə Qaydaları

- Sadə və aydın dil istifadə edin
- Praktik nümunələr verin
- Kod blokları üçün düzgün format istifadə edin
- Linləri yoxlayın

## Kömək

Sual və ya problem olarsa GitHub Issues bölməsində bildirim yaradın.

## Töhfə Verənlər

Aktiv töhfə verənlərin siyahısı README faylında göstərilir.

---

Töhfəniz üçün təşəkkür edirik!