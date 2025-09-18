---
draft: true
title: Java Collections Framework
description: Java Collections Framework-un ətraflı izahı və istifadə nümunələri
slug: java-collections
tags: [java, collections, data-structures]
keywords: [java collections, list, set, map, queue, arraylist, hashmap, linkedlist]
hide_table_of_contents: false
---

# Java Collections Framework


Java Collections Framework (JCF), Java-da data strukturlarını və onlar üzərində əməliyyatları təmin edən bir API-dır. Bu framework, proqramçılara müxtəlif növ kolleksiyaları (məsələn, list, set, map, queue) idarə etmək üçün standart interfeys və implementasiyalar təqdim edir.

Collections Framework, Java 1.2-də təqdim edilmişdir və Java-nın ən çox istifadə olunan komponentlərindən biridir. Bu framework, data strukturlarının effektiv və təhlükəsiz istifadəsini təmin edir və kod təkrarını azaldır.

## Collections Framework Hierarchiyası

Java Collections Framework, aşağıdakı əsas interfeyslər üzərində qurulmuşdur:

1. **Collection**: Bütün kolleksiya tiplərinin əsas interfeysidir
   - **List**: Sıralı kolleksiya, dublikat elementlərə icazə verir
   - **Set**: Unikal elementlər kolleksiyası, dublikat elementlərə icazə vermir
   - **Queue**: FIFO (First-In-First-Out) prinsipi ilə işləyən kolleksiya
   - **Deque**: Double-ended queue, hər iki tərəfdən elementlərin əlavə edilməsi və silinməsinə icazə verir

2. **Map**: Key-value cütlüklərini saxlayan kolleksiya, Collection interfeysinə daxil deyil

## List Interface

List interface-i, sıralı kolleksiyaları təmsil edir və dublikat elementlərə icazə verir. Elementlərə indeks vasitəsilə çatmaq mümkündür.

### ArrayList

ArrayList, dinamik array əsasında List interface-nin implementasiyasıdır. Elementlərə random access təmin edir və ölçüsü dinamik olaraq dəyişir.


<details>
<summary>Koda bax</summary>

```java
import java.util.ArrayList;
import java.util.List;

public class ArrayListExample {
    public static void main(String[] args) {
        // ArrayList yaratmaq
        List<String> fruits = new ArrayList<>();
        
        // Elementlər əlavə etmək
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Mango");
        
        // ArrayList-i çap etmək
        System.out.println("Fruits: " + fruits);
        
        // İndeks vasitəsilə elementin əldə edilməsi
        String secondFruit = fruits.get(1);
        System.out.println("Second fruit: " + secondFruit);
        
        // İndeks vasitəsilə elementin dəyişdirilməsi
        fruits.set(1, "Grape");
        System.out.println("After replacing: " + fruits);
        
        // İndeks vasitəsilə elementin silinməsi
        fruits.remove(2);
        System.out.println("After removing: " + fruits);
        
        // Kolleksiyanın ölçüsü
        System.out.println("Size: " + fruits.size());
        
        // Elementin axtarılması
        boolean containsApple = fruits.contains("Apple");
        System.out.println("Contains Apple? " + containsApple);
        
        // Kolleksiyanın təmizlənməsi
        fruits.clear();
        System.out.println("After clearing: " + fruits);
    }
}
```
</details>

### LinkedList

LinkedList, ikitərəfli əlaqəli list əsasında List və Deque interface-lərinin implementasiyasıdır. Elementlərin əlavə edilməsi və silinməsi əməliyyatları üçün effektivdir.


<details>
<summary>Koda bax</summary>

