---
title: Binary Search
description: Binary Search alqoritminin ətraflı izahı və Java implementasiyası
slug: binary-search
tags: [alqoritmlər, axtarış, binary-search, java, divide-conquer]
keywords: [binary search, ikili axtarış, search algorithm, java, sorted array]
hide_table_of_contents: false
---

# Binary Search

## Giriş

Binary Search (İkili Axtarış), sıralanmış massivlərdə elementi tapmaq üçün istifadə olunan çox effektiv axtarış alqoritmdir. Bu alqoritm "Divide and Conquer" (Böl və Hökm et) strategiyasından istifadə edərək O(log n) time complexity-ə malikdir.

## Alqoritmin İşləmə Prinsipi

1. **Orta elementi tap**: Massivdə orta elementi müəyyən et
2. **Müqayisə et**: Axtarılan elementi orta elementlə müqayisə et
3. **Sahəni daralt**: 
   - Əgər axtarılan element orta elementdən kiçikdirsə, sol yarını seç
   - Əgər böyükdürsə, sağ yarını seç
   - Əgər bərabərdirsə, element tapılıb
4. **Təkrarla**: Seçilmiş yarıda eyni prosesi təkrarla
5. **Dayanma şərti**: Element tapılana və ya axtarış sahəsi boş olana qədər

## Vizual Nümunə

```
Massiv: [11, 12, 22, 25, 34, 64, 90]
Axtarılan element: 25

Addım 1: [11, 12, 22, 25, 34, 64, 90]
         left=0, right=6, mid=3
         arr[3] = 25 = target ✓ TAPILDI!

Başqa nümunə - Axtarılan element: 22

Addım 1: [11, 12, 22, 25, 34, 64, 90]
         left=0, right=6, mid=3
         arr[3] = 25 > 22, sağa get

Addım 2: [11, 12, 22] 25, 34, 64, 90
         left=0, right=2, mid=1
         arr[1] = 12 < 22, sola get

Addım 3: [11, 12] 22
         left=2, right=2, mid=2
         arr[2] = 22 = target ✓ TAPILDI!
```

## Java İmplementasiyası

### İteratif Binary Search

```java
public class BinarySearch {
    
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2; // Overflow-dan qorunmaq üçün
            
            if (arr[mid] == target) {
                return mid; // Element tapıldı
            } else if (arr[mid] < target) {
                left = mid + 1; // Sağ yarıda axtarmaq
            } else {
                right = mid - 1; // Sol yarıda axtarmaq
            }
        }
        
        return -1; // Element tapılmadı
    }
    
    public static void main(String[] args) {
        int[] arr = {11, 12, 22, 25, 34, 64, 90};
        int target = 25;
        
        int result = binarySearch(arr, target);
        
        if (result != -1) {
            System.out.println("Element " + target + " indeks " + result + "-də tapıldı");
        } else {
            System.out.println("Element " + target + " tapılmadı");
        }
    }
}
```

### Rekursiv Binary Search

```java
public class RecursiveBinarySearch {
    
    public static int binarySearch(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1; // Element tapılmadı
        }
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Element tapıldı
        } else if (arr[mid] < target) {
            return binarySearch(arr, target, mid + 1, right); // Sağ yarıda axtarmaq
        } else {
            return binarySearch(arr, target, left, mid - 1); // Sol yarıda axtarmaq
        }
    }
    
    public static int binarySearch(int[] arr, int target) {
        return binarySearch(arr, target, 0, arr.length - 1);
    }
    
    public static void main(String[] args) {
        int[] arr = {11, 12, 22, 25, 34, 64, 90};
        int target = 22;
        
        int result = binarySearch(arr, target);
        
        if (result != -1) {
            System.out.println("Element " + target + " indeks " + result + "-də tapıldı");
        } else {
            System.out.println("Element " + target + " tapılmadı");
        }
    }
}
```

### Generic Binary Search

