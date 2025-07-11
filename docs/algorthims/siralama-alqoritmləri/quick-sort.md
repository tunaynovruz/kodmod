---
title: Quick Sort
description: Quick Sort alqoritminin ətraflı izahı və Java implementasiyası
slug: quick-sort
tags: [alqoritmlər, sıralama, quick-sort, java, divide-conquer]
keywords: [quick sort, sürətli sıralama, sorting algorithm, java, pivot]
hide_table_of_contents: false
---

# Quick Sort

## Giriş

Quick Sort, "Divide and Conquer" (Böl və Hökm et) strategiyasından istifadə edən çox effektiv sıralama alqoritmdir. Bu alqoritm ortalama halda O(n log n) time complexity-ə malikdir və praktikada ən sürətli sıralama alqoritmlərindən biri hesab olunur.

## Alqoritmin İşləmə Prinsipi

1. **Pivot seçimi**: Massivdən bir element pivot kimi seçilir
2. **Partitioning**: Massiv pivot elementə görə iki hissəyə bölünür:
   - Sol hissə: pivot-dan kiçik elementlər
   - Sağ hissə: pivot-dan böyük elementlər
3. **Rekursiv çağırış**: Sol və sağ hissələr üçün eyni proses təkrarlanır
4. **Base case**: Massivdə 1 və ya 0 element qaldıqda rekursiya dayanır

## Vizual Nümunə

```
İlk massiv: [64, 34, 25, 12, 22, 11, 90]
Pivot: 64 (ilk element)

Partitioning:
[34, 25, 12, 22, 11] [64] [90]
     (kiçiklər)    pivot (böyüklər)

Sol hissə üçün rekursiya: [34, 25, 12, 22, 11]
Pivot: 34
[25, 12, 22, 11] [34] []

Sol hissə: [25, 12, 22, 11]
Pivot: 25
[12, 22, 11] [25] []

Davam edir...

Final nəticə: [11, 12, 22, 25, 34, 64, 90]
```

## Java İmplementasiyası

### Sadə Quick Sort

```java
public class QuickSort {
    
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition indeksini tap
            int pivotIndex = partition(arr, low, high);
            
            // Pivot-dan əvvəlki hissəni sırala
            quickSort(arr, low, pivotIndex - 1);
            
            // Pivot-dan sonrakı hissəni sırala
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        // Son elementi pivot kimi seç
        int pivot = arr[high];
        int i = low - 1; // Kiçik elementlərin indeksi
        
        for (int j = low; j < high; j++) {
            // Əgər current element pivot-dan kiçik və ya bərabərdirsə
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        // Pivot-u düzgün yerinə qoy
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Sıralamadan əvvəl:");
        printArray(arr);
        
        quickSort(arr, 0, arr.length - 1);
        
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

### Randomized Quick Sort

```java
import java.util.Random;

public class RandomizedQuickSort {
    private static Random random = new Random();
    
    public static void randomizedQuickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Random pivot seç
            int randomIndex = low + random.nextInt(high - low + 1);
            swap(arr, randomIndex, high);
            
            int pivotIndex = partition(arr, low, high);
            
            randomizedQuickSort(arr, low, pivotIndex - 1);
            randomizedQuickSort(arr, pivotIndex + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Randomized Quick Sort:");
        System.out.println("Sıralamadan əvvəl:");
        printArray(arr);
        
        randomizedQuickSort(arr, 0, arr.length - 1);
        
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

### 3-Way Quick Sort (Dutch National Flag)

```java
public class ThreeWayQuickSort {
    
    public static void threeWayQuickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        
        int[] pivots = threeWayPartition(arr, low, high);
        int lt = pivots[0]; // pivot-dan kiçik elementlərin sonu
        int gt = pivots[1]; // pivot-dan böyük elementlərin başlanğıcı
        
        threeWayQuickSort(arr, low, lt - 1);
        threeWayQuickSort(arr, gt + 1, high);
    }
    
    private static int[] threeWayPartition(int[] arr, int low, int high) {
        int pivot = arr[low];
        int lt = low;      // arr[low..lt-1] < pivot
        int i = low + 1;   // arr[lt..i-1] == pivot
        int gt = high;     // arr[gt+1..high] > pivot
        
        while (i <= gt) {
            if (arr[i] < pivot) {
                swap(arr, lt++, i++);
            } else if (arr[i] > pivot) {
                swap(arr, i, gt--);
            } else {
                i++;
            }
        }
        
        return new int[]{lt, gt};
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90, 25, 25};
        
        System.out.println("3-Way Quick Sort:");
        System.out.println("Sıralamadan əvvəl:");
        printArray(arr);
        
        threeWayQuickSort(arr, 0, arr.length - 1);
        
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

### Generic Quick Sort

```java
import java.util.Comparator;

public class GenericQuickSort {
    
    public static <T> void quickSort(T[] arr, int low, int high, Comparator<T> comparator) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high, comparator);
            quickSort(arr, low, pivotIndex - 1, comparator);
            quickSort(arr, pivotIndex + 1, high, comparator);
        }
    }
    
    private static <T> int partition(T[] arr, int low, int high, Comparator<T> comparator) {
        T pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (comparator.compare(arr[j], pivot) <= 0) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private static <T> void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        // Integer array
        Integer[] intArr = {64, 34, 25, 12, 22, 11, 90};
        quickSort(intArr, 0, intArr.length - 1, Integer::compareTo);
        System.out.println("Sıralanmış integer array: " + java.util.Arrays.toString(intArr));
        
        // String array
        String[] strArr = {"banana", "apple", "cherry", "date"};
        quickSort(strArr, 0, strArr.length - 1, String::compareTo);
        System.out.println("Sıralanmış string array: " + java.util.Arrays.toString(strArr));
    }
}
```

## Java Built-in Quick Sort

Java-da Arrays.sort() metodu Dual-Pivot Quick Sort istifadə edir:

```java
import java.util.Arrays;

