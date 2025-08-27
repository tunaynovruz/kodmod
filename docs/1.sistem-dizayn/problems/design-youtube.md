# Design YouTube (Video Streaming Platform)
draft: true

## Problem Statement

Design a video streaming platform like YouTube that:
- Allows users to upload, view, and share videos
- Supports high-quality video streaming to millions of concurrent users
- Provides video recommendations based on user preferences
- Enables social features like comments, likes, and subscriptions
- Scales to handle billions of videos and users worldwide

## Requirements

### Functional Requirements
- Users can upload videos of various formats and qualities
- System processes and transcodes videos into multiple formats and resolutions
- Users can stream videos with adaptive bitrate based on their network conditions
- Users can search for videos using keywords
- Users can like, comment on, and share videos
- Users can subscribe to channels and receive notifications
- System provides personalized video recommendations
- Content creators can view analytics about their videos

### Non-Functional Requirements
- High availability (99.9%+)
- Low latency for video streaming (buffering < 500ms)
- Durability for stored videos (99.999999%)
- Scalable to handle millions of concurrent streams
- Efficient storage utilization for petabytes of video data
- Global content delivery with minimal latency

## System Architecture

```
                                  +----------------+
                                  |                |
                                  |  Global CDN    |
                                  |                |
                                  +--------+-------+
                                           |
                                           v
+-------------+    +-------------+    +----+------+    +-------------+
|             |    |             |    |           |    |             |
| Web/Mobile  +---->  API Gateway+---->Application+---->  Video      |
| Clients     |    |             |    |  Servers  |    |  Service    |
+-------------+    +-------------+    +-----+-----+    +------+------+
                                            |                 |
                                            v                 v
+----------------+    +------------------+--+    +----------+---------+
|                |    |                     |    |                    |
| Search Service |    |  Transcoding        |    |  Recommendation    |
|                |    |  Service            |    |  Service           |
+----------------+    +---------------------+    +--------------------+
        |                      |                          |
        v                      v                          v
+----------------+    +--------+-------+    +----------------+    +----------------+
|                |    |                |    |                |    |                |
| Search Index   |    | Video Storage  |    | Metadata DB    |    | Analytics DB   |
| (Elasticsearch)|    | (Object Store) |    | (SQL/NoSQL)    |    | (Data Warehouse)|
|                |    |                |    |                |    |                |
+----------------+    +----------------+    +----------------+    +----------------+
```

## Component Design

### Video Upload Flow
1. User uploads video through web/mobile client
2. API Gateway authenticates and authorizes the request
3. Application server validates the video and generates a unique ID
4. Video is temporarily stored in an upload buffer
5. Metadata is stored in the Metadata DB
6. Transcoding Service is notified to begin processing
7. Transcoding Service:
   - Validates video for policy compliance
   - Transcodes video into multiple formats and resolutions (1080p, 720p, 480p, etc.)
   - Generates thumbnails
   - Extracts metadata (duration, codec info, etc.)
   - Stores processed videos in Video Storage
   - Updates metadata in Metadata DB
8. Search Service indexes the video metadata for search
9. Notification is sent to subscribers (if applicable)

### Video Streaming Flow
1. User requests a video through web/mobile client
2. Request is routed to the nearest CDN edge location
3. If video is cached at the edge, it's served directly
4. If not cached, CDN retrieves video from origin storage
5. Adaptive Bitrate Streaming (ABR) adjusts video quality based on user's network conditions
6. Analytics data is collected about the viewing session
7. View count is updated (eventually consistent)

### Recommendation System Flow
1. User interactions (views, likes, watch time) are logged
2. Analytics Service processes interaction data
3. Recommendation Service uses machine learning models to:
   - Analyze user's viewing history
   - Identify similar videos
   - Consider trending and popular content
   - Generate personalized recommendations
4. Recommendations are cached and served to users

## Database Design

### Metadata Database (SQL or NoSQL)
- Stores video metadata, user information, and relationships
- Schema:
  ```
  Users {
    userId: string (primary key)
    username: string
    email: string
    createdAt: datetime
    subscriberCount: int
    ...other user attributes
  }
  
  Videos {
    videoId: string (primary key)
    title: string
    description: text
    userId: string (foreign key to Users)
    categoryId: string
    tags: array<string>
    status: string (processing, active, blocked)
    privacyStatus: string (public, private, unlisted)
    uploadedAt: datetime
    duration: int (seconds)
    viewCount: long
    likeCount: int
    dislikeCount: int
    thumbnailUrls: array<string>
    availableFormats: array<string>
  }
  
  VideoAssets {
    assetId: string (primary key)
    videoId: string (foreign key to Videos)
    resolution: string (1080p, 720p, etc.)
    fileSize: long
    bitrate: int
    format: string
    url: string
  }
  
  Comments {
    commentId: string (primary key)
    videoId: string (foreign key to Videos)
    userId: string (foreign key to Users)
    content: text
    createdAt: datetime
    likeCount: int
    replyTo: string (foreign key to Comments, for nested comments)
  }
  
  Subscriptions {
    userId: string (composite key with channelId)
    channelId: string (composite key with userId)
    subscribedAt: datetime
    notificationsEnabled: boolean
  }
  
  UserHistory {
    userId: string (composite key with videoId)
    videoId: string (composite key with userId)
    watchedAt: datetime
    watchDuration: int (seconds)
    completed: boolean
  }
  ```