```java
import java.util.LinkedList;
import java.util.List;

public class LinkedListExample {
    public static void main(String[] args) {
        // LinkedList yaratmaq
        LinkedList<String> languages = new LinkedList<>();
        
        // Elementlər əlavə etmək
        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");
        
        // Əvvələ və sona elementlər əlavə etmək
        languages.addFirst("C++");
        languages.addLast("Ruby");
        
        System.out.println("Languages: " + languages);
        
        // İlk və son elementləri əldə etmək
        String first = languages.getFirst();
        String last = languages.getLast();
        
        System.out.println("First: " + first);
        System.out.println("Last: " + last);
        
        // İlk və son elementləri silmək
        languages.removeFirst();
        languages.removeLast();
        
        System.out.println("After removing first and last: " + languages);
        
        // LinkedList-i stack kimi istifadə etmək
        languages.push("Kotlin");  // Əvvələ əlavə edir
        System.out.println("After push: " + languages);
        
        String popped = languages.pop();  // Əvvəldən silir və qaytarır
        System.out.println("Popped: " + popped);
        System.out.println("After pop: " + languages);
    }
}
```
</details>

## Set Interface

Set interface-i, unikal elementlər kolleksiyasını təmsil edir və dublikat elementlərə icazə vermir.

### HashSet

HashSet, hash table əsasında Set interface-nin implementasiyasıdır. Elementlərin sırası təmin edilmir, lakin əməliyyatlar O(1) zamanda yerinə yetirilir.


<details>
<summary>Koda bax</summary>

```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        // HashSet yaratmaq
        Set<String> colors = new HashSet<>();
        
        // Elementlər əlavə etmək
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        colors.add("Red");  // Dublikat, əlavə edilməyəcək
        
        System.out.println("Colors: " + colors);
        
        // Elementin axtarılması
        boolean containsGreen = colors.contains("Green");
        System.out.println("Contains Green? " + containsGreen);
        
        // Elementin silinməsi
        colors.remove("Blue");
        System.out.println("After removing Blue: " + colors);
        
        // Kolleksiyanın ölçüsü
        System.out.println("Size: " + colors.size());
        
        // Set-lər üzərində əməliyyatlar
        Set<String> moreColors = new HashSet<>();
        moreColors.add("Yellow");
        moreColors.add("Green");
        
        // Birləşmə
        Set<String> union = new HashSet<>(colors);
        union.addAll(moreColors);
        System.out.println("Union: " + union);
        
        // Kəsişmə
        Set<String> intersection = new HashSet<>(colors);
        intersection.retainAll(moreColors);
        System.out.println("Intersection: " + intersection);
        
        // Fərq
        Set<String> difference = new HashSet<>(colors);
        difference.removeAll(moreColors);
        System.out.println("Difference: " + difference);
    }
}
```
</details>

### TreeSet

TreeSet, red-black tree əsasında NavigableSet interface-nin implementasiyasıdır. Elementlər təbii sıra ilə və ya verilmiş comparator-a əsasən sıralanır.


<details>
<summary>Koda bax</summary>

```java
import java.util.TreeSet;
import java.util.Set;
import java.util.NavigableSet;

public class TreeSetExample {
    public static void main(String[] args) {
        // TreeSet yaratmaq
        NavigableSet<Integer> numbers = new TreeSet<>();
        
        // Elementlər əlavə etmək
        numbers.add(10);
        numbers.add(5);
        numbers.add(15);
        numbers.add(20);
        numbers.add(3);
        
        // TreeSet avtomatik olaraq elementləri sıralayır
        System.out.println("Sorted numbers: " + numbers);
        
        // NavigableSet metodları
        System.out.println("First: " + numbers.first());
        System.out.println("Last: " + numbers.last());
        
        System.out.println("Lower than 10: " + numbers.lower(10));  // 10-dan kiçik ən böyük element
        System.out.println("Floor of 10: " + numbers.floor(10));    // 10-a bərabər və ya kiçik ən böyük element
        System.out.println("Higher than 10: " + numbers.higher(10)); // 10-dan böyük ən kiçik element
        System.out.println("Ceiling of 10: " + numbers.ceiling(10)); // 10-a bərabər və ya böyük ən kiçik element
        
        // Subset əldə etmək
        Set<Integer> subset = numbers.subSet(5, 15);
        System.out.println("Subset [5, 15): " + subset);
        
        // Tərsinə sıralanmış set
        NavigableSet<Integer> descendingSet = numbers.descendingSet();
        System.out.println("Descending set: " + descendingSet);
    }
}
```
</details>

