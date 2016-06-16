var should = require('chai').should();

describe('Hello world helper', function() {
  let helloWorldHelper = new (require('../src/helpers/HelloWorld'))();

  it('getString() should return "Hello world!"', function(){
    helloWorldHelper.getString().should.equal('Hello world!');
  });
})
