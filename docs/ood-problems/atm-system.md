---
title: ATM System Design
description: Design an ATM system with various banking operations
slug: atm-system
tags: [ood, object-oriented-design, state-pattern, concurrency]
keywords: [atm system, banking, state pattern, thread safety, java]
hide_table_of_contents: false
---

# ATM System Design

## Problem Statement

Design an Automated Teller Machine (ATM) system that allows users to perform various banking operations such as withdrawing cash, depositing money, checking account balance, and transferring funds between accounts.

## Requirements

1. **Functional Requirements**:
   - Card validation and PIN verification
   - Cash withdrawal
   - Cash/check deposit
   - Balance inquiry
   - Fund transfer between accounts
   - Mini statement generation
   - PIN change
   - Support for multiple bank accounts

2. **Non-Functional Requirements**:
   - Security (encryption, authentication)
   - Reliability (transaction consistency)
   - Availability (24/7 operation)
   - Performance (quick response time)
   - Thread safety for concurrent operations

## Core Components

1. **Card Reader**: Reads the user's ATM card
2. **Keypad**: Allows user input (PIN, amounts, etc.)
3. **Display**: Shows information and prompts to the user
4. **Cash Dispenser**: Dispenses cash during withdrawals
5. **Deposit Slot**: Accepts cash/checks for deposits
6. **Receipt Printer**: Prints transaction receipts
7. **Bank Server Interface**: Communicates with the bank's central server
8. **ATM Controller**: Coordinates the overall operation

## Design Approach

We'll use the State Pattern to model the ATM's operation:

1. **Idle**: Initial state, waiting for card insertion
2. **CardInserted**: Card has been inserted, waiting for PIN
3. **PinValidation**: Validating the entered PIN
4. **TransactionSelection**: User selecting transaction type
5. **Processing**: Processing the selected transaction
6. **Dispensing**: Dispensing cash (for withdrawals)
7. **Printing**: Printing receipt
8. **FinalState**: Completing transaction, returning card

## Implementation

