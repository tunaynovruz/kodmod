---
draft: true
title: Sıralama Alqoritmləri
description: Sıralama alqoritmlərinin ətraflı izahı və Java implementasiyaları
slug: siralama-alqoritmləri
tags: [alqoritmlər, sıralama, sorting, java]
keywords: [sorting algorithms, sıralama alqoritmləri, bubble sort, quick sort, merge sort]
hide_table_of_contents: false
---

# Sıralama Alqoritmləri

## Giriş

Sıralama alqoritmləri, verilənləri müəyyən bir qaydada (adətən artan və ya azalan) düzmək üçün istifadə olunan alqoritmlərdir. Bu alqoritmlər kompüter elmində ən fundamental və vacib alqoritmlər arasındadır.

## Sıralama Alqorimlərinin Təsnifatı

### Müqayisəyə Əsaslanan Alqoritmlər
- Bubble Sort
- Selection Sort  
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

### Müqayisəyə Əsaslanmayan Alqoritmlər
- Counting Sort
- Radix Sort
- Bucket Sort

## Performans Müqayisəsi

| Alqoritm | Best Case | Average Case | Worst Case | Space Complexity | Stable |
|----------|-----------|--------------|------------|------------------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Bəli |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | Xeyr |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Bəli |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Bəli |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | Xeyr |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | Xeyr |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | Bəli |
| Radix Sort | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | Bəli |
| Bucket Sort | O(n+k) | O(n+k) | O(n²) | O(n) | Bəli |

## Alqoritmlər

### [Bubble Sort](./bubble-sort.md)
Sadə, lakin effektiv olmayan sıralama alqoritmi. Qonşu elementləri müqayisə edərək işləyir.

### [Selection Sort](./selection-sort.md)
Hər addımda ən kiçik elementi tapıb yerləşdirən alqoritm.

### [Insertion Sort](./insertion-sort.md)
Kiçik massivlər üçün effektiv olan sıralama alqoritmi.

### [Merge Sort](./merge-sort.md)
"Divide and Conquer" prinsipi ilə işləyən effektiv sıralama alqoritmi.

### [Quick Sort](./quick-sort.md)
Ortalama halda ən sürətli sıralama alqoritmlərindən biri.

### [Heap Sort](./heap-sort.md)
Heap data strukturundan istifadə edən sıralama alqoritmi.

### [Counting Sort](./counting-sort.md)
İnteger massivləri üçün linear zamanda işləyən sıralama alqoritmi.

### [Radix Sort](./radix-sort.md)
Rəqəmləri müqayisə etmədən sıralayan alqoritm.

### [Bucket Sort](./bucket-sort.md)
Elementləri "bucket"-lərə bölərək sıralayan alqoritm.

## Java-da Built-in Sıralama

Java-da Arrays.sort() və Collections.sort() metodları mövcuddur:

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class JavaSorting {
    public static void main(String[] args) {
        // Array sıralama
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        Arrays.sort(arr);
        System.out.println("Sıralanmış array: " + Arrays.toString(arr));
        
        // List sıralama
        List<Integer> list = new ArrayList<>();
        list.add(64); list.add(34); list.add(25);
        Collections.sort(list);
        System.out.println("Sıralanmış list: " + list);
        
        // Reverse sıralama
        Collections.sort(list, Collections.reverseOrder());
        System.out.println("Tərs sıralanmış list: " + list);
    }
}
```

## Müsahibə Sualları

1. **Hansı sıralama alqoritmi ən yaxşıdır və niyə?**
   - Cavab: Heç bir alqoritm bütün hallarda ən yaxşı deyil. Məlumatın ölçüsü, yaddaş məhdudiyyətləri və stability tələblərinə görə seçim edilir.

2. **Stable sorting nədir və nə vaxt vacibdir?**
   - Cavab: Stable sorting eyni açarlı elementlərin nisbi sırasını saxlayır. Bu, çoxlu sahələrə görə sıralama zamanı vacibdir.

3. **In-place sorting nədir?**
   - Cavab: Əlavə yaddaş istifadə etmədən (O(1) space) sıralama aparan alqoritmlərdir.

4. **Quick Sort-un worst case nə vaxt baş verir?**
   - Cavab: Pivot həmişə ən kiçik və ya ən böyük element seçildikdə (artıq sıralanmış massivlərdə).

5. **Merge Sort-un üstünlükləri nələrdir?**
   - Cavab: Həmişə O(n log n) performans, stable, predictable performance.

## Nəticə

Sıralama alqoritmləri kompüter elminin əsasını təşkil edir. Hər alqoritmin öz üstünlükləri və çatışmazlıqları var. Düzgün alqoritm seçimi məlumatın xüsusiyyətlərinə və tələblərə əsaslanmalıdır.