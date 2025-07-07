---
title: Factory Design Pattern
description: Factory design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: factory-design-pattern
tags: [design-patterns, creational, factory, java]
keywords: [factory pattern, design pattern, creational pattern, java]
hide_table_of_contents: false
---

# Factory Design Pattern

## Giriş

Factory Design Pattern, creational design pattern-lərdən biridir və obyektlərin yaradılması prosesini encapsulate edir. Bu pattern, obyekt yaratma məntiqini client code-dan ayırır və obyektlərin yaradılması üçün mərkəzi bir interface təmin edir. Factory pattern, kod-un daha flexible və maintainable olmasını təmin edir.

## Factory Pattern-nin Əsas Xüsusiyyətləri

- **Obyekt Yaratma Encapsulation**: Obyekt yaratma məntiqini gizlədir
- **Loose Coupling**: Client code və konkret class-lar arasında loose coupling təmin edir
- **Extensibility**: Yeni obyekt növləri əlavə etmək asandır
- **Single Responsibility**: Obyekt yaratma məsuliyyəti ayrı bir class-a verilir

## Factory Pattern-nin Növləri

### 1. Simple Factory

Simple Factory, ən sadə factory pattern implementasiyasıdır. Bir static method vasitəsilə obyektlər yaradılır.

### 2. Factory Method

Factory Method pattern, obyekt yaratma məsuliyyətini subclass-lara verir. Abstract factory method-u subclass-lar implement edir.

### 3. Abstract Factory

Abstract Factory pattern, əlaqəli obyektlərin ailəsini yaratmaq üçün istifadə olunur.

## Simple Factory İmplementasiyası

```java
// Product interface
interface Shape {
    void draw();
}

// Concrete Products
class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Dairə çəkilir");
    }
}

class Rectangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Düzbucaqlı çəkilir");
    }
}

class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Kvadrat çəkilir");
    }
}

// Simple Factory
class ShapeFactory {
    public static Shape createShape(String shapeType) {
        if (shapeType == null) {
            return null;
        }
        
        switch (shapeType.toLowerCase()) {
            case "circle":
                return new Circle();
            case "rectangle":
                return new Rectangle();
            case "square":
                return new Square();
            default:
                throw new IllegalArgumentException("Naməlum shape növü: " + shapeType);
        }
    }
}

// Client code
public class SimpleFactoryExample {
    public static void main(String[] args) {
        // Factory vasitəsilə obyektlər yaratmaq
        Shape circle = ShapeFactory.createShape("circle");
        Shape rectangle = ShapeFactory.createShape("rectangle");
        Shape square = ShapeFactory.createShape("square");
        
        // Obyektləri istifadə etmək
        circle.draw();
        rectangle.draw();
        square.draw();
    }
}
```

## Factory Method İmplementasiyası

```java
// Product interface
interface Vehicle {
    void start();
    void stop();
}

// Concrete Products
class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Avtomobil işə salınır");
    }
    
    @Override
    public void stop() {
        System.out.println("Avtomobil dayandırılır");
    }
}

class Motorcycle implements Vehicle {
    @Override
    public void start() {
        System.out.println("Motosikl işə salınır");
    }
    
    @Override
    public void stop() {
        System.out.println("Motosikl dayandırılır");
    }
}

class Truck implements Vehicle {
    @Override
    public void start() {
        System.out.println("Yük maşını işə salınır");
    }
    
    @Override
    public void stop() {
        System.out.println("Yük maşını dayandırılır");
    }
}

// Abstract Creator
abstract class VehicleFactory {
    // Factory method - subclass-lar implement edəcək
    public abstract Vehicle createVehicle();
    
    // Template method - factory method-u istifadə edir
    public void deliverVehicle() {
        Vehicle vehicle = createVehicle();
        System.out.println("Nəqliyyat vasitəsi hazırlanır...");
        vehicle.start();
        System.out.println("Nəqliyyat vasitəsi təhvil verilir");
    }
}

// Concrete Creators
class CarFactory extends VehicleFactory {
    @Override
    public Vehicle createVehicle() {
        return new Car();
    }
}

class MotorcycleFactory extends VehicleFactory {
    @Override
    public Vehicle createVehicle() {
        return new Motorcycle();
    }
}

class TruckFactory extends VehicleFactory {
    @Override
    public Vehicle createVehicle() {
        return new Truck();
    }
}

// Client code
public class FactoryMethodExample {
    public static void main(String[] args) {
        // Müxtəlif factory-lər yaratmaq
        VehicleFactory carFactory = new CarFactory();
        VehicleFactory motorcycleFactory = new MotorcycleFactory();
        VehicleFactory truckFactory = new TruckFactory();
        
        // Factory-lər vasitəsilə nəqliyyat vasitələri yaratmaq və təhvil vermək
        System.out.println("=== Avtomobil ===");
        carFactory.deliverVehicle();
        
        System.out.println("\n=== Motosikl ===");
        motorcycleFactory.deliverVehicle();
        
        System.out.println("\n=== Yük maşını ===");
        truckFactory.deliverVehicle();
    }
}
```

## Abstract Factory İmplementasiyası

