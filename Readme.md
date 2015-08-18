# Feiertage.js

[![NPM version](http://img.shields.io/npm/v/async.svg)](https://www.npmjs.org/package/feiertagejs)


Feiertage.js is a small npm module to calculate German holidays for each Bundesland.
Use with [Node.js](http://nodejs.org) and installable via `npm install feiertagejs`,
it can also be used directly in the browser.

Feiertage.js is installable via:

- [bower](http://bower.io/): `bower install feiertagejs`
- [npm](http://npm.io/): `npm install feiertagejs`



This script works with Node.js, AMD / RequireJS and directly via script tag.
## Quick Examples

```javascript

var today = new Date(); // now

feiertagejs.isHoliday( today, 'BW');
// probably false, because you are working ;)


feiertagejs.getHolidays( 2015, 'BW');
// returns an array of Holidays as date objects
// Array [ Date, Date, Date, ... ]
// [ Fri Apr 03 2015 00:00:00 GMT+0200 (CEST),  Fri Dec 25 2015 00:00:00 GMT+0100 (CET), ...]

```

# Regions

The following short forms were used for the regions:


 Bundesland:
 * 	BE: Berlin
 * 	BW: Baden-Württemberg
 * 	BY: Bayern
 * 	BB: Brandenburg
 * 	HB: Bremen
 * 	HH: Hamburg
 * 	HE: Hessen
 * 	MV: Mecklenburg-Vorpommern
 * 	NI: Niedersachsen
 * 	NW: Nordrhein-Westfalen
 * 	RP: Rheinland-Pfalz
 * 	SL: Saarland
 * 	SN: Sachsen
 * 	ST: Sachsen-Anhalt
 * 	SH: Schleswig-Holstein
 * 	TH: Thüringen

# Open todos

* Performance: The engine cacluates all holidays on each call, this will be optimized in the near future.
* noticed a similar module: todo: compare results https://github.com/wtfuii/german-holiday/blob/master/german-holiday.js

# Feedback

If you have any questions, feel free to open an issue.
