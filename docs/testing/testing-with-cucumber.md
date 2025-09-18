---
draft: true
---

# Testing with Cucumber
draft: true

Cucumber is a popular tool that supports Behavior-Driven Development (BDD) by allowing tests to be written in a natural language format that can be understood by non-technical stakeholders. This guide covers key concepts and examples of Cucumber testing.

## What is Cucumber?

Cucumber is a testing framework that supports BDD and allows you to write test cases in plain language (Gherkin) that can be understood by business analysts, testers, and developers. It bridges the gap between technical and non-technical team members.

## Key Components of Cucumber

### Gherkin Language

Gherkin is the language used to write Cucumber tests. It uses a set of keywords to structure test scenarios:

- **Feature**: Describes a software feature and its business value
- **Scenario**: Describes a specific test case
- **Given**: Sets up the initial context (preconditions)
- **When**: Describes the action or event
- **Then**: Describes the expected outcome
- **And**, **But**: Used to add additional context, actions, or expectations

### Step Definitions

Step definitions connect Gherkin steps to code. They translate the plain language into executable code that performs the actual testing.

### Runners

Runners are used to execute Cucumber tests and can be configured to run specific features or scenarios.

## Example: Cucumber Feature File

```gherkin
Feature: User Authentication
  As a user
  I want to be able to log in to the system
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "john.doe" and password "password123"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message with my name

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter username "john.doe" and password "wrongpassword"
    And I click the login button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page
```

## Step Definitions in Different Languages

### Java (with Cucumber-JVM)


<details>
<summary>Koda bax</summary>

```java
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import static org.junit.jupiter.api.Assertions.*;

public class LoginStepDefinitions {
    
    private WebDriver driver;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    
    @Given("I am on the login page")
    public void i_am_on_the_login_page() {
        driver = new ChromeDriver();
        loginPage = new LoginPage(driver);
        loginPage.navigate();
    }
    
    @When("I enter username {string} and password {string}")
    public void i_enter_username_and_password(String username, String password) {
        loginPage.enterUsername(username);
        loginPage.enterPassword(password);
    }
    
    @When("I click the login button")
    public void i_click_the_login_button() {
        loginPage.clickLoginButton();
    }
    
    @Then("I should be redirected to the dashboard")
    public void i_should_be_redirected_to_the_dashboard() {
        dashboardPage = new DashboardPage(driver);
        assertTrue(dashboardPage.isDisplayed());
    }
    
    @Then("I should see a welcome message with my name")
    public void i_should_see_a_welcome_message_with_my_name() {
        assertTrue(dashboardPage.getWelcomeMessage().contains("John Doe"));
    }
    
    @Then("I should see an error message {string}")
    public void i_should_see_an_error_message(String errorMessage) {
        assertEquals(errorMessage, loginPage.getErrorMessage());
    }
    
    @Then("I should remain on the login page")
    public void i_should_remain_on_the_login_page() {
        assertTrue(loginPage.isDisplayed());
    }
}
```
</details>

### JavaScript (with Cucumber.js)

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { Builder, By } = require('selenium-webdriver');

let driver;
let loginPage;
let dashboardPage;

Given('I am on the login page', async function() {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://example.com/login');
});

When('I enter username {string} and password {string}', async function(username, password) {
  await driver.findElement(By.id('username')).sendKeys(username);
  await driver.findElement(By.id('password')).sendKeys(password);
});

When('I click the login button', async function() {
  await driver.findElement(By.id('login-button')).click();
});

Then('I should be redirected to the dashboard', async function() {
  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).to.include('/dashboard');
});

Then('I should see a welcome message with my name', async function() {
  const welcomeMessage = await driver.findElement(By.id('welcome-message')).getText();
  expect(welcomeMessage).to.include('John Doe');
});

Then('I should see an error message {string}', async function(errorMessage) {
  const actualError = await driver.findElement(By.id('error-message')).getText();
  expect(actualError).to.equal(errorMessage);
});

Then('I should remain on the login page', async function() {
  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).to.include('/login');
});
```

## Setting Up Cucumber

### Java (Maven)

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>7.0.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit</artifactId>
    <version>7.0.0</version>
    <scope>test</scope>
</dependency>
```

### JavaScript (npm)

```bash
npm install --save-dev @cucumber/cucumber chai selenium-webdriver
```

## Running Cucumber Tests

### Java

Create a runner class:


<details>
<summary>Koda bax</summary>

```java
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = "com.example.stepdefinitions",
    plugin = {"pretty", "html:target/cucumber-reports"}
)
public class CucumberRunner {
}
```
</details>

### JavaScript

Create a configuration file (cucumber.js):

```javascript
module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/step_definitions/**/*.js'],
    format: ['html:cucumber-report.html']
  }
};
```

Run with:

```bash
npx cucumber-js
```

## Best Practices for Cucumber Testing

1. **Write features from the user's perspective**: Focus on business value and user needs
2. **Keep scenarios independent**: Each scenario should be able to run in isolation
3. **Use domain-specific language**: Use terminology that stakeholders understand
4. **Keep features concise**: Avoid long, complex scenarios
5. **Reuse step definitions**: Create reusable steps to reduce duplication
6. **Use background for common setup**: Use the Background keyword for common preconditions
7. **Use scenario outlines for data-driven tests**: Test multiple data sets with a single scenario structure
8. **Organize features by business functionality**: Group related scenarios in the same feature file
9. **Include only relevant details**: Avoid unnecessary steps that don't add value
10. **Maintain a clean step definition library**: Regularly refactor and clean up step definitions

## Advanced Cucumber Features

### Scenario Outlines

```gherkin
Scenario Outline: Login with different user types
  Given I am on the login page
  When I enter username "<username>" and password "<password>"
  And I click the login button
  Then I should be redirected to the "<landing_page>"
  
  Examples:
    | username      | password      | landing_page |
    | admin         | admin123      | admin-panel  |
    | customer      | customer123   | dashboard    |
    | support       | support123    | tickets      |
```

### Backgrounds

```gherkin
Feature: Shopping Cart

  Background:
    Given I am logged in as a customer
    And my shopping cart is empty
    
  Scenario: Add item to cart
    When I add product "Laptop" to my cart
    Then my cart should contain 1 item
    
  Scenario: Remove item from cart
    Given I have added product "Laptop" to my cart
    When I remove product "Laptop" from my cart
    Then my cart should be empty
```

### Hooks

