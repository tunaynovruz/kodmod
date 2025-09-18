---
draft: true
title: Fibonacci Alqoritmi
description: Fibonacci ardıcıllığının müxtəlif implementasiyaları və dinamik proqramlaşdırma yanaşmaları
slug: fibonacci-algorithm
tags: [alqoritmlər, fibonacci, dinamik-proqramlaşdırma, rekursiya, java]
keywords: [fibonacci, dynamic programming, memoization, tabulation, recursion]
hide_table_of_contents: false
---

# Fibonacci Alqoritmi


Fibonacci ardıcıllığı, hər bir ədədin özündən əvvəlki iki ədədin cəmi olduğu bir riyazi ardıcıllıqdır. Bu ardıcıllıq 0 və 1 ilə başlayır:

**F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)**

Ardıcıllıq: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

## Müxtəlif Yanaşmalar

### 1. Sadə Rekursiya (Naive Approach)


<details>
<summary>Koda bax</summary>

```java
public class FibonacciNaive {
    
    public static int fibonacci(int n) {
        // Base cases
        if (n <= 1) {
            return n;
        }
        
        // Recursive case
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci ardıcıllığı (Naive):");
        for (int i = 0; i <= 10; i++) {
            System.out.println("F(" + i + ") = " + fibonacci(i));
        }
        
        // Performance test
        long startTime = System.currentTimeMillis();
        int result = fibonacci(40);
        long endTime = System.currentTimeMillis();
        
        System.out.println("F(40) = " + result);
        System.out.println("Vaxt: " + (endTime - startTime) + " ms");
    }
}
```
</details>

**Mürəkkəblik:**
- Time Complexity: O(2^n) - Eksponensial
- Space Complexity: O(n) - Rekursiya stack-i üçün

**Problemlər:**
- Çox yavaş böyük n üçün
- Eyni hesablamalar dəfələrlə təkrarlanır

### 2. Memoization (Top-Down DP)


<details>
<summary>Koda bax</summary>

```java
import java.util.HashMap;
import java.util.Map;

public class FibonacciMemoization {
    private static Map<Integer, Long> memo = new HashMap<>();
    
    public static long fibonacci(int n) {
        // Base cases
        if (n <= 1) {
            return n;
        }
        
        // Check if already computed
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        // Compute and store result
        long result = fibonacci(n - 1) + fibonacci(n - 2);
        memo.put(n, result);
        
        return result;
    }
    
    // Alternative implementation with array
    public static long fibonacciArray(int n) {
        if (n <= 1) return n;
        
        long[] memo = new long[n + 1];
        memo[0] = 0;
        memo[1] = 1;
        
        return fibHelper(n, memo);
    }
    
    private static long fibHelper(int n, long[] memo) {
        if (memo[n] != 0) {
            return memo[n];
        }
        
        memo[n] = fibHelper(n - 1, memo) + fibHelper(n - 2, memo);
        return memo[n];
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci ardıcıllığı (Memoization):");
        
        long startTime = System.currentTimeMillis();
        for (int i = 0; i <= 50; i++) {
            System.out.println("F(" + i + ") = " + fibonacci(i));
        }
        long endTime = System.currentTimeMillis();
        
        System.out.println("Vaxt: " + (endTime - startTime) + " ms");
        
        // Clear memo for next test
        memo.clear();
        
        // Performance test
        startTime = System.currentTimeMillis();
        long result = fibonacci(100);
        endTime = System.currentTimeMillis();
        
        System.out.println("F(100) = " + result);
        System.out.println("Vaxt: " + (endTime - startTime) + " ms");
    }
}
```
</details>

**Mürəkkəblik:**
- Time Complexity: O(n) - Hər dəyər yalnız bir dəfə hesablanır
- Space Complexity: O(n) - Memo table və rekursiya stack-i

### 3. Tabulation (Bottom-Up DP)


<details>
<summary>Koda bax</summary>

