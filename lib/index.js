const redis = require('redis');
const assign = require('object-assign');
const Q = require('q');

module.exports = class RedisService {

  constructor(config) {
    this.config = assign({
      port: 6379,
      host: '127.0.0.1',
      options: {}
    }, config);

    if (this.config.client) {
      this.client = this.config.client;
    } else {
      if (config && config.path) {
        this.client = redis.createClient(config.path);
      } else {
        this.client = redis.createClient(
          this.config.port, 
          this.config.host, 
          this.config.options
        );
      }
    }
    if (config && config.password) this.client.auth(config.password);

    this.client.on('error', console.warn);

    if (this.config.monitor) {
      this.monitor();
    }

  }

  execute(method, args) {
    const applyArgs = Array.isArray(args) ? args : [args];
    return Q.npost(this.client, method, applyArgs); 
  }

  /*
   * Runs the multi function in redis and calls exec
   * @param {Object|Array} commands, if array, must be multi-dimensional
   *
   * @returns {Object} Promise
   */ 
  multi(commands) {
    const args = Array.isArray(commands) ? commands :
      Object.keys(commands).map(command => [command].concat(commands[command]));

    return Q.Promise((resolve, reject, notify) => {
      this.client.multi(args)
        .exec((err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
    });
  }

  // This is a listener on methods
  // N.B. This can create a lot of events quickly
  listenTo(method, cb) {
    return this.client.on(method, cb);
  }

  monitor() {
    //set up monitoring for redis
    this.monitorClient = redis.createClient(
      this.config.port, 
      this.config.host, 
      this.config.options
    );

    this.monitorClient.monitor((err, res) => {
      if (err) console.error('Error with monitoring mode: ', err, err.stack);
      console.log("Entering monitoring mode.");
    });

    this.monitorClient.on("monitor", (time, args) => {
      console.log(time + ": " + args);
    });
  }

};
