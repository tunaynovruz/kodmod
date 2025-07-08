---
title: Breadth-First Search (BFS)
description: Breadth-First Search alqoritminin ətraflı izahı və Java-da implementasiyası
slug: breadth-first-search
tags: [algorithms, search, bfs, graph, java]
keywords: [bfs, breadth first search, graph traversal, algorithm, java]
hide_table_of_contents: false
---

# Breadth-First Search (BFS)

## Giriş

Breadth-First Search (BFS) və ya Enilik-İlk Axtarış, qraf və ya ağac data strukturlarını gəzmək üçün istifadə olunan fundamental bir alqoritmdir. Bu alqoritm, başlanğıc node-dan eyni məsafədə olan bütün node-ları ziyarət etməyə üstünlük verir, sonra daha uzaq node-lara keçir.

## BFS-in Əsas Xüsusiyyətləri

- **Queue İstifadəsi**: FIFO (First-In-First-Out) prinsipi ilə işləyən queue istifadə edir
- **Səviyyə-Səviyyə Gəzinti**: Qrafı və ya ağacı səviyyə-səviyyə gəzir
- **Tam Gəzinti**: Bütün node-ları ziyarət edir
- **Enilik Prioriteti**: Dərinlik deyil, eniliyi prioritetləşdirir

## BFS-in İstifadə Sahələri

1. **Shortest Path**: İki node arasında ən qısa yolun tapılması
2. **Connected Components**: Qrafda əlaqəli komponentlərin tapılması
3. **Level Order Traversal**: Ağacların səviyyə-səviyyə gəzintisi
4. **Network Broadcasting**: Şəbəkə yayımı simulyasiyası
5. **Web Crawling**: Veb səhifələrin indekslənməsi

## BFS-in Java-da İmplementasiyası

```java
import java.util.*;

public class BFS {
    // Qraf təmsili (adjacency list)
    private Map<Integer, List<Integer>> graph;
    
    public BFS() {
        graph = new HashMap<>();
    }
    
    // Qrafa node əlavə etmək
    public void addNode(int node) {
        graph.putIfAbsent(node, new ArrayList<>());
    }
    
    // Qrafa kənar əlavə etmək
    public void addEdge(int source, int destination) {
        graph.putIfAbsent(source, new ArrayList<>());
        graph.get(source).add(destination);
    }
    
    // BFS alqoritmi
    public void bfs(int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        
        // Başlanğıc node-u əlavə et
        visited.add(start);
        queue.add(start);
        
        while (!queue.isEmpty()) {
            // Queue-dan bir node çıxart
            int current = queue.poll();
            System.out.print(current + " ");
            
            // Bütün qonşuları gəz
            List<Integer> neighbors = graph.getOrDefault(current, Collections.emptyList());
            for (int neighbor : neighbors) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
    }
    
    // Shortest path tapılması
    public int shortestPath(int start, int end) {
        if (start == end) {
            return 0;
        }
        
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        Map<Integer, Integer> distance = new HashMap<>();
        
        visited.add(start);
        queue.add(start);
        distance.put(start, 0);
        
        while (!queue.isEmpty()) {
            int current = queue.poll();
            
            List<Integer> neighbors = graph.getOrDefault(current, Collections.emptyList());
            for (int neighbor : neighbors) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                    distance.put(neighbor, distance.get(current) + 1);
                    
                    if (neighbor == end) {
                        return distance.get(neighbor);
                    }
                }
            }
        }
        
        return -1; // Yol tapılmadı
    }
    
    // Test
    public static void main(String[] args) {
        BFS bfs = new BFS();
        
        // Qraf yaratmaq
        for (int i = 0; i < 7; i++) {
            bfs.addNode(i);
        }
        
        bfs.addEdge(0, 1);
        bfs.addEdge(0, 2);
        bfs.addEdge(1, 3);
        bfs.addEdge(1, 4);
        bfs.addEdge(2, 5);
        bfs.addEdge(2, 6);
        
        System.out.println("BFS Traversal:");
        bfs.bfs(0);
        
        System.out.println("\nShortest path from 0 to 5: " + bfs.shortestPath(0, 5));
    }
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: O(V + E), burada V vertex-lərin sayı, E isə kənarların sayıdır
- **Məkan Mürəkkəbliyi**: O(V), ən pis halda bütün vertex-ləri queue-də saxlamalı ola bilərik

## Nəticə

BFS, xüsusilə ən qısa yol problemlərində və səviyyə-səviyyə gəzinti tələb edən məsələlərdə çox faydalı bir alqoritmdir. DFS ilə müqayisədə daha çox yaddaş tələb edə bilər, lakin ən qısa yolu tapmaq üçün optimal seçimdir.