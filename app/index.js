const calc = require('./calc');
const _ = require('lodash');

const numbersToAdd = [1,2,3,4,5,6,7];

const results = calc.sum(numbersToAdd);

console.log(`The results are ${results}`);