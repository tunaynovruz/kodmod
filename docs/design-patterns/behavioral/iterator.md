---
title: Iterator Design Pattern
description: Iterator design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: iterator-design-pattern
tags: [design-patterns, behavioral, iterator, java]
keywords: [iterator pattern, design pattern, behavioral pattern, java]
hide_table_of_contents: false
---

# Iterator Design Pattern

## Giriş

Iterator Design Pattern, behavioral design pattern-lərdən biridir və kolleksiya elementlərinə onların daxili strukturunu açıqlamadan ardıcıl çıxış təmin etməyə imkan verir. Bu pattern, kolleksiya üzərində iterasiya məntiqini kolleksiyanın özündən ayırır və beləliklə, müxtəlif kolleksiya növləri üçün vahid iterasiya interfeysi təqdim edir.

Iterator pattern, real həyatda kitabxana kataloqu ilə işləməyə bənzəyir. Kitablar müxtəlif rəflərdə və bölmələrdə yerləşdirilə bilər, lakin kataloq sistemi istifadəçilərə kitabların necə saxlanıldığını bilmədən onları tapmağa imkan verir.

## Iterator Pattern-nin Əsas Xüsusiyyətləri

- **Separation of Concerns**: Kolleksiya və iterasiya məntiqini ayırır
- **Uniform Access**: Müxtəlif kolleksiya növləri üçün vahid iterasiya interfeysi təqdim edir
- **Multiple Traversals**: Eyni kolleksiya üzərində paralel iterasiyalara imkan verir
- **Simplified Client Code**: Client kod-un kolleksiyanın daxili strukturunu bilməsinə ehtiyac qalmır

## Iterator Pattern-nin Strukturu

1. **Iterator**: Kolleksiya elementlərinə çıxış üçün metodlar təqdim edən interface
2. **Concrete Iterator**: Iterator interface-ni implement edən və konkret kolleksiya üzərində iterasiya edən class
3. **Aggregate**: Iterator yaratmaq üçün interface təqdim edən interface
4. **Concrete Aggregate**: Aggregate interface-ni implement edən və müvafiq Concrete Iterator-u yaradan class

## Java-da Iterator Pattern İmplementasiyası

### Sadə Iterator Pattern Nümunəsi

```java
import java.util.NoSuchElementException;

// Iterator interface
interface Iterator<T> {
    boolean hasNext();
    T next();
}

// Aggregate interface
interface Collection<T> {
    Iterator<T> createIterator();
}

// Concrete Aggregate
class ArrayCollection<T> implements Collection<T> {
    private T[] items;
    
    @SuppressWarnings("unchecked")
    public ArrayCollection(int size) {
        items = (T[]) new Object[size];
    }
    
    public void set(int index, T item) {
        items[index] = item;
    }
    
    public T get(int index) {
        return items[index];
    }
    
    public int size() {
        return items.length;
    }
    
    @Override
    public Iterator<T> createIterator() {
        return new ArrayIterator<>(this);
    }
    
    // Concrete Iterator
    private static class ArrayIterator<T> implements Iterator<T> {
        private ArrayCollection<T> collection;
        private int currentIndex = 0;
        
        public ArrayIterator(ArrayCollection<T> collection) {
            this.collection = collection;
        }
        
        @Override
        public boolean hasNext() {
            return currentIndex < collection.size();
        }
        
        @Override
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return collection.get(currentIndex++);
        }
    }
}

// Client code
public class IteratorPatternDemo {
    public static void main(String[] args) {
        // Create a collection
        ArrayCollection<String> names = new ArrayCollection<>(5);
        names.set(0, "John");
        names.set(1, "Alice");
        names.set(2, "Bob");
        names.set(3, "Mary");
        names.set(4, "Tom");
        
        // Create an iterator
        Iterator<String> iterator = names.createIterator();
        
        // Iterate through the collection
        System.out.println("Iterating through names:");
        while (iterator.hasNext()) {
            String name = iterator.next();
            System.out.println(name);
        }
    }
}
```

### Müxtəlif Kolleksiya Növləri üçün Iterator

