---
title: Proxy Design Pattern
description: Proxy design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: proxy-design-pattern
tags: [design-patterns, structural, proxy, java]
keywords: [proxy pattern, design pattern, structural pattern, java]
hide_table_of_contents: false
---

# Proxy Design Pattern

## Giriş

Proxy Design Pattern, structural design pattern-lərdən biridir və başqa bir obyektin yerini tutan və ona çıxışı idarə edən bir obyekt yaratmağa imkan verir. Proxy, orijinal obyektin əvəzinə işləyir və client-in sorğularını orijinal obyektə ötürməzdən əvvəl və ya sonra əlavə əməliyyatlar yerinə yetirə bilər.

Proxy pattern, real həyatda bir çox nümunələrə bənzəyir. Məsələn, kredit kartı, nağd pulun proxy-si kimi işləyir - o, eyni interface-i təqdim edir (ödəniş etmək), lakin əlavə funksionallıq əlavə edir (təhlükəsizlik, tranzaksiyaların izlənməsi və s.).

## Proxy Pattern-nin Əsas Xüsusiyyətləri

- **Access Control**: Orijinal obyektə çıxışı idarə edir
- **Lazy Initialization**: Orijinal obyektin yaradılmasını lazım olana qədər təxirə salır
- **Logging/Monitoring**: Orijinal obyektə edilən sorğuları izləyir
- **Caching**: Təkrarlanan sorğuların nəticələrini cache-ləyir
- **Remote Representation**: Uzaq obyektləri təmsil edir

## Proxy Pattern-nin Növləri

1. **Virtual Proxy**: Lazım olana qədər resource-intensive obyektlərin yaradılmasını təxirə salır
2. **Protection Proxy**: Orijinal obyektə çıxışı idarə edir və təhlükəsizlik təmin edir
3. **Remote Proxy**: Uzaq obyektləri təmsil edir
4. **Smart Proxy**: Orijinal obyektə çıxış zamanı əlavə əməliyyatlar yerinə yetirir

## Proxy Pattern-nin Strukturu

1. **Subject**: Həm RealSubject, həm də Proxy üçün ümumi interface
2. **RealSubject**: Proxy-nin təmsil etdiyi real obyekt
3. **Proxy**: Subject interface-ni implement edən və RealSubject-ə istinad saxlayan class
4. **Client**: Subject interface-i istifadə edən class

## Java-da Proxy Pattern İmplementasiyası

### Virtual Proxy Nümunəsi

```java
// Subject interface
interface Image {
    void display();
}

// RealSubject
class RealImage implements Image {
    private String fileName;
    
    public RealImage(String fileName) {
        this.fileName = fileName;
        loadFromDisk();
    }
    
    private void loadFromDisk() {
        System.out.println("Loading image: " + fileName);
        // Heavy operation - loading image from disk
    }
    
    @Override
    public void display() {
        System.out.println("Displaying image: " + fileName);
    }
}

// Proxy
class ProxyImage implements Image {
    private String fileName;
    private RealImage realImage;
    
    public ProxyImage(String fileName) {
        this.fileName = fileName;
    }
    
    @Override
    public void display() {
        // Lazy initialization - create the real object only when needed
        if (realImage == null) {
            realImage = new RealImage(fileName);
        }
        realImage.display();
    }
}

// Client code
public class VirtualProxyDemo {
    public static void main(String[] args) {
        // Using proxy
        Image image1 = new ProxyImage("photo1.jpg");
        Image image2 = new ProxyImage("photo2.jpg");
        
        // Image will be loaded only when display() is called
        System.out.println("Image will be loaded on first display call");
        image1.display(); // loading happens here
        System.out.println();
        
        // Image is already loaded, no loading occurs
        System.out.println("Image is already loaded, no loading occurs");
        image1.display();
        System.out.println();
        
        // Another image will be loaded
        System.out.println("Another image will be loaded");
        image2.display();
    }
}
```

### Protection Proxy Nümunəsi

