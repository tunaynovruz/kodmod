---
title: Adapter Design Pattern
description: Adapter design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: adapter-design-pattern
tags: [design-patterns, structural, adapter, java]
keywords: [adapter pattern, design pattern, structural pattern, java]
hide_table_of_contents: false
---

# Adapter Design Pattern

## Giriş

Adapter Design Pattern, structural design pattern-lərdən biridir və uyğun olmayan interface-lərə malik class-ların birlikdə işləməsinə imkan verir. Bu pattern, mövcud class-ın interface-ini başqa bir interface-ə çevirir və beləliklə, müxtəlif sistemlərin inteqrasiyasını asanlaşdırır.

Adapter pattern, real həyatda elektrik adapterlərinin işləmə prinsipinə bənzəyir. Məsələn, ABŞ-da istifadə olunan elektrik cihazını Avropa rozetkasına qoşmaq üçün adapter istifadə olunur. Proqramlaşdırmada da, Adapter pattern eyni məqsədlə istifadə olunur - uyğun olmayan interface-ləri bir-birinə uyğunlaşdırmaq.

## Adapter Pattern-nin Əsas Xüsusiyyətləri

- **Interface Conversion**: Bir class-ın interface-ini başqa bir interface-ə çevirir
- **Legacy Code Integration**: Köhnə kod-un yeni sistemlərlə inteqrasiyasını təmin edir
- **Reusability**: Mövcud class-ların yenidən istifadəsini təmin edir
- **Loose Coupling**: Client və adaptee arasında zəif əlaqə (loose coupling) yaradır

## Adapter Pattern-nin Növləri

Adapter pattern-nin iki əsas növü var:

1. **Class Adapter**: Inheritance (varislik) istifadə edərək implementasiya olunur
2. **Object Adapter**: Composition (tərkib) istifadə edərək implementasiya olunur

## Adapter Pattern-nin Strukturu

1. **Target**: Client-in istifadə etdiyi interface
2. **Adapter**: Target interface-ni implement edən və Adaptee-ni istifadə edən class
3. **Adaptee**: Uyğunlaşdırılması lazım olan mövcud class
4. **Client**: Target interface-i istifadə edən class

## Java-da Adapter Pattern İmplementasiyası

### Object Adapter Nümunəsi

```java
// Target interface
interface MediaPlayer {
    void play(String audioType, String fileName);
}

// Adaptee interface
interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}

// Concrete Adaptee classes
class VlcPlayer implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        System.out.println("Playing vlc file: " + fileName);
    }

    @Override
    public void playMp4(String fileName) {
        // Do nothing
    }
}

class Mp4Player implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        // Do nothing
    }

    @Override
    public void playMp4(String fileName) {
        System.out.println("Playing mp4 file: " + fileName);
    }
}

// Adapter class
class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedMusicPlayer;

    public MediaAdapter(String audioType) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedMusicPlayer = new VlcPlayer();
        } else if (audioType.equalsIgnoreCase("mp4")) {
            advancedMusicPlayer = new Mp4Player();
        }
    }

    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedMusicPlayer.playVlc(fileName);
        } else if (audioType.equalsIgnoreCase("mp4")) {
            advancedMusicPlayer.playMp4(fileName);
        }
    }
}

// Client class
class AudioPlayer implements MediaPlayer {
    private MediaAdapter mediaAdapter;

    @Override
    public void play(String audioType, String fileName) {
        // Built-in support for mp3 files
        if (audioType.equalsIgnoreCase("mp3")) {
            System.out.println("Playing mp3 file: " + fileName);
        }
        // MediaAdapter provides support for other formats
        else if (audioType.equalsIgnoreCase("vlc") || audioType.equalsIgnoreCase("mp4")) {
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        } else {
            System.out.println("Invalid media type: " + audioType + " format not supported");
        }
    }
}

// Client code
public class AdapterPatternDemo {
    public static void main(String[] args) {
        AudioPlayer audioPlayer = new AudioPlayer();

        audioPlayer.play("mp3", "song.mp3");
        audioPlayer.play("vlc", "movie.vlc");
        audioPlayer.play("mp4", "video.mp4");
        audioPlayer.play("avi", "video.avi");
    }
}
```

### Class Adapter Nümunəsi

Java-da multiple inheritance dəstəklənmədiyinə görə, class adapter implementasiyası interface-lər vasitəsilə həyata keçirilir:

