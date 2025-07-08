---
title: Sliding Window Pattern
description: Sliding Window pattern-in ətraflı izahı və nümunələr
slug: sliding-window-pattern
tags: [algorithms, problem-solving, sliding-window, arrays, strings]
keywords: [sliding window, algorithm pattern, interview problems, subarray, substring]
hide_table_of_contents: false
---

# Sliding Window Pattern

## Giriş

Sliding Window (Sürüşən Pəncərə) pattern-i, array və ya string kimi data strukturlarında ardıcıl elementlərin alt qrupları (subarray, substring) üzərində əməliyyatlar aparmaq üçün istifadə olunan effektiv bir üsuldur. Bu pattern, "pəncərə" adlanan bir alt qrupu saxlayır və bu pəncərəni data strukturu boyunca sürüşdürür, beləliklə hər addımda bütün elementləri yenidən emal etmək əvəzinə, yalnız pəncərəyə daxil olan və çıxan elementlərlə işləyir.

## Pattern-in Əsas Xüsusiyyətləri

- **Pəncərə Konsepti**: Ardıcıl elementlərdən ibarət bir alt qrup (pəncərə) saxlanılır
- **Sürüşmə Mexanizmi**: Pəncərə data strukturu boyunca sürüşdürülür
- **Məkan Effektivliyi**: Adətən O(1) əlavə məkan istifadə edir
- **Zaman Effektivliyi**: Çox vaxt O(n) zaman mürəkkəbliyi ilə işləyir
- **İki Növü**: Sabit ölçülü pəncərə və dəyişən ölçülü pəncərə

## Sliding Window Pattern-in Tətbiq Sahələri

1. **Subarray/Substring Problemləri**: Müəyyən şərtləri ödəyən subarray/substring-ləri tapmaq
2. **Maximum/Minimum Subarray**: Ən böyük/kiçik cəmə malik subarray-i tapmaq
3. **String Matching**: String-də pattern axtarışı
4. **Distinct Elements**: Verilmiş sayda fərqli elementdən ibarət subarray-lər
5. **Fixed Size Window**: Sabit ölçülü pəncərə üzərində əməliyyatlar

## Nümunə Problemlər və Həllər

### 1. Maximum Sum Subarray of Size K

**Problem**: Verilmiş array-də ölçüsü k olan və maksimum cəmə malik subarray-i tapın.

**Həll**:

```java
public int maxSumSubarray(int[] arr, int k) {
    if (arr == null || arr.length == 0 || k <= 0 || k > arr.length) {
        return 0;
    }
    
    int maxSum = 0;
    int windowSum = 0;
    
    // İlk pəncərənin cəmini hesablayaq
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    maxSum = windowSum;
    
    // Pəncərəni sürüşdürək
    for (int i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i]; // Çıxan elementi çıxarıb, yeni elementi əlavə edirik
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}
```

### 2. Longest Substring Without Repeating Characters

**Problem**: Verilmiş string-də təkrarlanan simvollar olmayan ən uzun substring-in uzunluğunu tapın.

**Həll**:

```java
public int lengthOfLongestSubstring(String s) {
    if (s == null || s.length() == 0) {
        return 0;
    }
    
    int n = s.length();
    int maxLength = 0;
    Map<Character, Integer> charIndexMap = new HashMap<>();
    
    // Dəyişən ölçülü pəncərə
    int windowStart = 0;
    
    for (int windowEnd = 0; windowEnd < n; windowEnd++) {
        char rightChar = s.charAt(windowEnd);
        
        // Əgər cari simvol artıq pəncərədə varsa, pəncərənin başlanğıcını yeniləyirik
        if (charIndexMap.containsKey(rightChar)) {
            // Pəncərəni təkrarlanan simvoldan sonraya sürüşdürürük
            windowStart = Math.max(windowStart, charIndexMap.get(rightChar) + 1);
        }
        
        // Cari simvolu və onun indeksini xəritəyə əlavə edirik
        charIndexMap.put(rightChar, windowEnd);
        
        // Maksimum uzunluğu yeniləyirik
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
    }
    
    return maxLength;
}
```

### 3. Minimum Size Subarray Sum

**Problem**: Verilmiş array-də cəmi ən azı s olan ən qısa subarray-in uzunluğunu tapın.

**Həll**:

```java
public int minSubArrayLen(int s, int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    
    int n = nums.length;
    int minLength = Integer.MAX_VALUE;
    int windowSum = 0;
    int windowStart = 0;
    
    for (int windowEnd = 0; windowEnd < n; windowEnd++) {
        windowSum += nums[windowEnd]; // Cari elementi pəncərəyə əlavə edirik
        
        // Pəncərə cəmi s-dən böyük və ya bərabər olduqda, pəncərəni kiçiltməyə çalışırıq
        while (windowSum >= s) {
            minLength = Math.min(minLength, windowEnd - windowStart + 1);
            windowSum -= nums[windowStart]; // Pəncərənin əvvəlindəki elementi çıxarırıq
            windowStart++; // Pəncərəni sağa sürüşdürürük
        }
    }
    
    return minLength == Integer.MAX_VALUE ? 0 : minLength;
}
```

### 4. Permutation in String

**Problem**: Verilmiş s1 string-inin hər hansı bir permutasiyası s2 string-ində mövcuddurmu?

**Həll**:

```java
public boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) {
        return false;
    }
    
    int[] s1Count = new int[26]; // s1-dəki hərflərin sayını saxlamaq üçün
    int[] s2Count = new int[26]; // Cari pəncərədəki hərflərin sayını saxlamaq üçün
    
    // s1-dəki hərflərin sayını hesablayaq
    for (char c : s1.toCharArray()) {
        s1Count[c - 'a']++;
    }
    
    // Sliding window
    for (int i = 0; i < s2.length(); i++) {
        s2Count[s2.charAt(i) - 'a']++;
        
        // Pəncərə ölçüsü s1-in uzunluğundan böyük olduqda, pəncərənin əvvəlindəki elementi çıxarırıq
        if (i >= s1.length()) {
            s2Count[s2.charAt(i - s1.length()) - 'a']--;
        }
        
        // Əgər pəncərə ölçüsü s1-in uzunluğuna bərabərdirsə, yoxlayırıq
        if (i >= s1.length() - 1 && Arrays.equals(s1Count, s2Count)) {
            return true;
        }
    }
    
    return false;
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: Əksər hallarda O(n), burada n array və ya string-in uzunluğudur
- **Məkan Mürəkkəbliyi**: Adətən O(1) və ya O(k), burada k pəncərə ölçüsü və ya əlavə data strukturların ölçüsüdür

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
- Subarray/substring problemlərini həll etmək üçün effektivdir
- Brute force yanaşmalardan daha yaxşı zaman mürəkkəbliyi təqdim edir
- Məkan effektivliyi yüksəkdir

### Çatışmazlıqlar
- Yalnız ardıcıl elementlərdən ibarət alt qruplar üçün uyğundur
- Bəzi hallarda əlavə data strukturlar tələb edə bilər
- Dəyişən ölçülü pəncərə problemləri daha mürəkkəb ola bilər

## Nəticə

Sliding Window pattern-i, xüsusilə array və string-lərdə ardıcıl elementlərdən ibarət alt qruplar üzərində əməliyyatlar aparmaq üçün çox faydalı bir üsuldur. Bu pattern, brute force yanaşmalardan daha effektiv həllər təqdim edir və müsahibə problemlərini həll etmək üçün vacib bir bacarıqdır.