```java
import java.util.NoSuchElementException;

// Iterator interface
interface Iterator<T> {
    boolean hasNext();
    T next();
}

// Aggregate interface
interface Collection<T> {
    Iterator<T> createIterator();
    void add(T item);
    int size();
}

// Concrete Aggregate - Array based
class ArrayCollection<T> implements Collection<T> {
    private static final int DEFAULT_CAPACITY = 10;
    private Object[] items;
    private int size = 0;
    
    public ArrayCollection() {
        items = new Object[DEFAULT_CAPACITY];
    }
    
    @Override
    public void add(T item) {
        if (size == items.length) {
            // Resize array if needed
            Object[] newItems = new Object[items.length * 2];
            System.arraycopy(items, 0, newItems, 0, items.length);
            items = newItems;
        }
        items[size++] = item;
    }
    
    @SuppressWarnings("unchecked")
    public T get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }
        return (T) items[index];
    }
    
    @Override
    public int size() {
        return size;
    }
    
    @Override
    public Iterator<T> createIterator() {
        return new ArrayIterator<>(this);
    }
    
    // Concrete Iterator for Array
    private static class ArrayIterator<T> implements Iterator<T> {
        private ArrayCollection<T> collection;
        private int currentIndex = 0;
        
        public ArrayIterator(ArrayCollection<T> collection) {
            this.collection = collection;
        }
        
        @Override
        public boolean hasNext() {
            return currentIndex < collection.size();
        }
        
        @Override
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return collection.get(currentIndex++);
        }
    }
}

// Concrete Aggregate - Linked List based
class LinkedListCollection<T> implements Collection<T> {
    private Node<T> head;
    private Node<T> tail;
    private int size = 0;
    
    private static class Node<T> {
        T data;
        Node<T> next;
        
        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }
    
    @Override
    public void add(T item) {
        Node<T> newNode = new Node<>(item);
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    @Override
    public int size() {
        return size;
    }
    
    @Override
    public Iterator<T> createIterator() {
        return new LinkedListIterator<>(head);
    }
    
    // Concrete Iterator for Linked List
    private static class LinkedListIterator<T> implements Iterator<T> {
        private Node<T> current;
        
        public LinkedListIterator(Node<T> head) {
            this.current = head;
        }
        
        @Override
        public boolean hasNext() {
            return current != null;
        }
        
        @Override
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            T data = current.data;
            current = current.next;
            return data;
        }
    }
}

// Client code
public class MultipleCollectionsDemo {
    public static void main(String[] args) {
        // Test with Array Collection
        Collection<String> arrayCollection = new ArrayCollection<>();
        arrayCollection.add("John");
        arrayCollection.add("Alice");
        arrayCollection.add("Bob");
        
        System.out.println("Array Collection:");
        printCollection(arrayCollection);
        
        // Test with Linked List Collection
        Collection<String> linkedListCollection = new LinkedListCollection<>();
        linkedListCollection.add("Mary");
        linkedListCollection.add("Tom");
        linkedListCollection.add("Kate");
        
        System.out.println("\nLinked List Collection:");
        printCollection(linkedListCollection);
    }
    
    // Generic method to print any collection using its iterator
    private static <T> void printCollection(Collection<T> collection) {
        Iterator<T> iterator = collection.createIterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```

### Müxtəlif İterasiya Strategiyaları

