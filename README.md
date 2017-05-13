Redis Service Client
---

An abstraction service client for Redis that uses promises

### Implements the following data structures or methods:
* Priority Queue
* PubSub
* Any redis method

### How to use:
```js
var RedisService = require('redis-service-client').redis;
var redisService = new RedisService();

// Start up the monitoring client
redisService.monitor();

// Set up pubsub client
var PubSub = require('redis-service-client').pubsub;
var pubsub = new PubSub(config);

pubsub.listen('hello', function(data) {
  console.log('hello ' + data); // 'hello world'l  
});
pubSub.publish('hello', 'world');

// Execute a command
redisService.execute('redisCommand', ['args'])
  .then(function(results) {
    \\handle results  
  });
```