### LinkedHashSet

LinkedHashSet, hash table və linked list əsasında Set interface-nin implementasiyasıdır. Elementlərin əlavə edilmə sırasını saxlayır.


<details>
<summary>Koda bax</summary>

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetExample {
    public static void main(String[] args) {
        // LinkedHashSet yaratmaq
        Set<String> countries = new LinkedHashSet<>();
        
        // Elementlər əlavə etmək
        countries.add("USA");
        countries.add("Canada");
        countries.add("UK");
        countries.add("Germany");
        countries.add("France");
        
        // LinkedHashSet elementlərin əlavə edilmə sırasını saxlayır
        System.out.println("Countries: " + countries);
        
        // Elementin silinməsi
        countries.remove("UK");
        System.out.println("After removing UK: " + countries);
        
        // Yenidən əlavə etmək - sıranın sonuna əlavə olunur
        countries.add("UK");
        System.out.println("After adding UK again: " + countries);
    }
}
```
</details>

## Map Interface

Map interface-i, key-value cütlüklərini saxlayan kolleksiyanı təmsil edir. Hər bir key unikaldır.

### HashMap

HashMap, hash table əsasında Map interface-nin implementasiyasıdır. Key-value cütlüklərinin sırası təmin edilmir, lakin əməliyyatlar O(1) zamanda yerinə yetirilir.


<details>
<summary>Koda bax</summary>

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        // HashMap yaratmaq
        Map<String, Integer> ages = new HashMap<>();
        
        // Key-value cütlükləri əlavə etmək
        ages.put("John", 25);
        ages.put("Alice", 30);
        ages.put("Bob", 35);
        ages.put("Mary", 28);
        
        System.out.println("Ages: " + ages);
        
        // Key vasitəsilə value əldə etmək
        int aliceAge = ages.get("Alice");
        System.out.println("Alice's age: " + aliceAge);
        
        // Key mövcud deyilsə, default value qaytarmaq
        int tomAge = ages.getOrDefault("Tom", 0);
        System.out.println("Tom's age: " + tomAge);
        
        // Key-in mövcudluğunu yoxlamaq
        boolean containsJohn = ages.containsKey("John");
        System.out.println("Contains John? " + containsJohn);
        
        // Value-nun mövcudluğunu yoxlamaq
        boolean containsAge30 = ages.containsValue(30);
        System.out.println("Contains age 30? " + containsAge30);
        
        // Key-value cütlüyünü dəyişdirmək
        ages.put("Alice", 31);
        System.out.println("After updating Alice's age: " + ages);
        
        // Key-value cütlüyünü silmək
        ages.remove("Bob");
        System.out.println("After removing Bob: " + ages);
        
        // Bütün key-ləri əldə etmək
        System.out.println("Keys: " + ages.keySet());
        
        // Bütün value-ları əldə etmək
        System.out.println("Values: " + ages.values());
        
        // Bütün key-value cütlüklərini əldə etmək
        System.out.println("Entries: " + ages.entrySet());
        
        // Map üzərində iterasiya
        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.println(entry.getKey() + " is " + entry.getValue() + " years old");
        }
    }
}
```
</details>

### TreeMap

TreeMap, red-black tree əsasında NavigableMap interface-nin implementasiyasıdır. Key-value cütlükləri key-lərin təbii sırası ilə və ya verilmiş comparator-a əsasən sıralanır.


<details>
<summary>Koda bax</summary>

