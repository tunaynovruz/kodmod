---
title: Tree Data Structure
description: Tree data strukturunun ətraflı izahı və Java-da implementasiyası
slug: tree-data-structure
tags: [data-strukturlar, tree, binary-tree, bst, java]
keywords: [tree, ağac, binary tree, bst, data struktur, java]
hide_table_of_contents: false
---

# Tree Data Structure

## Giriş

Tree (ağac) data strukturu, node-lardan (düyünlərdən) ibarət olan və hierarchical (iyerarxik) əlaqələri təmsil edən bir data strukturudur. Ağaclar, real həyatdakı ağaclara bənzəyir - bir kökdən başlayır və budaqlanır. Ağac strukturu, məlumatları organize etmək və axtarış əməliyyatlarını effektiv şəkildə yerinə yetirmək üçün istifadə olunur.

## Tree-nin Əsas Xüsusiyyətləri

- **Hierarchical Struktur**: Node-lar arasında parent-child əlaqəsi var
- **Root Node**: Ağacın başlanğıc nöqtəsi, parent-i olmayan tək node
- **Leaf Node**: Child-ı olmayan node-lar
- **Subtree**: Hər bir node və onun bütün descendant-ları (törəmələri) bir subtree təşkil edir
- **Depth**: Root-dan node-a qədər olan path-in uzunluğu
- **Height**: Node-dan ən uzaq leaf-ə qədər olan path-in uzunluğu

## Tree-nin Növləri

### 1. Binary Tree

Binary Tree, hər bir node-un maksimum iki child-ı (sol və sağ) ola bilən ağac növüdür.

### 2. Binary Search Tree (BST)

Binary Search Tree, binary tree-nin xüsusi bir növüdür. BST-də hər bir node-un sol subtree-sindəki bütün node-ların dəyərləri node-un öz dəyərindən kiçik, sağ subtree-sindəki bütün node-ların dəyərləri isə node-un öz dəyərindən böyükdür.

### 3. AVL Tree

AVL Tree, self-balancing binary search tree-dir. Hər bir node-un sol və sağ subtree-lərinin hündürlükləri arasındakı fərq maksimum 1 olur.

### 4. Red-Black Tree

Red-Black Tree, self-balancing binary search tree-nin digər bir növüdür. Hər bir node qırmızı və ya qara rəngdə olur və müəyyən qaydalar əsasında balanslaşdırılır.

### 5. B-Tree

B-Tree, çoxlu sayda child-a malik ola bilən və disk-based storage sistemlərində istifadə olunan bir ağac növüdür.

## Binary Tree-nin Java-da İmplementasiyası

```java
public class BinaryTree {
    // Node class
    static class Node {
        int data;
        Node left;
        Node right;
        
        public Node(int data) {
            this.data = data;
            this.left = null;
            this.right = null;
        }
    }
    
    // Root node
    private Node root;
    
    // Constructor
    public BinaryTree() {
        root = null;
    }
    
    // Binary Tree yaratmaq
    public void createBinaryTree() {
        root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);
    }
    
    // Preorder Traversal: Root -> Left -> Right
    public void preorderTraversal(Node node) {
        if (node == null) {
            return;
        }
        
        System.out.print(node.data + " ");
        preorderTraversal(node.left);
        preorderTraversal(node.right);
    }
    
    // Inorder Traversal: Left -> Root -> Right
    public void inorderTraversal(Node node) {
        if (node == null) {
            return;
        }
        
        inorderTraversal(node.left);
        System.out.print(node.data + " ");
        inorderTraversal(node.right);
    }
    
    // Postorder Traversal: Left -> Right -> Root
    public void postorderTraversal(Node node) {
        if (node == null) {
            return;
        }
        
        postorderTraversal(node.left);
        postorderTraversal(node.right);
        System.out.print(node.data + " ");
    }
    
    // Level Order Traversal (BFS)
    public void levelOrderTraversal() {
        if (root == null) {
            return;
        }
        
        java.util.Queue<Node> queue = new java.util.LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            Node current = queue.poll();
            System.out.print(current.data + " ");
            
            if (current.left != null) {
                queue.add(current.left);
            }
            
            if (current.right != null) {
                queue.add(current.right);
            }
        }
    }
    
    // Ağacın hündürlüyünü hesablamaq
    public int height(Node node) {
        if (node == null) {
            return 0;
        }
        
        int leftHeight = height(node.left);
        int rightHeight = height(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    // Node-ların sayını hesablamaq
    public int countNodes(Node node) {
        if (node == null) {
            return 0;
        }
        
        return 1 + countNodes(node.left) + countNodes(node.right);
    }
    
    // Leaf node-ların sayını hesablamaq
    public int countLeafNodes(Node node) {
        if (node == null) {
            return 0;
        }
        
        if (node.left == null && node.right == null) {
            return 1;
        }
        
        return countLeafNodes(node.left) + countLeafNodes(node.right);
    }
    
    // Main method
    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        tree.createBinaryTree();
        
        System.out.println("Preorder Traversal:");
        tree.preorderTraversal(tree.root);
        System.out.println("\n");
        
        System.out.println("Inorder Traversal:");
        tree.inorderTraversal(tree.root);
        System.out.println("\n");
        
        System.out.println("Postorder Traversal:");
        tree.postorderTraversal(tree.root);
        System.out.println("\n");
        
        System.out.println("Level Order Traversal:");
        tree.levelOrderTraversal();
        System.out.println("\n");
        
        System.out.println("Height of the tree: " + tree.height(tree.root));
        System.out.println("Number of nodes: " + tree.countNodes(tree.root));
        System.out.println("Number of leaf nodes: " + tree.countLeafNodes(tree.root));
    }
}
```

