module.exports = function(server, controllers, helpers) {
  const HelloWorldCtrl = new controllers.HelloWorld(helpers);

  server.get('/hello-world', HelloWorldCtrl.get.bind(HelloWorldCtrl));
  server.get('/hello', HelloWorldCtrl.hello.bind(HelloWorldCtrl));
};
