---
draft: true
---

# Design URL Shortener (like bit.ly)
draft: true

## Problem Statement

Design a URL shortening service like bit.ly that:
- Converts long URLs into significantly shorter aliases
- Redirects users from the short URL to the original long URL
- Provides analytics on link usage
- Handles high volumes of redirects with low latency
- Scales to billions of URLs and redirects

## Requirements

### Functional Requirements
- Generate a unique short URL for each long URL submitted
- Redirect users from the short URL to the original long URL
- Allow users to create custom short URLs (if available)
- Provide basic analytics (clicks, referrers, geographic data)
- Allow users to create accounts to manage their shortened URLs
- Support URL expiration after a certain time or number of clicks
- Provide API access for programmatic URL shortening

### Non-Functional Requirements
- High availability (99.9%+)
- Low latency for URL redirection (< 100ms)
- Scalable to handle billions of URLs and redirects
- Durable storage with no data loss
- Security measures to prevent abuse
- Analytics data should be eventually consistent

## System Architecture

```
                                  +----------------+
                                  |                |
                                  |  Load Balancer |
                                  |                |
                                  +--------+-------+
                                           |
                                           v
+-------------+    +-------------+    +----+------+    +-------------+
|             |    |             |    |           |    |             |
| Web/API     +---->  API Gateway+---->Application+---->  URL        |
| Clients     |    |             |    |  Servers  |    |  Service    |
+-------------+    +-------------+    +-----+-----+    +------+------+
                                            |                 |
                                            v                 v
                        +------------------+--+    +----------+---------+
                        |                     |    |                    |
                        |  Analytics          |    |  User              |
                        |  Service            |    |  Service           |
                        +---------------------+    +--------------------+
                                |                          |
                                v                          v
+----------------+    +--------+-------+    +----------------+    +----------------+
|                |    |                |    |                |    |                |
| Cache          |    | URL Database   |    | Analytics DB   |    | User DB        |
| (Redis)        |    | (SQL/NoSQL)    |    | (Time Series)  |    | (SQL)          |
|                |    |                |    |                |    |                |
+----------------+    +----------------+    +----------------+    +----------------+
```

## Component Design

### URL Shortening Flow
1. User submits a long URL through web interface or API
2. Application server validates the URL (format, safety checks)
3. URL Service:
   - Checks if URL already exists in the database
   - If it exists, returns the existing short URL
   - If not, generates a new unique short code
   - Stores the mapping between short code and long URL
4. Short URL is returned to the user

### URL Redirection Flow
1. User clicks on a short URL
2. Request goes to the Application Server
3. Application Server:
   - Checks the cache for the short code mapping
   - If found in cache, redirects immediately
   - If not in cache, queries the URL Database
   - Updates cache with the mapping
4. User is redirected to the original long URL
5. Analytics Service asynchronously records the click event

### Analytics Collection Flow
1. When a redirection occurs, a click event is generated
2. Analytics Service processes the event:
   - Extracts metadata (timestamp, user agent, IP address, referrer)
   - Resolves geolocation from IP address
   - Stores the event in Analytics Database
3. Analytics data is aggregated periodically for reporting

## Database Design

### URL Database (SQL or NoSQL)
- Stores mappings between short codes and original URLs
- Schema:
  ```
  URLs {
    shortCode: string (primary key)
    originalUrl: string
    userId: UUID (foreign key to Users, nullable)
    createdAt: datetime
    expiresAt: datetime (nullable)
    clickCount: counter
    isCustom: boolean
    isActive: boolean
  }
  ```

### Analytics Database (Time Series Database)
- Stores click events and aggregated analytics
- Schema:
  ```
  ClickEvents {
    eventId: UUID (primary key)
    shortCode: string (foreign key to URLs)
    timestamp: datetime
    ipAddress: string
    userAgent: string
    referrer: string
    country: string
    city: string
    deviceType: string
    browserType: string
  }
  
  DailyStats {
    shortCode: string (composite key with date)
    date: date (composite key with shortCode)
    clicks: int
    uniqueClicks: int
    countries: map<string, int>
    referrers: map<string, int>
    browsers: map<string, int>
    devices: map<string, int>
  }
  ```

### User Database (SQL)
- Stores user account information
- Schema:
  ```
  Users {
    userId: UUID (primary key)
    email: string
    passwordHash: string
    name: string
    createdAt: datetime
    lastLogin: datetime
    accountType: string (free, premium)
  }
  
  ApiKeys {
    apiKey: string (primary key)
    userId: UUID (foreign key to Users)
    name: string
    createdAt: datetime
    lastUsed: datetime
    isActive: boolean
    rateLimit: int
  }
  ```

## Short Code Generation Strategies

### Base62 Encoding
- Convert an auto-incrementing ID to a base62 representation (a-z, A-Z, 0-9)
- Pros: Simple, guarantees uniqueness, creates short codes
- Cons: Sequential patterns may be predictable

### Random Generation
- Generate random 6-8 character strings
- Pros: Non-sequential, harder to guess
- Cons: Need to check for collisions

### Counter-based with Base62
1. Maintain a distributed counter service
2. Get next available ID from counter
3. Convert ID to base62 string
4. This creates short, unique codes

### Custom Short Codes
- Allow users to specify their preferred short code
- Check availability in the database
- Reserve certain patterns for premium users

