---
draft: true
---


# Design WhatsApp (Messaging Service)
draft: true

## Problem Statement

Design a messaging service like WhatsApp that:
- Enables real-time messaging between users
- Supports one-to-one and group conversations
- Provides end-to-end encryption for privacy
- Allows sharing of media (photos, videos, documents)
- Supports voice and video calls
- Works reliably across different network conditions
- Scales to billions of users and messages

## Requirements

### Functional Requirements
- Users can register using their phone number
- Users can send text messages to individuals and groups
- Messages should be delivered in real-time when recipients are online
- Messages should be queued and delivered when recipients come online
- Users can share media files (images, videos, documents, voice messages)
- Users can create and manage group conversations
- Users can make voice and video calls
- Support for message status (sent, delivered, read)
- Users can see when others are typing or online
- Support for message deletion and editing

### Non-Functional Requirements
- High availability (99.99%+)
- Low latency for message delivery (< 500ms in normal conditions)
- End-to-end encryption for all messages
- Reliable message delivery (no message loss)
- Support for offline messaging
- Efficient battery and data usage on mobile devices
- Scalable to billions of users and messages per day
- Support for various network conditions (2G, 3G, 4G, WiFi)

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
| Mobile/Web  +---->  API Gateway+---->Connection+---->  Message    |
| Clients     |    |             |    |  Servers  |    |  Service    |
+-------------+    +-------------+    +-----+-----+    +------+------+
       |                                    |                 |
       |                                    v                 v
       |                        +------------------+    +-----+--------+
       |                        |                  |    |              |
       +------------------------>  Presence        |    |  Media       |
       |  WebSocket/MQTT        |  Service         |    |  Service     |
       |                        |                  |    |              |
       |                        +--------+---------+    +------+-------+
       |                                 |                     |
       v                                 v                     v
