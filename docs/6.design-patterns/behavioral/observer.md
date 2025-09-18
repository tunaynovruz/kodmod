---
draft: true
title: Observer Design Pattern
description: Observer design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: observer-design-pattern
tags: [design-patterns, behavioral, observer, java]
keywords: [observer pattern, design pattern, behavioral pattern, java]
hide_table_of_contents: false
---

# Observer Design Pattern


Observer Design Pattern, behavioral design pattern-lərdən biridir və obyektlər arasında one-to-many asılılıq əlaqəsi yaradır. Bu pattern, bir obyektin vəziyyəti dəyişdikdə, ona bağlı olan bütün asılı obyektlərin avtomatik olaraq xəbərdar edilməsini və yenilənməsini təmin edir.

Observer pattern, xüsusilə distributed event handling sistemlərində geniş istifadə olunur. Bu pattern, MVC (Model-View-Controller) arxitekturasının əsas komponentlərindən biridir və GUI tətbiqlərində, real-time data processing sistemlərində və event-driven proqramlaşdırmada tez-tez istifadə olunur.

## Observer Pattern-nin Əsas Xüsusiyyətləri

- **One-to-Many Asılılıq**: Bir subject (observable) obyekti və çoxlu observer obyektləri arasında əlaqə
- **Loose Coupling**: Subject və observer-lər arasında zəif əlaqə (loose coupling)
- **Event Handling**: Hadisələrin (event) emalı üçün mexanizm
- **Push və Pull Modelləri**: Data-nın ötürülməsi üçün müxtəlif modellər

## Observer Pattern-nin Strukturu

1. **Subject (Observable)**: Observer-ləri qeydiyyata alan və onlara bildiriş göndərən interface və ya abstract class
2. **Concrete Subject**: Subject interface-ni implement edən və observer-lərə bildiriş göndərən konkret class
3. **Observer**: Bildiriş almaq üçün metod təyin edən interface
4. **Concrete Observer**: Observer interface-ni implement edən və subject-dən bildiriş alan konkret class

## Java-da Observer Pattern İmplementasiyası

### Sadə Observer Pattern


<details>
<summary>Koda bax</summary>

```java
import java.util.ArrayList;
import java.util.List;

// Observer interface
interface Observer {
    void update(String message);
}

// Subject (Observable) interface
interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

// Concrete Subject
class NewsAgency implements Subject {
    private String news;
    private List<Observer> observers = new ArrayList<>();
    
    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }
    
    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    
    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(news);
        }
    }
    
    public void setNews(String news) {
        this.news = news;
        notifyObservers();
    }
}

// Concrete Observers
class NewsChannel implements Observer {
    private String name;
    private String latestNews;
    
    public NewsChannel(String name) {
        this.name = name;
    }
    
    @Override
    public void update(String news) {
        this.latestNews = news;
        display();
    }
    
    private void display() {
        System.out.println(name + " received news: " + latestNews);
    }
}

// Client code
public class ObserverPatternExample {
    public static void main(String[] args) {
        // Create subject
        NewsAgency agency = new NewsAgency();
        
        // Create observers
        NewsChannel channel1 = new NewsChannel("CNN");
        NewsChannel channel2 = new NewsChannel("BBC");
        NewsChannel channel3 = new NewsChannel("Al Jazeera");
        
        // Register observers
        agency.registerObserver(channel1);
        agency.registerObserver(channel2);
        agency.registerObserver(channel3);
        
        // Set news and notify observers
        agency.setNews("Breaking News: Observer Pattern Implemented Successfully!");
        
        // Remove an observer
        agency.removeObserver(channel2);
        
        // Set another news
        agency.setNews("Another Breaking News: Channel Removed from Observer List!");
    }
}
```
</details>

### Java Built-in Observer Pattern

Java, `java.util.Observable` class-ı və `java.util.Observer` interface-i vasitəsilə built-in observer pattern dəstəyi təqdim edir (Java 9-dan etibarən deprecated olsa da, hələ də istifadə olunur).