```java
public class FibonacciTabulation {
    
    public static long fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        
        // Create DP table
        long[] dp = new long[n + 1];
        
        // Base cases
        dp[0] = 0;
        dp[1] = 1;
        
        // Fill table bottom-up
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // Method to get all Fibonacci numbers up to n
    public static long[] fibonacciSequence(int n) {
        if (n < 0) return new long[0];
        
        long[] fib = new long[n + 1];
        
        if (n >= 0) fib[0] = 0;
        if (n >= 1) fib[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        
        return fib;
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci ardıcıllığı (Tabulation):");
        
        // Get sequence
        long[] sequence = fibonacciSequence(20);
        for (int i = 0; i < sequence.length; i++) {
            System.out.println("F(" + i + ") = " + sequence[i]);
        }
        
        // Performance test
        long startTime = System.currentTimeMillis();
        long result = fibonacci(100);
        long endTime = System.currentTimeMillis();
        
        System.out.println("F(100) = " + result);
        System.out.println("Vaxt: " + (endTime - startTime) + " ms");
    }
}
```
</details>

**Mürəkkəblik:**
- Time Complexity: O(n)
- Space Complexity: O(n) - DP table üçün

### 4. Space Optimized (O(1) Space)


<details>
<summary>Koda bax</summary>

```java
public class FibonacciOptimized {
    
    public static long fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        
        long prev2 = 0; // F(0)
        long prev1 = 1; // F(1)
        long current = 0;
        
        for (int i = 2; i <= n; i++) {
            current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return current;
    }
    
    // Alternative implementation with better variable names
    public static long fibonacciClear(int n) {
        if (n <= 1) return n;
        
        long first = 0;
        long second = 1;
        
        for (int i = 2; i <= n; i++) {
            long next = first + second;
            first = second;
            second = next;
        }
        
        return second;
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci ardıcıllığı (Space Optimized):");
        
        for (int i = 0; i <= 20; i++) {
            System.out.println("F(" + i + ") = " + fibonacci(i));
        }
        
        // Performance test
        long startTime = System.currentTimeMillis();
        long result = fibonacci(100);
        long endTime = System.currentTimeMillis();
        
        System.out.println("F(100) = " + result);
        System.out.println("Vaxt: " + (endTime - startTime) + " ms");
        
        // Test very large numbers
        System.out.println("F(1000) = " + fibonacci(1000));
    }
}
```
</details>

**Mürəkkəblik:**
- Time Complexity: O(n)
- Space Complexity: O(1) - Yalnız bir neçə dəyişən

### 5. Matrix Exponentiation (O(log n))


<details>
<summary>Koda bax</summary>

```java
public class FibonacciMatrix {
    
    // Matrix multiplication
    private static long[][] multiply(long[][] A, long[][] B) {
        long[][] C = new long[2][2];
        
        C[0][0] = A[0][0] * B[0][0] + A[0][1] * B[1][0];
        C[0][1] = A[0][0] * B[0][1] + A[0][1] * B[1][1];
        C[1][0] = A[1][0] * B[0][0] + A[1][1] * B[1][0];
        C[1][1] = A[1][0] * B[0][1] + A[1][1] * B[1][1];
        
        return C;
    }
    
    // Matrix power using binary exponentiation
    private static long[][] matrixPower(long[][] matrix, int n) {
        if (n == 1) {
            return matrix;
        }
        
        if (n % 2 == 0) {
            long[][] half = matrixPower(matrix, n / 2);
            return multiply(half, half);
        } else {
            return multiply(matrix, matrixPower(matrix, n - 1));
        }
    }
    
    public static long fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        
        // Base matrix [[1, 1], [1, 0]]
        long[][] baseMatrix = {{1, 1}, {1, 0}};
        
        // Calculate matrix^(n-1)
        long[][] result = matrixPower(baseMatrix, n - 1);
        
        // F(n) = result[0][0] * F(1) + result[0][1] * F(0)
        //      = result[0][0] * 1 + result[0][1] * 0
        //      = result[0][0]
        return result[0][0];
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci ardıcıllığı (Matrix Exponentiation):");
        
        for (int i = 0; i <= 20; i++) {
            System.out.println("F(" + i + ") = " + fibonacci(i));
        }
        
        // Performance test for large numbers
        long startTime = System.currentTimeMillis();
        long result = fibonacci(100);
        long endTime = System.currentTimeMillis();
        
        System.out.println("F(100) = " + result);
        System.out.println("Vaxt: " + (endTime - startTime) + " ms");
    }
}
```
</details>

