---
draft: true
title: HashMap Data Structure
description: HashMap data strukturunun ətraflı izahı və Java-da implementasiyası
slug: hashmap-data-structure
tags: [data-strukturlar, hashmap, hash-table, java]
keywords: [hashmap, hash table, data struktur, java, key-value]
hide_table_of_contents: false
---

# HashMap Data Structure

## Giriş

HashMap, key-value cütlərini saxlayan bir data strukturudur. Bu struktur, key-ləri hash funksiyası vasitəsilə indeksləyərək, verilənlərə sürətli giriş təmin edir. HashMap-in əsas xüsusiyyəti, key-lərin unikal olması və hər bir key-in yalnız bir value ilə əlaqələndirilməsidir.

## HashMap-in Əsas Xüsusiyyətləri

- **Key-Value Cütləri**: Hər bir element key və value cütündən ibarətdir
- **Unikal Key-lər**: Hər bir key unikaldır, təkrarlana bilməz
- **Null Dəstəyi**: Java HashMap-də bir ədəd null key və istənilən sayda null value ola bilər
- **Sırasız**: HashMap elementləri daxiletmə sırasına görə saxlamır
- **Sürətli Əməliyyatlar**: Ortalama O(1) zamanda axtarış, əlavə etmə və silmə əməliyyatları

## HashMap-in İşləmə Prinsipi

HashMap, hash funksiyası vasitəsilə key-ləri array indekslərinə çevirir. Bu proses aşağıdakı kimi baş verir:

1. **Hashing**: Key-in hashCode() metodu çağırılır
2. **İndeksləmə**: Hash kodu array ölçüsünə görə modullaşdırılır (hash % array_size)
3. **Kolliziya İdarəetməsi**: Eyni indeksə düşən key-lər üçün linked list və ya balanced tree istifadə olunur

## HashMap-in Java-da İmplementasiyası

Java-da HashMap class-ı java.util paketində yerləşir:

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        // HashMap yaratmaq
        HashMap<String, Integer> map = new HashMap<>();
        
        // Elementləri əlavə etmək (put)
        map.put("Alma", 10);
        map.put("Armud", 20);
        map.put("Banan", 30);
        
        System.out.println("HashMap: " + map);
        
        // Key ilə value əldə etmək (get)
        int almaQiyməti = map.get("Alma");
        System.out.println("Alma qiyməti: " + almaQiyməti);
        
        // Key-in olub-olmadığını yoxlamaq (containsKey)
        boolean hasKey = map.containsKey("Banan");
        System.out.println("Banan key-i var? " + hasKey);
        
        // Value-nun olub-olmadığını yoxlamaq (containsValue)
        boolean hasValue = map.containsValue(20);
        System.out.println("20 value-su var? " + hasValue);
        
        // Key-i silmək (remove)
        map.remove("Armud");
        System.out.println("Armud silindikdən sonra: " + map);
        
        // HashMap-in ölçüsü (size)
        System.out.println("HashMap-in ölçüsü: " + map.size());
        
        // HashMap boşdur? (isEmpty)
        System.out.println("HashMap boşdur? " + map.isEmpty());
        
        // Bütün key-ləri əldə etmək (keySet)
        System.out.println("Key-lər: " + map.keySet());
        
        // Bütün value-ları əldə etmək (values)
        System.out.println("Value-lar: " + map.values());
        
        // Bütün key-value cütlərini əldə etmək (entrySet)
        System.out.println("Entries: " + map.entrySet());
        
        // HashMap-i iterate etmək
        System.out.println("\nHashMap-i iterate etmək:");
        
        // 1. EntrySet ilə iterate
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // 2. KeySet ilə iterate
        for (String key : map.keySet()) {
            System.out.println(key + ": " + map.get(key));
        }
        
        // 3. forEach ilə iterate (Java 8+)
        map.forEach((key, value) -> System.out.println(key + ": " + value));
        
        // HashMap-i təmizləmək (clear)
        map.clear();
        System.out.println("Clear-dən sonra HashMap: " + map);
    }
}
```

## HashMap-in Sadə İmplementasiyası

Aşağıda HashMap-in sadə bir implementasiyası verilmişdir:

```java
public class SimpleHashMap<K, V> {
    private static final int DEFAULT_CAPACITY = 16;
    private static final float DEFAULT_LOAD_FACTOR = 0.75f;
    