```java
import java.util.TreeMap;
import java.util.Map;
import java.util.NavigableMap;

public class TreeMapExample {
    public static void main(String[] args) {
        // TreeMap yaratmaq
        NavigableMap<String, Double> grades = new TreeMap<>();
        
        // Key-value cütlükləri əlavə etmək
        grades.put("John", 85.5);
        grades.put("Alice", 92.3);
        grades.put("Bob", 78.9);
        grades.put("Mary", 96.7);
        grades.put("David", 88.2);
        
        // TreeMap key-ləri avtomatik olaraq sıralayır
        System.out.println("Sorted grades: " + grades);
        
        // NavigableMap metodları
        System.out.println("First entry: " + grades.firstEntry());
        System.out.println("Last entry: " + grades.lastEntry());
        
        System.out.println("Lower entry than Bob: " + grades.lowerEntry("Bob"));
        System.out.println("Floor entry of Bob: " + grades.floorEntry("Bob"));
        System.out.println("Higher entry than Bob: " + grades.higherEntry("Bob"));
        System.out.println("Ceiling entry of Bob: " + grades.ceilingEntry("Bob"));
        
        // Submap əldə etmək
        Map<String, Double> subMap = grades.subMap("Alice", "Mary");
        System.out.println("Submap [Alice, Mary): " + subMap);
        
        // Tərsinə sıralanmış map
        NavigableMap<String, Double> descendingMap = grades.descendingMap();
        System.out.println("Descending map: " + descendingMap);
    }
}
```
</details>

### LinkedHashMap

LinkedHashMap, hash table və linked list əsasında Map interface-nin implementasiyasıdır. Key-value cütlüklərinin əlavə edilmə sırasını və ya istifadə sırasını saxlayır.


<details>
<summary>Koda bax</summary>

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapExample {
    public static void main(String[] args) {
        // LinkedHashMap yaratmaq (əlavə edilmə sırasını saxlayır)
        Map<String, String> capitals = new LinkedHashMap<>();
        
        // Key-value cütlükləri əlavə etmək
        capitals.put("USA", "Washington D.C.");
        capitals.put("UK", "London");
        capitals.put("France", "Paris");
        capitals.put("Germany", "Berlin");
        capitals.put("Japan", "Tokyo");
        
        // LinkedHashMap key-value cütlüklərinin əlavə edilmə sırasını saxlayır
        System.out.println("Capitals: " + capitals);
        
        // LRU (Least Recently Used) cache yaratmaq
        // true parametri access-order-i aktivləşdirir
        Map<String, String> lruCache = new LinkedHashMap<>(16, 0.75f, true);
        
        lruCache.put("1", "One");
        lruCache.put("2", "Two");
        lruCache.put("3", "Three");
        lruCache.put("4", "Four");
        
        System.out.println("Initial cache: " + lruCache);
        
        // "2" key-inə müraciət etmək - ən son istifadə edilən element olur
        lruCache.get("2");
        System.out.println("After accessing '2': " + lruCache);
        
        // "1" key-inə müraciət etmək - ən son istifadə edilən element olur
        lruCache.get("1");
        System.out.println("After accessing '1': " + lruCache);
        
        // Yeni element əlavə etmək
        lruCache.put("5", "Five");
        System.out.println("After adding '5': " + lruCache);
    }
}
```
</details>

## Queue Interface

Queue interface-i, FIFO (First-In-First-Out) prinsipi ilə işləyən kolleksiyanı təmsil edir.

### LinkedList as Queue

LinkedList, Queue interface-ni implement edir və queue kimi istifadə edilə bilər.


<details>
<summary>Koda bax</summary>

```java
import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        // Queue yaratmaq
        Queue<String> queue = new LinkedList<>();
        
        // Elementlər əlavə etmək
        queue.offer("First");
        queue.offer("Second");
        queue.offer("Third");
        
        System.out.println("Queue: " + queue);
        
        // Növbəti elementi əldə etmək (silmədən)
        String head = queue.peek();
        System.out.println("Head element: " + head);
        
        // Elementi silmək və qaytarmaq
        String removed = queue.poll();
        System.out.println("Removed element: " + removed);
        System.out.println("Queue after poll: " + queue);
        
        // Queue-nun ölçüsü
        System.out.println("Size: " + queue.size());
        
        // Queue-nun boş olub-olmadığını yoxlamaq
        boolean isEmpty = queue.isEmpty();
        System.out.println("Is empty? " + isEmpty);
    }
}
```
</details>

### PriorityQueue

PriorityQueue, priority heap əsasında Queue interface-nin implementasiyasıdır. Elementlər təbii sıra ilə və ya verilmiş comparator-a əsasən sıralanır.


<details>
<summary>Koda bax</summary>

```java
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.Comparator;

