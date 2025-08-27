# Design Twitter (Microblogging Platform)
draft: true

## Problem Statement

Design a microblogging platform like Twitter that:
- Allows users to post short messages (tweets)
- Enables users to follow other users
- Generates personalized timelines of tweets
- Supports features like retweets, likes, and replies
- Provides search functionality across tweets
- Scales to handle hundreds of millions of users and billions of tweets

## Requirements

### Functional Requirements
- Users can create, read, update, and delete tweets (max 280 characters)
- Users can follow/unfollow other users
- Users can view their home timeline (tweets from followed users)
- Users can like, retweet, and reply to tweets
- Users can search for tweets by keywords, hashtags, or mentions
- Users can receive notifications for interactions with their content
- System supports trending topics based on tweet volume and engagement
- Users can tag other users with @mentions and use #hashtags

### Non-Functional Requirements
- High availability (99.99%+)
- Low latency for timeline generation (< 500ms)
- Eventual consistency is acceptable for non-critical operations
- Scalable to hundreds of millions of users
- Reliable tweet delivery (no lost tweets)
- Support for real-time updates in timelines

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
| Web/Mobile  +---->  API Gateway+---->Application+---->  Tweet      |
| Clients     |    |             |    |  Servers  |    |  Service    |
+-------------+    +-------------+    +-----+-----+    +------+------+
       |                                    |                 |
       |                                    v                 v
       |                        +------------------+    +-----+--------+
       |                        |                  |    |              |
       +------------------------>  Timeline        |    |  User        |
       |  WebSocket/Push        |  Service         |    |  Service     |
       |                        |                  |    |              |
       |                        +--------+---------+    +------+-------+
       |                                 |                     |
       v                                 v                     v