```java
import java.util.Comparator;

public class GenericBinarySearch {
    
    public static <T> int binarySearch(T[] arr, T target, Comparator<T> comparator) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int comparison = comparator.compare(arr[mid], target);
            
            if (comparison == 0) {
                return mid; // Element tapıldı
            } else if (comparison < 0) {
                left = mid + 1; // Sağ yarıda axtarmaq
            } else {
                right = mid - 1; // Sol yarıda axtarmaq
            }
        }
        
        return -1; // Element tapılmadı
    }
    
    public static void main(String[] args) {
        // Integer array
        Integer[] intArr = {11, 12, 22, 25, 34, 64, 90};
        int intResult = binarySearch(intArr, 25, Integer::compareTo);
        System.out.println("Integer 25 tapıldı: " + (intResult != -1));
        
        // String array
        String[] strArr = {"apple", "banana", "cherry", "date", "elderberry"};
        int strResult = binarySearch(strArr, "cherry", String::compareTo);
        System.out.println("String 'cherry' tapıldı: " + (strResult != -1));
        
        // Custom object
        Person[] people = {
            new Person("Ali", 25),
            new Person("Ayşe", 30),
            new Person("Mehmet", 35)
        };
        
        int personResult = binarySearch(people, new Person("Ayşe", 30), 
            Comparator.comparing(Person::getName));
        System.out.println("Person 'Ayşe' tapıldı: " + (personResult != -1));
    }
    
    static class Person {
        private String name;
        private int age;
        
        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        public String getName() { return name; }
        public int getAge() { return age; }
    }
}
```

### Binary Search Variations

```java
public class BinarySearchVariations {
    
    // İlk occurrence-ı tapmaq
    public static int findFirst(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                result = mid;
                right = mid - 1; // Sol tərəfdə davam et
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    // Son occurrence-ı tapmaq
    public static int findLast(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                result = mid;
                left = mid + 1; // Sağ tərəfdə davam et
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    // Insertion point tapmaq
    public static int findInsertionPoint(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return left;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 2, 2, 3, 4, 5};
        int target = 2;
        
        System.out.println("İlk 2-nin indeksi: " + findFirst(arr, target));
        System.out.println("Son 2-nin indeksi: " + findLast(arr, target));
        System.out.println("6-nın insertion point-i: " + findInsertionPoint(arr, 6));
    }
}
```

## Java Built-in Binary Search

