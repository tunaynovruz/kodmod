---
title: Divide and Conquer Pattern
description: Divide and Conquer pattern-in ətraflı izahı və nümunələr
slug: divide-and-conquer-pattern
tags: [algorithms, problem-solving, divide-and-conquer, recursion]
keywords: [divide and conquer, algorithm pattern, interview problems, recursion]
hide_table_of_contents: false
---

# Divide and Conquer Pattern

## Giriş

Divide and Conquer (Böl və Hökm Et) pattern-i, mürəkkəb problemləri daha kiçik və həll edilməsi daha asan alt problemlərə bölmək, onları həll etmək və sonra nəticələri birləşdirərək orijinal problemi həll etmək üçün istifadə olunan fundamental bir alqoritmik paradiqmadır. Bu yanaşma, rekursiya ilə sıx bağlıdır və bir çox effektiv alqoritmlərin əsasını təşkil edir.

## Pattern-in Əsas Xüsusiyyətləri

- **Bölmə (Divide)**: Problemi daha kiçik alt problemlərə böl
- **Hökm Etmə (Conquer)**: Alt problemləri rekursiv şəkildə həll et
- **Birləşdirmə (Combine)**: Alt problemlərin həllərini birləşdirərək orijinal problemin həllini əldə et
- **Rekursiv Təbiət**: Adətən rekursiya ilə implementasiya olunur
- **Paralel İşləmə**: Bəzi hallarda alt problemlər paralel şəkildə həll edilə bilər

## Divide and Conquer Pattern-in Tətbiq Sahələri

1. **Sıralama Alqoritmləri**: Merge Sort, Quick Sort
2. **Axtarış Alqoritmləri**: Binary Search
3. **Matris Əməliyyatları**: Strassen's Matrix Multiplication
4. **Ən Yaxın Nöqtə Cütü**: Closest Pair of Points
5. **Böyük Ədədlərin Vurulması**: Karatsuba Algorithm
6. **Fourier Transformasiyası**: Fast Fourier Transform (FFT)

## Nümunə Problemlər və Həllər

### 1. Binary Search

**Problem**: Sıralanmış bir array-də hədəf dəyərin mövqeyini tapın.

**Həll**:

```java
public int binarySearch(int[] nums, int target) {
    return binarySearchHelper(nums, target, 0, nums.length - 1);
}

private int binarySearchHelper(int[] nums, int target, int left, int right) {
    if (left > right) {
        return -1; // Hədəf tapılmadı
    }
    
    int mid = left + (right - left) / 2;
    
    if (nums[mid] == target) {
        return mid; // Hədəf tapıldı
    } else if (nums[mid] > target) {
        return binarySearchHelper(nums, target, left, mid - 1); // Sol yarıda axtar
    } else {
        return binarySearchHelper(nums, target, mid + 1, right); // Sağ yarıda axtar
    }
}
```

### 2. Merge Sort

**Problem**: Verilmiş array-i sıralayın.

**Həll**:

```java
public void mergeSort(int[] arr) {
    if (arr.length < 2) {
        return; // Bazis hal: 0 və ya 1 elementli massiv artıq sıralanmış sayılır
    }
    
    int mid = arr.length / 2;
    
    // Sol və sağ yarımları yaratmaq
    int[] left = new int[mid];
    int[] right = new int[arr.length - mid];
    
    // Elementləri yarımlara köçürmək
    for (int i = 0; i < mid; i++) {
        left[i] = arr[i];
    }
    for (int i = mid; i < arr.length; i++) {
        right[i - mid] = arr[i];
    }
    
    // Rekursiv sıralama
    mergeSort(left);
    mergeSort(right);
    
    // Sıralanmış yarımları birləşdirmək
    merge(arr, left, right);
}

private void merge(int[] arr, int[] left, int[] right) {
    int leftSize = left.length;
    int rightSize = right.length;
    int i = 0, j = 0, k = 0;
    
    while (i < leftSize && j < rightSize) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }
    
    while (i < leftSize) {
        arr[k++] = left[i++];
    }
    
    while (j < rightSize) {
        arr[k++] = right[j++];
    }
}
```