+----------------+    +------------------+--+    +----------------+    +----------------+
|                |    |                     |    |                |    |                |
| Notification   |    | Tweet Storage       |    | User Graph     |    | Search Index   |
| Service        |    | (NoSQL)             |    | (Graph DB)     |    | (Elasticsearch)|
|                |    |                     |    |                |    |                |
+----------------+    +---------------------+    +----------------+    +----------------+
```

## Component Design

### Tweet Creation Flow
1. User creates a tweet through web/mobile client
2. API Gateway authenticates and validates the request
3. Application server processes the request
4. Tweet Service:
   - Validates tweet content (length, format)
   - Extracts mentions, hashtags, and URLs
   - Stores the tweet in Tweet Storage
   - Triggers fanout process for timeline updates
   - Sends the tweet to Search Service for indexing
5. Notification Service alerts mentioned users

### Timeline Generation Flow
1. User requests their home timeline
2. Timeline Service retrieves:
   - List of users the requester follows from User Graph
   - Recent tweets from those users from Tweet Storage
3. Timeline Service:
   - Merges and sorts tweets by time
   - Applies relevance ranking (optional)
   - Returns personalized timeline to user

### Timeline Update Approaches

#### Push Model (Fanout-on-Write)
- When a user tweets, the tweet is immediately pushed to all followers' timelines
- Pros: Fast read operations, real-time delivery
- Cons: Expensive for users with millions of followers (celebrities)

#### Pull Model (Fanout-on-Read)
- When a user requests their timeline, the system pulls recent tweets from all followed users
- Pros: Efficient for users with many followers
- Cons: Slower timeline generation, higher read latency

#### Hybrid Approach (Used by Twitter)
- Use push model for users with few followers
- Use pull model for high-profile users with millions of followers
- Maintain a social graph rank to determine most relevant connections

## Database Design

### Tweet Storage (NoSQL - Cassandra)
- Optimized for high write throughput and time-series data
- Schema:
  ```
  Tweets {
    tweetId: UUID (primary key)
    userId: UUID (foreign key to Users)
    content: string (max 280 chars)
    createdAt: timestamp
    media: array<string> (URLs to media)
    hashtags: array<string>
    mentions: array<UUID> (user IDs)
    replyTo: UUID (optional, for replies)
    retweetOf: UUID (optional, for retweets)
    likeCount: counter
    retweetCount: counter
    replyCount: counter
  }
  
  UserTimeline {
    userId: UUID (partition key)
    tweetId: UUID (clustering key)
    timestamp: timestamp (clustering key)
    tweetType: string (original, retweet, reply)
  }
  
  HomeTimeline {
    userId: UUID (partition key)
    tweetId: UUID (clustering key)
    timestamp: timestamp (clustering key)
    authorId: UUID
  }
  
  Likes {
    tweetId: UUID (partition key)
    userId: UUID (clustering key)
    timestamp: timestamp
  }
  
  Hashtags {
    hashtag: string (partition key)
    tweetId: UUID (clustering key)
    timestamp: timestamp (clustering key)
  }
  ```

### User Graph Database (Neo4j or custom graph database)
- Optimized for graph traversal operations
- Schema:
  ```
  Users {
    userId: UUID (primary key)
    username: string
    displayName: string
    email: string
    passwordHash: string
    bio: string
    profileImageUrl: string
    createdAt: timestamp
    isVerified: boolean
    followerCount: counter
    followingCount: counter
  }
  
  Follows {
    followerId: UUID (user who follows)
    followeeId: UUID (user being followed)
    createdAt: timestamp
  }
  ```

## Scalability Considerations

### Tweet Storage Scalability
- **Partitioning**: Partition tweets by user ID or time ranges
- **Time-based Partitioning**: Recent tweets in faster storage, older in archival storage
- **Read Replicas**: Use read replicas for popular tweets and timelines

### Timeline Service Scalability
- **Caching**: Cache popular user timelines
- **Pagination**: Implement cursor-based pagination for timelines
- **Lazy Loading**: Load media and engagement metrics on demand
- **Precomputation**: Precompute timelines for active users

## Bottlenecks and Solutions

### Celebrity Problem (Millions of Followers)
- **Problem**: Users with millions of followers create fanout storms
- **Solution**:
  - Implement the hybrid approach mentioned above
  - Use separate queues for high-profile users
  - Employ rate limiting for timeline updates
  - Cache celebrity tweets separately

### Search Query Load
- **Problem**: High-volume search queries across billions of tweets
- **Solution**:
  - Implement aggressive caching for popular search queries
  - Shard search index by time periods
  - Use read replicas for search index
  - Implement autocomplete to reduce full searches

### Real-time Timeline Updates
- **Problem**: Delivering real-time updates to millions of concurrent users
- **Solution**:
  - Use WebSockets for active users
  - Implement long polling as fallback
  - Batch updates for efficiency
  - Use message queues to handle traffic spikes

## Caching Strategy

- **Timeline Cache**: Cache recent home timelines for active users
- **Tweet Cache**: Cache frequently accessed tweets
- **User Cache**: Cache user profiles and follow relationships
- **Trend Cache**: Cache trending topics and hashtags
- **Search Cache**: Cache popular search results

## Data Replication and Consistency

- **Tweet Replication**: Replicate tweets across multiple data centers
- **Timeline Replication**: Asynchronously replicate timeline data
- **Consistency Model**:
  - Strong consistency for tweet creation and deletion
  - Eventual consistency for timelines and engagement metrics
  - Use conflict-free replicated data types (CRDTs) for counters

## Sharding Strategy

- **Tweet Sharding**: Shard by user ID (creator) to keep a user's tweets together
- **Timeline Sharding**: Shard by user ID (viewer) to keep a user's timeline together
- **User Graph Sharding**: Shard by user ID to keep a user's connections together
- **Search Index Sharding**: Shard by time periods and/or keywords

## Real-time Features

### Trending Topics
1. Count hashtag and phrase occurrences in recent tweets
2. Apply time decay function to favor recent activity
3. Filter out spam and inappropriate content
4. Group similar topics together
5. Update trending lists periodically (e.g., every 5 minutes)

### Real-time Notifications
1. Use pub/sub model for notification delivery
2. Maintain WebSocket connections for active users
3. Fall back to push notifications for mobile users
4. Batch notifications to reduce overhead
5. Prioritize notifications based on user engagement patterns

## Fault Tolerance and Reliability

- **Multi-Region Deployment**: Deploy across multiple geographic regions
- **Data Redundancy**: Store multiple copies of tweets and user data
- **Graceful Degradation**: Disable non-critical features during partial outages
- **Circuit Breakers**: Implement circuit breakers between services
- **Rate Limiting**: Protect services from traffic spikes with rate limiting

## Analytics and Monitoring

- **Tweet Analytics**: Track engagement metrics for tweets
- **User Analytics**: Monitor user growth and activity patterns
- **System Health**: Monitor service health, database performance, queue depths
- **Business Metrics**: Track key business metrics like daily active users
- **Alerting**: Implement tiered alerting for different severity levels

## Search Implementation

- **Inverted Index**: Build inverted index for efficient text search
- **Real-time Indexing**: Index new tweets within seconds
- **Relevance Ranking**: Rank search results by relevance and recency
- **Typeahead Search**: Implement prefix search for autocomplete
- **Entity Recognition**: Identify entities (people, places, organizations) in tweets

## Content Delivery Optimization

- **CDN Integration**: Serve media content through CDN
- **Image Resizing**: Resize images based on client device
- **Lazy Loading**: Load media only when needed
- **Progressive Loading**: Show low-resolution images first, then high-resolution