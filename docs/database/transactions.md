# Transactions (Tranzaksiyalar)

Tranzaksiyalarda phenoma-lar var.
- dirty read
  - A transaction reads data written by a concurrent uncommitted transaction.
- nonrepeatbel read
  - A transaction re-reads data it has previously read and finds that data has been modified by another transaction (that committed since the initial read).
- phantom read
  - A transaction re-executes a query returning a set of rows that satisfy a search condition and finds that the set of rows satisfying the condition has changed due to another recently-committed transaction.
- serialization anomaly
  - The result of successfully committing a group of transactions is inconsistent with all possible orderings of running those transactions one at a time.

Vacib olanlar
- Consistency - data logically correct
- Integrity -> valid? correct for cosntraints

- **Isolation Levels:**
    - *Dirty Read:* Qeyri-təsdiqlənmiş məlumatların oxunması (risklidir).
    - *Read Committed:* Oxu zamanı lock qoyulur və oxu bitəndən sonra buraxılır.
    - *Repeatable Read:* Oxunan məlumat tranzaksiya ərzində dəyişmir, lock tranzaksiya sonuna qədər qalır.
    - *Serializable:* Ən yüksək səviyyə; oxu və yazı üçün geniş lock; tam ardıcıllıq təmin edir.

- **2-Phase Locking:** Tranzaksiya əvvəl bütün lock-ları alır, sonra azad edir; uyğunluğu təmin edir.

- **Pessimistic Locking:** Məlumat dəyişdirilmədən əvvəl lock qoyulur.
- **Optimistic Locking:** Dəyişiklikdən sonra konflikt yoxlanılır.


| Lock Type | Read Uncommitted | Read Committed | Repeatable Read | Serializable |
|-----------|------------------|----------------|-----------------|--------------|
| **No Lock** | ✓ (Dirty reads allowed) | ✗ | ✗ | ✗ |
| **Read Lock (Shared)** | ✗ | ✓ (Short duration) | ✓ (Held until transaction end) | ✓ (Held until transaction end) |
| **Write Lock (Exclusive)** | ✓ (Minimal) | ✓ (On modified data) | ✓ (On modified data) | ✓ (On modified data) |
| **Range Lock** | ✗ | ✗ | ✗ | ✓ (Prevents phantom reads) |
| **Intent Lock** | ✗ | ✓ (Hierarchical locking) | ✓ (Hierarchical locking) | ✓ (Hierarchical locking) |
| **Gap Lock** | ✗ | ✗ | ✓ (Some databases) | ✓ (Prevents phantoms) |