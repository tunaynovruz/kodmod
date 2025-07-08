---
title: Array Data Structure
description: Array data strukturunun ətraflı izahı və Java-da implementasiyası
slug: array-data-structure
tags: [data-strukturlar, array, java]
keywords: [array, massiv, data struktur, java]
hide_table_of_contents: false
---

# Array Data Structure

## Giriş

Array (massiv) data strukturu, eyni tipdən olan elementlərin ardıcıl yaddaş bölgəsində saxlanıldığı ən əsas və geniş istifadə olunan data strukturudur. Array-lər, elementlərə birbaşa indeks vasitəsilə çatmağa imkan verir və bu səbəbdən də random access əməliyyatları üçün çox effektivdir.

## Array-in Əsas Xüsusiyyətləri

- **Fixed Size**: Java-da array-lər yaradıldıqdan sonra ölçüsü dəyişmir
- **Homogeneous Elements**: Eyni tipdən olan elementləri saxlayır
- **Contiguous Memory**: Elementlər yaddaşda ardıcıl yerləşir
- **Random Access**: O(1) vaxt mürəkkəbliyi ilə istənilən elementə çatmaq mümkündür
- **Index-Based**: Elementlərə indeks vasitəsilə müraciət olunur (0-dan başlayaraq)

## Array-in Növləri

### 1. One-Dimensional Array (Bir Ölçülü Massiv)

Bir ölçülü array, elementlərin bir sırada düzüldüyü ən sadə array növüdür.

```java
// Bir ölçülü array yaratmaq
int[] numbers = new int[5]; // 5 elementli int array
int[] initializedArray = {1, 2, 3, 4, 5}; // İlkin dəyərlərlə yaradılmış array
```

### 2. Multi-Dimensional Array (Çox Ölçülü Massiv)

Çox ölçülü array-lər, array-lərin array-i kimi düşünülə bilər. İki ölçülü array matris kimi təsəvvür edilə bilər.

```java
// İki ölçülü array yaratmaq
int[][] matrix = new int[3][4]; // 3x4 ölçülü matris
int[][] initializedMatrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}; // İlkin dəyərlərlə
```

## Array-in Java-da İmplementasiyası

### Bir Ölçülü Array Əməliyyatları

```java
public class ArrayOperations {
    public static void main(String[] args) {
        // Array yaratmaq
        int[] arr = new int[5];
        
        // Elementləri əlavə etmək
        arr[0] = 10;
        arr[1] = 20;
        arr[2] = 30;
        arr[3] = 40;
        arr[4] = 50;
        
        // Array-i çap etmək
        System.out.print("Array: ");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        
        // For-each loop ilə array-i çap etmək
        System.out.print("Array (for-each): ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // Elementi əldə etmək
        int element = arr[2];
        System.out.println("Element at index 2: " + element);
        
        // Elementi dəyişdirmək
        arr[2] = 35;
        System.out.println("After changing element at index 2: " + arr[2]);
        
        // Array-in uzunluğunu əldə etmək
        int length = arr.length;
        System.out.println("Array length: " + length);
        
        // Array-i kopyalamaq
        int[] arrCopy = new int[arr.length];
        System.arraycopy(arr, 0, arrCopy, 0, arr.length);
        
        // Arrays class-ının metodları
        Arrays.sort(arr); // Array-i sıralamaq
        System.out.print("Sorted array: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        int index = Arrays.binarySearch(arr, 35); // Binary search
        System.out.println("Index of 35: " + index);
        
        Arrays.fill(arr, 0, 2, 100); // Müəyyən hissəni doldurmaq
        System.out.print("After filling: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        boolean isEqual = Arrays.equals(arr, arrCopy); // İki array-i müqayisə etmək
        System.out.println("Arrays are equal: " + isEqual);
    }
}
```

### İki Ölçülü Array Əməliyyatları

