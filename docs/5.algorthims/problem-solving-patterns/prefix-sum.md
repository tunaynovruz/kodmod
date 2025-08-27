---
draft: true
title: Prefix Sum Pattern
description: Prefix Sum pattern-in ətraflı izahı və nümunələr
slug: prefix-sum-pattern
tags: [algorithms, problem-solving, prefix-sum, arrays, subarrays]
keywords: [prefix sum, algorithm pattern, interview problems, subarray sum]
hide_table_of_contents: false
---

# Prefix Sum Pattern

## Giriş

Prefix Sum (Öncəki Cəmlər) pattern-i, array-lərdə subarray cəmlərini effektiv şəkildə hesablamaq üçün istifadə olunan bir üsuldur. Bu pattern, array-in hər bir mövqeyi üçün, o mövqeyə qədər olan bütün elementlərin cəmini əvvəlcədən hesablayır. Bu, daha sonra istənilən subarray-in cəmini sabit zamanda (O(1)) hesablamağa imkan verir.

## Pattern-in Əsas Xüsusiyyətləri

- **Öncədən Hesablama**: Array-in hər bir mövqeyi üçün prefix sum hesablanır
- **Sabit Zamanlı Sorğular**: İstənilən subarray cəmi O(1) zamanda hesablana bilər
- **Məkan-Zaman Tarazlığı**: Əlavə məkan istifadə edərək sorğu zamanını azaldır
- **Kumulativ Cəmlər**: Hər bir element özündən əvvəlki elementlərin cəmini saxlayır

## Prefix Sum Pattern-in Tətbiq Sahələri

1. **Subarray Sum Queries**: Verilmiş aralıqda elementlərin cəmini tapmaq
2. **Range Sum Problems**: Müxtəlif aralıqlarda cəmləri hesablamaq
3. **Cumulative Frequency**: Kumulativ tezlikləri hesablamaq
4. **2D Arrays**: İki ölçülü array-lərdə submatrix cəmlərini hesablamaq
5. **Equilibrium Index**: Tarazlıq indeksini tapmaq (sol tərəfin cəmi = sağ tərəfin cəmi)

## Nümunə Problemlər və Həllər

### 1. Range Sum Query - Immutable

**Problem**: Verilmiş bir array üçün, çoxsaylı aralıq cəmi sorğularını effektiv şəkildə cavablandırın.

**Həll**:

```java
class NumArray {
    private int[] prefixSum;
    
    public NumArray(int[] nums) {
        int n = nums.length;
        prefixSum = new int[n + 1];
        
        // Prefix sum array-ini hesablayaq
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
    }
    
    // [left, right] aralığındakı elementlərin cəmini qaytarır
    public int sumRange(int left, int right) {
        return prefixSum[right + 1] - prefixSum[left];
    }
}
```

### 2. Subarray Sum Equals K

**Problem**: Verilmiş bir array-də cəmi K-ya bərabər olan subarray-lərin sayını tapın.

**Həll**:

```java
public int subarraySum(int[] nums, int k) {
    int count = 0;
    int sum = 0;
    Map<Integer, Integer> prefixSumCount = new HashMap<>();
    prefixSumCount.put(0, 1); // Boş subarray üçün
    
    for (int num : nums) {
        sum += num;
        
        // Əgər sum - k prefix sum kimi mövcuddursa, 
        // deməli cəmi k olan subarray var
        if (prefixSumCount.containsKey(sum - k)) {
            count += prefixSumCount.get(sum - k);
        }
        
        // Cari prefix sum-ı xəritəyə əlavə edirik
        prefixSumCount.put(sum, prefixSumCount.getOrDefault(sum, 0) + 1);
    }
    
    return count;
}
```

### 3. Maximum Subarray Sum

**Problem**: Verilmiş bir array-də ən böyük cəmə malik subarray-in cəmini tapın.

**Həll**:

```java
public int maxSubArray(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        // Cari element və ya cari element + əvvəlki cəm
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}
```

### 4. Product of Array Except Self

**Problem**: Verilmiş bir array üçün, hər bir element üçün array-in digər bütün elementlərinin hasilini hesablayın.

**Həll**:

```java
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    
    // Sol tərəfdən prefix product
    int leftProduct = 1;
    for (int i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }
    
    // Sağ tərəfdən prefix product və nəticəni yeniləmək
    int rightProduct = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Öncədən Hesablama**: 
  - Zaman Mürəkkəbliyi: O(n)
  - Məkan Mürəkkəbliyi: O(n)
- **Sorğular**: 
  - Zaman Mürəkkəbliyi: O(1) hər sorğu üçün
  - Məkan Mürəkkəbliyi: O(1) əlavə məkan

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
- Subarray cəmlərini effektiv şəkildə hesablamağa imkan verir
- Çoxsaylı sorğular üçün çox faydalıdır
- Sabit zamanlı sorğular təmin edir
- Bir çox array problemlərində tətbiq oluna bilər

### Çatışmazlıqlar
- Əlavə məkan tələb edir (O(n))
- Array dəyişdikdə prefix sum-ı yenidən hesablamaq lazımdır
- Yalnız toplama əməliyyatı üçün birbaşa tətbiq olunur (digər əməliyyatlar üçün modifikasiya tələb olunur)

## Nəticə

Prefix Sum pattern-i, xüsusilə subarray cəmləri ilə bağlı problemləri həll etmək üçün güclü bir üsuldur. Bu pattern, öncədən hesablama apararaq, sonrakı sorğuları sabit zamanda cavablandırmağa imkan verir. Bu, xüsusilə çoxsaylı sorğuların olduğu və ya böyük array-lərlə işləyərkən faydalıdır. Bu pattern-i başa düşmək və tətbiq etmək, müsahibə problemlərini həll etmək üçün vacib bir bacarıqdır.