---
title: Decorator Design Pattern
description: Decorator design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: decorator-design-pattern
tags: [design-patterns, structural, decorator, java]
keywords: [decorator pattern, design pattern, structural pattern, java]
hide_table_of_contents: false
---

# Decorator Design Pattern

## Giriş

Decorator Design Pattern, structural design pattern-lərdən biridir və mövcud obyektlərə dinamik olaraq əlavə funksionallıq əlavə etməyə imkan verir. Bu pattern, inheritance əvəzinə composition istifadə edərək, obyektlərin davranışını runtime-da dəyişdirməyə imkan verir.

Decorator pattern, "Open/Closed Principle"-i tətbiq edir - class-lar genişləndirmə üçün açıq, dəyişiklik üçün bağlı olmalıdır. Bu pattern, mövcud class-ları dəyişdirmədən onlara yeni funksionallıq əlavə etməyə imkan verir.

## Decorator Pattern-nin Əsas Xüsusiyyətləri

- **Dynamic Functionality Addition**: Runtime-da obyektlərə funksionallıq əlavə etmək
- **Alternative to Subclassing**: Inheritance əvəzinə composition istifadə etmək
- **Flexible Design**: Müxtəlif kombinasiyalarda decorator-lar istifadə etmək
- **Single Responsibility Principle**: Hər bir decorator-un bir məsuliyyəti var

## Decorator Pattern-nin Strukturu

1. **Component**: Həm original obyekt, həm də decorator-lar üçün ümumi interface
2. **Concrete Component**: Component interface-ni implement edən və decorator-lar tərəfindən bəzədiləcək əsas class
3. **Decorator**: Component interface-ni implement edən və Component obyektinə istinad saxlayan abstract class
4. **Concrete Decorator**: Decorator class-ını extend edən və əlavə funksionallıq təqdim edən class

## Java-da Decorator Pattern İmplementasiyası

### Sadə Decorator Pattern Nümunəsi

```java
// Component interface
interface Coffee {
    String getDescription();
    double getCost();
}

// Concrete Component
class SimpleCoffee implements Coffee {
    @Override
    public String getDescription() {
        return "Simple Coffee";
    }
    
    @Override
    public double getCost() {
        return 1.0;
    }
}

// Decorator
abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;
    
    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }
    
    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription();
    }
    
    @Override
    public double getCost() {
        return decoratedCoffee.getCost();
    }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Milk";
    }
    
    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.5;
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Sugar";
    }
    
    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.2;
    }
}

class WhipDecorator extends CoffeeDecorator {
    public WhipDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Whip";
    }
    
    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.7;
    }
}

// Client code
public class CoffeeShop {
    public static void main(String[] args) {
        // Create a simple coffee
        Coffee coffee = new SimpleCoffee();
        System.out.println("Cost: $" + coffee.getCost() + ", Description: " + coffee.getDescription());
        
        // Decorate with milk
        Coffee milkCoffee = new MilkDecorator(coffee);
        System.out.println("Cost: $" + milkCoffee.getCost() + ", Description: " + milkCoffee.getDescription());
        
        // Decorate with milk and sugar
        Coffee milkSugarCoffee = new SugarDecorator(milkCoffee);
        System.out.println("Cost: $" + milkSugarCoffee.getCost() + ", Description: " + milkSugarCoffee.getDescription());
        
        // Decorate with milk, sugar, and whip
        Coffee specialCoffee = new WhipDecorator(milkSugarCoffee);
        System.out.println("Cost: $" + specialCoffee.getCost() + ", Description: " + specialCoffee.getDescription());
        
        // Create a different combination
        Coffee whipCoffee = new WhipDecorator(new SimpleCoffee());
        System.out.println("Cost: $" + whipCoffee.getCost() + ", Description: " + whipCoffee.getDescription());
    }
}
```

### Daha Mürəkkəb Decorator Pattern Nümunəsi

