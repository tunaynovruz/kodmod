---
title: Trie Data Structure
description: Trie data strukturunun ətraflı izahı və Java-da implementasiyası
slug: trie-data-structure
tags: [data-strukturlar, trie, prefix-tree, java]
keywords: [trie, prefix tree, data struktur, java]
hide_table_of_contents: false
---

# Trie Data Structure

## Giriş

Trie (prefix tree və ya digital tree kimi də tanınır), string-ləri saxlamaq və axtarmaq üçün istifadə olunan xüsusi bir ağac data strukturudur. Trie, sözləri və ya ardıcıllıqları hərflərinə görə saxlayır və prefix axtarışlarını çox effektiv şəkildə yerinə yetirir.

## Trie-nin Əsas Xüsusiyyətləri

- **Prefix-Based**: Eyni prefix-ə malik sözlər eyni path-i paylaşır
- **Root Node**: Boş bir node ilə başlayır
- **Children**: Hər bir node, potensial olaraq hər bir hərf üçün bir child-a malik ola bilər
- **End of Word**: Xüsusi bir marker ilə sözün bitdiyini göstərir
- **Space Efficiency**: Ortaq prefix-ləri paylaşaraq yer qənaəti edir

## Trie-nin İstifadə Sahələri

1. **Autocomplete**: Yazı yazarkən sözləri tamamlamaq
2. **Spell Checking**: Sözlərin düzgün yazılışını yoxlamaq
3. **IP Routing**: Network routing tables
4. **Dictionary Implementation**: Sözlük implementasiyası
5. **Prefix Matching**: Prefix-ə görə axtarış

## Trie-nin Java-da İmplementasiyası

```java
public class Trie {
    // Trie node class
    static class TrieNode {
        TrieNode[] children;
        boolean isEndOfWord;
        
        public TrieNode() {
            children = new TrieNode[26]; // Ingilis əlifbası üçün (a-z)
            isEndOfWord = false;
        }
    }
    
    // Root node
    private TrieNode root;
    
    // Constructor
    public Trie() {
        root = new TrieNode();
    }
    
    // Trie-yə söz əlavə etmək
    public void insert(String word) {
        TrieNode current = root;
        
        for (int i = 0; i < word.length(); i++) {
            int index = word.charAt(i) - 'a';
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        
        // Sözün sonunu işarələmək
        current.isEndOfWord = true;
    }
    
    // Trie-də söz axtarışı
    public boolean search(String word) {
        TrieNode current = root;
        
        for (int i = 0; i < word.length(); i++) {
            int index = word.charAt(i) - 'a';
            if (current.children[index] == null) {
                return false;
            }
            current = current.children[index];
        }
        
        // Söz tam olaraq mövcuddursa
        return current.isEndOfWord;
    }
    
    // Trie-də prefix axtarışı
    public boolean startsWith(String prefix) {
        TrieNode current = root;
        
        for (int i = 0; i < prefix.length(); i++) {
            int index = prefix.charAt(i) - 'a';
            if (current.children[index] == null) {
                return false;
            }
            current = current.children[index];
        }
        
        // Prefix mövcuddur
        return true;
    }
    
    // Trie-dən söz silmək
    public void delete(String word) {
        deleteRec(root, word, 0);
    }
    
    private boolean deleteRec(TrieNode current, String word, int depth) {
        // Base case: söz tam silinib
        if (depth == word.length()) {
            // Söz mövcud deyilsə
            if (!current.isEndOfWord) {
                return false;
            }
            
            // Sözün sonunu işarəsini silmək
            current.isEndOfWord = false;
            
            // Node-un başqa child-ları yoxdursa, silinə bilər
            return isEmpty(current);
        }
        
        int index = word.charAt(depth) - 'a';
        if (current.children[index] == null) {
            return false;
        }
        
        boolean shouldDeleteCurrentNode = deleteRec(current.children[index], word, depth + 1);
        
        // Child node silinməlidirsə
        if (shouldDeleteCurrentNode) {
            current.children[index] = null;
            
            // Current node silinə bilər əgər:
            // 1. Söz sonu deyilsə
            // 2. Başqa child-ları yoxdursa
            return !current.isEndOfWord && isEmpty(current);
        }
        
        return false;
    }
    
    private boolean isEmpty(TrieNode node) {
        for (int i = 0; i < 26; i++) {
            if (node.children[i] != null) {
                return false;
            }
        }
        return true;
    }
    
    // Main method
    public static void main(String[] args) {
        Trie trie = new Trie();
        
        // Sözləri əlavə etmək
        trie.insert("apple");
        trie.insert("app");
        trie.insert("application");
        trie.insert("banana");
        
        // Axtarış
        System.out.println("Search for 'apple': " + trie.search("apple"));       // true
        System.out.println("Search for 'app': " + trie.search("app"));           // true
        System.out.println("Search for 'appl': " + trie.search("appl"));         // false
        System.out.println("Search for 'ban': " + trie.search("ban"));           // false
        System.out.println("Search for 'banana': " + trie.search("banana"));     // true
        
        // Prefix axtarışı
        System.out.println("Starts with 'app': " + trie.startsWith("app"));      // true
        System.out.println("Starts with 'ban': " + trie.startsWith("ban"));      // true
        System.out.println("Starts with 'car': " + trie.startsWith("car"));      // false
        
        // Silmək
        trie.delete("apple");
        System.out.println("After deletion, search for 'apple': " + trie.search("apple"));       // false
        System.out.println("After deletion, search for 'app': " + trie.search("app"));           // true
        System.out.println("After deletion, search for 'application': " + trie.search("application")); // true
    }
}
```

