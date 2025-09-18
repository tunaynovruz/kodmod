---
draft: true
title: Java Generics
description: Java-da Generics konsepti, istifadəsi və üstünlükləri
slug: java-generics
tags: [java, generics, type-safety]
keywords: [java generics, generic classes, generic methods, wildcards, type erasure]
hide_table_of_contents: false
---

# Java Generics

## Generics Nədir?

Java Generics, Java 5 (JDK 1.5) ilə təqdim edilmiş bir xüsusiyyətdir. Generics, tip təhlükəsizliyini (type safety) təmin etmək və runtime-da baş verə biləcək ClassCastException xətalarını compile time-da aşkar etmək üçün istifadə olunur. Generics, kodun təkrar istifadəsini təmin edir və tip çevirmələrini (casting) azaldır.

## Generics-in Üstünlükləri

1. **Tip Təhlükəsizliyi**: Compile zamanı tip yoxlaması aparılır
2. **Tip Çevirmələrinin Aradan Qaldırılması**: Avtomatik və təhlükəsiz tip çevirmələri
3. **Kodun Təkrar İstifadəsi**: Eyni kodu müxtəlif tiplər üçün istifadə etmək imkanı
4. **Daha Yaxşı Alqoritmlər**: Tip-dən asılı olmayan alqoritmlərin yazılması

## Generic Class-lar

Generic class, bir və ya bir neçə tip parametri olan class-dır. Tip parametri, class yaradılarkən təyin olunur.


<details>
<summary>Koda bax</summary>

```java
// Generic class
public class Box<T> {
    private T value;
    
    public Box(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
    
    public void setValue(T value) {
        this.value = value;
    }
}

// İstifadə
public class Main {
    public static void main(String[] args) {
        // String tipi ilə Box yaratmaq
        Box<String> stringBox = new Box<>("Salam");
        String str = stringBox.getValue();  // Tip çevirməsi lazım deyil
        System.out.println(str);
        
        // Integer tipi ilə Box yaratmaq
        Box<Integer> intBox = new Box<>(123);
        int num = intBox.getValue();  // Avtomatik unboxing
        System.out.println(num);
    }
}
```
</details>

## Generic Metodlar

Generic metodlar, bir və ya bir neçə tip parametri olan metodlardır. Tip parametri, metod çağırılarkən təyin olunur.


<details>
<summary>Koda bax</summary>

```java
public class Util {
    // Generic metod
    public static <T> T getMiddle(T... elements) {
        return elements[elements.length / 2];
    }
    
    // İki parametrli generic metod
    public static <K, V> boolean compare(Pair<K, V> p1, Pair<K, V> p2) {
        return p1.getKey().equals(p2.getKey()) && 
               p1.getValue().equals(p2.getValue());
    }
}

// İstifadə
public class Main {
    public static void main(String[] args) {
        // String tipi ilə metodu çağırmaq
        String middle1 = Util.getMiddle("Alma", "Armud", "Banan", "Gilas", "Ərik");
        System.out.println(middle1);  // "Banan" çap edir
        
        // Integer tipi ilə metodu çağırmaq
        Integer middle2 = Util.getMiddle(1, 2, 3, 4, 5);
        System.out.println(middle2);  // 3 çap edir
    }
}
```
</details>

## Bounded Type Parameters (Məhdud Tip Parametrləri)

Bəzən, generic tip parametrlərini müəyyən tiplərə məhdudlaşdırmaq lazım olur. Bu, `extends` açar sözü ilə edilir.


<details>
<summary>Koda bax</summary>

```java
// Bounded type parameter
public class NumberBox<T extends Number> {
    private T value;
    
    public NumberBox(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
    
    public double getDoubleValue() {
        return value.doubleValue();  // Number class-ının metodu
    }
    
    public boolean isGreaterThan(NumberBox<? extends Number> other) {
        return this.getDoubleValue() > other.getDoubleValue();
    }
}

// İstifadə
public class Main {
    public static void main(String[] args) {
        NumberBox<Integer> intBox = new NumberBox<>(10);
        NumberBox<Double> doubleBox = new NumberBox<>(5.5);
        
        System.out.println(intBox.getDoubleValue());  // 10.0 çap edir
        System.out.println(doubleBox.getDoubleValue());  // 5.5 çap edir
        
        System.out.println(intBox.isGreaterThan(doubleBox));  // true çap edir
        
        // Aşağıdakı kod compile xətası verəcək, çünki String, Number-dən törəmir
        // NumberBox<String> stringBox = new NumberBox<>("Salam");
    }
}
```
</details>

## Multiple Bounds (Çoxlu Məhdudiyyətlər)

