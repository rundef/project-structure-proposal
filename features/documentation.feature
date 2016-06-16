Feature: Documentation

  Scenario: Testing the /docs/index.html endpoint
    Given I want to test the documentation
    When I am sending a GET request to the "/docs/index.html" URI
    Then I should receive a 200 response code

  Scenario: Testing the /swagger.yml endpoint
    Given I want to test the documentation
    When I am sending a GET request to the "/swagger.yml" URI
    Then I should receive a 200 response code with the content-type "text/yaml"
    