## Binary Search Tree (BST) İmplementasiyası

```java
public class BinarySearchTree {
    // Node class
    static class Node {
        int data;
        Node left;
        Node right;
        
        public Node(int data) {
            this.data = data;
            this.left = null;
            this.right = null;
        }
    }
    
    // Root node
    private Node root;
    
    // Constructor
    public BinarySearchTree() {
        root = null;
    }
    
    // BST-yə node əlavə etmək
    public void insert(int data) {
        root = insertRec(root, data);
    }
    
    private Node insertRec(Node root, int data) {
        if (root == null) {
            root = new Node(data);
            return root;
        }
        
        if (data < root.data) {
            root.left = insertRec(root.left, data);
        } else if (data > root.data) {
            root.right = insertRec(root.right, data);
        }
        
        return root;
    }
    
    // BST-də axtarış
    public boolean search(int data) {
        return searchRec(root, data);
    }
    
    private boolean searchRec(Node root, int data) {
        if (root == null) {
            return false;
        }
        
        if (root.data == data) {
            return true;
        }
        
        if (data < root.data) {
            return searchRec(root.left, data);
        }
        
        return searchRec(root.right, data);
    }
    
    // BST-dən node silmək
    public void delete(int data) {
        root = deleteRec(root, data);
    }
    
    private Node deleteRec(Node root, int data) {
        if (root == null) {
            return root;
        }
        
        if (data < root.data) {
            root.left = deleteRec(root.left, data);
        } else if (data > root.data) {
            root.right = deleteRec(root.right, data);
        } else {
            // Node-un bir və ya heç bir child-ı yoxdur
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }
            
            // Node-un iki child-ı var
            // Sağ subtree-dəki ən kiçik dəyəri tapırıq (inorder successor)
            root.data = minValue(root.right);
            
            // Inorder successor-u silirik
            root.right = deleteRec(root.right, root.data);
        }
        
        return root;
    }
    
    private int minValue(Node root) {
        int minValue = root.data;
        while (root.left != null) {
            minValue = root.left.data;
            root = root.left;
        }
        return minValue;
    }
    
    // Inorder Traversal
    public void inorderTraversal() {
        inorderRec(root);
        System.out.println();
    }
    
    private void inorderRec(Node root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.data + " ");
            inorderRec(root.right);
        }
    }
    
    // Main method
    public static void main(String[] args) {
        BinarySearchTree bst = new BinarySearchTree();
        
        // BST yaratmaq
        bst.insert(50);
        bst.insert(30);
        bst.insert(20);
        bst.insert(40);
        bst.insert(70);
        bst.insert(60);
        bst.insert(80);
        
        System.out.println("Inorder traversal of the BST:");
        bst.inorderTraversal();
        
        System.out.println("Search for 40: " + bst.search(40));
        System.out.println("Search for 100: " + bst.search(100));
        
        System.out.println("Delete 20");
        bst.delete(20);
        System.out.println("Inorder traversal after deleting 20:");
        bst.inorderTraversal();
        
        System.out.println("Delete 30");
        bst.delete(30);
        System.out.println("Inorder traversal after deleting 30:");
        bst.inorderTraversal();
        
        System.out.println("Delete 50");
        bst.delete(50);
        System.out.println("Inorder traversal after deleting 50:");
        bst.inorderTraversal();
    }
}
```

## AVL Tree İmplementasiyası

