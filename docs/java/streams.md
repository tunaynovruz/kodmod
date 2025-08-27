---
draft: true
title: Java Streams API
description: Java Streams API-nin ətraflı izahı və istifadə nümunələri
slug: java-streams
tags: [java, streams, functional-programming, lambda]
keywords: [java streams, stream api, map, filter, reduce, lambda, functional programming]
hide_table_of_contents: false
---

# Java Streams API

## Giriş

Java Streams API, Java 8-də təqdim edilmiş və kolleksiyalar üzərində deklarativ əməliyyatlar aparmağa imkan verən güclü bir vasitədir. Streams API, data-nın emalını funksional proqramlaşdırma üslubunda həyata keçirməyə imkan verir və kod-un daha qısa, oxunaqlı və maintainable olmasını təmin edir.

Stream, data elementlərinin ardıcıllığıdır və kolleksiyalardan fərqli olaraq, elementləri saxlamır, onları emal edir. Streams API, filter, map, reduce, collect kimi əməliyyatları dəstəkləyir və parallel emal imkanı təqdim edir.

## Stream-in Əsas Xüsusiyyətləri

1. **Deklarativ**: Nəyin ediləcəyini təyin edir, necə ediləcəyini yox
2. **Funksional**: Funksional proqramlaşdırma prinsiplərini dəstəkləyir
3. **Lazy Evaluation**: Əməliyyatlar yalnız lazım olduqda yerinə yetirilir
4. **Parallelizm**: Parallel emal imkanı təqdim edir
5. **Pipeline**: Əməliyyatlar pipeline şəklində birləşdirilə bilər

## Stream Yaratmaq

Java-da stream yaratmağın bir neçə yolu var:

### Kolleksiyadan Stream Yaratmaq

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class StreamCreationExample {
    public static void main(String[] args) {
        // List-dən stream yaratmaq
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Mary");
        Stream<String> nameStream = names.stream();
        
        // Array-dən stream yaratmaq
        String[] countries = {"USA", "UK", "Germany", "France", "Japan"};
        Stream<String> countryStream = Arrays.stream(countries);
        
        // Stream.of() metodu ilə stream yaratmaq
        Stream<Integer> numberStream = Stream.of(1, 2, 3, 4, 5);
        
        // Stream.iterate() metodu ilə sonsuz stream yaratmaq
        Stream<Integer> infiniteStream = Stream.iterate(0, n -> n + 2);
        
        // Stream.generate() metodu ilə sonsuz stream yaratmaq
        Stream<Double> randomStream = Stream.generate(Math::random);
        
        // Sonsuz stream-ləri limit() ilə məhdudlaşdırmaq
        Stream<Integer> limitedStream = infiniteStream.limit(10);
        Stream<Double> limitedRandomStream = randomStream.limit(5);
        
        // Stream-ləri çap etmək
        System.out.println("Names:");
        nameStream.forEach(System.out::println);
        
        System.out.println("\nCountries:");
        countryStream.forEach(System.out::println);
        
        System.out.println("\nNumbers:");
        numberStream.forEach(System.out::println);
        
        System.out.println("\nEven numbers (limited):");
        limitedStream.forEach(System.out::println);
        
        System.out.println("\nRandom numbers (limited):");
        limitedRandomStream.forEach(System.out::println);
    }
}
```

### Primitive Tiplər üçün Stream-lər

Java, primitive tiplər üçün xüsusi stream-lər təqdim edir: `IntStream`, `LongStream` və `DoubleStream`.

```java
import java.util.stream.IntStream;
import java.util.stream.LongStream;
import java.util.stream.DoubleStream;

