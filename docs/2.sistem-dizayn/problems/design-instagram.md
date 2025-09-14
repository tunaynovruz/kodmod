---
draft: true
---

# Design Instagram (Photo Sharing Platform)
draft: true

## Problem Statement

Design a photo sharing platform like Instagram that:
- Allows users to upload, share, and view photos and short videos
- Supports social interactions like follows, likes, and comments
- Generates personalized feeds of content
- Provides discovery features for finding new content
- Supports filters and editing tools for media
- Scales to hundreds of millions of users and billions of photos

## Requirements

### Functional Requirements
- Users can create accounts and set up profiles
- Users can upload photos and short videos
- Users can apply filters and edit their media before posting
- Users can follow other users
- Users can like and comment on posts
- Users can view a personalized feed of content from followed users
- Users can discover new content through explore/trending features
- Users can search for content by hashtags or users
- Users can share posts via direct messages or to other platforms
- Support for stories (ephemeral content that disappears after 24 hours)

### Non-Functional Requirements
- High availability (99.99%+)
- Low latency for media uploads and viewing (< 2 seconds)
- Scalable to handle millions of concurrent users
- Reliable media storage with no data loss
- Efficient delivery of media content worldwide
- Support for various image and video formats
- Security and privacy controls for user content

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
| Web/Mobile  +---->  API Gateway+---->Application+---->  Media      |
| Clients     |    |             |    |  Servers  |    |  Service    |
+-------------+    +-------------+    +-----+-----+    +------+------+
                                            |                 |
                                            v                 v
+----------------+    +------------------+--+    +----------+---------+
|                |    |                     |    |                    |
| User Service   |    |  Feed Service       |    |  Discovery         |
|                |    |                     |    |  Service           |
+----------------+    +---------------------+    +--------------------+
        |                      |                          |
        v                      v                          v
