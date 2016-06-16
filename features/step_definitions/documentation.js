module.exports = function () {
  this.Given(/^I want to test the documentation$/, (callback) => {
    callback();
  });

  this.Then(/^I should receive a (\d+) response code$/, (expectedResponseCode, callback) => {
    this.request
      .expect(parseInt(expectedResponseCode), callback);
  });

  this.Then(/^I should receive a (\d+) response code with the content-type "(.*)"$/, (expectedResponseCode, expectedContentType ,callback) => {
    this.request
      .expect('Content-Type', expectedContentType)
      .expect(parseInt(expectedResponseCode), callback);
  });
};
