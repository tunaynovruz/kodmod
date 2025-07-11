---
title: Bubble Sort
description: Bubble Sort alqoritminin ətraflı izahı və Java implementasiyası
slug: bubble-sort
tags: [alqoritmlər, sıralama, bubble-sort, java]
keywords: [bubble sort, köpük sıralama, sorting algorithm, java]
hide_table_of_contents: false
---

# Bubble Sort

## Giriş

Bubble Sort (Köpük Sıralama), ən sadə sıralama alqoritmlərindən biridir. Bu alqoritm qonşu elementləri müqayisə edərək və lazım gəldikdə onları dəyişdirərək işləyir. Alqoritmin adı, kiçik elementlərin massivdə "köpük" kimi yuxarıya qalxmasından gəlir.

## Alqoritmin İşləmə Prinsipi

1. Massivdə soldan sağa hərəkət edir
2. Hər addımda qonşu elementləri müqayisə edir
3. Əgər sol element sağ elementdən böyükdürsə, onları dəyişdirir
4. Bu proses massivdə ən böyük element sonuna çatana qədər davam edir
5. Hər iterasiyada ən böyük element öz yerinə düşür
6. Proses bütün elementlər sıralanana qədər təkrarlanır

## Vizual Nümunə

```
İlk massiv: [64, 34, 25, 12, 22, 11, 90]

1-ci keçid:
[64, 34, 25, 12, 22, 11, 90] → [34, 64, 25, 12, 22, 11, 90] (64 > 34)
[34, 64, 25, 12, 22, 11, 90] → [34, 25, 64, 12, 22, 11, 90] (64 > 25)
[34, 25, 64, 12, 22, 11, 90] → [34, 25, 12, 64, 22, 11, 90] (64 > 12)
[34, 25, 12, 64, 22, 11, 90] → [34, 25, 12, 22, 64, 11, 90] (64 > 22)
[34, 25, 12, 22, 64, 11, 90] → [34, 25, 12, 22, 11, 64, 90] (64 > 11)
[34, 25, 12, 22, 11, 64, 90] → [34, 25, 12, 22, 11, 64, 90] (64 < 90)

Nəticə: [34, 25, 12, 22, 11, 64, 90] (90 öz yerindədir)
```

## Java İmplementasiyası

### Sadə Bubble Sort

```java
public class BubbleSort {
    
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        // Bütün elementlər üçün
        for (int i = 0; i < n - 1; i++) {
            // Son i element artıq sıralanıb
            for (int j = 0; j < n - i - 1; j++) {
                // Qonşu elementləri müqayisə et
                if (arr[j] > arr[j + 1]) {
                    // Dəyişdir
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Sıralamadan əvvəl:");
        printArray(arr);
        
        bubbleSort(arr);
        
        System.out.println("Sıralamadan sonra:");
        printArray(arr);
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}
```

### Optimizasiya edilmiş Bubble Sort

```java
public class OptimizedBubbleSort {
    
    public static void optimizedBubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Dəyişdir
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // Əgər heç bir dəyişiklik olmayıbsa, massiv sıralanıb
            if (!swapped) {
                break;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Optimizasiya edilmiş Bubble Sort:");
        System.out.println("Sıralamadan əvvəl:");
        printArray(arr);
        
        optimizedBubbleSort(arr);
        
        System.out.println("Sıralamadan sonra:");
        printArray(arr);
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}
```

### Generic Bubble Sort

```java
import java.util.Comparator;

public class GenericBubbleSort {
    
    public static <T> void bubbleSort(T[] arr, Comparator<T> comparator) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                if (comparator.compare(arr[j], arr[j + 1]) > 0) {
                    // Dəyişdir
                    T temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            if (!swapped) {
                break;
            }
        }
    }
    
    public static void main(String[] args) {
        // Integer array
        Integer[] intArr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(intArr, Integer::compareTo);
        System.out.println("Sıralanmış integer array: " + java.util.Arrays.toString(intArr));
        
        // String array
        String[] strArr = {"banana", "apple", "cherry", "date"};
        bubbleSort(strArr, String::compareTo);
        System.out.println("Sıralanmış string array: " + java.util.Arrays.toString(strArr));
        
        // Reverse order
        Integer[] reverseArr = {1, 2, 3, 4, 5};
        bubbleSort(reverseArr, (a, b) -> b.compareTo(a));
        System.out.println("Tərs sıralanmış array: " + java.util.Arrays.toString(reverseArr));
    }
}
```

