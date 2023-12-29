# Feiertage.js

[![npm version](https://badge.fury.io/js/feiertagejs.svg)](https://badge.fury.io/js/feiertagejs)
[![Build Status](https://travis-ci.org/sfakir/feiertagejs.svg?branch=master)](https://travis-ci.org/sfakir/feiertagejs)

Feiertage.js is a small _typescript_ npm module without dependencies to calculate German holidays for each Bundesland.

## Installation

- [yarn](https://yarnpkg.com/en/): `yarn add feiertagejs`
- [npm](https://www.npmjs.com/): `npm install feiertagejs`
- [bower](https://bower.io/): `bower install feiertagejs` _outdated!_
- [Plain Javascript](http://extern.fakir.it/feiertagejs/feiertagejs.zip) _outdated!_

## Quick Examples

### ES Modules (Typescript/Javasript)

The prefered whay is to directly import the typescript module. However, you can also use .js.
Please find here some examples and full api [here](docs.md).

```javascript
import { getHolidays, isHoliday, isSpecificHoliday } from 'feiertagejs';

const today = new Date();

// is today a holiday?
isHoliday(today, 'BW'); // false --  probably false, because you are working ;)

// check if a day is a specific holiday
isSpecificHoliday(today, 'CHRISTIHIMMELFAHRT', 'ALL'); // true | false

// get all holiday for a single year: getHolidays()
// returns an array of "Holiday" Objects. Please see the docs.md for all properties.
const holidays2023 = getHolidays('2023', 'BUND');

holidays2023[0].date // === Date("2023-01-01");
holidays2023[0].name // 'NEUJAHRSTAG' (constant)
holidays2023[0].translate('de') // German translation: Neujahrstag
holidays2023[0].equals(date) // Compare days only (ignore time)
```

One entry of the array contains:

```javascript
[{
    name: 'CHRISTIHIMMELFAHRT',
    date: new Date('2023-05-17T22:00:00.000Z'),
    dateString: '2023-05-18',
    regions: [
      'BW',  'BY',   'BE',
      'BB',  'HB',   'HE',
      'HH',  'MV',   'NI',
      'NW',  'RP',   'SL',
      'SN',  'ST',   'SH',
      'TH',  'BUND', 'AUGSBURG',
      'ALL'
    ],
    translate: [Function: translate],
    getNormalizedDate: [Function: getNormalizedDate],
    equals: [Function: equals]
  }
]

```

## API doc

The full API doc can be found [here](docs.md).

## Feedback and Questions

You have two options two give feedback or ask questions:

- Comment the official release [post](https://fakir.tech/de/feiertage-js-deutsche-feiertage-fuer-node-js-und-browser-javascript/)
- Open issues or pullrequests on [github](https://github.com/sfakir/feiertagejs)

## Contributors

Thank you for contributing:

- thetric
- SteveOswald

## Feedback

If you have any questions, feel free to open an issue.
