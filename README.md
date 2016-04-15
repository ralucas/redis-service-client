Redis Service Client
---

An abstraction service client for Redis that uses promises

#### Currently includes three methods:
* `execute`
* `pubsub`
* `monitor`

### How to use:
```js
var RedisService = require('redis-service-client');
var redisService = new RedisService();

// Start up the monitoring client
redisService.monitor();

// Set up pubsub client
var pubSub = redisService.pubsub();
pubSub.subscribe('hello', function(data) {
  console.log('hello ' + data);  
});
pubSub.publish('hello');

// Execute a command
redisService.execute('redisCommand', ['args'])
  .then(function(results) {
    \\handle results  
  });