public class PriorityQueueExample {
    public static void main(String[] args) {
        // Təbii sıra ilə PriorityQueue yaratmaq
        Queue<Integer> minHeap = new PriorityQueue<>();
        
        // Elementlər əlavə etmək
        minHeap.offer(10);
        minHeap.offer(5);
        minHeap.offer(15);
        minHeap.offer(3);
        
        System.out.println("Min Heap: " + minHeap);
        
        // Ən kiçik elementi əldə etmək
        int min = minHeap.peek();
        System.out.println("Min element: " + min);
        
        // Elementləri növbə ilə silmək
        System.out.println("Polling elements:");
        while (!minHeap.isEmpty()) {
            System.out.println(minHeap.poll());
        }
        
        // Tərsinə sıra ilə PriorityQueue yaratmaq (max heap)
        Queue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
        
        maxHeap.offer(10);
        maxHeap.offer(5);
        maxHeap.offer(15);
        maxHeap.offer(3);
        
        System.out.println("Max Heap: " + maxHeap);
        
        // Ən böyük elementi əldə etmək
        int max = maxHeap.peek();
        System.out.println("Max element: " + max);
        
        // Elementləri növbə ilə silmək
        System.out.println("Polling elements:");
        while (!maxHeap.isEmpty()) {
            System.out.println(maxHeap.poll());
        }
    }
}
```
</details>

## Deque Interface

Deque (Double-ended Queue) interface-i, hər iki tərəfdən elementlərin əlavə edilməsi və silinməsinə icazə verən kolleksiyanı təmsil edir.

### ArrayDeque

ArrayDeque, resizable array əsasında Deque interface-nin implementasiyasıdır. Stack və queue kimi istifadə edilə bilər.


<details>
<summary>Koda bax</summary>

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class ArrayDequeExample {
    public static void main(String[] args) {
        // ArrayDeque yaratmaq
        Deque<String> deque = new ArrayDeque<>();
        
        // Əvvələ və sona elementlər əlavə etmək
        deque.offerFirst("First");
        deque.offerLast("Last");
        deque.offerFirst("New First");
        deque.offerLast("New Last");
        
        System.out.println("Deque: " + deque);
        
        // İlk və son elementləri əldə etmək
        String first = deque.peekFirst();
        String last = deque.peekLast();
        
        System.out.println("First element: " + first);
        System.out.println("Last element: " + last);
        
        // İlk və son elementləri silmək
        String removedFirst = deque.pollFirst();
        String removedLast = deque.pollLast();
        
        System.out.println("Removed first: " + removedFirst);
        System.out.println("Removed last: " + removedLast);
        System.out.println("Deque after polling: " + deque);
        
        // Stack kimi istifadə etmək
        Deque<Integer> stack = new ArrayDeque<>();
        
        stack.push(1);  // Əvvələ əlavə edir
        stack.push(2);
        stack.push(3);
        
        System.out.println("Stack: " + stack);
        
        int top = stack.pop();  // Əvvəldən silir və qaytarır
        System.out.println("Popped: " + top);
        System.out.println("Stack after pop: " + stack);
        
        // Queue kimi istifadə etmək
        Deque<Integer> queue = new ArrayDeque<>();
        
        queue.offer(1);  // Sona əlavə edir
        queue.offer(2);
        queue.offer(3);
        
        System.out.println("Queue: " + queue);
        
        int head = queue.poll();  // Əvvəldən silir və qaytarır
        System.out.println("Polled: " + head);
        System.out.println("Queue after poll: " + queue);
    }
}
```
</details>

## Utility Classes

Java Collections Framework, kolleksiyalar üzərində əməliyyatlar üçün bir sıra utility class-lar təqdim edir.

### Collections

Collections class-ı, kolleksiyalar üzərində statik metodlar təqdim edir.


<details>
<summary>Koda bax</summary>

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Comparator;

