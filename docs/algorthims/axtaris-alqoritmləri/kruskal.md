---
title: Kruskal's Algorithm
description: Kruskal alqoritminin ətraflı izahı və Java-da implementasiyası
slug: kruskal-algorithm
tags: [algorithms, graph, minimum-spanning-tree, java]
keywords: [kruskal, minimum spanning tree, graph algorithm, java]
hide_table_of_contents: false
---

# Kruskal's Algorithm

## Giriş

Kruskal alqoritmi, çəkili qraflarda minimum spanning tree (MST) tapmaq üçün istifadə olunan məşhur bir alqoritmdir. MST, qrafın bütün vertex-lərini əhatə edən və ümumi çəkisi minimum olan bir ağacdır. Bu alqoritm, Joseph Kruskal tərəfindən 1956-cı ildə təklif edilmişdir.

## Kruskal Alqoritminin Əsas Xüsusiyyətləri

- **Greedy Approach**: Hər addımda ən kiçik çəkili kənarı seçir
- **Cycle Detection**: Dövr yaratmayan kənarları seçir
- **Union-Find**: Disjoint Set data strukturundan istifadə edir
- **Connected Components**: Qrafın bütün əlaqəli komponentlərini birləşdirir

## Kruskal Alqoritminin İşləmə Prinsipi

1. **Sorting**: Bütün kənarları çəkilərinə görə artan sırada sırala
2. **Initialization**: Hər vertex-i ayrı bir komponent kimi qəbul et
3. **Selection**: Sıralanmış kənarları bir-bir seç
4. **Cycle Check**: Əgər seçilmiş kənar dövr yaratmırsa, MST-yə əlavə et
5. **Union**: Kənarın birləşdirdiyi komponentləri birləşdir
6. **Repeat**: MST-də (n-1) kənar olana qədər 3-5 addımları təkrarla (n vertex sayıdır)

## Kruskal Alqoritminin Java-da İmplementasiyası

```java
import java.util.*;

public class Kruskal {
    // Kənar class-ı
    static class Edge implements Comparable<Edge> {
        int src, dest, weight;
        
        Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }
        
        @Override
        public int compareTo(Edge other) {
            return this.weight - other.weight;
        }
    }
    
    // Disjoint Set (Union-Find) data strukturu
    static class DisjointSet {
        int[] parent, rank;
        
        DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            
            // Hər node-u özünə parent təyin et
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }
        
        // Find metodu (path compression ilə)
        int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
        
        // Union metodu (rank ilə)
        void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX == rootY) return;
            
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    }
    
    // Kruskal alqoritmi
    public List<Edge> kruskalMST(List<Edge> edges, int V) {
        // Nəticə - MST kənarları
        List<Edge> result = new ArrayList<>();
        
        // Kənarları çəkiyə görə sırala
        Collections.sort(edges);
        
        // Disjoint Set yaratmaq
        DisjointSet ds = new DisjointSet(V);
        
        int e = 0; // Seçilmiş kənarların sayı
        int i = 0; // Sıralanmış kənarlar üzərində indeks
        
        // MST-də (V-1) kənar olmalıdır
        while (e < V - 1 && i < edges.size()) {
            // Növbəti ən kiçik çəkili kənarı götür
            Edge nextEdge = edges.get(i++);
            
            int x = ds.find(nextEdge.src);
            int y = ds.find(nextEdge.dest);
            
            // Əgər bu kənar dövr yaratmırsa, MST-yə əlavə et
            if (x != y) {
                result.add(nextEdge);
                ds.union(x, y);
                e++;
            }
        }
        
        return result;
    }
    
    // Test
    public static void main(String[] args) {
        int V = 4; // Vertex sayı
        List<Edge> edges = new ArrayList<>();
        
        // Kənarları əlavə et
        edges.add(new Edge(0, 1, 10));
        edges.add(new Edge(0, 2, 6));
        edges.add(new Edge(0, 3, 5));
        edges.add(new Edge(1, 3, 15));
        edges.add(new Edge(2, 3, 4));
        
        Kruskal kruskal = new Kruskal();
        List<Edge> mst = kruskal.kruskalMST(edges, V);
        
        System.out.println("Minimum Spanning Tree kənarları:");
        int totalWeight = 0;
        for (Edge edge : mst) {
            System.out.println(edge.src + " -- " + edge.dest + " == " + edge.weight);
            totalWeight += edge.weight;
        }
        System.out.println("MST-nin ümumi çəkisi: " + totalWeight);
    }
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: O(E log E) və ya O(E log V), burada E kənarların sayı, V isə vertex-lərin sayıdır. Dominant əməliyyat kənarların sıralanmasıdır.
- **Məkan Mürəkkəbliyi**: O(V + E), disjoint set və kənarlar siyahısı üçün.

## Kruskal Alqoritminin Üstünlükləri və Çatışmazlıqları

### Üstünlüklər
- Seyrək qraflar üçün effektivdir
- İmplementasiyası nisbətən sadədir
- Əlaqəli olmayan qraflarda da işləyir (hər komponent üçün ayrı MST tapır)

### Çatışmazlıqlar
- Sıx qraflarda Prim alqoritmi daha effektiv ola bilər
- Kənarların sıralanması böyük qraflarda yavaş ola bilər
- Dinamik qraflarda (kənarlar əlavə olunur/silinir) yenidən hesablama tələb edir

## Nəticə

Kruskal alqoritmi, minimum spanning tree problemlərini həll etmək üçün sadə və effektiv bir alqoritmdir. Xüsusilə seyrək qraflarda yaxşı performans göstərir. Şəbəkə dizaynı, elektrik şəbəkələri, boru kəmərləri və bir çox digər real dünya tətbiqlərində istifadə olunur.