```java
public class AVLTree {
    // Node class
    static class Node {
        int data;
        Node left;
        Node right;
        int height;
        
        public Node(int data) {
            this.data = data;
            this.left = null;
            this.right = null;
            this.height = 1; // Yeni node-un hündürlüyü 1-dir
        }
    }
    
    // Root node
    private Node root;
    
    // Constructor
    public AVLTree() {
        root = null;
    }
    
    // Node-un hündürlüyünü əldə etmək
    private int height(Node node) {
        if (node == null) {
            return 0;
        }
        return node.height;
    }
    
    // Balance factor-u hesablamaq
    private int getBalanceFactor(Node node) {
        if (node == null) {
            return 0;
        }
        return height(node.left) - height(node.right);
    }
    
    // Right rotation
    private Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        
        // Rotation
        x.right = y;
        y.left = T2;
        
        // Hündürlükləri yeniləmək
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        
        return x;
    }
    
    // Left rotation
    private Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        
        // Rotation
        y.left = x;
        x.right = T2;
        
        // Hündürlükləri yeniləmək
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        
        return y;
    }
    
    // AVL Tree-yə node əlavə etmək
    public void insert(int data) {
        root = insertRec(root, data);
    }
    
    private Node insertRec(Node node, int data) {
        // 1. Normal BST insertion
        if (node == null) {
            return new Node(data);
        }
        
        if (data < node.data) {
            node.left = insertRec(node.left, data);
        } else if (data > node.data) {
            node.right = insertRec(node.right, data);
        } else {
            // Duplicate keys are not allowed
            return node;
        }
        
        // 2. Hündürlüyü yeniləmək
        node.height = 1 + Math.max(height(node.left), height(node.right));
        
        // 3. Balance factor-u hesablamaq
        int balance = getBalanceFactor(node);
        
        // Left Left Case
        if (balance > 1 && data < node.left.data) {
            return rightRotate(node);
        }
        
        // Right Right Case
        if (balance < -1 && data > node.right.data) {
            return leftRotate(node);
        }
        
        // Left Right Case
        if (balance > 1 && data > node.left.data) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        
        // Right Left Case
        if (balance < -1 && data < node.right.data) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        
        return node;
    }
    
    // Inorder Traversal
    public void inorderTraversal() {
        inorderRec(root);
        System.out.println();
    }
    
    private void inorderRec(Node root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.data + " ");
            inorderRec(root.right);
        }
    }
    
    // Main method
    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
        
        // AVL Tree yaratmaq
        tree.insert(10);
        tree.insert(20);
        tree.insert(30);
        tree.insert(40);
        tree.insert(50);
        tree.insert(25);
        
        System.out.println("Inorder traversal of the AVL tree:");
        tree.inorderTraversal();
    }
}
```

## Tree-nin İstifadə Sahələri

1. **Hierarchical Data**: File systems, organization charts
2. **Database Indexing**: B-trees, B+ trees
3. **Syntax Trees**: Compiler design
4. **Network Routing**: Routing algorithms
5. **Decision Trees**: Machine learning
6. **Game Trees**: AI in games (minimax algorithm)

## Tree Traversal Metodları

### 1. Depth-First Search (DFS)

- **Preorder**: Root -> Left -> Right
- **Inorder**: Left -> Root -> Right
- **Postorder**: Left -> Right -> Root

### 2. Breadth-First Search (BFS)

- **Level Order**: Level by level, from left to right

## Tree-nin Mürəkkəbliyi

| Əməliyyat | Binary Tree | Binary Search Tree (Average) | Binary Search Tree (Worst) | AVL Tree |
|-----------|-------------|------------------------------|----------------------------|----------|
| Search    | O(n)        | O(log n)                     | O(n)                       | O(log n) |
| Insert    | O(1)*       | O(log n)                     | O(n)                       | O(log n) |
| Delete    | O(n)        | O(log n)                     | O(n)                       | O(log n) |

*Əgər insertion yeri məlumdursa

## Nəticə

Tree data strukturu, hierarchical məlumatları təmsil etmək və effektiv axtarış əməliyyatları aparmaq üçün çox faydalı bir data strukturudur. Binary Tree, Binary Search Tree, AVL Tree kimi müxtəlif növləri var və hər biri özünəməxsus xüsusiyyətlərə və istifadə sahələrinə malikdir. Java-da bu data strukturları implement etmək üçün müxtəlif üsullar mövcuddur və onların düzgün istifadəsi, proqramın performansını əhəmiyyətli dərəcədə artıra bilər.