```java
// Component interface
interface DataSource {
    void writeData(String data);
    String readData();
}

// Concrete Component
class FileDataSource implements DataSource {
    private String filename;
    
    public FileDataSource(String filename) {
        this.filename = filename;
    }
    
    @Override
    public void writeData(String data) {
        System.out.println("Writing data to file: " + filename);
        // Actual file writing code would go here
        System.out.println("Data: " + data);
    }
    
    @Override
    public String readData() {
        System.out.println("Reading data from file: " + filename);
        // Actual file reading code would go here
        return "Data from file: " + filename;
    }
}

// Decorator
abstract class DataSourceDecorator implements DataSource {
    protected DataSource wrappee;
    
    public DataSourceDecorator(DataSource source) {
        this.wrappee = source;
    }
    
    @Override
    public void writeData(String data) {
        wrappee.writeData(data);
    }
    
    @Override
    public String readData() {
        return wrappee.readData();
    }
}

// Concrete Decorators
class EncryptionDecorator extends DataSourceDecorator {
    public EncryptionDecorator(DataSource source) {
        super(source);
    }
    
    @Override
    public void writeData(String data) {
        System.out.println("Encrypting data...");
        String encryptedData = encrypt(data);
        wrappee.writeData(encryptedData);
    }
    
    @Override
    public String readData() {
        String encryptedData = wrappee.readData();
        System.out.println("Decrypting data...");
        return decrypt(encryptedData);
    }
    
    private String encrypt(String data) {
        // Simple encryption for demonstration
        StringBuilder encrypted = new StringBuilder();
        for (char c : data.toCharArray()) {
            encrypted.append((char) (c + 1));
        }
        return encrypted.toString();
    }
    
    private String decrypt(String data) {
        // Simple decryption for demonstration
        StringBuilder decrypted = new StringBuilder();
        for (char c : data.toCharArray()) {
            decrypted.append((char) (c - 1));
        }
        return decrypted.toString();
    }
}

class CompressionDecorator extends DataSourceDecorator {
    public CompressionDecorator(DataSource source) {
        super(source);
    }
    
    @Override
    public void writeData(String data) {
        System.out.println("Compressing data...");
        String compressedData = compress(data);
        wrappee.writeData(compressedData);
    }
    
    @Override
    public String readData() {
        String compressedData = wrappee.readData();
        System.out.println("Decompressing data...");
        return decompress(compressedData);
    }
    
    private String compress(String data) {
        // Simple compression for demonstration
        return data.replace("a", "").replace("e", "").replace("i", "").replace("o", "").replace("u", "");
    }
    
    private String decompress(String data) {
        // In a real scenario, decompression would restore the original data
        return data + " (decompressed)";
    }
}

class LoggingDecorator extends DataSourceDecorator {
    public LoggingDecorator(DataSource source) {
        super(source);
    }
    
    @Override
    public void writeData(String data) {
        System.out.println("LOG: Writing data...");
        long startTime = System.currentTimeMillis();
        wrappee.writeData(data);
        long endTime = System.currentTimeMillis();
        System.out.println("LOG: Write operation took " + (endTime - startTime) + "ms");
    }
    
    @Override
    public String readData() {
        System.out.println("LOG: Reading data...");
        long startTime = System.currentTimeMillis();
        String result = wrappee.readData();
        long endTime = System.currentTimeMillis();
        System.out.println("LOG: Read operation took " + (endTime - startTime) + "ms");
        return result;
    }
}

// Client code
public class FileProcessingExample {
    public static void main(String[] args) {
        // Create a simple data source
        DataSource source = new FileDataSource("data.txt");
        
        // Wrap with encryption decorator
        DataSource encrypted = new EncryptionDecorator(source);
        
        // Wrap with compression decorator
        DataSource compressedEncrypted = new CompressionDecorator(encrypted);
        
        // Wrap with logging decorator
        DataSource loggedCompressedEncrypted = new LoggingDecorator(compressedEncrypted);
        
        // Write data using the decorated data source
        loggedCompressedEncrypted.writeData("Hello, World! This is a test of the decorator pattern.");
        
        System.out.println("\n------------------------\n");
        
        // Read data using the decorated data source
        String data = loggedCompressedEncrypted.readData();
        System.out.println("Final result: " + data);
        
        System.out.println("\n------------------------\n");
        
        // Create a different combination
        DataSource loggingOnly = new LoggingDecorator(source);
        loggingOnly.writeData("Simple logged data");
        String simpleData = loggingOnly.readData();
        System.out.println("Simple result: " + simpleData);
    }
}
```

