---
draft: true
title: Java 8-dən Sonrakı Yeni Xüsusiyyətlər
description: Java 8, 9, 10, 11, 12, 13, 14, 15, 16 və sonrakı versiyalarda təqdim edilmiş yeni xüsusiyyətlər
slug: java-new-features
tags: [java, java8, java9, java10, java11, java12, java13, java14, java15, java16, java17]
keywords: [java new features, java 8, java 9, java 10, java 11, java modules, var, records, sealed classes]
hide_table_of_contents: false
---

# Java 8-dən Sonrakı Yeni Xüsusiyyətlər

Bu səhifədə Java 8 və sonrakı versiyalarda təqdim edilmiş əsas yeni xüsusiyyətlər haqqında məlumat veriləcək.

## Java 8 (2014)

Java 8, Java dilində böyük dəyişikliklər gətirən bir versiya olmuşdur. Əsas yeniliklər:

### 1. Lambda İfadələri

Lambda ifadələri, anonim funksiyaları yaratmaq üçün qısa sintaksis təmin edir.


<details>
<summary>Koda bax</summary>

```java
// Lambda ifadəsi nümunəsi
Runnable r = () -> System.out.println("Salam, Dünya!");

// Funksional interfeys ilə istifadə
List<String> names = Arrays.asList("Ali", "Vali", "Ayşe");
names.forEach(name -> System.out.println(name));
```
</details>

### 2. Stream API

Stream API, kolleksiyalar üzərində funksional əməliyyatlar aparmağa imkan verir.


<details>
<summary>Koda bax</summary>

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Cüt ədədlərin cəmi
int sum = numbers.stream()
                .filter(n -> n % 2 == 0)
                .mapToInt(Integer::intValue)
                .sum();
```
</details>

### 3. Default və Static Metodlar

Interface-lərə default və static metodlar əlavə edilmişdir.


<details>
<summary>Koda bax</summary>

```java
interface Vehicle {
    // Abstract metod
    void accelerate();
    
    // Default metod
    default void turnOnEngine() {
        System.out.println("Mühərrik işə salındı");
    }
    
    // Static metod
    static Vehicle create() {
        return new Car();
    }
}
```
</details>

### 4. Optional Class

Null pointer exception-ların qarşısını almaq üçün Optional class təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
Optional<String> optional = Optional.of("Salam");

// Optional dəyəri yoxlamaq
if (optional.isPresent()) {
    System.out.println(optional.get());
}

// Default dəyər təyin etmək
String value = optional.orElse("Default dəyər");

// Lambda ilə istifadə
optional.ifPresent(s -> System.out.println(s));
```
</details>

### 5. Date/Time API

Yeni Date/Time API (java.time paketi) təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// Cari tarix
LocalDate today = LocalDate.now();

// Müəyyən tarix
LocalDate birthday = LocalDate.of(1990, Month.JANUARY, 1);

// Tarixlər arasındakı fərq
Period period = Period.between(birthday, today);
System.out.println("Yaş: " + period.getYears());

// Cari zaman
LocalTime now = LocalTime.now();

// Tarix və zaman
LocalDateTime dateTime = LocalDateTime.now();

// Timezone ilə tarix və zaman
ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
```
</details>

## Java 9 (2017)

### 1. Module System (Project Jigsaw)

Java Platform Module System (JPMS) təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// module-info.java
module com.example.myapp {
    requires java.base;
    requires java.sql;
    
    exports com.example.myapp.api;
}
```
</details>

### 2. JShell

Java REPL (Read-Eval-Print Loop) - JShell təqdim edilmişdir.

```
$ jshell
jshell> int x = 10
x ==> 10
jshell> x + 5
$2 ==> 15
jshell> /exit
```

### 3. Collection Factory Methods

Kolleksiyalar üçün factory metodları təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// Immutable List yaratmaq
List<String> list = List.of("a", "b", "c");

// Immutable Set yaratmaq
Set<String> set = Set.of("a", "b", "c");

// Immutable Map yaratmaq
Map<String, Integer> map = Map.of("a", 1, "b", 2, "c", 3);
```
</details>

### 4. Stream API Yenilikləri

Stream API-yə yeni metodlar əlavə edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// takeWhile və dropWhile metodları
Stream<String> stream = Stream.of("a", "b", "c", "", "e");
List<String> result = stream.takeWhile(s -> !s.isEmpty())
                           .collect(Collectors.toList());
// result: ["a", "b", "c"]

// iterate metodu
Stream<Integer> numbers = Stream.iterate(1, n -> n <= 10, n -> n + 1);
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```
</details>

### 5. Private Interface Methods

Interface-lərə private metodlar əlavə edilmişdir.


<details>
<summary>Koda bax</summary>

```java
interface MyInterface {
    default void defaultMethod() {
        privateMethod();
    }
    
    private void privateMethod() {
        System.out.println("Private metod");
    }
}
```
</details>

## Java 10 (2018)

### 1. Local-Variable Type Inference (var)

Local dəyişənlər üçün tip çıxarımı (var açar sözü) təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// var açar sözü ilə dəyişən elan etmək
var list = new ArrayList<String>();
var map = new HashMap<String, Integer>();
var name = "Java";

// for loop-da istifadə
for (var i = 0; i < 10; i++) {
    System.out.println(i);
}
```
</details>

### 2. Unmodifiable Collections

Kolleksiyaları dəyişilməz etmək üçün yeni metodlar əlavə edilmişdir.


<details>
<summary>Koda bax</summary>

```java
List<String> list = new ArrayList<>();
list.add("a");
list.add("b");