public class PrimitiveStreamExample {
    public static void main(String[] args) {
        // IntStream yaratmaq
        IntStream intStream1 = IntStream.range(1, 6);      // 1, 2, 3, 4, 5
        IntStream intStream2 = IntStream.rangeClosed(1, 5); // 1, 2, 3, 4, 5
        
        System.out.println("IntStream.range(1, 6):");
        intStream1.forEach(System.out::println);
        
        System.out.println("\nIntStream.rangeClosed(1, 5):");
        intStream2.forEach(System.out::println);
        
        // LongStream yaratmaq
        LongStream longStream = LongStream.rangeClosed(1L, 5L);
        
        System.out.println("\nLongStream.rangeClosed(1L, 5L):");
        longStream.forEach(System.out::println);
        
        // DoubleStream yaratmaq
        DoubleStream doubleStream = DoubleStream.of(1.1, 2.2, 3.3, 4.4, 5.5);
        
        System.out.println("\nDoubleStream.of(1.1, 2.2, 3.3, 4.4, 5.5):");
        doubleStream.forEach(System.out::println);
        
        // Primitive stream-ləri boxed stream-lərə çevirmək
        IntStream intStream3 = IntStream.rangeClosed(1, 5);
        Stream<Integer> boxedStream = intStream3.boxed();
        
        System.out.println("\nBoxed IntStream:");
        boxedStream.forEach(System.out::println);
    }
}
```

## Intermediate Operations (Aralıq Əməliyyatlar)

Intermediate operations, stream üzərində əməliyyatlar aparır və yeni bir stream qaytarır. Bu əməliyyatlar lazy-dir, yəni yalnız terminal operation çağırıldıqda yerinə yetirilir.

### filter()

`filter()` metodu, verilmiş predicate-ə uyğun elementləri seçir.

```java
import java.util.Arrays;
import java.util.List;

public class FilterExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Mary", "Anna");
        
        // 'A' ilə başlayan adları filter etmək
        System.out.println("Names starting with 'A':");
        names.stream()
             .filter(name -> name.startsWith("A"))
             .forEach(System.out::println);
        
        // 4 hərfdən çox olan adları filter etmək
        System.out.println("\nNames with more than 4 characters:");
        names.stream()
             .filter(name -> name.length() > 4)
             .forEach(System.out::println);
        
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Cüt ədədləri filter etmək
        System.out.println("\nEven numbers:");
        numbers.stream()
               .filter(n -> n % 2 == 0)
               .forEach(System.out::println);
        
        // 5-dən böyük tək ədədləri filter etmək
        System.out.println("\nOdd numbers greater than 5:");
        numbers.stream()
               .filter(n -> n > 5)
               .filter(n -> n % 2 != 0)
               .forEach(System.out::println);
    }
}
```

### map()

`map()` metodu, hər elementi başqa bir elementə çevirir.

```java
import java.util.Arrays;
import java.util.List;

public class MapExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Mary");
        
        // Adları böyük hərflərə çevirmək
        System.out.println("Names in uppercase:");
        names.stream()
             .map(String::toUpperCase)
             .forEach(System.out::println);
        
        // Adların uzunluğunu əldə etmək
        System.out.println("\nName lengths:");
        names.stream()
             .map(String::length)
             .forEach(System.out::println);
        
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Ədədlərin kvadratını hesablamaq
        System.out.println("\nSquares of numbers:");
        numbers.stream()
               .map(n -> n * n)
               .forEach(System.out::println);
        
        // Ədədləri string-ə çevirmək
        System.out.println("\nNumbers as strings:");
        numbers.stream()
               .map(String::valueOf)
               .forEach(System.out::println);
    }
}
```

### flatMap()

`flatMap()` metodu, hər elementi stream-ə çevirir və sonra bütün stream-ləri bir stream-də birləşdirir.

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class FlatMapExample {
    public static void main(String[] args) {
        // Nested list-lər
        List<List<Integer>> nestedNumbers = Arrays.asList(
            Arrays.asList(1, 2, 3),
            Arrays.asList(4, 5, 6),
            Arrays.asList(7, 8, 9)
        );
        
        // flatMap ilə nested list-ləri düzləşdirmək
        System.out.println("Flattened numbers:");
        nestedNumbers.stream()
                     .flatMap(List::stream)
                     .forEach(System.out::println);
        
        // String array-lərinin list-i
        List<String[]> namesArray = Arrays.asList(
            new String[]{"John", "Mary"},
            new String[]{"Alice", "Bob"},
            new String[]{"Tom", "Jerry"}
        );
        
        // flatMap ilə string array-lərini düzləşdirmək
        System.out.println("\nFlattened names:");
        namesArray.stream()
                  .flatMap(array -> Arrays.stream(array))
                  .forEach(System.out::println);
        
        // Cümlələri sözlərə ayırmaq
        List<String> sentences = Arrays.asList(
            "Hello World",
            "Java Streams API",
            "Functional Programming"
        );
        
        // flatMap ilə cümlələri sözlərə ayırmaq
        System.out.println("\nWords from sentences:");
        sentences.stream()
                 .flatMap(sentence -> Arrays.stream(sentence.split(" ")))
                 .forEach(System.out::println);
    }
}
```

