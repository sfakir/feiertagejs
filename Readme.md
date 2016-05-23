# Feiertage.js

[![NPM version](http://img.shields.io/npm/v/async.svg)](https://www.npmjs.org/package/feiertagejs)
[![Build Status](https://travis-ci.org/sfakir/feiertagejs.svg?branch=master)](https://travis-ci.org/sfakir/feiertagejs)


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


// check if a day is a specific holiday:
feiertagejs.isSpecificHoliday(today, feiertagejs.Holidays.CHRISTIHIMMELFAHRT);


// get all holiday for a single year: getHolidays()
// returns an array of objects [ {name: '', date: ''} ,...]

var holidays2016 = feiertagejs.getHolidays('2016','BUND');

holidays2016[0].date // = Date("2016-01-01");
holidays2016[0].name // 'NEUJAHRSTAG' (constant)
holidays2016[0].trans() // German translation: Neujahrstag


```

# Changelog

Version 1.1.0 // 23rd May 2016

* getHolidays(2016,'BW') => Does not return an Date array anymore, but an Object array.
* rewrote internal logic, added names and text translation
* added getHolidays()
* added getSpecificHolidays
* addded constants for every holiday
* improved interal cache



# Feedback and Questions

You have two options two give feedback:

* Open issues or pullrequests on [github](https://github.com/sfakir/feiertagejs)
* Comment the official release [post](http://www.fakir.it/feiertage-js-feiertage-fuer-node-js-und-im-browser/), unfortunatly in German.


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
 *  BUND: Nation wide holidays*
 *  ALL: This adds all holidays to the list, even if they are only valid in one single region

* Nation wide are the ones which are not region depended and are also available in each single region.
 
# Holidays
Available like this:


# Interfaces

### isHoliday
check is specific date is holiday


**Parameter**:

date: Date Object

region: String two digit region code (see regions)

**Example**:
```javascript 
isHoliday(date,region); 
isHoliday(new Date(), 'BY'); 
``` 

### isSpecificHoliday

**Parameter**:

date: Date Object
holidayName: String
region: String (optional) two digit region code (see regions)

*Example*:
```javascript 
isSpecificHoliday(date, holidayName, region)
feiertagejs.isSpecificHoliday(somedate, feiertagejs.Holidays.CHRISTIHIMMELFAHRT);
```


### getHolidays

list of all holidays
Returns array of objects

**Parameter**:

year: Integer
region: String two digit region code (see regions)

*Example*:
```javascript 
getHolidays(year, region)
var holidays2016 = feiertagejs.getHolidays(2016, 'BW')

holidays2016[0].date // = Date("2016-01-01");
holidays2016[0].name // 'NEUJAHRSTAG' (constant)
holidays2016[0].trans() // German translation: Neujahrstag


```


### isSunOrHoliday
        
checks if a specific date is sunday or holiday.
Returns Boolean

**Parameter**:

date: Date
region: String two digit region code (see regions)


*Example*:
```javascript 
isSunOrHoliday(date, region)
feiertagejs.isSunOrHoliday(new Date(), 'BW')
```



# Open todos

* documentation with jsdoc
* noticed a similar module: todo: compare results https://github.com/wtfuii/german-holiday/blob/master/german-holiday.js


# Run the tests

You are able to run the tests just by typing the following command.

```javascript 
npm test
```







# Feedback

If you have any questions, feel free to open an issue.
