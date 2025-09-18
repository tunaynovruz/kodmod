---
draft: true
title: Java-da OOP Əsasları
description: Java-da Obyekt Yönümlü Proqramlaşdırma (OOP) prinsipləri və konseptləri
slug: java-oop
tags: [java, oop, object-oriented-programming]
keywords: [java oop, inheritance, polymorphism, encapsulation, abstraction]
hide_table_of_contents: false
---

# Java-da OOP Əsasları

## Obyekt Yönümlü Proqramlaşdırma (OOP) Nədir?

Obyekt Yönümlü Proqramlaşdırma (OOP), proqram təminatını obyektlər kolleksiyası kimi təşkil edən bir proqramlaşdırma paradiqmasıdır. Java, tam OOP dilidir və bütün OOP prinsiplərini dəstəkləyir.

## OOP-nin Əsas Prinsipləri

Java-da dörd əsas OOP prinsipi var:

### 1. Enkapsulasiya (Encapsulation)

Enkapsulasiya, data və metodların bir vahid içərisində (class) birləşdirilməsi və data-nın gizlədilməsidir. Bu, class-ın daxili vəziyyətini qoruyur və yalnız təyin olunmuş interfeys vasitəsilə əlçatan edir.


<details>
<summary>Koda bax</summary>

```java
public class Student {
    // Private dəyişənlər (data gizlədilməsi)
    private String name;
    private int age;
    
    // Public getter və setter metodları (kontrollü giriş)
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age > 0) {  // Data validasiyası
            this.age = age;
        }
    }
}
```
</details>

### 2. Varislik (Inheritance)

Varislik, bir class-ın (subclass) başqa bir class-dan (superclass) xüsusiyyətlər (dəyişənlər və metodlar) əldə etməsinə imkan verir. Bu, kodun təkrar istifadəsini təmin edir.


<details>
<summary>Koda bax</summary>

```java
// Superclass (Valideyn class)
public class Animal {
    protected String name;
    
    public void eat() {
        System.out.println(name + " yemək yeyir.");
    }
    
    public void sleep() {
        System.out.println(name + " yatır.");
    }
}

// Subclass (Törəmə class)
public class Dog extends Animal {
    public Dog(String name) {
        this.name = name;
    }
    
    public void bark() {
        System.out.println(name + " hürür.");
    }
}

// İstifadə
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Rex");
        dog.eat();   // Animal class-dan miras alınmış metod
        dog.sleep(); // Animal class-dan miras alınmış metod
        dog.bark();  // Dog class-ına məxsus metod
    }
}
```
</details>

### 3. Polimorfizm (Polymorphism)

Polimorfizm, eyni adlı metodun müxtəlif class-larda fərqli davranışlar göstərməsidir. Java-da iki növ polimorfizm var:

#### Compile-time Polimorfizm (Method Overloading)


<details>
<summary>Koda bax</summary>

```java
public class Calculator {
    // Method overloading - eyni adlı, fərqli parametrli metodlar
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}
```
</details>

#### Runtime Polimorfizm (Method Overriding)


<details>
<summary>Koda bax</summary>

```java
// Superclass
public class Shape {
    public void draw() {
        System.out.println("Şəkil çəkilir");
    }
}

// Subclass 1
public class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Dairə çəkilir");
    }
}

// Subclass 2
public class Rectangle extends Shape {
    @Override
    public void draw() {
        System.out.println("Düzbucaqlı çəkilir");
    }
}

// İstifadə
public class Main {
    public static void main(String[] args) {
        Shape shape1 = new Circle();      // Upcasting
        Shape shape2 = new Rectangle();   // Upcasting
        
        shape1.draw();  // "Dairə çəkilir" çap edir
        shape2.draw();  // "Düzbucaqlı çəkilir" çap edir
    }
}
```
</details>

### 4. Abstraksiya (Abstraction)

Abstraksiya, mürəkkəbliyi gizlədərək yalnız əsas xüsusiyyətləri göstərməkdir. Java-da abstraksiya iki yolla əldə edilir: abstract class-lar və interface-lər vasitəsilə.

#### Abstract Class


<details>
<summary>Koda bax</summary>

