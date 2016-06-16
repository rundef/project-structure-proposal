module.exports = function () {
  this.Given(/^I want to test the hello world service$/, (callback) => {
    callback();
  });

  this.When(/^I am sending a GET request to the "(.*)" URI$/, (uri, callback) => {
    let supertest = require('supertest');

    this.request = supertest(this.app.server)
     .get(uri)
     .set('Accept', 'text/plain');
    callback();
  });

  this.Then(/^I should receive a response with the following content: "(.*)"$/, (expectedResponse, callback) => {
    this.request
      .expect(200, expectedResponse, callback);
  });
};
