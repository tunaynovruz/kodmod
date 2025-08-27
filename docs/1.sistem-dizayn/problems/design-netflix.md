# Design Netflix (Video Streaming Service)
draft: true

## Problem Statement

Design a video streaming service like Netflix that:
- Streams video content to millions of concurrent users worldwide
- Provides personalized content recommendations
- Supports multiple device types and network conditions
- Manages a large catalog of movies and TV shows
- Ensures high-quality streaming experience with minimal buffering
- Scales to handle global traffic with regional content variations

## Requirements

### Functional Requirements
- Users can browse and search the content catalog
- Users can stream videos on demand
- System provides personalized recommendations
- Users can create and manage profiles within an account
- System tracks viewing history and allows resuming from where left off
- Users can rate content and add to their watchlist
- Support for multiple video quality levels based on device and network
- Content availability based on geographic regions (licensing restrictions)

### Non-Functional Requirements
- High availability (99.99%+)
- Low latency for video playback start (< 2 seconds)
- Smooth streaming with minimal buffering
- Scalable to millions of concurrent streams
- Global content delivery with regional caching
- Secure content protection (DRM)
- Efficient storage and delivery of petabytes of video data

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
| Web/Mobile  +---->  API Gateway+---->Application+---->  Content    |
| Clients     |    |             |    |  Servers  |    |  Service    |
+-------------+    +-------------+    +-----+-----+    +------+------+
                                            |                 |
                                            v                 v
+----------------+    +------------------+--+    +----------+---------+
|                |    |                     |    |                    |
| User Profile   |    |  Recommendation     |    |  Streaming         |
| Service        |    |  Service            |    |  Service           |
+----------------+    +---------------------+    +--------------------+
        |                      |                          |
        v                      v                          v
