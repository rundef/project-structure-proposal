const App = require('../../src/App');

function Application() {
  this.app = new App(9999, true);
  this.app.start();

  return this.app;
}

module.exports = Application;