### distinct()

`distinct()` metodu, stream-dəki dublikat elementləri silir.

```java
import java.util.Arrays;
import java.util.List;

public class DistinctExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5);
        
        // Unikal ədədləri əldə etmək
        System.out.println("Distinct numbers:");
        numbers.stream()
               .distinct()
               .forEach(System.out::println);
        
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Alice", "John", "Mary");
        
        // Unikal adları əldə etmək
        System.out.println("\nDistinct names:");
        names.stream()
             .distinct()
             .forEach(System.out::println);
    }
}
```

### sorted()

`sorted()` metodu, stream-dəki elementləri sıralayır.

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class SortedExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 3, 8, 1, 9, 2, 7);
        
        // Ədədləri artan sıra ilə sıralamaq
        System.out.println("Numbers in ascending order:");
        numbers.stream()
               .sorted()
               .forEach(System.out::println);
        
        // Ədədləri azalan sıra ilə sıralamaq
        System.out.println("\nNumbers in descending order:");
        numbers.stream()
               .sorted(Comparator.reverseOrder())
               .forEach(System.out::println);
        
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Mary", "Zack");
        
        // Adları əlifba sırası ilə sıralamaq
        System.out.println("\nNames in alphabetical order:");
        names.stream()
             .sorted()
             .forEach(System.out::println);
        
        // Adları uzunluğuna görə sıralamaq
        System.out.println("\nNames sorted by length:");
        names.stream()
             .sorted(Comparator.comparing(String::length))
             .forEach(System.out::println);
        
        // Adları uzunluğuna görə tərsinə sıralamaq
        System.out.println("\nNames sorted by length in descending order:");
        names.stream()
             .sorted(Comparator.comparing(String::length).reversed())
             .forEach(System.out::println);
    }
}
```

### limit() və skip()

`limit()` metodu, stream-dəki elementlərin sayını məhdudlaşdırır, `skip()` metodu isə müəyyən sayda elementi atlayır.

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

public class LimitSkipExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // İlk 5 elementi əldə etmək
        System.out.println("First 5 numbers:");
        numbers.stream()
               .limit(5)
               .forEach(System.out::println);
        
        // İlk 5 elementi atlamaq
        System.out.println("\nNumbers after skipping first 5:");
        numbers.stream()
               .skip(5)
               .forEach(System.out::println);
        
        // İlk 3 elementi atlamaq və sonrakı 4 elementi əldə etmək
        System.out.println("\nSkip 3 and limit to 4:");
        numbers.stream()
               .skip(3)
               .limit(4)
               .forEach(System.out::println);
        
        // 1-dən 100-ə qədər ədədlərdən ilk 10 cüt ədədi əldə etmək
        System.out.println("\nFirst 10 even numbers from 1 to 100:");
        IntStream.rangeClosed(1, 100)
                 .filter(n -> n % 2 == 0)
                 .limit(10)
                 .forEach(System.out::println);
    }
}
```

### peek()

`peek()` metodu, stream-dəki elementlər üzərində əməliyyatlar aparmaq üçün istifadə olunur və debugging məqsədləri üçün faydalıdır.

