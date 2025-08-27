---
draft: true
title: Restaurant Management System Design
description: Design a system for managing restaurant operations
slug: restaurant-system
tags: [ood, object-oriented-design, concurrency]
keywords: [restaurant system, order management, table reservation, billing, java]
hide_table_of_contents: false
---

# Restaurant Management System Design

## Problem Statement

Design a restaurant management system that can handle menu management, order processing, table reservations, and billing operations for a restaurant.

## Requirements

1. **Functional Requirements**:
   - Manage restaurant menu (add, update, remove items)
   - Process customer orders
   - Handle table reservations
   - Manage table assignments
   - Process payments and generate bills
   - Track inventory and ingredients
   - Support different user roles (manager, waiter, chef, cashier)

2. **Non-Functional Requirements**:
   - Concurrent order processing
   - Fast response time for order status updates
   - Reliability for payment processing
   - Scalability to handle peak hours
   - Security for payment information
   - User-friendly interface for staff

## Core Components

1. **Menu**: Manages food items, categories, and pricing
2. **Order**: Represents customer orders with items and status
3. **Table**: Represents dining tables with status and capacity
4. **Reservation**: Manages table bookings with time slots
5. **Bill**: Handles payment processing and receipt generation
6. **Inventory**: Tracks ingredients and supplies
7. **User**: Represents system users with different roles and permissions

## Implementation

