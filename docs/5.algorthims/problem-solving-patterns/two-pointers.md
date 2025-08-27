---
draft: true
title: Two Pointers Pattern
description: Two Pointers pattern-in ətraflı izahı və nümunələr
slug: two-pointers-pattern
tags: [algorithms, problem-solving, two-pointers, arrays, strings]
keywords: [two pointers, algorithm pattern, interview problems]
hide_table_of_contents: false
---

# Two Pointers Pattern

## Giriş

Two Pointers (İki Göstərici) pattern-i, xüsusilə array və string problemlərini həll etmək üçün istifadə olunan effektiv bir üsuldur. Bu pattern, adından da göründüyü kimi, eyni və ya fərqli sürətlərlə hərəkət edən iki pointer (göstərici) istifadə edərək, bir data strukturunu gəzməyi nəzərdə tutur.

## Pattern-in Əsas Xüsusiyyətləri

- **İki Pointer İstifadəsi**: Adətən eyni array və ya string üzərində iki ayrı mövqedən başlayan iki göstərici
- **Məkan Effektivliyi**: Əlavə məkan istifadəsini minimuma endirir (çox vaxt O(1) əlavə məkan)
- **Zaman Effektivliyi**: Çox vaxt O(n) zaman mürəkkəbliyi ilə işləyir
- **Müxtəlif Variantlar**: Eyni istiqamətdə, əks istiqamətlərdə və ya fərqli sürətlərlə hərəkət edən pointerlər

## Two Pointers Pattern-in Tətbiq Sahələri

1. **Sorted Array-lərdə Axtarış**: Məsələn, iki ədədin cəminin hədəf dəyərə bərabər olub-olmadığını yoxlamaq
2. **Palindrome Yoxlanışı**: Bir string-in palindrome olub-olmadığını yoxlamaq
3. **Dublikatların Silinməsi**: Sıralanmış array-dən dublikatları silmək
4. **Subarraylərin Tapılması**: Müəyyən şərtləri ödəyən subarrayləri tapmaq
5. **İki Sıralanmış Array-in Birləşdirilməsi**: İki sıralanmış array-i birləşdirmək

## Nümunə Problemlər və Həllər

### 1. İki Ədədin Cəmi (Two Sum - Sorted Array)

**Problem**: Sıralanmış bir array verilir. Array-də cəmi hədəf dəyərə (target) bərabər olan iki ədədi tapın.

**Həll**:

```java
public int[] twoSum(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;
    
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        
        if (sum == target) {
            return new int[] {left + 1, right + 1}; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return new int[] {-1, -1}; // No solution found
}
```

### 2. Palindrome Yoxlanışı

**Problem**: Verilmiş string-in palindrome olub-olmadığını yoxlayın.

**Həll**:

```java
public boolean isPalindrome(String s) {
    // Alphanumeric olmayan simvolları təmizləyək və hər şeyi kiçik hərfə çevirək
    s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}
```

### 3. Sıralanmış Array-dən Dublikatların Silinməsi

**Problem**: Sıralanmış bir array verilir. Dublikatları silin və yeni uzunluğu qaytarın.

**Həll**:

```java
public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    
    int i = 0; // Slow pointer
    
    for (int j = 1; j < nums.length; j++) { // Fast pointer
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    
    return i + 1; // New length
}
```

### 4. Container With Most Water

**Problem**: n uzunluqlu bir array verilir, hər element i mövqeyində olan sütunun hündürlüyünü göstərir. Ən çox su tuta bilən konteynerin sahəsini tapın.

**Həll**:

```java
public int maxArea(int[] height) {
    int maxArea = 0;
    int left = 0;
    int right = height.length - 1;
    
    while (left < right) {
        int width = right - left;
        int h = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, width * h);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: Əksər hallarda O(n), burada n array və ya string-in uzunluğudur
- **Məkan Mürəkkəbliyi**: Adətən O(1), çünki yalnız bir neçə əlavə dəyişən istifadə olunur

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
- Məkan effektivliyi yüksəkdir
- Bir çox array və string problemlərində brute force yanaşmalardan daha effektivdir
- İmplementasiyası nisbətən sadədir

### Çatışmazlıqlar
- Hər problem üçün uyğun olmaya bilər
- Bəzən əlavə məntiq və ya şərtlər tələb edə bilər
- Sıralanmamış data üçün əvvəlcə sıralama tələb edə bilər

## Nəticə

Two Pointers pattern-i, xüsusilə array və string problemlərini həll edərkən, zaman və məkan effektivliyini artırmaq üçün çox faydalı bir üsuldur. Bu pattern-i başa düşmək və tətbiq etmək, müsahibə problemlərini həll etmək üçün vacib bir bacarıqdır.