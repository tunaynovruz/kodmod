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

```java
// Lambda ifadəsi nümunəsi
Runnable r = () -> System.out.println("Salam, Dünya!");

// Funksional interfeys ilə istifadə
List<String> names = Arrays.asList("Ali", "Vali", "Ayşe");
names.forEach(name -> System.out.println(name));
```

### 2. Stream API

Stream API, kolleksiyalar üzərində funksional əməliyyatlar aparmağa imkan verir.

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Cüt ədədlərin cəmi
int sum = numbers.stream()
                .filter(n -> n % 2 == 0)
                .mapToInt(Integer::intValue)
                .sum();
```

### 3. Default və Static Metodlar

Interface-lərə default və static metodlar əlavə edilmişdir.

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

### 4. Optional Class

Null pointer exception-ların qarşısını almaq üçün Optional class təqdim edilmişdir.

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

### 5. Date/Time API

Yeni Date/Time API (java.time paketi) təqdim edilmişdir.

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

## Java 9 (2017)

### 1. Module System (Project Jigsaw)

Java Platform Module System (JPMS) təqdim edilmişdir.

```java
// module-info.java
module com.example.myapp {
    requires java.base;
    requires java.sql;
    
    exports com.example.myapp.api;
}
```

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

```java
// Immutable List yaratmaq
List<String> list = List.of("a", "b", "c");

// Immutable Set yaratmaq
Set<String> set = Set.of("a", "b", "c");

// Immutable Map yaratmaq
Map<String, Integer> map = Map.of("a", 1, "b", 2, "c", 3);
```

### 4. Stream API Yenilikləri

Stream API-yə yeni metodlar əlavə edilmişdir.

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

### 5. Private Interface Methods

Interface-lərə private metodlar əlavə edilmişdir.

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

## Java 10 (2018)

### 1. Local-Variable Type Inference (var)

Local dəyişənlər üçün tip çıxarımı (var açar sözü) təqdim edilmişdir.

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

### 2. Unmodifiable Collections

Kolleksiyaları dəyişilməz etmək üçün yeni metodlar əlavə edilmişdir.

```java
List<String> list = new ArrayList<>();
list.add("a");
list.add("b");

// Dəyişilməz kolleksiya yaratmaq
List<String> unmodifiableList = List.copyOf(list);
```

## Java 11 (2018)

### 1. String Class Yenilikləri

String class-a yeni metodlar əlavə edilmişdir.

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

### 2. HTTP Client API

Yeni HTTP Client API (java.net.http paketi) təqdim edilmişdir.

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://example.com"))
        .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

### 3. Files Class Yenilikləri

Files class-a yeni metodlar əlavə edilmişdir.

```java
// writeString və readString metodları
Path path = Path.of("file.txt");
Files.writeString(path, "Hello, World!");
String content = Files.readString(path);
```

## Java 12 (2019)

### 1. Switch Expression (Preview)

Switch ifadəsinin yeni sintaksisi təqdim edilmişdir (preview).

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

### 2. String Class Yenilikləri

String class-a indent metodu əlavə edilmişdir.

```java
String text = "Hello\nWorld";
String indented = text.indent(4);
// "    Hello
//     World"
```

## Java 14 (2020)

### 1. Records (Preview)

Records, data-oriented class-lar yaratmaq üçün yeni bir xüsusiyyət təqdim edilmişdir (preview).

```java
// Record elan etmək
record Person(String name, int age) {}

// İstifadə
Person person = new Person("Ali", 30);
String name = person.name();
int age = person.age();
```

### 2. Pattern Matching for instanceof (Preview)

instanceof üçün pattern matching təqdim edilmişdir (preview).

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

### 3. Switch Expressions (Standard)

Switch expressions standart xüsusiyyət kimi təqdim edilmişdir.

```java
String day = "MONDAY";
String result = switch (day) {
    case "MONDAY", "TUESDAY" -> "Weekday";
    case "SATURDAY", "SUNDAY" -> "Weekend";
    default -> "Invalid";
};
```

## Java 15 (2020)

### 1. Text Blocks (Standard)

Text blocks standart xüsusiyyət kimi təqdim edilmişdir.

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

### 2. Sealed Classes (Preview)

Sealed classes təqdim edilmişdir (preview).

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

## Java 16 (2021)

### 1. Records (Standard)

Records standart xüsusiyyət kimi təqdim edilmişdir.

```java
// Record elan etmək
record Person(String name, int age) {}

// İstifadə
Person person = new Person("Ali", 30);
String name = person.name();
int age = person.age();
```

### 2. Pattern Matching for instanceof (Standard)

instanceof üçün pattern matching standart xüsusiyyət kimi təqdim edilmişdir.

```java
if (obj instanceof String s) {
    // s ilə əməliyyatlar
}
```

### 3. Stream.toList() Metodu

Stream API-yə toList() metodu əlavə edilmişdir.

```java
List<String> names = Arrays.asList("Ali", "Vali", "Ayşe");
List<String> upperNames = names.stream()
                              .map(String::toUpperCase)
                              .toList();
```

## Java 17 (2021) - LTS

### 1. Sealed Classes (Standard)

Sealed classes standart xüsusiyyət kimi təqdim edilmişdir.

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

### 2. Pattern Matching for switch (Preview)

switch üçün pattern matching təqdim edilmişdir (preview).

```java
String result = switch (obj) {
    case Integer i -> "Integer: " + i;
    case String s -> "String: " + s;
    case null -> "null";
    default -> "Unknown";
};
```

### 3. Random Number Generators

Yeni random number generator interfeyslər və implementasiyalar təqdim edilmişdir.

```java
// Yeni random number generator
RandomGenerator generator = RandomGenerator.getDefault();
int randomInt = generator.nextInt(100);
```

## Nəticə

Java 8-dən sonra, Java dili və platforması sürətlə inkişaf etməyə davam etmişdir. Hər yeni versiya ilə, dil daha güclü, daha ifadəli və daha funksional olmuşdur. Bu səhifədə, Java 8-dən Java 17-yə qədər təqdim edilmiş əsas yeni xüsusiyyətlər haqqında qısa məlumat verilmişdir.