```java
// Subject interface
interface Document {
    void view();
    void edit();
}

// RealSubject
class RealDocument implements Document {
    private String content;
    private String name;
    
    public RealDocument(String name, String content) {
        this.name = name;
        this.content = content;
    }
    
    @Override
    public void view() {
        System.out.println("Viewing document: " + name);
        System.out.println("Content: " + content);
    }
    
    @Override
    public void edit() {
        System.out.println("Editing document: " + name);
    }
}

// Proxy
class ProtectionProxyDocument implements Document {
    private RealDocument realDocument;
    private String userRole;
    
    public ProtectionProxyDocument(String name, String content, String userRole) {
        this.realDocument = new RealDocument(name, content);
        this.userRole = userRole;
    }
    
    @Override
    public void view() {
        // Anyone can view the document
        realDocument.view();
    }
    
    @Override
    public void edit() {
        // Only users with "ADMIN" or "EDITOR" role can edit
        if (userRole.equals("ADMIN") || userRole.equals("EDITOR")) {
            realDocument.edit();
        } else {
            System.out.println("Access denied. You don't have permission to edit this document.");
        }
    }
}

// Client code
public class ProtectionProxyDemo {
    public static void main(String[] args) {
        // Create documents with different access levels
        Document documentForAdmin = new ProtectionProxyDocument(
            "confidential.txt", 
            "This is confidential information", 
            "ADMIN"
        );
        
        Document documentForUser = new ProtectionProxyDocument(
            "confidential.txt", 
            "This is confidential information", 
            "USER"
        );
        
        Document documentForEditor = new ProtectionProxyDocument(
            "article.txt", 
            "This is an article draft", 
            "EDITOR"
        );
        
        // Admin can view and edit
        System.out.println("Admin actions:");
        documentForAdmin.view();
        documentForAdmin.edit();
        System.out.println();
        
        // User can only view
        System.out.println("User actions:");
        documentForUser.view();
        documentForUser.edit(); // Access denied
        System.out.println();
        
        // Editor can view and edit
        System.out.println("Editor actions:");
        documentForEditor.view();
        documentForEditor.edit();
    }
}
```

### Caching Proxy Nümunəsi

```java
import java.util.HashMap;
import java.util.Map;

// Subject interface
interface ExpensiveOperation {
    int calculate(int n);
}

// RealSubject
class RealExpensiveOperation implements ExpensiveOperation {
    @Override
    public int calculate(int n) {
        System.out.println("Performing expensive calculation for " + n);
        // Simulate expensive operation
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return n * n;
    }
}

// Proxy
class CachingProxy implements ExpensiveOperation {
    private ExpensiveOperation realOperation;
    private Map<Integer, Integer> cache;
    
    public CachingProxy() {
        this.realOperation = new RealExpensiveOperation();
        this.cache = new HashMap<>();
    }
    
    @Override
    public int calculate(int n) {
        // Check if result is in cache
        if (cache.containsKey(n)) {
            System.out.println("Returning cached result for " + n);
            return cache.get(n);
        }
        
        // If not in cache, perform real calculation and cache result
        int result = realOperation.calculate(n);
        cache.put(n, result);
        return result;
    }
}

// Client code
public class CachingProxyDemo {
    public static void main(String[] args) {
        ExpensiveOperation operation = new CachingProxy();
        
        // First call - will perform actual calculation
        System.out.println("First call for n=4:");
        long startTime = System.currentTimeMillis();
        int result1 = operation.calculate(4);
        long endTime = System.currentTimeMillis();
        System.out.println("Result: " + result1);
        System.out.println("Time taken: " + (endTime - startTime) + "ms");
        System.out.println();
        
        // Second call with same parameter - should use cache
        System.out.println("Second call for n=4:");
        startTime = System.currentTimeMillis();
        int result2 = operation.calculate(4);
        endTime = System.currentTimeMillis();
        System.out.println("Result: " + result2);
        System.out.println("Time taken: " + (endTime - startTime) + "ms");
        System.out.println();
        
        // Call with different parameter - will perform actual calculation
        System.out.println("Call for n=5:");
        startTime = System.currentTimeMillis();
        int result3 = operation.calculate(5);
        endTime = System.currentTimeMillis();
        System.out.println("Result: " + result3);
        System.out.println("Time taken: " + (endTime - startTime) + "ms");
    }
}
```

