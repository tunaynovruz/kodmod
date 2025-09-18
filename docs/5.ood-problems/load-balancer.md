---
draft: true
title: Load Balancer Design
description: Design a load balancer system using the strategy pattern
slug: load-balancer
tags: [ood, object-oriented-design, strategy-pattern, concurrency]
keywords: [load balancer, strategy pattern, thread safety, java, distributed systems]
hide_table_of_contents: false
---

# Load Balancer Design

## Problem Statement

Design a load balancer that distributes incoming client requests across multiple servers to ensure no single server becomes overwhelmed, improving the reliability and availability of applications.

## Requirements

1. **Functional Requirements**:
   - Distribute incoming requests across multiple servers
   - Support different load balancing algorithms
   - Health checking to avoid sending requests to unhealthy servers
   - Add/remove servers dynamically

2. **Non-Functional Requirements**:
   - High availability
   - Low latency
   - Thread safety for concurrent requests
   - Scalability

## Core Components

1. **Load Balancing Service**: Distributes requests using a selected algorithm
2. **Server Registry**: Maintains the list of available servers
3. **Health Checker**: Monitors server health
4. **Request Router**: Routes requests to the selected server

## Design Approach

We'll use the Strategy Pattern to implement different load balancing algorithms:

1. **Round Robin**: Cycle through servers sequentially
2. **Least Connections**: Send requests to the server with the fewest active connections
3. **Random Selection**: Randomly select a server for each request
4. **Weighted Round Robin**: Like Round Robin but with server weights

## Implementation


<details>
<summary>Koda bax</summary>

```java
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

// Server class representing a backend server
class Server {
    private final String id;
    private final String host;
    private final int port;
    private boolean healthy;
    private final AtomicInteger activeConnections;
    private final int weight;

    public Server(String id, String host, int port, int weight) {
        this.id = id;
        this.host = host;
        this.port = port;
        this.healthy = true;
        this.activeConnections = new AtomicInteger(0);
        this.weight = weight;
    }

    public String getId() {
        return id;
    }

    public String getHost() {
        return host;
    }

    public int getPort() {
        return port;
    }

    public boolean isHealthy() {
        return healthy;
    }

    public void setHealthy(boolean healthy) {
        this.healthy = healthy;
    }

    public int getActiveConnections() {
        return activeConnections.get();
    }

    public void incrementConnections() {
        activeConnections.incrementAndGet();
    }

    public void decrementConnections() {
        activeConnections.decrementAndGet();
    }

    public int getWeight() {
        return weight;
    }

    @Override
    public String toString() {
        return host + ":" + port;
    }
}

// Strategy interface for load balancing algorithms
interface LoadBalancingStrategy {
    Server getNextServer(List<Server> servers);
}

// Round Robin strategy
class RoundRobinStrategy implements LoadBalancingStrategy {
    private final AtomicInteger counter = new AtomicInteger(0);

    @Override
    public Server getNextServer(List<Server> servers) {
        if (servers.isEmpty()) {
            return null;
        }

        int index = counter.getAndIncrement() % servers.size();
        return servers.get(index);
    }
}

// Least Connections strategy
class LeastConnectionsStrategy implements LoadBalancingStrategy {
    @Override
    public Server getNextServer(List<Server> servers) {
        if (servers.isEmpty()) {
            return null;
        }

        return servers.stream()
                .min(Comparator.comparingInt(Server::getActiveConnections))
                .orElse(null);
    }
}

// Random Selection strategy
class RandomSelectionStrategy implements LoadBalancingStrategy {
    private final Random random = new Random();

    @Override
    public Server getNextServer(List<Server> servers) {
        if (servers.isEmpty()) {
            return null;
        }

        int index = random.nextInt(servers.size());
        return servers.get(index);
    }
}

// Weighted Round Robin strategy
class WeightedRoundRobinStrategy implements LoadBalancingStrategy {
    private final AtomicInteger counter = new AtomicInteger(0);

    @Override
    public Server getNextServer(List<Server> servers) {
        if (servers.isEmpty()) {
            return null;
        }

        // Calculate total weight
        int totalWeight = servers.stream().mapToInt(Server::getWeight).sum();
        
        // Get current position
        int position = counter.getAndIncrement() % totalWeight;
        
        // Find the server at this position
        int weightSum = 0;
        for (Server server : servers) {
            weightSum += server.getWeight();
            if (position < weightSum) {
                return server;
            }
        }
        
        // Fallback to first server (should not happen)
        return servers.get(0);
    }
}

// Load Balancer class
class LoadBalancer {
    private final Map<String, Server> servers;
    private final List<Server> healthyServers;
    private LoadBalancingStrategy strategy;
    private final ReadWriteLock lock;

    public LoadBalancer(LoadBalancingStrategy strategy) {
        this.strategy = strategy;
        this.servers = new ConcurrentHashMap<>();
        this.healthyServers = new ArrayList<>();
        this.lock = new ReentrantReadWriteLock();
    }

    public void setStrategy(LoadBalancingStrategy strategy) {
        this.strategy = strategy;
    }

    public void addServer(Server server) {
        lock.writeLock().lock();
        try {
            servers.put(server.getId(), server);
            if (server.isHealthy()) {
                healthyServers.add(server);
            }
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void removeServer(String serverId) {
        lock.writeLock().lock();
        try {
            Server server = servers.remove(serverId);
            if (server != null) {
                healthyServers.remove(server);
            }
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void updateServerHealth(String serverId, boolean healthy) {
        lock.writeLock().lock();
        try {
            Server server = servers.get(serverId);
            if (server != null) {
                server.setHealthy(healthy);
                if (healthy && !healthyServers.contains(server)) {
                    healthyServers.add(server);
                } else if (!healthy) {
                    healthyServers.remove(server);
                }
            }
        } finally {
            lock.writeLock().unlock();
        }
    }

    public Server getNextServer() {
        lock.readLock().lock();
        try {
            if (healthyServers.isEmpty()) {
                return null;
            }
            return strategy.getNextServer(new ArrayList<>(healthyServers));
        } finally {
            lock.readLock().unlock();
        }
    }

    public void handleRequest(String request) {
        Server server = getNextServer();
        if (server == null) {
            System.out.println("No available servers to handle request: " + request);
            return;
        }

        try {
            server.incrementConnections();
            System.out.println("Routing request '" + request + "' to server " + server);
            // Simulate request processing
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            server.decrementConnections();
        }
    }
}

// Example usage
public class LoadBalancerDemo {
    public static void main(String[] args) {
        // Create load balancer with Round Robin strategy
        LoadBalancer loadBalancer = new LoadBalancer(new RoundRobinStrategy());
        
        // Add servers
        loadBalancer.addServer(new Server("s1", "192.168.1.1", 8080, 1));
        loadBalancer.addServer(new Server("s2", "192.168.1.2", 8080, 1));
        loadBalancer.addServer(new Server("s3", "192.168.1.3", 8080, 2));
        
        // Process some requests
        for (int i = 0; i < 10; i++) {
            loadBalancer.handleRequest("Request-" + i);
        }
        
        // Change strategy to Least Connections
        System.out.println("\nChanging to Least Connections strategy\n");
        loadBalancer.setStrategy(new LeastConnectionsStrategy());
        
        // Process more requests
        for (int i = 10; i < 20; i++) {
            loadBalancer.handleRequest("Request-" + i);
        }
    }
}
```
</details>

