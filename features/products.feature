Feature: Products API

  Scenario: Testing the "products" service without filters
    Given the client is an API consumer
    When the client requests a list of products
    Then the response is a list containing 10 products
    And each product has the following attributes: code, name, description

  Scenario: Testing the "products" service with the "per_page" filter
    Given the client is an API consumer
    And the client wants a certain number of products
      | number of requested products |
      | 5 |
      | 9 |
      | 12 |
      | 15 |
    When the client requests a list of products
    Then the response is a list containing a certain number products
      | number of products |
      | 5 |
      | 9 |
      | 12 |
      | 15 |
