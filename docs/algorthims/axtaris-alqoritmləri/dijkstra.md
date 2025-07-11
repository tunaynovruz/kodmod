---
title: Dijkstra's Algorithm
description: Dijkstra alqoritminin ətraflı izahı və Java-da implementasiyası
slug: dijkstra-algorithm
tags: [algorithms, search, graph, shortest-path, java]
keywords: [dijkstra, shortest path, graph algorithm, java]
hide_table_of_contents: false
---

# Dijkstra's Algorithm

## Giriş

Dijkstra alqoritmi, qraflarda bir başlanğıc node-dan digər bütün node-lara olan ən qısa yolları tapmaq üçün istifadə olunan məşhur bir alqoritmdir. Bu alqoritm, Edsger W. Dijkstra tərəfindən 1956-cı ildə təklif edilmişdir və mənfi çəkili kənarları olmayan qraflarda işləyir.

## Dijkstra Alqoritminin Əsas Xüsusiyyətləri

- **Greedy Approach**: Hər addımda ən yaxın node-u seçir
- **Weighted Graphs**: Çəkili qraflarda işləyir
- **Positive Weights**: Mənfi çəkili kənarlar üçün uyğun deyil
- **Single Source**: Bir başlanğıc node-dan bütün digər node-lara olan ən qısa yolları tapır

## Dijkstra Alqoritminin İşləmə Prinsipi

1. **İnitialization**: Başlanğıc node-un məsafəsini 0, digər bütün node-ların məsafəsini sonsuzluq olaraq təyin et
2. **Selection**: Ziyarət edilməmiş node-lar arasından ən kiçik məsafəyə sahib node-u seç
3. **Relaxation**: Seçilmiş node-un bütün qonşuları üçün məsafələri yenilə
4. **Repeat**: Bütün node-lar ziyarət edilənə qədər 2 və 3-cü addımları təkrarla

## Dijkstra Alqoritminin Java-da İmplementasiyası

```java
import java.util.*;

public class Dijkstra {
    // Qraf təmsili (adjacency list with weights)
    private Map<Integer, List<Node>> graph;
    
    // Node class to represent destination and weight
    static class Node {
        int dest;
        int weight;
        
        Node(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }
    
    public Dijkstra() {
        graph = new HashMap<>();
    }
    
    // Qrafa node əlavə etmək
    public void addNode(int node) {
        graph.putIfAbsent(node, new ArrayList<>());
    }
    
    // Qrafa çəkili kənar əlavə etmək
    public void addEdge(int source, int destination, int weight) {
        graph.putIfAbsent(source, new ArrayList<>());
        graph.get(source).add(new Node(destination, weight));
    }
    
    // Dijkstra alqoritmi
    public int[] shortestPath(int start) {
        // Məsafələr massivi
        int[] distances = new int[graph.size()];
        Arrays.fill(distances, Integer.MAX_VALUE);
        distances[start] = 0;
        
        // Ziyarət edilmiş node-lar
        boolean[] visited = new boolean[graph.size()];
        
        // Priority queue to get the minimum distance node
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(n -> n.weight));
        pq.add(new Node(start, 0));
        
        while (!pq.isEmpty()) {
            // Ən kiçik məsafəli node-u seç
            Node current = pq.poll();
            int u = current.dest;
            
            // Əgər node artıq ziyarət edilibsə, keç
            if (visited[u]) {
                continue;
            }
            
            // Node-u ziyarət edilmiş kimi işarələ
            visited[u] = true;
            
            // Qonşuları yoxla və məsafələri yenilə
            List<Node> neighbors = graph.getOrDefault(u, Collections.emptyList());
            for (Node neighbor : neighbors) {
                int v = neighbor.dest;
                int weight = neighbor.weight;
                
                // Relaxation: Əgər yeni yol daha qısadırsa, məsafəni yenilə
                if (!visited[v] && distances[u] != Integer.MAX_VALUE && 
                    distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    pq.add(new Node(v, distances[v]));
                }
            }
        }
        
        return distances;
    }
    
    // Test
    public static void main(String[] args) {
        Dijkstra dijkstra = new Dijkstra();
        
        // Qraf yaratmaq
        for (int i = 0; i < 6; i++) {
            dijkstra.addNode(i);
        }
        
        dijkstra.addEdge(0, 1, 4);
        dijkstra.addEdge(0, 2, 3);
        dijkstra.addEdge(1, 2, 1);
        dijkstra.addEdge(1, 3, 2);
        dijkstra.addEdge(2, 3, 4);
        dijkstra.addEdge(2, 4, 3);
        dijkstra.addEdge(3, 4, 2);
        dijkstra.addEdge(3, 5, 1);
        dijkstra.addEdge(4, 5, 6);
        
        int[] distances = dijkstra.shortestPath(0);
        
        System.out.println("Shortest distances from node 0:");
        for (int i = 0; i < distances.length; i++) {
            System.out.println("To node " + i + ": " + distances[i]);
        }
    }
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: 
  - Priority Queue ilə: O((V + E) log V), burada V vertex-lərin sayı, E isə kənarların sayıdır
  - Sadə array ilə: O(V²)
- **Məkan Mürəkkəbliyi**: O(V + E)

## Dijkstra Alqoritminin Üstünlükləri və Çatışmazlıqları

### Üstünlüklər
- Çəkili qraflarda ən qısa yolu tapmaq üçün effektivdir
- Priority queue istifadə edərək performansı artırmaq mümkündür
- Bir çox real dünya problemlərində tətbiq oluna bilər

### Çatışmazlıqlar
- Mənfi çəkili kənarlar üçün işləmir
- Böyük qraflarda yaddaş tələbi yüksək ola bilər
- Bütün node-lar arasındakı ən qısa yolları tapmaq üçün Floyd-Warshall kimi alqoritmlər daha uyğun ola bilər

## Nəticə

Dijkstra alqoritmi, çəkili qraflarda ən qısa yol problemlərini həll etmək üçün güclü və effektiv bir alqoritmdir. Mənfi çəkili kənarlar olmadığı təqdirdə, bu alqoritm həmişə optimal həlli tapacaqdır. GPS naviqasiya sistemləri, şəbəkə yönləndirmə protokolları və bir çox digər sahələrdə geniş tətbiq olunur.