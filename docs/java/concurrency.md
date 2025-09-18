---
draft: true
title: Java Concurrency
description: Java-da concurrency və multithreading-in ətraflı izahı
slug: java-concurrency
tags: [java, concurrency, multithreading, synchronization]
keywords: [java concurrency, multithreading, thread, synchronization, executor]
hide_table_of_contents: false
---

# Java Concurrency


Java Concurrency, bir proqramda eyni zamanda bir neçə thread-in işləməsini təmin edən mexanizmdir. Bu, proqramın performansını artırmaq və sistem resurslarından daha effektiv istifadə etmək üçün istifadə olunur. Java-da concurrency, Thread class-ı, Runnable interface-i və java.util.concurrent paketi vasitəsilə təmin edilir.

## Thread-lərin Əsas Anlayışları

### Thread Nədir?

Thread, proqramın icra edilən ən kiçik vahididir. Bir prosesdə bir neçə thread eyni zamanda işləyə bilər və onlar eyni memory space-i paylaşırlar.

### Thread-in Həyat Dövrü

1. **NEW**: Thread yaradılıb, lakin hələ start() metodu çağırılmayıb
2. **RUNNABLE**: Thread işləməyə hazırdır və ya işləyir
3. **BLOCKED**: Thread monitor lock gözləyir
4. **WAITING**: Thread digər thread-in notification-unu gözləyir
5. **TIMED_WAITING**: Thread müəyyən müddət gözləyir
6. **TERMINATED**: Thread işini bitirib

## Thread Yaratmaq

### 1. Thread Class-ını Extend Etmək


<details>
<summary>Koda bax</summary>

```java
class MyThread extends Thread {
    private String threadName;
    
    public MyThread(String name) {
        this.threadName = name;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + " - Count: " + i);
            try {
                Thread.sleep(1000); // 1 saniyə gözləmək
            } catch (InterruptedException e) {
                System.out.println(threadName + " interrupted");
                return;
            }
        }
        System.out.println(threadName + " finished");
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread("Thread-1");
        MyThread thread2 = new MyThread("Thread-2");
        
        thread1.start();
        thread2.start();
        
        try {
            thread1.join(); // thread1-in bitməsini gözləmək
            thread2.join(); // thread2-nin bitməsini gözləmək
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Main thread finished");
    }
}
```
</details>

### 2. Runnable Interface-ini İmplement Etmək


<details>
<summary>Koda bax</summary>

```java
class MyRunnable implements Runnable {
    private String taskName;
    
    public MyRunnable(String name) {
        this.taskName = name;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(taskName + " - Count: " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println(taskName + " interrupted");
                return;
            }
        }
        System.out.println(taskName + " finished");
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        MyRunnable task1 = new MyRunnable("Task-1");
        MyRunnable task2 = new MyRunnable("Task-2");
        
        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(task2);
        
        thread1.start();
        thread2.start();
        
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Main thread finished");
    }
}
```
</details>

### 3. Lambda Expression ilə


<details>
<summary>Koda bax</summary>

```java
public class LambdaThreadExample {
    public static void main(String[] args) {
        // Lambda expression ilə Runnable yaratmaq
        Runnable task = () -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("Lambda Task - Count: " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        };
        
        Thread thread = new Thread(task);
        thread.start();
        
        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Main thread finished");
    }
}
```
</details>

## Synchronization

Synchronization, bir neçə thread-in eyni resursa eyni zamanda giriş etməsinin qarşısını almaq üçün istifadə olunur.

### Synchronized Methods


<details>
<summary>Koda bax</summary>

```java
class Counter {
    private int count = 0;
    
    // Synchronized method
    public synchronized void increment() {
        count++;
    }
    
    public synchronized void decrement() {
        count--;
    }
    
    public synchronized int getCount() {
        return count;
    }
}

public class SynchronizedMethodExample {
    public static void main(String[] args) {
        Counter counter = new Counter();
        
        // İki thread eyni counter obyektini istifadə edir
        Thread incrementThread = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        
        Thread decrementThread = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.decrement();
            }
        });
        
        incrementThread.start();
        decrementThread.start();
        
        try {
            incrementThread.join();
            decrementThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Final count: " + counter.getCount());
    }
}
```
</details>

### Synchronized Blocks


<details>
<summary>Koda bax</summary>

