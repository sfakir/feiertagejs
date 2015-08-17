var feiertagejs = require('../lib/feiertage.js');


var feiertageBW =  feiertagejs.getHolidays(2015,'BW');
var isHolidayToday =  feiertagejs.isHoliday(new Date(),'BW');

console.log(feiertageBW);
console.log(isHolidayToday);