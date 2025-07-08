---
title: Bridge Design Pattern
description: Bridge design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: bridge-design-pattern
tags: [design-patterns, structural, bridge, java]
keywords: [bridge pattern, design pattern, structural pattern, java]
hide_table_of_contents: false
---

# Bridge Design Pattern

## Giriş

Bridge Design Pattern, structural design pattern-lərdən biridir və abstraction-ı implementation-dan ayırmağa imkan verir. Bu pattern, iki ayrı hierarchy yaradır - biri abstraction üçün, digəri isə implementation üçün. Bu iki hierarchy bir-birindən asılı olmadan inkişaf edə bilər.

Bridge pattern, "Composition over Inheritance" prinsipini tətbiq edir. Bu pattern, inheritance hierarchies-ni çoxaltmaq əvəzinə, abstraction və implementation arasında körpü (bridge) yaradır. Bu, kod-un daha flexible və maintainable olmasını təmin edir.

## Bridge Pattern-nin Əsas Xüsusiyyətləri

- **Decoupling Interface and Implementation**: Interface və implementation-ı bir-birindən ayırır
- **Improved Extensibility**: Abstraction və implementation-ı ayrı-ayrılıqda genişləndirməyə imkan verir
- **Hiding Implementation Details**: Client-dən implementation detallarını gizlədir
- **Composition over Inheritance**: Inheritance əvəzinə composition istifadə edir

## Bridge Pattern-nin Strukturu

1. **Abstraction**: Yüksək səviyyəli abstraction təyin edən interface və ya abstract class
2. **Refined Abstraction**: Abstraction-ı genişləndirən və əlavə funksionallıq təqdim edən class
3. **Implementor**: Implementation interface-ni təyin edən interface və ya abstract class
4. **Concrete Implementor**: Implementor interface-ni implement edən konkret class

## Java-da Bridge Pattern İmplementasiyası

### Sadə Bridge Pattern Nümunəsi

```java
// Implementor interface
interface DrawAPI {
    void drawCircle(int radius, int x, int y);
}

// Concrete Implementors
class RedCircle implements DrawAPI {
    @Override
    public void drawCircle(int radius, int x, int y) {
        System.out.println("Drawing Circle[ color: red, radius: " + radius + ", x: " + x + ", y: " + y + "]");
    }
}

class GreenCircle implements DrawAPI {
    @Override
    public void drawCircle(int radius, int x, int y) {
        System.out.println("Drawing Circle[ color: green, radius: " + radius + ", x: " + x + ", y: " + y + "]");
    }
}

// Abstraction
abstract class Shape {
    protected DrawAPI drawAPI;
    
    protected Shape(DrawAPI drawAPI) {
        this.drawAPI = drawAPI;
    }
    
    public abstract void draw();
}

// Refined Abstraction
class Circle extends Shape {
    private int x, y, radius;
    
    public Circle(int x, int y, int radius, DrawAPI drawAPI) {
        super(drawAPI);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        drawAPI.drawCircle(radius, x, y);
    }
}

// Client code
public class BridgePatternDemo {
    public static void main(String[] args) {
        Shape redCircle = new Circle(100, 100, 10, new RedCircle());
        Shape greenCircle = new Circle(200, 200, 20, new GreenCircle());
        
        redCircle.draw();
        greenCircle.draw();
    }
}
```

### Daha Mürəkkəb Bridge Pattern Nümunəsi

