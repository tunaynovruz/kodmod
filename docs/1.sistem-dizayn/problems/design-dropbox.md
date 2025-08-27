# Design Dropbox (File Storage and Sharing System)
draft: true

## Problem Statement

Design a file storage and sharing service like Dropbox that:
- Allows users to store files in the cloud
- Synchronizes files across multiple devices
- Enables file sharing with other users
- Supports version history and recovery
- Scales to handle millions of users and petabytes of data

## Requirements

### Functional Requirements
- Users can upload, download, and delete files
- Files should sync automatically across all user devices
- Users can share files/folders with specific permissions (view, edit)
- System should maintain version history for files
- Users can recover deleted files within a retention period
- Support for various file types and large file sizes

### Non-Functional Requirements
- High availability (99.9%+)
- Durability (99.999999999% - 11 nines)
- Low latency for file access
- Strong consistency for metadata, eventual consistency for file content
- Scalable to handle millions of users and petabytes of data
- Secure storage and transmission of files

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
| Web/Mobile  +---->  API Gateway+---->Application+---->  Metadata   |
| Clients     |    |             |    |  Servers  |    |  Service    |
+-------------+    +-------------+    +-----+-----+    +------+------+
                                            |                 |
                                            v                 v
                        +------------------+--+    +----------+---------+
                        |                     |    |                    |
                        |  Storage Service    |    |  Notification      |
                        |                     |    |  Service           |
                        +---------------------+    +--------------------+
                                |
                                v
+----------------+    +--------+-------+    +----------------+
|                |    |                |    |                |
| Block Storage  |    | Metadata DB    |    | User Auth DB   |
| (S3/HDFS)      |    | (SQL/NoSQL)    |    | (SQL)          |
|                |    |                |    |                |
+----------------+    +----------------+    +----------------+
```

## Component Design

### File Upload Flow
1. Client breaks file into chunks (typically 4MB)
2. Client computes hash for each chunk to enable deduplication
3. Client uploads only chunks that don't already exist on the server
4. Metadata Service records file metadata (name, size, owner, chunks, etc.)
5. Notification Service informs other devices about the new file

### File Download Flow
1. Client requests file metadata from Metadata Service
2. Client receives list of chunks and their locations
3. Client downloads required chunks from Storage Service
4. Client reassembles chunks into the complete file

### Synchronization Mechanism
1. Client maintains a local database of file metadata
2. Client establishes a long-polling connection or WebSocket with Notification Service
3. When changes occur, Notification Service pushes updates to all connected clients
4. Client compares server metadata with local metadata to identify changes
5. Client uploads/downloads only the changed chunks

## Database Design

### Metadata Database (SQL or NoSQL)
- Stores file metadata, user information, sharing permissions
- Schema:
  ```
  Users {
    userId: string (primary key)
    email: string
    name: string
    storageUsed: long
    storageLimit: long
    ...other user attributes
  }
  
  Files {
    fileId: UUID (primary key)
    name: string
    type: string
    size: long
    ownerId: string (foreign key to Users)
    parentFolderId: UUID (foreign key to Files, for folder structure)
    createdAt: datetime
    modifiedAt: datetime
    isDeleted: boolean
    deletedAt: datetime (for recovery)
  }
  
  Chunks {
    chunkId: string (hash of chunk content, primary key)
    size: int
    storageLocation: string (path in block storage)
  }
  
  FileChunks {
    fileId: UUID (composite key with chunkIndex)
    chunkIndex: int (composite key with fileId)
    chunkId: string (foreign key to Chunks)
  }
  
  FileVersions {
    versionId: UUID (primary key)
    fileId: UUID (foreign key to Files)
    modifiedAt: datetime
    modifiedBy: string (foreign key to Users)
    size: long
  }
  
  Shares {
    shareId: UUID (primary key)
    fileId: UUID (foreign key to Files)
    sharedWith: string (foreign key to Users)
    permission: string (read, write)
    sharedBy: string (foreign key to Users)
    sharedAt: datetime
  }
  ```

## Scalability Considerations

### Storage Scalability
- **Block-level Deduplication**: Store identical chunks only once
- **Delta Sync**: Transfer only the changed portions of files
- **Content-Defined Chunking**: Split files at natural boundaries to improve deduplication
- **Tiered Storage**: Move less frequently accessed files to cheaper storage

### Metadata Service Scalability
- **Database Sharding**: Partition metadata by userId or fileId
- **Caching**: Cache frequently accessed metadata in memory
- **Read Replicas**: Use read replicas for metadata database to handle high read volumes

## Bottlenecks and Solutions

### Large File Uploads
- **Problem**: Uploading large files can be slow and prone to failures
- **Solution**:
  - Implement chunked uploads with resumable capabilities
  - Use parallel uploads for multiple chunks
  - Implement retry mechanisms with exponential backoff

### Sync Storms
- **Problem**: Many clients syncing simultaneously can overwhelm servers
- **Solution**:
  - Implement rate limiting per user
  - Use exponential backoff for retries
  - Prioritize metadata sync over content sync
  - Batch updates to reduce connection overhead

### Hot Files
- **Problem**: Popular shared files can create hotspots
- **Solution**:
  - Cache hot files in CDN
  - Replicate hot files across multiple storage nodes
  - Implement read-through caching

## Caching Strategy

- **Metadata Cache**: Cache file metadata in memory (Redis)
- **Block Cache**: Cache frequently accessed blocks in faster storage
- **Client-side Cache**: Cache file metadata and content locally on client devices
- **CDN Cache**: Cache publicly shared files in CDN for faster access

## Data Replication and Consistency

- **Block Storage Replication**: Replicate blocks across multiple availability zones
- **Metadata Replication**: Use multi-region replication for metadata database
- **Consistency Model**:
  - Strong consistency for metadata operations
  - Eventual consistency for file content
  - Optimistic concurrency control for file edits

## Sharding Strategy

- **Metadata Sharding**: Shard by userId to keep a user's metadata on the same shard
- **Block Storage Sharding**: Distribute blocks based on content hash
- **Cross-shard Operations**: Use distributed transactions or saga pattern for operations spanning multiple shards

## Fault Tolerance and Reliability

- **Redundant Storage**: Store multiple copies of each block
- **Checksumming**: Verify data integrity using checksums
- **Automatic Recovery**: Implement self-healing mechanisms to recover from storage node failures
- **Disaster Recovery**: Maintain backups across multiple regions
- **Circuit Breakers**: Implement circuit breakers between services

## Security Considerations

- **Encryption at Rest**: Encrypt all stored data
- **Encryption in Transit**: Use TLS for all communications
- **Access Control**: Implement fine-grained access control for shared files
- **Virus Scanning**: Scan uploaded files for malware
- **Audit Logging**: Log all access and modifications for security auditing

## Version Control System

- **Snapshot-based Versioning**: Store complete metadata snapshots for each version
- **Delta-based Storage**: Store only the changes between versions to save space
- **Retention Policy**: Implement configurable retention policies for versions
- **Purge Mechanism**: Automatically purge old versions based on policy

## Offline Support

- **Local Cache**: Maintain a local cache of frequently accessed files
- **Offline Edits**: Allow edits while offline and sync when connection is restored
- **Conflict Resolution**: Implement strategies to resolve conflicts when same file is edited offline by multiple users