```java
// Target interface
interface Target {
    void request();
}

// Adaptee class
class Adaptee {
    public void specificRequest() {
        System.out.println("Specific request from Adaptee");
    }
}

// Class Adapter
class ClassAdapter extends Adaptee implements Target {
    @Override
    public void request() {
        specificRequest();
    }
}

// Client code
public class ClassAdapterDemo {
    public static void main(String[] args) {
        Target target = new ClassAdapter();
        target.request();
    }
}
```

### Two-way Adapter Nümunəsi

İki tərəfli adapter, hər iki interface-i implement edir və hər iki istiqamətdə çevirmə imkanı təqdim edir:

```java
// First interface
interface Rectangle {
    void drawRectangle();
    double getArea();
}

// Second interface
interface LegacyRectangle {
    void draw();
    double calculateArea();
}

// First concrete class
class ModernRectangle implements Rectangle {
    private double width;
    private double height;
    
    public ModernRectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void drawRectangle() {
        System.out.println("Drawing a modern rectangle with width " + width + " and height " + height);
    }
    
    @Override
    public double getArea() {
        return width * height;
    }
}

// Second concrete class
class OldRectangle implements LegacyRectangle {
    private double width;
    private double height;
    
    public OldRectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing an old rectangle with width " + width + " and height " + height);
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
}

// Two-way adapter
class RectangleAdapter implements Rectangle, LegacyRectangle {
    private Rectangle modernRectangle;
    private LegacyRectangle legacyRectangle;
    
    // Constructor for adapting LegacyRectangle to Rectangle
    public RectangleAdapter(LegacyRectangle legacyRectangle) {
        this.legacyRectangle = legacyRectangle;
    }
    
    // Constructor for adapting Rectangle to LegacyRectangle
    public RectangleAdapter(Rectangle modernRectangle) {
        this.modernRectangle = modernRectangle;
    }
    
    // Rectangle methods
    @Override
    public void drawRectangle() {
        if (modernRectangle != null) {
            modernRectangle.drawRectangle();
        } else {
            legacyRectangle.draw();
        }
    }
    
    @Override
    public double getArea() {
        if (modernRectangle != null) {
            return modernRectangle.getArea();
        } else {
            return legacyRectangle.calculateArea();
        }
    }
    
    // LegacyRectangle methods
    @Override
    public void draw() {
        if (legacyRectangle != null) {
            legacyRectangle.draw();
        } else {
            modernRectangle.drawRectangle();
        }
    }
    
    @Override
    public double calculateArea() {
        if (legacyRectangle != null) {
            return legacyRectangle.calculateArea();
        } else {
            return modernRectangle.getArea();
        }
    }
}

// Client code
public class TwoWayAdapterDemo {
    public static void main(String[] args) {
        // Create objects
        Rectangle modernRect = new ModernRectangle(10, 20);
        LegacyRectangle oldRect = new OldRectangle(30, 40);
        
        // Use modern rectangle through its native interface
        System.out.println("Using modern rectangle directly:");
        modernRect.drawRectangle();
        System.out.println("Area: " + modernRect.getArea());
        
        // Use legacy rectangle through its native interface
        System.out.println("\nUsing legacy rectangle directly:");
        oldRect.draw();
        System.out.println("Area: " + oldRect.calculateArea());
        
        // Adapt legacy rectangle to modern interface
        Rectangle adaptedOldRect = new RectangleAdapter(oldRect);
        System.out.println("\nUsing legacy rectangle through modern interface:");
        adaptedOldRect.drawRectangle();
        System.out.println("Area: " + adaptedOldRect.getArea());
        
        // Adapt modern rectangle to legacy interface
        LegacyRectangle adaptedModernRect = new RectangleAdapter(modernRect);
        System.out.println("\nUsing modern rectangle through legacy interface:");
        adaptedModernRect.draw();
        System.out.println("Area: " + adaptedModernRect.calculateArea());
    }
}
```

## Real-World Nümunələr

### Java I/O Streams

Java I/O Streams, Adapter pattern-in real-world nümunəsidir:

```java
import java.io.*;

public class JavaIOAdapterExample {
    public static void main(String[] args) {
        try {
            // Create a file input stream
            InputStream fileInputStream = new FileInputStream("input.txt");
            
            // Adapt file input stream to reader using InputStreamReader
            Reader inputStreamReader = new InputStreamReader(fileInputStream);
            
            // Adapt reader to buffered reader
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            
            // Read from the buffered reader
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }
            
            // Close resources
            bufferedReader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Legacy System Integration

```java
// Modern payment processing interface
interface PaymentProcessor {
    void processPayment(double amount);
    boolean verifyPayment(String paymentId);
}

