# Gradle

- **Build Automation Tool:** Gradle is a build automation tool that supports multi-language development and many platforms.
- **Groovy/Kotlin DSL:** Uses Groovy or Kotlin-based DSL (Domain Specific Language) for declaring builds.
- **Dependency Management:** Powerful dependency management for resolving and using project dependencies.
- **Highly Customizable:** Extensible build system with plugins and custom task types.
- **Incremental Builds:** Avoids redundant work by tracking input and output changes.
- **Build Cache:** Reuses outputs from previous builds for faster builds.
- **Multi-Project Builds:** Supports complex, multi-project builds with ease.

## Core Concepts

### Build Scripts

Gradle builds are defined in build scripts, typically named `build.gradle` (Groovy) or `build.gradle.kts` (Kotlin).

```groovy
// Simple Gradle build script (Groovy)
plugins {
    id 'java'
}

group = 'com.example'
version = '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web:2.7.0'
    testImplementation 'junit:junit:4.13.2'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

### Projects and Tasks

- **Project:** Represents a component that can be built (e.g., a library or application)
- **Task:** Represents a single atomic piece of work in a build (e.g., compiling classes, creating a JAR)

```groovy
// Custom task example
task hello {
    doLast {
        println 'Hello, World!'
    }
}
```

### Gradle vs Other Build Tools

| Feature | Gradle | Maven | Ant |
|---------|--------|-------|-----|
| Build Language | Groovy/Kotlin DSL | XML | XML |
| Flexibility | Highly flexible | Convention-based | Highly flexible |
| Performance | Fast with incremental builds | Slower | Fast for simple builds |
| Dependency Management | Advanced | Good | Limited (with Ivy) |
| Learning Curve | Steeper | Moderate | Moderate |
| Plugins | Rich ecosystem | Rich ecosystem | Limited |
| Multi-project Support | Excellent | Good | Limited |

## Gradle Lifecycle

1. **Initialization:** Determines which projects will take part in the build
2. **Configuration:** Configures the project objects, creates and configures tasks
3. **Execution:** Executes the selected tasks

## Common Gradle Commands

```bash
# Run a build
gradle build

# Clean the build directory
gradle clean

# Run tests
gradle test

# Build with specific tasks
gradle compile jar

# Show dependencies
gradle dependencies

# Run with debug info
gradle --info build

# Run with build scan
gradle build --scan

# Use the Gradle wrapper
./gradlew build
```

## Gradle Wrapper

The Gradle Wrapper is a script that invokes a declared version of Gradle, downloading it if necessary.

```bash
# Generate Gradle wrapper
gradle wrapper

# Use Gradle wrapper
./gradlew build
```

## Dependency Management

```groovy
dependencies {
    // Main source set dependencies
    implementation 'group:name:version'
    
    // Test source set dependencies
    testImplementation 'group:name:version'
    
    // Runtime-only dependencies
    runtimeOnly 'group:name:version'
    
    // Compile-only dependencies
    compileOnly 'group:name:version'
    
    // Annotation processors
    annotationProcessor 'group:name:version'
}
```

## Gradle Plugins

Plugins extend Gradle's functionality by adding tasks, dependencies, configurations, and more.

```groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.7.0'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
}
```

### Common Plugins

- **Java Plugin:** Adds tasks for compiling, testing, and bundling Java projects
- **Application Plugin:** Adds tasks for running and packaging applications
- **Spring Boot Plugin:** Adds support for Spring Boot applications
- **Android Plugin:** Adds support for Android application development
- **Kotlin Plugin:** Adds support for Kotlin projects

## Multi-Project Builds

Gradle excels at managing multi-project builds with a root project and subprojects.

```
// settings.gradle
rootProject.name = 'my-project'
include 'core', 'api', 'web'
```

```groovy
// Root build.gradle
allprojects {
    repositories {
        mavenCentral()
    }
}

subprojects {
    apply plugin: 'java'
    
    dependencies {
        testImplementation 'junit:junit:4.13.2'
    }
}
```

## Best Practices

- Use the Gradle wrapper for consistent builds
- Organize build logic into buildSrc or plugins for reusability
- Leverage incremental builds and build cache
- Keep build scripts clean and modular
- Use version catalogs for dependency management
- Follow the Gradle conventions when possible
- Use appropriate dependency configurations
- Optimize build performance with parallel execution
- Document custom tasks and plugins
- Use continuous integration with Gradle