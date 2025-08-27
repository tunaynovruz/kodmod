---
draft: true
title: Graph Data Structure
description: Graph data strukturunun ətraflı izahı və Java-da implementasiyası
slug: graph-data-structure
tags: [data-strukturlar, graph, directed-graph, undirected-graph, java]
keywords: [graph, qraf, directed graph, undirected graph, data struktur, java]
hide_table_of_contents: false
---

# Graph Data Structure

## Giriş

Graph (qraf) data strukturu, node-lar (vertex-lər) və onları birləşdirən edge-lərdən (kənarlardan) ibarət olan bir data strukturudur. Graph-lar, real həyatdakı bir çox əlaqələri modelləşdirmək üçün istifadə olunur, məsələn sosial şəbəkələr, yol şəbəkələri, kompüter şəbəkələri və s.

## Graph-ın Əsas Xüsusiyyətləri

- **Vertex (Node)**: Graph-ın əsas elementi, məlumatı saxlayır
- **Edge (Kənar)**: İki vertex arasındakı əlaqəni göstərir
- **Directed/Undirected**: Edge-lər istiqamətli və ya istiqamətsiz ola bilər
- **Weighted/Unweighted**: Edge-lər çəkili (ağırlıqlı) və ya çəkisiz ola bilər
- **Cyclic/Acyclic**: Graph-da dövr (cycle) ola bilər və ya olmaya bilər
- **Connected/Disconnected**: Bütün vertex-lər arasında path olub-olmaması

## Graph-ın Növləri

### 1. Undirected Graph (İstiqamətsiz Qraf)

Undirected graph-da edge-lər iki istiqamətdə də keçid imkanı verir. Əgər vertex A vertex B ilə əlaqəlidirsə, vertex B də vertex A ilə əlaqəlidir.

### 2. Directed Graph (İstiqamətli Qraf)

Directed graph-da (digraph) edge-lər bir istiqamətdə olur. Əgər vertex A-dan vertex B-yə edge varsa, bu o demək deyil ki, vertex B-dən vertex A-ya da edge var.

### 3. Weighted Graph (Çəkili Qraf)

Weighted graph-da hər bir edge-in bir çəkisi (ağırlığı) var. Bu çəki məsafəni, zamanı, qiyməti və s. təmsil edə bilər.

### 4. Cyclic Graph (Dövrlü Qraf)

Cyclic graph-da ən azı bir dövr (cycle) var, yəni bir vertex-dən başlayıb, eyni vertex-ə qayıtmaq mümkündür.

### 5. Acyclic Graph (Dövrsüz Qraf)

Acyclic graph-da heç bir dövr yoxdur.

## Graph-ın Təsvir Üsulları

### 1. Adjacency Matrix (Qonşuluq Matrisi)

Adjacency matrix, n×n ölçülü bir matrisdir (n - vertex-lərin sayı). Matrix[i][j] = 1 əgər vertex i və vertex j arasında edge varsa, əks halda 0.

### 2. Adjacency List (Qonşuluq Siyahısı)

Adjacency list, hər bir vertex üçün onunla əlaqəli olan vertex-lərin siyahısını saxlayır. Bu, sparse graph-lar üçün daha effektivdir.

## Graph-ın Java-da İmplementasiyası

### Adjacency Matrix ilə Graph İmplementasiyası

```java
public class GraphWithAdjacencyMatrix {
    private int V; // Vertex-lərin sayı
    private boolean[][] adjMatrix;
    
    // Constructor
    public GraphWithAdjacencyMatrix(int v) {
        this.V = v;
        adjMatrix = new boolean[v][v];
    }
    
    // Edge əlavə etmək (undirected graph üçün)
    public void addEdge(int source, int destination) {
        // Edge əlavə etmək
        adjMatrix[source][destination] = true;
        // Undirected graph olduğu üçün əks istiqamətdə də əlavə edirik
        adjMatrix[destination][source] = true;
    }
    
    // Edge silmək
    public void removeEdge(int source, int destination) {
        adjMatrix[source][destination] = false;
        adjMatrix[destination][source] = false;
    }
    
    // Edge-in mövcudluğunu yoxlamaq
    public boolean isEdge(int source, int destination) {
        return adjMatrix[source][destination];
    }
    
    // Graph-ı çap etmək
    public void printGraph() {
        System.out.println("Graph (Adjacency Matrix):");
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                System.out.print(adjMatrix[i][j] ? "1 " : "0 ");
            }
            System.out.println();
        }
    }
    
    // Main method
    public static void main(String[] args) {
        GraphWithAdjacencyMatrix graph = new GraphWithAdjacencyMatrix(5);
        
        graph.addEdge(0, 1);
        graph.addEdge(0, 4);
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        
        graph.printGraph();
        
        System.out.println("Edge between 1 and 3: " + graph.isEdge(1, 3));
        graph.removeEdge(1, 3);
        System.out.println("Edge between 1 and 3 after removal: " + graph.isEdge(1, 3));
    }
}
```

### Adjacency List ilə Graph İmplementasiyası