```java
import java.util.Arrays;
import java.util.List;

public class PeekExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // peek() ilə stream-in emalını izləmək
        System.out.println("Using peek() for debugging:");
        numbers.stream()
               .peek(n -> System.out.println("Initial: " + n))
               .filter(n -> n % 2 == 0)
               .peek(n -> System.out.println("After filter: " + n))
               .map(n -> n * n)
               .peek(n -> System.out.println("After map: " + n))
               .forEach(System.out::println);
    }
}
```

## Terminal Operations (Terminal Əməliyyatlar)

Terminal operations, stream-in emalını başa çatdırır və nəticə qaytarır. Terminal operation çağırıldıqdan sonra, stream istifadə edilmiş sayılır və bir daha istifadə edilə bilməz.

### forEach()

`forEach()` metodu, stream-dəki hər element üçün verilmiş əməliyyatı yerinə yetirir.

```java
import java.util.Arrays;
import java.util.List;

public class ForEachExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Mary");
        
        // forEach() ilə elementləri çap etmək
        System.out.println("Names:");
        names.stream()
             .forEach(System.out::println);
        
        // forEach() ilə custom əməliyyat
        System.out.println("\nGreeting each person:");
        names.stream()
             .forEach(name -> System.out.println("Hello, " + name + "!"));
    }
}
```

### collect()

`collect()` metodu, stream-dəki elementləri kolleksiyaya və ya başqa bir data strukturuna çevirir.

```java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class CollectExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Mary", "Alice");
        
        // Stream-i List-ə çevirmək
        List<String> nameList = names.stream()
                                     .filter(name -> name.length() > 3)
                                     .collect(Collectors.toList());
        System.out.println("Names with length > 3 (List): " + nameList);
        
        // Stream-i Set-ə çevirmək (dublikatları silir)
        Set<String> nameSet = names.stream()
                                   .collect(Collectors.toSet());
        System.out.println("Unique names (Set): " + nameSet);
        
        // Stream-i Map-ə çevirmək
        Map<String, Integer> nameMap = names.stream()
                                           .distinct()
                                           .collect(Collectors.toMap(
                                               name -> name,
                                               String::length
                                           ));
        System.out.println("Name to length map: " + nameMap);
        
        // Stream-i String-ə çevirmək
        String joinedNames = names.stream()
                                 .collect(Collectors.joining(", "));
        System.out.println("Joined names: " + joinedNames);
        
        // Grouping by
        Map<Integer, List<String>> groupedByLength = names.stream()
                                                         .collect(Collectors.groupingBy(String::length));
        System.out.println("Names grouped by length: " + groupedByLength);
        
        // Partitioning by
        Map<Boolean, List<String>> partitionedByLength = names.stream()
                                                             .collect(Collectors.partitioningBy(name -> name.length() > 4));
        System.out.println("Names partitioned by length > 4: " + partitionedByLength);
    }
}
```

### reduce()

`reduce()` metodu, stream-dəki elementləri bir nəticəyə birləşdirir.

```java
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class ReduceExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Ədədlərin cəmini hesablamaq
        int sum = numbers.stream()
                         .reduce(0, (a, b) -> a + b);
        System.out.println("Sum: " + sum);
        
        // Method reference ilə cəmi hesablamaq
        int sum2 = numbers.stream()
                          .reduce(0, Integer::sum);
        System.out.println("Sum (using method reference): " + sum2);
        
        // Ədədlərin hasilini hesablamaq
        int product = numbers.stream()
                             .reduce(1, (a, b) -> a * b);
        System.out.println("Product: " + product);
        
        // Initial value olmadan reduce
        Optional<Integer> optionalSum = numbers.stream()
                                              .reduce(Integer::sum);
        System.out.println("Optional sum: " + optionalSum.orElse(0));
        
        // Ən böyük ədədi tapmaq
        Optional<Integer> max = numbers.stream()
                                      .reduce(Integer::max);
        System.out.println("Max: " + max.orElse(0));
        
        // Ən kiçik ədədi tapmaq
        Optional<Integer> min = numbers.stream()
                                      .reduce(Integer::min);
        System.out.println("Min: " + min.orElse(0));
        
        // String-ləri birləşdirmək
        List<String> letters = Arrays.asList("a", "b", "c", "d", "e");
        String concatenated = letters.stream()
                                    .reduce("", (a, b) -> a + b);
        System.out.println("Concatenated: " + concatenated);
    }
}
```

