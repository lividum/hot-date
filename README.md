# hot-date
Promise based queue with rich API.

[![Build Status](https://travis-ci.org/lividum/hot-date.svg?branch=master)](https://travis-ci.org/lividum/hot-date)
[![Coverage Status](https://coveralls.io/repos/github/lividum/hot-date/badge.svg?branch=master)](https://coveralls.io/github/lividum/hot-date?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/npm/name/badge.svg)](https://snyk.io/test/npm/name)
[![bitHound Dependencies](https://www.bithound.io/github/lividum/hot-date/badges/dependencies.svg)](https://www.bithound.io/github/lividum/hot-date/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/lividum/hot-date/badges/devDependencies.svg)](https://www.bithound.io/github/lividum/hot-date/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/lividum/hot-date/badges/code.svg)](https://www.bithound.io/github/lividum/hot-date)

## Installation

```$ npm install hot-date --save```

## Example

```
import DateUtil from 'hot-date';
// ES5
// var DateUtil = require('hot-date').Util;

// create date from string
const date = new DateUtil('2015-03-15');

// convert to moment
const mom = date.toMoment();
console.log(mom.format('YYYY-MM-DD'))
// 2015-03-15

// convert to Javascript Date object
const jsDate = date.toDate();
console.log(jsDate instanceof Date);
// true
```

## License
[MIT](https://github.com/lividum/hot-date/blob/master/LICENSE)