+----------------+    +------------------+--+    +----------------+    +----------------+
|                |    |                     |    |                |    |                |
| Push           |    | Message Store       |    | Media Storage  |    | User Service   |
| Notification   |    | (Distributed DB)    |    | (Object Store) |    | (Auth/Profile) |
| Service        |    |                     |    |                |    |                |
+----------------+    +---------------------+    +----------------+    +----------------+
```

## Component Design

### Message Flow
1. Sender composes a message in the client application
2. Client encrypts the message with end-to-end encryption
3. Client sends the encrypted message to Connection Servers via WebSocket/MQTT
4. Connection Servers authenticate and validate the request
5. Message Service:
   - Stores the encrypted message in Message Store
   - Checks if recipient is online
   - If online, routes message to recipient's Connection Server
   - If offline, queues message for later delivery and sends push notification
6. Recipient's Connection Server delivers message to recipient's client
7. Recipient's client decrypts and displays the message
8. Client sends delivery/read receipts back through the same path

### Media Sharing Flow
1. Sender selects media to share
2. Client compresses and encrypts the media
3. Client uploads encrypted media to Media Service
4. Media Service stores media in Media Storage and returns a reference ID
5. Client sends a message containing the media reference ID (following the message flow)
6. Recipient's client receives the message with media reference
7. Client requests the media from Media Service using the reference ID
8. Client downloads, decrypts, and displays the media

### Group Messaging Flow
1. Group creator establishes a group and adds members
2. System creates a unique group ID and metadata
3. For each message to the group:
   - Sender's client encrypts the message individually for each group member
   - Message is processed through the standard message flow for each recipient
   - Group metadata is included with each message

## Database Design

### User Database (SQL)
- Stores user profiles and authentication information
- Schema:
  ```
  Users {
    userId: UUID (primary key)
    phoneNumber: string (unique)
    verificationStatus: boolean
    registrationTime: datetime
    lastSeen: datetime
    profileName: string
    profilePicture: string
    status: string
    deviceInfo: object
    settings: object
  }
  
  Contacts {
    userId: UUID (composite key with contactId)
    contactId: UUID (composite key with userId)
    contactName: string
    blocked: boolean
    muted: boolean
    addedAt: datetime
  }
  ```

### Message Database (NoSQL - Distributed)
- Stores encrypted messages with minimal metadata
- Schema:
  ```
  Messages {
    messageId: UUID (primary key)
    senderId: UUID
    recipientId: UUID (user or group)
    encryptedContent: binary
    mediaId: UUID (optional)
    messageType: string (text, image, video, etc.)
    sentAt: datetime
    deliveredAt: datetime
    readAt: datetime
    status: string (sent, delivered, read, deleted)
    expiresAt: datetime (for disappearing messages)
  }
  
  UserMessages {
    userId: UUID (partition key)
    conversationId: UUID (clustering key)
    messageId: UUID (clustering key)
    direction: string (sent, received)
    timestamp: datetime
  }
  ```

### Group Database (NoSQL)
- Stores group metadata and membership information
- Schema:
  ```
  Groups {
    groupId: UUID (primary key)
    name: string
    createdBy: UUID (foreign key to Users)
    createdAt: datetime
    updatedAt: datetime
    description: string
    profilePicture: string
    messageSettings: object
  }
  
  GroupMembers {
    groupId: UUID (composite key with userId)
    userId: UUID (composite key with groupId)
    role: string (admin, member)
    addedBy: UUID
    addedAt: datetime
    lastReadMessageId: UUID
  }
  ```

### Presence Database (In-memory with persistence)
- Tracks online status of users
- Schema:
  ```
  UserPresence {
    userId: UUID (primary key)
    status: string (online, offline, away)
    lastActive: datetime
    deviceId: string
    connectionId: string
    typingIn: UUID (conversation where user is typing)
    typingSince: datetime
  }
  ```

## Scalability Considerations

### Connection Management Scalability
- **Connection Pooling**: Maintain persistent connections efficiently
- **Connection Sharding**: Distribute connections across servers by user ID
- **Sticky Sessions**: Route users to the same connection server during a session
- **Connection Draining**: Gracefully migrate connections during server updates

### Message Delivery Scalability
- **Message Queues**: Use distributed queues for asynchronous processing
- **Horizontal Scaling**: Add more message processing servers as load increases
- **Regional Processing**: Process messages close to users' geographic locations
- **Batch Processing**: Batch messages for efficient delivery

## Bottlenecks and Solutions

### Connection Handling at Scale
- **Problem**: Maintaining millions of concurrent WebSocket connections
- **Solution**:
  - Use connection multiplexing
  - Implement efficient connection pooling
  - Employ specialized WebSocket servers optimized for many connections
  - Use protocols like MQTT designed for high-connection scenarios

### Message Delivery in Poor Network Conditions
- **Problem**: Ensuring message delivery in unreliable networks
- **Solution**:
  - Implement progressive message delivery with acknowledgments
  - Use exponential backoff for retries
  - Optimize message size for low-bandwidth conditions
  - Implement store-and-forward mechanisms
  - Prioritize text over media in constrained conditions

### Group Messaging at Scale
- **Problem**: Delivering messages to large groups efficiently
- **Solution**:
  - Implement fan-out queues for large groups
  - Process group messages in parallel
  - Limit very large group sizes or implement special handling
  - Use multicast patterns where possible

## Caching Strategy

- **User Presence Cache**: Cache online status in memory
- **Contact List Cache**: Cache user's contacts for quick access
- **Recent Messages Cache**: Cache recent conversations and messages
- **Media Metadata Cache**: Cache metadata for frequently shared media
- **Group Membership Cache**: Cache group membership information

## Data Replication and Consistency

- **Message Replication**: Replicate messages across multiple data centers
- **Eventual Consistency**: Use eventual consistency for non-critical data
- **Strong Consistency**: Ensure strong consistency for message ordering within conversations
- **Conflict Resolution**: Implement logical clocks (vector clocks) for message ordering

## Sharding Strategy

- **User-based Sharding**: Shard user data and messages by user ID
- **Conversation-based Sharding**: Shard messages by conversation ID
- **Time-based Sharding**: Archive older messages to different storage tiers
- **Regional Sharding**: Shard data based on user geography for improved latency

## End-to-End Encryption

### Key Management
1. Each client generates its own public/private key pair
2. Public keys are exchanged through the server
3. For each conversation, a unique session key is generated
4. Messages are encrypted with the session key
5. Session keys are encrypted with recipient's public key
6. Keys are rotated periodically for forward secrecy

### Message Encryption Process
1. Sender generates a random message key
2. Message is encrypted using the message key
3. Message key is encrypted using the session key
4. Encrypted message and encrypted key are sent to recipient
5. Recipient decrypts the message key using their private key
6. Recipient decrypts the message using the message key

## Real-time Features

### Presence System
- Track user online status in real-time
- Implement privacy controls for presence visibility
- Use heartbeat mechanisms to detect disconnections
- Optimize presence updates to reduce battery consumption

### Typing Indicators
- Send typing state changes through WebSocket connection
- Implement debouncing to reduce unnecessary updates
- Expire typing indicators after inactivity
- Prioritize message delivery over typing indicators

## Voice and Video Calling

### Call Signaling
1. Caller initiates call through signaling server
2. Server notifies recipient of incoming call
3. If accepted, both clients exchange network information
4. Clients establish direct peer-to-peer connection when possible
5. If P2P fails, relay servers are used

### Media Transmission
- Use WebRTC for peer-to-peer media transmission
- Implement adaptive bitrate based on network conditions
- Support fallback to relay servers when direct connection isn't possible
- Optimize codecs for different network conditions

## Offline Messaging

- Store messages for offline users in message queue
- Send push notifications to notify users of new messages
- Implement message expiry policies for very old undelivered messages
- Optimize message delivery when user comes online after long absence

## Fault Tolerance and Reliability

- **Multi-Region Deployment**: Deploy across multiple geographic regions
- **Message Persistence**: Ensure messages are persisted before acknowledging
- **Redundant Storage**: Store multiple copies of messages
- **Circuit Breakers**: Implement circuit breakers between services
- **Graceful Degradation**: Prioritize text message delivery during partial outages

## Security Considerations

- **End-to-End Encryption**: Ensure messages can only be read by intended recipients
- **Transport Security**: Use TLS for all client-server communications
- **Phone Number Verification**: Verify user identity via SMS/call
- **Rate Limiting**: Prevent abuse through rate limiting
- **Metadata Protection**: Minimize and protect metadata about communications
- **Secure Key Storage**: Securely store encryption keys on client devices

## Battery and Data Optimization

- **Efficient Connection Management**: Use heartbeats to maintain connections
- **Batching**: Batch updates to reduce radio usage
- **Compression**: Compress messages and media before transmission
- **Adaptive Polling**: Adjust polling frequency based on app state
- **Lazy Loading**: Load media on demand rather than automatically
- **Background Restrictions**: Respect platform-specific background processing limits