```java
// Implementor interface
interface Device {
    boolean isEnabled();
    void enable();
    void disable();
    int getVolume();
    void setVolume(int volume);
    int getChannel();
    void setChannel(int channel);
}

// Concrete Implementors
class TV implements Device {
    private boolean on = false;
    private int volume = 30;
    private int channel = 1;
    
    @Override
    public boolean isEnabled() {
        return on;
    }
    
    @Override
    public void enable() {
        on = true;
        System.out.println("TV turned on");
    }
    
    @Override
    public void disable() {
        on = false;
        System.out.println("TV turned off");
    }
    
    @Override
    public int getVolume() {
        return volume;
    }
    
    @Override
    public void setVolume(int volume) {
        if (volume > 100) {
            this.volume = 100;
        } else if (volume < 0) {
            this.volume = 0;
        } else {
            this.volume = volume;
        }
        System.out.println("TV volume set to " + this.volume);
    }
    
    @Override
    public int getChannel() {
        return channel;
    }
    
    @Override
    public void setChannel(int channel) {
        this.channel = channel;
        System.out.println("TV channel set to " + this.channel);
    }
}

class Radio implements Device {
    private boolean on = false;
    private int volume = 20;
    private int channel = 1;
    
    @Override
    public boolean isEnabled() {
        return on;
    }
    
    @Override
    public void enable() {
        on = true;
        System.out.println("Radio turned on");
    }
    
    @Override
    public void disable() {
        on = false;
        System.out.println("Radio turned off");
    }
    
    @Override
    public int getVolume() {
        return volume;
    }
    
    @Override
    public void setVolume(int volume) {
        if (volume > 100) {
            this.volume = 100;
        } else if (volume < 0) {
            this.volume = 0;
        } else {
            this.volume = volume;
        }
        System.out.println("Radio volume set to " + this.volume);
    }
    
    @Override
    public int getChannel() {
        return channel;
    }
    
    @Override
    public void setChannel(int channel) {
        this.channel = channel;
        System.out.println("Radio channel set to " + this.channel);
    }
}

// Abstraction
abstract class RemoteControl {
    protected Device device;
    
    public RemoteControl(Device device) {
        this.device = device;
    }
    
    public void togglePower() {
        if (device.isEnabled()) {
            device.disable();
        } else {
            device.enable();
        }
    }
    
    public void volumeUp() {
        device.setVolume(device.getVolume() + 10);
    }
    
    public void volumeDown() {
        device.setVolume(device.getVolume() - 10);
    }
    
    public void channelUp() {
        device.setChannel(device.getChannel() + 1);
    }
    
    public void channelDown() {
        device.setChannel(device.getChannel() - 1);
    }
}

// Refined Abstraction
class AdvancedRemoteControl extends RemoteControl {
    public AdvancedRemoteControl(Device device) {
        super(device);
    }
    
    public void mute() {
        device.setVolume(0);
        System.out.println("Muted");
    }
    
    public void setChannel(int channel) {
        device.setChannel(channel);
    }
}

// Client code
public class BridgePatternAdvancedDemo {
    public static void main(String[] args) {
        Device tv = new TV();
        Device radio = new Radio();
        
        RemoteControl tvRemote = new RemoteControl(tv);
        RemoteControl radioRemote = new RemoteControl(radio);
        
        tvRemote.togglePower();
        tvRemote.volumeUp();
        tvRemote.channelUp();
        
        radioRemote.togglePower();
        radioRemote.volumeDown();
        radioRemote.channelDown();
        
        AdvancedRemoteControl advancedTvRemote = new AdvancedRemoteControl(tv);
        advancedTvRemote.mute();
        advancedTvRemote.setChannel(100);
    }
}
```

## Real-World Nümunələr

### JDBC API

JDBC API, Bridge pattern-in real-world nümunəsidir:

```java
import java.sql.*;

public class JdbcBridgeExample {
    public static void main(String[] args) {
        try {
            // Load the driver (Concrete Implementor)
            Class.forName("com.mysql.jdbc.Driver");
            
            // Create a connection (Abstraction uses Implementor)
            Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/mydb", "username", "password");
            
            // Create a statement
            Statement statement = connection.createStatement();
            
            // Execute query
            ResultSet resultSet = statement.executeQuery("SELECT * FROM users");
            
            // Process results
            while (resultSet.next()) {
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                System.out.println("User: " + name + ", Email: " + email);
            }
            
            // Close resources
            resultSet.close();
            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Graphics System

```java
// Implementor interface
interface Renderer {
    void renderCircle(float radius);
    void renderRectangle(float width, float height);
}

// Concrete Implementors
class VectorRenderer implements Renderer {
    @Override
    public void renderCircle(float radius) {
        System.out.println("Drawing a circle of radius " + radius + " using vector graphics");
    }
    
    @Override
    public void renderRectangle(float width, float height) {
        System.out.println("Drawing a rectangle of width " + width + " and height " + height + " using vector graphics");
    }
}

class RasterRenderer implements Renderer {
    @Override
    public void renderCircle(float radius) {
        System.out.println("Drawing pixels for a circle of radius " + radius);
    }
    
    @Override
    public void renderRectangle(float width, float height) {
        System.out.println("Drawing pixels for a rectangle of width " + width + " and height " + height);
    }
}