<details>
<summary>Koda bax</summary>

```java
import java.util.Observable;
import java.util.Observer;

// Concrete Subject (extends Observable)
class WeatherData extends Observable {
    private float temperature;
    private float humidity;
    private float pressure;
    
    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        
        // Mark the Observable as changed
        setChanged();
        
        // Notify observers
        notifyObservers();
    }
    
    // Getters for weather data
    public float getTemperature() {
        return temperature;
    }
    
    public float getHumidity() {
        return humidity;
    }
    
    public float getPressure() {
        return pressure;
    }
}

// Concrete Observer (implements Observer)
class WeatherDisplay implements Observer {
    private String name;
    
    public WeatherDisplay(String name) {
        this.name = name;
    }
    
    @Override
    public void update(Observable observable, Object arg) {
        if (observable instanceof WeatherData) {
            WeatherData weatherData = (WeatherData) observable;
            float temperature = weatherData.getTemperature();
            float humidity = weatherData.getHumidity();
            float pressure = weatherData.getPressure();
            
            display(temperature, humidity, pressure);
        }
    }
    
    private void display(float temperature, float humidity, float pressure) {
        System.out.println(name + " Weather Update:");
        System.out.println("Temperature: " + temperature + "°C");
        System.out.println("Humidity: " + humidity + "%");
        System.out.println("Pressure: " + pressure + " hPa");
        System.out.println("------------------------");
    }
}

// Client code
public class BuiltInObserverExample {
    public static void main(String[] args) {
        // Create subject
        WeatherData weatherData = new WeatherData();
        
        // Create observers
        WeatherDisplay currentDisplay = new WeatherDisplay("Current Conditions");
        WeatherDisplay statisticsDisplay = new WeatherDisplay("Statistics");
        WeatherDisplay forecastDisplay = new WeatherDisplay("Forecast");
        
        // Register observers
        weatherData.addObserver(currentDisplay);
        weatherData.addObserver(statisticsDisplay);
        weatherData.addObserver(forecastDisplay);
        
        // Simulate weather changes
        System.out.println("Weather update 1:");
        weatherData.setMeasurements(25.2f, 65.0f, 1013.1f);
        
        // Remove an observer
        weatherData.deleteObserver(statisticsDisplay);
        
        // Simulate another weather change
        System.out.println("\nWeather update 2:");
        weatherData.setMeasurements(26.7f, 70.0f, 1010.3f);
    }
}
```
</details>

### Property Change Listener

Java, `java.beans.PropertyChangeListener` və `java.beans.PropertyChangeSupport` class-ları vasitəsilə daha güclü observer pattern implementasiyası təqdim edir.


<details>
<summary>Koda bax</summary>