```java
import java.util.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// Account class
class Account {
    private final String accountNumber;
    private final String accountType;
    private double balance;
    private final String pin;
    private final List<Transaction> transactions;
    private final Lock lock;

    public Account(String accountNumber, String accountType, double balance, String pin) {
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.pin = pin;
        this.transactions = new ArrayList<>();
        this.lock = new ReentrantLock();
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public double getBalance() {
        lock.lock();
        try {
            return balance;
        } finally {
            lock.unlock();
        }
    }

    public boolean validatePin(String enteredPin) {
        return pin.equals(enteredPin);
    }

    public boolean withdraw(double amount) {
        lock.lock();
        try {
            if (amount <= 0) {
                return false;
            }
            
            if (balance >= amount) {
                balance -= amount;
                transactions.add(new Transaction("WITHDRAW", amount, LocalDateTime.now()));
                return true;
            }
            return false;
        } finally {
            lock.unlock();
        }
    }

    public void deposit(double amount) {
        lock.lock();
        try {
            if (amount > 0) {
                balance += amount;
                transactions.add(new Transaction("DEPOSIT", amount, LocalDateTime.now()));
            }
        } finally {
            lock.unlock();
        }
    }

    public List<Transaction> getMiniStatement() {
        lock.lock();
        try {
            // Return last 10 transactions or fewer if less than 10 exist
            int size = transactions.size();
            return new ArrayList<>(transactions.subList(Math.max(0, size - 10), size));
        } finally {
            lock.unlock();
        }
    }

    @Override
    public String toString() {
        return accountType + " Account: " + accountNumber + ", Balance: $" + balance;
    }
}

// Transaction class
class Transaction {
    private final String type;
    private final double amount;
    private final LocalDateTime timestamp;

    public Transaction(String type, double amount, LocalDateTime timestamp) {
        this.type = type;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    public String getType() {
        return type;
    }

    public double getAmount() {
        return amount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return type + ": $" + amount + " at " + timestamp.format(formatter);
    }
}

// Bank class to manage accounts
class Bank {
    private final Map<String, Account> accounts;
    private final Map<String, List<String>> cardToAccounts;

    public Bank() {
        this.accounts = new HashMap<>();
        this.cardToAccounts = new HashMap<>();
        
        // Initialize with some accounts
        createAccount("1234567890", "SAVINGS", 1000.0, "1234");
        createAccount("0987654321", "CHECKING", 2500.0, "4321");
        
        // Associate accounts with cards
        associateCardWithAccount("5555666677778888", "1234567890");
        associateCardWithAccount("5555666677778888", "0987654321");
    }

    public void createAccount(String accountNumber, String accountType, double initialBalance, String pin) {
        accounts.put(accountNumber, new Account(accountNumber, accountType, initialBalance, pin));
    }

    public void associateCardWithAccount(String cardNumber, String accountNumber) {
        cardToAccounts.computeIfAbsent(cardNumber, k -> new ArrayList<>()).add(accountNumber);
    }

    public List<String> getAccountsForCard(String cardNumber) {
        return cardToAccounts.getOrDefault(cardNumber, new ArrayList<>());
    }

    public Account getAccount(String accountNumber) {
        return accounts.get(accountNumber);
    }

    public boolean transferFunds(String fromAccountNumber, String toAccountNumber, double amount) {
        Account fromAccount = accounts.get(fromAccountNumber);
        Account toAccount = accounts.get(toAccountNumber);
        
        if (fromAccount == null || toAccount == null || amount <= 0) {
            return false;
        }
        
        // Lock both accounts to prevent deadlock
        Account firstLock, secondLock;
        if (fromAccountNumber.compareTo(toAccountNumber) < 0) {
            firstLock = fromAccount;
            secondLock = toAccount;
        } else {
            firstLock = toAccount;
            secondLock = fromAccount;
        }
        
        firstLock.lock.lock();
        try {
            secondLock.lock.lock();
            try {
                if (fromAccount.getBalance() >= amount) {
                    fromAccount.withdraw(amount);
                    toAccount.deposit(amount);
                    return true;
                }
                return false;
            } finally {
                secondLock.lock.unlock();
            }
        } finally {
            firstLock.lock.unlock();
        }
    }
}

// ATM state interface
interface ATMState {
    void insertCard(ATM atm, String cardNumber);
    void enterPin(ATM atm, String pin);
    void selectAccount(ATM atm, String accountNumber);
    void selectTransaction(ATM atm, String transactionType);
    void enterAmount(ATM atm, double amount);
    void confirmTransaction(ATM atm);
    void cancelTransaction(ATM atm);
    void ejectCard(ATM atm);
}

// Idle state
class IdleState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setCurrentCardNumber(cardNumber);
        atm.setDisplay("Card inserted. Please enter your PIN:");
        atm.setState(new CardInsertedState());
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("Please insert a card first");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("Please insert a card first");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("Please insert a card first");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Please insert a card first");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Please insert a card first");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.setDisplay("No transaction to cancel");
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setDisplay("No card to eject");
    }
}

// Card inserted state
class CardInsertedState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setCurrentPin(pin);
        atm.setDisplay("Validating PIN...");
        atm.setState(new PinValidationState());
        atm.validatePin();
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("Please enter your PIN first");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("Please enter your PIN first");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Please enter your PIN first");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Please enter your PIN first");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.ejectCard();
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setCurrentCardNumber(null);
        atm.setDisplay("Card ejected");
        atm.setState(new IdleState());
    }
}

// PIN validation state
class PinValidationState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setCurrentPin(pin);
        atm.validatePin();
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("PIN validation in progress");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("PIN validation in progress");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("PIN validation in progress");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("PIN validation in progress");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.ejectCard();
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setCurrentCardNumber(null);
        atm.setCurrentPin(null);
        atm.setDisplay("Card ejected");
        atm.setState(new IdleState());
    }
    
    public void pinValidated(ATM atm, boolean success) {
        if (success) {
            List<String> accounts = atm.getBank().getAccountsForCard(atm.getCurrentCardNumber());
            if (accounts.size() == 1) {
                // Only one account, select it automatically
                atm.setCurrentAccountNumber(accounts.get(0));
                atm.setDisplay("Account selected: " + atm.getBank().getAccount(accounts.get(0)).getAccountType() + 
                              "\nPlease select transaction type: \n1. Withdraw\n2. Deposit\n3. Balance Inquiry\n4. Mini Statement");
                atm.setState(new TransactionSelectionState());
            } else if (accounts.size() > 1) {
                // Multiple accounts, let user select
                StringBuilder sb = new StringBuilder("Please select an account:\n");
                for (int i = 0; i < accounts.size(); i++) {
                    String accountNumber = accounts.get(i);
                    Account account = atm.getBank().getAccount(accountNumber);
                    sb.append(i + 1).append(". ").append(account.getAccountType()).append(" (").append(accountNumber).append(")\n");
                }
                atm.setDisplay(sb.toString());
                atm.setState(new AccountSelectionState());
            } else {
                atm.setDisplay("No accounts associated with this card");
                atm.ejectCard();
            }
        } else {
            atm.setDisplay("Invalid PIN. Card ejected");
            atm.ejectCard();
        }
    }
}

// Account selection state
class AccountSelectionState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("PIN already validated");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setCurrentAccountNumber(accountNumber);
        atm.setDisplay("Account selected: " + atm.getBank().getAccount(accountNumber).getAccountType() + 
                      "\nPlease select transaction type: \n1. Withdraw\n2. Deposit\n3. Balance Inquiry\n4. Mini Statement\n5. Transfer");
        atm.setState(new TransactionSelectionState());
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("Please select an account first");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Please select an account first");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Please select an account first");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.ejectCard();
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setCurrentCardNumber(null);
        atm.setCurrentPin(null);
        atm.setDisplay("Card ejected");
        atm.setState(new IdleState());
    }
}

// Transaction selection state
class TransactionSelectionState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("PIN already validated");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("Account already selected");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setCurrentTransactionType(transactionType);
        
        switch (transactionType) {
            case "WITHDRAW":
                atm.setDisplay("Enter amount to withdraw:");
                atm.setState(new AmountEntryState());
                break;
            case "DEPOSIT":
                atm.setDisplay("Enter amount to deposit:");
                atm.setState(new AmountEntryState());
                break;
            case "BALANCE":
                atm.setDisplay("Processing balance inquiry...");
                atm.setState(new ProcessingState());
                atm.processTransaction();
                break;
            case "MINI_STATEMENT":
                atm.setDisplay("Processing mini statement...");
                atm.setState(new ProcessingState());
                atm.processTransaction();
                break;
            case "TRANSFER":
                List<String> accounts = atm.getBank().getAccountsForCard(atm.getCurrentCardNumber());
                if (accounts.size() <= 1) {
                    atm.setDisplay("No other accounts available for transfer");
                    atm.setState(new TransactionSelectionState());
                } else {
                    StringBuilder sb = new StringBuilder("Select destination account:\n");
                    for (String acc : accounts) {
                        if (!acc.equals(atm.getCurrentAccountNumber())) {
                            Account account = atm.getBank().getAccount(acc);
                            sb.append(account.getAccountType()).append(" (").append(acc).append(")\n");
                        }
                    }
                    atm.setDisplay(sb.toString());
                    atm.setState(new TransferAccountSelectionState());
                }
                break;
            default:
                atm.setDisplay("Invalid transaction type. Please try again.");
                break;
        }
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Please select a transaction type first");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Please select a transaction type first");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.ejectCard();
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setCurrentCardNumber(null);
        atm.setCurrentPin(null);
        atm.setCurrentAccountNumber(null);
        atm.setDisplay("Card ejected");
        atm.setState(new IdleState());
    }
}

// Transfer account selection state
class TransferAccountSelectionState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("PIN already validated");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setTransferAccountNumber(accountNumber);
        atm.setDisplay("Enter amount to transfer:");
        atm.setState(new AmountEntryState());
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("Please select a destination account first");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Please select a destination account first");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Please select a destination account first");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.setState(new TransactionSelectionState());
        atm.setDisplay("Transfer cancelled. Please select transaction type:");
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setCurrentCardNumber(null);
        atm.setCurrentPin(null);
        atm.setCurrentAccountNumber(null);
        atm.setTransferAccountNumber(null);
        atm.setDisplay("Card ejected");
        atm.setState(new IdleState());
    }
}

// Amount entry state
class AmountEntryState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("PIN already validated");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("Account already selected");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("Transaction type already selected");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setTransactionAmount(amount);
        
        String transactionType = atm.getCurrentTransactionType();
        if ("WITHDRAW".equals(transactionType)) {
            atm.setDisplay("Withdraw $" + amount + "? (Y/N)");
        } else if ("DEPOSIT".equals(transactionType)) {
            atm.setDisplay("Deposit $" + amount + "? (Y/N)");
        } else if ("TRANSFER".equals(transactionType)) {
            Account toAccount = atm.getBank().getAccount(atm.getTransferAccountNumber());
            atm.setDisplay("Transfer $" + amount + " to " + toAccount.getAccountType() + "? (Y/N)");
        }
        
        atm.setState(new ConfirmationState());
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Please enter an amount first");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.setState(new TransactionSelectionState());
        atm.setDisplay("Transaction cancelled. Please select transaction type:");
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setCurrentCardNumber(null);
        atm.setCurrentPin(null);
        atm.setCurrentAccountNumber(null);
        atm.setCurrentTransactionType(null);
        atm.setDisplay("Card ejected");
        atm.setState(new IdleState());
    }
}

// Confirmation state
class ConfirmationState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("PIN already validated");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("Account already selected");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("Transaction type already selected");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Amount already entered");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Processing transaction...");
        atm.setState(new ProcessingState());
        atm.processTransaction();
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.setState(new TransactionSelectionState());
        atm.setDisplay("Transaction cancelled. Please select transaction type:");
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setCurrentCardNumber(null);
        atm.setCurrentPin(null);
        atm.setCurrentAccountNumber(null);
        atm.setCurrentTransactionType(null);
        atm.setTransactionAmount(0);
        atm.setDisplay("Card ejected");
        atm.setState(new IdleState());
    }
}

// Processing state
class ProcessingState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("PIN already validated");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("Processing transaction, please wait");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("Processing transaction, please wait");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Processing transaction, please wait");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Processing transaction, please wait");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.setDisplay("Cannot cancel, transaction in progress");
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setDisplay("Cannot eject card, transaction in progress");
    }
    
    public void transactionProcessed(ATM atm, boolean success, String message) {
        if (success) {
            if ("WITHDRAW".equals(atm.getCurrentTransactionType())) {
                atm.setState(new DispensingState());
                atm.dispenseCash();
            } else {
                atm.setDisplay(message + "\nWould you like a receipt? (Y/N)");
                atm.setState(new ReceiptState());
            }
        } else {
            atm.setDisplay(message + "\nWould you like to perform another transaction? (Y/N)");
            atm.setState(new FinalState());
        }
    }
}

// Dispensing state
class DispensingState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("PIN already validated");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("Dispensing cash, please wait");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("Dispensing cash, please wait");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Dispensing cash, please wait");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Dispensing cash, please wait");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        atm.setDisplay("Cannot cancel, dispensing cash");
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setDisplay("Cannot eject card, dispensing cash");
    }
    
    public void cashDispensed(ATM atm) {
        atm.setDisplay("Please take your cash\nWould you like a receipt? (Y/N)");
        atm.setState(new ReceiptState());
    }
}

// Receipt state
class ReceiptState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("PIN already validated");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("Transaction completed, please answer receipt question");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        atm.setDisplay("Transaction completed, please answer receipt question");
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Transaction completed, please answer receipt question");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        // Print receipt
        atm.printReceipt();
        atm.setDisplay("Receipt printed\nWould you like to perform another transaction? (Y/N)");
        atm.setState(new FinalState());
    }

    @Override
    public void cancelTransaction(ATM atm) {
        // No receipt
        atm.setDisplay("Would you like to perform another transaction? (Y/N)");
        atm.setState(new FinalState());
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setCurrentCardNumber(null);
        atm.setCurrentPin(null);
        atm.setCurrentAccountNumber(null);
        atm.setCurrentTransactionType(null);
        atm.setTransactionAmount(0);
        atm.setDisplay("Card ejected");
        atm.setState(new IdleState());
    }
}

// Final state
class FinalState implements ATMState {
    @Override
    public void insertCard(ATM atm, String cardNumber) {
        atm.setDisplay("Card already inserted");
    }

    @Override
    public void enterPin(ATM atm, String pin) {
        atm.setDisplay("PIN already validated");
    }

    @Override
    public void selectAccount(ATM atm, String accountNumber) {
        atm.setDisplay("Please answer the question first");
    }

    @Override
    public void selectTransaction(ATM atm, String transactionType) {
        // User wants another transaction
        atm.setCurrentTransactionType(null);
        atm.setTransactionAmount(0);
        atm.setTransferAccountNumber(null);
        
        List<String> accounts = atm.getBank().getAccountsForCard(atm.getCurrentCardNumber());
        if (accounts.size() > 1) {
            StringBuilder sb = new StringBuilder("Please select an account:\n");
            for (int i = 0; i < accounts.size(); i++) {
                String accountNumber = accounts.get(i);
                Account account = atm.getBank().getAccount(accountNumber);
                sb.append(i + 1).append(". ").append(account.getAccountType()).append(" (").append(accountNumber).append(")\n");
            }
            atm.setDisplay(sb.toString());
            atm.setState(new AccountSelectionState());
        } else {
            atm.setDisplay("Please select transaction type: \n1. Withdraw\n2. Deposit\n3. Balance Inquiry\n4. Mini Statement");
            atm.setState(new TransactionSelectionState());
        }
    }

    @Override
    public void enterAmount(ATM atm, double amount) {
        atm.setDisplay("Please answer the question first");
    }

    @Override
    public void confirmTransaction(ATM atm) {
        atm.setDisplay("Please answer the question first");
    }

    @Override
    public void cancelTransaction(ATM atm) {
        // User doesn't want another transaction
        atm.setDisplay("Thank you for using our ATM");
        atm.ejectCard();
    }

    @Override
    public void ejectCard(ATM atm) {
        atm.setCurrentCardNumber(null);
        atm.setCurrentPin(null);
        atm.setCurrentAccountNumber(null);
        atm.setCurrentTransactionType(null);
        atm.setTransactionAmount(0);
        atm.setTransferAccountNumber(null);
        atm.setDisplay("Card ejected");
        atm.setState(new IdleState());
    }
}

// ATM class
class ATM {
    private final Bank bank;
    private ATMState state;
    private String display;
    private String currentCardNumber;
    private String currentPin;
    private String currentAccountNumber;
    private String currentTransactionType;
    private double transactionAmount;
    private String transferAccountNumber;
    private final Lock lock;
    private double cashOnHand;

    public ATM(Bank bank) {
        this.bank = bank;
        this.state = new IdleState();
        this.display = "Welcome! Please insert your card";
        this.lock = new ReentrantLock();
        this.cashOnHand = 10000.0; // Initial cash in ATM
    }

    public Bank getBank() {
        return bank;
    }

    public void setState(ATMState state) {
        this.state = state;
    }

    public void setDisplay(String display) {
        this.display = display;
        System.out.println("Display: " + display);
    }

    public String getCurrentCardNumber() {
        return currentCardNumber;
    }

    public void setCurrentCardNumber(String currentCardNumber) {
        this.currentCardNumber = currentCardNumber;
    }

    public void setCurrentPin(String currentPin) {
        this.currentPin = currentPin;
    }

    public String getCurrentAccountNumber() {
        return currentAccountNumber;
    }

    public void setCurrentAccountNumber(String currentAccountNumber) {
        this.currentAccountNumber = currentAccountNumber;
    }

    public String getCurrentTransactionType() {
        return currentTransactionType;
    }

    public void setCurrentTransactionType(String currentTransactionType) {
        this.currentTransactionType = currentTransactionType;
    }

    public double getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(double transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public String getTransferAccountNumber() {
        return transferAccountNumber;
    }

    public void setTransferAccountNumber(String transferAccountNumber) {
        this.transferAccountNumber = transferAccountNumber;
    }

    public void insertCard(String cardNumber) {
        lock.lock();
        try {
            state.insertCard(this, cardNumber);
        } finally {
            lock.unlock();
        }
    }

    public void enterPin(String pin) {
        lock.lock();
        try {
            state.enterPin(this, pin);
        } finally {
            lock.unlock();
        }
    }

    public void validatePin() {
        if (currentCardNumber != null && currentPin != null) {
            List<String> accounts = bank.getAccountsForCard(currentCardNumber);
            boolean valid = false;
            
            if (!accounts.isEmpty()) {
                // Check if PIN is valid for any account
                for (String accountNumber : accounts) {
                    Account account = bank.getAccount(accountNumber);
                    if (account != null && account.validatePin(currentPin)) {
                        valid = true;
                        break;
                    }
                }
            }
            
            if (state instanceof PinValidationState) {
                ((PinValidationState) state).pinValidated(this, valid);
            }
        }
    }

    public void selectAccount(String accountNumber) {
        lock.lock();
        try {
            state.selectAccount(this, accountNumber);
        } finally {
            lock.unlock();
        }
    }

    public void selectTransaction(String transactionType) {
        lock.lock();
        try {
            state.selectTransaction(this, transactionType);
        } finally {
            lock.unlock();
        }
    }

    public void enterAmount(double amount) {
        lock.lock();
        try {
            state.enterAmount(this, amount);
        } finally {
            lock.unlock();
        }
    }

    public void confirmTransaction() {
        lock.lock();
        try {
            state.confirmTransaction(this);
        } finally {
            lock.unlock();
        }
    }

    public void processTransaction() {
        if (currentAccountNumber != null && currentTransactionType != null) {
            Account account = bank.getAccount(currentAccountNumber);
            boolean success = false;
            String message = "";
            
            switch (currentTransactionType) {
                case "WITHDRAW":
                    if (transactionAmount <= cashOnHand) {
                        success = account.withdraw(transactionAmount);
                        if (success) {
                            cashOnHand -= transactionAmount;
                            message = "Withdrawal successful";
                        } else {
                            message = "Insufficient funds";
                        }
                    } else {
                        message = "ATM has insufficient cash";
                    }
                    break;
                case "DEPOSIT":
                    account.deposit(transactionAmount);
                    cashOnHand += transactionAmount;
                    success = true;
                    message = "Deposit successful";
                    break;
                case "BALANCE":
                    success = true;
                    message = "Current balance: $" + account.getBalance();
                    break;
                case "MINI_STATEMENT":
                    List<Transaction> transactions = account.getMiniStatement();
                    StringBuilder sb = new StringBuilder("Mini Statement:\n");
                    for (Transaction transaction : transactions) {
                        sb.append(transaction).append("\n");
                    }
                    sb.append("Current balance: $").append(account.getBalance());
                    success = true;
                    message = sb.toString();
                    break;
                case "TRANSFER":
                    if (transferAccountNumber != null) {
                        success = bank.transferFunds(currentAccountNumber, transferAccountNumber, transactionAmount);
                        if (success) {
                            message = "Transfer successful";
                        } else {
                            message = "Transfer failed. Insufficient funds";
                        }
                    } else {
                        message = "Invalid transfer account";
                    }
                    break;
                default:
                    message = "Invalid transaction type";
                    break;
            }
            
            if (state instanceof ProcessingState) {
                ((ProcessingState) state).transactionProcessed(this, success, message);
            }
        }
    }

    public void dispenseCash() {
        // Simulate cash dispensing
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        if (state instanceof DispensingState) {
            ((DispensingState) state).cashDispensed(this);
        }
    }

    public void printReceipt() {
        // Simulate receipt printing
        System.out.println("Printing receipt...");
        System.out.println("------- RECEIPT -------");
        System.out.println("Transaction: " + currentTransactionType);
        if ("WITHDRAW".equals(currentTransactionType) || "DEPOSIT".equals(currentTransactionType) || "TRANSFER".equals(currentTransactionType)) {
            System.out.println("Amount: $" + transactionAmount);
        }
        if ("TRANSFER".equals(currentTransactionType)) {
            System.out.println("To Account: " + transferAccountNumber);
        }
        Account account = bank.getAccount(currentAccountNumber);
        System.out.println("Current Balance: $" + account.getBalance());
        System.out.println("Date: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        System.out.println("-----------------------");
    }

    public void cancelTransaction() {
        lock.lock();
        try {
            state.cancelTransaction(this);
        } finally {
            lock.unlock();
        }
    }

    public void ejectCard() {
        lock.lock();
        try {
            state.ejectCard(this);
        } finally {
            lock.unlock();
        }
    }
}

// Example usage
public class ATMDemo {
    public static void main(String[] args) {
        Bank bank = new Bank();
        ATM atm = new ATM(bank);
        
        // Insert card
        atm.insertCard("5555666677778888");
        
        // Enter PIN
        atm.enterPin("1234");
        
        // Select account (if multiple accounts)
        atm.selectAccount("1234567890");
        
        // Select transaction
        atm.selectTransaction("WITHDRAW");
        
        // Enter amount
        atm.enterAmount(100.0);
        
        // Confirm transaction
        atm.confirmTransaction();
        
        // Wait for processing
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Request receipt
        atm.confirmTransaction();
        
        // Do another transaction
        atm.selectTransaction("BALANCE");
        
        // Wait for processing
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // No receipt
        atm.cancelTransaction();
        
        // Exit
        atm.cancelTransaction();
    }
}
```

## Thread Safety Considerations

1. **ReentrantLock**: Used to ensure thread-safe operations on the ATM and accounts
2. **Atomic Operations**: All critical operations are performed atomically
3. **State Pattern**: Ensures that ATM state transitions are atomic and consistent
4. **Deadlock Prevention**: When transferring funds, accounts are always locked in a consistent order

## Security Considerations

1. **PIN Validation**: Secure validation of user PINs
2. **Card Authentication**: Verification of card validity
3. **Transaction Logging**: All transactions are logged for audit purposes
4. **Session Management**: Clear session data after each transaction
5. **Timeout Mechanism**: Automatic cancellation of inactive sessions

## Transaction Processing

1. **ACID Properties**: Transactions maintain Atomicity, Consistency, Isolation, and Durability
2. **Rollback Mechanism**: Failed transactions are rolled back
3. **Receipt Generation**: Detailed receipts for all transactions
4. **Balance Verification**: Ensure sufficient funds before withdrawals or transfers

## Additional Features

1. **Multi-Account Support**: Support for multiple accounts per card
2. **Fund Transfer**: Transfer between accounts
3. **Mini Statement**: View recent transaction history
4. **Language Selection**: Support for multiple languages
5. **Customizable Limits**: Set withdrawal and transfer limits