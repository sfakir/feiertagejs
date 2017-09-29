# Feiertage.js

[![npm version](https://badge.fury.io/js/feiertagejs.svg)](https://badge.fury.io/js/feiertagejs)
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
holidays2016[0].equals(date) // Compare days only (ignore time)


```

# Changelog

Version 1.1.7 // 25th September 2017

* added getHolidayByDate(date, region) method


Version 1.1.5 // 27th August 2017

* Compatibility issues with DateJS solved
* Buss- und Betttag cacluation replaced
* New Unit tests for 2017
* Deprecated isMariaHimmelfahrt removed; please use feiertagejs.isSpecificHoliday();
* Added timezone independent 'dateString' attribute of Feiertag Object; replaced equals method



Version 1.1.4 // 29th August 2016

* Reformationstag 2017 is a national holiday + Unittests
* Added .equals() method to compare date.


Version 1.1.1 // 16th August 2016

* added Translation functionality, so you can add your own labels/language.
* added language fallback to German



Version 1.1.0 // 23rd May 2016

*  *interface change:* getHolidays(2016,'BW') => Does not return an Date array anymore, but an Object array.

* rewrote internal logic, added names and text translation
* added getHolidays()
* added getSpecificHolidays
* addded constants for every holiday
* improved interal cache
* added all as region



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


### getHolidayByDate

Finds a specfic holiday by date or null if the date is no holiday.

Return Holiday Object | null

**Parameter**:

date: Date
region (optional): String two digit region code (see regions)

*Example*:
```javascript 
getHolidays(date, region)
var heiligeDreiKoenige = new Date(2015, 0, 6);
var holiday = feiertagejs.getHolidayByDate(heiligeDreiKoenige, 'BY');

holiday.date // = Date("2015-01-06");
holiday.dateString // = '2015-01-06';
holiday.name // 'HEILIGEDREIKOENIGE' (constant)
holiday.trans() // German translation


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
holidays2016[0].dateString // = '2016-01-01';
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



### Languagemethods: addTranslation

adds a translation for the holidays (e.g. english). This also allows to override the German names.
hint: Interpolates German for missing translations

**Parameter**:

isoCode: String
object: Key-Value Pairs for the translation

*Example*:
```javascript 
var translation = {
    NEUJAHRSTAG: "New Years Eve",
    HEILIGEDREIKOENIGE: "Holy Three Kings",
   ...
    }
feiertagejs.addTranslation('en', translation);
feiertagejs.setLanguage('en');
```


### Languagemethods: .trans() with language


**Parameter**:

isoCode: String


*Example*:
```javascript 
var holidays2016 = feiertagejs.getHolidays(2016, 'BW')
holidays2016[0].trans('en') \\ if you added a translation, this is the english translation
```


### Languagemethods: .equals(date)


**Parameter**:

date: String


*Example*:
```javascript 
var holidays2016 = feiertagejs.getHolidays(2016, 'BW')
holidays2016[0].equals(new Date()) \\ false, because today is not the first holiday :)
```



# Contributors

Thank you for contributing:

* thetric


# Feedback

If you have any questions, feel free to open an issue.
