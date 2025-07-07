---
title: Dinamik Proqramlaşdırma
description: Dinamik proqramlaşdırma alqoritmlərinin ətraflı izahı və Java implementasiyası
slug: dinamik-proqramlasdirma
tags: [alqoritmlər, dinamik-proqramlaşdırma, dp, java]
keywords: [dynamic programming, dp, memoization, tabulation, optimization]
hide_table_of_contents: false
---

# Dinamik Proqramlaşdırma (Dynamic Programming)

## Giriş

Dinamik Proqramlaşdırma (DP), mürəkkəb problemləri daha kiçik alt-problemlərə bölərək həll edən bir alqoritm dizayn texnikasıdır. DP-nin əsas ideyası, eyni alt-problemləri dəfələrlə həll etmək əvəzinə, onların nəticələrini saxlamaq və yenidən istifadə etməkdir.

## DP-nin Əsas Xüsusiyyətləri

### 1. Optimal Substructure
Problem-in optimal həlli, alt-problemlərin optimal həllərindən qurulur.

### 2. Overlapping Subproblems
Eyni alt-problemlər dəfələrlə qarşıya çıxır.

## DP Yanaşmaları

### 1. Memoization (Top-Down)
Rekursiv yanaşma ilə, nəticələri cache-də saxlamaq.

### 2. Tabulation (Bottom-Up)
İterativ yanaşma ilə, kiçik problemlərdən böyük problemlərə doğru həll etmək.

## Fibonacci Nümunəsi

### Sadə Rekursiya (Inefficient)

```java
public class FibonacciNaive {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci(10): " + fibonacci(10));
        // Time Complexity: O(2^n)
        // Space Complexity: O(n)
    }
}
```

### Memoization ilə

```java
import java.util.HashMap;
import java.util.Map;

public class FibonacciMemoization {
    private static Map<Integer, Integer> memo = new HashMap<>();
    
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int result = fibonacci(n - 1) + fibonacci(n - 2);
        memo.put(n, result);
        
        return result;
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci(50): " + fibonacci(50));
        // Time Complexity: O(n)
        // Space Complexity: O(n)
    }
}
```

### Tabulation ilə

```java
public class FibonacciTabulation {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci(50): " + fibonacci(50));
        // Time Complexity: O(n)
        // Space Complexity: O(n)
    }
}
```

### Space Optimized

```java
public class FibonacciOptimized {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        
        int prev2 = 0;
        int prev1 = 1;
        
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci(50): " + fibonacci(50));
        // Time Complexity: O(n)
        // Space Complexity: O(1)
    }
}
```

## DP Template-ləri

### Memoization Template

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

public class MemoizationTemplate {
    private Map<String, Integer> memo = new HashMap<>();

    public int solve(int... params) {
        String key = Arrays.toString(params);

        if (memo.containsKey(key)) {
            return memo.get(key);
        }

        // Base case
        if (isBaseCase(params)) {
            return getBaseValue(params);
        }

        // Recursive case
        int result = calculateResult(params);
        memo.put(key, result);

        return result;
    }
    
    private boolean isBaseCase(int... params) {
        // Base case logic
        return false;
    }
    
    private int getBaseValue(int... params) {
        // Return base value
        return 0;
    }
    
    private int calculateResult(int... params) {
        // Recurrence relation
        return 0;
    }
}
```

### Tabulation Template

```java
public class TabulationTemplate {

