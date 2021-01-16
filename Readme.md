# Feiertage.js

[![npm version](https://badge.fury.io/js/feiertagejs.svg)](https://badge.fury.io/js/feiertagejs)
[![Build Status](https://travis-ci.org/sfakir/feiertagejs.svg?branch=master)](https://travis-ci.org/sfakir/feiertagejs)


Feiertage.js is a small *typescript* npm module without dependencies to calculate German holidays for each Bundesland.

## Installation

- [yarn](https://yarnpkg.com/en/): `yarn add feiertagejs`
- [npm](https://www.npmjs.com/): `npm install feiertagejs`
- [bower](https://bower.io/): `bower install feiertagejs`
- [Plain Javascript](http://extern.fakir.it/feiertagejs/feiertagejs.zip) *outdated!*


This package provides two bundles:

* **Typescript** This is the prefered way!
* an **UMD bundle** (_default_, for Node.js and direct usage in the browser)
* **ES Modules** (automatically picked up by ES module-aware tools like Webpack, Rollup)

## Quick Examples

### ES Modules (Typescript/Javasript)

The prefered whay is to directly import the typescript module. However, you can also use .js.
Please find here some examples and full api [here](docs.md).


```javascript
import { getHolidays, isHoliday, isSpecificHoliday } from 'feiertagejs';

const today = new Date();

console.log(isHoliday(today, 'BW'));
// probably false, because you are working ;)

// check if a day is a specific holiday:
console.log(isSpecificHoliday(today, 'CHRISTIHIMMELFAHRT','ALL'));

// get all holiday for a single year: getHolidays()
// returns an array of "Holiday" Objects. Please see the docs.md for all properties.
const holidays2018 = getHolidays('2018','BUND');


console.log('date', holidays2018[0].date); // = Date("2018-01-01");
console.log('name', holidays2018[0].name); // 'NEUJAHRSTAG' (constant) 
console.log('translation', holidays2018[0].trans('de')); // German translation: Neujahrstag
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
// returns an array of "Holiday" Objects. Please see the docs.md for all properties.

var holidays2018 = feiertagejs.getHolidays('2018', 'BUND');

console.log('date', holidays2018[0].date); // = Date("2018-01-01");
console.log('name', holidays2018[0].name); // 'NEUJAHRSTAG' (constant)
console.log('translation', holidays2018[0].trans()); // German translation: Neujahrstag
console.log('equals?', holidays2018[0].equals(date)); // Compare days only (ignore time)
```

## API doc

The full API doc can be found [here](docs.md).


## Feedback and Questions

You have two options two give feedback:

* Open issues or pullrequests on [github](https://github.com/sfakir/feiertagejs)
* Comment the official release [post](http://www.fakir.it/feiertage-js-feiertage-fuer-node-js-und-im-browser/), unfortunately in German.


## Contributors

Thank you for contributing:

* thetric
* SteveOswald


## Feedback

If you have any questions, feel free to open an issue.