```java
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

// Enums
enum OrderStatus {
    RECEIVED, PREPARING, READY, SERVED, CANCELLED
}

enum TableStatus {
    FREE, RESERVED, OCCUPIED, CLEANING
}

enum PaymentStatus {
    PENDING, COMPLETED, FAILED, REFUNDED
}

enum PaymentMethod {
    CASH, CREDIT_CARD, DEBIT_CARD, MOBILE_PAYMENT
}

enum UserRole {
    MANAGER, WAITER, CHEF, CASHIER
}

// Menu Item class
class MenuItem {
    private final int id;
    private String name;
    private String description;
    private double price;
    private String category;
    private boolean available;
    private final Map<String, Integer> ingredients;
    private final Lock lock;

    public MenuItem(int id, String name, String description, double price, String category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.available = true;
        this.ingredients = new HashMap<>();
        this.lock = new ReentrantLock();
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        lock.lock();
        try {
            this.name = name;
        } finally {
            lock.unlock();
        }
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        lock.lock();
        try {
            this.description = description;
        } finally {
            lock.unlock();
        }
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        lock.lock();
        try {
            this.price = price;
        } finally {
            lock.unlock();
        }
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        lock.lock();
        try {
            this.category = category;
        } finally {
            lock.unlock();
        }
    }

    public boolean isAvailable() {
        lock.lock();
        try {
            return available;
        } finally {
            lock.unlock();
        }
    }

    public void setAvailable(boolean available) {
        lock.lock();
        try {
            this.available = available;
        } finally {
            lock.unlock();
        }
    }

    public void addIngredient(String ingredient, int quantity) {
        lock.lock();
        try {
            ingredients.put(ingredient, quantity);
        } finally {
            lock.unlock();
        }
    }

    public Map<String, Integer> getIngredients() {
        lock.lock();
        try {
            return new HashMap<>(ingredients);
        } finally {
            lock.unlock();
        }
    }

    @Override
    public String toString() {
        return id + ". " + name + " - $" + price + (available ? "" : " (Not Available)");
    }
}

// Menu class
class Menu {
    private final Map<Integer, MenuItem> menuItems;
    private final Map<String, List<MenuItem>> itemsByCategory;
    private final Lock lock;

    public Menu() {
        this.menuItems = new ConcurrentHashMap<>();
        this.itemsByCategory = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();
    }

    public void addItem(MenuItem item) {
        lock.lock();
        try {
            menuItems.put(item.getId(), item);
            
            // Add to category map
            itemsByCategory.computeIfAbsent(item.getCategory(), k -> new ArrayList<>()).add(item);
        } finally {
            lock.unlock();
        }
    }

    public void removeItem(int itemId) {
        lock.lock();
        try {
            MenuItem item = menuItems.remove(itemId);
            if (item != null) {
                List<MenuItem> categoryItems = itemsByCategory.get(item.getCategory());
                if (categoryItems != null) {
                    categoryItems.remove(item);
                }
            }
        } finally {
            lock.unlock();
        }
    }

    public MenuItem getItem(int itemId) {
        return menuItems.get(itemId);
    }

    public List<MenuItem> getItemsByCategory(String category) {
        lock.lock();
        try {
            List<MenuItem> items = itemsByCategory.get(category);
            return items != null ? new ArrayList<>(items) : new ArrayList<>();
        } finally {
            lock.unlock();
        }
    }

    public List<MenuItem> getAllItems() {
        return new ArrayList<>(menuItems.values());
    }

    public List<String> getCategories() {
        lock.lock();
        try {
            return new ArrayList<>(itemsByCategory.keySet());
        } finally {
            lock.unlock();
        }
    }
}

// Order Item class
class OrderItem {
    private final MenuItem menuItem;
    private int quantity;
    private String specialInstructions;
    private OrderStatus status;

    public OrderItem(MenuItem menuItem, int quantity, String specialInstructions) {
        this.menuItem = menuItem;
        this.quantity = quantity;
        this.specialInstructions = specialInstructions;
        this.status = OrderStatus.RECEIVED;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getSpecialInstructions() {
        return specialInstructions;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public double getTotalPrice() {
        return menuItem.getPrice() * quantity;
    }

    @Override
    public String toString() {
        return quantity + "x " + menuItem.getName() + " - $" + getTotalPrice() + 
               (specialInstructions != null && !specialInstructions.isEmpty() ? 
               " (Note: " + specialInstructions + ")" : "");
    }
}

// Order class
class Order {
    private final int orderId;
    private final int tableId;
    private final List<OrderItem> items;
    private OrderStatus status;
    private final LocalDateTime orderTime;
    private LocalDateTime serveTime;
    private final String waiterId;
    private final Lock lock;

    public Order(int orderId, int tableId, String waiterId) {
        this.orderId = orderId;
        this.tableId = tableId;
        this.items = new ArrayList<>();
        this.status = OrderStatus.RECEIVED;
        this.orderTime = LocalDateTime.now();
        this.waiterId = waiterId;
        this.lock = new ReentrantLock();
    }

    public int getOrderId() {
        return orderId;
    }

    public int getTableId() {
        return tableId;
    }

    public void addItem(OrderItem item) {
        lock.lock();
        try {
            items.add(item);
        } finally {
            lock.unlock();
        }
    }

    public void removeItem(OrderItem item) {
        lock.lock();
        try {
            items.remove(item);
        } finally {
            lock.unlock();
        }
    }

    public List<OrderItem> getItems() {
        lock.lock();
        try {
            return new ArrayList<>(items);
        } finally {
            lock.unlock();
        }
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        lock.lock();
        try {
            this.status = status;
            if (status == OrderStatus.SERVED) {
                this.serveTime = LocalDateTime.now();
            }
        } finally {
            lock.unlock();
        }
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public LocalDateTime getServeTime() {
        return serveTime;
    }

    public String getWaiterId() {
        return waiterId;
    }

    public double getTotalPrice() {
        lock.lock();
        try {
            return items.stream().mapToDouble(OrderItem::getTotalPrice).sum();
        } finally {
            lock.unlock();
        }
    }

    @Override
    public String toString() {
        lock.lock();
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("Order #").append(orderId).append(" - Table #").append(tableId)
              .append(" (").append(status).append(")\n");
            
            for (OrderItem item : items) {
                sb.append("  ").append(item).append("\n");
            }
            
            sb.append("Total: $").append(String.format("%.2f", getTotalPrice()));
            return sb.toString();
        } finally {
            lock.unlock();
        }
    }
}

// Table class
class Table {
    private final int tableId;
    private final int capacity;
    private TableStatus status;
    private Order currentOrder;
    private final Lock lock;

    public Table(int tableId, int capacity) {
        this.tableId = tableId;
        this.capacity = capacity;
        this.status = TableStatus.FREE;
        this.lock = new ReentrantLock();
    }

    public int getTableId() {
        return tableId;
    }

    public int getCapacity() {
        return capacity;
    }

    public TableStatus getStatus() {
        lock.lock();
        try {
            return status;
        } finally {
            lock.unlock();
        }
    }

    public void setStatus(TableStatus status) {
        lock.lock();
        try {
            this.status = status;
            if (status == TableStatus.FREE) {
                this.currentOrder = null;
            }
        } finally {
            lock.unlock();
        }
    }

    public Order getCurrentOrder() {
        lock.lock();
        try {
            return currentOrder;
        } finally {
            lock.unlock();
        }
    }

    public void setCurrentOrder(Order order) {
        lock.lock();
        try {
            this.currentOrder = order;
            if (order != null) {
                this.status = TableStatus.OCCUPIED;
            }
        } finally {
            lock.unlock();
        }
    }

    @Override
    public String toString() {
        lock.lock();
        try {
            return "Table #" + tableId + " (Capacity: " + capacity + ", Status: " + status + ")";
        } finally {
            lock.unlock();
        }
    }
}

// Reservation class
class Reservation {
    private final int reservationId;
    private final String customerName;
    private final String phoneNumber;
    private final int partySize;
    private final LocalDateTime reservationTime;
    private final int tableId;
    private boolean confirmed;
    private final Lock lock;

    public Reservation(int reservationId, String customerName, String phoneNumber, 
                      int partySize, LocalDateTime reservationTime, int tableId) {
        this.reservationId = reservationId;
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.partySize = partySize;
        this.reservationTime = reservationTime;
        this.tableId = tableId;
        this.confirmed = false;
        this.lock = new ReentrantLock();
    }

    public int getReservationId() {
        return reservationId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public int getPartySize() {
        return partySize;
    }

    public LocalDateTime getReservationTime() {
        return reservationTime;
    }

    public int getTableId() {
        return tableId;
    }

    public boolean isConfirmed() {
        lock.lock();
        try {
            return confirmed;
        } finally {
            lock.unlock();
        }
    }

    public void setConfirmed(boolean confirmed) {
        lock.lock();
        try {
            this.confirmed = confirmed;
        } finally {
            lock.unlock();
        }
    }

    @Override
    public String toString() {
        return "Reservation #" + reservationId + " - " + customerName + 
               " (Party of " + partySize + ") at " + reservationTime + 
               " for Table #" + tableId + (confirmed ? " (Confirmed)" : " (Not Confirmed)");
    }
}

// Bill class
class Bill {
    private final int billId;
    private final Order order;
    private double taxRate;
    private double tipAmount;
    private PaymentStatus status;
    private PaymentMethod paymentMethod;
    private final LocalDateTime generationTime;
    private LocalDateTime paymentTime;
    private final Lock lock;

    public Bill(int billId, Order order, double taxRate) {
        this.billId = billId;
        this.order = order;
        this.taxRate = taxRate;
        this.tipAmount = 0;
        this.status = PaymentStatus.PENDING;
        this.generationTime = LocalDateTime.now();
        this.lock = new ReentrantLock();
    }

    public int getBillId() {
        return billId;
    }

    public Order getOrder() {
        return order;
    }

    public double getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(double taxRate) {
        lock.lock();
        try {
            this.taxRate = taxRate;
        } finally {
            lock.unlock();
        }
    }

    public double getTipAmount() {
        lock.lock();
        try {
            return tipAmount;
        } finally {
            lock.unlock();
        }
    }

    public void setTipAmount(double tipAmount) {
        lock.lock();
        try {
            this.tipAmount = tipAmount;
        } finally {
            lock.unlock();
        }
    }

    public PaymentStatus getStatus() {
        lock.lock();
        try {
            return status;
        } finally {
            lock.unlock();
        }
    }

    public void setStatus(PaymentStatus status) {
        lock.lock();
        try {
            this.status = status;
            if (status == PaymentStatus.COMPLETED) {
                this.paymentTime = LocalDateTime.now();
            }
        } finally {
            lock.unlock();
        }
    }

    public PaymentMethod getPaymentMethod() {
        lock.lock();
        try {
            return paymentMethod;
        } finally {
            lock.unlock();
        }
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        lock.lock();
        try {
            this.paymentMethod = paymentMethod;
        } finally {
            lock.unlock();
        }
    }

    public LocalDateTime getGenerationTime() {
        return generationTime;
    }

    public LocalDateTime getPaymentTime() {
        return paymentTime;
    }

    public double getSubtotal() {
        return order.getTotalPrice();
    }

    public double getTaxAmount() {
        return getSubtotal() * taxRate;
    }

    public double getTotal() {
        return getSubtotal() + getTaxAmount() + tipAmount;
    }

    public String generateReceipt() {
        lock.lock();
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("===== RECEIPT =====\n");
            sb.append("Bill #").append(billId).append("\n");
            sb.append("Table #").append(order.getTableId()).append("\n");
            sb.append("Date: ").append(generationTime).append("\n\n");
            
            sb.append("Items:\n");
            for (OrderItem item : order.getItems()) {
                sb.append(item).append("\n");
            }
            
            sb.append("\nSubtotal: $").append(String.format("%.2f", getSubtotal())).append("\n");
            sb.append("Tax (").append(taxRate * 100).append("%): $")
              .append(String.format("%.2f", getTaxAmount())).append("\n");
            
            if (tipAmount > 0) {
                sb.append("Tip: $").append(String.format("%.2f", tipAmount)).append("\n");
            }
            
            sb.append("Total: $").append(String.format("%.2f", getTotal())).append("\n");
            
            if (status == PaymentStatus.COMPLETED) {
                sb.append("\nPaid by: ").append(paymentMethod).append("\n");
                sb.append("Payment Time: ").append(paymentTime).append("\n");
            } else {
                sb.append("\nPayment Status: ").append(status).append("\n");
            }
            
            sb.append("=================\n");
            return sb.toString();
        } finally {
            lock.unlock();
        }
    }
}

// Inventory Item class
class InventoryItem {
    private final String name;
    private int quantity;
    private final String unit;
    private final Lock lock;

    public InventoryItem(String name, int quantity, String unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.lock = new ReentrantLock();
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        lock.lock();
        try {
            return quantity;
        } finally {
            lock.unlock();
        }
    }

    public void setQuantity(int quantity) {
        lock.lock();
        try {
            this.quantity = quantity;
        } finally {
            lock.unlock();
        }
    }

    public void addQuantity(int amount) {
        lock.lock();
        try {
            this.quantity += amount;
        } finally {
            lock.unlock();
        }
    }

    public boolean removeQuantity(int amount) {
        lock.lock();
        try {
            if (quantity >= amount) {
                quantity -= amount;
                return true;
            }
            return false;
        } finally {
            lock.unlock();
        }
    }

    public String getUnit() {
        return unit;
    }

    @Override
    public String toString() {
        lock.lock();
        try {
            return name + ": " + quantity + " " + unit;
        } finally {
            lock.unlock();
        }
    }
}

// Inventory class
class Inventory {
    private final Map<String, InventoryItem> items;
    private final Lock lock;

    public Inventory() {
        this.items = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();
    }

    public void addItem(InventoryItem item) {
        items.put(item.getName(), item);
    }

    public InventoryItem getItem(String name) {
        return items.get(name);
    }

    public boolean consumeIngredients(MenuItem menuItem, int quantity) {
        lock.lock();
        try {
            Map<String, Integer> ingredients = menuItem.getIngredients();
            
            // Check if we have enough of all ingredients
            for (Map.Entry<String, Integer> entry : ingredients.entrySet()) {
                String ingredient = entry.getKey();
                int requiredAmount = entry.getValue() * quantity;
                
                InventoryItem inventoryItem = items.get(ingredient);
                if (inventoryItem == null || inventoryItem.getQuantity() < requiredAmount) {
                    return false;
                }
            }
            
            // Consume ingredients
            for (Map.Entry<String, Integer> entry : ingredients.entrySet()) {
                String ingredient = entry.getKey();
                int requiredAmount = entry.getValue() * quantity;
                
                InventoryItem inventoryItem = items.get(ingredient);
                inventoryItem.removeQuantity(requiredAmount);
            }
            
            return true;
        } finally {
            lock.unlock();
        }
    }

    public List<InventoryItem> getAllItems() {
        return new ArrayList<>(items.values());
    }

    public List<InventoryItem> getLowStockItems(int threshold) {
        lock.lock();
        try {
            List<InventoryItem> lowStockItems = new ArrayList<>();
            for (InventoryItem item : items.values()) {
                if (item.getQuantity() <= threshold) {
                    lowStockItems.add(item);
                }
            }
            return lowStockItems;
        } finally {
            lock.unlock();
        }
    }
}

// User class
class User {
    private final String userId;
    private String name;
    private String password; // In a real system, this would be hashed
    private UserRole role;
    private final Lock lock;

    public User(String userId, String name, String password, UserRole role) {
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.role = role;
        this.lock = new ReentrantLock();
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        lock.lock();
        try {
            this.name = name;
        } finally {
            lock.unlock();
        }
    }

    public boolean checkPassword(String password) {
        lock.lock();
        try {
            return this.password.equals(password);
        } finally {
            lock.unlock();
        }
    }

    public void setPassword(String password) {
        lock.lock();
        try {
            this.password = password;
        } finally {
            lock.unlock();
        }
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        lock.lock();
        try {
            this.role = role;
        } finally {
            lock.unlock();
        }
    }

    @Override
    public String toString() {
        return name + " (" + role + ")";
    }
}

// Restaurant class - Main controller
class Restaurant {
    private final String name;
    private final Menu menu;
    private final Map<Integer, Table> tables;
    private final Map<Integer, Order> activeOrders;
    private final Map<Integer, Reservation> reservations;
    private final Map<Integer, Bill> bills;
    private final Inventory inventory;
    private final Map<String, User> users;
    private final AtomicInteger orderIdCounter;
    private final AtomicInteger reservationIdCounter;
    private final AtomicInteger billIdCounter;
    private final AtomicInteger menuItemIdCounter;
    private final double taxRate;
    private final Lock lock;

    public Restaurant(String name, double taxRate) {
        this.name = name;
        this.menu = new Menu();
        this.tables = new ConcurrentHashMap<>();
        this.activeOrders = new ConcurrentHashMap<>();
        this.reservations = new ConcurrentHashMap<>();
        this.bills = new ConcurrentHashMap<>();
        this.inventory = new Inventory();
        this.users = new ConcurrentHashMap<>();
        this.orderIdCounter = new AtomicInteger(1000);
        this.reservationIdCounter = new AtomicInteger(1000);
        this.billIdCounter = new AtomicInteger(1000);
        this.menuItemIdCounter = new AtomicInteger(100);
        this.taxRate = taxRate;
        this.lock = new ReentrantLock();
    }

    // Menu management
    public MenuItem addMenuItem(String name, String description, double price, String category) {
        int id = menuItemIdCounter.incrementAndGet();
        MenuItem item = new MenuItem(id, name, description, price, category);
        menu.addItem(item);
        return item;
    }

    public void removeMenuItem(int itemId) {
        menu.removeItem(itemId);
    }

    public MenuItem getMenuItem(int itemId) {
        return menu.getItem(itemId);
    }

    public List<MenuItem> getMenuItemsByCategory(String category) {
        return menu.getItemsByCategory(category);
    }

    public List<MenuItem> getAllMenuItems() {
        return menu.getAllItems();
    }

    public List<String> getMenuCategories() {
        return menu.getCategories();
    }

    // Table management
    public Table addTable(int capacity) {
        int tableId = tables.size() + 1;
        Table table = new Table(tableId, capacity);
        tables.put(tableId, table);
        return table;
    }

    public Table getTable(int tableId) {
        return tables.get(tableId);
    }

    public List<Table> getAllTables() {
        return new ArrayList<>(tables.values());
    }

    public List<Table> getAvailableTables() {
        lock.lock();
        try {
            List<Table> availableTables = new ArrayList<>();
            for (Table table : tables.values()) {
                if (table.getStatus() == TableStatus.FREE) {
                    availableTables.add(table);
                }
            }
            return availableTables;
        } finally {
            lock.unlock();
        }
    }

    // Order management
    public Order createOrder(int tableId, String waiterId) {
        Table table = tables.get(tableId);
        if (table == null) {
            throw new IllegalArgumentException("Table not found");
        }
        
        if (table.getStatus() != TableStatus.FREE && table.getStatus() != TableStatus.RESERVED) {
            throw new IllegalStateException("Table is not available");
        }
        
        int orderId = orderIdCounter.incrementAndGet();
        Order order = new Order(orderId, tableId, waiterId);
        activeOrders.put(orderId, order);
        
        table.setCurrentOrder(order);
        table.setStatus(TableStatus.OCCUPIED);
        
        return order;
    }

    public void addItemToOrder(int orderId, int menuItemId, int quantity, String specialInstructions) {
        Order order = activeOrders.get(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Order not found");
        }
        
        MenuItem menuItem = menu.getItem(menuItemId);
        if (menuItem == null) {
            throw new IllegalArgumentException("Menu item not found");
        }
        
        if (!menuItem.isAvailable()) {
            throw new IllegalStateException("Menu item is not available");
        }
        
        // Check inventory
        if (!inventory.consumeIngredients(menuItem, quantity)) {
            throw new IllegalStateException("Not enough ingredients");
        }
        
        OrderItem orderItem = new OrderItem(menuItem, quantity, specialInstructions);
        order.addItem(orderItem);
    }

    public void updateOrderStatus(int orderId, OrderStatus status) {
        Order order = activeOrders.get(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Order not found");
        }
        
        order.setStatus(status);
        
        // If order is cancelled, return ingredients to inventory
        if (status == OrderStatus.CANCELLED) {
            for (OrderItem item : order.getItems()) {
                // This is simplified - in a real system, you'd need to track which ingredients were actually consumed
                // and only return those that haven't been used yet
            }
        }
    }

    public Order getOrder(int orderId) {
        return activeOrders.get(orderId);
    }

    public List<Order> getActiveOrders() {
        return new ArrayList<>(activeOrders.values());
    }

    public List<Order> getOrdersByStatus(OrderStatus status) {
        lock.lock();
        try {
            List<Order> filteredOrders = new ArrayList<>();
            for (Order order : activeOrders.values()) {
                if (order.getStatus() == status) {
                    filteredOrders.add(order);
                }
            }
            return filteredOrders;
        } finally {
            lock.unlock();
        }
    }

    // Reservation management
    public Reservation createReservation(String customerName, String phoneNumber, 
                                        int partySize, LocalDateTime reservationTime) {
        // Find a suitable table
        Table bestTable = null;
        
        lock.lock();
        try {
            for (Table table : tables.values()) {
                if (table.getCapacity() >= partySize && 
                    (bestTable == null || table.getCapacity() < bestTable.getCapacity())) {
                    
                    // Check if table is available at the requested time
                    boolean isAvailable = true;
                    for (Reservation reservation : reservations.values()) {
                        if (reservation.getTableId() == table.getTableId() && 
                            isTimeConflict(reservation.getReservationTime(), reservationTime)) {
                            isAvailable = false;
                            break;
                        }
                    }
                    
                    if (isAvailable) {
                        bestTable = table;
                    }
                }
            }
        } finally {
            lock.unlock();
        }
        
        if (bestTable == null) {
            throw new IllegalStateException("No suitable table available for this reservation");
        }
        
        int reservationId = reservationIdCounter.incrementAndGet();
        Reservation reservation = new Reservation(reservationId, customerName, phoneNumber, 
                                                partySize, reservationTime, bestTable.getTableId());
        
        reservations.put(reservationId, reservation);
        return reservation;
    }

    private boolean isTimeConflict(LocalDateTime time1, LocalDateTime time2) {
        // Simplified: Consider a reservation to block a table for 2 hours
        return Math.abs(time1.getHour() - time2.getHour()) < 2;
    }

    public void confirmReservation(int reservationId) {
        Reservation reservation = reservations.get(reservationId);
        if (reservation == null) {
            throw new IllegalArgumentException("Reservation not found");
        }
        
        reservation.setConfirmed(true);
    }

    public void cancelReservation(int reservationId) {
        reservations.remove(reservationId);
    }

    public Reservation getReservation(int reservationId) {
        return reservations.get(reservationId);
    }

    public List<Reservation> getAllReservations() {
        return new ArrayList<>(reservations.values());
    }

    public List<Reservation> getReservationsForDate(LocalDateTime date) {
        lock.lock();
        try {
            List<Reservation> dateReservations = new ArrayList<>();
            for (Reservation reservation : reservations.values()) {
                if (reservation.getReservationTime().toLocalDate().equals(date.toLocalDate())) {
                    dateReservations.add(reservation);
                }
            }
            return dateReservations;
        } finally {
            lock.unlock();
        }
    }

    // Billing
    public Bill generateBill(int orderId) {
        Order order = activeOrders.get(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Order not found");
        }
        
        int billId = billIdCounter.incrementAndGet();
        Bill bill = new Bill(billId, order, taxRate);
        bills.put(billId, bill);
        
        return bill;
    }

    public boolean processPayment(int billId, PaymentMethod paymentMethod, double tipAmount) {
        Bill bill = bills.get(billId);
        if (bill == null) {
            throw new IllegalArgumentException("Bill not found");
        }
        
        bill.setTipAmount(tipAmount);
        bill.setPaymentMethod(paymentMethod);
        
        // In a real system, this would integrate with a payment processor
        boolean paymentSuccessful = Math.random() > 0.05; // 95% success rate for simulation
        
        if (paymentSuccessful) {
            bill.setStatus(PaymentStatus.COMPLETED);
            
            // Free up the table
            Order order = bill.getOrder();
            Table table = tables.get(order.getTableId());
            table.setStatus(TableStatus.CLEANING);
            
            // Remove from active orders
            activeOrders.remove(order.getOrderId());
        } else {
            bill.setStatus(PaymentStatus.FAILED);
        }
        
        return paymentSuccessful;
    }

    public Bill getBill(int billId) {
        return bills.get(billId);
    }

    // Inventory management
    public void addInventoryItem(String name, int quantity, String unit) {
        InventoryItem item = new InventoryItem(name, quantity, unit);
        inventory.addItem(item);
    }

    public InventoryItem getInventoryItem(String name) {
        return inventory.getItem(name);
    }

    public List<InventoryItem> getAllInventoryItems() {
        return inventory.getAllItems();
    }

    public List<InventoryItem> getLowStockItems(int threshold) {
        return inventory.getLowStockItems(threshold);
    }

    // User management
    public User addUser(String name, String password, UserRole role) {
        String userId = "U" + UUID.randomUUID().toString().substring(0, 8);
        User user = new User(userId, name, password, role);
        users.put(userId, user);
        return user;
    }

    public User authenticateUser(String userId, String password) {
        User user = users.get(userId);
        if (user != null && user.checkPassword(password)) {
            return user;
        }
        return null;
    }

    public User getUser(String userId) {
        return users.get(userId);
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    public String getName() {
        return name;
    }
}

// Example usage
public class RestaurantDemo {
    public static void main(String[] args) {
        // Create restaurant
        Restaurant restaurant = new Restaurant("Gourmet Delight", 0.08); // 8% tax rate
        
        // Add users
        User manager = restaurant.addUser("John Manager", "password123", UserRole.MANAGER);
        User waiter = restaurant.addUser("Alice Waiter", "password123", UserRole.WAITER);
        User chef = restaurant.addUser("Bob Chef", "password123", UserRole.CHEF);
        User cashier = restaurant.addUser("Carol Cashier", "password123", UserRole.CASHIER);
        
        // Add tables
        restaurant.addTable(2); // Table #1 (2 seats)
        restaurant.addTable(4); // Table #2 (4 seats)
        restaurant.addTable(6); // Table #3 (6 seats)
        restaurant.addTable(8); // Table #4 (8 seats)
        
        // Add menu items
        MenuItem burger = restaurant.addMenuItem("Cheeseburger", "Juicy beef patty with cheese", 9.99, "Main Course");
        MenuItem fries = restaurant.addMenuItem("French Fries", "Crispy golden fries", 3.99, "Sides");
        MenuItem salad = restaurant.addMenuItem("Caesar Salad", "Fresh romaine lettuce with Caesar dressing", 7.99, "Starters");
        MenuItem soda = restaurant.addMenuItem("Soda", "Refreshing carbonated drink", 1.99, "Beverages");
        
        // Add ingredients to menu items
        burger.addIngredient("Beef", 1);
        burger.addIngredient("Cheese", 1);
        burger.addIngredient("Bun", 1);
        
        fries.addIngredient("Potato", 2);
        
        salad.addIngredient("Lettuce", 1);
        salad.addIngredient("Croutons", 1);
        
        // Add inventory
        restaurant.addInventoryItem("Beef", 50, "patties");
        restaurant.addInventoryItem("Cheese", 100, "slices");
        restaurant.addInventoryItem("Bun", 50, "pieces");
        restaurant.addInventoryItem("Potato", 100, "units");
        restaurant.addInventoryItem("Lettuce", 30, "heads");
        restaurant.addInventoryItem("Croutons", 50, "servings");
        
        // Create a reservation
        LocalDateTime reservationTime = LocalDateTime.now().plusDays(1).withHour(19).withMinute(0);
        Reservation reservation = restaurant.createReservation("David Customer", "555-123-4567", 4, reservationTime);
        restaurant.confirmReservation(reservation.getReservationId());
        
        System.out.println("Reservation created: " + reservation);
        
        // Create an order
        Order order = restaurant.createOrder(2, waiter.getUserId()); // Order for Table #2
        
        // Add items to the order
        try {
            restaurant.addItemToOrder(order.getOrderId(), burger.getId(), 2, "No onions");
            restaurant.addItemToOrder(order.getOrderId(), fries.getId(), 2, "Extra salt");
            restaurant.addItemToOrder(order.getOrderId(), soda.getId(), 2, "With ice");
        } catch (Exception e) {
            System.out.println("Error adding items to order: " + e.getMessage());
        }
        
        System.out.println("\nOrder created: \n" + order);
        
        // Update order status
        restaurant.updateOrderStatus(order.getOrderId(), OrderStatus.PREPARING);
        System.out.println("\nOrder status updated to PREPARING");
        
        restaurant.updateOrderStatus(order.getOrderId(), OrderStatus.READY);
        System.out.println("Order status updated to READY");
        
        restaurant.updateOrderStatus(order.getOrderId(), OrderStatus.SERVED);
        System.out.println("Order status updated to SERVED");
        
        // Generate bill
        Bill bill = restaurant.generateBill(order.getOrderId());
        System.out.println("\nBill generated: \n" + bill.generateReceipt());
        
        // Process payment
        boolean paymentSuccess = restaurant.processPayment(bill.getBillId(), PaymentMethod.CREDIT_CARD, 5.00);
        System.out.println("\nPayment " + (paymentSuccess ? "successful" : "failed"));
        
        if (paymentSuccess) {
            System.out.println("\nFinal receipt: \n" + bill.generateReceipt());
        }
        
        // Check inventory
        System.out.println("\nInventory status:");
        for (InventoryItem item : restaurant.getAllInventoryItems()) {
            System.out.println(item);
        }
    }
}
```