// Dəyişilməz kolleksiya yaratmaq
List<String> unmodifiableList = List.copyOf(list);
```
</details>

## Java 11 (2018)

### 1. String Class Yenilikləri

String class-a yeni metodlar əlavə edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// isBlank metodu
String s = "  ";
boolean blank = s.isBlank();  // true

// lines metodu
String multiline = "Line 1\nLine 2\nLine 3";
List<String> lines = multiline.lines().collect(Collectors.toList());

// strip, stripLeading, stripTrailing metodları
String text = "  Hello  ";
String stripped = text.strip();  // "Hello"
String leadingStripped = text.stripLeading();  // "Hello  "
String trailingStripped = text.stripTrailing();  // "  Hello"

// repeat metodu
String repeated = "Java".repeat(3);  // "JavaJavaJava"
```
</details>

### 2. HTTP Client API

Yeni HTTP Client API (java.net.http paketi) təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://example.com"))
        .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```
</details>

### 3. Files Class Yenilikləri

Files class-a yeni metodlar əlavə edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// writeString və readString metodları
Path path = Path.of("file.txt");
Files.writeString(path, "Hello, World!");
String content = Files.readString(path);
```
</details>

## Java 12 (2019)

### 1. Switch Expression (Preview)

Switch ifadəsinin yeni sintaksisi təqdim edilmişdir (preview).


<details>
<summary>Koda bax</summary>

```java
// Köhnə switch
String day = "MONDAY";
String result;
switch (day) {
    case "MONDAY":
    case "TUESDAY":
        result = "Weekday";
        break;
    case "SATURDAY":
    case "SUNDAY":
        result = "Weekend";
        break;
    default:
        result = "Invalid";
}

// Yeni switch (Java 12 preview)
String result = switch (day) {
    case "MONDAY", "TUESDAY" -> "Weekday";
    case "SATURDAY", "SUNDAY" -> "Weekend";
    default -> "Invalid";
};
```
</details>

### 2. String Class Yenilikləri

String class-a indent metodu əlavə edilmişdir.


<details>
<summary>Koda bax</summary>

```java
String text = "Hello\nWorld";
String indented = text.indent(4);
// "    Hello
//     World"
```
</details>

## Java 14 (2020)

### 1. Records (Preview)

Records, data-oriented class-lar yaratmaq üçün yeni bir xüsusiyyət təqdim edilmişdir (preview).


<details>
<summary>Koda bax</summary>

```java
// Record elan etmək
record Person(String name, int age) {}

// İstifadə
Person person = new Person("Ali", 30);
String name = person.name();
int age = person.age();
```
</details>

### 2. Pattern Matching for instanceof (Preview)

instanceof üçün pattern matching təqdim edilmişdir (preview).


<details>
<summary>Koda bax</summary>

```java
// Köhnə üsul
if (obj instanceof String) {
    String s = (String) obj;
    // s ilə əməliyyatlar
}

// Yeni üsul (Java 14 preview)
if (obj instanceof String s) {
    // s ilə əməliyyatlar
}
```
</details>

### 3. Switch Expressions (Standard)

Switch expressions standart xüsusiyyət kimi təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
String day = "MONDAY";
String result = switch (day) {
    case "MONDAY", "TUESDAY" -> "Weekday";
    case "SATURDAY", "SUNDAY" -> "Weekend";
    default -> "Invalid";
};
```
</details>

## Java 15 (2020)

### 1. Text Blocks (Standard)

Text blocks standart xüsusiyyət kimi təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// Çox sətirli mətn
String json = """
              {
                  "name": "Ali",
                  "age": 30,
                  "city": "Baku"
              }
              """;
```
</details>

### 2. Sealed Classes (Preview)

Sealed classes təqdim edilmişdir (preview).


<details>
<summary>Koda bax</summary>

```java
// Sealed class elan etmək
sealed class Shape permits Circle, Rectangle, Square {
    // ...
}

// Permitted subclasses
final class Circle extends Shape {
    // ...
}

final class Rectangle extends Shape {
    // ...
}

final class Square extends Shape {
    // ...
}
```
</details>

## Java 16 (2021)

### 1. Records (Standard)

Records standart xüsusiyyət kimi təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// Record elan etmək
record Person(String name, int age) {}

// İstifadə
Person person = new Person("Ali", 30);
String name = person.name();
int age = person.age();
```
</details>

### 2. Pattern Matching for instanceof (Standard)

instanceof üçün pattern matching standart xüsusiyyət kimi təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
if (obj instanceof String s) {
    // s ilə əməliyyatlar
}
```
</details>

### 3. Stream.toList() Metodu

Stream API-yə toList() metodu əlavə edilmişdir.


<details>
<summary>Koda bax</summary>

```java
List<String> names = Arrays.asList("Ali", "Vali", "Ayşe");
List<String> upperNames = names.stream()
                              .map(String::toUpperCase)
                              .toList();
```
</details>

## Java 17 (2021) - LTS

### 1. Sealed Classes (Standard)

Sealed classes standart xüsusiyyət kimi təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
sealed class Shape permits Circle, Rectangle, Square {
    // ...
}

final class Circle extends Shape {
    // ...
}

final class Rectangle extends Shape {
    // ...
}

final class Square extends Shape {
    // ...
}
```
</details>

### 2. Pattern Matching for switch (Preview)

switch üçün pattern matching təqdim edilmişdir (preview).


<details>
<summary>Koda bax</summary>

```java
String result = switch (obj) {
    case Integer i -> "Integer: " + i;
    case String s -> "String: " + s;
    case null -> "null";
    default -> "Unknown";
};
```
</details>

### 3. Random Number Generators

Yeni random number generator interfeyslər və implementasiyalar təqdim edilmişdir.


<details>
<summary>Koda bax</summary>

```java
// Yeni random number generator
RandomGenerator generator = RandomGenerator.getDefault();
int randomInt = generator.nextInt(100);
```
</details>

