---
title: Money Transfer System Design
description: Design a system for transferring money between accounts
slug: money-transfer-system
tags: [ood, object-oriented-design, concurrency, transactions]
keywords: [money transfer, banking, thread safety, transactions, java]
hide_table_of_contents: false
---

# Money Transfer System Design

## Problem Statement

Design a money transfer system that allows users to transfer funds between accounts, ensuring transaction consistency, security, and proper handling of concurrent operations.

## Requirements

1. **Functional Requirements**:
   - Create and manage user accounts
   - Support different types of accounts (e.g., Checking, Savings)
   - Transfer money between accounts
   - View transaction history
   - Support different currencies and exchange rates
   - Notify users of transaction status
   - Handle transaction failures and rollbacks

2. **Non-Functional Requirements**:
   - Security (authentication, authorization)
   - Transaction consistency (ACID properties)
   - Thread safety for concurrent operations
   - Performance (low latency for transfers)
   - Scalability to handle many users and transactions
   - Auditability (logging all operations)

## Core Components

1. **Account**: Represents a user's account with balance and transaction history
2. **User**: Represents a customer who can have multiple accounts
3. **Transaction**: Represents a money transfer between accounts
4. **TransactionProcessor**: Processes and validates transactions
5. **CurrencyConverter**: Handles currency conversion for international transfers
6. **NotificationService**: Sends notifications to users about transaction status
7. **AuditLogger**: Logs all operations for auditing purposes

## Implementation

