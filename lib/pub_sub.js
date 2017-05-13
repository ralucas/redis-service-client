const Q = require('q');
const redis = require('redis');

const RedisService = require('./index');

// TODO: This module needs a little love
module.exports = class PubSub extends RedisService {

  constructor(config) {
    super(config);

    this.subscriptionClient = redis.createClient(
      this.config.port,
      this.config.host,
      this.config.options
    );

    this.publishClient = redis.createClient(
      this.config.port,
      this.config.host,
      this.config.options
    );

    this.methods = [
      'subscribe', 
      'psubscribe', 
      'unsubscribe',
      'punsubscribe'
    ];

    this.events = [
      'message', 
      'pmessage', 
      'message_buffer', 
      'pmessage_buffer', 
    ];
  
    this.initMethods();
  }

  initMethods() {
    this.methods.forEach(method => {
      this[method] = function(args) {
        this.subscriptionClient[method](args);
      };
    });
  }

  publish(channel, msg) {
    return this.publishClient.publish(channel, msg);
  }

  listen(channel, cb) {
    this.subscribe(channel);
    this.subscriptionClient.on('message', cb);
  }

  plisten(pattern, cb) {
    this.psubscribe(pattern);
    this.subscriptionClient.on('pmessage', cb);
  }

};

