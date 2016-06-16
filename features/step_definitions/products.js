module.exports = function () {
  let should = require('chai').should();
  let _ = require('lodash');
  let async = require('async');

  this.Given(/^the client is an API consumer$/, (callback) => {
    this.per_page = null;
    this.client = require('supertest');

    callback();
  });


  this.Given(/^the client wants a certain number of products$/, (table, callback) => {
    this.per_page = table.rows().map(Function.prototype.call, (idx, table) => table[idx][0]);
    callback();
  });


  this.When(/^the client requests a list of products$/, (callback) => {
    if(_.isArray(this.per_page)) {
      this.requests = [];

      for(let index in this.per_page) {
        this.requests.push(
          this.client(this.app.server)
          .get(`/products?filter[per_page]=${this.per_page[index]}`)
          .set('Accept', 'application/json')
        );
      }
    }
    else {
      this.request = this.client(this.app.server)
       .get('/products')
       .set('Accept', 'application/json');
    }

    callback();
  });


  this.Then(/^the response is a list containing (\d+) products$/, (numProducts, callback) => {
    this.request
      .end((err, res) => {
        this.responseBody = res.body;

        this.responseBody.should.be.an('array');
        this.responseBody.should.have.length(numProducts);

        callback();
      });
  });


  this.Then(/^each product has the following attributes: (.*)$/, (attributes, callback) => {
    attributes = attributes.split(',');
    attributes = attributes.map(Function.prototype.call, String.prototype.trim);

    for(let pIndex in this.responseBody) {
      for(let aIndex in attributes) {
        this.responseBody[pIndex].should.have.property(attributes[aIndex]);
      }
    }

    callback();
  });


  this.Then(/^the response is a list containing a certain number products$/, (table, callback) => {
    let countArray = table.rows().map(Function.prototype.call, (idx, table) => table[idx][0]);
    let index = 0;

    async.eachSeries(this.requests, function (request, next) {
      request.end((err, res) => {
        let responseBody = res.body;

        responseBody.should.be.an('array');
        responseBody.should.have.length(countArray[index]);

        index++;

        next();
      });
    }, callback);
  });
};