```java
public class TwoDimensionalArrayOperations {
    public static void main(String[] args) {
        // İki ölçülü array yaratmaq
        int[][] matrix = new int[3][3];
        
        // Elementləri əlavə etmək
        int value = 1;
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = value++;
            }
        }
        
        // Matrix-i çap etmək
        System.out.println("Matrix:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        
        // For-each loop ilə matrix-i çap etmək
        System.out.println("\nMatrix (for-each):");
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.print(element + " ");
            }
            System.out.println();
        }
        
        // Elementi əldə etmək
        int element = matrix[1][1];
        System.out.println("\nElement at position [1][1]: " + element);
        
        // Elementi dəyişdirmək
        matrix[1][1] = 99;
        System.out.println("After changing element at position [1][1]: " + matrix[1][1]);
        
        // Matrix-in ölçülərini əldə etmək
        int rows = matrix.length;
        int columns = matrix[0].length;
        System.out.println("Matrix dimensions: " + rows + "x" + columns);
    }
}
```

## Dynamic Array (ArrayList) İmplementasiyası

Java-da standart array-lər fixed-size olduğu üçün, dinamik ölçülü array-lər üçün `ArrayList` class-ı istifadə olunur:

```java
import java.util.ArrayList;
import java.util.List;

public class ArrayListExample {
    public static void main(String[] args) {
        // ArrayList yaratmaq
        List<Integer> list = new ArrayList<>();
        
        // Elementləri əlavə etmək
        list.add(10);
        list.add(20);
        list.add(30);
        list.add(40);
        list.add(50);
        
        // ArrayList-i çap etmək
        System.out.println("ArrayList: " + list);
        
        // Elementi əldə etmək
        int element = list.get(2);
        System.out.println("Element at index 2: " + element);
        
        // Elementi dəyişdirmək
        list.set(2, 35);
        System.out.println("After changing element at index 2: " + list);
        
        // Müəyyən indeksə element əlavə etmək
        list.add(2, 25);
        System.out.println("After adding element at index 2: " + list);
        
        // Elementi silmək
        list.remove(1);
        System.out.println("After removing element at index 1: " + list);
        
        // ArrayList-in ölçüsünü əldə etmək
        int size = list.size();
        System.out.println("ArrayList size: " + size);
        
        // ArrayList-də elementi axtarmaq
        boolean contains = list.contains(35);
        System.out.println("ArrayList contains 35: " + contains);
        
        int index = list.indexOf(35);
        System.out.println("Index of 35: " + index);
        
        // ArrayList-i təmizləmək
        list.clear();
        System.out.println("After clearing: " + list);
        System.out.println("Is empty: " + list.isEmpty());
    }
}
```

## Array-in Öz İmplementasiyası

Aşağıda, dinamik array-in sadə bir implementasiyası göstərilmişdir:

