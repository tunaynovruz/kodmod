---
draft: true
title: Strategy Design Pattern
description: Strategy design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: strategy-design-pattern
tags: [design-patterns, behavioral, strategy, java]
keywords: [strategy pattern, design pattern, behavioral pattern, java]
hide_table_of_contents: false
---

# Strategy Design Pattern


Strategy Design Pattern, behavioral design pattern-lərdən biridir və bir algoritmin müxtəlif variantlarını təyin etməyə, onları ayrı class-larda encapsulate etməyə və runtime-da onları dəyişdirməyə imkan verir. Bu pattern, bir class-ın davranışını və ya alqoritmini runtime-da dəyişdirməyə imkan verir.

Strategy pattern, "Open/Closed Principle"-i tətbiq edir - class-lar genişləndirmə üçün açıq, dəyişiklik üçün bağlı olmalıdır. Bu pattern, if-else və ya switch statements-ləri əvəz etməklə, kod-un daha maintainable və genişləndirilə bilən olmasını təmin edir.

## Strategy Pattern-nin Əsas Xüsusiyyətləri

- **Behavior Encapsulation**: Alqoritmləri ayrı class-larda encapsulate edir
- **Runtime Flexibility**: Runtime-da alqoritmləri dəyişdirməyə imkan verir
- **Eliminates Conditional Statements**: if-else və ya switch statements-ləri əvəz edir
- **Open/Closed Principle**: Mövcud kodu dəyişdirmədən yeni alqoritmlər əlavə etməyə imkan verir

## Strategy Pattern-nin Strukturu

1. **Strategy**: Bütün supported alqoritmlər üçün ümumi interface
2. **Concrete Strategies**: Strategy interface-ni implement edən və konkret alqoritmləri təqdim edən class-lar
3. **Context**: Strategy obyektinə istinad saxlayan və onunla işləyən class
4. **Client**: Context və Strategy obyektlərini yaradır və konfiqurasiya edir

## Java-da Strategy Pattern İmplementasiyası

### Sadə Strategy Pattern Nümunəsi


<details>
<summary>Koda bax</summary>

```java
// Strategy interface
interface PaymentStrategy {
    void pay(int amount);
}

// Concrete Strategies
class CreditCardStrategy implements PaymentStrategy {
    private String name;
    private String cardNumber;
    private String cvv;
    private String dateOfExpiry;
    
    public CreditCardStrategy(String name, String cardNumber, String cvv, String dateOfExpiry) {
        this.name = name;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.dateOfExpiry = dateOfExpiry;
    }
    
    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid with credit card");
    }
}

class PayPalStrategy implements PaymentStrategy {
    private String emailId;
    private String password;
    
    public PayPalStrategy(String emailId, String password) {
        this.emailId = emailId;
        this.password = password;
    }
    
    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid using PayPal");
    }
}

class BitcoinStrategy implements PaymentStrategy {
    private String walletAddress;
    
    public BitcoinStrategy(String walletAddress) {
        this.walletAddress = walletAddress;
    }
    
    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid using Bitcoin");
    }
}

// Context
class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    
    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }
    
    public void checkout(int amount) {
        paymentStrategy.pay(amount);
    }
}

// Client code
public class StrategyPatternDemo {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        
        // Pay with credit card
        cart.setPaymentStrategy(new CreditCardStrategy("John Doe", "1234567890123456", "123", "12/2025"));
        cart.checkout(100);
        
        // Pay with PayPal
        cart.setPaymentStrategy(new PayPalStrategy("john.doe@example.com", "password"));
        cart.checkout(200);
        
        // Pay with Bitcoin
        cart.setPaymentStrategy(new BitcoinStrategy("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"));
        cart.checkout(300);
    }
}
```
</details>

### Daha Mürəkkəb Strategy Pattern Nümunəsi


<details>
<summary>Koda bax</summary>