```java
// Abstract class
public abstract class Vehicle {
    protected String brand;
    
    public Vehicle(String brand) {
        this.brand = brand;
    }
    
    // Abstract metod (implementasiya yoxdur)
    public abstract void move();
    
    // Konkret metod (implementasiya var)
    public void displayBrand() {
        System.out.println("Marka: " + brand);
    }
}

// Konkret subclass
public class Car extends Vehicle {
    public Car(String brand) {
        super(brand);
    }
    
    // Abstract metodun implementasiyası
    @Override
    public void move() {
        System.out.println(brand + " avtomobili hərəkət edir.");
    }
}
```
</details>

#### Interface


<details>
<summary>Koda bax</summary>

```java
// Interface
public interface Drawable {
    void draw();  // Bütün metodlar default olaraq abstract-dır
    
    // Java 8-dən sonra default metodlar da əlavə edilə bilər
    default void display() {
        System.out.println("Obyekt göstərilir");
    }
}

// Interface-i implement edən class
public class Circle implements Drawable {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    // Interface metodunun implementasiyası
    @Override
    public void draw() {
        System.out.println("Radius " + radius + " olan dairə çəkilir");
    }
}
```
</details>

## Java-da Class və Obyektlər

### Class Nədir?

Class, obyektlərin şablonudur. O, data (dəyişənlər) və davranışları (metodlar) təyin edir.


<details>
<summary>Koda bax</summary>

```java
public class Person {
    // Dəyişənlər (data)
    private String name;
    private int age;
    
    // Konstruktor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Metodlar (davranışlar)
    public void introduce() {
        System.out.println("Salam, mənim adım " + name + " və " + age + " yaşım var.");
    }
    
    // Getter və Setter metodları
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
}
```
</details>

### Obyekt Nədir?

Obyekt, class-ın nümunəsidir. Obyektlər `new` açar sözü ilə yaradılır.


<details>
<summary>Koda bax</summary>

```java
public class Main {
    public static void main(String[] args) {
        // Person class-ının obyektlərini yaratmaq
        Person person1 = new Person("Əli", 25);
        Person person2 = new Person("Ayşə", 30);
        
        // Obyektlərin metodlarını çağırmaq
        person1.introduce();  // "Salam, mənim adım Əli və 25 yaşım var." çap edir
        person2.introduce();  // "Salam, mənim adım Ayşə və 30 yaşım var." çap edir
        
        // Getter və setter metodlarından istifadə
        person1.setAge(26);
        System.out.println(person1.getName() + " indi " + person1.getAge() + " yaşındadır.");
    }
}
```
</details>

## Konstruktorlar

Konstruktorlar, obyektləri inicializasiya etmək üçün istifadə olunan xüsusi metodlardır.


<details>
<summary>Koda bax</summary>

```java
public class Box {
    private double width;
    private double height;
    private double depth;
    
    // Parametrsiz konstruktor (default)
    public Box() {
        width = 1;
        height = 1;
        depth = 1;
    }
    
    // Parametrli konstruktor
    public Box(double width, double height, double depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
    
    // Bir parametrli konstruktor (kub)
    public Box(double side) {
        this.width = side;
        this.height = side;
        this.depth = side;
    }
    
    // Metod
    public double volume() {
        return width * height * depth;
    }
}
```
</details>

## `this` və `super` Açar Sözləri

### `this` Açar Sözü

`this` açar sözü cari obyektə istinad edir.


<details>
<summary>Koda bax</summary>

```java
public class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;  // this.name - class dəyişəni, name - parametr
    }
    
    public void printDetails() {
        System.out.println("Ad: " + this.name);
    }
}
```
</details>

### `super` Açar Sözü

`super` açar sözü superclass-a (valideyn class) istinad edir.


<details>
<summary>Koda bax</summary>

```java
public class Animal {
    protected String type;
    
    public Animal(String type) {
        this.type = type;
    }
    
    public void makeSound() {
        System.out.println("Heyvan səs çıxarır");
    }
}

public class Cat extends Animal {
    private String name;
    
    public Cat(String name) {
        super("Pişik");  // Superclass konstruktorunu çağırır
        this.name = name;
    }
    
    @Override
    public void makeSound() {
        super.makeSound();  // Superclass metodunu çağırır
        System.out.println(name + " miyoldayır");
    }
}
```
</details>

