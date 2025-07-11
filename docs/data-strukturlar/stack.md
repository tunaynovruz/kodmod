---
title: Stack Data Structure
description: Stack data strukturunun ətraflı izahı və Java-da implementasiyası
slug: stack-data-structure
tags: [data-strukturlar, stack, lifo, java]
keywords: [stack, yığın, data struktur, java, lifo]
hide_table_of_contents: false
---

# Stack Data Structure

## Giriş

Stack (yığın) data strukturu LIFO (Last-In-First-Out) prinsipi ilə işləyən bir kolleksiyadır. Real həyatda kitab yığınına bənzəyir - ən son qoyulan kitab ilk götürülür. Stack-ə elementlər yalnız bir tərəfdən (üst) əlavə edilir və çıxarılır.

## Stack-ın Əsas Xüsusiyyətləri

- **LIFO Prinsipi**: Son daxil olan element ilk çıxarılır
- **Əməliyyatlar**: Push (əlavə etmək), Pop (çıxarmaq), Peek (baxmaq)
- **İstifadə sahələri**: Function calls, expression evaluation, undo mechanisms, backtracking algorithms

## Stack-ın Əsas Əməliyyatları

### 1. Push

Stack-in üstünə yeni element əlavə edir.

### 2. Pop

Stack-in üstündən elementi çıxarır və qaytarır.

### 3. Peek/Top

Stack-in üstündəki elementi qaytarır, lakin onu stack-dən çıxarmır.

### 4. isEmpty

Stack-in boş olub-olmadığını yoxlayır.

### 5. Size

Stack-dəki elementlərin sayını qaytarır.

## Stack-ın Java-da İmplementasiyası

Java-da Stack-i bir neçə üsulla implement etmək olar:

### Java Stack Class

```java
import java.util.Stack;

public class StackExample {
    public static void main(String[] args) {
        // Stack yaratmaq
        Stack<String> stack = new Stack<>();
        
        // Elementləri əlavə etmək (push)
        stack.push("Birinci");
        stack.push("İkinci");
        stack.push("Üçüncü");
        
        System.out.println("Stack: " + stack);
        
        // Stack-in üstündəki elementi görmək (peek)
        System.out.println("Stack-in üstündəki element: " + stack.peek());
        
        // Elementi çıxarmaq (pop)
        String poppedElement = stack.pop();
        System.out.println("Çıxarılan element: " + poppedElement);
        System.out.println("Pop-dan sonra stack: " + stack);
        
        // Stack-in ölçüsü
        System.out.println("Stack-in ölçüsü: " + stack.size());
        
        // Stack boşdur?
        System.out.println("Stack boşdur? " + stack.isEmpty());
        
        // Stack-də element axtarmaq
        System.out.println("'Birinci' elementi stack-də var? " + stack.search("Birinci"));
    }
}
```

### Deque ilə Stack

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class DequeAsStackExample {
    public static void main(String[] args) {
        // ArrayDeque ilə Stack yaratmaq
        Deque<Integer> stack = new ArrayDeque<>();
        
        // Elementləri əlavə etmək
        stack.push(10);
        stack.push(20);
        stack.push(30);
        
        System.out.println("Stack: " + stack);
        
        // Elementi çıxarmaq
        int popped = stack.pop();
        System.out.println("Çıxarılan element: " + popped);
        System.out.println("Yeni stack: " + stack);
        
        // Stack-in üstündəki elementi görmək
        System.out.println("Stack-in üstündəki element: " + stack.peek());
    }
}
```

## Stack-ın İmplementasiyası (Sıfırdan)

Stack-ı özümüz də implement edə bilərik:

### Array ilə Stack İmplementasiyası

```java
public class ArrayStack {
    private int maxSize;
    private int[] stackArray;
    private int top;
    
    public ArrayStack(int size) {
        maxSize = size;
        stackArray = new int[maxSize];
        top = -1; // Stack boş olduqda
    }
    
    // Stack-ə element əlavə etmək
    public void push(int value) {
        if (isFull()) {
            throw new IllegalStateException("Stack is full");
        }
        stackArray[++top] = value;
    }
    
    // Stack-dən element çıxarmaq
    public int pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        return stackArray[top--];
    }
    
    // Stack-in üstündəki elementi görmək
    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        return stackArray[top];
    }
    
    // Stack boşdur?
    public boolean isEmpty() {
        return (top == -1);
    }
    
    // Stack doludur?
    public boolean isFull() {
        return (top == maxSize - 1);
    }
    
    // Stack-in ölçüsü
    public int size() {
        return top + 1;
    }
}
```

### LinkedList ilə Stack İmplementasiyası

```java
public class LinkedStack<T> {
    private Node<T> top;
    private int size;
    
