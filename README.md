Redis Service Client
---
[![Build Status](https://secure.travis-ci.org/ralucas/redis-service-client.png?branch=master)](http://travis-ci.org/ralucas/redis-service-client)

## Introduction
An abstraction service client for Redis that uses promises.  
It implements the following data structures or methods:
* Priority Queue
* PubSub
* Any redis method

## Getting Started
_Installation:_ `$ npm install --save redis-service-client`  

## How to use:
```js
const RedisService = require('redis-service-client').redis;
const redisService = new RedisService();

// Start up the monitoring client
redisService.monitor();

// Set up pubsub client
const PubSub = require('redis-service-client').pubsub;
const pubsub = new PubSub(config);

pubsub.listen('hello', function(data) {
  console.log('hello ' + data); // 'hello world'l  
});
pubSub.publish('hello', 'world');

// Execute a Redis command
redisService.execute('redisCommand', ['args'])
  .then(function(results) {
    \\handle results  
  });
```


