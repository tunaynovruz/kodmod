---
draft: true
---

- The JdbcTemplate and Running Queries
  -  Basic Queries
     The JDBC template is the main API through which we’ll access most of the functionality that we’re interested in:

creation and closing of connections
running statements and stored procedure calls
iterating over the ResultSet and returning results
- Queries With Named Parameters
- Mapping Query Results to Java Object
-  Exception Translation
   Spring comes with its own data exception hierarchy out of the box — with DataAccessException as the root exception — and it translates all underlying raw exceptions to it.

So, we keep our sanity by not handling low-level persistence exceptions. We also benefit from the fact that Spring wraps the low-level exceptions in DataAccessException or one of its sub-classes.

This also keeps the exception-handling mechanism ind

- JDBC Operations Using SimpleJdbc Classes
  - SimpleJdbcInsert
- Batch Operations
useful resource
- https://www.baeldung.com/spring-jdbc-jdbctemplate#the-jdbctemplate-and-running-queries



