---
draft: true
title: Prototype Design Pattern
description: Prototype design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: prototype-design-pattern
tags: [design-patterns, creational, prototype, java]
keywords: [prototype pattern, design pattern, creational pattern, java]
hide_table_of_contents: false
---

# Prototype Design Pattern

## Giriş

Prototype Design Pattern, creational design pattern-lərdən biridir və mövcud obyektlərin klonlanması (kopyalanması) vasitəsilə yeni obyektlər yaratmağa imkan verir. Bu pattern, obyektlərin yaradılması prosesini sadələşdirir və performance-ı artırır, çünki yeni obyektlər yaratmaq əvəzinə mövcud obyektləri klonlayır.

Prototype pattern, xüsusilə obyektlərin yaradılması prosesi mürəkkəb və ya resource-intensive olduqda faydalıdır. Bu pattern, həmçinin runtime-da dinamik olaraq obyektlər yaratmağa imkan verir.

## Prototype Pattern-nin Əsas Xüsusiyyətləri

- **Klonlama**: Mövcud obyektlərin kopyalanması vasitəsilə yeni obyektlər yaratmaq
- **Performance**: Yeni obyektlər yaratmaq əvəzinə mövcud obyektləri klonlamaq daha effektivdir
- **Dinamik Yaradılma**: Runtime-da dinamik olaraq obyektlər yaratmaq
- **Inheritance Əvəzinə Composition**: Inheritance əvəzinə composition istifadə etmək

## Prototype Pattern-nin Strukturu

1. **Prototype**: Klonlama əməliyyatını təyin edən interface
2. **Concrete Prototype**: Prototype interface-ni implement edən və özünü klonlayan class
3. **Client**: Prototype-dan klonlar yaradan class

## Java-da Prototype Pattern İmplementasiyası

### Sadə Prototype Pattern

```java
// Prototype interface
interface Shape extends Cloneable {
    Shape clone();
    void draw();
}

// Concrete Prototype classes
class Circle implements Shape {
    private int radius;
    private String color;
    
    public Circle(int radius, String color) {
        this.radius = radius;
        this.color = color;
    }
    
    // Copy constructor
    public Circle(Circle source) {
        this.radius = source.radius;
        this.color = source.color;
    }
    
    @Override
    public Shape clone() {
        return new Circle(this);
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " circle with radius " + radius);
    }
}

class Rectangle implements Shape {
    private int width;
    private int height;
    private String color;
    
    public Rectangle(int width, int height, String color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    
    // Copy constructor
    public Rectangle(Rectangle source) {
        this.width = source.width;
        this.height = source.height;
        this.color = source.color;
    }
    
    @Override
    public Shape clone() {
        return new Rectangle(this);
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " rectangle with width " + width + " and height " + height);
    }
}

// Client code
public class PrototypeExample {
    public static void main(String[] args) {
        // Create original objects
        Circle originalCircle = new Circle(10, "red");
        Rectangle originalRectangle = new Rectangle(20, 30, "blue");
        
        // Clone objects
        Circle clonedCircle = (Circle) originalCircle.clone();
        Rectangle clonedRectangle = (Rectangle) originalRectangle.clone();
        
        // Draw original and cloned objects
        System.out.println("Original objects:");
        originalCircle.draw();
        originalRectangle.draw();
        
        System.out.println("\nCloned objects:");
        clonedCircle.draw();
        clonedRectangle.draw();
    }
}
```

### Prototype Registry ilə Prototype Pattern

```java
import java.util.HashMap;
import java.util.Map;

// Prototype interface
interface Prototype extends Cloneable {
    Prototype clone();
}

// Concrete Prototype
class Document implements Prototype {
    private String content;
    private String format;
    private Map<String, String> metadata;
    
    public Document(String content, String format) {
        this.content = content;
        this.format = format;
        this.metadata = new HashMap<>();
    }
    
    // Copy constructor
    public Document(Document source) {
        this.content = source.content;
        this.format = source.format;
        // Deep copy of metadata
        this.metadata = new HashMap<>(source.metadata);
    }
    
    public void addMetadata(String key, String value) {
        metadata.put(key, value);
    }
    
    @Override
    public Prototype clone() {
        return new Document(this);
    }
    
    @Override
    public String toString() {
        return "Document [Format=" + format + ", Content=" + content + ", Metadata=" + metadata + "]";
    }
}

// Prototype Registry
class DocumentRegistry {
    private Map<String, Document> registry = new HashMap<>();
    
    public void addPrototype(String key, Document document) {
        registry.put(key, document);
    }
    
    public Document getClone(String key) {
        Document document = registry.get(key);
        if (document != null) {
            return (Document) document.clone();
        }
        return null;
    }
}

// Client code
public class PrototypeRegistryExample {
    public static void main(String[] args) {
        // Create prototype registry
        DocumentRegistry registry = new DocumentRegistry();
        
        // Create and register document prototypes
        Document textDocPrototype = new Document("Sample text content", "TXT");
        textDocPrototype.addMetadata("author", "John Doe");
        textDocPrototype.addMetadata("created", "2023-01-15");
        
        Document pdfDocPrototype = new Document("Sample PDF content", "PDF");
        pdfDocPrototype.addMetadata("author", "Jane Smith");
        pdfDocPrototype.addMetadata("created", "2023-02-20");
        pdfDocPrototype.addMetadata("secured", "true");
        
        registry.addPrototype("text", textDocPrototype);
        registry.addPrototype("pdf", pdfDocPrototype);
        
        // Clone documents from registry
        Document textDoc1 = registry.getClone("text");
        Document textDoc2 = registry.getClone("text");
        Document pdfDoc = registry.getClone("pdf");
        
        // Modify cloned documents
        textDoc1.addMetadata("modified", "2023-03-10");
        textDoc2.addMetadata("version", "1.1");
        
        // Print documents
        System.out.println("Text Document 1: " + textDoc1);
        System.out.println("Text Document 2: " + textDoc2);
        System.out.println("PDF Document: " + pdfDoc);
    }
}
```