## Java Dynamic Proxy

Java, `java.lang.reflect.Proxy` class-ı vasitəsilə runtime-da dinamik proxy-lər yaratmağa imkan verir:

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

// Subject interface
interface Service {
    void execute();
    String getData(String parameter);
}

// RealSubject
class RealService implements Service {
    @Override
    public void execute() {
        System.out.println("Executing service operation");
    }
    
    @Override
    public String getData(String parameter) {
        return "Data for parameter: " + parameter;
    }
}

// InvocationHandler for dynamic proxy
class LoggingInvocationHandler implements InvocationHandler {
    private Object target;
    
    public LoggingInvocationHandler(Object target) {
        this.target = target;
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Before method: " + method.getName());
        
        // Log arguments if any
        if (args != null) {
            for (int i = 0; i < args.length; i++) {
                System.out.println("Argument " + (i + 1) + ": " + args[i]);
            }
        }
        
        // Invoke the actual method on the target object
        Object result = method.invoke(target, args);
        
        System.out.println("After method: " + method.getName());
        
        // Log result if not void
        if (result != null) {
            System.out.println("Result: " + result);
        }
        
        return result;
    }
}

// Client code
public class DynamicProxyDemo {
    public static void main(String[] args) {
        // Create the real service
        Service realService = new RealService();
        
        // Create a dynamic proxy for the service
        Service proxyService = (Service) Proxy.newProxyInstance(
            Service.class.getClassLoader(),
            new Class[] { Service.class },
            new LoggingInvocationHandler(realService)
        );
        
        // Use the proxy
        System.out.println("Calling execute method:");
        proxyService.execute();
        System.out.println();
        
        System.out.println("Calling getData method:");
        String data = proxyService.getData("test");
        System.out.println("Client received: " + data);
    }
}
```

## Real-World Nümunələr

### Remote Method Invocation (RMI)

Java RMI, Remote Proxy pattern-in real-world nümunəsidir:

```java
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

// Remote interface
interface RemoteService extends Remote {
    String performOperation(String input) throws RemoteException;
}

// Remote implementation
class RemoteServiceImpl implements RemoteService {
    @Override
    public String performOperation(String input) throws RemoteException {
        return "Server processed: " + input.toUpperCase();
    }
}

// Server code
class RMIServer {
    public static void main(String[] args) {
        try {
            // Create and export the remote object
            RemoteService service = new RemoteServiceImpl();
            RemoteService stub = (RemoteService) UnicastRemoteObject.exportObject(service, 0);
            
            // Register the remote object with the RMI registry
            Registry registry = LocateRegistry.createRegistry(1099);
            registry.rebind("RemoteService", stub);
            
            System.out.println("Server ready");
        } catch (Exception e) {
            System.err.println("Server exception: " + e.toString());
            e.printStackTrace();
        }
    }
}

