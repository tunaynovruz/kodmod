---
title: Heap Data Structure
description: Heap data strukturunun ətraflı izahı və Java-da implementasiyası
slug: heap-data-structure
tags: [data-strukturlar, heap, binary-heap, priority-queue, java]
keywords: [heap, binary heap, min heap, max heap, priority queue, data struktur, java]
hide_table_of_contents: false
---

# Heap Data Structure

## Giriş

Heap (yığın) data strukturu, xüsusi bir tam binary tree-dir ki, burada hər bir node-un dəyəri onun child node-larının dəyərlərindən böyük (Max Heap) və ya kiçik (Min Heap) olur. Heap data strukturu, prioritet növbələri (priority queues) və heap sort alqoritmində geniş istifadə olunur.

## Heap-in Əsas Xüsusiyyətləri

- **Complete Binary Tree**: Heap, tam doldurulmuş binary tree-dir (son səviyyə istisna olmaqla)
- **Heap Property**: Max Heap-də hər bir node-un dəyəri onun child-larından böyük, Min Heap-də isə kiçikdir
- **Efficient Operations**: Element əlavə etmək və maksimum/minimum elementi çıxarmaq O(log n) vaxt mürəkkəbliyinə malikdir
- **Array Representation**: Heap-lər adətən array-lər ilə təmsil olunur
- **No Ordering Between Siblings**: Eyni səviyyədəki node-lar arasında sıralama yoxdur

## Heap-in Növləri

### 1. Max Heap

Max Heap-də hər bir node-un dəyəri onun bütün child node-larının dəyərlərindən böyük və ya bərabərdir. Beləliklə, root node həmişə ən böyük dəyərə malik olur.

### 2. Min Heap

Min Heap-də hər bir node-un dəyəri onun bütün child node-larının dəyərlərindən kiçik və ya bərabərdir. Beləliklə, root node həmişə ən kiçik dəyərə malik olur.

## Heap-in Array Təsviri

Heap-lər adətən array-lər ilə təmsil olunur. Əgər bir node-un indeksi i-dirsə:
- Sol child-ın indeksi: 2*i + 1
- Sağ child-ın indeksi: 2*i + 2
- Parent node-un indeksi: (i-1)/2 (tam bölmə)

## Heap-in Java-da İmplementasiyası

### Max Heap İmplementasiyası

```java
public class MaxHeap {
    private int[] heap;
    private int size;
    private int capacity;
    
    // Constructor
    public MaxHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = new int[capacity];
    }
    
    // Parent indeksini əldə etmək
    private int parent(int i) {
        return (i - 1) / 2;
    }
    
    // Sol child indeksini əldə etmək
    private int leftChild(int i) {
        return 2 * i + 1;
    }
    
    // Sağ child indeksini əldə etmək
    private int rightChild(int i) {
        return 2 * i + 2;
    }
    
    // Heap-in boş olub-olmadığını yoxlamaq
    public boolean isEmpty() {
        return size == 0;
    }
    
    // Heap-in dolu olub-olmadığını yoxlamaq
    public boolean isFull() {
        return size == capacity;
    }
    
    // İki elementi dəyişdirmək
    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
    
    // Heap-ə element əlavə etmək
    public void insert(int key) {
        if (isFull()) {
            throw new IllegalStateException("Heap is full");
        }
        
        // Yeni elementi sona əlavə etmək
        int i = size;
        heap[i] = key;
        size++;
        
        // Heap xüsusiyyətini qorumaq üçün yuxarı hərəkət etmək (heapify-up)
        while (i != 0 && heap[parent(i)] < heap[i]) {
            swap(i, parent(i));
            i = parent(i);
        }
    }
    
    // Maksimum elementi çıxarmaq (root)
    public int extractMax() {
        if (isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        
        // Root-u çıxarmaq
        int max = heap[0];
        
        // Son elementi root-a köçürmək və ölçünü azaltmaq
        heap[0] = heap[size - 1];
        size--;
        
        // Heap xüsusiyyətini qorumaq üçün aşağı hərəkət etmək (heapify-down)
        heapifyDown(0);
        
        return max;
    }
    
    // Heapify-down prosesi
    private void heapifyDown(int i) {
        int largest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        // Sol child root-dan böyükdürsə
        if (left < size && heap[left] > heap[largest]) {
            largest = left;
        }
        
        // Sağ child ən böyükdürsə
        if (right < size && heap[right] > heap[largest]) {
            largest = right;
        }
        
        // Əgər ən böyük element root deyilsə
        if (largest != i) {
            swap(i, largest);
            heapifyDown(largest);
        }
    }
    
    // Maksimum elementi görmək (çıxarmadan)
    public int peekMax() {
        if (isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        return heap[0];
    }
    
    // Heap-i çap etmək
    public void printHeap() {
        System.out.print("Max Heap: ");
        for (int i = 0; i < size; i++) {
            System.out.print(heap[i] + " ");
        }
        System.out.println();
    }
    
    // Main method
    public static void main(String[] args) {
        MaxHeap maxHeap = new MaxHeap(10);
        
        maxHeap.insert(4);
        maxHeap.insert(10);
        maxHeap.insert(8);
        maxHeap.insert(5);
        maxHeap.insert(1);
        maxHeap.insert(7);
        
        maxHeap.printHeap(); // Max Heap: 10 5 8 4 1 7
        
        System.out.println("Maximum element: " + maxHeap.peekMax()); // 10
        
        System.out.println("Extracted max: " + maxHeap.extractMax()); // 10
        maxHeap.printHeap(); // Max Heap: 8 5 7 4 1
        
        System.out.println("Extracted max: " + maxHeap.extractMax()); // 8
        maxHeap.printHeap(); // Max Heap: 7 5 1 4
    }
}
```