## Mürəkkəblik Analizi

### Time Complexity
- **Best Case**: O(n) - Massiv artıq sıralanıbsa (optimizasiya edilmiş versiyada)
- **Average Case**: O(n²) - Elementlər təsadüfi sıralanıbsa
- **Worst Case**: O(n²) - Massiv tərs sıralanıbsa

### Space Complexity
- **O(1)** - Yalnız sabit sayda əlavə dəyişən istifadə edir (in-place alqoritm)

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
1. **Sadəlik**: Anlaşılması və implementasiyası çox asandır
2. **In-place**: Əlavə yaddaş tələb etmir
3. **Stable**: Eyni dəyərli elementlərin nisbi sırası dəyişmir
4. **Adaptive**: Optimizasiya edilmiş versiyada artıq sıralanmış massivlərdə sürətlidir

### Çatışmazlıqlar
1. **Yavaş**: O(n²) time complexity böyük massivlər üçün çox yavaşdır
2. **Çox müqayisə**: Hətta kiçik massivlərdə çox müqayisə aparır
3. **Praktiki deyil**: Real layihələrdə istifadə olunmur

## Real Dünya Tətbiqləri

1. **Təhsil məqsədləri**: Sıralama anlayışını öyrətmək üçün
2. **Kiçik data setləri**: 10-50 elementli massivlər üçün
3. **Embedded sistemlər**: Yaddaş məhdudiyyəti olan sistemlərdə
4. **Debugging**: Digər alqoritmlərin düzgünlüyünü yoxlamaq üçün

## LeetCode Problemləri

Bubble Sort birbaşa LeetCode-da problem kimi verilmir, lakin aşağıdakı problemlərdə istifadə edilə bilər:

1. **[Sort an Array (912)](https://leetcode.com/problems/sort-an-array/)** - Müxtəlif sıralama alqoritmlərini tətbiq etmək
2. **[Sort Colors (75)](https://leetcode.com/problems/sort-colors/)** - 3 rəngli topları sıralamaq
3. **[Largest Number (179)](https://leetcode.com/problems/largest-number/)** - Custom comparator ilə sıralama
4. **[Meeting Rooms (252)](https://leetcode.com/problems/meeting-rooms/)** - Interval sıralama
5. **[Merge Intervals (56)](https://leetcode.com/problems/merge-intervals/)** - Interval sıralama və birləşdirmə

## Müsahibə Sualları

### 1. Bubble Sort-un time complexity-si nədir və niyə?
**Cavab**: O(n²) - çünki iki nested loop var. Xarici loop n-1 dəfə, daxili loop isə ortalama n/2 dəfə işləyir.

### 2. Bubble Sort-u necə optimizasiya etmək olar?
**Cavab**: Əgər bir keçiddə heç bir swap olmayıbsa, massiv artıq sıralanıb və alqoritmi dayandırmaq olar.

### 3. Bubble Sort stable alqoritmdir?
**Cavab**: Bəli, çünki eyni dəyərli elementlərin yerini dəyişdirmir (yalnız arr[j] > arr[j+1] olduqda swap edir).

### 4. Bubble Sort-un space complexity-si nədir?
**Cavab**: O(1) - yalnız temp dəyişəni üçün əlavə yaddaş istifadə edir.

### 5. Nə vaxt Bubble Sort istifadə etmək məqsədəuyğundur?
**Cavab**: Kiçik data setləri (n < 50), təhsil məqsədləri, yaddaş məhdudiyyəti olan sistemlər və sadəlik tələb olunan hallarda.

### 6. Bubble Sort-u in-place alqoritm edən nədir?
**Cavab**: Orijinal massivdən başqa əlavə data struktur istifadə etməməsi.

### 7. Bubble Sort-da ən yaxşı hal nə vaxt baş verir?
**Cavab**: Massiv artıq sıralandıqda və optimizasiya edilmiş versiyada - O(n) time complexity.

## Nəticə

Bubble Sort sadə və anlaşılan alqoritm olsa da, praktiki istifadə üçün çox yavaşdır. Əsasən təhsil məqsədləri və sıralama anlayışlarını öyrətmək üçün istifadə olunur. Real layihələrdə Quick Sort, Merge Sort və ya Java-nın built-in sort metodları üstünlük verilir.