```java
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

// Iterator interface
interface Iterator<T> {
    boolean hasNext();
    T next();
}

// Aggregate interface
interface Tree<T> {
    Iterator<T> createInOrderIterator();
    Iterator<T> createPreOrderIterator();
    Iterator<T> createPostOrderIterator();
    Iterator<T> createLevelOrderIterator();
}

// Binary Tree Node
class TreeNode<T> {
    T data;
    TreeNode<T> left;
    TreeNode<T> right;
    
    public TreeNode(T data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Concrete Aggregate
class BinaryTree<T> implements Tree<T> {
    private TreeNode<T> root;
    
    public BinaryTree() {
        this.root = null;
    }
    
    public void insert(T data) {
        root = insertRec(root, data);
    }
    
    private TreeNode<T> insertRec(TreeNode<T> root, T data) {
        if (root == null) {
            root = new TreeNode<>(data);
            return root;
        }
        
        // This is a simple insertion logic for demonstration
        // In a real BST, you would compare values and insert accordingly
        if (Math.random() < 0.5) {
            root.left = insertRec(root.left, data);
        } else {
            root.right = insertRec(root.right, data);
        }
        
        return root;
    }
    
    @Override
    public Iterator<T> createInOrderIterator() {
        return new InOrderIterator<>(root);
    }
    
    @Override
    public Iterator<T> createPreOrderIterator() {
        return new PreOrderIterator<>(root);
    }
    
    @Override
    public Iterator<T> createPostOrderIterator() {
        return new PostOrderIterator<>(root);
    }
    
    @Override
    public Iterator<T> createLevelOrderIterator() {
        return new LevelOrderIterator<>(root);
    }
    
    // In-Order Iterator
    private static class InOrderIterator<T> implements Iterator<T> {
        private List<T> elements = new ArrayList<>();
        private int currentIndex = 0;
        
        public InOrderIterator(TreeNode<T> root) {
            inOrderTraversal(root);
        }
        
        private void inOrderTraversal(TreeNode<T> node) {
            if (node != null) {
                inOrderTraversal(node.left);
                elements.add(node.data);
                inOrderTraversal(node.right);
            }
        }
        
        @Override
        public boolean hasNext() {
            return currentIndex < elements.size();
        }
        
        @Override
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return elements.get(currentIndex++);
        }
    }
    
    // Pre-Order Iterator
    private static class PreOrderIterator<T> implements Iterator<T> {
        private List<T> elements = new ArrayList<>();
        private int currentIndex = 0;
        
        public PreOrderIterator(TreeNode<T> root) {
            preOrderTraversal(root);
        }
        
        private void preOrderTraversal(TreeNode<T> node) {
            if (node != null) {
                elements.add(node.data);
                preOrderTraversal(node.left);
                preOrderTraversal(node.right);
            }
        }
        
        @Override
        public boolean hasNext() {
            return currentIndex < elements.size();
        }
        
        @Override
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return elements.get(currentIndex++);
        }
    }
    
    // Post-Order Iterator
    private static class PostOrderIterator<T> implements Iterator<T> {
        private List<T> elements = new ArrayList<>();
        private int currentIndex = 0;
        
        public PostOrderIterator(TreeNode<T> root) {
            postOrderTraversal(root);
        }
        
        private void postOrderTraversal(TreeNode<T> node) {
            if (node != null) {
                postOrderTraversal(node.left);
                postOrderTraversal(node.right);
                elements.add(node.data);
            }
        }
        
        @Override
        public boolean hasNext() {
            return currentIndex < elements.size();
        }
        
        @Override
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return elements.get(currentIndex++);
        }
    }
    
    // Level-Order Iterator
    private static class LevelOrderIterator<T> implements Iterator<T> {
        private List<T> elements = new ArrayList<>();
        private int currentIndex = 0;
        
        public LevelOrderIterator(TreeNode<T> root) {
            if (root != null) {
                levelOrderTraversal(root);
            }
        }
        
        private void levelOrderTraversal(TreeNode<T> root) {
            int height = getHeight(root);
            for (int i = 1; i <= height; i++) {
                printGivenLevel(root, i);
            }
        }
        
        private int getHeight(TreeNode<T> root) {
            if (root == null) {
                return 0;
            } else {
                int leftHeight = getHeight(root.left);
                int rightHeight = getHeight(root.right);
                
                return Math.max(leftHeight, rightHeight) + 1;
            }
        }
        
        private void printGivenLevel(TreeNode<T> root, int level) {
            if (root == null) {
                return;
            }
            if (level == 1) {
                elements.add(root.data);
            } else if (level > 1) {
                printGivenLevel(root.left, level - 1);
                printGivenLevel(root.right, level - 1);
            }
        }
        
        @Override
        public boolean hasNext() {
            return currentIndex < elements.size();
        }
        
        @Override
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return elements.get(currentIndex++);
        }
    }
}

// Client code
public class TreeIteratorDemo {
    public static void main(String[] args) {
        // Create a binary tree
        BinaryTree<Integer> tree = new BinaryTree<>();
        tree.insert(50);
        tree.insert(30);
        tree.insert(70);
        tree.insert(20);
        tree.insert(40);
        tree.insert(60);
        tree.insert(80);
        
        // Use In-Order iterator
        System.out.println("In-Order Traversal:");
        Iterator<Integer> inOrderIterator = tree.createInOrderIterator();
        while (inOrderIterator.hasNext()) {
            System.out.print(inOrderIterator.next() + " ");
        }
        
        // Use Pre-Order iterator
        System.out.println("\n\nPre-Order Traversal:");
        Iterator<Integer> preOrderIterator = tree.createPreOrderIterator();
        while (preOrderIterator.hasNext()) {
            System.out.print(preOrderIterator.next() + " ");
        }
        
        // Use Post-Order iterator
        System.out.println("\n\nPost-Order Traversal:");
        Iterator<Integer> postOrderIterator = tree.createPostOrderIterator();
        while (postOrderIterator.hasNext()) {
            System.out.print(postOrderIterator.next() + " ");
        }
        
        // Use Level-Order iterator
        System.out.println("\n\nLevel-Order Traversal:");
        Iterator<Integer> levelOrderIterator = tree.createLevelOrderIterator();
        while (levelOrderIterator.hasNext()) {
            System.out.print(levelOrderIterator.next() + " ");
        }
    }
}
```

## Java Built-in Iterator