// Client code
class RMIClient {
    public static void main(String[] args) {
        try {
            // Look up the remote object
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);
            RemoteService service = (RemoteService) registry.lookup("RemoteService");
            
            // Call the remote method
            String result = service.performOperation("hello world");
            System.out.println("Result: " + result);
        } catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }
}
```

### JDBC Connection Pooling

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

// Simple connection pool implementation using Proxy pattern
class ConnectionPool {
    private String url;
    private String username;
    private String password;
    private List<Connection> connectionPool;
    private List<Connection> usedConnections = new ArrayList<>();
    private static final int INITIAL_POOL_SIZE = 5;
    
    public ConnectionPool(String url, String username, String password) throws SQLException {
        this.url = url;
        this.username = username;
        this.password = password;
        
        connectionPool = new ArrayList<>(INITIAL_POOL_SIZE);
        for (int i = 0; i < INITIAL_POOL_SIZE; i++) {
            connectionPool.add(createConnection());
        }
    }
    
    public Connection getConnection() {
        if (connectionPool.isEmpty()) {
            throw new RuntimeException("No available connections");
        }
        
        Connection connection = connectionPool.remove(connectionPool.size() - 1);
        usedConnections.add(connection);
        return connection;
    }
    
    public boolean releaseConnection(Connection connection) {
        connectionPool.add(connection);
        return usedConnections.remove(connection);
    }
    
    private Connection createConnection() throws SQLException {
        return DriverManager.getConnection(url, username, password);
    }
    
    public int getSize() {
        return connectionPool.size() + usedConnections.size();
    }
    
    public void shutdown() throws SQLException {
        for (Connection connection : usedConnections) {
            connection.close();
        }
        for (Connection connection : connectionPool) {
            connection.close();
        }
        connectionPool.clear();
        usedConnections.clear();
    }
}

// Proxy for Connection
class ConnectionProxy implements java.sql.Connection {
    private Connection realConnection;
    private ConnectionPool pool;
    
    public ConnectionProxy(Connection connection, ConnectionPool pool) {
        this.realConnection = connection;
        this.pool = pool;
    }
    
    @Override
    public void close() throws SQLException {
        // Instead of actually closing, return to pool
        pool.releaseConnection(realConnection);
    }
    
    // Implement all other methods of Connection interface by delegating to realConnection
    // For brevity, only a few methods are shown here
    
    @Override
    public java.sql.Statement createStatement() throws SQLException {
        return realConnection.createStatement();
    }
    
    @Override
    public java.sql.PreparedStatement prepareStatement(String sql) throws SQLException {
        return realConnection.prepareStatement(sql);
    }
    
    // ... other methods ...
    
    // This is just a simplified example. In a real implementation, 
    // you would need to implement all methods of the Connection interface.
}
```

## Proxy Pattern-nin Üstünlükləri

1. **Separation of Concerns**: Client-i implementation detallarından ayırır
2. **Security**: Orijinal obyektə çıxışı idarə edir və təhlükəsizlik təmin edir
3. **Performance**: Caching və lazy loading vasitəsilə performance-ı artırır
4. **Open/Closed Principle**: Mövcud kodu dəyişdirmədən yeni funksionallıq əlavə etməyə imkan verir

## Proxy Pattern-nin Çatışmazlıqları

1. **Complexity**: Əlavə class-lar yaratmaqla kod-un mürəkkəbliyini artırır
2. **Response Time**: Proxy layer-i əlavə etmək response time-ı artıra bilər
3. **Duplicate Code**: Proxy və RealSubject arasında kod təkrarı ola bilər

## Proxy Pattern-nin İstifadə Sahələri

1. **Lazy Loading**: Resource-intensive obyektlərin yaradılmasını təxirə salmaq
2. **Access Control**: Obyektlərə çıxışı idarə etmək və təhlükəsizlik təmin etmək
3. **Logging/Monitoring**: Obyektlərə edilən sorğuları izləmək
4. **Caching**: Təkrarlanan sorğuların nəticələrini cache-ləmək
5. **Remote Communication**: Uzaq obyektlərlə əlaqə saxlamaq

## Proxy Pattern-nin Digər Pattern-lərlə Müqayisəsi

### Proxy vs Adapter

- **Proxy**: Eyni interface-i təqdim edir və orijinal obyektə çıxışı idarə edir
- **Adapter**: Bir interface-i başqa bir interface-ə çevirir

### Proxy vs Decorator

- **Proxy**: Orijinal obyektə çıxışı idarə edir, lakin davranışını dəyişdirmir
- **Decorator**: Orijinal obyektin davranışını dəyişdirir və ya genişləndirir

### Proxy vs Facade

- **Proxy**: Tək bir obyektə çıxışı idarə edir
- **Facade**: Mürəkkəb alt sistemlər üçün sadə interface təqdim edir

## Nəticə

Proxy Design Pattern, başqa bir obyektin yerini tutan və ona çıxışı idarə edən güclü bir structural pattern-dir. Bu pattern, lazy loading, access control, logging, caching və remote representation kimi müxtəlif ssenarilər üçün faydalıdır. Java-da Proxy pattern-i həm manual olaraq, həm də `java.lang.reflect.Proxy` class-ı vasitəsilə dinamik olaraq implementasiya etmək mümkündür. Proxy pattern-in düzgün istifadəsi, kod-un daha modular, təhlükəsiz və effektiv olmasını təmin edir.