```java
class BankAccount {
    private double balance;
    private final Object lock = new Object();
    
    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }
    
    public void deposit(double amount) {
        synchronized (lock) {
            System.out.println("Depositing: " + amount);
            balance += amount;
            System.out.println("New balance after deposit: " + balance);
        }
    }
    
    public void withdraw(double amount) {
        synchronized (lock) {
            if (balance >= amount) {
                System.out.println("Withdrawing: " + amount);
                balance -= amount;
                System.out.println("New balance after withdrawal: " + balance);
            } else {
                System.out.println("Insufficient funds for withdrawal: " + amount);
            }
        }
    }
    
    public double getBalance() {
        synchronized (lock) {
            return balance;
        }
    }
}

public class SynchronizedBlockExample {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000.0);
        
        Thread depositThread = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                account.deposit(100.0);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        
        Thread withdrawThread = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                account.withdraw(150.0);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        
        depositThread.start();
        withdrawThread.start();
        
        try {
            depositThread.join();
            withdrawThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Final balance: " + account.getBalance());
    }
}
```
</details>

## Wait və Notify

Wait və notify metodları thread-lər arasında kommunikasiya təmin edir.


<details>
<summary>Koda bax</summary>

```java
class ProducerConsumer {
    private int data;
    private boolean hasData = false;
    private final Object lock = new Object();
    
    public void produce(int value) throws InterruptedException {
        synchronized (lock) {
            while (hasData) {
                lock.wait(); // Consumer data-nı consume edənə qədər gözləmək
            }
            
            data = value;
            hasData = true;
            System.out.println("Produced: " + value);
            lock.notify(); // Consumer-ə signal göndərmək
        }
    }
    
    public int consume() throws InterruptedException {
        synchronized (lock) {
            while (!hasData) {
                lock.wait(); // Producer data produce edənə qədər gözləmək
            }
            
            int value = data;
            hasData = false;
            System.out.println("Consumed: " + value);
            lock.notify(); // Producer-ə signal göndərmək
            return value;
        }
    }
}

public class WaitNotifyExample {
    public static void main(String[] args) {
        ProducerConsumer pc = new ProducerConsumer();
        
        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    pc.produce(i);
                    Thread.sleep(1000);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    pc.consume();
                    Thread.sleep(1500);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        producer.start();
        consumer.start();
        
        try {
            producer.join();
            consumer.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
</details>

## Executor Framework

Executor Framework, thread-lərin idarə edilməsini asanlaşdırır və thread pool-ları təmin edir.

### ThreadPoolExecutor


<details>
<summary>Koda bax</summary>

```java
import java.util.concurrent.*;

public class ExecutorExample {
    public static void main(String[] args) {
        // Fixed thread pool yaratmaq
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // Task-ları submit etmək
        for (int i = 1; i <= 10; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " started by " + 
                                 Thread.currentThread().getName());
                try {
                    Thread.sleep(2000); // 2 saniyə işləmək
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                System.out.println("Task " + taskId + " completed by " + 
                                 Thread.currentThread().getName());
            });
        }
        
        // Executor-u bağlamaq
        executor.shutdown();
        
        try {
            // Bütün task-ların bitməsini gözləmək
            if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
                executor.shutdownNow();
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
        
        System.out.println("All tasks completed");
    }
}
```
</details>

### Future və Callable


<details>
<summary>Koda bax</summary>

```java
import java.util.concurrent.*;
import java.util.ArrayList;
import java.util.List;

