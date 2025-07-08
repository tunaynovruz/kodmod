# Maven

- **Build Automation Tool:** Maven is a build automation and project management tool primarily used for Java projects.
- **Convention over Configuration:** Follows a standard directory structure and build lifecycle, reducing the need for configuration.
- **Dependency Management:** Handles project dependencies, automatically downloading required libraries.
- **Project Object Model (POM):** Uses XML-based POM files to describe the project, its dependencies, and build process.
- **Plugins:** Extends functionality through a plugin architecture.
- **Repository System:** Stores and retrieves artifacts from local and remote repositories.
- **Multi-Module Projects:** Supports building complex applications with multiple modules.

## Core Concepts

### Project Object Model (POM)

The POM is an XML file that contains information about the project and configuration details used by Maven to build the project.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
            </plugin>
        </plugins>
    </build>
</project>
```

### Maven Coordinates

Maven uses coordinates to uniquely identify artifacts:

- **groupId:** Organization or group (e.g., com.example)
- **artifactId:** Project name (e.g., my-app)
- **version:** Specific version of the project (e.g., 1.0-SNAPSHOT)
- **packaging:** Type of artifact (e.g., jar, war, ear)

### Maven vs Other Build Tools

| Feature | Maven | Gradle | Ant |
|---------|-------|--------|-----|
| Build Language | XML | Groovy/Kotlin DSL | XML |
| Flexibility | Convention-based | Highly flexible | Highly flexible |
| Performance | Moderate | Fast with incremental builds | Fast for simple builds |
| Dependency Management | Good | Advanced | Limited (with Ivy) |
| Learning Curve | Moderate | Steeper | Moderate |
| Plugins | Rich ecosystem | Rich ecosystem | Limited |
| Multi-project Support | Good | Excellent | Limited |

## Maven Lifecycle

Maven has three built-in build lifecycles:

1. **Default:** Handles project deployment
2. **Clean:** Handles project cleaning
3. **Site:** Handles the creation of project documentation

Each lifecycle consists of phases, such as:

- **validate:** Validate project structure
- **compile:** Compile source code
- **test:** Run tests
- **package:** Package compiled code
- **verify:** Run integration tests
- **install:** Install package to local repository
- **deploy:** Copy package to remote repository

## Common Maven Commands

```bash
# Build the project
mvn clean install

# Run tests
mvn test

# Package the application
mvn package

# Skip tests
mvn install -DskipTests

# Generate project site
mvn site

# Show dependency tree
mvn dependency:tree

# Run a specific plugin goal
mvn plugin:goal

# Create a new Maven project
mvn archetype:generate
```

## Maven Wrapper

The Maven Wrapper allows you to run Maven without having it installed on your system.

```bash
# Generate Maven wrapper
mvn wrapper:wrapper

# Use Maven wrapper
./mvnw clean install
```

## Dependency Management

```xml
<dependencies>
    <!-- Compile scope (default) -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.3.20</version>
    </dependency>
    
    <!-- Test scope -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>
    
    <!-- Runtime scope -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.29</version>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Provided scope -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

## Maven Plugins

Plugins are the core of Maven's functionality, providing goals that can be executed during the build lifecycle.

```xml
<build>
    <plugins>
        <!-- Compiler plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>11</source>
                <target>11</target>
            </configuration>
        </plugin>
        
        <!-- JAR plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <version>3.2.0</version>
            <configuration>
                <archive>
                    <manifest>
                        <mainClass>com.example.Main</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### Common Plugins

- **maven-compiler-plugin:** Compiles Java source code
- **maven-surefire-plugin:** Runs unit tests
- **maven-failsafe-plugin:** Runs integration tests
- **maven-jar-plugin:** Builds JAR files
- **maven-war-plugin:** Builds WAR files
- **maven-assembly-plugin:** Creates custom package assemblies
- **spring-boot-maven-plugin:** Packages Spring Boot applications

## Multi-Module Projects

Maven supports building complex applications with multiple modules.

```xml
<!-- Parent POM -->
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>parent-project</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>
    
    <modules>
        <module>core</module>
        <module>api</module>
        <module>web</module>
    </modules>
    
    <dependencyManagement>
        <!-- Manage versions for child modules -->
    </dependencyManagement>
</project>
```

## Best Practices

- Use a consistent directory structure
- Leverage Maven's convention over configuration
- Use dependency management for consistent versions
- Create a parent POM for multi-module projects
- Use properties for version management
- Keep POM files clean and organized
- Use appropriate dependency scopes
- Configure plugins in a parent POM when possible
- Use Maven profiles for environment-specific configurations
- Document your POM files with comments