public class CollectionsExample {
    public static void main(String[] args) {
        // List yaratmaq
        List<Integer> numbers = new ArrayList<>();
        numbers.add(5);
        numbers.add(2);
        numbers.add(8);
        numbers.add(1);
        numbers.add(9);
        
        System.out.println("Original list: " + numbers);
        
        // Sıralamaq
        Collections.sort(numbers);
        System.out.println("Sorted list: " + numbers);
        
        // Tərsinə sıralamaq
        Collections.reverse(numbers);
        System.out.println("Reversed list: " + numbers);
        
        // Qarışdırmaq
        Collections.shuffle(numbers);
        System.out.println("Shuffled list: " + numbers);
        
        // Minimum və maximum elementlər
        int min = Collections.min(numbers);
        int max = Collections.max(numbers);
        
        System.out.println("Min: " + min);
        System.out.println("Max: " + max);
        
        // Binar axtarış (əvvəlcə sıralamaq lazımdır)
        Collections.sort(numbers);
        int index = Collections.binarySearch(numbers, 5);
        System.out.println("Index of 5: " + index);
        
        // Frequency
        List<String> words = new ArrayList<>();
        words.add("apple");
        words.add("banana");
        words.add("apple");
        words.add("orange");
        words.add("apple");
        
        int frequency = Collections.frequency(words, "apple");
        System.out.println("Frequency of 'apple': " + frequency);
        
        // Dəyişilməz kolleksiya
        List<String> immutableList = Collections.unmodifiableList(words);
        System.out.println("Immutable list: " + immutableList);
        
        // Sinxronizasiya edilmiş kolleksiya
        List<String> syncList = Collections.synchronizedList(words);
        System.out.println("Synchronized list: " + syncList);
    }
}
```
</details>

### Arrays

Arrays class-ı, array-lər üzərində statik metodlar təqdim edir.


<details>
<summary>Koda bax</summary>

```java
import java.util.Arrays;
import java.util.List;

public class ArraysExample {
    public static void main(String[] args) {
        // Array yaratmaq
        int[] numbers = {5, 2, 8, 1, 9};
        
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        // Sıralamaq
        Arrays.sort(numbers);
        System.out.println("Sorted array: " + Arrays.toString(numbers));
        
        // Binar axtarış
        int index = Arrays.binarySearch(numbers, 5);
        System.out.println("Index of 5: " + index);
        
        // Fill
        int[] filledArray = new int[5];
        Arrays.fill(filledArray, 10);
        System.out.println("Filled array: " + Arrays.toString(filledArray));
        
        // Copy
        int[] copy = Arrays.copyOf(numbers, numbers.length);
        System.out.println("Copied array: " + Arrays.toString(copy));
        
        // CopyOfRange
        int[] subArray = Arrays.copyOfRange(numbers, 1, 4);
        System.out.println("Sub array: " + Arrays.toString(subArray));
        
        // Equals
        boolean isEqual = Arrays.equals(numbers, copy);
        System.out.println("Arrays are equal? " + isEqual);
        
        // Array-i List-ə çevirmək
        String[] fruits = {"apple", "banana", "orange"};
        List<String> fruitList = Arrays.asList(fruits);
        System.out.println("Fruit list: " + fruitList);
    }
}
```
</details>

## Collections Framework-un Üstünlükləri

1. **Standart API**: Standart data strukturları və alqoritmlər təqdim edir
2. **Reusability**: Kod təkrarını azaldır
3. **Performance**: Effektiv implementasiyalar təqdim edir
4. **Interoperability**: Müxtəlif kolleksiya tipləri arasında asan keçid
5. **Extensibility**: Öz kolleksiya tiplərini yaratmaq mümkündür

## Collections Framework-un İstifadə Sahələri

1. **Data Storage**: Müxtəlif tipli data-nın saxlanması
2. **Data Manipulation**: Data üzərində əməliyyatlar
3. **Data Retrieval**: Data-nın effektiv şəkildə əldə edilməsi
4. **Algorithm Implementation**: Alqoritmlərin implementasiyası
5. **Concurrency**: Thread-safe kolleksiyalar vasitəsilə paralel proqramlaşdırma