Java, `java.util.Iterator` interface-i vasitəsilə built-in iterator dəstəyi təqdim edir:

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class JavaBuiltInIteratorDemo {
    public static void main(String[] args) {
        // Create a collection
        List<String> names = new ArrayList<>();
        names.add("John");
        names.add("Alice");
        names.add("Bob");
        names.add("Mary");
        
        // Get iterator from the collection
        Iterator<String> iterator = names.iterator();
        
        // Iterate using the iterator
        System.out.println("Iterating through names:");
        while (iterator.hasNext()) {
            String name = iterator.next();
            System.out.println(name);
        }
        
        // Using for-each loop (which uses Iterator behind the scenes)
        System.out.println("\nUsing for-each loop:");
        for (String name : names) {
            System.out.println(name);
        }
        
        // Using Iterator to remove elements
        System.out.println("\nRemoving elements that start with 'J':");
        iterator = names.iterator();
        while (iterator.hasNext()) {
            String name = iterator.next();
            if (name.startsWith("J")) {
                iterator.remove();
            }
        }
        
        // Print the modified collection
        System.out.println("\nAfter removal:");
        for (String name : names) {
            System.out.println(name);
        }
    }
}
```

## Real-World Nümunələr

### Custom Collection ilə Iterator

```java
import java.util.Iterator;
import java.util.NoSuchElementException;

// Custom collection that implements Iterable
class BookCollection implements Iterable<String> {
    private String[] books;
    private int size;
    
    public BookCollection(int capacity) {
        books = new String[capacity];
        size = 0;
    }
    
    public void addBook(String book) {
        if (size < books.length) {
            books[size++] = book;
        } else {
            System.out.println("Collection is full, cannot add more books");
        }
    }
    
    @Override
    public Iterator<String> iterator() {
        return new BookIterator();
    }
    
    // Custom iterator implementation
    private class BookIterator implements Iterator<String> {
        private int currentIndex = 0;
        
        @Override
        public boolean hasNext() {
            return currentIndex < size;
        }
        
        @Override
        public String next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return books[currentIndex++];
        }
        
        @Override
        public void remove() {
            throw new UnsupportedOperationException("Remove operation is not supported");
        }
    }
}

// Client code
public class CustomCollectionDemo {
    public static void main(String[] args) {
        // Create a book collection
        BookCollection bookCollection = new BookCollection(5);
        bookCollection.addBook("Design Patterns");
        bookCollection.addBook("Clean Code");
        bookCollection.addBook("Refactoring");
        bookCollection.addBook("Effective Java");
        bookCollection.addBook("Domain-Driven Design");
        
        // Iterate using the iterator directly
        System.out.println("Using iterator directly:");
        Iterator<String> iterator = bookCollection.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
        
        // Iterate using for-each loop (which uses Iterator behind the scenes)
        System.out.println("\nUsing for-each loop:");
        for (String book : bookCollection) {
            System.out.println(book);
        }
    }
}
```

### Composite Pattern ilə Iterator

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

// Component interface
interface FileSystemComponent {
    String getName();
    void print();
    Iterator<FileSystemComponent> createIterator();
}

// Leaf
class File implements FileSystemComponent {
    private String name;
    
    public File(String name) {
        this.name = name;
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    @Override
    public void print() {
        System.out.println("File: " + name);
    }
    
    @Override
    public Iterator<FileSystemComponent> createIterator() {
        return new NullIterator();
    }
    
    // Null Object Pattern for iterator
    private class NullIterator implements Iterator<FileSystemComponent> {
        @Override
        public boolean hasNext() {
            return false;
        }
        
        @Override
        public FileSystemComponent next() {
            throw new NoSuchElementException();
        }
    }
}

// Composite
class Directory implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> children = new ArrayList<>();
    
    public Directory(String name) {
        this.name = name;
    }
    
    public void add(FileSystemComponent component) {
        children.add(component);
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    @Override
    public void print() {
        System.out.println("Directory: " + name);
        for (FileSystemComponent component : children) {
            component.print();
        }
    }
    
    @Override
    public Iterator<FileSystemComponent> createIterator() {
        return new CompositeIterator(children.iterator());
    }
}

// Iterator for composite structure
class CompositeIterator implements Iterator<FileSystemComponent> {
    private Stack<Iterator<FileSystemComponent>> stack = new Stack<>();
    
    public CompositeIterator(Iterator<FileSystemComponent> iterator) {
        stack.push(iterator);
    }
    
    @Override
    public boolean hasNext() {
        if (stack.empty()) {
            return false;
        }
        
        Iterator<FileSystemComponent> iterator = stack.peek();
        if (!iterator.hasNext()) {
            stack.pop();
            return hasNext();
        }
        
        return true;
    }
    
    @Override
    public FileSystemComponent next() {
        if (!hasNext()) {
            throw new NoSuchElementException();
        }
        
        Iterator<FileSystemComponent> iterator = stack.peek();
        FileSystemComponent component = iterator.next();
        
        if (component instanceof Directory) {
            stack.push(component.createIterator());
        }
        
        return component;
    }
}

// Client code
public class CompositeIteratorDemo {
    public static void main(String[] args) {
        // Create file system structure
        Directory root = new Directory("root");
        
        Directory home = new Directory("home");
        Directory user = new Directory("user");
        
        File file1 = new File("file1.txt");
        File file2 = new File("file2.txt");
        File file3 = new File("file3.txt");
        
        root.add(home);
        root.add(file1);
        
        home.add(user);
        home.add(file2);
        
        user.add(file3);
        
        // Print the structure
        System.out.println("File System Structure:");
        root.print();
        
        // Iterate through all components using composite iterator
        System.out.println("\nIterating through all components:");
        Iterator<FileSystemComponent> iterator = root.createIterator();
        while (iterator.hasNext()) {
            FileSystemComponent component = iterator.next();
            System.out.println(component.getName());
        }
    }
}
```