### Java Cloneable Interface ilə Prototype Pattern

Java-da `Cloneable` interface-i istifadə edərək də Prototype pattern-i tətbiq etmək mümkündür:

```java
import java.util.ArrayList;
import java.util.List;

// Concrete Prototype using Java's Cloneable interface
class User implements Cloneable {
    private String name;
    private int age;
    private List<String> roles;
    
    public User(String name, int age) {
        this.name = name;
        this.age = age;
        this.roles = new ArrayList<>();
    }
    
    public void addRole(String role) {
        roles.add(role);
    }
    
    @Override
    public User clone() {
        try {
            User clone = (User) super.clone();
            // Deep copy of mutable fields
            clone.roles = new ArrayList<>(this.roles);
            return clone;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError("Clone not supported", e);
        }
    }
    
    @Override
    public String toString() {
        return "User [Name=" + name + ", Age=" + age + ", Roles=" + roles + "]";
    }
}

// Client code
public class CloneableExample {
    public static void main(String[] args) {
        // Create original user
        User originalUser = new User("Alice", 30);
        originalUser.addRole("ADMIN");
        originalUser.addRole("USER");
        
        // Clone user
        User clonedUser = originalUser.clone();
        
        // Modify cloned user
        clonedUser.addRole("MANAGER");
        
        // Print users
        System.out.println("Original User: " + originalUser);
        System.out.println("Cloned User: " + clonedUser);
    }
}
```

## Shallow Copy vs Deep Copy

Prototype pattern-də iki növ kopyalama mövcuddur:

### Shallow Copy (Dayaz Kopyalama)

Shallow copy zamanı, obyektin primitive field-ləri kopyalanır, lakin reference field-ləri kopyalanmır, yəni original və klon eyni reference-ları paylaşır.

```java
class ShallowCopyExample implements Cloneable {
    private int id;
    private List<String> items;
    
    public ShallowCopyExample(int id, List<String> items) {
        this.id = id;
        this.items = items;
    }
    
    @Override
    public ShallowCopyExample clone() {
        try {
            return (ShallowCopyExample) super.clone(); // Shallow copy
        } catch (CloneNotSupportedException e) {
            throw new AssertionError("Clone not supported", e);
        }
    }
    
    public void addItem(String item) {
        items.add(item);
    }
    
    @Override
    public String toString() {
        return "ShallowCopyExample [id=" + id + ", items=" + items + "]";
    }
}
```

### Deep Copy (Dərin Kopyalama)

Deep copy zamanı, obyektin bütün field-ləri, o cümlədən reference field-ləri də kopyalanır, yəni original və klon tamamilə ayrı obyektlərdir.

```java
class DeepCopyExample implements Cloneable {
    private int id;
    private List<String> items;
    
    public DeepCopyExample(int id, List<String> items) {
        this.id = id;
        this.items = items;
    }
    
    @Override
    public DeepCopyExample clone() {
        try {
            DeepCopyExample clone = (DeepCopyExample) super.clone();
            // Deep copy of reference fields
            clone.items = new ArrayList<>(this.items);
            return clone;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError("Clone not supported", e);
        }
    }
    
    public void addItem(String item) {
        items.add(item);
    }
    
    @Override
    public String toString() {
        return "DeepCopyExample [id=" + id + ", items=" + items + "]";
    }
}
```

## Prototype Pattern-nin Üstünlükləri

1. **Performance**: Yeni obyektlər yaratmaq əvəzinə mövcud obyektləri klonlamaq daha effektivdir
2. **Dinamik Yaradılma**: Runtime-da dinamik olaraq obyektlər yaratmaq mümkündür
3. **Mürəkkəb Yaradılma Prosesindən Qaçınmaq**: Mürəkkəb yaradılma prosesindən qaçınmaq mümkündür
4. **Inheritance Əvəzinə Composition**: Inheritance əvəzinə composition istifadə etmək mümkündür

