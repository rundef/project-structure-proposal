module.exports = function () {
  let should = require('chai').should();
  let _ = require('lodash');

  this.Given(/^Products in the catalog$/, (callback) => {
    callback();
  });


  this.When(/^I request a list of products$/, (callback) => {
    this.client = require('supertest');

    this.request = this.client(this.app.server)
     .get('/products')
     .set('Accept', 'application/json');

    callback();
  });


  this.Then(/^a product list is displayed$/, (callback) => {
    this.request
      .end((err, res) => {
        this.responseBody = res.body;

        this.responseBody.should.be.an('array');

        callback();
      });
  });


  this.Then(/^each product has a (.*)$/, (attributes, callback) => {
    attributes = attributes.replace(/ and /g, ',');
    attributes = attributes.split(',');
    attributes = attributes.map(Function.prototype.call, String.prototype.trim);

    for(let pIndex in this.responseBody) {
      for(let aIndex in attributes) {
        this.responseBody[pIndex].should.have.property(attributes[aIndex]);
      }
    }

    callback();
  });
};