```java
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

// Currency enum
enum Currency {
    USD, EUR, GBP, JPY, CNY;
    
    @Override
    public String toString() {
        return name();
    }
}

// Account type enum
enum AccountType {
    CHECKING, SAVINGS, INVESTMENT
}

// Transaction status enum
enum TransactionStatus {
    PENDING, COMPLETED, FAILED, CANCELLED
}

// Transaction type enum
enum TransactionType {
    DEPOSIT, WITHDRAWAL, TRANSFER
}

// User class
class User {
    private final String userId;
    private final String name;
    private final String email;
    private final Set<Account> accounts;
    private final Lock lock;

    public User(String userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.accounts = new HashSet<>();
        this.lock = new ReentrantLock();
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void addAccount(Account account) {
        lock.lock();
        try {
            accounts.add(account);
        } finally {
            lock.unlock();
        }
    }

    public Set<Account> getAccounts() {
        lock.lock();
        try {
            return new HashSet<>(accounts);
        } finally {
            lock.unlock();
        }
    }

    public Account getAccountById(String accountId) {
        lock.lock();
        try {
            for (Account account : accounts) {
                if (account.getAccountId().equals(accountId)) {
                    return account;
                }
            }
            return null;
        } finally {
            lock.unlock();
        }
    }
}

// Money class (immutable)
class Money {
    private final double amount;
    private final Currency currency;

    public Money(double amount, Currency currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public double getAmount() {
        return amount;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Money add(Money other, CurrencyConverter converter) {
        if (this.currency == other.currency) {
            return new Money(this.amount + other.amount, this.currency);
        } else {
            Money converted = converter.convert(other, this.currency);
            return new Money(this.amount + converted.amount, this.currency);
        }
    }

    public Money subtract(Money other, CurrencyConverter converter) {
        if (this.currency == other.currency) {
            return new Money(this.amount - other.amount, this.currency);
        } else {
            Money converted = converter.convert(other, this.currency);
            return new Money(this.amount - converted.amount, this.currency);
        }
    }

    @Override
    public String toString() {
        return String.format("%.2f %s", amount, currency);
    }
}

// Account class
class Account {
    private final String accountId;
    private final String userId;
    private final AccountType type;
    private Money balance;
    private final List<Transaction> transactions;
    private final Lock lock;

    public Account(String accountId, String userId, AccountType type, Money initialBalance) {
        this.accountId = accountId;
        this.userId = userId;
        this.type = type;
        this.balance = initialBalance;
        this.transactions = new ArrayList<>();
        this.lock = new ReentrantLock();
    }

    public String getAccountId() {
        return accountId;
    }

    public String getUserId() {
        return userId;
    }

    public AccountType getType() {
        return type;
    }

    public Money getBalance() {
        lock.lock();
        try {
            return balance;
        } finally {
            lock.unlock();
        }
    }

    public void deposit(Money amount, CurrencyConverter converter, String transactionId) {
        lock.lock();
        try {
            balance = balance.add(amount, converter);
            Transaction transaction = new Transaction(
                transactionId,
                null,
                accountId,
                amount,
                TransactionType.DEPOSIT,
                "Deposit to account " + accountId,
                LocalDateTime.now()
            );
            transaction.setStatus(TransactionStatus.COMPLETED);
            transactions.add(transaction);
        } finally {
            lock.unlock();
        }
    }

    public boolean withdraw(Money amount, CurrencyConverter converter, String transactionId) {
        lock.lock();
        try {
            Money convertedAmount = converter.convert(amount, balance.getCurrency());
            if (balance.getAmount() >= convertedAmount.getAmount()) {
                balance = balance.subtract(convertedAmount, converter);
                Transaction transaction = new Transaction(
                    transactionId,
                    accountId,
                    null,
                    amount,
                    TransactionType.WITHDRAWAL,
                    "Withdrawal from account " + accountId,
                    LocalDateTime.now()
                );
                transaction.setStatus(TransactionStatus.COMPLETED);
                transactions.add(transaction);
                return true;
            }
            return false;
        } finally {
            lock.unlock();
        }
    }

    public List<Transaction> getTransactionHistory() {
        lock.lock();
        try {
            return new ArrayList<>(transactions);
        } finally {
            lock.unlock();
        }
    }

    public void addTransaction(Transaction transaction) {
        lock.lock();
        try {
            transactions.add(transaction);
        } finally {
            lock.unlock();
        }
    }

    @Override
    public String toString() {
        return type + " Account: " + accountId + ", Balance: " + balance;
    }
}

// Transaction class
class Transaction {
    private final String transactionId;
    private final String fromAccountId;
    private final String toAccountId;
    private final Money amount;
    private final TransactionType type;
    private final String description;
    private final LocalDateTime timestamp;
    private TransactionStatus status;

    public Transaction(String transactionId, String fromAccountId, String toAccountId, 
                      Money amount, TransactionType type, String description, 
                      LocalDateTime timestamp) {
        this.transactionId = transactionId;
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.timestamp = timestamp;
        this.status = TransactionStatus.PENDING;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public String getFromAccountId() {
        return fromAccountId;
    }

    public String getToAccountId() {
        return toAccountId;
    }

    public Money getAmount() {
        return amount;
    }

    public TransactionType getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public TransactionStatus getStatus() {
        return status;
    }

    public void setStatus(TransactionStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id='" + transactionId + '\'' +
                ", from='" + (fromAccountId != null ? fromAccountId : "N/A") + '\'' +
                ", to='" + (toAccountId != null ? toAccountId : "N/A") + '\'' +
                ", amount=" + amount +
                ", type=" + type +
                ", status=" + status +
                ", timestamp=" + timestamp +
                '}';
    }
}

// Currency converter
class CurrencyConverter {
    private final Map<Currency, Map<Currency, Double>> exchangeRates;

    public CurrencyConverter() {
        this.exchangeRates = new HashMap<>();
        initializeExchangeRates();
    }

    private void initializeExchangeRates() {
        // Initialize with some sample exchange rates
        // In a real system, these would be fetched from an external service
        
        // USD to other currencies
        Map<Currency, Double> usdRates = new HashMap<>();
        usdRates.put(Currency.USD, 1.0);
        usdRates.put(Currency.EUR, 0.85);
        usdRates.put(Currency.GBP, 0.75);
        usdRates.put(Currency.JPY, 110.0);
        usdRates.put(Currency.CNY, 6.5);
        exchangeRates.put(Currency.USD, usdRates);
        
        // EUR to other currencies
        Map<Currency, Double> eurRates = new HashMap<>();
        eurRates.put(Currency.USD, 1.18);
        eurRates.put(Currency.EUR, 1.0);
        eurRates.put(Currency.GBP, 0.88);
        eurRates.put(Currency.JPY, 130.0);
        eurRates.put(Currency.CNY, 7.65);
        exchangeRates.put(Currency.EUR, eurRates);
        
        // GBP to other currencies
        Map<Currency, Double> gbpRates = new HashMap<>();
        gbpRates.put(Currency.USD, 1.33);
        gbpRates.put(Currency.EUR, 1.14);
        gbpRates.put(Currency.GBP, 1.0);
        gbpRates.put(Currency.JPY, 147.0);
        gbpRates.put(Currency.CNY, 8.65);
        exchangeRates.put(Currency.GBP, gbpRates);
        
        // JPY to other currencies
        Map<Currency, Double> jpyRates = new HashMap<>();
        jpyRates.put(Currency.USD, 0.0091);
        jpyRates.put(Currency.EUR, 0.0077);
        jpyRates.put(Currency.GBP, 0.0068);
        jpyRates.put(Currency.JPY, 1.0);
        jpyRates.put(Currency.CNY, 0.059);
        exchangeRates.put(Currency.JPY, jpyRates);
        
        // CNY to other currencies
        Map<Currency, Double> cnyRates = new HashMap<>();
        cnyRates.put(Currency.USD, 0.154);
        cnyRates.put(Currency.EUR, 0.131);
        cnyRates.put(Currency.GBP, 0.116);
        cnyRates.put(Currency.JPY, 16.92);
        cnyRates.put(Currency.CNY, 1.0);
        exchangeRates.put(Currency.CNY, cnyRates);
    }

    public Money convert(Money money, Currency targetCurrency) {
        if (money.getCurrency() == targetCurrency) {
            return money;
        }
        
        double rate = exchangeRates.get(money.getCurrency()).get(targetCurrency);
        return new Money(money.getAmount() * rate, targetCurrency);
    }

    public double getExchangeRate(Currency fromCurrency, Currency toCurrency) {
        return exchangeRates.get(fromCurrency).get(toCurrency);
    }
}

// Notification service
class NotificationService {
    public void notifyUser(User user, String message) {
        // In a real system, this would send an email, SMS, or push notification
        System.out.println("Notification to " + user.getEmail() + ": " + message);
    }
}

// Audit logger
class AuditLogger {
    public void logTransaction(Transaction transaction, String action) {
        // In a real system, this would write to a secure audit log
        System.out.println("AUDIT: " + action + " - " + transaction);
    }
    
    public void logAction(String userId, String action) {
        // In a real system, this would write to a secure audit log
        System.out.println("AUDIT: User " + userId + " - " + action);
    }
}

// Transaction processor
class TransactionProcessor {
    private final Map<String, User> users;
    private final Map<String, Account> accounts;
    private final CurrencyConverter currencyConverter;
    private final NotificationService notificationService;
    private final AuditLogger auditLogger;
    private final AtomicLong transactionIdCounter;

    public TransactionProcessor() {
        this.users = new ConcurrentHashMap<>();
        this.accounts = new ConcurrentHashMap<>();
        this.currencyConverter = new CurrencyConverter();
        this.notificationService = new NotificationService();
        this.auditLogger = new AuditLogger();
        this.transactionIdCounter = new AtomicLong(1000);
    }

    public User createUser(String name, String email) {
        String userId = "U" + UUID.randomUUID().toString().substring(0, 8);
        User user = new User(userId, name, email);
        users.put(userId, user);
        auditLogger.logAction(userId, "User created");
        return user;
    }

    public Account createAccount(String userId, AccountType type, Money initialBalance) {
        User user = users.get(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        
        String accountId = "A" + UUID.randomUUID().toString().substring(0, 8);
        Account account = new Account(accountId, userId, type, initialBalance);
        accounts.put(accountId, account);
        user.addAccount(account);
        
        auditLogger.logAction(userId, "Account created: " + accountId);
        notificationService.notifyUser(user, "New " + type + " account created with initial balance of " + initialBalance);
        
        return account;
    }

    public Transaction transfer(String fromAccountId, String toAccountId, Money amount) {
        Account fromAccount = accounts.get(fromAccountId);
        Account toAccount = accounts.get(toAccountId);
        
        if (fromAccount == null || toAccount == null) {
            throw new IllegalArgumentException("One or both accounts not found");
        }
        
        String transactionId = "T" + transactionIdCounter.incrementAndGet();
        Transaction transaction = new Transaction(
            transactionId,
            fromAccountId,
            toAccountId,
            amount,
            TransactionType.TRANSFER,
            "Transfer from " + fromAccountId + " to " + toAccountId,
            LocalDateTime.now()
        );
        
        // Lock accounts in a consistent order to prevent deadlocks
        Account firstLock, secondLock;
        if (fromAccountId.compareTo(toAccountId) < 0) {
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
                // Check if sufficient funds
                Money convertedAmount = currencyConverter.convert(amount, fromAccount.getBalance().getCurrency());
                if (fromAccount.getBalance().getAmount() < convertedAmount.getAmount()) {
                    transaction.setStatus(TransactionStatus.FAILED);
                    auditLogger.logTransaction(transaction, "Transfer failed - Insufficient funds");
                    notificationService.notifyUser(users.get(fromAccount.getUserId()), 
                                                 "Transfer failed: Insufficient funds");
                    return transaction;
                }
                
                // Withdraw from source account
                fromAccount.withdraw(convertedAmount, currencyConverter, transactionId);
                
                // Deposit to destination account
                toAccount.deposit(amount, currencyConverter, transactionId);
                
                // Update transaction status
                transaction.setStatus(TransactionStatus.COMPLETED);
                
                // Add transaction to both accounts
                fromAccount.addTransaction(transaction);
                toAccount.addTransaction(transaction);
                
                // Log and notify
                auditLogger.logTransaction(transaction, "Transfer completed");
                notificationService.notifyUser(users.get(fromAccount.getUserId()), 
                                             "Transfer of " + amount + " to account " + toAccountId + " completed");
                notificationService.notifyUser(users.get(toAccount.getUserId()), 
                                             "Received " + amount + " from account " + fromAccountId);
                
                return transaction;
            } finally {
                secondLock.lock.unlock();
            }
        } finally {
            firstLock.lock.unlock();
        }
    }

    public Transaction deposit(String accountId, Money amount) {
        Account account = accounts.get(accountId);
        if (account == null) {
            throw new IllegalArgumentException("Account not found");
        }
        
        String transactionId = "T" + transactionIdCounter.incrementAndGet();
        Transaction transaction = new Transaction(
            transactionId,
            null,
            accountId,
            amount,
            TransactionType.DEPOSIT,
            "Deposit to account " + accountId,
            LocalDateTime.now()
        );
        
        account.deposit(amount, currencyConverter, transactionId);
        transaction.setStatus(TransactionStatus.COMPLETED);
        
        auditLogger.logTransaction(transaction, "Deposit completed");
        notificationService.notifyUser(users.get(account.getUserId()), 
                                     "Deposit of " + amount + " to account " + accountId + " completed");
        
        return transaction;
    }

    public Transaction withdraw(String accountId, Money amount) {
        Account account = accounts.get(accountId);
        if (account == null) {
            throw new IllegalArgumentException("Account not found");
        }
        
        String transactionId = "T" + transactionIdCounter.incrementAndGet();
        Transaction transaction = new Transaction(
            transactionId,
            accountId,
            null,
            amount,
            TransactionType.WITHDRAWAL,
            "Withdrawal from account " + accountId,
            LocalDateTime.now()
        );
        
        boolean success = account.withdraw(amount, currencyConverter, transactionId);
        if (success) {
            transaction.setStatus(TransactionStatus.COMPLETED);
            auditLogger.logTransaction(transaction, "Withdrawal completed");
            notificationService.notifyUser(users.get(account.getUserId()), 
                                         "Withdrawal of " + amount + " from account " + accountId + " completed");
        } else {
            transaction.setStatus(TransactionStatus.FAILED);
            auditLogger.logTransaction(transaction, "Withdrawal failed - Insufficient funds");
            notificationService.notifyUser(users.get(account.getUserId()), 
                                         "Withdrawal failed: Insufficient funds");
        }
        
        return transaction;
    }

    public List<Transaction> getTransactionHistory(String accountId) {
        Account account = accounts.get(accountId);
        if (account == null) {
            throw new IllegalArgumentException("Account not found");
        }
        
        return account.getTransactionHistory();
    }

    public User getUser(String userId) {
        return users.get(userId);
    }

    public Account getAccount(String accountId) {
        return accounts.get(accountId);
    }

    public Money getExchangeAmount(Money amount, Currency targetCurrency) {
        return currencyConverter.convert(amount, targetCurrency);
    }
}

// Example usage
public class MoneyTransferDemo {
    public static void main(String[] args) {
        TransactionProcessor processor = new TransactionProcessor();
        
        // Create users
        User alice = processor.createUser("Alice Smith", "alice@example.com");
        User bob = processor.createUser("Bob Johnson", "bob@example.com");
        
        // Create accounts
        Account aliceChecking = processor.createAccount(alice.getUserId(), AccountType.CHECKING, 
                                                      new Money(1000.0, Currency.USD));
        Account aliceSavings = processor.createAccount(alice.getUserId(), AccountType.SAVINGS, 
                                                     new Money(5000.0, Currency.USD));
        Account bobChecking = processor.createAccount(bob.getUserId(), AccountType.CHECKING, 
                                                    new Money(2000.0, Currency.EUR));
        
        System.out.println("\nInitial account states:");
        System.out.println(aliceChecking);
        System.out.println(aliceSavings);
        System.out.println(bobChecking);
        
        // Perform transfers
        System.out.println("\nPerforming transfers...");
        processor.transfer(aliceChecking.getAccountId(), bobChecking.getAccountId(), 
                          new Money(200.0, Currency.USD));
        processor.transfer(aliceSavings.getAccountId(), aliceChecking.getAccountId(), 
                          new Money(500.0, Currency.USD));
        
        // Deposit and withdraw
        processor.deposit(bobChecking.getAccountId(), new Money(300.0, Currency.EUR));
        processor.withdraw(aliceChecking.getAccountId(), new Money(100.0, Currency.USD));
        
        // Check final balances
        System.out.println("\nFinal account states:");
        System.out.println(aliceChecking);
        System.out.println(aliceSavings);
        System.out.println(bobChecking);
        
        // View transaction history
        System.out.println("\nAlice's checking account transaction history:");
        List<Transaction> transactions = processor.getTransactionHistory(aliceChecking.getAccountId());
        for (Transaction transaction : transactions) {
            System.out.println(transaction);
        }
    }
}
```

