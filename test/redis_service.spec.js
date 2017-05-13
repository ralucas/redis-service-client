const assert = require('assert');

const RedisService = require('../index').redis;

describe('RedisService', function() {

  const redis = new RedisService();

  describe('Construction', function() {
  
    it('should create a client', function(done) {
      assert(redis.client);
      done();
    });
  });
});