```java
import java.util.ArrayList;
import java.util.List;

// Strategy interface
interface SortingStrategy {
    <T extends Comparable<T>> void sort(List<T> items);
    String getName();
}

// Concrete Strategies
class BubbleSortStrategy implements SortingStrategy {
    @Override
    public <T extends Comparable<T>> void sort(List<T> items) {
        System.out.println("Sorting using Bubble Sort");
        // Bubble Sort implementation
        int n = items.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (items.get(j).compareTo(items.get(j + 1)) > 0) {
                    // Swap items
                    T temp = items.get(j);
                    items.set(j, items.get(j + 1));
                    items.set(j + 1, temp);
                }
            }
        }
    }
    
    @Override
    public String getName() {
        return "Bubble Sort";
    }
}

class QuickSortStrategy implements SortingStrategy {
    @Override
    public <T extends Comparable<T>> void sort(List<T> items) {
        System.out.println("Sorting using Quick Sort");
        // Quick Sort implementation
        quickSort(items, 0, items.size() - 1);
    }
    
    private <T extends Comparable<T>> void quickSort(List<T> items, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(items, low, high);
            quickSort(items, low, pivotIndex - 1);
            quickSort(items, pivotIndex + 1, high);
        }
    }
    
    private <T extends Comparable<T>> int partition(List<T> items, int low, int high) {
        T pivot = items.get(high);
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (items.get(j).compareTo(pivot) <= 0) {
                i++;
                // Swap items
                T temp = items.get(i);
                items.set(i, items.get(j));
                items.set(j, temp);
            }
        }
        
        // Swap pivot to its final position
        T temp = items.get(i + 1);
        items.set(i + 1, items.get(high));
        items.set(high, temp);
        
        return i + 1;
    }
    
    @Override
    public String getName() {
        return "Quick Sort";
    }
}

class MergeSortStrategy implements SortingStrategy {
    @Override
    public <T extends Comparable<T>> void sort(List<T> items) {
        System.out.println("Sorting using Merge Sort");
        // Merge Sort implementation
        mergeSort(items, 0, items.size() - 1);
    }
    
    private <T extends Comparable<T>> void mergeSort(List<T> items, int left, int right) {
        if (left < right) {
            int middle = (left + right) / 2;
            mergeSort(items, left, middle);
            mergeSort(items, middle + 1, right);
            merge(items, left, middle, right);
        }
    }
    
    private <T extends Comparable<T>> void merge(List<T> items, int left, int middle, int right) {
        // Create temporary lists
        List<T> leftList = new ArrayList<>();
        List<T> rightList = new ArrayList<>();
        
        // Copy data to temporary lists
        for (int i = left; i <= middle; i++) {
            leftList.add(items.get(i));
        }
        for (int i = middle + 1; i <= right; i++) {
            rightList.add(items.get(i));
        }
        
        // Merge the temporary lists
        int i = 0, j = 0, k = left;
        while (i < leftList.size() && j < rightList.size()) {
            if (leftList.get(i).compareTo(rightList.get(j)) <= 0) {
                items.set(k, leftList.get(i));
                i++;
            } else {
                items.set(k, rightList.get(j));
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i < leftList.size()) {
            items.set(k, leftList.get(i));
            i++;
            k++;
        }
        while (j < rightList.size()) {
            items.set(k, rightList.get(j));
            j++;
            k++;
        }
    }
    
    @Override
    public String getName() {
        return "Merge Sort";
    }
}

// Context
class SortingContext {
    private SortingStrategy strategy;
    
    public void setStrategy(SortingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public <T extends Comparable<T>> void sort(List<T> items) {
        if (strategy == null) {
            throw new IllegalStateException("Sorting strategy not set");
        }
        
        long startTime = System.currentTimeMillis();
        strategy.sort(items);
        long endTime = System.currentTimeMillis();
        
        System.out.println("Sorting completed using " + strategy.getName() + 
                           " in " + (endTime - startTime) + "ms");
    }
}

// Client code
public class SortingStrategyDemo {
    public static void main(String[] args) {
        // Create context
        SortingContext context = new SortingContext();
        
        // Create data to sort
        List<Integer> numbers = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            numbers.add((int) (Math.random() * 1000));
        }
        
        // Create a copy for each strategy
        List<Integer> bubbleSortNumbers = new ArrayList<>(numbers);
        List<Integer> quickSortNumbers = new ArrayList<>(numbers);
        List<Integer> mergeSortNumbers = new ArrayList<>(numbers);
        
        // Use Bubble Sort strategy
        context.setStrategy(new BubbleSortStrategy());
        context.sort(bubbleSortNumbers);
        
        // Use Quick Sort strategy
        context.setStrategy(new QuickSortStrategy());
        context.sort(quickSortNumbers);
        
        // Use Merge Sort strategy
        context.setStrategy(new MergeSortStrategy());
        context.sort(mergeSortNumbers);
        
        // Verify all strategies produced the same result
        System.out.println("All strategies produced the same sorted result: " + 
                           (bubbleSortNumbers.equals(quickSortNumbers) && 
                            quickSortNumbers.equals(mergeSortNumbers)));
    }
}
```
</details>

## Real-World Nümunələr

### Compression Strategies


<details>
<summary>Koda bax</summary>

