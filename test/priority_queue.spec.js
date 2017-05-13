const assert = require('assert');
const path = require('path');

const PriorityQueue = require('../index').priorityQueue;

describe('PriorityQueue', function() {

  const pq = new PriorityQueue();

  describe('add()', function() {
    it('should add an item to the priority queue', function(done) {
      pq.add('test_queue', 1000, 'testing123')
        .then(test => {
          assert(test);
          done();
        });
    });
    it('should add another item to the priority queue', function(done) {
      pq.add('test_queue', 2, 'testing567')
        .then(test => {
          assert(test);
          done();
        });
    });
  });

  describe('getSize()', function() {
    it('should get the size (how many members) of the priority queue', function(done) {
      pq.getSize('test_queue')
        .then(test => {
          assert(test);
          done();
        });
    });
  });

  describe('pop()', function() {
    it('should pop from the priority queue', function(done) {
      pq.pop('test_queue')
        .then(test => {
          assert(test);
          assert.equal(test.value, 'testing123');
          done();
        }); 
    });
  });

  describe('exists()', function() {
    it('should see item exists in the priority queue', function(done) {
      pq.exists('test_queue', 'testing567')
        .then(test => {
          assert(test);
          done();
        }); 
    });
    it('should see item does not exist in the priority queue', function(done) {
      pq.exists('test_queue', 'doesntexist')
        .then(test => {
          assert.equal(test, false);
          done();
        }); 
    });
  });

  // Do some cleanup
  describe('cleanup with pop()', function() {
    it('should pop from the priority queue', function(done) {
      pq.pop('test_queue')
        .then(test => {
          assert(test);
          assert.equal(test.value, 'testing567');
          done();
        }); 
    });
  });
});


