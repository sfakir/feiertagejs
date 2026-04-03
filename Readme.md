# Feiertage.js

[![npm version](https://badge.fury.io/js/feiertagejs.svg)](https://badge.fury.io/js/feiertagejs)
[![Build Status](https://travis-ci.org/sfakir/feiertagejs.svg?branch=master)](https://travis-ci.org/sfakir/feiertagejs)

Feiertage.js is a small _typescript_ npm module without dependencies to calculate German holidays for each Bundesland.

## Installation

- [pnpm](https://pnpm.io/): `pnpm add feiertagejs`
- [npm](https://www.npmjs.com/): `npm install feiertagejs`
- [yarn](https://yarnpkg.com/en/): `yarn add feiertagejs`


If you are looking for a day.js plugin find it in [this repository](https://github.com/fakir-tech/dayjs-feiertage).


## Quick Examples

### ES Modules (Typescript/Javasript)

The prefered way is to directly import the typescript module. However, you can also use .js.
Please find here some examples and full api [here](docs.md).

```javascript
import { getHolidays, isHoliday, isSpecificHoliday } from 'feiertagejs';

const today = new Date();

// is today a holiday?
isHoliday(today, 'BW'); // false --  probably false, because you are working ;)

// date-only checks without timezone handling
isHoliday('2025-12-25', 'BW'); // true

// check if a day is a specific holiday
isSpecificHoliday(today, 'CHRISTIHIMMELFAHRT', 'ALL'); // true | false
isSpecificHoliday('2025-12-25', 'ERSTERWEIHNACHTSFEIERTAG', 'ALL'); // true

// get all holiday for a single year: getHolidays()
// returns an array of "Holiday" Objects. Please see the docs.md for all properties.
const holidays2023 = getHolidays('2023', 'BUND');

holidays2023[0].date // Date object
holidays2023[0].dateString // '2023-01-01' (in German timezone)
holidays2023[0].name // 'NEUJAHRSTAG' (constant)
holidays2023[0].translate('de') // German translation: Neujahrstag
holidays2023[0].equals(date) // Compare days only (ignore time)
```

One entry of the array contains:

```javascript
[{
    name: 'CHRISTIHIMMELFAHRT',
    date: new Date('2023-05-18T10:00:00.000Z'),
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

## Timezone Handling

**All dates are interpreted in German timezone (Europe/Berlin).**

This means:
- `new Date('2025-05-28T23:00:00Z')` (UTC) is `2025-05-29 01:00` in Germany → recognized as **May 29th**
- The library correctly handles CET (UTC+1) and CEST (UTC+2) daylight saving time

### Creating Dates

You can pass dates in several ways:

```javascript
// Option 1: Plain date string (recommended if you only care about YYYY-MM-DD)
isHoliday('2025-12-25', 'BY');

// Option 2: Regular Date object (interpreted in German timezone)
isHoliday(new Date(), 'BY');

// Option 3: ISO string with timezone for exact timestamps
isHoliday(new Date('2025-12-25T00:00:00+01:00'), 'BY'); // Christmas in CET

// Option 4: UTC date at noon (timezone-safe for any server location)
const christmas = new Date(Date.UTC(2025, 11, 25, 12, 0, 0));
isHoliday(christmas, 'BY');
```

### Recommendation

- If you want to check whether a calendar date like `YYYY-MM-DD` is a holiday and do not care about timestamp semantics, pass a string such as `isHoliday('2025-12-25', 'BY')`.
- If you are working with real timestamps, continue passing `Date` objects. They are interpreted in German timezone (`Europe/Berlin`).
- For server-side code that constructs `Date` objects manually, prefer UTC dates at noon or ISO strings with explicit timezone to avoid ambiguity.

This string form was added to keep the API ergonomic and backward-compatible for applications that only care about the German calendar date.

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