```java
import java.io.*;
import java.util.zip.*;

// Strategy interface
interface CompressionStrategy {
    void compressFiles(File[] files, File destination);
}

// Concrete Strategies
class ZipCompressionStrategy implements CompressionStrategy {
    @Override
    public void compressFiles(File[] files, File destination) {
        System.out.println("Compressing files using ZIP format");
        try (ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(destination))) {
            for (File file : files) {
                if (file.isFile()) {
                    try (FileInputStream fis = new FileInputStream(file)) {
                        ZipEntry zipEntry = new ZipEntry(file.getName());
                        zipOut.putNextEntry(zipEntry);
                        
                        byte[] bytes = new byte[1024];
                        int length;
                        while ((length = fis.read(bytes)) >= 0) {
                            zipOut.write(bytes, 0, length);
                        }
                    }
                }
            }
            System.out.println("Files compressed successfully to " + destination.getName());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class GZipCompressionStrategy implements CompressionStrategy {
    @Override
    public void compressFiles(File[] files, File destination) {
        System.out.println("Compressing files using GZIP format");
        // For simplicity, we'll compress only the first file
        if (files.length > 0) {
            File file = files[0];
            try (GZIPOutputStream gzipOut = new GZIPOutputStream(new FileOutputStream(destination));
                 FileInputStream fis = new FileInputStream(file)) {
                
                byte[] bytes = new byte[1024];
                int length;
                while ((length = fis.read(bytes)) >= 0) {
                    gzipOut.write(bytes, 0, length);
                }
                System.out.println("File compressed successfully to " + destination.getName());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

class TarCompressionStrategy implements CompressionStrategy {
    @Override
    public void compressFiles(File[] files, File destination) {
        System.out.println("Compressing files using TAR format");
        // In a real implementation, we would use a TAR library
        // For this example, we'll just simulate the process
        System.out.println("TAR compression simulated for " + files.length + " files to " + destination.getName());
    }
}

// Context
class CompressionContext {
    private CompressionStrategy strategy;
    
    public void setCompressionStrategy(CompressionStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void createArchive(File[] files, File destination) {
        if (strategy == null) {
            throw new IllegalStateException("Compression strategy not set");
        }
        strategy.compressFiles(files, destination);
    }
}

// Client code
public class CompressionStrategyDemo {
    public static void main(String[] args) {
        // Create context
        CompressionContext context = new CompressionContext();
        
        // Create sample files (in a real scenario, these would be actual files)
        File file1 = new File("file1.txt");
        File file2 = new File("file2.txt");
        File[] files = {file1, file2};
        
        // Use ZIP compression
        context.setCompressionStrategy(new ZipCompressionStrategy());
        context.createArchive(files, new File("archive.zip"));
        
        // Use GZIP compression
        context.setCompressionStrategy(new GZipCompressionStrategy());
        context.createArchive(files, new File("archive.gz"));
        
        // Use TAR compression
        context.setCompressionStrategy(new TarCompressionStrategy());
        context.createArchive(files, new File("archive.tar"));
    }
}
```
</details>

### Validation Strategies


<details>
<summary>Koda bax</summary>