## Thread Safety Considerations

1. **ReentrantLock**: Used to ensure thread-safe operations on accounts and users
2. **ConcurrentHashMap**: Used for thread-safe storage of users and accounts
3. **Atomic Operations**: Critical operations like transfers are performed atomically
4. **Deadlock Prevention**: Accounts are always locked in a consistent order during transfers
5. **Immutable Objects**: Money class is immutable to prevent race conditions

## Transaction Consistency

1. **ACID Properties**:
   - **Atomicity**: Transfers either complete fully or not at all
   - **Consistency**: Account balances are always valid
   - **Isolation**: Concurrent transactions don't interfere with each other
   - **Durability**: Completed transactions are recorded in transaction history

2. **Two-Phase Operations**: Transfers involve withdrawing from one account and depositing to another, both operations must succeed

3. **Rollback Mechanism**: If any part of a transaction fails, changes are rolled back

## Security Considerations

1. **Authentication**: Users must be authenticated before performing operations
2. **Authorization**: Users can only access their own accounts
3. **Audit Logging**: All operations are logged for auditing purposes
4. **Secure Communication**: In a real system, all communication would be encrypted
5. **Input Validation**: All inputs are validated before processing

## Additional Features

1. **Multi-Currency Support**: Support for different currencies and exchange rates
2. **Notification System**: Users are notified of transaction status
3. **Transaction History**: Comprehensive history of all transactions
4. **Different Account Types**: Support for checking, savings, and investment accounts
5. **Extensible Design**: Easy to add new features like scheduled transfers or recurring payments