### count(), anyMatch(), allMatch(), noneMatch()

Bu metodlar, stream-dəki elementlərin sayını və ya müəyyən şərtlərə uyğunluğunu yoxlamaq üçün istifadə olunur.

```java
import java.util.Arrays;
import java.util.List;

public class MatchExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Elementlərin sayını hesablamaq
        long count = numbers.stream()
                           .count();
        System.out.println("Count: " + count);
        
        // Cüt ədədlərin sayını hesablamaq
        long evenCount = numbers.stream()
                               .filter(n -> n % 2 == 0)
                               .count();
        System.out.println("Even count: " + evenCount);
        
        // Hər hansı bir elementin şərtə uyğun olub-olmadığını yoxlamaq
        boolean anyEven = numbers.stream()
                                .anyMatch(n -> n % 2 == 0);
        System.out.println("Any even? " + anyEven);
        
        // Bütün elementlərin şərtə uyğun olub-olmadığını yoxlamaq
        boolean allEven = numbers.stream()
                                .allMatch(n -> n % 2 == 0);
        System.out.println("All even? " + allEven);
        
        // Heç bir elementin şərtə uyğun olmadığını yoxlamaq
        boolean noneNegative = numbers.stream()
                                     .noneMatch(n -> n < 0);
        System.out.println("None negative? " + noneNegative);
    }
}
```

### findFirst() və findAny()

Bu metodlar, stream-dəki elementlərdən birini qaytarır.

```java
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class FindExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // İlk elementi tapmaq
        Optional<Integer> first = numbers.stream()
                                        .findFirst();
        System.out.println("First element: " + first.orElse(0));
        
        // Hər hansı bir elementi tapmaq
        Optional<Integer> any = numbers.stream()
                                      .findAny();
        System.out.println("Any element: " + any.orElse(0));
        
        // İlk cüt ədədi tapmaq
        Optional<Integer> firstEven = numbers.stream()
                                            .filter(n -> n % 2 == 0)
                                            .findFirst();
        System.out.println("First even: " + firstEven.orElse(0));
        
        // Parallel stream-də hər hansı bir cüt ədədi tapmaq
        Optional<Integer> anyEven = numbers.parallelStream()
                                          .filter(n -> n % 2 == 0)
                                          .findAny();
        System.out.println("Any even (parallel): " + anyEven.orElse(0));
    }
}
```

### min() və max()