```java
import java.util.regex.Pattern;

// Strategy interface
interface ValidationStrategy {
    boolean validate(String input);
    String getErrorMessage();
}

// Concrete Strategies
class EmailValidationStrategy implements ValidationStrategy {
    private static final String EMAIL_PATTERN = 
        "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
        "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    
    private final Pattern pattern = Pattern.compile(EMAIL_PATTERN);
    
    @Override
    public boolean validate(String input) {
        return input != null && pattern.matcher(input).matches();
    }
    
    @Override
    public String getErrorMessage() {
        return "Invalid email format";
    }
}

class PasswordValidationStrategy implements ValidationStrategy {
    @Override
    public boolean validate(String input) {
        // Password must be at least 8 characters, contain at least one digit,
        // one lowercase letter, one uppercase letter, and one special character
        if (input == null || input.length() < 8) {
            return false;
        }
        
        boolean hasDigit = false;
        boolean hasLower = false;
        boolean hasUpper = false;
        boolean hasSpecial = false;
        
        for (char c : input.toCharArray()) {
            if (Character.isDigit(c)) {
                hasDigit = true;
            } else if (Character.isLowerCase(c)) {
                hasLower = true;
            } else if (Character.isUpperCase(c)) {
                hasUpper = true;
            } else if (!Character.isLetterOrDigit(c)) {
                hasSpecial = true;
            }
        }
        
        return hasDigit && hasLower && hasUpper && hasSpecial;
    }
    
    @Override
    public String getErrorMessage() {
        return "Password must be at least 8 characters and contain at least one digit, " +
               "one lowercase letter, one uppercase letter, and one special character";
    }
}

class PhoneNumberValidationStrategy implements ValidationStrategy {
    private static final String PHONE_PATTERN = "^\\+?[0-9]{10,15}$";
    
    private final Pattern pattern = Pattern.compile(PHONE_PATTERN);
    
    @Override
    public boolean validate(String input) {
        return input != null && pattern.matcher(input).matches();
    }
    
    @Override
    public String getErrorMessage() {
        return "Invalid phone number format";
    }
}

// Context
class Validator {
    private ValidationStrategy strategy;
    
    public void setStrategy(ValidationStrategy strategy) {
        this.strategy = strategy;
    }
    
    public boolean validate(String input) {
        if (strategy == null) {
            throw new IllegalStateException("Validation strategy not set");
        }
        return strategy.validate(input);
    }
    
    public String getErrorMessage() {
        if (strategy == null) {
            throw new IllegalStateException("Validation strategy not set");
        }
        return strategy.getErrorMessage();
    }
}

// Client code
public class ValidationStrategyDemo {
    public static void main(String[] args) {
        // Create validator
        Validator validator = new Validator();
        
        // Validate email
        validator.setStrategy(new EmailValidationStrategy());
        String email = "john.doe@example.com";
        boolean isValidEmail = validator.validate(email);
        System.out.println("Email '" + email + "' is " + (isValidEmail ? "valid" : "invalid"));
        if (!isValidEmail) {
            System.out.println("Error: " + validator.getErrorMessage());
        }
        
        // Validate password
        validator.setStrategy(new PasswordValidationStrategy());
        String password = "Passw0rd!";
        boolean isValidPassword = validator.validate(password);
        System.out.println("Password is " + (isValidPassword ? "valid" : "invalid"));
        if (!isValidPassword) {
            System.out.println("Error: " + validator.getErrorMessage());
        }
        
        // Validate phone number
        validator.setStrategy(new PhoneNumberValidationStrategy());
        String phoneNumber = "+1234567890";
        boolean isValidPhone = validator.validate(phoneNumber);
        System.out.println("Phone number '" + phoneNumber + "' is " + (isValidPhone ? "valid" : "invalid"));
        if (!isValidPhone) {
            System.out.println("Error: " + validator.getErrorMessage());
        }
    }
}
```
</details>

## Strategy Pattern-nin Üstünlükləri

1. **Flexibility**: Runtime-da alqoritmləri dəyişdirməyə imkan verir
2. **Reusability**: Alqoritmləri müxtəlif kontekstlərdə yenidən istifadə etməyə imkan verir
3. **Open/Closed Principle**: Mövcud kodu dəyişdirmədən yeni alqoritmlər əlavə etməyə imkan verir
4. **Eliminates Conditional Statements**: if-else və ya switch statements-ləri əvəz edir
5. **Separation of Concerns**: Alqoritmləri kontekstdən ayırır

## Strategy Pattern-nin Çatışmazlıqları

1. **Increased Number of Objects**: Çoxlu sayda strategy class-ları yaratmaq lazım gəlir
2. **Client Awareness**: Client, müxtəlif strategiyalar haqqında məlumatlı olmalıdır
3. **Communication Overhead**: Context və strategy arasında əlavə kommunikasiya tələb olunur
4. **Increased Complexity**: Sadə hallarda pattern-in tətbiqi həddindən artıq mürəkkəb ola bilər

## Strategy Pattern-nin İstifadə Sahələri

1. **Multiple Algorithms**: Bir problemin həlli üçün müxtəlif alqoritmlər olduqda
2. **Runtime Algorithm Selection**: Runtime-da alqoritm seçimi tələb olunduqda
3. **Avoiding Conditional Statements**: if-else və ya switch statements-ləri əvəz etmək lazım olduqda
4. **Isolating Algorithm Implementation**: Alqoritm implementasiyasını client-dən gizlətmək lazım olduqda

## Strategy Pattern-nin Digər Pattern-lərlə Müqayisəsi

### Strategy vs Command

- **Strategy**: Bir işi yerinə yetirmək üçün müxtəlif yollar təqdim edir
- **Command**: İşi yerinə yetirmək üçün lazım olan bütün məlumatları encapsulate edir

### Strategy vs Template Method

- **Strategy**: Composition istifadə edərək davranışı dəyişdirir
- **Template Method**: Inheritance istifadə edərək davranışı dəyişdirir

### Strategy vs State

- **Strategy**: Client tərəfindən seçilən alqoritmi dəyişdirir
- **State**: Obyektin daxili vəziyyətinə əsasən davranışı dəyişdirir