Java-da Arrays.binarySearch() və Collections.binarySearch() metodları mövcuddur:

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class JavaBuiltInBinarySearch {
    public static void main(String[] args) {
        // Array binary search
        int[] arr = {11, 12, 22, 25, 34, 64, 90};
        int index = Arrays.binarySearch(arr, 25);
        System.out.println("25-in indeksi: " + index);
        
        // Partial array search
        int partialIndex = Arrays.binarySearch(arr, 1, 5, 22);
        System.out.println("22-nin indeksi (1-5 aralığında): " + partialIndex);
        
        // List binary search
        List<Integer> list = Arrays.asList(11, 12, 22, 25, 34, 64, 90);
        int listIndex = Collections.binarySearch(list, 34);
        System.out.println("34-ün indeksi list-də: " + listIndex);
        
        // Element tapılmadıqda
        int notFound = Arrays.binarySearch(arr, 50);
        System.out.println("50 tapılmadı, insertion point: " + (-notFound - 1));
        
        // Custom comparator
        String[] words = {"apple", "banana", "cherry", "date"};
        int wordIndex = Arrays.binarySearch(words, "cherry", String::compareTo);
        System.out.println("'cherry'-nin indeksi: " + wordIndex);
    }
}
```

## Mürəkkəblik Analizi

### Time Complexity
- **Best Case**: O(1) - Element massivdə ortadadır
- **Average Case**: O(log n) - Hər addımda axtarış sahəsi yarıya bölünür
- **Worst Case**: O(log n) - Element massivdə yoxdur və ya ən kənardadır

### Space Complexity
- **İteratif versiya**: O(1) - Sabit sayda dəyişən istifadə edir
- **Rekursiv versiya**: O(log n) - Rekursiya stack-i üçün

## Şərtlər və Məhdudiyyətlər

### Şərtlər
1. **Sıralanmış massiv**: Massiv mütləq sıralanmış olmalıdır
2. **Random access**: Elementlərə O(1) zamanda giriş olmalıdır (array, ArrayList)

### Məhdudiyyətlər
1. **Linked List**: Linked list-də effektiv deyil (O(n) access time)
2. **Dynamic data**: Tez-tez dəyişən data üçün uyğun deyil
3. **Small datasets**: Çox kiçik massivlər üçün linear search daha sürətli ola bilər

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
1. **Sürətli**: O(log n) time complexity
2. **Effektiv**: Böyük data setləri üçün ideal
3. **Sadə**: Anlaşılması və implementasiyası asan
4. **Yaddaş effektiv**: O(1) space complexity (iterative)

### Çatışmazlıqlar
1. **Sıralama tələbi**: Massiv əvvəlcədən sıralanmış olmalıdır
2. **Static data**: Dynamic data üçün uyğun deyil
3. **Random access tələbi**: Linked structures üçün effektiv deyil

## Real Dünya Tətbiqləri

1. **Database Indexing**: B-tree strukturlarında
2. **Library Systems**: Kitab və məqalə axtarışı
3. **Dictionary/Phone Books**: Alfabetik axtarış
4. **Version Control**: Git-də commit history axtarışı
5. **Game Development**: Leaderboard və score axtarışı
6. **Financial Systems**: Price lookup və trading

## LeetCode Problemləri

1. **[Binary Search (704)](https://leetcode.com/problems/binary-search/)** - Klassik binary search
2. **[Search Insert Position (35)](https://leetcode.com/problems/search-insert-position/)** - Insertion point tapmaq
3. **[Find First and Last Position (34)](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)** - Range axtarışı
4. **[Search in Rotated Sorted Array (33)](https://leetcode.com/problems/search-in-rotated-sorted-array/)** - Modified binary search
5. **[Find Peak Element (162)](https://leetcode.com/problems/find-peak-element/)** - Peak finding
6. **[Search a 2D Matrix (74)](https://leetcode.com/problems/search-a-2d-matrix/)** - 2D binary search
7. **[Sqrt(x) (69)](https://leetcode.com/problems/sqrtx/)** - Square root hesablamaq

## Müsahibə Sualları

### 1. Binary Search-un time complexity-si nədir və niyə?
**Cavab**: O(log n) - çünki hər addımda axtarış sahəsi yarıya bölünür. n elementli massivdə maksimum log₂(n) addım lazımdır.

### 2. Binary Search-un şərti nədir?
**Cavab**: Massiv mütləq sıralanmış olmalıdır. Əks halda alqoritm düzgün işləməz.

### 3. `mid = (left + right) / 2` əvəzinə `mid = left + (right - left) / 2` niyə istifadə edirik?
**Cavab**: Integer overflow-dan qorunmaq üçün. left və right böyük olduqda onların cəmi integer limit-ini aşa bilər.

### 4. Binary Search rekursiv və ya iterativ hansı versiyası daha yaxşıdır?
**Cavab**: İteratif versiya daha yaxşıdır çünki O(1) space complexity-ə malikdir və stack overflow riski yoxdur.

### 5. Binary Search-da element tapılmadıqda nə qaytarılır?
**Cavab**: Adətən -1 qaytarılır. Java-nın Arrays.binarySearch() metodunda -(insertion_point + 1) qaytarılır.

### 6. Duplicate elementlər olan massivdə binary search necə işləyir?
**Cavab**: Standart binary search duplicate-lardan birini tapır. İlk və ya son occurrence tapmaq üçün modifikasiya lazımdır.

### 7. Binary Search-u linked list-də istifadə etmək olarmı?
**Cavab**: Texniki olaraq olar, lakin effektiv deyil. Linked list-də middle element tapmaq O(n) vaxt alır.

### 8. Binary Search-un worst case nə vaxt baş verir?
**Cavab**: Element massivdə yoxdur və ya ən kənarda yerləşir. Bu halda bütün log n addımları atılmalıdır.

## Nəticə

Binary Search, sıralanmış data-da axtarış üçün ən effektiv alqoritmlərindən biridir. O(log n) time complexity-si onu böyük data setləri üçün ideal edir. Alqoritmin sadəliyi və effektivliyi onu proqramçıların bilməli olduğu fundamental alqoritmlər sırasına qoyur. Modern sistemlərdə database indexing-dən tutmuş search engine-lərə qədər geniş istifadə sahəsi var.