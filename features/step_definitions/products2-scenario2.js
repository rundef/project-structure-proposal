module.exports = function () {
  let should = require('chai').should();
  let nock = require('nock');


  this.Given(/^10 Products in the catalog$/, (table, callback) => {
    table = table.raw();
    headers = table.shift();

    mockedProductList = [];

    for(var rowIndex in table) {
      var product = {};

      for(let colIndex in headers) {
        var attributeName = headers[colIndex];
        var attributeValue = table[rowIndex][colIndex];

        product[attributeName] = attributeValue;
      }

      mockedProductList.push(product);
    }

    nock('http://127.0.0.1:9999')
     .get('/products')
     .reply(200, mockedProductList);

    callback();
  });

  // "When I request a list of products" is defined in products2-scenario1.js

  this.Then(/^a list of (\d+) product is displayed$/, (numProducts, callback) => {
    this.request
      .end((err, res) => {
        this.responseBody = res.body;

        this.responseBody.should.be.an('array');
        this.responseBody.should.have.length(numProducts);

        callback();
      });
  });


  this.Then(/^the products have the following attributes:$/, (table, callback) => {
    table = table.raw();
    headers = table.shift();

    for(var rowIndex in table) {
      for(let colIndex in headers) {
        var attributeName = headers[colIndex];
        var attributeValue = table[rowIndex][colIndex];

        this.responseBody[rowIndex].should.have.property(attributeName);
        this.responseBody[rowIndex][attributeName].should.equal(attributeValue);
      }
    }

    callback();
  });
};