## Prototype Pattern-nin Çatışmazlıqları

1. **Mürəkkəb Obyektlərin Klonlanması**: Mürəkkəb obyektlərin klonlanması çətin ola bilər
2. **Circular References**: Circular reference-ları olan obyektlərin klonlanması problemli ola bilər
3. **Deep Copy vs Shallow Copy**: Düzgün kopyalama növünü seçmək lazımdır

## Prototype Pattern-nin İstifadə Sahələri

1. **Mürəkkəb Yaradılma Prosesi**: Obyektlərin yaradılması prosesi mürəkkəb və ya resource-intensive olduqda
2. **Runtime Yaradılma**: Runtime-da dinamik olaraq obyektlər yaratmaq lazım olduqda
3. **Çoxlu Oxşar Obyektlər**: Çoxlu sayda oxşar obyektlər yaratmaq lazım olduqda
4. **Inheritance Əvəzinə Composition**: Inheritance əvəzinə composition istifadə etmək istədikdə

## Real-World Nümunələr

### Object Cloning in Java

Java-da `Object.clone()` metodu, Prototype pattern-in nümunəsidir:

```java
public class CloneExample implements Cloneable {
    private int id;
    private String name;
    
    public CloneExample(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    @Override
    public CloneExample clone() {
        try {
            return (CloneExample) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError("Clone not supported", e);
        }
    }
    
    @Override
    public String toString() {
        return "CloneExample [id=" + id + ", name=" + name + "]";
    }
    
    public static void main(String[] args) {
        CloneExample original = new CloneExample(1, "Original");
        CloneExample clone = original.clone();
        
        System.out.println("Original: " + original);
        System.out.println("Clone: " + clone);
    }
}
```

### Game Character Prototype

```java
import java.util.HashMap;
import java.util.Map;

// Prototype interface
interface Character extends Cloneable {
    Character clone();
    void attack();
}

// Concrete Prototype classes
class Warrior implements Character {
    private String weapon;
    private int health;
    private int attackPower;
    
    public Warrior(String weapon, int health, int attackPower) {
        this.weapon = weapon;
        this.health = health;
        this.attackPower = attackPower;
    }
    
    @Override
    public Character clone() {
        try {
            return (Character) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError("Clone not supported", e);
        }
    }
    
    @Override
    public void attack() {
        System.out.println("Warrior attacks with " + weapon + " for " + attackPower + " damage!");
    }
    
    @Override
    public String toString() {
        return "Warrior [Weapon=" + weapon + ", Health=" + health + ", Attack Power=" + attackPower + "]";
    }
}

class Mage implements Character {
    private String spell;
    private int mana;
    private int magicPower;
    
    public Mage(String spell, int mana, int magicPower) {
        this.spell = spell;
        this.mana = mana;
        this.magicPower = magicPower;
    }
    
    @Override
    public Character clone() {
        try {
            return (Character) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError("Clone not supported", e);
        }
    }
    
    @Override
    public void attack() {
        System.out.println("Mage casts " + spell + " for " + magicPower + " magic damage!");
    }
    
    @Override
    public String toString() {
        return "Mage [Spell=" + spell + ", Mana=" + mana + ", Magic Power=" + magicPower + "]";
    }
}

// Character Registry
class CharacterRegistry {
    private Map<String, Character> characters = new HashMap<>();
    
    public void addCharacter(String key, Character character) {
        characters.put(key, character);
    }
    
    public Character getCharacter(String key) {
        return characters.get(key).clone();
    }
}

// Client code
public class GameCharacterExample {
    public static void main(String[] args) {
        // Create character registry
        CharacterRegistry registry = new CharacterRegistry();
        
        // Create and register character prototypes
        registry.addCharacter("warrior", new Warrior("Sword", 100, 20));
        registry.addCharacter("mage", new Mage("Fireball", 80, 30));
        
        // Create characters from prototypes
        Character warrior1 = registry.getCharacter("warrior");
        Character warrior2 = registry.getCharacter("warrior");
        Character mage = registry.getCharacter("mage");
        
        // Use characters
        System.out.println("Warrior 1: " + warrior1);
        System.out.println("Warrior 2: " + warrior2);
        System.out.println("Mage: " + mage);
        
        warrior1.attack();
        mage.attack();
    }
}
```

## Nəticə

Prototype Design Pattern, mövcud obyektlərin klonlanması vasitəsilə yeni obyektlər yaratmağa imkan verir. Bu pattern, xüsusilə obyektlərin yaradılması prosesi mürəkkəb və ya resource-intensive olduqda, həmçinin runtime-da dinamik olaraq obyektlər yaratmaq lazım olduqda faydalıdır. Java-da Prototype pattern-i tətbiq etmək üçün `Cloneable` interface-i və ya custom klonlama metodları istifadə etmək mümkündür. Pattern-in tətbiqi zamanı shallow copy və deep copy arasındakı fərqi nəzərə almaq lazımdır.