---
draft: true
title: Java Əsasları
description: Java proqramlaşdırma dilinin əsasları və başlanğıc səviyyəli konseptlər
slug: java-basics
tags: [java, basics, introduction]
keywords: [java basics, java introduction, java syntax, java variables, java data types]
hide_table_of_contents: false
---

# Java Əsasları

## Java Nədir?

Java, 1995-ci ildə Sun Microsystems (hal-hazırda Oracle Corporation) tərəfindən yaradılmış, yüksək səviyyəli, obyekt yönümlü, platformadan asılı olmayan proqramlaşdırma dilidir. Java-nın "Write Once, Run Anywhere" (WORA) prinsipi sayəsində, Java proqramları müxtəlif platformalarda (Windows, Linux, Mac və s.) dəyişiklik edilmədən işləyə bilir.

## Java-nın Əsas Xüsusiyyətləri

- **Platformadan asılı olmaması**: Java kodu Java Virtual Machine (JVM) üzərində işləyir
- **Obyekt yönümlü**: Hər şey Java-da obyektlərdir (primitiv data tiplərindən başqa)
- **Sadə**: C və C++ ilə müqayisədə daha sadə sintaksisə malikdir
- **Təhlükəsiz**: JVM sandbox mühitində işləyir
- **Multithreaded**: Eyni zamanda bir neçə əməliyyatı paralel yerinə yetirə bilir
- **Yüksək performanslı**: Just-In-Time (JIT) kompilyator sayəsində sürətli işləyir

## İlk Java Proqramı

Gəlin ənənəvi "Hello World" proqramı ilə başlayaq:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Salam, Dünya!");
    }
}
```

Bu sadə proqramı izah edək:

- `public class HelloWorld`: Proqramın əsas sinifi (class) təyin edilir
- `public static void main(String[] args)`: Proqramın giriş nöqtəsi olan main metodu
- `System.out.println("Salam, Dünya!")`: Konsola "Salam, Dünya!" mətni çap edir

## Java-da Data Tipləri

Java-da iki növ data tipi var:

### 1. Primitiv Data Tipləri

| Tip    | Ölçü    | Dəyər Aralığı                                  | Nümunə       |
|--------|---------|------------------------------------------------|--------------|
| byte   | 8 bit   | -128 to 127                                    | byte a = 10; |
| short  | 16 bit  | -32,768 to 32,767                              | short s = 100; |
| int    | 32 bit  | -2^31 to 2^31-1                                | int i = 1000; |
| long   | 64 bit  | -2^63 to 2^63-1                                | long l = 10000L; |
| float  | 32 bit  | IEEE 754 floating point                        | float f = 3.14f; |
| double | 64 bit  | IEEE 754 floating point                        | double d = 3.14159; |
| char   | 16 bit  | Unicode character                              | char c = 'A'; |
| boolean| 1 bit   | true və ya false                               | boolean b = true; |

### 2. İstinad (Reference) Tipləri

- **Class**: `String name = "Java";`
- **Array**: `int[] numbers = {1, 2, 3};`
- **Interface**: `List<String> list = new ArrayList<>();`

## Dəyişənlər və Operatorlar

### Dəyişənlər

```java
// Dəyişən elan etmək
int age = 25;
String name = "Əli";
double height = 1.75;
boolean isStudent = true;

// Sabitlər (Constants)
final double PI = 3.14159;
```

### Operatorlar

```java
// Riyazi operatorlar
int a = 10;
int b = 5;
int sum = a + b;      // 15
int diff = a - b;     // 5
int product = a * b;  // 50
int quotient = a / b; // 2
int remainder = a % b; // 0

// Müqayisə operatorları
boolean isEqual = (a == b);     // false
boolean isNotEqual = (a != b);  // true
boolean isGreater = (a > b);    // true
boolean isLess = (a < b);       // false

// Məntiqi operatorlar
boolean andResult = (a > 5) && (b < 10);  // true
boolean orResult = (a > 15) || (b < 10);  // true
boolean notResult = !(a == b);            // true
```

## Şərt Operatorları

### if-else

```java
int number = 10;

if (number > 0) {
    System.out.println("Müsbət ədəd");
} else if (number < 0) {
    System.out.println("Mənfi ədəd");
} else {
    System.out.println("Sıfır");
}
```

### switch

```java
int day = 3;
String dayName;

switch (day) {
    case 1:
        dayName = "Bazar ertəsi";
        break;
    case 2:
        dayName = "Çərşənbə axşamı";
        break;
    case 3:
        dayName = "Çərşənbə";
        break;
    case 4:
        dayName = "Cümə axşamı";
        break;
    case 5:
        dayName = "Cümə";
        break;
    case 6:
        dayName = "Şənbə";
        break;
    case 7:
        dayName = "Bazar";
        break;
    default:
        dayName = "Yanlış gün";
}

System.out.println("Bugün " + dayName);
```

## Dövrlər (Loops)

### for

```java
// 1-dən 5-ə qədər ədədləri çap etmək
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
```

### while

```java
// 1-dən 5-ə qədər ədədləri çap etmək
int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
```

### do-while

```java
// 1-dən 5-ə qədər ədədləri çap etmək
int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
```

## Massivlər (Arrays)

```java
// Massiv yaratmaq
int[] numbers = new int[5];
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
numbers[3] = 40;
numbers[4] = 50;

// Qısa yolla massiv yaratmaq
int[] numbers2 = {10, 20, 30, 40, 50};

// Massiv elementlərini çap etmək
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}

// for-each ilə massiv elementlərini çap etmək
for (int number : numbers) {
    System.out.println(number);
}
```

## Metodlar

```java
public class MethodExample {
    // Parametrsiz metod
    public static void sayHello() {
        System.out.println("Salam!");
    }
    
    // Parametrli metod
    public static void greet(String name) {
        System.out.println("Salam, " + name + "!");
    }
    
    // Dəyər qaytaran metod
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        sayHello();
        greet("Əli");
        int sum = add(5, 3);
        System.out.println("Cəm: " + sum);
    }
}
```

## Nəticə

Bu təlimat, Java proqramlaşdırma dilinin əsas konseptlərini əhatə edir. Java-nı öyrənməyə davam etmək üçün, növbəti addım olaraq Obyekt Yönümlü Proqramlaşdırma (OOP) prinsiplərini öyrənmək tövsiyə olunur.