### Analytics Database (Data Warehouse)
- Stores aggregated analytics data for reporting and ML
- Uses a star schema for efficient OLAP queries
- Includes fact tables for views, engagement, and demographics
- Used for recommendation algorithms and creator analytics

## Scalability Considerations

### Video Storage Scalability
- **Content Deduplication**: Avoid storing duplicate video content
- **Tiered Storage**: Move less popular videos to cheaper, slower storage
- **Regional Storage**: Store videos closer to where they're frequently accessed
- **Compression Optimization**: Use advanced codecs (H.265/HEVC, AV1) to reduce storage needs

### Streaming Scalability
- **Global CDN**: Distribute content to edge locations worldwide
- **Adaptive Bitrate Streaming**: Adjust quality based on network conditions
- **Video Chunking**: Split videos into small segments for efficient delivery
- **Predictive Prefetching**: Preload content based on predicted user behavior

## Bottlenecks and Solutions

### Viral Video Problem
- **Problem**: Sudden popularity of videos can overwhelm systems
- **Solution**:
  - Implement predictive scaling based on early engagement metrics
  - Prioritize caching of trending content across CDN
  - Use load shedding techniques during extreme traffic spikes
  - Implement graceful degradation (e.g., temporarily reduce max resolution)

### Transcoding Bottleneck
- **Problem**: Video transcoding is CPU-intensive and can create backlogs
- **Solution**:
  - Implement priority queues for transcoding jobs
  - Use elastic compute resources that scale with demand
  - Parallelize transcoding of different formats
  - Consider hardware acceleration (GPU/FPGA)

### Search Query Load
- **Problem**: High-volume search queries can overload search service
- **Solution**:
  - Implement aggressive caching for popular search queries
  - Shard search index by video categories or regions
  - Use read replicas for search index
  - Implement autocomplete to reduce full searches

## Caching Strategy

- **CDN Caching**: Cache videos at edge locations based on regional popularity
- **Metadata Cache**: Cache video metadata and user data in memory (Redis)
- **Search Cache**: Cache popular search results
- **Recommendation Cache**: Cache personalized recommendations for users
- **Thumbnail Cache**: Cache video thumbnails in CDN

## Data Replication and Consistency

- **Video Replication**: Replicate videos across multiple regions based on access patterns
- **Metadata Replication**: Use multi-region replication for metadata database
- **Consistency Model**:
  - Strong consistency for critical operations (uploads, deletions)
  - Eventual consistency for non-critical counters (view counts, likes)
  - Use conflict-free replicated data types (CRDTs) for counters

## Sharding Strategy

- **Video Metadata Sharding**: Shard by videoId using consistent hashing
- **User Data Sharding**: Shard by userId
- **Comments Sharding**: Shard by videoId to keep all comments for a video together
- **Analytics Sharding**: Shard by time periods and/or regions

## Content Delivery Optimization

- **Predictive Content Placement**: Analyze viewing patterns to preposition content
- **Multi-CDN Strategy**: Use multiple CDN providers for redundancy and optimal routing
- **Peer-Assisted Delivery**: Optionally use P2P for popular content in supported browsers
- **Edge Compute**: Process thumbnail generation and video analytics at edge locations

## Fault Tolerance and Reliability

- **Multi-Region Deployment**: Deploy across multiple geographic regions
- **Graceful Degradation**: Reduce video quality during partial outages
- **Circuit Breakers**: Implement circuit breakers between services
- **Redundant Storage**: Store multiple copies of videos across different storage systems
- **Automated Failover**: Implement automated failover for all critical services

## Analytics and Monitoring

- **Real-time Analytics**: Track key metrics like concurrent viewers, buffer ratio
- **Content Performance**: Analyze video performance by region, device, time
- **Recommendation Quality**: Monitor engagement with recommended content
- **System Health**: Monitor transcoding queue depth, storage utilization, CDN performance

## Monetization Considerations

- **Ad Insertion**: Support for pre-roll, mid-roll, and post-roll ads
- **Ad Targeting**: Infrastructure for targeted advertising based on user preferences
- **Subscription Management**: Support for premium subscriptions with enhanced features
- **Content ID System**: Automated copyright detection and monetization options