## Thread Safety Considerations

1. **ReentrantLock**: Used to ensure thread-safe operations on shared resources
2. **ConcurrentHashMap**: Used for thread-safe storage of menu items, orders, tables, etc.
3. **AtomicInteger**: Used for thread-safe ID generation
4. **Immutable Fields**: Many fields are declared as final to prevent modification
5. **Defensive Copying**: Collections are defensively copied when returned from methods

## Order Processing Flow

1. **Order Creation**: A new order is created for a specific table
2. **Item Addition**: Menu items are added to the order, checking inventory availability
3. **Order Status Updates**: Order status is updated as it progresses through the kitchen
4. **Billing**: A bill is generated for the completed order
5. **Payment Processing**: Payment is processed and the table is freed up

## Reservation System

1. **Table Selection**: Automatically selects the most appropriate table for a reservation
2. **Time Conflict Resolution**: Prevents double-booking tables at conflicting times
3. **Confirmation Process**: Reservations can be confirmed or cancelled
4. **Integration with Table Management**: Tables are marked as reserved at the appropriate times

## Inventory Management

1. **Ingredient Tracking**: Menu items are linked to their required ingredients
2. **Automatic Deduction**: Ingredients are automatically deducted when orders are placed
3. **Low Stock Alerts**: System can identify items that are running low
4. **Inventory Replenishment**: Support for adding new inventory

## Additional Features

1. **User Roles**: Different permissions for managers, waiters, chefs, and cashiers
2. **Menu Categories**: Menu items are organized by categories
3. **Special Instructions**: Support for special instructions on order items
4. **Tax and Tip Handling**: Proper calculation of taxes and tips
5. **Receipt Generation**: Detailed receipts for customers