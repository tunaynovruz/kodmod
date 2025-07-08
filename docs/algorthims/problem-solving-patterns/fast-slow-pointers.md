---
title: Fast & Slow Pointers Pattern
description: Fast & Slow Pointers pattern-in ətraflı izahı və nümunələr
slug: fast-slow-pointers-pattern
tags: [algorithms, problem-solving, fast-slow-pointers, linked-list, cycle-detection]
keywords: [fast slow pointers, algorithm pattern, interview problems, cycle detection, tortoise hare]
hide_table_of_contents: false
---

# Fast & Slow Pointers Pattern

## Giriş

Fast & Slow Pointers (Sürətli və Yavaş Göstəricilər) pattern-i, xüsusilə linked list-lərlə işləyərkən istifadə olunan effektiv bir üsuldur. Bu pattern, biri digərindən daha sürətli hərəkət edən iki pointer istifadə edir. Adətən, sürətli pointer yavaş pointerdən iki dəfə daha sürətli hərəkət edir. Bu pattern, Floyd's Cycle-Finding Algorithm və ya "Tortoise and Hare Algorithm" kimi də tanınır.

## Pattern-in Əsas Xüsusiyyətləri

- **İki Fərqli Sürətli Pointer**: Bir yavaş (slow) və bir sürətli (fast) pointer
- **Sürət Fərqi**: Adətən fast pointer, slow pointer-dən iki dəfə daha sürətli hərəkət edir
- **Məkan Effektivliyi**: O(1) əlavə məkan istifadə edir
- **Dövr Aşkarlama**: Xüsusilə linked list-lərdə dövr aşkarlamaq üçün effektivdir

## Fast & Slow Pointers Pattern-in Tətbiq Sahələri

1. **Cycle Detection**: Linked list-də dövr olub-olmadığını aşkarlamaq
2. **Cycle Start Point**: Dövrün başlanğıc nöqtəsini tapmaq
3. **Middle of Linked List**: Linked list-in ortasını tapmaq
4. **Palindrome Linked List**: Linked list-in palindrome olub-olmadığını yoxlamaq
5. **Nth Node From End**: Linked list-in sonundan n-ci node-u tapmaq

## Nümunə Problemlər və Həllər

### 1. Linked List-də Dövr Aşkarlama

**Problem**: Verilmiş linked list-də dövr olub-olmadığını təyin edin.

**Həll**:

```java
public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
        return false;
    }
    
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;          // 1 addım irəli
        fast = fast.next.next;     // 2 addım irəli
        
        if (slow == fast) {        // Əgər pointerlər görüşürsə, dövr var
            return true;
        }
    }
    
    return false;                  // Fast pointer sona çatdı, dövr yoxdur
}
```

### 2. Dövrün Başlanğıc Nöqtəsini Tapmaq

**Problem**: Linked list-də dövr varsa, dövrün başlanğıc nöqtəsini tapın.

**Həll**:

```java
public ListNode detectCycle(ListNode head) {
    if (head == null || head.next == null) {
        return null;
    }
    
    // Dövr aşkarlama
    ListNode slow = head;
    ListNode fast = head;
    boolean hasCycle = false;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow == fast) {
            hasCycle = true;
            break;
        }
    }
    
    if (!hasCycle) {
        return null;
    }
    
    // Dövrün başlanğıcını tapmaq
    slow = head;
    while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    return slow;  // Dövrün başlanğıc nöqtəsi
}
```

### 3. Linked List-in Ortasını Tapmaq

**Problem**: Linked list-in ortasındakı node-u tapın.

**Həll**:

```java
public ListNode middleNode(ListNode head) {
    if (head == null) {
        return null;
    }
    
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;          // 1 addım irəli
        fast = fast.next.next;     // 2 addım irəli
    }
    
    return slow;  // Orta node
}
```

### 4. Palindrome Linked List

**Problem**: Linked list-in palindrome olub-olmadığını yoxlayın.

**Həll**:

```java
public boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) {
        return true;
    }
    
    // Orta nöqtəni tapmaq
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // İkinci yarını çevirmək
    ListNode secondHalf = reverseList(slow.next);
    ListNode firstHalf = head;
    
    // İki yarını müqayisə etmək
    while (secondHalf != null) {
        if (firstHalf.val != secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }
    
    return true;
}

private ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: Əksər hallarda O(n), burada n linked list-in uzunluğudur
- **Məkan Mürəkkəbliyi**: O(1), çünki yalnız bir neçə pointer istifadə olunur

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
- Məkan effektivliyi yüksəkdir
- Linked list problemlərində xüsusilə faydalıdır
- Dövr aşkarlama üçün optimal həll təqdim edir

### Çatışmazlıqlar
- Yalnız müəyyən növ problemlər üçün uyğundur
- Bəzi hallarda əlavə keçidlər tələb edə bilər
- Mürəkkəb linked list əməliyyatları üçün əlavə məntiq tələb edə bilər

## Nəticə

Fast & Slow Pointers pattern-i, xüsusilə linked list problemlərini həll edərkən, məkan effektivliyini qoruyaraq dövr aşkarlama və digər əlaqəli məsələləri həll etmək üçün güclü bir üsuldur. Bu pattern-i başa düşmək və tətbiq etmək, müsahibə problemlərini həll etmək üçün vacib bir bacarıqdır.