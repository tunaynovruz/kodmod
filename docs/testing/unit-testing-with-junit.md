---
draft: true
---
# Unit Testing with JUnit in Java
draft: true

JUnit is the most popular unit testing framework for Java applications. This guide covers the basics of JUnit and provides practical examples.

## JUnit Basics

JUnit 5 (also known as Jupiter) is the latest version of JUnit. It consists of several modules:
- JUnit Platform: Foundation for testing frameworks on the JVM
- JUnit Jupiter: New programming model and extension model for writing tests
- JUnit Vintage: Supports running JUnit 3 and 4 tests

## Setting Up JUnit

### Maven Dependency

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.9.2</version>
    <scope>test</scope>
</dependency>
```

### Gradle Dependency

```groovy
testImplementation 'org.junit.jupiter:junit-jupiter:5.9.2'
```

## Basic Test Structure


<details>
<summary>Koda bax</summary>

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {
    
    @Test
    void addition() {
        Calculator calculator = new Calculator();
        assertEquals(5, calculator.add(2, 3), "2 + 3 should equal 5");
    }
}
```
</details>

## Common JUnit Annotations

- `@Test`: Marks a method as a test method
- `@BeforeEach`: Executed before each test method
- `@AfterEach`: Executed after each test method
- `@BeforeAll`: Executed once before all test methods (must be static)
- `@AfterAll`: Executed once after all test methods (must be static)
- `@Disabled`: Disables a test method or class
- `@DisplayName`: Provides a custom name for the test

## Example with Setup and Teardown


<details>
<summary>Koda bax</summary>

```java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class UserServiceTest {
    
    private UserService userService;
    private static Database database;
    
    @BeforeAll
    static void initDatabase() {
        database = new Database();
        database.connect();
    }
    
    @AfterAll
    static void closeDatabase() {
        database.disconnect();
    }
    
    @BeforeEach
    void initUserService() {
        userService = new UserService(database);
    }
    
    @Test
    @DisplayName("User creation should succeed with valid data")
    void createUserSuccess() {
        User user = new User("john", "password123");
        assertTrue(userService.createUser(user));
        assertNotNull(userService.findUser("john"));
    }
}
```
</details>

## Assertions

JUnit provides various assertion methods:


<details>
<summary>Koda bax</summary>

```java
// Basic assertions
assertEquals(expected, actual);
assertNotEquals(unexpected, actual);
assertTrue(condition);
assertFalse(condition);
assertNull(object);
assertNotNull(object);

// Array/Collection assertions
assertArrayEquals(expectedArray, actualArray);

// Exception testing
assertThrows(NullPointerException.class, () -> {
    throw new NullPointerException();
});

// Grouped assertions (all executed, failures reported together)
assertAll(
    () -> assertEquals(4, 2 + 2),
    () -> assertTrue(4 > 3)
);
```
</details>

## Parameterized Tests

Parameterized tests allow running the same test with different inputs:


<details>
<summary>Koda bax</summary>

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorParameterizedTest {
    
    @ParameterizedTest
    @CsvSource({
        "1, 1, 2",
        "5, 3, 8",
        "10, -5, 5"
    })
    void additionWithMultipleInputs(int a, int b, int expected) {
        Calculator calculator = new Calculator();
        assertEquals(expected, calculator.add(a, b));
    }
}
```
</details>

## Testing Exceptions


<details>
<summary>Koda bax</summary>

```java
@Test
void exceptionTesting() {
    Exception exception = assertThrows(
        ArithmeticException.class, 
        () -> divide(1, 0)
    );
    
    assertEquals("Division by zero", exception.getMessage());
}

int divide(int a, int b) {
    if (b == 0) {
        throw new ArithmeticException("Division by zero");
    }
    return a / b;
}
```
</details>

## Best Practices for JUnit Tests

1. **Test naming**: Use descriptive names that explain what the test does
2. **One assertion per test**: Focus each test on a single behavior
3. **Arrange-Act-Assert pattern**: Structure tests with setup, execution, and verification
4. **Test independence**: Tests should not depend on each other
5. **Fast execution**: Keep tests lightweight and quick to run
6. **Use mocks for external dependencies**: Isolate the unit being tested
7. **Test edge cases**: Include boundary conditions and error scenarios