+----------------+    +--------+-------+    +----------------+    +----------------+
|                |    |                |    |                |    |                |
| User DB        |    | Content Catalog|    | Viewing History|    | Encoding       |
| (SQL/NoSQL)    |    | (SQL/NoSQL)    |    | (NoSQL)        |    | Pipeline       |
|                |    |                |    |                |    |                |
+----------------+    +----------------+    +----------------+    +----------------+
```

## Component Design

### Content Ingestion and Encoding Flow
1. Content is acquired from studios and content providers
2. Raw content is processed through the Encoding Pipeline:
   - Content is transcoded into multiple formats and resolutions
   - Multiple bitrate variants are created for adaptive streaming
   - DRM protection is applied
   - Thumbnails and preview clips are generated
3. Encoded content is stored in distributed storage systems
4. Content metadata is added to the Content Catalog
5. CDN is populated with the encoded content

### Video Streaming Flow
1. User browses content through web/mobile client
2. Application servers provide personalized content listings
3. User selects a video to watch
4. Streaming Service:
   - Authenticates and authorizes the request
   - Checks content availability for user's region
   - Determines optimal CDN edge location
   - Provides signed URLs for content access
5. Client begins playback using adaptive bitrate streaming:
   - Initial segments are loaded at lower quality for fast start
   - Quality is adjusted based on network conditions
   - Client buffers ahead to prevent interruptions
6. Viewing history is updated in real-time
7. Recommendation models are updated based on viewing behavior

### Recommendation System Flow
1. User interaction data is collected:
   - Viewing history (what was watched, for how long)
   - Explicit ratings and likes
   - Search queries and browsing patterns
2. Recommendation Service processes this data using:
   - Collaborative filtering (users with similar tastes)
   - Content-based filtering (similar to previously watched)
   - Trending and popularity metrics
   - Personalization algorithms
3. Recommendations are pre-computed periodically and cached
4. Real-time adjustments are made based on recent activity
5. Personalized content rows are generated for the user interface

## Database Design

### User Database (SQL/NoSQL)
- Stores user account information and profiles
- Schema:
  ```
  Accounts {
    accountId: string (primary key)
    email: string
    passwordHash: string
    plan: string (basic, standard, premium)
    billingInfo: object
    country: string
    createdAt: datetime
    status: string (active, suspended, cancelled)
  }
  
  Profiles {
    profileId: string (primary key)
    accountId: string (foreign key to Accounts)
    name: string
    avatarUrl: string
    language: string
    contentRestrictions: string (kids, teen, adult)
    createdAt: datetime
  }
  
  Devices {
    deviceId: string (primary key)
    accountId: string (foreign key to Accounts)
    type: string (mobile, tv, web, tablet)
    model: string
    lastActive: datetime
  }
  ```

### Content Catalog (SQL/NoSQL)
- Stores metadata about all available content
- Schema:
  ```
  Titles {
    titleId: string (primary key)
    type: string (movie, series)
    name: string
    description: text
    releaseYear: int
    ageRating: string
    duration: int (for movies)
    genres: array<string>
    cast: array<string>
    directors: array<string>
    thumbnailUrls: object
    trailerUrls: array<string>
    addedAt: datetime
    popularity: float
    averageRating: float
  }
  
  Episodes {
    episodeId: string (primary key)
    titleId: string (foreign key to Titles)
    seasonNumber: int
    episodeNumber: int
    name: string
    description: text
    duration: int
    thumbnailUrl: string
    releaseDate: datetime
  }
  
  VideoAssets {
    assetId: string (primary key)
    titleId: string (foreign key to Titles)
    episodeId: string (optional, foreign key to Episodes)
    quality: string (SD, HD, UHD)
    format: string (H.264, H.265, VP9)
    language: string
    subtitles: array<string>
    drmType: string
    storageUrl: string
    fileSize: long
    bitrate: int
  }
  
  RegionalAvailability {
    titleId: string (composite key with region)
    region: string (composite key with titleId)
    availableFrom: datetime
    availableTo: datetime
    licensingRestrictions: object
  }
  ```

### Viewing History (NoSQL)
- Tracks user viewing activity for recommendations and resume functionality
- Schema:
  ```
  ViewingHistory {
    profileId: string (partition key)
    titleId: string (clustering key)
    episodeId: string (optional)
    timestamp: datetime
    watchedDuration: int
    completed: boolean
    deviceId: string
    ipAddress: string
    quality: string
  }
  
  Watchlist {
    profileId: string (partition key)
    titleId: string (clustering key)
    addedAt: datetime
    position: int (for custom ordering)
  }
  
  Ratings {
    profileId: string (partition key)
    titleId: string (clustering key)
    rating: int (1-5 or thumbs up/down)
    timestamp: datetime
  }
  ```

## Scalability Considerations

### Content Delivery Scalability
- **Global CDN**: Distribute content to edge locations worldwide
- **Regional Caching**: Cache popular content based on regional preferences
- **Adaptive Bitrate Streaming**: Adjust quality based on network conditions
- **Multi-CDN Strategy**: Use multiple CDN providers for redundancy and optimal routing

### Recommendation System Scalability
- **Offline Processing**: Pre-compute recommendations using batch processing
- **Model Partitioning**: Partition recommendation models by user segments
- **Caching**: Cache recommendation results for active users
- **Incremental Updates**: Update models incrementally rather than full recomputation

## Bottlenecks and Solutions

### Peak Viewing Hours
- **Problem**: Evening hours and content releases create traffic spikes
- **Solution**:
  - Implement predictive scaling based on historical patterns
  - Use load shedding techniques during extreme traffic spikes
  - Implement graceful degradation (e.g., temporarily reduce max resolution)
  - Pre-position popular content at edge locations before peak hours

### Cold Start Problem for Recommendations
- **Problem**: New users or content have limited data for recommendations
- **Solution**:
  - Use content-based recommendations for new users
  - Leverage demographic and regional popularity for initial recommendations
  - Implement fast feedback loops to quickly learn user preferences
  - Use A/B testing to optimize recommendation strategies

### Content Storage and Delivery Costs
- **Problem**: High storage and bandwidth costs for video content
- **Solution**:
  - Implement efficient encoding techniques (per-title encoding)
  - Use content popularity analytics to optimize storage tiers
  - Implement smart caching strategies based on viewing patterns
  - Use compression and delivery optimizations to reduce bandwidth

## Caching Strategy

- **CDN Caching**: Cache video segments at edge locations
- **API Response Caching**: Cache catalog browsing responses
- **User Profile Caching**: Cache user profiles and preferences
- **Recommendation Caching**: Cache personalized recommendations
- **Metadata Caching**: Cache content metadata for fast browsing

## Data Replication and Consistency

- **Content Replication**: Replicate content across multiple regions based on popularity
- **Metadata Replication**: Use multi-region replication for content catalog
- **Consistency Model**:
  - Strong consistency for account operations and billing
  - Eventual consistency for viewing history and recommendations
  - Use conflict-free replicated data types (CRDTs) for counters and metrics

## Sharding Strategy

- **User Data Sharding**: Shard by accountId or profileId
- **Content Catalog Sharding**: Shard by content type, genre, or region
- **Viewing History Sharding**: Shard by profileId to keep a user's history together
- **Regional Sharding**: Shard certain data by geographic region for compliance

## Content Encoding and Optimization

- **Adaptive Bitrate Streaming**: Use HLS or DASH protocols
- **Per-title Encoding**: Optimize encoding parameters for each title
- **Content-aware Encoding**: Adjust bitrate based on content complexity
- **Video Compression**: Use advanced codecs (H.265/HEVC, AV1) for efficiency
- **Audio Optimization**: Multiple audio tracks with different quality levels

## DRM and Content Protection

- **Multi-DRM Strategy**: Support multiple DRM systems (Widevine, PlayReady, FairPlay)
- **License Delivery**: Secure license delivery infrastructure
- **Watermarking**: Digital watermarking to trace content leaks
- **Secure Playback**: Enforce secure playback paths on supported devices
- **Geo-restriction**: Enforce regional content restrictions

## Fault Tolerance and Reliability

- **Multi-Region Deployment**: Deploy across multiple geographic regions
- **Graceful Degradation**: Reduce video quality during partial outages
- **Circuit Breakers**: Implement circuit breakers between services
- **Redundant Storage**: Store multiple copies of content across different storage systems
- **Automated Failover**: Implement automated failover for all critical services

## Analytics and Monitoring

- **Streaming Quality Metrics**: Monitor buffering ratio, startup time, bitrate
- **User Engagement**: Track viewing patterns, completion rates, abandonment
- **Content Performance**: Analyze content popularity by region, device, time
- **System Health**: Monitor CDN performance, origin load, API response times
- **Business Metrics**: Track subscriber growth, retention, content ROI

## Personalization Features

- **Continue Watching**: Allow users to resume content where they left off
- **Personalized Rows**: Customize content rows based on user preferences
- **Time-based Recommendations**: Recommend different content based on time of day
- **Multi-profile Support**: Support different recommendations for different profiles
- **Taste Communities**: Group users with similar tastes for better recommendations