**Mürəkkəblik:**
- Time Complexity: O(log n)
- Space Complexity: O(log n) - Rekursiya stack-i üçün

## Performance Müqayisəsi


<details>
<summary>Koda bax</summary>

```java
public class FibonacciComparison {
    
    public static void comparePerformance() {
        int[] testCases = {10, 20, 30, 40, 50};
        
        System.out.println("Performance Müqayisəsi:");
        System.out.println("n\tNaive\t\tMemo\t\tTabulation\tOptimized\tMatrix");
        
        for (int n : testCases) {
            System.out.print(n + "\t");
            
            // Naive (only for small n)
            if (n <= 40) {
                long start = System.nanoTime();
                FibonacciNaive.fibonacci(n);
                long end = System.nanoTime();
                System.out.print((end - start) / 1000 + "μs\t\t");
            } else {
                System.out.print("Too slow\t");
            }
            
            // Memoization
            long start = System.nanoTime();
            FibonacciMemoization.fibonacci(n);
            long end = System.nanoTime();
            System.out.print((end - start) / 1000 + "μs\t\t");
            
            // Tabulation
            start = System.nanoTime();
            FibonacciTabulation.fibonacci(n);
            end = System.nanoTime();
            System.out.print((end - start) / 1000 + "μs\t\t");
            
            // Optimized
            start = System.nanoTime();
            FibonacciOptimized.fibonacci(n);
            end = System.nanoTime();
            System.out.print((end - start) / 1000 + "μs\t\t");
            
            // Matrix
            start = System.nanoTime();
            FibonacciMatrix.fibonacci(n);
            end = System.nanoTime();
            System.out.print((end - start) / 1000 + "μs");
            
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        comparePerformance();
    }
}
```
</details>

## Müsahibə Sualları

### 1. Fibonacci Ardıcıllığının n-ci Elementi
**Sual**: Fibonacci ardıcıllığının n-ci elementini ən effektiv şəkildə necə hesablaya bilərsiniz?
**Cavab**: Space optimized DP yanaşması - O(n) time, O(1) space.

### 2. Fibonacci Ardıcıllığında Cüt Ədədlər
**Sual**: Fibonacci ardıcıllığında ilk n cüt ədədin cəmini tapın.
**LeetCode**: Yoxdur, lakin Project Euler Problem 2-yə bənzəyir.

### 3. Fibonacci Ardıcıllığının Modulu
**Sual**: F(n) mod m-i necə effektiv hesablaya bilərsiniz?
**Cavab**: Hər addımda modulo əməliyyatı tətbiq etmək.

### 4. Fibonacci Matrisi
**Sual**: Matrix exponentiation ilə Fibonacci necə hesablanır?
**Cavab**: [[1,1],[1,0]]^n matrisi istifadə etmək.

### 5. Fibonacci Yoxlaması
**Sual**: Verilmiş ədədin Fibonacci ədədi olub-olmadığını necə yoxlaya bilərsiniz?
**Cavab**: Perfect square yoxlaması və ya binary search.

## LeetCode Problemləri

1. **70. Climbing Stairs** - https://leetcode.com/problems/climbing-stairs/
   (Fibonacci pattern-i istifadə edir)

2. **509. Fibonacci Number** - https://leetcode.com/problems/fibonacci-number/

3. **1137. N-th Tribonacci Number** - https://leetcode.com/problems/n-th-tribonacci-number/
   (Fibonacci-nin genişləndirilmiş versiyası)

## Real-World Tətbiqləri

1. **Təbiət**: Bitki yarpaqlarının düzülüşü, qabıqların spiralları
2. **Riyaziyyat**: Golden ratio ilə əlaqə
3. **Computer Graphics**: Spiral və fraktal generasiyası
4. **Algorithm Design**: DP-nin öyrənilməsi üçün klassik nümunə
5. **Financial Markets**: Fibonacci retracement levels

## Optimizasiya Məsləhətləri

1. **Böyük n üçün**: Matrix exponentiation istifadə edin
2. **Yaddaş məhdudiyyəti**: Space optimized version istifadə edin
3. **Modular arithmetic**: Overflow-dan qaçınmaq üçün
4. **Caching**: Çoxlu sorğu üçün memoization