```java
import java.util.ArrayList;
import java.util.List;

public class GraphWithAdjacencyList {
    private int V; // Vertex-lərin sayı
    private List<List<Integer>> adjList;
    
    // Constructor
    public GraphWithAdjacencyList(int v) {
        this.V = v;
        adjList = new ArrayList<>(v);
        for (int i = 0; i < v; i++) {
            adjList.add(new ArrayList<>());
        }
    }
    
    // Edge əlavə etmək (undirected graph üçün)
    public void addEdge(int source, int destination) {
        // Edge əlavə etmək
        adjList.get(source).add(destination);
        // Undirected graph olduğu üçün əks istiqamətdə də əlavə edirik
        adjList.get(destination).add(source);
    }
    
    // Edge silmək
    public void removeEdge(int source, int destination) {
        adjList.get(source).remove(Integer.valueOf(destination));
        adjList.get(destination).remove(Integer.valueOf(source));
    }
    
    // Edge-in mövcudluğunu yoxlamaq
    public boolean isEdge(int source, int destination) {
        return adjList.get(source).contains(destination);
    }
    
    // Graph-ı çap etmək
    public void printGraph() {
        System.out.println("Graph (Adjacency List):");
        for (int i = 0; i < V; i++) {
            System.out.print("Vertex " + i + " is connected to: ");
            for (int j = 0; j < adjList.get(i).size(); j++) {
                System.out.print(adjList.get(i).get(j) + " ");
            }
            System.out.println();
        }
    }
    
    // Main method
    public static void main(String[] args) {
        GraphWithAdjacencyList graph = new GraphWithAdjacencyList(5);
        
        graph.addEdge(0, 1);
        graph.addEdge(0, 4);
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        
        graph.printGraph();
        
        System.out.println("Edge between 1 and 3: " + graph.isEdge(1, 3));
        graph.removeEdge(1, 3);
        System.out.println("Edge between 1 and 3 after removal: " + graph.isEdge(1, 3));
    }
}
```

## Graph Traversal Alqoritmləri

### 1. Breadth-First Search (BFS)

BFS, graph-ı level by level gəzir. Əvvəlcə başlanğıc vertex-i, sonra onun bütün qonşularını, sonra qonşuların qonşularını və s.

```java
public void bfs(int startVertex) {
    boolean[] visited = new boolean[V];
    java.util.Queue<Integer> queue = new java.util.LinkedList<>();
    
    visited[startVertex] = true;
    queue.add(startVertex);
    
    while (!queue.isEmpty()) {
        int currentVertex = queue.poll();
        System.out.print(currentVertex + " ");
        
        for (int neighbor : adjList.get(currentVertex)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.add(neighbor);
            }
        }
    }
}
```

### 2. Depth-First Search (DFS)

DFS, graph-ı dərinliyinə gəzir. Bir path-i mümkün qədər dərinə qədər izləyir, sonra geri qayıdır və başqa path-ləri araşdırır.

```java
public void dfs(int startVertex) {
    boolean[] visited = new boolean[V];
    dfsUtil(startVertex, visited);
}

private void dfsUtil(int vertex, boolean[] visited) {
    visited[vertex] = true;
    System.out.print(vertex + " ");
    
    for (int neighbor : adjList.get(vertex)) {
        if (!visited[neighbor]) {
            dfsUtil(neighbor, visited);
        }
    }
}
```

## Graph Alqoritmləri

### 1. Dijkstra's Algorithm

Dijkstra's algorithm, bir vertex-dən digər bütün vertex-lərə olan ən qısa yolu tapmaq üçün istifadə olunur.

### 2. Bellman-Ford Algorithm

Bellman-Ford algorithm, neqativ çəkili edge-ləri olan graph-larda ən qısa yolu tapmaq üçün istifadə olunur.

### 3. Kruskal's Algorithm

Kruskal's algorithm, minimum spanning tree (MST) tapmaq üçün istifadə olunur.

### 4. Prim's Algorithm

Prim's algorithm, minimum spanning tree (MST) tapmaq üçün istifadə olunur.

### 5. Topological Sort

Topological sort, directed acyclic graph-da (DAG) vertex-ləri elə sıralayır ki, hər bir edge u-dan v-yə olduqda, u v-dən əvvəl gəlir.

## Graph-ın İstifadə Sahələri

1. **Social Networks**: İnsanlar arasındakı əlaqələri modelləşdirmək
2. **Web Pages**: Web səhifələr arasındakı linkləri təmsil etmək
3. **Maps and Navigation**: Yolları və marşrutları təmsil etmək
4. **Network Topology**: Kompüter şəbəkələrini modelləşdirmək
5. **Recommendation Systems**: Oxşarlıqları və əlaqələri təmsil etmək
6. **Dependency Resolution**: Asılılıqları idarə etmək

## Graph-ın Mürəkkəbliyi

| Əməliyyat | Adjacency Matrix | Adjacency List |
|-----------|------------------|----------------|
| Add Vertex | O(V²) | O(1) |
| Add Edge | O(1) | O(1) |
| Remove Vertex | O(V²) | O(V + E) |
| Remove Edge | O(1) | O(E) |
| Query | O(1) | O(V) |
| Storage | O(V²) | O(V + E) |
| BFS | O(V²) | O(V + E) |
| DFS | O(V²) | O(V + E) |

Burada:
- V: Vertex-lərin sayı
- E: Edge-lərin sayı

## Nəticə

Graph data strukturu, real həyatdakı bir çox əlaqələri modelləşdirmək üçün çox güclü bir vasitədir. Adjacency matrix və adjacency list kimi müxtəlif təsvir üsulları var və hər birinin öz üstünlükləri və çatışmazlıqları var. Graph traversal və graph alqoritmləri, graph-larla işləmək üçün əsas vasitələrdir və bir çox praktiki problemləri həll etmək üçün istifadə olunur.