### 3. Maximum Subarray Sum

**Problem**: Bir array-də ən böyük cəmə malik subarray-i tapın.

**Həll**:

```java
public int maxSubArray(int[] nums) {
    return maxSubArrayHelper(nums, 0, nums.length - 1);
}

private int maxSubArrayHelper(int[] nums, int left, int right) {
    if (left == right) {
        return nums[left]; // Bazis hal: tək element
    }
    
    int mid = left + (right - left) / 2;
    
    // Sol yarımın maksimum cəmi
    int leftSum = maxSubArrayHelper(nums, left, mid);
    
    // Sağ yarımın maksimum cəmi
    int rightSum = maxSubArrayHelper(nums, mid + 1, right);
    
    // Ortadan keçən subarray-in maksimum cəmi
    int crossSum = maxCrossingSum(nums, left, mid, right);
    
    // Üç dəyərdən maksimumu qaytarmaq
    return Math.max(Math.max(leftSum, rightSum), crossSum);
}

private int maxCrossingSum(int[] nums, int left, int mid, int right) {
    // Sol tərəfdən maksimum cəm
    int sum = 0;
    int leftSum = Integer.MIN_VALUE;
    
    for (int i = mid; i >= left; i--) {
        sum += nums[i];
        leftSum = Math.max(leftSum, sum);
    }
    
    // Sağ tərəfdən maksimum cəm
    sum = 0;
    int rightSum = Integer.MIN_VALUE;
    
    for (int i = mid + 1; i <= right; i++) {
        sum += nums[i];
        rightSum = Math.max(rightSum, sum);
    }
    
    // İki tərəfin cəmi
    return leftSum + rightSum;
}
```

### 4. Closest Pair of Points

**Problem**: 2D müstəvidə verilmiş nöqtələr arasında ən yaxın cütü tapın.

**Həll**:
Bu problem daha mürəkkəbdir, lakin əsas ideya aşağıdakı kimidir:

1. Nöqtələri x koordinatına görə sıralayın
2. Massivi ortadan iki hissəyə bölün
3. Sol və sağ yarımlarda ən yaxın cütləri rekursiv şəkildə tapın
4. Orta xətt ətrafında ən yaxın cütü tapın
5. Üç məsafədən minimumunu qaytarın

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: 
  - Binary Search: O(log n)
  - Merge Sort: O(n log n)
  - Quick Sort: Orta halda O(n log n), ən pis halda O(n²)
  - Maximum Subarray: O(n log n)
- **Məkan Mürəkkəbliyi**: 
  - Rekursiya stack-i üçün O(log n)
  - Bəzi alqoritmlər üçün əlavə məkan (məsələn, Merge Sort üçün O(n))

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
- Mürəkkəb problemləri daha sadə alt problemlərə bölərək həll edir
- Bir çox halda effektiv zaman mürəkkəbliyi təmin edir
- Paralel işləmə üçün uyğundur
- Rekursiv təbiəti kodu daha oxunaqlı edə bilər

### Çatışmazlıqlar
- Rekursiya stack overflow probleminə səbəb ola bilər
- Bəzi hallarda əlavə məkan tələb edir
- Kiçik giriş ölçüləri üçün overhead yarada bilər
- İmplementasiyası bəzən mürəkkəb ola bilər

## Nəticə

Divide and Conquer pattern-i, mürəkkəb problemləri daha kiçik və idarə edilə bilən hissələrə bölərək həll etmək üçün güclü bir üsuldur. Bu pattern, sıralama, axtarış və bir çox digər alqoritmik problemlərin effektiv həllində istifadə olunur. Bu pattern-i başa düşmək və tətbiq etmək, müsahibə problemlərini həll etmək üçün vacib bir bacarıqdır.