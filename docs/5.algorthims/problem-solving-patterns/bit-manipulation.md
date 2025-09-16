---
draft: true
title: Bit Manipulation Pattern
description: Bit Manipulation pattern-in ətraflı izahı və nümunələr
slug: bit-manipulation-pattern
tags: [algorithms, problem-solving, bit-manipulation, bitwise-operations]
keywords: [bit manipulation, algorithm pattern, interview problems, bitwise operations]
hide_table_of_contents: false
---

# Bit Manipulation Pattern

## Giriş

Bit Manipulation (Bit Manipulyasiyası) pattern-i, ədədləri bit səviyyəsində emal etmək üçün istifadə olunan bir üsuldur. Bu pattern, bitwise operatorlardan (AND, OR, XOR, NOT, Shift) istifadə edərək, ədədlər üzərində müxtəlif əməliyyatları effektiv şəkildə yerinə yetirir. Bit manipulyasiyası, xüsusilə məkan və zaman effektivliyi tələb olunan problemlərdə faydalıdır.

## Pattern-in Əsas Xüsusiyyətləri

- **Bitwise Operatorlar**: ``AND (&), OR (|), XOR (^), NOT (~), Left Shift (&lt;&lt;), Right Shift (&gt;&gt;)``
- **Bit-level Əməliyyatlar**: Bit-lər üzərində əməliyyatlar aparmaq
- **Məkan Effektivliyi**: Bir integer-də çoxlu boolean dəyərləri saxlamaq
- **Zaman Effektivliyi**: Bəzi əməliyyatları daha sürətli yerinə yetirmək
- **Optimization**: Kod optimallaşdırması üçün istifadə olunur

## Bit Manipulation Pattern-in Tətbiq Sahələri

1. **Bit Flags**: Çoxlu boolean dəyərləri bir integer-də saxlamaq
2. **Cryptography**: Şifrələmə alqoritmlərində
3. **Compression**: Data sıxılması
4. **Low-level Programming**: Sistem proqramlaşdırma və drayver yazılması
5. **Optimization**: Riyazi əməliyyatları optimallaşdırmaq

## Əsas Bitwise Operatorlar və Əməliyyatlar

### Bitwise Operatorlar

- **AND (&)**: İki bitin hər ikisi 1 olduqda 1, əks halda 0 qaytarır
- **OR (|)**: İki bitdən ən azı biri 1 olduqda 1, hər ikisi 0 olduqda 0 qaytarır
- **XOR (^)**: İki bit fərqli olduqda 1, eyni olduqda 0 qaytarır
- **NOT (~)**: Bitin dəyərini əksinə çevirir (1 -> 0, 0 -> 1)
- **Left Shift (&lt;&lt;)**: Bitləri sola sürüşdürür, sağdan 0-lar əlavə edir
- **Right Shift (&gt;&gt;)**: Bitləri sağa sürüşdürür, soldan işarə biti (signed) və ya 0 (unsigned) əlavə edir

### Ümumi Bit Əməliyyatları

1. **Bit-i Yoxlamaq**: `(num & (1 &lt;&lt; i)) != 0`
2. **Bit-i Təyin Etmək**: `num |= (1 &lt;&lt; i)`
3. **Bit-i Silmək**: `num &= ~(1 &lt;&lt; i)`
4. **Bit-i Çevirmək**: `num ^= (1 &lt;&lt; i)`
5. **Ən Sağdakı 1 Biti Silmək**: `num & (num - 1)`
6. **Ən Sağdakı 0 Biti Təyin Etmək**: `num | (num + 1)`
7. **İki Qüvvətinə Bölünmə**: `(num & (num - 1)) == 0`

## Nümunə Problemlər və Həllər

### 1. Single Number

**Problem**: Verilmiş bir array-də hər element cüt sayda təkrarlanır, yalnız bir element tək sayda təkrarlanır. Bu elementi tapın.

**Həll**:

```java
public int singleNumber(int[] nums) {
    int result = 0;

    for (int num : nums) {
        result ^= num; // XOR əməliyyatı
    }

    return result;
}
```

### 2. Counting Bits

**Problem**: 0-dan n-ə qədər hər bir ədədin ikili təsvirində neçə 1 biti olduğunu hesablayın.

**Həll**:

```java
public int[] countBits(int n) {
    int[] result = new int[n + 1];

    for (int i = 0; i <= n; i++) {
        result[i] = countOnes(i);
    }

    return result;
}

private int countOnes(int num) {
    int count = 0;

    while (num > 0) {
        num &= (num - 1); // Ən sağdakı 1 biti silir
        count++;
    }

    return count;
}

// Daha effektiv həll (dynamic programming ilə)
public int[] countBits(int n) {
    int[] result = new int[n + 1];

    for (int i = 1; i <= n; i++) {
        // i & (i - 1) ən sağdakı 1 biti silir
        result[i] = result[i & (i - 1)] + 1;
    }

    return result;
}
```

### 3. Power of Two

**Problem**: Verilmiş bir ədədin 2-nin qüvvəti olub-olmadığını təyin edin.

**Həll**:

```java
public boolean isPowerOfTwo(int n) {
    if (n <= 0) {
        return false;
    }

    // 2-nin qüvvəti olan ədədlərin ikili təsvirində yalnız bir 1 biti var
    return (n & (n - 1)) == 0;
}
```

### 4. Bitwise AND of Numbers Range

**Problem**: [m, n] aralığındakı bütün ədədlərin bitwise AND əməliyyatının nəticəsini tapın.

**Həll**:

```java
public int rangeBitwiseAnd(int m, int n) {
    int shift = 0;

    // m və n-in ümumi prefix-ini tapırıq
    while (m < n) {
        m >>= 1;
        n >>= 1;
        shift++;
    }

    // Ümumi prefix-i geri sürüşdürürük
    return m << shift;
}
```

### 5. Sum of Two Integers

**Problem**: İki integer-in cəmini +, - operatorlarından istifadə etmədən hesablayın.

**Həll**:

```java
public int getSum(int a, int b) {
    while (b != 0) {
        // Carry hesablanır
        int carry = a & b;

        // Sum hesablanır (carry nəzərə alınmadan)
        a = a ^ b;

        // Carry-ni sola sürüşdürürük
        b = carry << 1;
    }

    return a;
}
```

## Zaman və Yaddaş Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: Adətən O(1) və ya O(log n), çünki bir integer-də bit sayı məhduddur (32 və ya 64)
- **Yaddaş Mürəkkəbliyi**: Adətən O(1), çünki əlavə məkan istifadəsi minimaldır

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
- Məkan effektivliyi yüksəkdir
- Bəzi əməliyyatları daha sürətli yerinə yetirir
- Sistem səviyyəli proqramlaşdırmada faydalıdır
- Riyazi əməliyyatları optimallaşdırmaq üçün istifadə oluna bilər

### Çatışmazlıqlar
- Kodu oxumaq və başa düşmək çətin ola bilər
- Debugging prosesi mürəkkəbdir
- Platformadan asılı ola bilər (32-bit vs 64-bit)
- Overflow və underflow problemləri yarana bilər

## Nəticə

Bit Manipulation pattern-i, xüsusilə məkan və zaman effektivliyi tələb olunan problemlərdə çox faydalı bir üsuldur. Bu pattern, bitwise operatorlardan istifadə edərək, ədədlər üzərində müxtəlif əməliyyatları effektiv şəkildə yerinə yetirir. Bit manipulyasiyasını başa düşmək və tətbiq etmək, müsahibə problemlərini həll etmək və optimallaşdırılmış kod yazmaq üçün vacib bir bacarıqdır.