```java
public class DynamicArray<T> {
    private Object[] array;
    private int size;
    private int capacity;
    
    // Constructor
    public DynamicArray() {
        this.capacity = 10;
        this.size = 0;
        this.array = new Object[capacity];
    }
    
    public DynamicArray(int initialCapacity) {
        if (initialCapacity < 0) {
            throw new IllegalArgumentException("Capacity cannot be negative: " + initialCapacity);
        }
        this.capacity = initialCapacity;
        this.size = 0;
        this.array = new Object[capacity];
    }
    
    // Array-in ölçüsünü əldə etmək
    public int size() {
        return size;
    }
    
    // Array-in boş olub-olmadığını yoxlamaq
    public boolean isEmpty() {
        return size == 0;
    }
    
    // Elementi əldə etmək
    @SuppressWarnings("unchecked")
    public T get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        return (T) array[index];
    }
    
    // Elementi dəyişdirmək
    public void set(int index, T element) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        array[index] = element;
    }
    
    // Sona element əlavə etmək
    public void add(T element) {
        if (size == capacity) {
            ensureCapacity(capacity * 2);
        }
        array[size++] = element;
    }
    
    // Müəyyən indeksə element əlavə etmək
    public void add(int index, T element) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        
        if (size == capacity) {
            ensureCapacity(capacity * 2);
        }
        
        // Elementləri sağa sürüşdürmək
        for (int i = size; i > index; i--) {
            array[i] = array[i - 1];
        }
        
        array[index] = element;
        size++;
    }
    
    // Elementi silmək
    public T remove(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        
        @SuppressWarnings("unchecked")
        T removedElement = (T) array[index];
        
        // Elementləri sola sürüşdürmək
        for (int i = index; i < size - 1; i++) {
            array[i] = array[i + 1];
        }
        
        array[size - 1] = null; // Köhnə referansı təmizləmək
        size--;
        
        // Əgər array-in ölçüsü capacity-nin 1/4-dən kiçikdirsə, capacity-ni azaltmaq
        if (size > 0 && size == capacity / 4) {
            ensureCapacity(capacity / 2);
        }
        
        return removedElement;
    }
    
    // Capacity-ni artırmaq
    private void ensureCapacity(int newCapacity) {
        Object[] newArray = new Object[newCapacity];
        for (int i = 0; i < size; i++) {
            newArray[i] = array[i];
        }
        array = newArray;
        capacity = newCapacity;
    }
    
    // Array-i çap etmək
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < size; i++) {
            sb.append(array[i]);
            if (i < size - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }
    
    // Main method
    public static void main(String[] args) {
        DynamicArray<Integer> dynamicArray = new DynamicArray<>();
        
        // Elementləri əlavə etmək
        dynamicArray.add(10);
        dynamicArray.add(20);
        dynamicArray.add(30);
        dynamicArray.add(40);
        dynamicArray.add(50);
        
        System.out.println("DynamicArray: " + dynamicArray);
        
        // Elementi əldə etmək
        System.out.println("Element at index 2: " + dynamicArray.get(2));
        
        // Elementi dəyişdirmək
        dynamicArray.set(2, 35);
        System.out.println("After changing element at index 2: " + dynamicArray);
        
        // Müəyyən indeksə element əlavə etmək
        dynamicArray.add(2, 25);
        System.out.println("After adding element at index 2: " + dynamicArray);
        
        // Elementi silmək
        int removed = dynamicArray.remove(1);
        System.out.println("Removed element: " + removed);
        System.out.println("After removing element at index 1: " + dynamicArray);
        
        // Array-in ölçüsünü əldə etmək
        System.out.println("DynamicArray size: " + dynamicArray.size());
    }
}
```

## Array vs. LinkedList

| Aspekt                | Array                              | LinkedList                          |
|-----------------------|-----------------------------------|-------------------------------------|
| Yaddaş Yerləşməsi     | Contiguous                         | Non-contiguous                      |
| Ölçü                  | Fixed (ArrayList dinamik)          | Dinamik                             |
| Element Əlavə Etmək   | O(n) - ortalama                    | O(1) - əvvələ və sona               |
| Element Silmək        | O(n) - ortalama                    | O(1) - əvvəldən və sondan           |
| Random Access         | O(1)                               | O(n)                                |
| Yaddaş İstifadəsi     | Yalnız data                        | Data + pointer(s)                   |
| İmplementasiya        | Daha sadə                          | Nisbətən mürəkkəb                   |

## Array-in İstifadə Sahələri

1. **Sorting Algorithms**: Sıralama alqoritmləri
2. **Searching Algorithms**: Axtarış alqoritmləri
3. **Matrix Operations**: Matris əməliyyatları
4. **Dynamic Programming**: Dinamik proqramlaşdırma
5. **Hash Tables**: Hash cədvəlləri
6. **Buffer for I/O Operations**: Giriş/çıxış əməliyyatları üçün bufer

## Array-in Mürəkkəbliyi

| Əməliyyat | Time Complexity |
|-----------|-----------------|
| Access    | O(1)            |
| Search    | O(n)            |
| Insert    | O(n)            |
| Delete    | O(n)            |

## Nəticə

Array data strukturu, elementlərə sürətli çatmaq imkanı verən və bir çox alqoritm və tətbiqdə geniş istifadə olunan fundamental bir data strukturudur. Java-da həm fixed-size array-lər, həm də dinamik ölçülü ArrayList kimi implementasiyalar mövcuddur. Array-lər, random access əməliyyatları üçün çox effektivdir, lakin element əlavə etmək və silmək kimi əməliyyatlar üçün LinkedList kimi digər data strukturlar daha uyğun ola bilər.