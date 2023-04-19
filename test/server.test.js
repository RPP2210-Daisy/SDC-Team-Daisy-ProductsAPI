const assert = require('chai').assert;

const sum = (a, b) => a + b;

it('1 + 1 should = 2', () => {
  assert.equal(sum(1, 1), 2);
});