```java
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

// Subject with PropertyChangeSupport
class Stock {
    private String name;
    private double price;
    private PropertyChangeSupport support;
    
    public Stock(String name, double price) {
        this.name = name;
        this.price = price;
        this.support = new PropertyChangeSupport(this);
    }
    
    public void addPropertyChangeListener(PropertyChangeListener listener) {
        support.addPropertyChangeListener(listener);
    }
    
    public void removePropertyChangeListener(PropertyChangeListener listener) {
        support.removePropertyChangeListener(listener);
    }
    
    public String getName() {
        return name;
    }
    
    public double getPrice() {
        return price;
    }
    
    public void setPrice(double newPrice) {
        double oldPrice = this.price;
        this.price = newPrice;
        
        // Fire property change event
        support.firePropertyChange("price", oldPrice, newPrice);
    }
}

// Observer using PropertyChangeListener
class StockObserver implements PropertyChangeListener {
    private String name;
    
    public StockObserver(String name) {
        this.name = name;
    }
    
    @Override
    public void propertyChange(java.beans.PropertyChangeEvent evt) {
        String propertyName = evt.getPropertyName();
        
        if ("price".equals(propertyName)) {
            Stock stock = (Stock) evt.getSource();
            double oldPrice = (Double) evt.getOldValue();
            double newPrice = (Double) evt.getNewValue();
            
            double priceDifference = newPrice - oldPrice;
            double percentageChange = (priceDifference / oldPrice) * 100;
            
            System.out.printf("%s: %s stock price changed from %.2f to %.2f (%.2f%%)%n", 
                name, stock.getName(), oldPrice, newPrice, percentageChange);
        }
    }
}

// Client code
public class PropertyChangeListenerExample {
    public static void main(String[] args) {
        // Create stocks
        Stock appleStock = new Stock("Apple", 150.0);
        Stock googleStock = new Stock("Google", 2800.0);
        
        // Create observers
        StockObserver trader1 = new StockObserver("Trader 1");
        StockObserver trader2 = new StockObserver("Trader 2");
        StockObserver trader3 = new StockObserver("Trader 3");
        
        // Register observers
        appleStock.addPropertyChangeListener(trader1);
        appleStock.addPropertyChangeListener(trader2);
        googleStock.addPropertyChangeListener(trader2);
        googleStock.addPropertyChangeListener(trader3);
        
        // Change stock prices
        System.out.println("Changing Apple stock price:");
        appleStock.setPrice(155.75);
        
        System.out.println("\nChanging Google stock price:");
        googleStock.setPrice(2750.50);
        
        // Remove an observer
        appleStock.removePropertyChangeListener(trader1);
        
        System.out.println("\nChanging Apple stock price after removing Trader 1:");
        appleStock.setPrice(160.25);
    }
}
```
</details>

## Push və Pull Modelləri

Observer pattern-də data-nın ötürülməsi üçün iki əsas model var:

### Push Model

Push model-də, subject observer-lərə bütün data-nı göndərir. Bu, observer-lərin lazımsız data almasına səbəb ola bilər.


<details>
<summary>Koda bax</summary>

```java
// Push model example
interface PushObserver {
    void update(String message, int priority, long timestamp);
}

class PushSubject {
    private List<PushObserver> observers = new ArrayList<>();
    private String message;
    private int priority;
    private long timestamp;
    
    public void registerObserver(PushObserver observer) {
        observers.add(observer);
    }
    
    public void notifyObservers() {
        for (PushObserver observer : observers) {
            observer.update(message, priority, timestamp);
        }
    }
    
    public void setData(String message, int priority) {
        this.message = message;
        this.priority = priority;
        this.timestamp = System.currentTimeMillis();
        notifyObservers();
    }
}
```
</details>

### Pull Model

Pull model-də, subject observer-lərə yalnız dəyişiklik haqqında xəbər verir və observer-lər lazım olan data-nı özləri alır.


<details>
<summary>Koda bax</summary>

```java
// Pull model example
interface PullObserver {
    void update();
}

class PullSubject {
    private List<PullObserver> observers = new ArrayList<>();
    private String message;
    private int priority;
    private long timestamp;
    
    public void registerObserver(PullObserver observer) {
        observers.add(observer);
    }
    
    public void notifyObservers() {
        for (PullObserver observer : observers) {
            observer.update();
        }
    }
    
    public void setData(String message, int priority) {
        this.message = message;
        this.priority = priority;
        this.timestamp = System.currentTimeMillis();
        notifyObservers();
    }
    
    // Getters for observers to pull data
    public String getMessage() {
        return message;
    }
    
    public int getPriority() {
        return priority;
    }
    
    public long getTimestamp() {
        return timestamp;
    }
}

class PullObserverImpl implements PullObserver {
    private PullSubject subject;
    
    public PullObserverImpl(PullSubject subject) {
        this.subject = subject;
    }
    
    @Override
    public void update() {
        // Pull only the data needed
        String message = subject.getMessage();
        int priority = subject.getPriority();
        
        // Process data
        System.out.println("Received message: " + message + " with priority: " + priority);
    }
}
```
</details>