## Real-World Nümunələr

### Java I/O Streams

Java I/O Streams, Decorator pattern-in real-world nümunəsidir:

```java
import java.io.*;

public class JavaIODecoratorExample {
    public static void main(String[] args) {
        try {
            // Create a file output stream (Concrete Component)
            OutputStream fileOutputStream = new FileOutputStream("output.txt");
            
            // Decorate with buffering capability
            OutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
            
            // Decorate with data type conversion capability
            DataOutputStream dataOutputStream = new DataOutputStream(bufferedOutputStream);
            
            // Use the decorated stream
            dataOutputStream.writeUTF("Hello, Decorator Pattern!");
            dataOutputStream.writeInt(42);
            dataOutputStream.writeDouble(3.14159);
            
            // Close the stream (closes all wrapped streams)
            dataOutputStream.close();
            
            System.out.println("Data written to file successfully.");
            
            // Reading with decorators
            InputStream fileInputStream = new FileInputStream("output.txt");
            InputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
            DataInputStream dataInputStream = new DataInputStream(bufferedInputStream);
            
            // Read the data
            String message = dataInputStream.readUTF();
            int number = dataInputStream.readInt();
            double pi = dataInputStream.readDouble();
            
            System.out.println("Read from file: " + message);
            System.out.println("Number: " + number);
            System.out.println("Pi: " + pi);
            
            // Close the input stream
            dataInputStream.close();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### UI Component Decoration

```java
// Component interface
interface VisualComponent {
    void draw();
    String getDescription();
}

// Concrete Component
class TextView implements VisualComponent {
    private String text;
    
    public TextView(String text) {
        this.text = text;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing TextView with text: " + text);
    }
    
    @Override
    public String getDescription() {
        return "TextView";
    }
}

// Decorator
abstract class ComponentDecorator implements VisualComponent {
    protected VisualComponent component;
    
    public ComponentDecorator(VisualComponent component) {
        this.component = component;
    }
    
    @Override
    public void draw() {
        component.draw();
    }
    
    @Override
    public String getDescription() {
        return component.getDescription();
    }
}

// Concrete Decorators
class BorderDecorator extends ComponentDecorator {
    private int borderWidth;
    
    public BorderDecorator(VisualComponent component, int borderWidth) {
        super(component);
        this.borderWidth = borderWidth;
    }
    
    @Override
    public void draw() {
        super.draw();
        System.out.println("Adding border with width: " + borderWidth);
    }
    
    @Override
    public String getDescription() {
        return super.getDescription() + " with Border";
    }
}

class ScrollDecorator extends ComponentDecorator {
    public ScrollDecorator(VisualComponent component) {
        super(component);
    }
    
    @Override
    public void draw() {
        super.draw();
        System.out.println("Adding scrolling functionality");
    }
    
    @Override
    public String getDescription() {
        return super.getDescription() + " with Scrolling";
    }
}

class ColorDecorator extends ComponentDecorator {
    private String color;
    
    public ColorDecorator(VisualComponent component, String color) {
        super(component);
        this.color = color;
    }
    
    @Override
    public void draw() {
        super.draw();
        System.out.println("Applying color: " + color);
    }
    
    @Override
    public String getDescription() {
        return super.getDescription() + " with " + color + " Color";
    }
}