    private static class Node<T> {
        T data;
        Node<T> next;
        
        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }
    
    public LinkedStack() {
        top = null;
        size = 0;
    }
    
    // Stack-ə element əlavə etmək
    public void push(T item) {
        Node<T> newNode = new Node<>(item);
        newNode.next = top;
        top = newNode;
        size++;
    }
    
    // Stack-dən element çıxarmaq
    public T pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        
        T data = top.data;
        top = top.next;
        size--;
        return data;
    }
    
    // Stack-in üstündəki elementi görmək
    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        
        return top.data;
    }
    
    // Stack boşdur?
    public boolean isEmpty() {
        return top == null;
    }
    
    // Stack-in ölçüsü
    public int size() {
        return size;
    }
}
```

## Stack-ın İstifadə Sahələri

1. **Function Calls**: Proqramlaşdırmada funksiya çağırışlarının idarə edilməsi
2. **Expression Evaluation**: İfadələrin qiymətləndirilməsi (məsələn, infix, postfix, prefix)
3. **Undo Mechanisms**: Əməliyyatların geri qaytarılması
4. **Backtracking Algorithms**: Geri qayıtma alqoritmləri (məsələn, maze solving)
5. **Syntax Parsing**: Sintaksis təhlili (məsələn, compiler-lər)
6. **Browser History**: Brauzer tarixçəsi

## Stack-ın Praktiki İstifadəsi

### Balanced Parentheses

Stack-ın klassik istifadə sahələrindən biri mötərizələrin balanslaşdırılmasının yoxlanılmasıdır:

```java
public class BalancedParentheses {
    public static boolean isBalanced(String expression) {
        Stack<Character> stack = new Stack<>();
        
        for (int i = 0; i < expression.length(); i++) {
            char current = expression.charAt(i);
            
            if (current == '(' || current == '[' || current == '{') {
                stack.push(current);
            } else if (current == ')' || current == ']' || current == '}') {
                if (stack.isEmpty()) {
                    return false;
                }
                
                char top = stack.pop();
                
                if ((current == ')' && top != '(') || 
                    (current == ']' && top != '[') || 
                    (current == '}' && top != '{')) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
    
    public static void main(String[] args) {
        String expression1 = "{[()]}";
        String expression2 = "{[(])}";
        
        System.out.println(expression1 + " is balanced: " + isBalanced(expression1));
        System.out.println(expression2 + " is balanced: " + isBalanced(expression2));
    }
}
```

### Infix to Postfix Conversion

Stack-ın digər bir istifadə sahəsi infix ifadələrin postfix-ə çevrilməsidir:

```java
public class InfixToPostfix {
    public static int precedence(char ch) {
        switch (ch) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
        }
        return -1;
    }
    
    public static String infixToPostfix(String expression) {
        StringBuilder result = new StringBuilder();
        Stack<Character> stack = new Stack<>();
        
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            
            // Əgər current character operand-dırsa, output-a əlavə et
            if (Character.isLetterOrDigit(c)) {
                result.append(c);
            }
            // Əgər '(' -dırsa, stack-ə push et
            else if (c == '(') {
                stack.push(c);
            }
            // Əgər ')' -dırsa, '(' görənə qədər stack-dən pop et
            else if (c == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result.append(stack.pop());
                }
                
                if (!stack.isEmpty() && stack.peek() != '(') {
                    return "Invalid Expression";
                } else {
                    stack.pop();
                }
            }
            // Operator-dursa
            else {
                while (!stack.isEmpty() && precedence(c) <= precedence(stack.peek())) {
                    result.append(stack.pop());
                }
                stack.push(c);
            }
        }
        
        // Stack-də qalan bütün operatorları pop et
        while (!stack.isEmpty()) {
            if (stack.peek() == '(') {
                return "Invalid Expression";
            }
            result.append(stack.pop());
        }
        
        return result.toString();
    }
    
    public static void main(String[] args) {
        String expression = "a+b*(c^d-e)^(f+g*h)-i";
        System.out.println("Infix: " + expression);
        System.out.println("Postfix: " + infixToPostfix(expression));
    }
}
```

## Stack-ın Mürəkkəbliyi

| Əməliyyat | Time Complexity |
|-----------|-----------------|
| Push      | O(1)            |
| Pop       | O(1)            |
| Peek      | O(1)            |
| isEmpty   | O(1)            |
| Size      | O(1)            |

## Nəticə

Stack, LIFO prinsipi ilə işləyən sadə, lakin güclü bir data strukturudur. Java-da Stack class-ı və ya Deque interface-i ilə implement edilə bilər. Stack data strukturu, xüsusilə geri qayıtma tələb edən alqoritmlər və əməliyyatlar üçün çox faydalıdır.