    private Entry<K, V>[] buckets;
    private int size;
    private float loadFactor;
    
    // Entry class-ı key-value cütlərini saxlamaq üçün
    private static class Entry<K, V> {
        K key;
        V value;
        Entry<K, V> next;
        
        Entry(K key, V value, Entry<K, V> next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }
    
    @SuppressWarnings("unchecked")
    public SimpleHashMap() {
        this.buckets = new Entry[DEFAULT_CAPACITY];
        this.loadFactor = DEFAULT_LOAD_FACTOR;
        this.size = 0;
    }
    
    // Hash funksiyası
    private int hash(K key) {
        return key == null ? 0 : Math.abs(key.hashCode()) % buckets.length;
    }
    
    // Element əlavə etmək
    public V put(K key, V value) {
        int index = hash(key);
        
        // Bucket-də key-i axtarmaq
        Entry<K, V> entry = buckets[index];
        while (entry != null) {
            if ((key == null && entry.key == null) || 
                (key != null && key.equals(entry.key))) {
                // Key tapıldı, value-nu yeniləmək
                V oldValue = entry.value;
                entry.value = value;
                return oldValue;
            }
            entry = entry.next;
        }
        
        // Key tapılmadı, yeni entry əlavə etmək
        buckets[index] = new Entry<>(key, value, buckets[index]);
        size++;
        
        // Load factor-u yoxlamaq və lazım olarsa resize etmək
        if ((float) size / buckets.length > loadFactor) {
            resize();
        }
        
        return null;
    }
    
    // Key ilə value əldə etmək
    public V get(K key) {
        int index = hash(key);
        
        Entry<K, V> entry = buckets[index];
        while (entry != null) {
            if ((key == null && entry.key == null) || 
                (key != null && key.equals(entry.key))) {
                return entry.value;
            }
            entry = entry.next;
        }
        
        return null;
    }
    
    // Key-i silmək
    public V remove(K key) {
        int index = hash(key);
        
        Entry<K, V> prev = null;
        Entry<K, V> entry = buckets[index];
        
        while (entry != null) {
            if ((key == null && entry.key == null) || 
                (key != null && key.equals(entry.key))) {
                // Key tapıldı
                if (prev == null) {
                    // İlk element
                    buckets[index] = entry.next;
                } else {
                    // Orta və ya son element
                    prev.next = entry.next;
                }
                size--;
                return entry.value;
            }
            prev = entry;
            entry = entry.next;
        }
        
        return null;
    }
    
    // HashMap-in ölçüsünü artırmaq
    @SuppressWarnings("unchecked")
    private void resize() {
        Entry<K, V>[] oldBuckets = buckets;
        buckets = new Entry[oldBuckets.length * 2];
        size = 0;
        
        // Köhnə elementləri yeni array-ə köçürmək
        for (Entry<K, V> entry : oldBuckets) {
            while (entry != null) {
                put(entry.key, entry.value);
                entry = entry.next;
            }
        }
    }
    
    // HashMap-in ölçüsü
    public int size() {
        return size;
    }
    
    // HashMap boşdur?
    public boolean isEmpty() {
        return size == 0;
    }
    
    // HashMap-i təmizləmək
    @SuppressWarnings("unchecked")
    public void clear() {
        buckets = new Entry[DEFAULT_CAPACITY];
        size = 0;
    }
    
    // Key-in olub-olmadığını yoxlamaq
    public boolean containsKey(K key) {
        return get(key) != null;
    }
    
