---
draft: true
title: Queue Data Structure
description: Queue data strukturunun ətraflı izahı və Java-da implementasiyası
slug: queue-data-structure
tags: [data-strukturlar, queue, fifo, java]
keywords: [queue, növbə, data struktur, java, fifo]
hide_table_of_contents: false
---

# Queue Data Structure

## Giriş

Queue (növbə) data strukturu FIFO (First-In-First-Out) prinsipi ilə işləyən bir kolleksiyadır. Real həyatda növbəyə bənzəyir - ilk gələn, ilk xidmət alır. Queue-ya elementlər bir tərəfdən əlavə edilir və digər tərəfdən çıxarılır.

## Queue-nun Əsas Xüsusiyyətləri

- **FIFO Prinsipi**: İlk daxil olan element ilk çıxarılır
- **Əməliyyatlar**: Enqueue (əlavə etmək), Dequeue (çıxarmaq), Peek (baxmaq)
- **İstifadə sahələri**: Task scheduling, resource sharing, breadth-first search

## Queue-nun Əsas Əməliyyatları

### 1. Enqueue

Növbənin sonuna yeni element əlavə edir.

### 2. Dequeue

Növbənin əvvəlindən elementi çıxarır və qaytarır.

### 3. Peek/Front

Növbənin əvvəlindəki elementi qaytarır, lakin onu növbədən çıxarmır.

### 4. isEmpty

Növbənin boş olub-olmadığını yoxlayır.

### 5. Size

Növbədəki elementlərin sayını qaytarır.

## Queue-nun Java-da İmplementasiyası

Java-da Queue bir interface-dir və onun bir neçə implementasiyası var:

### LinkedList ilə Queue

```java
import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        // LinkedList ilə Queue yaratmaq
        Queue<String> queue = new LinkedList<>();
        
        // Elementləri əlavə etmək (enqueue)
        queue.add("Birinci");
        queue.add("İkinci");
        queue.add("Üçüncü");
        
        System.out.println("Queue: " + queue);
        
        // Növbənin əvvəlindəki elementi görmək (peek)
        System.out.println("Növbənin əvvəlindəki element: " + queue.peek());
        
        // Elementi çıxarmaq (dequeue)
        String removedElement = queue.remove();
        System.out.println("Çıxarılan element: " + removedElement);
        System.out.println("Çıxarılandan sonra queue: " + queue);
        
        // Offer metodu ilə element əlavə etmək (enqueue)
        queue.offer("Dördüncü");
        System.out.println("Offer-dən sonra queue: " + queue);
        
        // Poll metodu ilə element çıxarmaq (dequeue)
        String polledElement = queue.poll();
        System.out.println("Poll edilən element: " + polledElement);
        System.out.println("Poll-dan sonra queue: " + queue);
        
        // Queue-nun ölçüsü
        System.out.println("Queue-nun ölçüsü: " + queue.size());
        
        // Queue boşdur?
        System.out.println("Queue boşdur? " + queue.isEmpty());
    }
}
```

### ArrayDeque ilə Queue

```java
import java.util.ArrayDeque;
import java.util.Queue;

public class ArrayDequeExample {
    public static void main(String[] args) {
        // ArrayDeque ilə Queue yaratmaq
        Queue<Integer> queue = new ArrayDeque<>();
        
        // Elementləri əlavə etmək
        queue.add(10);
        queue.add(20);
        queue.add(30);
        
        System.out.println("Queue: " + queue);
        
        // Elementi çıxarmaq
        int removed = queue.remove();
        System.out.println("Çıxarılan element: " + removed);
        System.out.println("Yeni queue: " + queue);
    }
}
```

### PriorityQueue

PriorityQueue, elementləri təyin edilmiş prioritetə görə sıralayır:

```java
import java.util.PriorityQueue;

public class PriorityQueueExample {
    public static void main(String[] args) {
        // Default olaraq kiçikdən böyüyə sıralayır
        PriorityQueue<Integer> priorityQueue = new PriorityQueue<>();
        
        priorityQueue.add(30);
        priorityQueue.add(10);
        priorityQueue.add(20);
        
        System.out.println("PriorityQueue: " + priorityQueue);
        
        // Elementləri çıxararkən prioritetə görə çıxarılır
        while (!priorityQueue.isEmpty()) {
            System.out.println("Çıxarılan element: " + priorityQueue.poll());
        }
    }
}
```

## Queue-nun İmplementasiyası (Sıfırdan)

Queue-nu özümüz də implement edə bilərik:

```java
public class CustomQueue<T> {
    private Node<T> front;
    private Node<T> rear;
    private int size;
    
    private static class Node<T> {
        T data;
        Node<T> next;
        
        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }
    
    public CustomQueue() {
        front = null;
        rear = null;
        size = 0;
    }
    
    // Növbənin sonuna element əlavə etmək
    public void enqueue(T item) {
        Node<T> newNode = new Node<>(item);
        
        if (isEmpty()) {
            front = newNode;
        } else {
            rear.next = newNode;
        }
        
        rear = newNode;
        size++;
    }
    
    // Növbənin əvvəlindən elementi çıxarmaq
    public T dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        
        T data = front.data;
        front = front.next;
        
        if (front == null) {
            rear = null;
        }
        
        size--;
        return data;
    }
    
    // Növbənin əvvəlindəki elementi görmək
    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        
        return front.data;
    }
    
    // Növbənin boş olub-olmadığını yoxlamaq
    public boolean isEmpty() {
        return front == null;
    }
    
    // Növbədəki elementlərin sayını qaytarmaq
    public int size() {
        return size;
    }
}
```

## Queue-nun İstifadə Sahələri

1. **CPU Scheduling**: Proseslərin idarə edilməsi
2. **Disk Scheduling**: Disk əməliyyatlarının idarə edilməsi
3. **Data Transfer**: Məlumatların bir yerdən digərinə ötürülməsi
4. **Breadth-First Search (BFS)**: Qraf və ağac strukturlarında axtarış
5. **Print Queue**: Çap növbəsinin idarə edilməsi
6. **Keyboard Buffer**: Klaviatura daxiletmələrinin idarə edilməsi

## Queue-nun Mürəkkəbliyi

| Əməliyyat | Time Complexity |
|-----------|-----------------|
| Enqueue   | O(1)            |
| Dequeue   | O(1)            |
| Peek      | O(1)            |
| isEmpty   | O(1)            |
| Size      | O(1)            |

## Circular Queue

Circular Queue, sadə Queue-nun daha effektiv versiyasıdır. Burada array-in sonuna çatdıqda, növbəti element array-in əvvəlinə yazılır:

```java
public class CircularQueue {
    private int[] array;
    private int front;
    private int rear;
    private int capacity;
    private int size;
    
    public CircularQueue(int capacity) {
        this.capacity = capacity;
        this.array = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }
    
    public boolean isEmpty() {
        return size == 0;
    }
    
    public boolean isFull() {
        return size == capacity;
    }
    
    public int size() {
        return size;
    }
    
    public void enqueue(int item) {
        if (isFull()) {
            throw new IllegalStateException("Queue is full");
        }
        
        rear = (rear + 1) % capacity;
        array[rear] = item;
        size++;
    }
    
    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        
        int item = array[front];
        front = (front + 1) % capacity;
        size--;
        
        return item;
    }
    
    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        
        return array[front];
    }
}
```

## Nəticə

Queue, FIFO prinsipi ilə işləyən sadə, lakin güclü bir data strukturudur. Java-da Queue interface-i və onun müxtəlif implementasiyaları (LinkedList, ArrayDeque, PriorityQueue) var. Queue data strukturu, xüsusilə sıra ilə emal edilməli olan məlumatlar üçün çox faydalıdır.