// Abstraction
abstract class Shape {
    protected Renderer renderer;
    
    public Shape(Renderer renderer) {
        this.renderer = renderer;
    }
    
    public abstract void draw();
    public abstract void resize(float factor);
}

// Refined Abstractions
class Circle extends Shape {
    private float radius;
    
    public Circle(Renderer renderer, float radius) {
        super(renderer);
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        renderer.renderCircle(radius);
    }
    
    @Override
    public void resize(float factor) {
        radius *= factor;
    }
}

class Rectangle extends Shape {
    private float width;
    private float height;
    
    public Rectangle(Renderer renderer, float width, float height) {
        super(renderer);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void draw() {
        renderer.renderRectangle(width, height);
    }
    
    @Override
    public void resize(float factor) {
        width *= factor;
        height *= factor;
    }
}

// Client code
public class GraphicsSystemDemo {
    public static void main(String[] args) {
        Renderer vectorRenderer = new VectorRenderer();
        Renderer rasterRenderer = new RasterRenderer();
        
        Shape circle1 = new Circle(vectorRenderer, 5);
        Shape circle2 = new Circle(rasterRenderer, 5);
        Shape rectangle1 = new Rectangle(vectorRenderer, 10, 5);
        Shape rectangle2 = new Rectangle(rasterRenderer, 10, 5);
        
        circle1.draw();
        circle2.draw();
        rectangle1.draw();
        rectangle2.draw();
        
        System.out.println("\nResizing shapes...");
        circle1.resize(2);
        circle2.resize(2);
        rectangle1.resize(0.5f);
        rectangle2.resize(0.5f);
        
        circle1.draw();
        circle2.draw();
        rectangle1.draw();
        rectangle2.draw();
    }
}
```

## Bridge Pattern-nin Üstünlükləri

1. **Decoupling**: Abstraction və implementation arasında zəif əlaqə (loose coupling) yaradır
2. **Extensibility**: Abstraction və implementation hierarchies-ni ayrı-ayrılıqda genişləndirməyə imkan verir
3. **Hiding Implementation Details**: Client-dən implementation detallarını gizlədir
4. **Open/Closed Principle**: Mövcud kodu dəyişdirmədən yeni abstractions və implementations əlavə etməyə imkan verir

## Bridge Pattern-nin Çatışmazlıqları

1. **Complexity**: Kod-un mürəkkəbliyini artırır
2. **Planning**: Pattern-in tətbiqi üçün əvvəlcədən planlaşdırma tələb olunur
3. **Overhead**: Əlavə indirection layer-i performance-a təsir edə bilər

## Bridge Pattern-nin İstifadə Sahələri

1. **Cross-platform Applications**: Müxtəlif platformalar üçün tətbiqlər yaratmaq
2. **Multiple Database Support**: Müxtəlif database sistemləri ilə işləmək
3. **Different UI Implementations**: Müxtəlif UI framework-ləri ilə işləmək
4. **Hardware Abstraction**: Hardware detallarını gizlətmək

## Bridge Pattern-nin Digər Pattern-lərlə Müqayisəsi

### Bridge vs Adapter

- **Bridge**: Abstraction və implementation arasında körpü yaradır və hər ikisini ayrı-ayrılıqda genişləndirməyə imkan verir
- **Adapter**: Mövcud interface-ləri uyğunlaşdırır, lakin onları genişləndirmir

### Bridge vs Strategy

- **Bridge**: Abstraction və implementation arasında körpü yaradır
- **Strategy**: Bir algoritmin müxtəlif variantlarını təqdim edir

### Bridge vs Abstract Factory

- **Bridge**: Abstraction və implementation arasında körpü yaradır
- **Abstract Factory**: Əlaqəli obyektlərin ailəsini yaratmaq üçün istifadə olunur

## Nəticə

Bridge Design Pattern, abstraction-ı implementation-dan ayırmağa imkan verən güclü bir structural pattern-dir. Bu pattern, "Composition over Inheritance" prinsipini tətbiq edərək, kod-un daha flexible və maintainable olmasını təmin edir. Bridge pattern, xüsusilə cross-platform applications, multiple database support və different UI implementations kimi ssenarilər üçün faydalıdır. Bu pattern-in düzgün istifadəsi, kod-un daha modular və genişləndirilə bilən olmasını təmin edir.