---
draft: true
title: Vending Machine Design
description: Design a vending machine with product selection and payment processing
slug: vending-machine
tags: [ood, object-oriented-design, state-pattern, concurrency]
keywords: [vending machine, state pattern, thread safety, java, payment processing]
hide_table_of_contents: false
---

# Vending Machine Design

## Problem Statement

Design a vending machine that allows users to select products, accept different payment methods, dispense products, and provide change when necessary.

## Requirements

1. **Functional Requirements**:
   - Display available products with prices
   - Allow product selection
   - Accept different payment methods (coins, bills, cards)
   - Dispense selected products
   - Return change if necessary
   - Maintain inventory of products
   - Support refunds for failed transactions

2. **Non-Functional Requirements**:
   - Thread safety for concurrent operations
   - Reliability (handle errors gracefully)
   - Maintainability (easy to add new products or payment methods)
   - Security for payment processing

## Core Components

1. **Product Inventory**: Manages available products and their quantities
2. **Payment Processor**: Handles different payment methods
3. **Product Dispenser**: Dispenses selected products
4. **Change Dispenser**: Returns change when necessary
5. **Display**: Shows available products, prices, and messages to the user
6. **Controller**: Coordinates the overall operation of the vending machine

## Design Approach

We'll use the State Pattern to model the vending machine's operation:

1. **Idle**: Initial state, waiting for user interaction
2. **ProductSelected**: User has selected a product
3. **PaymentProcessing**: Machine is processing payment
4. **Dispensing**: Machine is dispensing the product
5. **ReturningChange**: Machine is returning change
6. **ServiceMode**: Machine is in maintenance mode

## Implementation