public class FutureCallableExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // Callable task-ları yaratmaq
        List<Callable<Integer>> tasks = new ArrayList<>();
        
        for (int i = 1; i <= 5; i++) {
            final int taskId = i;
            tasks.add(() -> {
                System.out.println("Calculating square of " + taskId);
                Thread.sleep(1000); // Simulyasiya üçün gözləmək
                return taskId * taskId;
            });
        }
        
        try {
            // Bütün task-ları submit etmək və nəticələri əldə etmək
            List<Future<Integer>> futures = executor.invokeAll(tasks);
            
            // Nəticələri oxumaq
            for (int i = 0; i < futures.size(); i++) {
                Future<Integer> future = futures.get(i);
                Integer result = future.get(); // Blocking call
                System.out.println("Result of task " + (i + 1) + ": " + result);
            }
            
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        
        executor.shutdown();
    }
}
```
</details>

## Concurrent Collections

Java-da thread-safe kolleksiyalar mövcuddur.

### ConcurrentHashMap


<details>
<summary>Koda bax</summary>

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ConcurrentHashMapExample {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        ExecutorService executor = Executors.newFixedThreadPool(4);
        
        // Müxtəlif thread-lər map-ə data əlavə edir
        for (int i = 0; i < 4; i++) {
            final int threadId = i;
            executor.submit(() -> {
                for (int j = 0; j < 1000; j++) {
                    String key = "Thread-" + threadId + "-Key-" + j;
                    map.put(key, j);
                }
                System.out.println("Thread " + threadId + " finished adding data");
            });
        }
        
        executor.shutdown();
        
        try {
            executor.awaitTermination(10, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Total entries in map: " + map.size());
        
        // Map-dən data oxumaq
        map.forEach((key, value) -> {
            if (value % 100 == 0) {
                System.out.println(key + " = " + value);
            }
        });
    }
}
```
</details>

### BlockingQueue


<details>
<summary>Koda bax</summary>

```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class BlockingQueueExample {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(10);
        
        // Producer thread
        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 20; i++) {
                    queue.put(i); // Blocking operation
                    System.out.println("Produced: " + i);
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        // Consumer thread
        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 20; i++) {
                    Integer value = queue.take(); // Blocking operation
                    System.out.println("Consumed: " + value);
                    Thread.sleep(200);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        producer.start();
        consumer.start();
        
        try {
            producer.join();
            consumer.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Producer-Consumer example completed");
    }
}
```
</details>

## Locks və ReentrantLock


<details>
<summary>Koda bax</summary>

```java
import java.util.concurrent.locks.ReentrantLock;

class SharedResource {
    private int data = 0;
    private final ReentrantLock lock = new ReentrantLock();
    
    public void increment() {
        lock.lock();
        try {
            data++;
            System.out.println("Incremented by " + Thread.currentThread().getName() + 
                             ", value: " + data);
        } finally {
            lock.unlock();
        }
    }
    
    public void decrement() {
        lock.lock();
        try {
            data--;
            System.out.println("Decremented by " + Thread.currentThread().getName() + 
                             ", value: " + data);
        } finally {
            lock.unlock();
        }
    }
    
    public int getData() {
        lock.lock();
        try {
            return data;
        } finally {
            lock.unlock();
        }
    }
}

public class ReentrantLockExample {
    public static void main(String[] args) {
        SharedResource resource = new SharedResource();
        
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                resource.increment();
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }, "Thread-1");
        
        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                resource.decrement();
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }, "Thread-2");
        
        thread1.start();
        thread2.start();
        
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Final value: " + resource.getData());
    }
}
```
</details>

## CompletableFuture

CompletableFuture, asynchronous programming üçün güclü bir vasitədir.


<details>
<summary>Koda bax</summary>

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureExample {
    public static void main(String[] args) {
        // Asynchronous task yaratmaq
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return "Hello";
        });
        
        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return "World";
        });
        
        // İki future-u birləşdirmək
        CompletableFuture<String> combinedFuture = future1.thenCombine(future2, 
            (result1, result2) -> result1 + " " + result2);
        
        // Nəticəni əldə etmək
        try {
            String result = combinedFuture.get();
            System.out.println("Combined result: " + result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        
        // Chain of operations
        CompletableFuture<String> chainedFuture = CompletableFuture
            .supplyAsync(() -> "Java")
            .thenApply(s -> s + " Concurrency")
            .thenApply(s -> s + " is powerful")
            .thenCompose(s -> CompletableFuture.supplyAsync(() -> s.toUpperCase()));
        
        try {
            System.out.println("Chained result: " + chainedFuture.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```
</details>

## Thread Safety Best Practices

1. **Immutable Objects**: Mümkün olduqda immutable obyektlər istifadə edin
2. **Thread-Safe Collections**: ConcurrentHashMap, CopyOnWriteArrayList kimi thread-safe kolleksiyalar istifadə edin
3. **Proper Synchronization**: Synchronized keyword və ya Lock interface-lərini düzgün istifadə edin
4. **Avoid Deadlocks**: Lock-ları həmişə eyni sırada əldə edin
5. **Use Executor Framework**: Thread-ləri manual yaratmaq əvəzinə Executor Framework istifadə edin