## Thread Safety Considerations

1. **ConcurrentHashMap**: Used for thread-safe access to the server registry
2. **AtomicInteger**: Used for thread-safe counters in various strategies
3. **ReadWriteLock**: Used to protect the server list during reads and writes
4. **Immutable Strategies**: The strategy implementations are effectively immutable

## Health Checking

In a real-world implementation, the load balancer would periodically check the health of each server:


<details>
<summary>Koda bax</summary>

```java
class HealthChecker implements Runnable {
    private final LoadBalancer loadBalancer;
    private final Map<String, Server> servers;
    
    public HealthChecker(LoadBalancer loadBalancer, Map<String, Server> servers) {
        this.loadBalancer = loadBalancer;
        this.servers = servers;
    }
    
    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            for (Map.Entry<String, Server> entry : servers.entrySet()) {
                String serverId = entry.getKey();
                Server server = entry.getValue();
                boolean isHealthy = checkServerHealth(server);
                loadBalancer.updateServerHealth(serverId, isHealthy);
            }
            
            try {
                Thread.sleep(5000); // Check every 5 seconds
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }
    
    private boolean checkServerHealth(Server server) {
        // In a real implementation, this would send a health check request to the server
        // For simplicity, we'll just simulate with a random check
        return Math.random() > 0.1; // 90% chance of being healthy
    }
}
```
</details>

## Scaling Considerations

1. **Distributed Load Balancers**: Deploy multiple load balancer instances with a shared state
2. **Consistent Hashing**: Use consistent hashing for better distribution when servers are added/removed
3. **Service Discovery**: Integrate with service discovery systems for dynamic server registration
