class HelloWorldController {
  constructor(helpers) {
    this.helloWorldHelper = new helpers.HelloWorld();
  }
  get(req, res, next) {
    res.send(this.helloWorldHelper.getString());
  }
}

module.exports = HelloWorldController;
