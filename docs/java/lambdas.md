---
draft: true
title: Java Lambda İfadələri
description: Java-da Lambda ifadələri, funksional interfeyslər və Stream API ilə istifadəsi
slug: java-lambdas
tags: [java, lambdas, functional-programming]
keywords: [java lambdas, functional interfaces, method references, stream api]
hide_table_of_contents: false
---

# Java Lambda İfadələri

## Lambda İfadələri Nədir?

Lambda ifadələri, Java 8 ilə təqdim edilmiş, anonim funksiyaları yaratmaq üçün qısa sintaksis təmin edən bir xüsusiyyətdir. Lambda ifadələri, funksional proqramlaşdırma paradiqmasını Java-ya gətirir və kodun daha qısa, daha oxunaqlı və daha funksional olmasına imkan verir.

Lambda ifadələri, əsasən funksional interfeyslər ilə işləyir. Funksional interfeys, yalnız bir abstract metodu olan interfeys deməkdir.

## Lambda İfadələrinin Sintaksisi

Lambda ifadəsinin ümumi sintaksisi belədir:

```
(parametrlər) -> ifadə
```

və ya

```
(parametrlər) -> { ifadələr; }
```

Nümunələr:


<details>
<summary>Koda bax</summary>

```java
// Parametrsiz lambda
Runnable r = () -> System.out.println("Salam, Dünya!");

// Bir parametrli lambda
Consumer<String> c = (name) -> System.out.println("Salam, " + name);

// Bir parametrli lambda (mötərizələr istəyə bağlıdır)
Consumer<String> c2 = name -> System.out.println("Salam, " + name);

// İki parametrli lambda
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Bir neçə ifadəli lambda
Comparator<String> comp = (s1, s2) -> {
    int result = s1.length() - s2.length();
    if (result == 0) {
        result = s1.compareTo(s2);
    }
    return result;
};
```
</details>

## Funksional İnterfeyslər

Java 8, `java.util.function` paketində bir sıra hazır funksional interfeyslər təqdim edir:

### Əsas Funksional İnterfeyslər

1. **``Function<T, R>``**: T tipli arqument qəbul edir və R tipli nəticə qaytarır
   ```java
   Function<String, Integer> length = s -> s.length();
   Integer len = length.apply("Java");  // 4 qaytarır
   ```

2. **``Predicate<T>``**: T tipli arqument qəbul edir və boolean qaytarır
   ```java
   Predicate<String> isEmpty = s -> s.isEmpty();
   boolean result = isEmpty.test("Java");  // false qaytarır
   ```

3. **``Consumer<T>``**: T tipli arqument qəbul edir və heç nə qaytarmır
   ```java
   Consumer<String> print = s -> System.out.println(s);
   print.accept("Java");  // "Java" çap edir
   ```

4. **``Supplier<T>``**: Heç bir arqument qəbul etmir və T tipli nəticə qaytarır
   ```java
   Supplier<Double> random = () -> Math.random();
   Double value = random.get();  // Təsadüfi ədəd qaytarır
   ```

### İki Parametrli Funksional İnterfeyslər

1. **```BiFunction<T, U, R>```**: T və U tipli arqumentlər qəbul edir və R tipli nəticə qaytarır
   ```java
   BiFunction<String, String, String> concat = (s1, s2) -> s1 + s2;
   String result = concat.apply("Java", "Script");  // "JavaScript" qaytarır
   ```

2. **```BiPredicate<T, U>```**: T və U tipli arqumentlər qəbul edir və boolean qaytarır
   ```java
   BiPredicate<String, Integer> checkLength = (s, len) -> s.length() == len;
   boolean result = checkLength.test("Java", 4);  // true qaytarır
   ```

3. **``BiConsumer<T, U>``**: T və U tipli arqumentlər qəbul edir və heç nə qaytarmır
   ```java
   BiConsumer<String, Integer> printWithCount = (s, count) -> {
       for (int i = 0; i < count; i++) {
           System.out.println(s);
       }
   };
   printWithCount.accept("Java", 3);  // "Java" 3 dəfə çap edir
   ```

## Metod İstinadları (Method References)

Metod istinadları, mövcud metodlara istinad etmək üçün daha qısa bir sintaksis təmin edir. Dörd növ metod istinadı var:

1. **Statik metodlara istinad**: `ClassName::staticMethodName`
   ```java
   Function<String, Integer> parseInt = Integer::parseInt;
   Integer num = parseInt.apply("123");  // 123 qaytarır
   ```

2. **Konkret obyektin metodlarına istinad**: `instance::methodName`
   ```java
   String str = "Java";
   Supplier<Integer> getLength = str::length;
   Integer len = getLength.get();  // 4 qaytarır
   ```