### Min Heap İmplementasiyası

```java
public class MinHeap {
    private int[] heap;
    private int size;
    private int capacity;
    
    // Constructor
    public MinHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = new int[capacity];
    }
    
    // Parent indeksini əldə etmək
    private int parent(int i) {
        return (i - 1) / 2;
    }
    
    // Sol child indeksini əldə etmək
    private int leftChild(int i) {
        return 2 * i + 1;
    }
    
    // Sağ child indeksini əldə etmək
    private int rightChild(int i) {
        return 2 * i + 2;
    }
    
    // Heap-in boş olub-olmadığını yoxlamaq
    public boolean isEmpty() {
        return size == 0;
    }
    
    // Heap-in dolu olub-olmadığını yoxlamaq
    public boolean isFull() {
        return size == capacity;
    }
    
    // İki elementi dəyişdirmək
    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
    
    // Heap-ə element əlavə etmək
    public void insert(int key) {
        if (isFull()) {
            throw new IllegalStateException("Heap is full");
        }
        
        // Yeni elementi sona əlavə etmək
        int i = size;
        heap[i] = key;
        size++;
        
        // Heap xüsusiyyətini qorumaq üçün yuxarı hərəkət etmək (heapify-up)
        while (i != 0 && heap[parent(i)] > heap[i]) {
            swap(i, parent(i));
            i = parent(i);
        }
    }
    
    // Minimum elementi çıxarmaq (root)
    public int extractMin() {
        if (isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        
        // Root-u çıxarmaq
        int min = heap[0];
        
        // Son elementi root-a köçürmək və ölçünü azaltmaq
        heap[0] = heap[size - 1];
        size--;
        
        // Heap xüsusiyyətini qorumaq üçün aşağı hərəkət etmək (heapify-down)
        heapifyDown(0);
        
        return min;
    }
    
    // Heapify-down prosesi
    private void heapifyDown(int i) {
        int smallest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        // Sol child root-dan kiçikdirsə
        if (left < size && heap[left] < heap[smallest]) {
            smallest = left;
        }
        
        // Sağ child ən kiçikdirsə
        if (right < size && heap[right] < heap[smallest]) {
            smallest = right;
        }
        
        // Əgər ən kiçik element root deyilsə
        if (smallest != i) {
            swap(i, smallest);
            heapifyDown(smallest);
        }
    }
    
    // Minimum elementi görmək (çıxarmadan)
    public int peekMin() {
        if (isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        return heap[0];
    }
    
    // Heap-i çap etmək
    public void printHeap() {
        System.out.print("Min Heap: ");
        for (int i = 0; i < size; i++) {
            System.out.print(heap[i] + " ");
        }
        System.out.println();
    }
    
    // Main method
    public static void main(String[] args) {
        MinHeap minHeap = new MinHeap(10);
        
        minHeap.insert(4);
        minHeap.insert(10);
        minHeap.insert(8);
        minHeap.insert(5);
        minHeap.insert(1);
        minHeap.insert(7);
        
        minHeap.printHeap(); // Min Heap: 1 4 7 10 5 8
        
        System.out.println("Minimum element: " + minHeap.peekMin()); // 1
        
        System.out.println("Extracted min: " + minHeap.extractMin()); // 1
        minHeap.printHeap(); // Min Heap: 4 5 7 10 8
        
        System.out.println("Extracted min: " + minHeap.extractMin()); // 4
        minHeap.printHeap(); // Min Heap: 5 8 7 10
    }
}
```