Bir tip parametri, bir class və bir neçə interface ilə məhdudlaşdırıla bilər.


<details>
<summary>Koda bax</summary>

```java
interface Printable {
    void print();
}

interface Comparable<T> {
    int compareTo(T other);
}

// Multiple bounds
public class PrintableBox<T extends Number & Printable & Comparable<T>> {
    private T value;
    
    public PrintableBox(T value) {
        this.value = value;
    }
    
    public void printAndCompare(T other) {
        value.print();  // Printable interface-indən
        int result = value.compareTo(other);  // Comparable interface-indən
        System.out.println("Müqayisə nəticəsi: " + result);
    }
}
```
</details>

## Wildcards (Joker Simvollar)

Wildcards, bilinməyən tiplər üçün istifadə olunur və `?` simvolu ilə göstərilir.

### Unbounded Wildcards (Məhdudlaşdırılmamış Joker Simvollar)

`<?>` - hər hansı bir tip ola bilər.


<details>
<summary>Koda bax</summary>

```java
public static void printList(List<?> list) {
    for (Object elem : list) {
        System.out.println(elem);
    }
}

// İstifadə
List<Integer> intList = Arrays.asList(1, 2, 3);
List<String> stringList = Arrays.asList("a", "b", "c");

printList(intList);
printList(stringList);
```
</details>

### Upper Bounded Wildcards (Yuxarı Məhdudlaşdırılmış Joker Simvollar)

`<? extends Type>` - Type və ya onun alt tipləri ola bilər.


<details>
<summary>Koda bax</summary>

```java
public static double sumOfList(List<? extends Number> list) {
    double sum = 0.0;
    for (Number num : list) {
        sum += num.doubleValue();
    }
    return sum;
}

// İstifadə
List<Integer> intList = Arrays.asList(1, 2, 3);
List<Double> doubleList = Arrays.asList(1.1, 2.2, 3.3);

System.out.println(sumOfList(intList));  // 6.0 çap edir
System.out.println(sumOfList(doubleList));  // 6.6 çap edir
```
</details>

### Lower Bounded Wildcards (Aşağı Məhdudlaşdırılmış Joker Simvollar)

`<? super Type>` - Type və ya onun üst tipləri ola bilər.


<details>
<summary>Koda bax</summary>

```java
public static void addNumbers(List<? super Integer> list) {
    for (int i = 1; i <= 5; i++) {
        list.add(i);
    }
}

// İstifadə
List<Integer> intList = new ArrayList<>();
List<Number> numList = new ArrayList<>();
List<Object> objList = new ArrayList<>();

addNumbers(intList);
addNumbers(numList);
addNumbers(objList);

System.out.println(intList);  // [1, 2, 3, 4, 5] çap edir
System.out.println(numList);  // [1, 2, 3, 4, 5] çap edir
System.out.println(objList);  // [1, 2, 3, 4, 5] çap edir
```
</details>

## Type Erasure (Tip Silinməsi)

Java-da generics, compile zamanı işləyir və runtime-da tip məlumatları silinir. Bu, geriyə uyğunluq (backward compatibility) üçün edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// Compile zamanı
public class Box<T> {
    private T value;
    
    public T getValue() {
        return value;
    }
}

// Runtime zamanı (tip silinməsindən sonra)
public class Box {
    private Object value;
    
    public Object getValue() {
        return value;
    }
}
```
</details>

Type erasure səbəbindən, aşağıdakı məhdudiyyətlər mövcuddur:

1. Generic tip parametrləri ilə instanceof operatoru istifadə edilə bilməz
2. Generic massivlər yaradıla bilməz
3. Generic exception class-ları yaradıla bilməz
4. Generic enum-lar yaradıla bilməz
5. Static kontekstdə generic tip parametrləri istifadə edilə bilməz

## Generic Tiplər və Collections Framework

Java Collections Framework, generics-dən geniş istifadə edir. Bu, kolleksiyaların tip təhlükəsizliyini təmin edir.


<details>
<summary>Koda bax</summary>

```java
// Tip təhlükəsiz kolleksiyalar
List<String> names = new ArrayList<>();
names.add("Əli");
names.add("Vəli");
names.add("Ayşə");

// Tip çevirməsi lazım deyil
for (String name : names) {
    System.out.println(name);
}

// Map istifadəsi
Map<Integer, String> students = new HashMap<>();
students.put(1, "Əli");
students.put(2, "Vəli");
students.put(3, "Ayşə");

// Tip təhlükəsiz giriş
String student = students.get(2);  // "Vəli" qaytarır
```
</details>

