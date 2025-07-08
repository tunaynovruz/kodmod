# Elasticsearch

- **Distributed Search Engine:** Elasticsearch is a distributed, RESTful search and analytics engine capable of addressing a growing number of use cases.
- **Document-Oriented:** Stores data as JSON documents, making it flexible for various data structures.
- **Near Real-Time (NRT):** Provides near real-time search capabilities with a slight delay (usually one second) from indexing to searchability.
- **Scalable:** Can scale horizontally by adding more nodes to a cluster.
- **Schema-Free:** Automatically detects and maps data types, though explicit mapping is recommended for complex data.
- **Full-Text Search:** Powerful full-text search capabilities with support for multiple languages.
- **Analytics:** Provides aggregation framework for data analysis and visualization.

## Core Concepts

### Document and Indices

- **Document:** The basic unit of information in Elasticsearch, expressed in JSON.
- **Index:** A collection of documents with similar characteristics.
- **Type:** (Deprecated in newer versions) A logical category/partition within an index.
- **Mapping:** Defines how documents and their fields are stored and indexed.
- **Shards:** Horizontal partitions of an index, allowing distribution across nodes.
- **Replicas:** Copies of shards for redundancy and improved search performance.

### Elasticsearch vs Traditional Databases

| Feature | Elasticsearch | Traditional RDBMS |
|---------|--------------|-------------------|
| Data Model | Document-oriented (JSON) | Table-based (rows and columns) |
| Schema | Dynamic, flexible | Rigid, predefined |
| Query Language | Query DSL (JSON-based) | SQL |
| Transactions | Limited support | ACID compliant |
| Scalability | Horizontal scaling | Vertical scaling primarily |
| Search Capabilities | Advanced full-text search | Basic text search |
| Performance | Optimized for search and analytics | Optimized for transactions |

## Elasticsearch Architecture

- **Node:** A single instance of Elasticsearch.
- **Cluster:** A collection of connected nodes.
- **Master Node:** Controls the cluster and is responsible for cluster-wide operations.
- **Data Node:** Stores data and executes data-related operations.
- **Client Node:** Forwards cluster requests to the master node and data-related requests to data nodes.
- **Ingest Node:** Pre-processes documents before indexing.
- **Coordinating Node:** Routes requests, handles the search reduce phase, and distributes bulk indexing.

## Common Elasticsearch Operations

### Create an index
```
# REST API call
PUT /my_index

# Request body
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2
  }
}
```

### Index a document
```
# REST API call
POST /my_index/_doc

# Request body
{
  "title": "Elasticsearch Guide",
  "content": "A comprehensive guide to Elasticsearch",
  "tags": ["search", "database", "tutorial"],
  "published_date": "2023-07-15"
}
```

### Search for documents
```
# REST API call
GET /my_index/_search

# Request body
{
  "query": {
    "match": {
      "content": "elasticsearch"
    }
  }
}
```

### Aggregation example
```
# REST API call
GET /my_index/_search

# Request body
{
  "size": 0,
  "aggs": {
    "tags_count": {
      "terms": {
        "field": "tags.keyword"
      }
    }
  }
}
```

## ELK Stack

Elasticsearch is often used as part of the ELK Stack:

- **Elasticsearch:** Search and analytics engine.
- **Logstash:** Data processing pipeline for ingesting data.
- **Kibana:** Visualization and management interface.
- **Beats:** Lightweight data shippers for sending data to Elasticsearch or Logstash.

## Use Cases

- **Application Search:** Adding search functionality to applications.
- **Website Search:** Powering search for websites and content platforms.
- **Log and Event Data Analysis:** Analyzing logs and events for monitoring and troubleshooting.
- **Business Analytics:** Analyzing business data for insights and decision-making.
- **Security Analytics:** Detecting security threats and anomalies.
- **Metrics and Time Series Analysis:** Monitoring application and infrastructure metrics.
- **Geospatial Data Analysis:** Working with location-based data.

## Best Practices

- Design your indices with your use case in mind
- Use explicit mappings for complex data structures
- Properly size your cluster based on data volume and query patterns
- Implement a proper backup strategy
- Monitor cluster health and performance
- Use aliases for zero-downtime reindexing
- Consider data lifecycle management for time-series data
- Optimize your queries for performance
- Use appropriate shard and replica counts
- Keep your Elasticsearch version updated
