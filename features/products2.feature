Feature: Products API

  Scenario: List of Products
    Given Products in the catalog
    When I request a list of products
    Then a product list is displayed
    And each product has a code, name and description


  Scenario: List of Products
    Given 10 Products in the catalog
      | code | name | description |
      | SKU1 | name_1 | description_1 |
      | SKU2 | name_2 | description_2 | 
      | SKU3 | name_3 | description_3 |
      | SKU4 | name_4 | description_4 |
      | SKU5 | name_5 | description_5 |
      | SKU6 | name_6 | description_6 |
      | SKU7 | name_7 | description_7 |
      | SKU8 | name_8 | description_8 |
      | SKU9 | name_9 | description_9 | 
      | SKU10| name_10| description_10|
    When I request a list of products
    Then a list of 10 product is displayed
    And the products have the following attributes:
      | code | name | description |
      | SKU1 | name_1 | description_1 |
      | SKU2 | name_2 | description_2 | 
      | SKU3 | name_3 | description_3 |
      | SKU4 | name_4 | description_4 |
      | SKU5 | name_5 | description_5 |
      | SKU6 | name_6 | description_6 |
      | SKU7 | name_7 | description_7 |
      | SKU8 | name_8 | description_8 |
      | SKU9 | name_9 | description_9 | 
      | SKU10| name_10| description_10|