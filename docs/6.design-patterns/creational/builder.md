---
draft: true
title: Builder Design Pattern
description: Builder design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: builder-design-pattern
tags: [design-patterns, creational, builder, java]
keywords: [builder pattern, design pattern, creational pattern, java]
hide_table_of_contents: false
---

# Builder Design Pattern


Builder Design Pattern, creational design pattern-lərdən biridir və mürəkkəb obyektlərin addım-addım yaradılmasını təmin edir. Bu pattern, eyni yaradılma prosesindən istifadə edərək müxtəlif təmsilçilər yaratmağa imkan verir və yaradılma prosesini məhsulun təmsilindən ayırır.

Builder pattern, xüsusilə çoxlu parametrləri olan obyektlərin yaradılması zamanı faydalıdır. Bu pattern, "telescoping constructor" problemini həll edir və kod-un daha oxunaqlı və maintainable olmasını təmin edir.

## Builder Pattern-nin Əsas Xüsusiyyətləri

- **Addım-addım Yaradılma**: Obyektin yaradılması prosesi bir neçə addıma bölünür
- **Fluent Interface**: Method chaining vasitəsilə daha oxunaqlı kod
- **İmmutable Obyektlər**: Final obyektlər yaradıldıqdan sonra dəyişdirilə bilməz
- **Parametr Validasiyası**: Yaradılma prosesində parametrlərin validasiyası

## Builder Pattern-nin Strukturu

1. **Builder**: Məhsulun yaradılması üçün abstract interface
2. **Concrete Builder**: Builder interface-ni implement edən və məhsulu addım-addım yaradan class
3. **Director**: Builder-i idarə edən və yaradılma prosesini koordinasiya edən class (optional)
4. **Product**: Yaradılan mürəkkəb obyekt

## Java-da Builder Pattern İmplementasiyası

### Sadə Builder Pattern


<details>
<summary>Koda bax</summary>

```java
// Product class
class House {
    private String foundation;
    private String structure;
    private String roof;
    private String interior;

    private House() {}

    @Override
    public String toString() {
        return "House with " + foundation + ", " + structure + ", " + roof + ", and " + interior;
    }

    // Static Builder class
    static class Builder {
        private House house;

        public Builder() {
            house = new House();
        }

        public Builder buildFoundation(String foundation) {
            house.foundation = foundation;
            return this;
        }

        public Builder buildStructure(String structure) {
            house.structure = structure;
            return this;
        }

        public Builder buildRoof(String roof) {
            house.roof = roof;
            return this;
        }

        public Builder buildInterior(String interior) {
            house.interior = interior;
            return this;
        }

        public House build() {
            return house;
        }
    }
}

// Client code
public class BuilderExample {
    public static void main(String[] args) {
        House house = new House.Builder()
                .buildFoundation("Concrete Foundation")
                .buildStructure("Brick Structure")
                .buildRoof("Wooden Roof")
                .buildInterior("Modern Interior")
                .build();

        System.out.println(house);
    }
}
```
</details>

### Director ilə Builder Pattern


<details>
<summary>Koda bax</summary>

```java
// Product
class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;
    private String operatingSystem;

    @Override
    public String toString() {
        return "Computer [CPU=" + cpu + ", RAM=" + ram + ", Storage=" + storage + 
               ", GPU=" + gpu + ", OS=" + operatingSystem + "]";
    }

    // Builder interface
    interface Builder {
        Builder setCPU(String cpu);
        Builder setRAM(String ram);
        Builder setStorage(String storage);
        Builder setGPU(String gpu);
        Builder setOperatingSystem(String os);
        Computer build();
    }

    // Concrete Builder
    static class ComputerBuilder implements Builder {
        private Computer computer;

        public ComputerBuilder() {
            computer = new Computer();
        }

        @Override
        public Builder setCPU(String cpu) {
            computer.cpu = cpu;
            return this;
        }

        @Override
        public Builder setRAM(String ram) {
            computer.ram = ram;
            return this;
        }

        @Override
        public Builder setStorage(String storage) {
            computer.storage = storage;
            return this;
        }

        @Override
        public Builder setGPU(String gpu) {
            computer.gpu = gpu;
            return this;
        }

        @Override
        public Builder setOperatingSystem(String os) {
            computer.operatingSystem = os;
            return this;
        }

        @Override
        public Computer build() {
            return computer;
        }
    }
}

// Director
class ComputerDirector {
    private Computer.Builder builder;

    public ComputerDirector(Computer.Builder builder) {
        this.builder = builder;
    }

    public Computer buildGamingComputer() {
        return builder
                .setCPU("Intel Core i9")
                .setRAM("32GB DDR4")
                .setStorage("2TB SSD")
                .setGPU("NVIDIA RTX 3080")
                .setOperatingSystem("Windows 11")
                .build();
    }

    public Computer buildOfficeComputer() {
        return builder
                .setCPU("Intel Core i5")
                .setRAM("16GB DDR4")
                .setStorage("512GB SSD")
                .setGPU("Integrated Graphics")
                .setOperatingSystem("Windows 10")
                .build();
    }
}

// Client code
public class DirectorBuilderExample {
    public static void main(String[] args) {
        Computer.Builder builder = new Computer.ComputerBuilder();
        ComputerDirector director = new ComputerDirector(builder);

        Computer gamingComputer = director.buildGamingComputer();
        System.out.println("Gaming Computer: " + gamingComputer);

        Computer officeComputer = director.buildOfficeComputer();
        System.out.println("Office Computer: " + officeComputer);
    }
}
```
</details>

