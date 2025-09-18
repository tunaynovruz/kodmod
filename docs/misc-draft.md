---
draft: true
title: Axtarış Alqoritmləri
description: Axtarış alqoritmlərinin ətraflı izahı və Java implementasiyaları
slug: axtaris-alqoritmləri
tags: [alqoritmlər, axtarış, search, java]
keywords: [search algorithms, axtarış alqoritmləri, binary search, linear search, dfs, bfs]
hide_table_of_contents: false
---

# Axtarış Alqoritmləri


Axtarış alqoritmləri, verilənlər içərisində müəyyən bir elementi və ya elementi tapmaq üçün istifadə olunan alqoritmlərdir. Bu alqoritmlər kompüter elmində fundamental əhəmiyyət daşıyır və müxtəlif data strukturları və problemlər üçün fərqli yanaşmalar tələb edir.

## Axtarış Alqorimlərinin Təsnifatı

### Array/List Axtarışı
- Linear Search
- Binary Search
- Interpolation Search
- Exponential Search

### Tree/Graph Axtarışı
- Depth-First Search (DFS)
- Breadth-First Search (BFS)
- A* Search
- Dijkstra's Algorithm

### String Axtarışı
- Naive String Matching
- KMP Algorithm
- Rabin-Karp Algorithm

## Performans Müqayisəsi

| Alqoritm | Data Structure | Time Complexity | Space Complexity | Şərt |
|----------|----------------|-----------------|------------------|------|
| Linear Search | Array/List | O(n) | O(1) | Heç bir şərt yoxdur |
| Binary Search | Sorted Array | O(log n) | O(1) | Sıralanmış olmalıdır |
| DFS | Graph/Tree | O(V + E) | O(V) | - |
| BFS | Graph/Tree | O(V + E) | O(V) | - |
| A* Search | Graph | O(b^d) | O(b^d) | Heuristic function lazımdır |

## Alqoritmlər

### [Linear Search](./linear-search.md)
Sadə, lakin effektiv olmayan axtarış alqoritmi. Elementləri bir-bir yoxlayır.

### [Binary Search](./binary-search.md)
Sıralanmış massivlərdə effektiv axtarış aparan alqoritm. "Divide and Conquer" prinsipi istifadə edir.

### [Depth-First Search (DFS)](./dfs.md)
Qraf və ağaclarda dərinliyə görə axtarış aparan alqoritm. Stack və ya rekursiya istifadə edir.

### [Breadth-First Search (BFS)](./bfs.md)
Qraf və ağaclarda genişliyə görə axtarış aparan alqoritm. Queue istifadə edir.

### [A* Search](./a-star.md)
Heuristic istifadə edərək optimal yolu tapan alqoritm. Pathfinding üçün çox istifadə olunur.

## Java-da Built-in Axtarış

Java-da Arrays.binarySearch() və Collections.binarySearch() metodları mövcuddur:


<details>
<summary>Koda bax</summary>

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class JavaSearch {
    public static void main(String[] args) {
        // Array-də binary search
        int[] arr = {11, 12, 22, 25, 34, 64, 90};
        int index = Arrays.binarySearch(arr, 25);
        System.out.println("25-in indeksi: " + index);
        
        // List-də binary search
        List<Integer> list = new ArrayList<>();
        list.add(11); list.add(12); list.add(22); list.add(25);
        Collections.sort(list); // Əvvəlcə sıralamaq lazımdır
        int listIndex = Collections.binarySearch(list, 22);
        System.out.println("22-nin indeksi: " + listIndex);
        
        // Element tapılmadıqda
        int notFound = Arrays.binarySearch(arr, 50);
        System.out.println("50 tapılmadı, insertion point: " + (-notFound - 1));
    }
}
```
</details>

## Axtarış Strategiyaları

### 1. Uninformed Search (Məlumatı olmayan axtarış)
- Linear Search
- Binary Search
- DFS
- BFS

### 2. Informed Search (Məlumatı olan axtarış)
- A* Search
- Greedy Best-First Search
- Hill Climbing

### 3. Local Search
- Simulated Annealing
- Genetic Algorithms
- Tabu Search

## Müsahibə Sualları

1. **Binary Search-un şərti nədir?**
    - Cavab: Massiv və ya list sıralanmış olmalıdır. Əks halda binary search işləməz.

2. **DFS və BFS arasındakı fərq nədir?**
    - Cavab: DFS dərinliyə, BFS genişliyə görə axtarış edir. DFS stack, BFS queue istifadə edir.

3. **Binary Search-un time complexity-si nədir?**
    - Cavab: O(log n) - çünki hər addımda axtarış sahəsi yarıya bölünür.

4. **Nə vaxt Linear Search istifadə etmək lazımdır?**
    - Cavab: Kiçik data setləri, sıralanmamış data, və ya yalnız bir dəfə axtarış aparıldıqda.

5. **A* Search-un üstünlüyü nədir?**
    - Cavab: Heuristic function istifadə edərək optimal yolu daha sürətli tapır.

## Real Dünya Tətbiqləri

1. **Database Indexing**: B-tree və hash-based axtarış
2. **Web Search Engines**: PageRank və text search
3. **GPS Navigation**: A* və Dijkstra alqoritmləri
4. **Game AI**: Pathfinding və decision trees
5. **File Systems**: Directory və file axtarışı
6. **Network Routing**: Shortest path alqoritmləri

## Optimizasiya Texnikaları

### 1. Preprocessing
- Data-nı əvvəlcədən sıralamaq
- Index strukturları yaratmaq
- Hash table-lar istifadə etmək

### 2. Caching
- Tez-tez axtarılan elementləri cache-də saxlamaq
- LRU (Least Recently Used) strategiyası

### 3. Parallel Search
- Multi-threading istifadə etmək
- Distributed search sistemləri

