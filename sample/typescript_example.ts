import { isHoliday, isSpecificHoliday } from '../src/feiertage';
import { getHolidays } from '../src/feiertage';

// get Holidays in 2021
const holidaysIn2021 = getHolidays(2021, 'ALL');
console.log({ holidaysIn2021 });

const today = new Date();
console.log(isHoliday(today, 'BW'));
// probably false, because you are working ;)

// check if a day is a specific holiday:
console.log(isSpecificHoliday(today, 'CHRISTIHIMMELFAHRT', 'ALL'));

// get all holiday for a single year: getHolidays()
// returns an array of objects [ {name: '', date: ''} ,...]

const holidays2018 = getHolidays('2018', 'BUND');

const date = new Date();
console.log('date', holidays2018[0].dateString); // = "2018-01-01"
console.log('name', holidays2018[0].name); // 'NEUJAHRSTAG' (constant)
console.log('translation', holidays2018[0].translate()); // German translation: Neujahrstag
console.log('equals?', holidays2018[0].equals(date)); // Compare days only (ignore time)