### Lombok ilə Builder Pattern

Java-da Lombok kitabxanası istifadə edərək, Builder pattern-i daha asan tətbiq etmək mümkündür:


<details>
<summary>Koda bax</summary>

```java
import lombok.Builder;
import lombok.ToString;

@Builder
@ToString
public class Person {
    private String firstName;
    private String lastName;
    private int age;
    private String address;
    private String phoneNumber;
    private String email;
}

// Client code
public class LombokBuilderExample {
    public static void main(String[] args) {
        Person person = Person.builder()
                .firstName("John")
                .lastName("Doe")
                .age(30)
                .address("123 Main St")
                .phoneNumber("555-1234")
                .email("john.doe@example.com")
                .build();

        System.out.println(person);
    }
}
```
</details>

## Builder Pattern-nin Üstünlükləri

1. **Parametr Sayından Asılı Olmama**: Çoxlu parametrləri olan obyektləri daha asan yaratmaq
2. **Kod Oxunaqlılığı**: Fluent interface sayəsində daha oxunaqlı kod
3. **Immutability**: Final obyektlər immutable ola bilər
4. **Validasiya**: Yaradılma prosesində parametrlərin validasiyası mümkündür
5. **Flexibility**: Eyni yaradılma prosesi ilə müxtəlif təmsilçilər yaratmaq mümkündür

## Builder Pattern-nin Çatışmazlıqları

1. **Kod Həcmi**: Sadə obyektlər üçün əlavə kod yazmaq lazım gəlir
2. **Əlavə Class-lar**: Builder class-ları yaratmaq lazımdır
3. **Mürəkkəblik**: Sadə hallarda pattern-in tətbiqi həddindən artıq mürəkkəb ola bilər

## Builder Pattern-nin İstifadə Sahələri

1. **Çoxlu Parametrli Obyektlər**: Çoxlu parametrləri olan obyektlərin yaradılması
2. **İmmutable Obyektlər**: Immutable obyektlərin yaradılması
3. **Mürəkkəb Yaradılma Prosesi**: Addım-addım yaradılma prosesi tələb edən obyektlər
4. **Parametr Validasiyası**: Yaradılma prosesində parametrlərin validasiyası tələb olunduqda

## Real-World Nümunələr

### StringBuilder

Java-nın özündə olan `StringBuilder` class-ı, Builder pattern-in real nümunəsidir:


<details>
<summary>Koda bax</summary>

```java
public class StringBuilderExample {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder();
        String result = builder.append("Hello")
                           .append(" ")
                           .append("World")
                           .append("!")
                           .toString();
        System.out.println(result); // Hello World!
    }
}
```
</details>

### Document Builder


<details>
<summary>Koda bax</summary>

```java
class Document {
    private String title;
    private String content;
    private String author;
    private String[] tags;
    private LocalDate creationDate;

    private Document() {}

    @Override
    public String toString() {
        return "Document [Title=" + title + ", Author=" + author + 
               ", Creation Date=" + creationDate + ", Tags=" + Arrays.toString(tags) + 
               ", Content=" + (content.length() > 20 ? content.substring(0, 20) + "..." : content) + "]";
    }

    static class Builder {
        private Document document;

        public Builder() {
            document = new Document();
            document.creationDate = LocalDate.now(); // Default value
        }

        public Builder withTitle(String title) {
            document.title = title;
            return this;
        }

        public Builder withContent(String content) {
            document.content = content;
            return this;
        }

        public Builder withAuthor(String author) {
            document.author = author;
            return this;
        }

        public Builder withTags(String... tags) {
            document.tags = tags;
            return this;
        }

        public Builder withCreationDate(LocalDate date) {
            document.creationDate = date;
            return this;
        }

        public Document build() {
            // Validation
            if (document.title == null || document.title.isEmpty()) {
                throw new IllegalStateException("Title cannot be empty");
            }
            if (document.content == null) {
                document.content = "";
            }
            return document;
        }
    }
}

// Client code
public class DocumentBuilderExample {
    public static void main(String[] args) {
        Document document = new Document.Builder()
                .withTitle("Builder Pattern")
                .withAuthor("John Doe")
                .withContent("This is a document about the Builder pattern in Java.")
                .withTags("design-pattern", "java", "builder")
                .build();

        System.out.println(document);
    }
}
```
</details>