3. **Müəyyən tip obyektlərin metodlarına istinad**: `ClassName::methodName`
   ```java
   Function<String, Integer> length = String::length;
   Integer len = length.apply("Java");  // 4 qaytarır
   ```

4. **Konstruktorlara istinad**: `ClassName::new`
   ```java
   Supplier<List<String>> listSupplier = ArrayList::new;
   List<String> list = listSupplier.get();  // Boş ArrayList yaradır
   ```

## Lambda İfadələri və Stream API

Lambda ifadələri, Stream API ilə birlikdə istifadə edildikdə xüsusilə güclüdür. Stream API, kolleksiyalar üzərində funksional əməliyyatlar aparmağa imkan verir.

### Stream API-nin Əsas Metodları

1. **filter**: Şərtə uyğun elementləri seçir
   ```java
   List<String> names = Arrays.asList("Ali", "Vali", "Ayşe", "Mehmet");
   List<String> longNames = names.stream()
                                .filter(name -> name.length() > 3)
                                .collect(Collectors.toList());
   // longNames: ["Ayşe", "Mehmet"]
   ```

2. **map**: Hər elementi çevirmək üçün istifadə olunur
   ```java
   List<String> names = Arrays.asList("Ali", "Vali", "Ayşe");
   List<Integer> nameLengths = names.stream()
                                   .map(String::length)
                                   .collect(Collectors.toList());
   // nameLengths: [3, 4, 4]
   ```

3. **sorted**: Elementləri sıralamaq üçün istifadə olunur
   ```java
   List<String> names = Arrays.asList("Ali", "Vali", "Ayşe");
   List<String> sortedNames = names.stream()
                                  .sorted()
                                  .collect(Collectors.toList());
   // sortedNames: ["Ali", "Ayşe", "Vali"]
   ```

4. **reduce**: Elementləri bir dəyərə yığmaq üçün istifadə olunur
   ```java
   List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
   int sum = numbers.stream()
                   .reduce(0, (a, b) -> a + b);
   // sum: 15
   ```

5. **collect**: Stream-i kolleksiyaya çevirmək üçün istifadə olunur
   ```java
   List<String> names = Arrays.asList("Ali", "Vali", "Ayşe");
   Set<String> nameSet = names.stream()
                             .collect(Collectors.toSet());
   // nameSet: ["Ali", "Vali", "Ayşe"] (Set olaraq)
   ```

### Praktiki Nümunələr

#### Nümunə 1: Ədədlərin cəmi


<details>
<summary>Koda bax</summary>

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Cüt ədədlərin cəmi
int sumOfEvens = numbers.stream()
                       .filter(n -> n % 2 == 0)
                       .mapToInt(Integer::intValue)
                       .sum();
// sumOfEvens: 30 (2 + 4 + 6 + 8 + 10)
```
</details>

#### Nümunə 2: Adların emalı


<details>
<summary>Koda bax</summary>

```java
List<String> names = Arrays.asList("Ali", "Vali", "Ayşe", "Mehmet", "Zeynep");

// A ilə başlayan adların böyük hərflərlə yazılmış siyahısı
List<String> filteredNames = names.stream()
                                 .filter(name -> name.startsWith("A"))
                                 .map(String::toUpperCase)
                                 .collect(Collectors.toList());
// filteredNames: ["ALI", "AYŞE"]
```
</details>

#### Nümunə 3: Statistika


<details>
<summary>Koda bax</summary>

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Statistika hesablamaq
IntSummaryStatistics stats = numbers.stream()
                                   .mapToInt(Integer::intValue)
                                   .summaryStatistics();

System.out.println("Ortalama: " + stats.getAverage());
System.out.println("Maksimum: " + stats.getMax());
System.out.println("Minimum: " + stats.getMin());
System.out.println("Cəm: " + stats.getSum());
System.out.println("Say: " + stats.getCount());
```
</details>

## Lambda İfadələrinin Üstünlükləri

1. **Daha qısa kod**: Lambda ifadələri, anonim siniflərdən daha qısa və daha oxunaqlıdır
2. **Funksional proqramlaşdırma**: Deklarativ proqramlaşdırma üslubuna imkan verir
3. **Paralel emal**: Stream API ilə birlikdə istifadə edildikdə, paralel emalı asanlaşdırır
4. **Daha az boilerplate kod**: Təkrarlanan kod strukturlarını azaldır

## Lambda İfadələrinin Məhdudiyyətləri

1. **Yalnız funksional interfeyslər üçün**: Lambda ifadələri yalnız bir abstract metodu olan interfeyslər üçün istifadə edilə bilər
2. **Dəyişən əhatəsi (Variable Scope)**: Lambda ifadələri yalnız final və ya effektiv final dəyişənlərə çata bilər
3. **this açar sözü**: Lambda ifadələrində this, lambda ifadəsini əhatə edən sinfə istinad edir, anonim siniflərdəki kimi lambda obyektinə deyil