// Client code
public class UIComponentExample {
    public static void main(String[] args) {
        // Create a simple text view
        VisualComponent textView = new TextView("Hello, World!");
        System.out.println("Component: " + textView.getDescription());
        textView.draw();
        
        System.out.println("\n------------------------\n");
        
        // Decorate with border
        VisualComponent borderedTextView = new BorderDecorator(textView, 2);
        System.out.println("Component: " + borderedTextView.getDescription());
        borderedTextView.draw();
        
        System.out.println("\n------------------------\n");
        
        // Decorate with border and scrolling
        VisualComponent scrollableBorderedTextView = new ScrollDecorator(borderedTextView);
        System.out.println("Component: " + scrollableBorderedTextView.getDescription());
        scrollableBorderedTextView.draw();
        
        System.out.println("\n------------------------\n");
        
        // Decorate with border, scrolling, and color
        VisualComponent coloredScrollableBorderedTextView = 
            new ColorDecorator(scrollableBorderedTextView, "Blue");
        System.out.println("Component: " + coloredScrollableBorderedTextView.getDescription());
        coloredScrollableBorderedTextView.draw();
        
        System.out.println("\n------------------------\n");
        
        // Create a different combination
        VisualComponent coloredTextView = new ColorDecorator(new TextView("Simple text"), "Red");
        System.out.println("Component: " + coloredTextView.getDescription());
        coloredTextView.draw();
    }
}
```

## Decorator Pattern-nin Üstünlükləri

1. **Flexibility**: Inheritance əvəzinə composition istifadə edərək daha flexible dizayn təqdim edir
2. **Open/Closed Principle**: Mövcud kodu dəyişdirmədən yeni funksionallıq əlavə etməyə imkan verir
3. **Single Responsibility Principle**: Hər bir decorator-un bir məsuliyyəti var
4. **Runtime Behavior Modification**: Runtime-da obyektlərin davranışını dəyişdirməyə imkan verir

## Decorator Pattern-nin Çatışmazlıqları

1. **Complexity**: Çoxlu kiçik class-lar yaratmaqla kod-un mürəkkəbliyini artırır
2. **Debugging Difficulty**: Çoxlu decorator-lar istifadə edildikdə debugging çətinləşir
3. **Order Dependency**: Decorator-ların tətbiq olunma sırası nəticəyə təsir edə bilər
4. **Consistency Issues**: Bütün decorator-lar Component interface-ni düzgün implement etməlidir

## Decorator Pattern-nin İstifadə Sahələri

1. **Adding Responsibilities**: Mövcud obyektlərə yeni funksionallıq əlavə etmək
2. **Cross-cutting Concerns**: Logging, caching, security kimi cross-cutting concerns-ləri tətbiq etmək
3. **Legacy System Enhancement**: Legacy sistemləri dəyişdirmədən genişləndirmək
4. **Configurable Behavior**: Runtime-da konfiqurasiya edilə bilən davranış təqdim etmək

## Decorator Pattern-nin Digər Pattern-lərlə Müqayisəsi

### Decorator vs Adapter

- **Decorator**: Interface-i dəyişdirmədən funksionallıq əlavə edir
- **Adapter**: Bir interface-i başqa bir interface-ə çevirir

### Decorator vs Composite

- **Decorator**: Tək bir obyektə funksionallıq əlavə edir
- **Composite**: Obyektləri ağac strukturunda təşkil edir

### Decorator vs Strategy

- **Decorator**: Mövcud obyektə funksionallıq əlavə edir
- **Strategy**: Bir algoritmin müxtəlif variantlarını təqdim edir

## Nəticə

Decorator Design Pattern, mövcud obyektlərə dinamik olaraq əlavə funksionallıq əlavə etməyə imkan verən güclü bir structural pattern-dir. Bu pattern, inheritance əvəzinə composition istifadə edərək, kod-un daha flexible və maintainable olmasını təmin edir. Decorator pattern, xüsusilə Java I/O Streams kimi real-world ssenarilər üçün faydalıdır və Open/Closed Principle-i tətbiq etməyə kömək edir. Bu pattern-in düzgün istifadəsi, kod-un daha modular və genişləndirilə bilən olmasını təmin edir.