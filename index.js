var redis = require('redis');
var assign = require('object-assign');
var Q = require('q');

function RedisService(config) {
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
      this.client = redis.createClient(this.config.port, this.config.host, this.config.options);
    }
  }
  if (config && config.password) this.client.auth(config.password);

  this.client.on('error', console.warn);

  //set up monitoring for redis
  this.monitorClient = redis.createClient();

  this.monitorClient.monitor(function (err, res) {
    if (err) console.error('Error with monitoring mode: ', err, err.stack);
    console.log("Entering monitoring mode.");
  });

  this.monitorClient.on("monitor", function (time, args) {
    console.log(time + ": " + args);
  });

}

RedisService.prototype.execute = function(method, args) {
  return Q.npost(this.client, method, args); 
};

RedisService.prototype.pubsub = function pubsub() {
  var subscriptionClient = redis.createClient();
  
  var subscribe = function subscribe(method, args) {
    return Q.npost(subscriptionClient, method, args);
  };

  var unsubscribe = function unsubscribe(method, args) {
    return Q.npost(subscriptionClient, method, args);
  };

  // Given that it's a listener it uses callback pattern
  var listen = function listen(method, cb) {
    return subscriptionClient.on(method, cb);
  };

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    listen: listen
  };
};

module.exports = RedisService;

