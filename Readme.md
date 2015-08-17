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

feiertagejs.isHoliday( today, 'BW'); // probably false if you were working ;)

feiertagejs.getHolidays( 2015, 'BW');


```

# Regions

The following short forms were used for the regions:


 Bundesland:
 * 	BW :Baden-Württemberg
 * 	BY :Bayern
 * 	BE :Berlin
 * 	BB :Brandenburg
 * 	HB :Bremen
 * 	HH :Hamburg
 * 	HE :Hessen
 * 	MV :Mecklenburg-Vorpommern
 * 	NI :Niedersachsen
 * 	NW :Nordrhein-Westfalen
 * 	RP :Rheinland-Pfalz
 * 	SL :Saarland
 * 	SN :Sachsen
 * 	ST :Sachsen-Anhalt
 * 	SH :Schleswig-Holstein
 * 	TH :Thüringen


# Feedback

If you have any questions, feel free to open an issue.