    public int solve(int n) {
        int[] dp = new int[n + 1];

        // Base cases
        dp[0] = 0; // base value
        if (n > 0) dp[1] = 1; // base value

        // Fill the table
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2]; // recurrence relation
        }

        return dp[n];
    }
}
```

## Space Optimization Texnikaları

### 1. Rolling Array
```java
// O(n) space-dən O(1) space-ə keçid
int prev2 = 0; // base value
int prev1 = 1; // base value
for (int i = 2; i <= n; i++) {
    int current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
}
```

### 2. 1D Array for 2D DP
```java
// O(m*n) space-dən O(min(m,n)) space-ə keçid
int[] dp = new int[n + 1];
for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        dp[j] = Math.max(dp[j], dp[j-1] + value);
    }
}
```

## Müsahibə Sualları

### 1. Climbing Stairs (LeetCode 70)
**Sual**: n pillə var. Hər dəfə 1 və ya 2 pillə qalxa bilərsiniz. Neçə fərqli yolla zirvəyə çata bilərsiniz?

### 2. House Robber (LeetCode 198)
**Sual**: Evlərdə pul var. Yan-yana evləri soya bilməzsiniz. Maksimum pulu necə əldə edərsiniz?

### 3. Coin Change (LeetCode 322)
**Sual**: Müəyyən məbləği minimum sayda sikkə ilə necə formalaşdıra bilərsiniz?

### 4. Longest Increasing Subsequence (LeetCode 300)
**Sual**: Array-də ən uzun artan alt-ardıcıllığın uzunluğunu tapın.

### 5. Edit Distance (LeetCode 72)
**Sual**: İki sətiri biri-birinə çevirmək üçün minimum əməliyyat sayını tapın.

## LeetCode Problemləri

1. **70. Climbing Stairs** - https://leetcode.com/problems/climbing-stairs/
2. **198. House Robber** - https://leetcode.com/problems/house-robber/
3. **322. Coin Change** - https://leetcode.com/problems/coin-change/
4. **300. Longest Increasing Subsequence** - https://leetcode.com/problems/longest-increasing-subsequence/
5. **72. Edit Distance** - https://leetcode.com/problems/edit-distance/
6. **1143. Longest Common Subsequence** - https://leetcode.com/problems/longest-common-subsequence/
7. **416. Partition Equal Subset Sum** - https://leetcode.com/problems/partition-equal-subset-sum/
8. **518. Coin Change 2** - https://leetcode.com/problems/coin-change-2/
9. **139. Word Break** - https://leetcode.com/problems/word-break/
10. **152. Maximum Product Subarray** - https://leetcode.com/problems/maximum-product-subarray/

## Ümumi DP Patterns

### 1. Decision Making
```java
// Hər addımda seçim etmək
dp[i] = Math.max(take_it, leave_it);
```

### 2. Path Counting
```java
// Yolların sayını hesablamaq
dp[i][j] = dp[i-1][j] + dp[i][j-1];
```

### 3. String Matching
```java
// Sətir uyğunlaşdırması
if (s1.charAt(i) == s2.charAt(j)) {
    dp[i][j] = dp[i-1][j-1] + 1;
} else {
    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
}
```

### 4. Interval DP
```java
// İnterval üzərində DP
for (int len = 2; len <= n; len++) {
    for (int i = 0; i <= n - len; i++) {
        int j = i + len - 1;
        for (int k = i; k < j; k++) {
            dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k+1][j] + cost);
        }
    }
}
```

## Real-World Tətbiqləri

1. **Resource Allocation**: Resursların optimal bölüşdürülməsi
2. **Financial Planning**: İnvestisiya strategiyalarının optimallaşdırılması
3. **Bioinformatics**: DNA ardıcıllığının analizi
4. **Game Theory**: Oyun strategiyalarının optimallaşdırılması
5. **Network Optimization**: Şəbəkə yollarının optimallaşdırılması

## Mürəkkəblik Analizi

| Problem | Time Complexity | Space Complexity |
|---------|----------------|------------------|
| Fibonacci | O(n) | O(1) optimized |
| Coin Change | O(n*m) | O(n) |
| LCS | O(n*m) | O(n*m) |
| Knapsack | O(n*W) | O(W) optimized |
| Edit Distance | O(n*m) | O(min(n,m)) optimized |

## Nəticə

Dinamik Proqramlaşdırma, optimization problemlərini həll etmək üçün güclü bir texnikadır. Düzgün state definition və recurrence relation ilə mürəkkəb problemləri effektiv şəkildə həll etmək mümkündür. DP-nin mənimsənilməsi alqoritm dizaynında mühüm addımdır və bir çox real dünya problemlərində tətbiq olunur.