## Trie-nin Genişləndirilmiş Versiyası

Yuxarıdakı implementasiya sadəcə kiçik hərfləri (a-z) dəstəkləyir. Daha ümumi bir implementasiya üçün HashMap istifadə edə bilərik:

```java
public class TrieWithHashMap {
    // Trie node class
    static class TrieNode {
        Map<Character, TrieNode> children;
        boolean isEndOfWord;
        
        public TrieNode() {
            children = new HashMap<>();
            isEndOfWord = false;
        }
    }
    
    // Root node
    private TrieNode root;
    
    // Constructor
    public TrieWithHashMap() {
        root = new TrieNode();
    }
    
    // Trie-yə söz əlavə etmək
    public void insert(String word) {
        TrieNode current = root;
        
        for (char c : word.toCharArray()) {
            current = current.children.computeIfAbsent(c, k -> new TrieNode());
        }
        
        current.isEndOfWord = true;
    }
    
    // Trie-də söz axtarışı
    public boolean search(String word) {
        TrieNode node = getNode(word);
        return node != null && node.isEndOfWord;
    }
    
    // Trie-də prefix axtarışı
    public boolean startsWith(String prefix) {
        return getNode(prefix) != null;
    }
    
    // Verilmiş string-ə uyğun node-u tapmaq
    private TrieNode getNode(String str) {
        TrieNode current = root;
        
        for (char c : str.toCharArray()) {
            if (!current.children.containsKey(c)) {
                return null;
            }
            current = current.children.get(c);
        }
        
        return current;
    }
}
```

## Trie-nin Mürəkkəbliyi

| Əməliyyat | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Insert    | O(m)            | O(m)             |
| Search    | O(m)            | O(1)             |
| Delete    | O(m)            | O(1)             |
| StartsWith| O(p)            | O(1)             |

Burada:
- m: sözün uzunluğu
- p: prefix-in uzunluğu

## Trie vs. Hash Table

| Aspekt                | Trie                                | Hash Table                         |
|-----------------------|-------------------------------------|-----------------------------------|
| Axtarış Sürəti        | O(m) - sözün uzunluğu              | O(1) - ortalama                   |
| Prefix Axtarışı       | Çox effektiv                        | Dəstəklənmir                      |
| Yaddaş İstifadəsi     | Ortaq prefix-lər üçün effektiv      | Hər söz üçün ayrı yer             |
| Implementasiya        | Nisbətən mürəkkəb                   | Daha sadə                         |
| Collision Handling    | Yoxdur                              | Lazımdır                          |

## Nəticə

Trie data strukturu, string-lərlə işləmək, xüsusilə də prefix axtarışları üçün çox effektiv bir vasitədir. Autocomplete, spell checking və dictionary kimi tətbiqlərdə geniş istifadə olunur. Trie-nin əsas üstünlüyü, axtarış zamanı sözün uzunluğundan asılı olan sabit zaman mürəkkəbliyidir, bu da onu böyük məlumat bazaları üçün ideal edir.