// Legacy payment system
class LegacyPaymentSystem {
    public void makePayment(float amount, String currency) {
        System.out.println("Processing payment of " + amount + " " + currency + " using legacy system");
    }
    
    public int checkPaymentStatus(String reference) {
        System.out.println("Checking payment status for reference: " + reference);
        // 1 = success, 0 = pending, -1 = failed
        return 1;
    }
}

// Adapter for legacy payment system
class PaymentSystemAdapter implements PaymentProcessor {
    private LegacyPaymentSystem legacySystem;
    
    public PaymentSystemAdapter() {
        this.legacySystem = new LegacyPaymentSystem();
    }
    
    @Override
    public void processPayment(double amount) {
        // Convert double to float and use default currency
        legacySystem.makePayment((float) amount, "USD");
    }
    
    @Override
    public boolean verifyPayment(String paymentId) {
        int status = legacySystem.checkPaymentStatus(paymentId);
        return status == 1; // Return true if status is success
    }
}

// Modern payment service
class PaymentService {
    private PaymentProcessor paymentProcessor;
    
    public PaymentService(PaymentProcessor paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }
    
    public void makePayment(double amount) {
        System.out.println("Payment service initiating payment of $" + amount);
        paymentProcessor.processPayment(amount);
    }
    
    public void verifyPayment(String paymentId) {
        boolean isVerified = paymentProcessor.verifyPayment(paymentId);
        System.out.println("Payment " + paymentId + " verification result: " + (isVerified ? "Successful" : "Failed"));
    }
}

// Client code
public class LegacySystemIntegrationDemo {
    public static void main(String[] args) {
        // Create adapter for legacy system
        PaymentProcessor adapter = new PaymentSystemAdapter();
        
        // Create payment service with the adapter
        PaymentService paymentService = new PaymentService(adapter);
        
        // Use the modern payment service which internally uses the legacy system
        paymentService.makePayment(100.50);
        paymentService.verifyPayment("TX12345");
    }
}
```

## Adapter Pattern-nin Üstünlükləri

1. **Reusability**: Mövcud class-ların yenidən istifadəsini təmin edir
2. **Flexibility**: Uyğun olmayan interface-ləri bir-birinə uyğunlaşdırır
3. **Single Responsibility Principle**: Interface çevirmə məsuliyyətini ayrı bir class-a verir
4. **Open/Closed Principle**: Mövcud kodu dəyişdirmədən yeni funksionallıq əlavə etməyə imkan verir

## Adapter Pattern-nin Çatışmazlıqları

1. **Complexity**: Əlavə class-lar yaratmaqla kod-un mürəkkəbliyini artırır
2. **Overhead**: Əlavə adapter layer-i performance-a təsir edə bilər
3. **Multiple Adapters**: Çoxlu sayda adapter-lər kod-un başa düşülməsini çətinləşdirə bilər

## Adapter Pattern-nin İstifadə Sahələri

1. **Legacy System Integration**: Köhnə sistemləri yeni sistemlərlə inteqrasiya etmək
2. **Third-party Library Integration**: Üçüncü tərəf kitabxanaları mövcud kod-a inteqrasiya etmək
3. **Interface Standardization**: Müxtəlif interface-ləri standartlaşdırmaq
4. **Code Refactoring**: Mövcud kod-u dəyişdirmədən yeni funksionallıq əlavə etmək

## Adapter Pattern-nin Digər Pattern-lərlə Müqayisəsi

### Adapter vs Bridge

- **Adapter**: Mövcud class-ların interface-lərini uyğunlaşdırır
- **Bridge**: Implementation-ı abstraction-dan ayırır

### Adapter vs Decorator

- **Adapter**: Interface-i dəyişdirir
- **Decorator**: Interface-i dəyişdirmədən funksionallıq əlavə edir

### Adapter vs Facade

- **Adapter**: Bir interface-i başqa bir interface-ə çevirir
- **Facade**: Mürəkkəb alt sistemlər üçün sadə interface təqdim edir

## Nəticə

Adapter Design Pattern, uyğun olmayan interface-lərə malik class-ların birlikdə işləməsinə imkan verən güclü bir structural pattern-dir. Bu pattern, xüsusilə legacy code inteqrasiyası, üçüncü tərəf kitabxanaların istifadəsi və interface standardizasiyası kimi ssenarilər üçün faydalıdır. Java-da Adapter pattern-i həm class inheritance, həm də object composition vasitəsilə implementasiya etmək mümkündür. Adapter pattern-in düzgün istifadəsi, kod-un daha flexible, maintainable və reusable olmasını təmin edir.