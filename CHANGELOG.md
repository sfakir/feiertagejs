# Changelog
Version 1.4.0 // 29th Dec 2023

* [Enhancement] Added regions field to holday entity
* [Migration] Depreacted trans() method, merged to translate()
* [Migration] Updated depencenies

Version 1.3.9 // 22th May 2023

* [Bugfix] Added Augsburg to index.d.ts

Version 1.3.8 // 19th May 2023

* [Enhancement] Upgraded to ESM and commonjs package


Version 1.3.3 // 23rd November 2022

* [Enhancement] Added Reformationstag for SH

Version 1.3.1 // 31st December 2021

* [Bugfix] For specific holiday as mentioned in Issue #46

Version 1.3.0 // 16th January 2021

* Typescript first implementation
* Docs updated
* Region/Test for Augsburgfeiertag added



Version 1.2.7 // 27th October 2019

* issue #33 added  'Reformationstag' for Hamburg and Bremen.


Version 1.2.6. // 27th March 2019

* issue #28: made toUtcTimestamp immutable;

Version 1.2.5. // 16th March 2019 

* updated all devdependencies

Version 1.2.4 // 25th Feburary 2019

* added Weltfrauentag to Berlin


Version 1.2.3 // 21st January 2019

* fix: Maria Himmelfahrt BY and SL
* Refactoring (thetric)
* devDepency updates (thetric)


Version 1.2.2 // 7th February 2018

* fix: Maria Himmelfahrt BY and SL
* Refactoring (thetric)
* devDepency updates (thetric)

Version 1.2.0 // 14th October 2017

* Breaking: Dropped support for Node 0.12.x (!)
* 100% Code Coverage for testing
* Migrates the source code to Flow
* creates UMD (for browsers, Node) and additional ES Modules (for bundlers like rollup, webpack)
* adds a script to generate an API doc
* code coverage (text-summary in the console, html reports)
* adds EsLint
* adds prettier - a code formatter.


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