## Observer Pattern-nin Üstünlükləri

1. **Loose Coupling**: Subject və observer-lər arasında zəif əlaqə (loose coupling) təmin edir
2. **Open/Closed Principle**: Yeni observer-lər əlavə etmək üçün mövcud kodu dəyişdirmək lazım deyil
3. **Dynamic Relationships**: Runtime-da observer-ləri əlavə etmək və silmək mümkündür
4. **Broadcast Communication**: Bir subject çoxlu observer-lərə bildiriş göndərə bilər

## Observer Pattern-nin Çatışmazlıqları

1. **Memory Leaks**: Observer-lər düzgün şəkildə silinməzsə, memory leak-lər yarana bilər
2. **Unexpected Updates**: Observer-lər gözlənilməz və ya lazımsız yeniləmələr ala bilər
3. **Order of Notification**: Observer-lərin bildiriş alma sırası müəyyən deyil
4. **Performance**: Çoxlu sayda observer olduqda, performance problemləri yarana bilər

## Observer Pattern-nin İstifadə Sahələri

1. **Event Handling Systems**: GUI tətbiqləri, event-driven sistemlər
2. **MVC Architecture**: Model-View-Controller arxitekturasında model və view arasında əlaqə
3. **Publish-Subscribe Systems**: Message broker sistemləri, event bus implementasiyaları
4. **Real-time Data Monitoring**: Stock market data, weather monitoring, sensor networks

## Real-World Nümunələr

### Event Listeners in Java Swing

Java Swing, observer pattern-in real-world nümunəsidir:


<details>
<summary>Koda bax</summary>

```java
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SwingObserverExample {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Observer Pattern Example");
        JButton button = new JButton("Click Me");
        
        // Add action listener (observer)
        button.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Button clicked!");
            }
        });
        
        // Add another action listener (observer)
        button.addActionListener(e -> System.out.println("Button clicked again!"));
        
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.getContentPane().add(button);
        frame.setSize(300, 200);
        frame.setVisible(true);
    }
}
```
</details>

### Chat Application


<details>
<summary>Koda bax</summary>

```java
import java.util.ArrayList;
import java.util.List;

// Observer interface
interface ChatUser {
    void receiveMessage(String sender, String message);
}

// Subject
class ChatRoom {
    private List<ChatUser> users = new ArrayList<>();
    
    public void addUser(ChatUser user) {
        users.add(user);
    }
    
    public void removeUser(ChatUser user) {
        users.remove(user);
    }
    
    public void sendMessage(String sender, String message) {
        for (ChatUser user : users) {
            user.receiveMessage(sender, message);
        }
    }
}

// Concrete Observer
class User implements ChatUser {
    private String name;
    
    public User(String name) {
        this.name = name;
    }
    
    @Override
    public void receiveMessage(String sender, String message) {
        if (!sender.equals(name)) {
            System.out.println(name + " received message from " + sender + ": " + message);
        }
    }
    
    public void sendMessage(ChatRoom chatRoom, String message) {
        System.out.println(name + " sends message: " + message);
        chatRoom.sendMessage(name, message);
    }
}

// Client code
public class ChatApplication {
    public static void main(String[] args) {
        // Create chat room (subject)
        ChatRoom chatRoom = new ChatRoom();
        
        // Create users (observers)
        User alice = new User("Alice");
        User bob = new User("Bob");
        User charlie = new User("Charlie");
        
        // Register users to chat room
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);
        chatRoom.addUser(charlie);
        
        // Send messages
        alice.sendMessage(chatRoom, "Hello everyone!");
        bob.sendMessage(chatRoom, "Hi Alice!");
        
        // Remove a user
        chatRoom.removeUser(charlie);
        
        // Send another message
        bob.sendMessage(chatRoom, "Charlie left the chat.");
    }
}
```
</details>

