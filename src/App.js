let restify = require('restify');
let redis = require('redis');
let path = require('path');
let config = require('config');
let fs = require('graceful-fs');


class App {
  constructor(port = 5000, silent = false) {
    this.port = port;
    this.silent = silent;
  }

  start() {
    // connect to redis
    this.redisClient = redis.createClient(config.redis.port, config.redis.host);
    this.openMongoConnection();

    // initialize the server
    this.server = restify.createServer();
    this.server.use(restify.queryParser());
    this.server.use(restify.bodyParser());


    /* istanbul ignore if */
    if(config.get('documentation')) {
      this.serveDocumentation();
    }


    let FSHelper = require('./helpers/FS');
    let fsHelper = new FSHelper();

    // load the controllers, helpers and routes
    let controllers = fsHelper.loadFiles(path.resolve(__dirname, 'controllers'));
    let helpers = fsHelper.loadFiles(path.resolve(__dirname, 'helpers'));
    let routes = fsHelper.loadFiles(path.resolve(__dirname, 'routes'));

    for(let routeName in routes) {
      routes[routeName](this.server, controllers, helpers);
    }



    var swaggerConfig = {
      appRoot: path.resolve(__dirname, '..')
    };


    this.server.listen(this.port, () => {
      /* istanbul ignore if */
      if(!this.silent) {
        console.log('microservice server listening at %s', this.server.url);
      }
    });


    return this;
  }

  serveDocumentation() {
    /*
    this.server.get(/swagger.yaml/, restify.serveStatic({
      directory: path.resolve(__dirname, '..', 'api', 'swagger'),
      file: 'swagger.yaml'
    }));
*/
    /* istanbul ignore next */
    /*
    this.server.get(/^\/docs\/?$/, (req, res) => {
      res.header('Location', '/docs/index.html');
      res.send(302);
    });

    this.server.get(/^\/docs\/index.html$/, (req, res, next) => {
      fs.readFile(path.resolve(__dirname, '..', 'node_modules', 'swagger-ui', 'dist', 'index.html'), (err, content) => {
        if (err) {
          res.send(500);
          return next();
        }

        let swaggerfileURL = `http://${req.headers.host}/swagger.yaml`;
        content = content.toString().replace('url = "http://petstore.swagger.io/v2/swagger.json"', `url ="${swaggerfileURL}"`);

        res.write(content);
        res.end();
      });
    });

    this.server.get(/^\/docs\/.*$/, restify.serveStatic({
      directory: path.resolve(__dirname, '..'),
      default: 'index.html'
    }));
*/
  }

  openMongoConnection() {
    let mongoose = require('mongoose');

    mongoose.connection.on('connected', () => {
      /* istanbul ignore if */
      if(!this.silent) {
        console.log('Mongoose default connection open');
      }
    });

    /* istanbul ignore next */
    mongoose.connection.on('error', (err) => {
      console.log('Mongoose default connection error',err);
    });

    mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`);
  }
}

module.exports = App;