## Iterator Pattern-nin Üstünlükləri

1. **Separation of Concerns**: Kolleksiya və iterasiya məntiqini ayırır
2. **Single Responsibility Principle**: Kolleksiya və iterasiya məsuliyyətlərini ayrı class-lara verir
3. **Open/Closed Principle**: Mövcud kodu dəyişdirmədən yeni iterasiya növləri əlavə etməyə imkan verir
4. **Simplified Client Code**: Client kod-un kolleksiyanın daxili strukturunu bilməsinə ehtiyac qalmır
5. **Multiple Traversals**: Eyni kolleksiya üzərində paralel iterasiyalara imkan verir

## Iterator Pattern-nin Çatışmazlıqları

1. **Complexity**: Sadə kolleksiyalar üçün əlavə class-lar yaratmaq lazım gəlir
2. **Performance Overhead**: Bəzi hallarda birbaşa çıxışdan daha yavaş ola bilər
3. **Limited Functionality**: Bəzi xüsusi əməliyyatlar üçün kolleksiyanın daxili strukturuna çıxış lazım ola bilər

## Iterator Pattern-nin İstifadə Sahələri

1. **Collection Traversal**: Müxtəlif kolleksiya növləri üzərində vahid iterasiya interfeysi təqdim etmək
2. **Complex Data Structures**: Ağac, qraf və s. kimi mürəkkəb data strukturları üzərində iterasiya
3. **Multiple Traversal Strategies**: Eyni kolleksiya üçün müxtəlif iterasiya strategiyaları təqdim etmək
4. **Lazy Evaluation**: Böyük kolleksiyalar üçün lazy iterasiya təmin etmək
5. **Decoupling**: Kolleksiya və iterasiya məntiqini ayırmaq

## Iterator Pattern-nin Digər Pattern-lərlə Müqayisəsi

### Iterator vs Visitor

- **Iterator**: Kolleksiya elementlərinə ardıcıl çıxış təmin edir
- **Visitor**: Kolleksiya elementləri üzərində müxtəlif əməliyyatlar yerinə yetirməyə imkan verir

### Iterator vs Composite

- **Iterator**: Kolleksiya elementlərinə ardıcıl çıxış təmin edir
- **Composite**: Obyektləri ağac strukturunda təşkil edir və tək obyektlər və kompozisiyalar üçün vahid interface təqdim edir

### Iterator vs For-Each Loop

- **Iterator**: Daha çox nəzarət və xüsusi iterasiya davranışı təmin edir
- **For-Each Loop**: Daha sadə sintaksis təqdim edir, lakin Java-da for-each loop-lar da Iterator istifadə edir

## Nəticə

Iterator Design Pattern, kolleksiya elementlərinə onların daxili strukturunu açıqlamadan ardıcıl çıxış təmin etməyə imkan verən güclü bir behavioral pattern-dir. Bu pattern, kolleksiya üzərində iterasiya məntiqini kolleksiyanın özündən ayırır və beləliklə, müxtəlif kolleksiya növləri üçün vahid iterasiya interfeysi təqdim edir. Java-da Iterator pattern-i həm custom implementasiya ilə, həm də built-in `java.util.Iterator` interface-i vasitəsilə istifadə etmək mümkündür. Iterator pattern-in düzgün istifadəsi, kod-un daha modular, maintainable və genişləndirilə bilən olmasını təmin edir.