    // Value-nun olub-olmadığını yoxlamaq
    public boolean containsValue(V value) {
        for (Entry<K, V> entry : buckets) {
            while (entry != null) {
                if ((value == null && entry.value == null) || 
                    (value != null && value.equals(entry.value))) {
                    return true;
                }
                entry = entry.next;
            }
        }
        return false;
    }
}
```

## HashMap-in İstifadə Sahələri

1. **Cache Sistemləri**: Tez-tez istifadə olunan məlumatları saxlamaq üçün
2. **Lookup Tables**: Məlumatları sürətli axtarmaq üçün
3. **Frequency Counters**: Elementlərin sayını hesablamaq üçün
4. **Associative Arrays**: Key-value əlaqələrini saxlamaq üçün
5. **Database Indexing**: Verilənlər bazasında indeksləmə üçün

## HashMap-in Praktiki İstifadəsi

### Frequency Counter

```java
import java.util.HashMap;

public class FrequencyCounter {
    public static void main(String[] args) {
        String text = "HashMap is a data structure that uses a hash function to map keys to values";
        
        // Sözləri ayırmaq
        String[] words = text.toLowerCase().split("\\s+");
        
        // Sözlərin sayını hesablamaq
        HashMap<String, Integer> wordCount = new HashMap<>();
        
        for (String word : words) {
            // Əgər söz artıq map-də varsa, sayını artırmaq
            if (wordCount.containsKey(word)) {
                wordCount.put(word, wordCount.get(word) + 1);
            } else {
                // Yeni söz əlavə etmək
                wordCount.put(word, 1);
            }
            
            // Alternativ olaraq:
            // wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }
        
        // Nəticələri göstərmək
        System.out.println("Word Frequency:");
        wordCount.forEach((word, count) -> 
            System.out.println(word + ": " + count)
        );
    }
}
```

### Two Sum Problem

```java
import java.util.HashMap;

public class TwoSum {
    public static int[] findTwoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        return new int[] { -1, -1 }; // No solution found
    }
    
    public static void main(String[] args) {
        int[] nums = { 2, 7, 11, 15 };
        int target = 9;
        
        int[] result = findTwoSum(nums, target);
        
        if (result[0] != -1) {
            System.out.println("Indices: " + result[0] + ", " + result[1]);
            System.out.println("Numbers: " + nums[result[0]] + ", " + nums[result[1]]);
        } else {
            System.out.println("No solution found");
        }
    }
}
```

## HashMap vs Hashtable

Java-da HashMap və Hashtable arasında bəzi fərqlər var:

| Xüsusiyyət | HashMap | Hashtable |
|------------|---------|-----------|
| Sinxronizasiya | Sinxronizasiya olunmayıb (thread-safe deyil) | Sinxronizasiya olunub (thread-safe) |
| Null Dəstəyi | Bir null key və istənilən sayda null value | Null key və null value dəstəkləmir |
| Performance | Daha sürətli (sinxronizasiya olmadığı üçün) | Nisbətən yavaş |
| Iterator | Fail-fast iterator | Enumeration və fail-fast iterator |
| Inheritance | AbstractMap-dən extends edir | Dictionary-dən extends edir |
| Legacy | Java 1.2-də əlavə edilib | Java 1.0-dan mövcuddur |

## HashMap-in Mürəkkəbliyi

| Əməliyyat | Average Case | Worst Case |
|-----------|--------------|------------|
| put       | O(1)         | O(n)       |
| get       | O(1)         | O(n)       |
| remove    | O(1)         | O(n)       |
| containsKey | O(1)       | O(n)       |
| containsValue | O(n)     | O(n)       |

Qeyd: Worst case o zaman baş verir ki, bütün key-lər eyni bucket-ə düşür (kolliziya).

## HashMap-in Java 8-də Təkmilləşdirilməsi

Java 8-də HashMap-in performansını artırmaq üçün bəzi təkmilləşdirmələr edilmişdir:

1. **Balanced Tree**: Bir bucket-də 8-dən çox element olduqda, linked list əvəzinə balanced tree (Red-Black Tree) istifadə olunur
2. **Daha Yaxşı Hash Funksiyası**: Kolliziyaları azaltmaq üçün daha yaxşı hash funksiyası

## Nəticə

HashMap, key-value cütlərini saxlamaq və onlara sürətli giriş əldə etmək üçün çox faydalı bir data strukturudur. Java-da HashMap class-ı, gündəlik proqramlaşdırmada tez-tez istifadə olunan ən vacib data strukturlarından biridir. Onun O(1) zamanda əməliyyatları yerinə yetirmək qabiliyyəti, onu bir çox alqoritm və proqram üçün ideal seçim edir.
