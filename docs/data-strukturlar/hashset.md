---
title: HashSet Data Structure
description: HashSet data strukturunun ətraflı izahı və Java-da implementasiyası
slug: hashset-data-structure
tags: [data-strukturlar, hashset, set, java]
keywords: [hashset, set, data struktur, java, unique elements]
hide_table_of_contents: false
---

# HashSet Data Structure

## Giriş

HashSet, Java Collections Framework-ün bir hissəsi olan və unikal elementləri saxlayan bir data strukturudur. Set interface-ini implement edir və daxili olaraq HashMap istifadə edir. HashSet-in əsas xüsusiyyəti, təkrarlanan elementlərə icazə verməməsi və elementləri hash code-larına əsasən saxlamasıdır.

## HashSet-in Əsas Xüsusiyyətləri

- **Unikal Elementlər**: Təkrarlanan elementlərə icazə vermir
- **Sırasız**: Elementləri daxiletmə sırasına görə saxlamır
- **Null Dəstəyi**: Bir ədəd null element saxlaya bilər
- **Sürətli Əməliyyatlar**: Ortalama O(1) zamanda axtarış, əlavə etmə və silmə əməliyyatları
- **Daxili Struktur**: Daxili olaraq HashMap istifadə edir

## HashSet-in İşləmə Prinsipi

HashSet, daxili olaraq HashMap istifadə edir. Hər bir element HashMap-də key kimi saxlanılır və value olaraq sabit bir dummy object istifadə olunur. Bu səbəbdən, HashSet-in performansı və davranışı HashMap-ə çox bənzəyir.

## HashSet-in Java-da İmplementasiyası

Java-da HashSet class-ı java.util paketində yerləşir:

```java
import java.util.HashSet;
import java.util.Iterator;

public class HashSetExample {
    public static void main(String[] args) {
        // HashSet yaratmaq
        HashSet<String> set = new HashSet<>();
        
        // Elementləri əlavə etmək (add)
        set.add("Alma");
        set.add("Armud");
        set.add("Banan");
        set.add("Alma"); // Təkrar element - əlavə olunmayacaq
        
        System.out.println("HashSet: " + set);
        
        // Elementin olub-olmadığını yoxlamaq (contains)
        boolean hasElement = set.contains("Banan");
        System.out.println("Banan elementi var? " + hasElement);
        
        // Elementi silmək (remove)
        set.remove("Armud");
        System.out.println("Armud silindikdən sonra: " + set);
        
        // HashSet-in ölçüsü (size)
        System.out.println("HashSet-in ölçüsü: " + set.size());
        
        // HashSet boşdur? (isEmpty)
        System.out.println("HashSet boşdur? " + set.isEmpty());
        
        // HashSet-i iterate etmək
        System.out.println("\nHashSet-i iterate etmək:");
        
        // 1. for-each ilə iterate
        for (String element : set) {
            System.out.println(element);
        }
        
        // 2. Iterator ilə iterate
        Iterator<String> iterator = set.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
        
        // 3. forEach ilə iterate (Java 8+)
        set.forEach(element -> System.out.println(element));
        
        // HashSet-i təmizləmək (clear)
        set.clear();
        System.out.println("Clear-dən sonra HashSet: " + set);
    }
}
```

## HashSet-in Sadə İmplementasiyası

Aşağıda HashSet-in sadə bir implementasiyası verilmişdir (HashMap istifadə edərək):

```java
import java.util.HashMap;

public class SimpleHashSet<E> {
    private static final Object PRESENT = new Object();
    private HashMap<E, Object> map;
    
    public SimpleHashSet() {
        map = new HashMap<>();
    }
    
    // Element əlavə etmək
    public boolean add(E element) {
        return map.put(element, PRESENT) == null;
    }
    
    // Elementi silmək
    public boolean remove(E element) {
        return map.remove(element) == PRESENT;
    }
    
    // Elementin olub-olmadığını yoxlamaq
    public boolean contains(E element) {
        return map.containsKey(element);
    }
    
    // HashSet-in ölçüsü
    public int size() {
        return map.size();
    }
    
    // HashSet boşdur?
    public boolean isEmpty() {
        return map.isEmpty();
    }
    
    // HashSet-i təmizləmək
    public void clear() {
        map.clear();
    }
    
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        
        for (E element : map.keySet()) {
            if (!first) {
                sb.append(", ");
            }
            sb.append(element);
            first = false;
        }
        
        sb.append("]");
        return sb.toString();
    }
}
```

## HashSet-in İstifadə Sahələri

1. **Unikal Elementlər**: Təkrarlanan elementləri aradan qaldırmaq üçün
2. **Membership Testing**: Bir elementin kolleksiyada olub-olmadığını sürətlə yoxlamaq üçün
3. **Set Operations**: Union, intersection, difference kimi set əməliyyatları üçün
4. **Duplicate Removal**: Təkrarlanan elementləri aradan qaldırmaq üçün
5. **Caching**: Unikal dəyərləri cache-ləmək üçün

## HashSet-in Praktiki İstifadəsi