## Priority Queue ilə Heap İmplementasiyası

Java-da `PriorityQueue` class-ı, heap data strukturu əsasında işləyir:

```java
import java.util.PriorityQueue;

public class PriorityQueueExample {
    public static void main(String[] args) {
        // Min heap (default)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        minHeap.add(4);
        minHeap.add(10);
        minHeap.add(8);
        minHeap.add(5);
        minHeap.add(1);
        minHeap.add(7);
        
        System.out.print("Min Heap (using PriorityQueue): ");
        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + " "); // 1 4 5 7 8 10
        }
        System.out.println();
        
        // Max heap (using Comparator.reverseOrder())
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(java.util.Collections.reverseOrder());
        
        maxHeap.add(4);
        maxHeap.add(10);
        maxHeap.add(8);
        maxHeap.add(5);
        maxHeap.add(1);
        maxHeap.add(7);
        
        System.out.print("Max Heap (using PriorityQueue): ");
        while (!maxHeap.isEmpty()) {
            System.out.print(maxHeap.poll() + " "); // 10 8 7 5 4 1
        }
        System.out.println();
    }
}
```

## Heap Sort Alqoritmi

Heap sort, heap data strukturundan istifadə edən bir sıralama alqoritmidir:

```java
public class HeapSort {
    // Array-i heap-ə çevirmək
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            
            heapify(arr, n, largest);
        }
    }
    
    // Heap sort
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            // Call heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }
    
    // Array-i çap etmək
    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
    
    // Main method
    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        
        System.out.println("Original array:");
        printArray(arr);
        
        heapSort(arr);
        
        System.out.println("Sorted array:");
        printArray(arr);
    }
}
```

## Heap-in İstifadə Sahələri

1. **Priority Queue**: Prioritet növbələrinin implementasiyası
2. **Heap Sort**: Effektiv sıralama alqoritmi
3. **Graph Algorithms**: Dijkstra və Prim alqoritmlərində istifadə olunur
4. **K-th Largest/Smallest Element**: K-cı ən böyük/kiçik elementi tapmaq
5. **Median Maintenance**: Axın məlumatlarında median-ı saxlamaq
6. **Memory Management**: Bəzi əməliyyat sistemlərində yaddaş idarəetməsi

## Heap-in Mürəkkəbliyi

| Əməliyyat | Time Complexity |
|-----------|-----------------|
| Build Heap | O(n) |
| Insert | O(log n) |
| Extract Max/Min | O(log n) |
| Peek Max/Min | O(1) |
| Heapify | O(log n) |
| Heap Sort | O(n log n) |

## Heap vs. Binary Search Tree (BST)

| Aspekt                | Heap                               | Binary Search Tree                  |
|-----------------------|------------------------------------|-------------------------------------|
| Ordering              | Parent-child əlaqəsi               | Sol subtree < node < sağ subtree    |
| Operations            | Insert, Extract Max/Min            | Insert, Delete, Search              |
| Implementation        | Array ilə sadə                     | Pointer-based, daha mürəkkəb        |
| Space Efficiency      | Daha effektiv                      | Pointer overhead                    |
| Search                | O(n)                               | O(log n) (balanced BST)             |
| Min/Max Access        | O(1) (root)                        | O(log n) (ən sol/sağ node)          |

## Nəticə

Heap data strukturu, prioritet növbələri və heap sort kimi tətbiqlərdə geniş istifadə olunan effektiv bir data strukturudur. Max Heap və Min Heap kimi növləri var və hər biri özünəməxsus xüsusiyyətlərə malikdir. Heap-in əsas üstünlüyü, maksimum və ya minimum elementi tez bir zamanda əldə etmək qabiliyyətidir, bu da onu bir çox alqoritm və tətbiqlər üçün ideal edir.