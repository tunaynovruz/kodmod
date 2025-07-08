# Design Facebook News Feed

## Problem Statement

Design a news feed system like Facebook that:
- Generates a personalized feed of relevant updates from friends and followed entities
- Supports posting of text, images, videos, and links
- Allows interactions (likes, comments, shares)
- Delivers content in real-time with minimal latency
- Scales to billions of users with millions of concurrent users

## Requirements

### Functional Requirements
- Users can publish posts (text, images, videos, links)
- Users can view a personalized news feed
- Users can like, comment on, and share posts
- Users receive notifications for interactions on their content
- Feed should be personalized based on user relationships and engagement history

### Non-Functional Requirements
- High availability (99.9%+)
- Low latency (feed generation < 2 seconds)
- Consistency can be eventual (it's acceptable if a new post takes a few seconds to appear)
- System should scale to billions of users with millions of active at the same time

## System Architecture

```
                                  +----------------+
                                  |                |
                                  |  CDN           |
                                  |                |
                                  +--------+-------+
                                           |
                                           v
+-------------+    +-------------+    +----+------+    +-------------+
|             |    |             |    |           |    |             |
| Web Servers +---->  API Gateway+---->Application+---->  Feed       |
|             |    |             |    |  Servers  |    |  Service    |
+-------------+    +-------------+    +-----+-----+    +------+------+
                                            |                 |
                                            v                 v
                        +------------------+--+    +----------+---------+
                        |                     |    |                    |
                        |  Post Service       |    |  Notification      |
                        |                     |    |  Service           |
                        +---------------------+    +--------------------+
                                |
                                v
+----------------+    +--------+-------+    +----------------+
|                |    |                |    |                |
| User Graph DB  |    | Post DB        |    | Media Storage  |
| (Neo4j/Custom) |    | (Cassandra)    |    | (S3/HDFS)      |
|                |    |                |    |                |
+----------------+    +----------------+    +----------------+
```

## Component Design

### Feed Publishing Flow
1. User creates a post through web/mobile client
2. Request goes through API Gateway for authentication and rate limiting
3. Application servers validate the request
4. Post Service stores the post content in Post DB
5. If media is included, it's stored in Media Storage
6. Post Service triggers a fanout process to deliver the post to followers' feeds

### Feed Retrieval Flow
1. User requests their news feed
2. Request is authenticated by API Gateway
3. Feed Service queries for the user's connections from User Graph DB
4. Feed Service retrieves recent posts from these connections
5. Posts are ranked based on relevance algorithms
6. Personalized feed is returned to the user

## Database Design

### User Graph Database (Neo4j or Custom Graph DB)
- Stores user connections (friends, follows)
- Optimized for graph traversal operations
- Schema:
  ```
  User {
    userId: string (primary key)
    name: string
    profile: string
    ...other user attributes
  }
  
  Relationship {
    from: userId
    to: userId
    type: string (friend, follow)
    weight: float (for ranking)
    timestamp: datetime
  }
  ```

### Post Database (Cassandra)
- Stores post content and metadata
- Optimized for write-heavy workloads
- Schema:
  ```
  Posts {
    postId: UUID (primary key)
    userId: string
    content: text
    mediaUrls: list<string>
    timestamp: datetime
    type: string (text, image, video, link)
    ...other post attributes
  }
  
  UserFeed {
    userId: string (partition key)
    timestamp: datetime (clustering key)
    postId: UUID
    sourceUserId: string
    weight: float (for ranking)
  }
  
  Interactions {
    postId: UUID (partition key)
    userId: string (clustering key)
    type: string (like, comment, share)
    content: text (for comments)
    timestamp: datetime
  }
  ```

## Scalability Considerations

### Feed Generation Approaches

1. **Push Model (Fanout-on-Write)**
   - When a user posts content, it's immediately pushed to all followers' feeds
   - Pros: Fast read operations, real-time delivery
   - Cons: Expensive for users with millions of followers (celebrities)

2. **Pull Model (Fanout-on-Read)**
   - When a user requests their feed, the system pulls recent posts from all connections
   - Pros: Efficient for users with many followers
   - Cons: Slower feed generation, higher read latency

3. **Hybrid Approach (Used by Facebook)**
   - Use push model for users with few followers
   - Use pull model for high-profile users with millions of followers
   - Maintain a social graph rank to determine most relevant connections

### Sharding Strategy

- **User-based Sharding**: Partition data by userId
  - Feed data sharded by user_id (recipient)
  - Post data sharded by user_id (creator)
  - Ensures user's data stays on the same shard

## Bottlenecks and Solutions

### Hot Users Problem
- **Problem**: Celebrity users with millions of followers create fanout storms
- **Solution**: 
  - Implement the hybrid approach mentioned above
  - Use separate queues for high-profile users
  - Employ rate limiting for feed updates

### Feed Personalization at Scale
- **Problem**: Computing relevance scores for millions of potential feed items is expensive
- **Solution**:
  - Pre-compute partial scores offline
  - Use machine learning models to predict engagement
  - Implement multi-stage ranking (filter → initial rank → final rank)

## Caching Strategy

- **Content Cache**: Cache popular posts and media in CDN
- **Social Graph Cache**: Cache user connections in memory (Redis)
- **Feed Cache**: Cache generated feeds for users (TTL-based)
- **Write-through Cache**: Update cache when new interactions occur

## Data Replication and Consistency

- Use multi-region deployment with data replication
- Implement eventual consistency for the feed (acceptable for social media)
- Use read replicas for Post DB to handle high read volumes
- Implement conflict resolution strategies for concurrent updates

## Fault Tolerance and Reliability

- Design for failure at every level
- Implement circuit breakers between services
- Use message queues (Kafka) to handle traffic spikes
- Implement retry mechanisms with exponential backoff
- Deploy across multiple availability zones
- Implement monitoring and alerting for system health

## Load Balancing

- Use consistent hashing for distributing load across servers
- Implement application-level load balancing for specialized tasks
- Use sticky sessions for maintaining user context during session

## Real-time Updates

- Implement WebSockets for real-time feed updates
- Use a notification service with pub/sub model (Kafka/Redis)
- Batch updates for efficiency while maintaining perceived real-time experience