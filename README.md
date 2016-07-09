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

### Basic Usage

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

### Format

Default format is `YYYY-MM-DD HH:mm:ss` use [moment.js string parsing format](http://momentjs.com/docs/#/parsing/string-format/).

```
const date = new DateUtil('20-03-2015 21:30', { format: 'DD-MM-YYYY HH:mm' });
```

### Timezone

create date from string and custom timezone using [moment-timezone format](http://momentjs.com/timezone/).

```
const date = new DateUtil('2015-03-15', { timezone: 'Asia/Jakarta' });

console.log(date.toMoment().format('z'));
// will print `WIB` because of timezone `Asia/Jakarta`
```

If we want to set default timezone extends the class and make it global or import the extended class when we want to use it.

```
class NewUtil extends DateUtil {
  get timezone() {
    return 'Asia/Jakarta';
  }
}

const date = new DateUtil('2015-03-15'});

console.log(date.toMoment().format('z'));
// will print `WIB` because of timezone `Asia/Jakarta`
```

### Range

Create date range with default interval and granularity.

```
const start = '2016-01-01';
const end = '2016-02-01';

// init range object
const range = new Range(start, end);

// create default (daily) array of DateUtil object
const list = range.interval().toArray();
```

`list` will become an array of `2016-01-01, 2016-01-02, 2016-01-03, ..., 2016-02-01` and each of them will have time `00:00:00` (start of day) because default granularity is `daily`.

Create list of moment.js or JS Date object.

```
// create array of moment.js object
const list = range.interval().toMomentArray();

// create array of JS Date object
const list = range.interval().toDateArray();
```

Create date range with custom interval and granularity. Format interval using [moment.js add format](http://momentjs.com/docs/#/manipulating/add/)

```
const start = '2016-01-15';
const end = '2016-12-02';

// init range object
const range = new Range(start, end);

// create bi-monthly interval array of DateUtil object
const list = range.interval('M', 2).toArray();
```

`list` will become an array of `2016-01-01, 2016-03-01, 2016-05-01, ..., 2016-11-01`. First element forced to date `1` and so does last element, because it's start of the month. And it skip month `02` since we set to have interval `2` that means `bi-monthly`.

## License
[MIT](https://github.com/lividum/hot-date/blob/master/LICENSE)