public class JavaBuiltInSort {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Java built-in sort:");
        System.out.println("Əvvəl: " + Arrays.toString(arr));
        
        Arrays.sort(arr); // Dual-Pivot Quick Sort
        
        System.out.println("Sonra: " + Arrays.toString(arr));
        
        // Partial sorting
        int[] arr2 = {64, 34, 25, 12, 22, 11, 90};
        Arrays.sort(arr2, 1, 5); // Index 1-dən 5-ə qədər sırala
        System.out.println("Partial sort: " + Arrays.toString(arr2));
    }
}
```

## Mürəkkəblik Analizi

### Time Complexity
- **Best Case**: O(n log n) - Pivot həmişə massivi bərabər iki hissəyə bölür
- **Average Case**: O(n log n) - Pivot ortalama olaraq yaxşı seçilir
- **Worst Case**: O(n²) - Pivot həmişə ən kiçik və ya ən böyük elementdir

### Space Complexity
- **Best/Average Case**: O(log n) - Rekursiya stack-i üçün
- **Worst Case**: O(n) - Unbalanced partitioning zamanı

## Pivot Seçim Strategiyaları

1. **İlk element**: Sadə, lakin sorted array-lər üçün worst case
2. **Son element**: Ən çox istifadə olunan
3. **Orta element**: Median-of-three kimi strategiyalar
4. **Random element**: Worst case ehtimalını azaldır
5. **Median-of-three**: İlk, orta və son elementlərin medianı

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
1. **Sürətli**: Ortalama halda ən sürətli sıralama alqoritmlərindən biri
2. **In-place**: Əlavə yaddaş tələb etmir (O(log n) stack space istisna olmaqla)
3. **Cache-friendly**: Locality of reference yaxşıdır
4. **Praktiki**: Real dünyada geniş istifadə olunur

### Çatışmazlıqlar
1. **Worst case**: O(n²) time complexity
2. **Unstable**: Eyni dəyərli elementlərin sırası dəyişə bilər
3. **Rekursiya**: Stack overflow riski (çox dərin rekursiya)
4. **Pivot dependency**: Pivot seçimi performansa təsir edir

## Real Dünya Tətbiqləri

1. **Java Arrays.sort()**: Primitive types üçün Dual-Pivot Quick Sort
2. **C++ std::sort()**: Introsort (Quick Sort + Heap Sort hibrid)
3. **Database sistemləri**: Böyük data setlərinin sıralanması
4. **Operating sistemlər**: Process scheduling
5. **Axtarış mühərrikləri**: Search result ranking

## LeetCode Problemləri

1. **[Sort an Array (912)](https://leetcode.com/problems/sort-an-array/)** - Quick Sort implementasiyası
2. **[Kth Largest Element in an Array (215)](https://leetcode.com/problems/kth-largest-element-in-an-array/)** - Quick Select alqoritmi
3. **[Sort Colors (75)](https://leetcode.com/problems/sort-colors/)** - 3-way partitioning
4. **[Wiggle Sort II (324)](https://leetcode.com/problems/wiggle-sort-ii/)** - Quick Select + partitioning
5. **[Top K Frequent Elements (347)](https://leetcode.com/problems/top-k-frequent-elements/)** - Quick Select variation

## Müsahibə Sualları

### 1. Quick Sort-un average case time complexity-si nədir və niyə?
**Cavab**: O(n log n) - çünki ortalama halda pivot massivi təxminən bərabər iki hissəyə bölür, bu da log n dərinlik verir və hər səviyyədə O(n) iş görülür.

### 2. Quick Sort-un worst case nə vaxt baş verir?
**Cavab**: Pivot həmişə ən kiçik və ya ən böyük element seçildikdə. Bu halda partitioning unbalanced olur və O(n²) time complexity yaranır.

### 3. Quick Sort-u necə optimizasiya etmək olar?
**Cavab**: Random pivot seçimi, median-of-three, 3-way partitioning (duplicate elements üçün), tail recursion optimization, kiçik massivlər üçün insertion sort.

### 4. Quick Sort stable alqoritmdir?
**Cavab**: Xeyr, çünki partitioning zamanı eyni dəyərli elementlərin nisbi sırası dəyişə bilər.

### 5. Quick Sort vs Merge Sort - hansını seçmək lazımdır?
**Cavab**: Quick Sort ortalama halda daha sürətli və daha az yaddaş istifadə edir. Merge Sort həmişə O(n log n) və stable-dir. Worst case performance vacibdirsə Merge Sort, ortalama performance vacibdirsə Quick Sort.

### 6. Quick Select nədir?
**Cavab**: Quick Sort-un modifikasiyası olan Quick Select k-th smallest elementi tapmaq üçün istifadə olunur və O(n) average time complexity-ə malikdir.

### 7. 3-way partitioning nə vaxt faydalıdır?
**Cavab**: Çoxlu duplicate elementlər olduqda. Bu halda eyni dəyərli elementlər bir yerdə qruplaşdırılır və onlar üçün rekursiya çağırılmır.

## Nəticə

Quick Sort praktikada ən çox istifadə olunan sıralama alqoritmlərindən biridir. Ortalama halda excellent performance və in-place xüsusiyyəti onu çox cəlbedici edir. Worst case-dən qorunmaq üçün randomization və ya hybrid approach-lar istifadə edilə bilər. Modern programming language-lərdə built-in sort metodları əsasən Quick Sort-un optimizasiya edilmiş versiyalarını istifadə edir.