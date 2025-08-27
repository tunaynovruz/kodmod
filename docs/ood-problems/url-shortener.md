---
draft: true
title: URL Shortener Design
description: Design a URL shortener system using the strategy pattern
slug: url-shortener
tags: [ood, object-oriented-design, strategy-pattern, concurrency]
keywords: [url shortener, tiny url, strategy pattern, thread safety, java]
hide_table_of_contents: false
---

# URL Shortener Design

## Problem Statement

Design a URL shortener service (like TinyURL or bit.ly) that can convert a long URL into a shorter, unique URL and redirect users from the short URL to the original long URL.

## Requirements

1. **Functional Requirements**:
   - Convert long URLs to short URLs
   - Redirect from short URLs to original long URLs
   - Allow users to specify custom short URLs (optional)
   - Set expiration time for URLs (optional)

2. **Non-Functional Requirements**:
   - High availability
   - Low latency for redirection
   - URLs should be hard to predict
   - System should be scalable

## Core Components

1. **URL Shortening Service**: Converts long URLs to short URLs
2. **URL Storage**: Stores the mapping between short and long URLs
3. **URL Redirection Service**: Redirects users from short URLs to original URLs

## Design Approach

We'll use the Strategy Pattern to allow different URL shortening algorithms:

1. **Random String Generation**: Generate a random string of characters
2. **Base62 Encoding**: Convert an incrementing ID to a Base62 string
3. **MD5 Hashing**: Generate a hash of the URL and take a substring

## Implementation

```java
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

// Strategy interface for URL shortening algorithms
interface UrlShorteningStrategy {
    String shortenUrl(String longUrl);
}

// Random string generation strategy
class RandomStringStrategy implements UrlShorteningStrategy {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int SHORT_URL_LENGTH = 7;
    private final Random random = new Random();

    @Override
    public String shortenUrl(String longUrl) {
        StringBuilder sb = new StringBuilder(SHORT_URL_LENGTH);
        for (int i = 0; i < SHORT_URL_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }
}

// Base62 encoding strategy
class Base62Strategy implements UrlShorteningStrategy {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int BASE = CHARACTERS.length();
    private final AtomicLong counter = new AtomicLong(1000000); // Start from a non-zero value

    @Override
    public String shortenUrl(String longUrl) {
        long id = counter.incrementAndGet();
        StringBuilder sb = new StringBuilder();
        
        while (id > 0) {
            sb.append(CHARACTERS.charAt((int) (id % BASE)));
            id /= BASE;
        }
        
        return sb.reverse().toString();
    }
}

// MD5 hashing strategy
class MD5HashingStrategy implements UrlShorteningStrategy {
    private static final int SHORT_URL_LENGTH = 7;

    @Override
    public String shortenUrl(String longUrl) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(longUrl.getBytes());
            String hash = Base64.getUrlEncoder().encodeToString(digest);
            return hash.substring(0, SHORT_URL_LENGTH);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("MD5 algorithm not found", e);
        }
    }
}

// URL Shortener service
class UrlShortener {
    private final UrlShorteningStrategy strategy;
    private final Map<String, String> shortToLongMap;
    private final Map<String, String> longToShortMap;
    
    public UrlShortener(UrlShorteningStrategy strategy) {
        this.strategy = strategy;
        // Using ConcurrentHashMap for thread safety
        this.shortToLongMap = new ConcurrentHashMap<>();
        this.longToShortMap = new ConcurrentHashMap<>();
    }
    
    public String shorten(String longUrl) {
        // Check if URL is already shortened
        if (longToShortMap.containsKey(longUrl)) {
            return longToShortMap.get(longUrl);
        }
        
        // Generate a short URL
        String shortUrl;
        do {
            shortUrl = strategy.shortenUrl(longUrl);
        } while (shortToLongMap.containsKey(shortUrl)); // Ensure uniqueness
        
        // Store the mapping
        shortToLongMap.put(shortUrl, longUrl);
        longToShortMap.put(longUrl, shortUrl);
        
        return shortUrl;
    }
    
    public String expand(String shortUrl) {
        return shortToLongMap.get(shortUrl);
    }
}

// Example usage
public class UrlShortenerDemo {
    public static void main(String[] args) {
        // Create URL shortener with Base62 strategy
        UrlShortener shortener = new UrlShortener(new Base62Strategy());
        
        // Shorten a URL
        String longUrl = "https://www.example.com/very/long/url/that/needs/shortening";
        String shortUrl = shortener.shorten(longUrl);
        System.out.println("Short URL: " + shortUrl);
        
        // Expand the short URL
        String expandedUrl = shortener.expand(shortUrl);
        System.out.println("Original URL: " + expandedUrl);
    }
}
```

## Thread Safety Considerations

1. **ConcurrentHashMap**: Used for thread-safe access to the URL mappings
2. **AtomicLong**: Used for thread-safe counter incrementation in the Base62 strategy
3. **Immutable Strategies**: The strategy implementations are effectively immutable

## Scaling Considerations

1. **Distributed Storage**: For large-scale systems, replace in-memory maps with a distributed database
2. **Caching**: Add caching for frequently accessed URLs
3. **Load Balancing**: Distribute requests across multiple instances
4. **Collision Handling**: Implement more sophisticated collision detection and resolution

## Additional Features

1. **Custom URLs**: Allow users to specify their own short URLs
2. **Analytics**: Track click-through rates and other metrics
3. **Expiration**: Set expiration times for URLs
4. **Rate Limiting**: Prevent abuse by limiting requests per user