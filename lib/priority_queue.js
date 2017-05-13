const Q = require('q');

const RedisService = require('./index');

module.exports = class PriorityQueue extends RedisService {

  constructor(config) {
    super(config);
  }

  add(key, score, value) {
    return this.execute('zadd', [key, score, value]);
  }
  
  update(key, score, value) {
    console.warn("Not implemented");
  }

  getSize(key) {
    return this.execute('zcard', [key]);
  }

  exists(key, member) {
    return this.execute('zscore', [key, member])
      .then(result => {
        return !!result;
      });
  }

  remove(key, member) {
    return this.execute('zrem', [key, member]);
  }

  pop(key) {
    const commands = [key, '+inf', '-inf', 'withscores', 'limit', 0, 1];

    // This puts a `lock` on the key
    return this.execute('watch', [key])
      .then((isWatched) => {
        return this.execute('zrevrangebyscore', commands);
      })
      .then(results => {
        if ( !results || !results.length ) {
          throw 'No results';
        }
        const member = results && results[0]; 
        const promise = this.multi({'zrem': [key, member]});
        return Q.all([ member, promise ])
          .spread((value, result) => {
            // If there's a result, return 
            // else, keep trying
            if ( result && result[0] ) {
              return { value, result };
            } else {
              return this.pop(key);
            }
          });
      })
      .catch(err => {
        console.error('Error in pop()', err);
      });
  }

};