Bu metodlar, stream-dəki ən kiçik və ən böyük elementləri tapmaq üçün istifadə olunur.

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class MinMaxExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 3, 8, 1, 9, 2, 7);
        
        // Ən kiçik ədədi tapmaq
        Optional<Integer> min = numbers.stream()
                                      .min(Integer::compare);
        System.out.println("Min: " + min.orElse(0));
        
        // Ən böyük ədədi tapmaq
        Optional<Integer> max = numbers.stream()
                                      .max(Integer::compare);
        System.out.println("Max: " + max.orElse(0));
        
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Mary", "Zack");
        
        // Ən qısa adı tapmaq
        Optional<String> shortestName = names.stream()
                                            .min(Comparator.comparing(String::length));
        System.out.println("Shortest name: " + shortestName.orElse(""));
        
        // Ən uzun adı tapmaq
        Optional<String> longestName = names.stream()
                                           .max(Comparator.comparing(String::length));
        System.out.println("Longest name: " + longestName.orElse(""));
    }
}
```

## Parallel Streams

Parallel streams, stream əməliyyatlarını parallel olaraq yerinə yetirməyə imkan verir və çoxlu sayda elementlər üçün performance-ı artıra bilər.

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

public class ParallelStreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Sequential stream
        long startTime = System.currentTimeMillis();
        int sumSequential = numbers.stream()
                                  .reduce(0, Integer::sum);
        long endTime = System.currentTimeMillis();
        System.out.println("Sequential sum: " + sumSequential);
        System.out.println("Sequential time: " + (endTime - startTime) + "ms");
        
        // Parallel stream
        startTime = System.currentTimeMillis();
        int sumParallel = numbers.parallelStream()
                                .reduce(0, Integer::sum);
        endTime = System.currentTimeMillis();
        System.out.println("Parallel sum: " + sumParallel);
        System.out.println("Parallel time: " + (endTime - startTime) + "ms");
        
        // Böyük data set üçün parallel stream
        int n = 10_000_000;
        
        startTime = System.currentTimeMillis();
        long countSequential = IntStream.range(0, n)
                                       .filter(i -> i % 2 == 0)
                                       .count();
        endTime = System.currentTimeMillis();
        System.out.println("Sequential count: " + countSequential);
        System.out.println("Sequential time: " + (endTime - startTime) + "ms");
        
        startTime = System.currentTimeMillis();
        long countParallel = IntStream.range(0, n)
                                     .parallel()
                                     .filter(i -> i % 2 == 0)
                                     .count();
        endTime = System.currentTimeMillis();
        System.out.println("Parallel count: " + countParallel);
        System.out.println("Parallel time: " + (endTime - startTime) + "ms");
    }
}
```

## Real-World Nümunələr

