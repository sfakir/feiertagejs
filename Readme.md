# Feiertage.js

[![npm version](https://badge.fury.io/js/feiertagejs.svg)](https://badge.fury.io/js/feiertagejs)
[![Build Status](https://travis-ci.org/sfakir/feiertagejs.svg?branch=master)](https://travis-ci.org/sfakir/feiertagejs)


Feiertage.js is a small npm module to calculate German holidays for each Bundesland.

## Installation

- [yarn](https://yarnpkg.com/en/): `yarn add feiertagejs`
- [npm](https://www.npmjs.com/): `npm install feiertagejs`
- [bower](https://bower.io/): `bower install feiertagejs`

This package provides two bundles:

* an **UMD bundle** (_default_, for Node.js and direct usage in the browser)
* **ES Modules** (automatically picked up by ES module-aware tools like Webpack, Rollup) with additional [Flow](https://github.com/facebook/flow) definitions 

## Quick Examples

### ES Modules

```javascript
import { getHolidays, isHoliday, isSpecificHoliday } from 'feiertagejs';

const today = new Date();

console.log(isHoliday(today, 'BW'));
// probably false, because you are working ;)

// check if a day is a specific holiday:
console.log(isSpecificHoliday(today, 'CHRISTIHIMMELFAHRT'));

// get all holiday for a single year: getHolidays()
// returns an array of objects [ {name: '', date: ''} ,...]

const holidays2018 = getHolidays('2018','BUND');

console.log('date', holidays2018[0].date); // = Date("2016-01-01");
console.log('name', holidays2018[0].name); // 'NEUJAHRSTAG' (constant)
console.log('translation', holidays2018[0].trans()); // German translation: Neujahrstag
console.log('equals?', holidays2018[0].equals(date)); // Compare days only (ignore time)
```

### Usage in Node.js

```javascript
var feiertagejs = require('feiertagejs');

var today = new Date();

console.log(feiertagejs.isHoliday(today, 'BW'));
// probably false, because you are working ;)

// check if a day is a specific holiday:
console.log(feiertagejs.isSpecificHoliday(today, 'CHRISTIHIMMELFAHRT'));

// get all holiday for a single year: getHolidays()
// returns an array of objects [ {name: '', date: ''} ,...]

var holidays2018 = feiertagejs.getHolidays('2018', 'BUND');

console.log('date', holidays2018[0].date); // = Date("2016-01-01");
console.log('name', holidays2018[0].name); // 'NEUJAHRSTAG' (constant)
console.log('translation', holidays2018[0].trans()); // German translation: Neujahrstag
console.log('equals?', holidays2018[0].equals(date)); // Compare days only (ignore time)
```

# API doc

The full API doc can be found [here](docs.md).
Note that although the documentation uses custom Flow types (e.g. `HolidayType`) you are _not_ required to use Flow in your code (see "Usage in Node.js").

# Feedback and Questions

You have two options two give feedback:

* Open issues or pullrequests on [github](https://github.com/sfakir/feiertagejs)
* Comment the official release [post](http://www.fakir.it/feiertage-js-feiertage-fuer-node-js-und-im-browser/), unfortunately in German.


# Contributors

Thank you for contributing:

* thetric


# Feedback

If you have any questions, feel free to open an issue.