### Təkrarlanan Elementləri Aradan Qaldırmaq

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class RemoveDuplicates {
    public static void main(String[] args) {
        // Təkrarlanan elementləri olan list
        List<Integer> numbersWithDuplicates = new ArrayList<>();
        numbersWithDuplicates.add(1);
        numbersWithDuplicates.add(2);
        numbersWithDuplicates.add(3);
        numbersWithDuplicates.add(1);
        numbersWithDuplicates.add(2);
        numbersWithDuplicates.add(4);
        
        System.out.println("Original List: " + numbersWithDuplicates);
        
        // HashSet istifadə edərək təkrarları aradan qaldırmaq
        HashSet<Integer> uniqueNumbers = new HashSet<>(numbersWithDuplicates);
        
        System.out.println("List without duplicates: " + uniqueNumbers);
        
        // Əgər sıranı saxlamaq lazımdırsa, LinkedHashSet istifadə edə bilərik
        // LinkedHashSet<Integer> uniqueOrderedNumbers = new LinkedHashSet<>(numbersWithDuplicates);
        // System.out.println("Ordered list without duplicates: " + uniqueOrderedNumbers);
    }
}
```

### Set Əməliyyatları

```java
import java.util.HashSet;

public class SetOperations {
    public static void main(String[] args) {
        // İki set yaratmaq
        HashSet<Integer> set1 = new HashSet<>();
        set1.add(1);
        set1.add(2);
        set1.add(3);
        set1.add(4);
        
        HashSet<Integer> set2 = new HashSet<>();
        set2.add(3);
        set2.add(4);
        set2.add(5);
        set2.add(6);
        
        System.out.println("Set1: " + set1);
        System.out.println("Set2: " + set2);
        
        // Union (Birləşmə) - addAll
        HashSet<Integer> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("Union: " + union);
        
        // Intersection (Kəsişmə) - retainAll
        HashSet<Integer> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("Intersection: " + intersection);
        
        // Difference (Fərq) - removeAll
        HashSet<Integer> difference1 = new HashSet<>(set1);
        difference1.removeAll(set2);
        System.out.println("Difference (Set1 - Set2): " + difference1);
        
        HashSet<Integer> difference2 = new HashSet<>(set2);
        difference2.removeAll(set1);
        System.out.println("Difference (Set2 - Set1): " + difference2);
        
        // Symmetric Difference (Simmetrik Fərq)
        HashSet<Integer> symmetricDifference = new HashSet<>(set1);
        symmetricDifference.addAll(set2); // Union
        
        HashSet<Integer> temp = new HashSet<>(set1);
        temp.retainAll(set2); // Intersection
        
        symmetricDifference.removeAll(temp); // Union - Intersection
        System.out.println("Symmetric Difference: " + symmetricDifference);
    }
}
```

## HashSet vs TreeSet vs LinkedHashSet

Java-da Set interface-ini implement edən üç əsas class var:

| Xüsusiyyət | HashSet | TreeSet | LinkedHashSet |
|------------|---------|---------|---------------|
| Sıralama | Sırasız | Təbii sıralama (natural ordering) | Daxiletmə sırası |
| Performance | Ən sürətli (O(1)) | Daha yavaş (O(log n)) | HashSet-dən bir az yavaş |
| Null Element | Bir null element | Null element yoxdur | Bir null element |
| Implementation | HashMap | TreeMap | LinkedHashMap |
| Ordered | Xeyr | Bəli (sorted) | Bəli (insertion order) |
| Navigable | Xeyr | Bəli | Xeyr |

## HashSet-in Mürəkkəbliyi

| Əməliyyat | Average Case | Worst Case |
|-----------|--------------|------------|
| add       | O(1)         | O(n)       |
| remove    | O(1)         | O(n)       |
| contains  | O(1)         | O(n)       |
| size      | O(1)         | O(1)       |

Qeyd: Worst case o zaman baş verir ki, bütün elementlər eyni bucket-ə düşür (kolliziya).

## HashSet-in Java 8-də Təkmilləşdirilməsi

Java 8-də HashSet-in performansını artırmaq üçün bəzi təkmilləşdirmələr edilmişdir (daxili olaraq istifadə etdiyi HashMap-in təkmilləşdirilməsi sayəsində):

1. **Balanced Tree**: Bir bucket-də 8-dən çox element olduqda, linked list əvəzinə balanced tree (Red-Black Tree) istifadə olunur
2. **Daha Yaxşı Hash Funksiyası**: Kolliziyaları azaltmaq üçün daha yaxşı hash funksiyası

## HashSet-in Məhdudiyyətləri

1. **Sırasız**: Elementləri daxiletmə sırasına görə saxlamır (əgər sıra lazımdırsa, LinkedHashSet istifadə edin)
2. **Null Element**: Yalnız bir null element saxlaya bilər
3. **Mutable Objects**: Mutable obyektlər HashSet-də key kimi istifadə edildikdə, onların hash code-u dəyişərsə, HashSet-də tapılmaya bilərlər

## Nəticə

HashSet, unikal elementləri saxlamaq və onlara sürətli giriş əldə etmək üçün çox faydalı bir data strukturudur. Java-da HashSet class-ı, təkrarlanan elementləri aradan qaldırmaq və set əməliyyatlarını yerinə yetirmək üçün ideal seçimdir. Onun O(1) zamanda əməliyyatları yerinə yetirmək qabiliyyəti, onu bir çox alqoritm və proqram üçün əvəzolunmaz edir.
