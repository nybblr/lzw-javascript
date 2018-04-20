const { deepEqual } = require('assert');
const { encode, decode } = require('./index');

let examples = [
  'hellllllllllo world',
  'banana_bandana',
];

examples.forEach(example =>
  deepEqual(decode(encode(example)), example)
);