```java
// Abstract Products
interface Button {
    void render();
    void onClick();
}

interface Checkbox {
    void render();
    void toggle();
}

// Windows Products
class WindowsButton implements Button {
    @Override
    public void render() {
        System.out.println("Windows button render edilir");
    }
    
    @Override
    public void onClick() {
        System.out.println("Windows button click edilir");
    }
}

class WindowsCheckbox implements Checkbox {
    @Override
    public void render() {
        System.out.println("Windows checkbox render edilir");
    }
    
    @Override
    public void toggle() {
        System.out.println("Windows checkbox toggle edilir");
    }
}

// Mac Products
class MacButton implements Button {
    @Override
    public void render() {
        System.out.println("Mac button render edilir");
    }
    
    @Override
    public void onClick() {
        System.out.println("Mac button click edilir");
    }
}

class MacCheckbox implements Checkbox {
    @Override
    public void render() {
        System.out.println("Mac checkbox render edilir");
    }
    
    @Override
    public void toggle() {
        System.out.println("Mac checkbox toggle edilir");
    }
}

// Abstract Factory
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Concrete Factories
class WindowsFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }
    
    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}

class MacFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }
    
    @Override
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}

// Client code
class Application {
    private Button button;
    private Checkbox checkbox;
    
    public Application(GUIFactory factory) {
        button = factory.createButton();
        checkbox = factory.createCheckbox();
    }
    
    public void render() {
        button.render();
        checkbox.render();
    }
    
    public void interact() {
        button.onClick();
        checkbox.toggle();
    }
}

public class AbstractFactoryExample {
    public static void main(String[] args) {
        // Operating system-ə görə factory seçmək
        String osName = System.getProperty("os.name").toLowerCase();
        GUIFactory factory;
        
        if (osName.contains("windows")) {
            factory = new WindowsFactory();
            System.out.println("Windows GUI Factory istifadə edilir");
        } else {
            factory = new MacFactory();
            System.out.println("Mac GUI Factory istifadə edilir");
        }
        
        // Application yaratmaq və istifadə etmək
        Application app = new Application(factory);
        app.render();
        app.interact();
    }
}
```

## Factory Pattern-nin Üstünlükləri

1. **Loose Coupling**: Client code konkret class-lardan asılı deyil
2. **Single Responsibility Principle**: Obyekt yaratma məsuliyyəti ayrı class-da
3. **Open/Closed Principle**: Yeni product növləri əlavə etmək üçün mövcud kodu dəyişdirmək lazım deyil
4. **Code Reusability**: Factory kod-u müxtəlif yerlərdə istifadə edilə bilər
5. **Centralized Object Creation**: Obyekt yaratma məntiqinin mərkəzləşdirilməsi

## Factory Pattern-nin Çatışmazlıqları

1. **Code Complexity**: Sadə obyekt yaratma üçün həddindən artıq mürəkkəb ola bilər
2. **Additional Classes**: Çoxlu sayda class və interface yaratmaq lazım gəlir
3. **Indirection**: Əlavə abstraction layer-i performance-a təsir edə bilər

## Factory Pattern-nin İstifadə Sahələri

1. **Framework Development**: Framework-lər tez-tez factory pattern istifadə edir
2. **Database Connections**: Müxtəlif database driver-ləri üçün connection yaratmaq
3. **UI Components**: Müxtəlif platform-lar üçün UI komponentləri yaratmaq
4. **Logging**: Müxtəlif logger implementasiyaları yaratmaq
5. **Configuration**: Müxtəlif konfiqurasiya obyektləri yaratmaq

## Real-World Nümunələr

### Database Connection Factory

```java
interface DatabaseConnection {
    void connect();
    void disconnect();
}

class MySQLConnection implements DatabaseConnection {
    @Override
    public void connect() {
        System.out.println("MySQL-ə qoşulur");
    }
    
    @Override
    public void disconnect() {
        System.out.println("MySQL-dən ayrılır");
    }
}

class PostgreSQLConnection implements DatabaseConnection {
    @Override
    public void connect() {
        System.out.println("PostgreSQL-ə qoşulur");
    }
    
    @Override
    public void disconnect() {
        System.out.println("PostgreSQL-dən ayrılır");
    }
}

class DatabaseConnectionFactory {
    public static DatabaseConnection createConnection(String dbType) {
        switch (dbType.toLowerCase()) {
            case "mysql":
                return new MySQLConnection();
            case "postgresql":
                return new PostgreSQLConnection();
            default:
                throw new IllegalArgumentException("Dəstəklənməyən database növü: " + dbType);
        }
    }
}
```

## Nəticə

Factory Design Pattern, obyekt yaratma prosesini encapsulate edərək kod-un daha flexible və maintainable olmasını təmin edir. Bu pattern, xüsusilə obyekt yaratma məntiqinin mürəkkəb olduğu və ya runtime-da müəyyən edildiyi hallarda çox faydalıdır. Simple Factory, Factory Method və Abstract Factory kimi müxtəlif implementasiya üsulları mövcuddur və hər biri müxtəlif ssenarilərdə istifadə oluna bilər.
