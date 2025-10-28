---
draft: true
---

# Sual: Hit Counter
You need to design a hit counter system that tracks the number of hits received within the past 5 minutes (300 seconds).

The system should support two main operations:

Recording hits: When a hit occurs at a specific timestamp (in seconds), the system should record it. Multiple hits can happen at the same timestamp.

Querying hit count: Given a timestamp, the system should return the total number of hits that occurred in the past 300 seconds from that timestamp. Specifically, it counts all hits in the time range [timestamp - 299, timestamp].

Key constraints and assumptions:

Timestamps are provided in seconds
Calls to the system happen in chronological order (timestamps are monotonically increasing)
Multiple hits may arrive at the same timestamp

Həll:

```java

```
