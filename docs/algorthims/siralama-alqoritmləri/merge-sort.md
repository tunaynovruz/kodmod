---
title: Merge Sort
description: Merge Sort alqoritminin ətraflı izahı və Java-da implementasiyası
slug: merge-sort
tags: [algorithms, sorting, merge-sort, divide-and-conquer, java]
keywords: [merge sort, sorting algorithm, divide and conquer, java]
hide_table_of_contents: false
---

# Merge Sort

## Giriş

Merge Sort, "böl və hökm et" (divide and conquer) prinsipinə əsaslanan effektiv bir sıralama alqoritmidir. Bu alqoritm, massivi ardıcıl olaraq iki hissəyə bölür, hər bir hissəni rekursiv şəkildə sıralayır və sonra sıralanmış hissələri birləşdirir.

## Merge Sort-un Əsas Xüsusiyyətləri

- **Böl və Hökm Et**: Problemi kiçik alt problemlərə bölür
- **Rekursiv**: Özünü çağıran rekursiv bir alqoritmdir
- **Stabil**: Eyni dəyərə malik elementlərin nisbi sırası qorunur
- **Zəmanətli Performans**: Ən pis halda belə O(n log n) zaman mürəkkəbliyi

## Merge Sort-un İşləmə Prinsipi

1. **Bölmə**: Massivi ortadan iki hissəyə böl
2. **Rekursiya**: Hər iki yarımı rekursiv şəkildə sırala
3. **Birləşdirmə**: Sıralanmış yarımları birləşdir

## Merge Sort-un Java-da İmplementasiyası

```java
public class MergeSort {
    
    // Ana sıralama metodu
    public static void mergeSort(int[] arr) {
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
    
    // Birləşdirmə metodu
    private static void merge(int[] arr, int[] left, int[] right) {
        int leftSize = left.length;
        int rightSize = right.length;
        int i = 0, j = 0, k = 0;
        
        // İki sıralanmış massivi birləşdirmək
        while (i < leftSize && j < rightSize) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        
        // Sol massivdə qalan elementləri əlavə etmək
        while (i < leftSize) {
            arr[k++] = left[i++];
        }
        
        // Sağ massivdə qalan elementləri əlavə etmək
        while (j < rightSize) {
            arr[k++] = right[j++];
        }
    }
    
    // Test
    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        
        System.out.println("Original array:");
        printArray(arr);
        
        mergeSort(arr);
        
        System.out.println("\nSorted array:");
        printArray(arr);
    }
    
    // Massivi çap etmək üçün köməkçi metod
    private static void printArray(int[] arr) {
        for (int i : arr) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: 
  - Ən yaxşı hal: O(n log n)
  - Orta hal: O(n log n)
  - Ən pis hal: O(n log n)
- **Məkan Mürəkkəbliyi**: O(n), əlavə massivlər üçün

## Merge Sort-un Üstünlükləri və Çatışmazlıqları

### Üstünlüklər
- Böyük massivlər üçün effektivdir
- Stabil sıralama alqoritmidir
- Zəmanətli O(n log n) performans

### Çatışmazlıqlar
- Əlavə yaddaş tələb edir (in-place deyil)
- Kiçik massivlər üçün insertion sort kimi sadə alqoritmlər daha effektiv ola bilər

## Nəticə

Merge Sort, xüsusilə böyük massivlərin sıralanması üçün etibarlı və effektiv bir alqoritmdir. Zəmanətli O(n log n) zaman mürəkkəbliyi onu ən pis halda belə yaxşı performans göstərən bir seçim edir. Lakin, əlavə yaddaş tələbi onun məhdudiyyətidir.