## Scalability Considerations

### Read-Heavy Workload Optimization
- **Caching**: Implement aggressive caching for URL mappings
- **Read Replicas**: Use database read replicas for URL lookups
- **Global Distribution**: Deploy redirect servers globally using CDN
- **In-Memory Databases**: Consider Redis or similar for hot URLs

### Write Scalability
- **Database Sharding**: Shard URL database by short code
- **Write-Through Cache**: Update cache when new URLs are created
- **Asynchronous Analytics**: Process click events asynchronously

## Bottlenecks and Solutions

### High Redirection Volume
- **Problem**: Handling billions of redirects with low latency
- **Solution**:
  - Multi-layer caching (CDN, application cache, database cache)
  - Edge computing for redirects
  - Optimize redirect path to minimize processing
  - Use HTTP 301 (permanent) redirects for browser caching

### Database Growth
- **Problem**: URL database grows continuously
- **Solution**:
  - Implement URL expiration and cleanup
  - Archive old/unused URLs to cold storage
  - Shard database by creation date or short code
  - Implement data retention policies

### Analytics Processing
- **Problem**: Processing and storing billions of click events
- **Solution**:
  - Use time-series databases optimized for this workload
  - Implement data aggregation and downsampling
  - Process analytics asynchronously
  - Use stream processing for real-time analytics

## Caching Strategy

- **URL Mapping Cache**: Cache short code to long URL mappings in Redis
- **CDN Caching**: Use CDN for popular redirects with appropriate cache headers
- **Browser Caching**: Use HTTP 301 redirects for browser-side caching
- **Analytics Cache**: Cache recent analytics data for quick dashboard loading

## Data Replication and Consistency

- **URL Database Replication**: Synchronous replication for URL mappings
- **Analytics Replication**: Asynchronous replication for analytics data
- **Consistency Model**:
  - Strong consistency for URL creation and mapping
  - Eventual consistency for analytics and click counts
  - Use atomic operations for counter updates

## Sharding Strategy

- **Short Code Sharding**: Shard URL database by short code prefix
- **User-based Sharding**: Shard user data by userId
- **Time-based Sharding**: Shard analytics data by time periods
- **Hybrid Approach**: Different sharding strategies for different data types

## Security Considerations

### URL Validation and Safety
- Validate submitted URLs for proper format
- Check URLs against malware/phishing databases
- Implement rate limiting for URL creation
- Scan destination content for malicious material

### Abuse Prevention
- Implement CAPTCHA for anonymous URL creation
- Rate limit URL creation by IP address and user
- Monitor for suspicious patterns (many URLs to same destination)
- Allow users to report malicious URLs

### Privacy Considerations
- Anonymize IP addresses in analytics
- Provide clear privacy policy about data collection
- Allow users to disable detailed analytics
- Implement data retention policies

## Analytics Features

### Basic Analytics
- Click count (total, daily, monthly)
- Unique visitors
- Referrer tracking
- Geographic distribution
- Device and browser statistics

### Advanced Analytics
- Click patterns over time (time series)
- Conversion tracking with UTM parameters
- A/B testing different URLs
- User journey analysis
- Integration with external analytics platforms

## URL Expiration and Cleanup

- Allow users to set expiration dates for URLs
- Implement automatic expiration based on inactivity
- Support expiration after X number of clicks
- Run periodic cleanup jobs to remove expired URLs
- Archive expired URLs instead of deleting them

## Fault Tolerance and Reliability

- **Multi-Region Deployment**: Deploy across multiple geographic regions
- **Database Redundancy**: Implement database clustering and failover
- **Graceful Degradation**: Return cached results during database outages
- **Circuit Breakers**: Implement circuit breakers between services
- **Backup and Recovery**: Regular backups with tested recovery procedures

## API Design

### URL Shortening API
```
POST /api/v1/shorten
{
  "url": "https://example.com/very/long/url/that/needs/shortening",
  "customAlias": "mylink",  // optional
  "expiresAt": "2023-12-31" // optional
}

Response:
{
  "shortUrl": "https://short.url/abc123",
  "originalUrl": "https://example.com/very/long/url/that/needs/shortening",
  "createdAt": "2023-01-15T14:30:45Z",
  "expiresAt": "2023-12-31T23:59:59Z"
}
```

### Analytics API
```
GET /api/v1/analytics/abc123

Response:
{
  "shortCode": "abc123",
  "totalClicks": 1542,
  "uniqueClicks": 876,
  "topCountries": [
    {"country": "US", "clicks": 423},
    {"country": "IN", "clicks": 215},
    {"country": "UK", "clicks": 187}
  ],
  "clicksOverTime": [
    {"date": "2023-01-15", "clicks": 102},
    {"date": "2023-01-16", "clicks": 145},
    {"date": "2023-01-17", "clicks": 97}
  ],
  "topReferrers": [
    {"referrer": "facebook.com", "clicks": 423},
    {"referrer": "twitter.com", "clicks": 215},
    {"referrer": "linkedin.com", "clicks": 187}
  ]
}
```

## Monitoring and Alerting

- **Performance Metrics**: Monitor redirect latency, cache hit rates
- **System Health**: Track server load, database performance
- **Business Metrics**: Monitor URL creation rate, click volumes
- **Error Rates**: Track failed redirects, invalid URLs
