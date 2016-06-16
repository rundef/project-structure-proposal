let util = require('util');

class HelloWorldController {
  constructor(helpers) {
    this.helloWorldHelper = new helpers.HelloWorld();
  }
  get(req, res, next) {
    res.send(this.helloWorldHelper.getString());
  }
  hello(req, res, next) {
    var name = req.query.name || 'stranger';
    var job = req.query.job || 'job less';
    var hello = util.format('Hello, %s! Your job is ', name, job);

    // this sends back a JSON response which is a single string
    res.json(hello);
  }
}

module.exports = HelloWorldController;
