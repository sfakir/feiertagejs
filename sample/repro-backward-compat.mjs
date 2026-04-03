import { isHoliday, getHolidayByDate } from '../build/feiertage.js';

const year = 2025;
const month = 12;
const day = 25;
const region = 'ALL';

const legacyDate = new Date(year, month - 1, day);
const safeGermanDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T12:00:00+01:00`);

function describeInGermanTimezone(date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

console.log('process.env.TZ:', process.env.TZ || '(system default)');
console.log('runtime timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
console.log('');

console.log('Legacy usage: new Date(year, month - 1, day)');
console.log('input meaning:', `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
console.log('legacyDate.toISOString():', legacyDate.toISOString());
console.log('legacyDate in Europe/Berlin:', describeInGermanTimezone(legacyDate));
console.log('isHoliday(legacyDate, "ALL"):', isHoliday(legacyDate, region));
console.log('getHolidayByDate(legacyDate, "ALL"):', getHolidayByDate(legacyDate, region)?.name ?? null);
console.log('');

console.log('Workaround example: explicit German calendar date');
console.log('safeGermanDate.toISOString():', safeGermanDate.toISOString());
console.log('safeGermanDate in Europe/Berlin:', describeInGermanTimezone(safeGermanDate));
console.log('isHoliday(safeGermanDate, "ALL"):', isHoliday(safeGermanDate, region));
console.log('getHolidayByDate(safeGermanDate, "ALL"):', getHolidayByDate(safeGermanDate, region)?.name ?? null);
