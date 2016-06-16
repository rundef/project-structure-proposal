Feature: Hello world

  Scenario: Testing the "Hello world" service
    Given I want to test the hello world service
    When I am sending a GET request to the "/hello-world" URI
    Then I should receive a response with the following content: "Hello world!"