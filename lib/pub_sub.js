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

    this.events = [
      'message', 
      'pmessage', 
      'message_buffer', 
      'pmessage_buffer', 
      'subscribe', 
      'psubscribe', 
      'unsubscribe',
      'punsubscribe'
    ];
  }

  publish(channel, msg) {
    return this.publishClient.publish(channel, msg);
  }

  subscribe(channel) {
    return this.subscriptionClient.subscribe(channel);
  }

  unsubscribe(channel) {
    return this.subscriptionClient.unsubscribe(channel);
  }

  listen(channel, cb) {
    this.subscribe(channel);
    this.subscriptionClient.on('message', cb);
  }

};

