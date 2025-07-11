---
title: Depth-First Search (DFS)
description: Depth-First Search alqoritminin ətraflı izahı və Java-da implementasiyası
slug: depth-first-search
tags: [algorithms, search, dfs, graph, java]
keywords: [dfs, depth first search, graph traversal, algorithm, java]
hide_table_of_contents: false
---

# Depth-First Search (DFS)

## Giriş

Depth-First Search (DFS) və ya Dərinlik-İlk Axtarış, qraf və ya ağac data strukturlarını gəzmək üçün istifadə olunan fundamental bir alqoritmdir. Bu alqoritm, mümkün qədər dərin getməyə çalışır və yalnız daha dərinə gedə bilmədikdə geri qayıdır.

## DFS-in Əsas Xüsusiyyətləri

- **Rekursiv Təbiət**: Adətən rekursiya ilə implementasiya olunur
- **Stack İstifadəsi**: İmplisit (rekursiya) və ya eksplisit stack istifadə edir
- **Tam Gəzinti**: Bütün node-ları ziyarət edir
- **Dərinlik Prioriteti**: Eni deyil, dərinliyi prioritetləşdirir

## DFS-in İstifadə Sahələri

1. **Path Finding**: İki node arasında yolun tapılması
2. **Connected Components**: Qrafda əlaqəli komponentlərin tapılması
3. **Topological Sorting**: Yönlü qraflarda topological sıralama
4. **Cycle Detection**: Qrafda dövr aşkarlanması
5. **Maze Solving**: Labirint həlli problemləri

## DFS-in Java-da İmplementasiyası

```java
import java.util.*;

public class DFS {
    // Qraf təmsili (adjacency list)
    private Map<Integer, List<Integer>> graph;
    
    public DFS() {
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
    
    // DFS alqoritmi (rekursiv)
    public void dfsRecursive(int start) {
        Set<Integer> visited = new HashSet<>();
        dfsRecursiveHelper(start, visited);
    }
    
    private void dfsRecursiveHelper(int current, Set<Integer> visited) {
        // Node-u ziyarət et
        visited.add(current);
        System.out.print(current + " ");
        
        // Bütün qonşuları gəz
        List<Integer> neighbors = graph.getOrDefault(current, Collections.emptyList());
        for (int neighbor : neighbors) {
            if (!visited.contains(neighbor)) {
                dfsRecursiveHelper(neighbor, visited);
            }
        }
    }
    
    // DFS alqoritmi (iterativ - stack istifadə edərək)
    public void dfsIterative(int start) {
        Set<Integer> visited = new HashSet<>();
        Stack<Integer> stack = new Stack<>();
        
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int current = stack.pop();
            
            if (!visited.contains(current)) {
                visited.add(current);
                System.out.print(current + " ");
                
                List<Integer> neighbors = graph.getOrDefault(current, Collections.emptyList());
                for (int neighbor : neighbors) {
                    if (!visited.contains(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }
    }
    
    // Test
    public static void main(String[] args) {
        DFS dfs = new DFS();
        
        // Qraf yaratmaq
        for (int i = 0; i < 7; i++) {
            dfs.addNode(i);
        }
        
        dfs.addEdge(0, 1);
        dfs.addEdge(0, 2);
        dfs.addEdge(1, 3);
        dfs.addEdge(1, 4);
        dfs.addEdge(2, 5);
        dfs.addEdge(2, 6);
        
        System.out.println("DFS Recursive:");
        dfs.dfsRecursive(0);
        
        System.out.println("\nDFS Iterative:");
        dfs.dfsIterative(0);
    }
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: O(V + E), burada V vertex-lərin sayı, E isə kənarların sayıdır
- **Məkan Mürəkkəbliyi**: O(V), ən pis halda bütün vertex-ləri stack-də saxlamalı ola bilərik

## Nəticə

DFS, qraf və ağac əsaslı problemlərin həllində fundamental bir alqoritmdir. Rekursiv təbiəti və dərinlik prioriteti onu bir çox tətbiq sahəsində faydalı edir. Lakin, çox dərin qraflarda stack overflow problemi yarana bilər, bu halda iterativ versiya daha etibarlı ola bilər.