```java
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

// Product class
class Product {
    private final String id;
    private final String name;
    private final double price;
    private int quantity;

    public Product(String id, String name, double price, int quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void decrementQuantity() {
        if (quantity > 0) {
            quantity--;
        }
    }

    public void incrementQuantity() {
        quantity++;
    }

    @Override
    public String toString() {
        return id + ": " + name + " - $" + price + " (" + quantity + " available)";
    }
}

// Payment method interface
interface PaymentMethod {
    boolean processPayment(double amount);
    void refund(double amount);
}

// Coin payment method
class CoinPayment implements PaymentMethod {
    private final Map<Double, Integer> coinInventory;
    private final Lock lock = new ReentrantLock();

    public CoinPayment() {
        coinInventory = new HashMap<>();
        // Initialize with some coins
        coinInventory.put(0.25, 20); // Quarters
        coinInventory.put(0.10, 20); // Dimes
        coinInventory.put(0.05, 20); // Nickels
        coinInventory.put(0.01, 20); // Pennies
    }

    @Override
    public boolean processPayment(double amount) {
        // In a real implementation, this would interact with coin acceptor hardware
        System.out.println("Processing coin payment of $" + amount);
        return true;
    }

    @Override
    public void refund(double amount) {
        System.out.println("Refunding $" + amount + " in coins");
    }

    public Map<Double, Integer> calculateChange(double amount) {
        lock.lock();
        try {
            Map<Double, Integer> change = new HashMap<>();
            double[] coinValues = {0.25, 0.10, 0.05, 0.01};

            for (double coinValue : coinValues) {
                int count = (int) (amount / coinValue);
                int available = coinInventory.getOrDefault(coinValue, 0);

                if (count > 0 && available > 0) {
                    int actualCount = Math.min(count, available);
                    change.put(coinValue, actualCount);
                    amount -= actualCount * coinValue;
                    coinInventory.put(coinValue, available - actualCount);
                }
            }

            // If we couldn't make exact change
            if (amount > 0.001) { // Using a small epsilon for floating point comparison
                // Rollback the changes to inventory
                for (Map.Entry<Double, Integer> entry : change.entrySet()) {
                    double coinValue = entry.getKey();
                    int count = entry.getValue();
                    coinInventory.put(coinValue, coinInventory.get(coinValue) + count);
                }
                return null;
            }

            return change;
        } finally {
            lock.unlock();
        }
    }
}

// Card payment method
class CardPayment implements PaymentMethod {
    @Override
    public boolean processPayment(double amount) {
        // In a real implementation, this would interact with card reader hardware
        System.out.println("Processing card payment of $" + amount);
        return Math.random() > 0.1; // 90% success rate for simulation
    }

    @Override
    public void refund(double amount) {
        System.out.println("Refunding $" + amount + " to card");
    }
}

// Vending machine state interface
interface VendingMachineState {
    void selectProduct(VendingMachine machine, String productId);
    void insertPayment(VendingMachine machine, PaymentMethod method, double amount);
    void dispenseProduct(VendingMachine machine);
    void returnChange(VendingMachine machine);
    void cancel(VendingMachine machine);
}

// Idle state
class IdleState implements VendingMachineState {
    @Override
    public void selectProduct(VendingMachine machine, String productId) {
        Product product = machine.getInventory().get(productId);
        if (product != null && product.getQuantity() > 0) {
            machine.setSelectedProduct(product);
            machine.setDisplay("Selected: " + product.getName() + " - $" + product.getPrice());
            machine.setState(new ProductSelectedState());
        } else {
            machine.setDisplay("Product unavailable");
        }
    }

    @Override
    public void insertPayment(VendingMachine machine, PaymentMethod method, double amount) {
        machine.setDisplay("Please select a product first");
    }

    @Override
    public void dispenseProduct(VendingMachine machine) {
        machine.setDisplay("Please select a product first");
    }

    @Override
    public void returnChange(VendingMachine machine) {
        machine.setDisplay("No change to return");
    }

    @Override
    public void cancel(VendingMachine machine) {
        machine.setDisplay("Nothing to cancel");
    }
}

// Product selected state
class ProductSelectedState implements VendingMachineState {
    @Override
    public void selectProduct(VendingMachine machine, String productId) {
        Product product = machine.getInventory().get(productId);
        if (product != null && product.getQuantity() > 0) {
            machine.setSelectedProduct(product);
            machine.setDisplay("Selected: " + product.getName() + " - $" + product.getPrice());
        } else {
            machine.setDisplay("Product unavailable");
        }
    }

    @Override
    public void insertPayment(VendingMachine machine, PaymentMethod method, double amount) {
        machine.setPaymentMethod(method);
        machine.setAmountPaid(amount);
        machine.setDisplay("Processing payment...");
        machine.setState(new PaymentProcessingState());
        machine.processPayment();
    }

    @Override
    public void dispenseProduct(VendingMachine machine) {
        machine.setDisplay("Please insert payment first");
    }

    @Override
    public void returnChange(VendingMachine machine) {
        machine.setDisplay("No payment to return");
    }

    @Override
    public void cancel(VendingMachine machine) {
        machine.setSelectedProduct(null);
        machine.setDisplay("Transaction cancelled");
        machine.setState(new IdleState());
    }
}

// Payment processing state
class PaymentProcessingState implements VendingMachineState {
    @Override
    public void selectProduct(VendingMachine machine, String productId) {
        machine.setDisplay("Payment in progress, please wait");
    }

    @Override
    public void insertPayment(VendingMachine machine, PaymentMethod method, double amount) {
        machine.setDisplay("Payment already in progress");
    }

    @Override
    public void dispenseProduct(VendingMachine machine) {
        if (machine.isPaymentSuccessful()) {
            machine.setState(new DispensingState());
            machine.dispenseProduct();
        } else {
            machine.setDisplay("Payment failed");
            machine.setState(new IdleState());
        }
    }

    @Override
    public void returnChange(VendingMachine machine) {
        machine.setDisplay("Payment in progress, please wait");
    }

    @Override
    public void cancel(VendingMachine machine) {
        machine.refundPayment();
        machine.setSelectedProduct(null);
        machine.setDisplay("Transaction cancelled");
        machine.setState(new IdleState());
    }
}

// Dispensing state
class DispensingState implements VendingMachineState {
    @Override
    public void selectProduct(VendingMachine machine, String productId) {
        machine.setDisplay("Dispensing product, please wait");
    }

    @Override
    public void insertPayment(VendingMachine machine, PaymentMethod method, double amount) {
        machine.setDisplay("Dispensing product, please wait");
    }

    @Override
    public void dispenseProduct(VendingMachine machine) {
        // Already dispensing
    }

    @Override
    public void returnChange(VendingMachine machine) {
        machine.setState(new ReturningChangeState());
        machine.returnChange();
    }

    @Override
    public void cancel(VendingMachine machine) {
        machine.setDisplay("Too late to cancel, product is being dispensed");
    }
}

// Returning change state
class ReturningChangeState implements VendingMachineState {
    @Override
    public void selectProduct(VendingMachine machine, String productId) {
        machine.setDisplay("Returning change, please wait");
    }

    @Override
    public void insertPayment(VendingMachine machine, PaymentMethod method, double amount) {
        machine.setDisplay("Returning change, please wait");
    }

    @Override
    public void dispenseProduct(VendingMachine machine) {
        machine.setDisplay("Returning change, please wait");
    }

    @Override
    public void returnChange(VendingMachine machine) {
        // Already returning change
    }

    @Override
    public void cancel(VendingMachine machine) {
        machine.setDisplay("Returning change, please wait");
    }

    public void changeReturned(VendingMachine machine) {
        machine.setDisplay("Thank you for your purchase");
        machine.setState(new IdleState());
    }
}

// Service mode state
class ServiceModeState implements VendingMachineState {
    @Override
    public void selectProduct(VendingMachine machine, String productId) {
        machine.setDisplay("Machine in service mode");
    }

    @Override
    public void insertPayment(VendingMachine machine, PaymentMethod method, double amount) {
        machine.setDisplay("Machine in service mode");
    }

    @Override
    public void dispenseProduct(VendingMachine machine) {
        machine.setDisplay("Machine in service mode");
    }

    @Override
    public void returnChange(VendingMachine machine) {
        machine.setDisplay("Machine in service mode");
    }

    @Override
    public void cancel(VendingMachine machine) {
        machine.setDisplay("Exiting service mode");
        machine.setState(new IdleState());
    }
}

// Vending machine class
class VendingMachine {
    private final Map<String, Product> inventory;
    private final Lock lock;
    private VendingMachineState state;
    private String display;
    private Product selectedProduct;
    private PaymentMethod paymentMethod;
    private double amountPaid;
    private boolean paymentSuccessful;

    public VendingMachine() {
        this.inventory = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();
        this.state = new IdleState();
        this.display = "Welcome! Please select a product";

        // Initialize with some products
        addProduct(new Product("A1", "Cola", 1.25, 10));
        addProduct(new Product("A2", "Diet Cola", 1.25, 10));
        addProduct(new Product("B1", "Water", 1.00, 10));
        addProduct(new Product("B2", "Sparkling Water", 1.50, 10));
        addProduct(new Product("C1", "Chips", 0.75, 10));
        addProduct(new Product("C2", "Chocolate", 1.00, 10));
    }

    public Map<String, Product> getInventory() {
        return inventory;
    }

    public void addProduct(Product product) {
        inventory.put(product.getId(), product);
    }

    public void setState(VendingMachineState state) {
        this.state = state;
    }

    public void setDisplay(String display) {
        this.display = display;
        System.out.println("Display: " + display);
    }

    public void setSelectedProduct(Product selectedProduct) {
        this.selectedProduct = selectedProduct;
    }

    public Product getSelectedProduct() {
        return selectedProduct;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setAmountPaid(double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public double getAmountPaid() {
        return amountPaid;
    }

    public boolean isPaymentSuccessful() {
        return paymentSuccessful;
    }

    public void selectProduct(String productId) {
        lock.lock();
        try {
            state.selectProduct(this, productId);
        } finally {
            lock.unlock();
        }
    }

    public void insertPayment(PaymentMethod method, double amount) {
        lock.lock();
        try {
            state.insertPayment(this, method, amount);
        } finally {
            lock.unlock();
        }
    }

    public void processPayment() {
        if (paymentMethod != null && selectedProduct != null) {
            paymentSuccessful = paymentMethod.processPayment(selectedProduct.getPrice());
            if (paymentSuccessful) {
                setDisplay("Payment successful");
                dispenseProduct();
            } else {
                setDisplay("Payment failed");
                refundPayment();
                setState(new IdleState());
            }
        }
    }

    public void dispenseProduct() {
        lock.lock();
        try {
            if (selectedProduct != null && selectedProduct.getQuantity() > 0) {
                setDisplay("Dispensing " + selectedProduct.getName());
                selectedProduct.decrementQuantity();

                // Simulate dispensing
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }

                setDisplay("Please take your " + selectedProduct.getName());

                // Calculate change if needed
                if (amountPaid > selectedProduct.getPrice()) {
                    returnChange();
                } else {
                    setState(new IdleState());
                }
            } else {
                setDisplay("Product out of stock");
                refundPayment();
                setState(new IdleState());
            }
        } finally {
            lock.unlock();
        }
    }

    public void returnChange() {
        lock.lock();
        try {
            if (amountPaid > selectedProduct.getPrice()) {
                double changeAmount = amountPaid - selectedProduct.getPrice();
                setDisplay("Returning change: $" + String.format("%.2f", changeAmount));

                if (paymentMethod instanceof CoinPayment) {
                    Map<Double, Integer> change = ((CoinPayment) paymentMethod).calculateChange(changeAmount);
                    if (change != null) {
                        // Display change breakdown
                        StringBuilder sb = new StringBuilder("Your change: ");
                        for (Map.Entry<Double, Integer> entry : change.entrySet()) {
                            sb.append(entry.getValue()).append(" x $").append(entry.getKey()).append(", ");
                        }
                        setDisplay(sb.toString());
                    } else {
                        setDisplay("Unable to provide exact change, refunding payment");
                        refundPayment();
                    }
                }

                // Simulate returning change
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }

                if (state instanceof ReturningChangeState) {
                    ((ReturningChangeState) state).changeReturned(this);
                } else {
                    setState(new IdleState());
                }
            } else {
                setState(new IdleState());
            }
        } finally {
            lock.unlock();
        }
    }

    public void refundPayment() {
        if (paymentMethod != null && amountPaid > 0) {
            paymentMethod.refund(amountPaid);
            amountPaid = 0;
        }
    }

    public void cancel() {
        lock.lock();
        try {
            state.cancel(this);
        } finally {
            lock.unlock();
        }
    }

    public void enterServiceMode() {
        lock.lock();
        try {
            setDisplay("Entering service mode");
            setState(new ServiceModeState());
        } finally {
            lock.unlock();
        }
    }

    public void displayInventory() {
        System.out.println("Current Inventory:");
        for (Product product : inventory.values()) {
            System.out.println(product);
        }
    }
}

// Example usage
public class VendingMachineDemo {
    public static void main(String[] args) {
        VendingMachine machine = new VendingMachine();

        // Display inventory
        machine.displayInventory();

        // Select a product
        machine.selectProduct("A1");

        // Insert payment
        machine.insertPayment(new CoinPayment(), 2.00);

        // Wait for a moment to see the result
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Try another transaction
        machine.selectProduct("C1");
        machine.insertPayment(new CardPayment(), 1.00);

        // Wait for a moment to see the result
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Cancel a transaction
        machine.selectProduct("B2");
        machine.cancel();
    }
}
```

## Thread Safety Considerations

1. **ReentrantLock**: Used to ensure thread-safe operations on the vending machine
2. **ConcurrentHashMap**: Used for thread-safe product inventory management
3. **State Pattern**: Ensures that vending machine state transitions are atomic and consistent
4. **Immutable Objects**: Product IDs, names, and prices are immutable

## Payment Processing Considerations

1. **Multiple Payment Methods**: Support for coins, bills, and cards
2. **Change Calculation**: Algorithm to calculate optimal change using available coins
3. **Payment Verification**: Verification of payment before dispensing products
4. **Refund Mechanism**: Support for refunding payments when transactions fail

## Inventory Management

1. **Product Tracking**: Keep track of available products and quantities
2. **Out-of-Stock Handling**: Prevent selection of out-of-stock products
3. **Inventory Replenishment**: Support for adding new products in service mode
4. **Product Categorization**: Organize products by type or location

## Additional Features

1. **User Interface**: Interactive display for user feedback
2. **Logging**: Record transactions for auditing and troubleshooting
3. **Temperature Control**: Monitor and control temperature for perishable items
4. **Remote Monitoring**: Allow remote checking of inventory and machine status
5. **Promotional Offers**: Support for discounts or buy-one-get-one offers