### Fayl Emalı

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class FileProcessingExample {
    public static void main(String[] args) {
        String filePath = "sample.txt"; // Faylın yolunu dəyişdirin
        
        try {
            // Faylı oxumaq və sətirləri stream-ə çevirmək
            Stream<String> lines = Files.lines(Paths.get(filePath));
            
            // Sətirləri çap etmək
            System.out.println("File contents:");
            lines.forEach(System.out::println);
            lines.close();
            
            // Faylı yenidən oxumaq və sözləri saymaq
            lines = Files.lines(Paths.get(filePath));
            long wordCount = lines.flatMap(line -> Arrays.stream(line.split("\\s+")))
                                 .count();
            System.out.println("\nWord count: " + wordCount);
            lines.close();
            
            // Faylı yenidən oxumaq və hər sözün neçə dəfə istifadə olunduğunu hesablamaq
            lines = Files.lines(Paths.get(filePath));
            Map<String, Long> wordFrequency = lines.flatMap(line -> Arrays.stream(line.split("\\s+")))
                                                  .map(word -> word.toLowerCase().replaceAll("[^a-zA-Z]", ""))
                                                  .filter(word -> !word.isEmpty())
                                                  .collect(Collectors.groupingBy(word -> word, Collectors.counting()));
            System.out.println("\nWord frequency:");
            wordFrequency.forEach((word, count) -> System.out.println(word + ": " + count));
            lines.close();
            
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }
}
```

### Data Transformation və Analysis

```java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

class Person {
    private String name;
    private int age;
    private String gender;
    private String department;
    private double salary;
    
    public Person(String name, int age, String gender, String department, double salary) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.department = department;
        this.salary = salary;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getGender() { return gender; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    
    @Override
    public String toString() {
        return name + " (" + age + ", " + gender + ") - " + department + ": $" + salary;
    }
}

public class DataAnalysisExample {
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("John", 35, "Male", "Engineering", 75000),
            new Person("Alice", 28, "Female", "Marketing", 65000),
            new Person("Bob", 42, "Male", "Engineering", 85000),
            new Person("Mary", 31, "Female", "HR", 60000),
            new Person("David", 45, "Male", "Management", 95000),
            new Person("Sarah", 29, "Female", "Engineering", 70000),
            new Person("Michael", 38, "Male", "Marketing", 72000),
            new Person("Emma", 33, "Female", "HR", 62000)
        );
        
        // Orta yaşı hesablamaq
        double averageAge = people.stream()
                                 .mapToInt(Person::getAge)
                                 .average()
                                 .orElse(0);
        System.out.println("Average age: " + averageAge);
        
        // Departamentlərə görə qruplaşdırmaq
        Map<String, List<Person>> byDepartment = people.stream()
                                                      .collect(Collectors.groupingBy(Person::getDepartment));
        System.out.println("\nPeople by department:");
        byDepartment.forEach((dept, list) -> {
            System.out.println(dept + ":");
            list.forEach(person -> System.out.println("  " + person));
        });
        
        // Hər departamentin orta maaşını hesablamaq
        Map<String, Double> avgSalaryByDept = people.stream()
                                                   .collect(Collectors.groupingBy(
                                                       Person::getDepartment,
                                                       Collectors.averagingDouble(Person::getSalary)
                                                   ));
        System.out.println("\nAverage salary by department:");
        avgSalaryByDept.forEach((dept, avgSalary) -> 
            System.out.println(dept + ": $" + String.format("%.2f", avgSalary)));
        
        // Cinsə görə qruplaşdırmaq və orta maaşı hesablamaq
        Map<String, Double> avgSalaryByGender = people.stream()
                                                     .collect(Collectors.groupingBy(
                                                         Person::getGender,
                                                         Collectors.averagingDouble(Person::getSalary)
                                                     ));
        System.out.println("\nAverage salary by gender:");
        avgSalaryByGender.forEach((gender, avgSalary) -> 
            System.out.println(gender + ": $" + String.format("%.2f", avgSalary)));
        
        // Ən yüksək maaşlı işçini tapmaq
        Person highestPaid = people.stream()
                                  .max(java.util.Comparator.comparing(Person::getSalary))
                                  .orElse(null);
        System.out.println("\nHighest paid employee: " + highestPaid);
        
        // Yaşı 30-dan çox olan işçilərin sayını hesablamaq
        long countOver30 = people.stream()
                                .filter(person -> person.getAge() > 30)
                                .count();
        System.out.println("\nNumber of people over 30: " + countOver30);
        
        // Yaşı 30-dan çox olan işçilərin adlarını əldə etmək
        List<String> namesOver30 = people.stream()
                                        .filter(person -> person.getAge() > 30)
                                        .map(Person::getName)
                                        .collect(Collectors.toList());
        System.out.println("\nNames of people over 30: " + namesOver30);
    }
}
```

## Streams API-nin Üstünlükləri

1. **Deklarativ Kod**: Kod-un daha qısa və oxunaqlı olmasını təmin edir
2. **Funksional Proqramlaşdırma**: Funksional proqramlaşdırma prinsiplərini dəstəkləyir
3. **Parallelizm**: Parallel emal imkanı təqdim edir
4. **Lazy Evaluation**: Əməliyyatlar yalnız lazım olduqda yerinə yetirilir
5. **Kod Təkrarının Azaldılması**: Kod təkrarını azaldır və daha maintainable kod yazmağa imkan verir

## Streams API-nin Çatışmazlıqları

1. **Debugging Çətinliyi**: Stream pipeline-ları debug etmək çətin ola bilər
2. **Performance Overhead**: Kiçik data set-lər üçün performance overhead-ı ola bilər
3. **Öyrənmə Əyrisi**: Funksional proqramlaşdırma paradiqmasına alışmaq lazımdır
4. **Mutable State**: Funksional proqramlaşdırmada mutable state-dən qaçmaq lazımdır

## Nəticə

Java Streams API, kolleksiyalar üzərində əməliyyatlar aparmaq üçün güclü və funksional bir vasitədir. Bu API, kod-un daha qısa, oxunaqlı və maintainable olmasını təmin edir və parallel emal imkanı təqdim edir. Streams API-nin düzgün istifadəsi, Java proqramçılarına daha effektiv və funksional kod yazmağa imkan verir.