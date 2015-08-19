var feiertagejs = require('../lib/feiertage.js');


var feiertageBW =  feiertagejs.getHolidays(2015,'BW');
var feiertageBY =  feiertagejs.getHolidays(2015,'BY');
var isHolidayToday =  feiertagejs.isHoliday(new Date(),'BW');



//console.log(feiertageBW);
console.log(feiertageBY);
console.log(feiertagejs.getCache());

//console.log(isHolidayToday);