+----------------+    +--------+-------+    +----------------+    +----------------+
|                |    |                |    |                |    |                |
| User Graph DB  |    | Post DB        |    | Media Storage  |    | Search Index   |
| (Neo4j/Custom) |    | (Cassandra)    |    | (Object Store) |    | (Elasticsearch)|
|                |    |                |    |                |    |                |
+----------------+    +----------------+    +----------------+    +----------------+
```

## Component Design

### Media Upload Flow
1. User captures or selects a photo/video through the mobile/web client
2. User applies filters and edits the media
3. Client uploads the media to the API Gateway
4. API Gateway authenticates and routes the request to Application Servers
5. Media Service:
   - Validates the media (format, size, content policy)
   - Generates multiple resolutions of the image/video
   - Assigns a unique identifier
   - Stores media in Media Storage
   - Creates thumbnails and previews
6. Application Server creates a post entry in Post DB with metadata
7. Feed Service updates followers' feeds with the new post
8. Discovery Service indexes the post for search and discovery

### Feed Generation Flow
1. User opens the app and requests their feed
2. Application Server authenticates the user
3. Feed Service:
   - Retrieves the list of users the requester follows
   - Fetches recent posts from those users
   - Applies ranking algorithms to prioritize content
   - Returns personalized feed to the user
4. Client displays the feed and lazy-loads media content from CDN

### Discovery Flow
1. User navigates to the Explore/Discover section
2. Discovery Service:
   - Analyzes user's interests based on past interactions
   - Identifies trending content and hashtags
   - Selects content from users not followed but likely of interest
   - Considers content popularity and recency
3. Returns personalized discovery feed to the user

## Database Design

### User Database (SQL)
- Stores user profiles and authentication information
- Schema:
  ```
  Users {
    userId: UUID (primary key)
    username: string
    email: string
    passwordHash: string
    fullName: string
    bio: string
    profilePictureUrl: string
    websiteUrl: string
    phoneNumber: string
    isPrivate: boolean
    isVerified: boolean
    createdAt: datetime
    lastActive: datetime
    postCount: int
    followerCount: int
    followingCount: int
  }
  ```

### User Graph Database (Neo4j or custom graph database)
- Optimized for social graph operations
- Schema:
  ```
  Follows {
    followerId: UUID (user who follows)
    followeeId: UUID (user being followed)
    createdAt: datetime
  }
  
  Blocks {
    blockerId: UUID
    blockedId: UUID
    createdAt: datetime
  }
  ```

### Post Database (Cassandra/NoSQL)
- Stores post metadata and relationships
- Schema:
  ```
  Posts {
    postId: UUID (primary key)
    userId: UUID (foreign key to Users)
    caption: string
    mediaUrls: array<string>
    mediaType: string (image, video, carousel)
    filter: string
    location: object
    hashtags: array<string>
    mentionedUsers: array<UUID>
    createdAt: datetime
    isArchived: boolean
    likeCount: counter
    commentCount: counter
  }
  
  UserFeeds {
    userId: UUID (partition key)
    postId: UUID (clustering key)
    creatorId: UUID
    createdAt: datetime (clustering key)
    score: float (for ranking)
  }
  
  Likes {
    postId: UUID (partition key)
    userId: UUID (clustering key)
    createdAt: datetime
  }
  
  Comments {
    commentId: UUID (primary key)
    postId: UUID (foreign key to Posts)
    userId: UUID (foreign key to Users)
    content: string
    createdAt: datetime
    likeCount: counter
    isEdited: boolean
    parentCommentId: UUID (for nested comments)
  }
  
  Hashtags {
    hashtag: string (partition key)
    postId: UUID (clustering key)
    createdAt: datetime (clustering key)
  }
  ```

### Stories Database (Cassandra/NoSQL)
- Stores ephemeral content that expires after 24 hours
- Schema:
  ```
  Stories {
    storyId: UUID (primary key)
    userId: UUID (foreign key to Users)
    mediaUrl: string
    mediaType: string (image, video)
    createdAt: datetime
    expiresAt: datetime
    viewCount: counter
    viewers: array<UUID>
    filter: string
    location: object
    hashtags: array<string>
    mentionedUsers: array<UUID>
  }
  ```

## Scalability Considerations

### Media Storage Scalability
- **Content Delivery Network (CDN)**: Distribute media globally for fast access
- **Media Sharding**: Shard media storage by user ID or post date
- **Tiered Storage**: Store frequently accessed media in faster storage
- **Compression**: Use efficient image/video compression to reduce storage needs

### Feed Generation Scalability
- **Pre-computation**: Pre-generate feeds for active users
- **Pagination**: Implement cursor-based pagination for feeds
- **Caching**: Cache feed contents for active users
- **Asynchronous Updates**: Update feeds asynchronously when new content is posted

## Bottlenecks and Solutions

### Media Upload Spikes
- **Problem**: High volume of uploads during special events or peak times
- **Solution**:
  - Implement upload queues to handle traffic spikes
  - Use adaptive rate limiting based on system load
  - Scale media processing services horizontally
  - Prioritize uploads based on user engagement levels

### Feed Generation for Users with Many Followers
- **Problem**: Users following thousands of accounts create complex feed generation
- **Solution**:
  - Implement feed generation limits (e.g., consider only the most recent or relevant posts)
  - Use incremental feed updates rather than regenerating the entire feed
  - Apply caching strategies for users with similar follow graphs
  - Implement ranked feeds to show most relevant content first

### Viral Content Handling
- **Problem**: Viral posts can create hotspots in the system
- **Solution**:
  - Implement special caching for trending content
  - Replicate popular content across multiple CDN nodes
  - Use separate processing queues for high-engagement content
  - Implement graceful degradation during extreme traffic spikes

## Caching Strategy

- **CDN Caching**: Cache media files at edge locations
- **Feed Cache**: Cache personalized feeds for active users
- **User Profile Cache**: Cache frequently accessed user profiles
- **Post Metadata Cache**: Cache post metadata for popular posts
- **Social Graph Cache**: Cache follow relationships for active users

## Data Replication and Consistency

- **Media Replication**: Replicate media across multiple regions
- **Post Metadata Replication**: Use multi-region replication for post data
- **Consistency Model**:
  - Strong consistency for user operations (follows, unfollows)
  - Eventual consistency for counters (likes, comments)
  - Use conflict-free replicated data types (CRDTs) for counters

## Sharding Strategy

- **User-based Sharding**: Shard user data by userId
- **Post-based Sharding**: Shard post data by postId or userId
- **Time-based Sharding**: Shard older posts by time periods
- **Hashtag Sharding**: Shard hashtag data by hashtag popularity

## Media Processing Pipeline

### Image Processing
1. Validate uploaded image (format, size, content)
2. Generate multiple resolutions for different devices
3. Apply compression optimized for quality and size
4. Extract metadata (EXIF data, dimensions)
5. Generate thumbnails for feed and previews
6. Store processed images in distributed storage

### Video Processing
1. Validate uploaded video (format, duration, size)
2. Transcode video into multiple formats and resolutions
3. Generate thumbnail frames
4. Create preview clips
5. Apply compression based on content type
6. Store processed videos in tiered storage

## Feed Ranking Algorithm

- **Recency**: Prioritize recent posts
- **Relationship Strength**: Prioritize content from users with strong interactions
- **Engagement**: Consider likes, comments, and time spent on similar posts
- **Content Type**: Balance different content types (photos, videos, carousels)
- **Explicit Signals**: Consider explicit actions like post notifications
- **Implicit Signals**: Consider time spent viewing similar content

## Discovery and Explore Features

- **Trending Hashtags**: Identify and promote trending topics
- **Interest-based Recommendations**: Suggest content based on user interests
- **Location-based Content**: Show content from nearby locations
- **Similar Content Clustering**: Group visually or thematically similar content
- **New User Recommendations**: Special algorithms for users with limited history

## Fault Tolerance and Reliability

- **Multi-Region Deployment**: Deploy across multiple geographic regions
- **Data Redundancy**: Store multiple copies of media and metadata
- **Graceful Degradation**: Disable non-critical features during partial outages
- **Circuit Breakers**: Implement circuit breakers between services
- **Backup and Recovery**: Regular backups with tested recovery procedures

## Security and Privacy

- **Content Security**: Scan uploads for malicious content
- **Privacy Controls**: Implement private accounts and close friends features
- **Content Ownership**: Watermarking and copyright protection
- **Data Protection**: Encrypt sensitive user data
- **Access Control**: Fine-grained permissions for content access
- **Content Moderation**: Automated and manual review processes for reported content

## Analytics and Monitoring

- **User Engagement**: Track metrics like daily active users, time spent
- **Content Performance**: Monitor post engagement and virality
- **System Health**: Track service performance, error rates, and latency
- **Growth Metrics**: Monitor user acquisition and retention
- **A/B Testing**: Infrastructure for testing new features and algorithms

## Direct Messaging System

- **Private Messaging**: Allow users to send direct messages
- **Group Messaging**: Support for group conversations
- **Media Sharing**: Share posts and external content in messages
- **Ephemeral Messages**: Support for disappearing messages
- **Read Receipts**: Track message delivery and read status
- **Encryption**: End-to-end encryption for message content