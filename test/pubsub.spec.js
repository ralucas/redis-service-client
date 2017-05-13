const assert = require('assert');

const PubSub = require('../index').pubsub;

describe('RedisService', function() {

  const pubsub = new PubSub();

  describe('Construction', function() {
  
    it('should create a client', function(done) {
      assert(pubsub.client);
      done();
    });

    it('should subscribe', function(done) {
      pubsub.listen('testing', function(ch, msg) {
        assert(msg);
        assert.equal(msg, 'This is a test');
        done();
      });
      pubsub.publish('testing', 'This is a test');
    });
  });
});
