/*!
 * feiertage.js
 * @repository https://github.com/sfakir/feiertagejs
 * @docs https://github.com/sfakir/feiertagejs/blob/master/docs.md
 *
 * Copyright 2015-2018 Simon Fakir
 * Released under the MIT license
 */

//
// Additional readings
// - how to format a javascript date: http://blog.stevenlevithan.com/archives/date-time-format
// - the right javascript date: http://stackoverflow.com/questions/10286204/the-right-json-date-format
//

import { germanTranslations } from './german-translations';
import { Holiday } from './holiday';
import { allHolidays, HolidayType } from './holiday-type';
import { allRegions, Region } from './regions';

// translations

const defaultLanguage: string = 'de';
let currentLanguage: string = defaultLanguage;

/**
 * Map of {@link HolidayType} to translation string.
 */
export type TranslationTable = { [key in HolidayType]?: string };

const translations: { [key: string]: TranslationTable } = {
  de: germanTranslations,
};

/**
 * adds a translation for the holidays (e.g. english).
 * This also allows to override the German names.
 * Hint: Interpolates German for missing translations
 * @param {string} isoCode of the new language
 * @param {TranslationTable} newTranslation  map of {HolidayType} to translation stringg
 */
export function addTranslation(
  isoCode: string,
  newTranslation: TranslationTable,
): void {
  const code = isoCode.toLowerCase();
  const defaultTranslation = translations[defaultLanguage];
  let missingFields = false;

  // fill new Translation with default Language
  for (const holiday of allHolidays) {
    if (!newTranslation[holiday]) {
      missingFields = true;
      newTranslation[holiday] = defaultTranslation[holiday];
    }
  }
  if (missingFields) {
    console.warn(
      '[feiertagejs] addTranslation: you did not add all holidays in your translation! Took German as fallback',
    );
  }

  translations[code] = newTranslation;
}

/**
 * Set a language to default language
 * @param {string} isoCode
 */
export function setLanguage(isoCode: string): void {
  const code = isoCode.toLowerCase();
  if (!translations[code]) {
    throw new TypeError(
      `[feiertagejs] tried to set language to ${code} but the translation is missing. Please use addTranslation(isoCode,object) first`,
    );
  }
  currentLanguage = isoCode;
}

/**
 * Get currently set language
 * @returns {string}
 */
export function getLanguage(): string {
  return currentLanguage;
}

// holidays api

/**
 * Checks if a specific date is sunday or holiday.
 * @param date
 * @param region
 * @returns {boolean}
 */
export function isSunOrHoliday(date: Date, region: Region): boolean {
  checkRegion(region);
  return date.getDay() === 0 || isHoliday(date, region);
}

/**
 * Check is specific date is holiday.
 * @param date
 * @param {Region} region two character {@link Region} code
 * @returns {boolean}
 */
export function isHoliday(date: Date, region: Region): boolean {
  checkRegion(region);

  const year = date.getFullYear();
  const internalDate = toUtcTimestamp(date);
  const holidays = getHolidaysAsUtcTimestamps(year, region);

  return holidays.indexOf(internalDate) !== -1;
}

export function getHolidayByDate(
  date: Date,
  region: Region = 'ALL',
): Holiday | void {
  checkRegion(region);
  const holidays = getHolidaysOfYear(date.getFullYear(), region);
  return holidays.find(holiday => holiday.equals(date));
}

// additional runtime checks

/**
 * Checks if the given region is a valid {@link Region}.
 *
 * @param region {@link Region} to check
 * @throws {Error}
 * @private
 */
function checkRegion(region?: Region): void {
  if (region === null || region === undefined) {
    throw new Error(`Region must not be undefined or null`);
  }
  if (allRegions.indexOf(region) === -1) {
    throw new Error(
      `Invalid region: ${region}! Must be one of ${allRegions.toString()}`,
    );
  }
}

/**
 * Checks if the given holidayName is a valid {@link HolidayType}.
 * @param holidayName {@link HolidayType} to check
 * @throws {Error}
 * @private
 */
function checkHolidayType(holidayName?: HolidayType): void {
  if (holidayName === null || holidayName === undefined) {
    throw new TypeError('holidayName must not be null or undefined');
  }
  if (allHolidays.indexOf(holidayName) === -1) {
    throw new Error(
      `feiertage.js: invalid holiday type "${holidayName}"! Must be one of ${allHolidays.toString()}`,
    );
  }
}

export function isSpecificHoliday(
  date: Date,
  holidayName: HolidayType,
  region: Region = 'ALL',
): boolean {
  checkRegion(region);
  checkHolidayType(holidayName);
  const holidays = getHolidaysOfYear(date.getFullYear(), region);
  return holidays.find(holiday => holiday.equals(date)) !== undefined;
}

/**
 * Returns all holidays of a year in a {@link Region}.
 * @param year
 * @param region
 * @returns {Array.<Holiday>}
 */
export function getHolidays(year: number | string, region: Region): Holiday[] {
  let y: number;
  if (typeof year === 'string') {
    y = parseInt(year, 10);
  } else {
    y = year;
  }

  checkRegion(region);
  return getHolidaysOfYear(y, region);
}

/**
 *
 * @param year
 * @param region
 * @returns {*}
 * @private
 */
function getHolidaysAsUtcTimestamps(year: number, region: Region): number[] {
  const holidays = getHolidaysOfYear(year, region);
  return holidays.map(holiday => toUtcTimestamp(holiday.date));
}

/**
 *
 * @param year
 * @param region
 * @returns {{objects: Array.<Holiday>, integers}}
 * @private
 */
function getHolidaysOfYear(year: number, region: Region): Holiday[] {
  const easterDate = getEasterDate(year);
  const karfreitag = addDays(new Date(easterDate.getTime()), -2);
  const ostermontag = addDays(new Date(easterDate.getTime()), 1);
  const christiHimmelfahrt = addDays(new Date(easterDate.getTime()), 39);
  const pfingstsonntag = addDays(new Date(easterDate.getTime()), 49);
  const pfingstmontag = addDays(new Date(easterDate.getTime()), 50);

  const holidays: Holiday[] = [
    ...getCommonHolidays(year),
    newHoliday('KARFREITAG', karfreitag),
    newHoliday('OSTERMONTAG', ostermontag),
    newHoliday('CHRISTIHIMMELFAHRT', christiHimmelfahrt),
    newHoliday('PFINGSTMONTAG', pfingstmontag),
  ];

  addHeiligeDreiKoenige(year, region, holidays);
  addEasterAndPfingsten(year, region, easterDate, pfingstsonntag, holidays);
  addFronleichnam(region, easterDate, holidays);
  addMariaeHimmelfahrt(year, region, holidays);
  addReformationstag(year, region, holidays);
  addAllerheiligen(year, region, holidays);
  addBussUndBetttag(year, region, holidays);
  addWeltkindertag(year, region, holidays);
  addWeltfrauenTag(year, region, holidays);

  return holidays.sort(
    (a: Holiday, b: Holiday) => a.date.getTime() - b.date.getTime(),
  );
}

function getCommonHolidays(year: number): Holiday[] {
  return [
    newHoliday('NEUJAHRSTAG', makeDate(year, 1, 1)),
    newHoliday('TAG_DER_ARBEIT', makeDate(year, 5, 1)),
    newHoliday('DEUTSCHEEINHEIT', makeDate(year, 10, 3)),
    newHoliday('ERSTERWEIHNACHTSFEIERTAG', makeDate(year, 12, 25)),
    newHoliday('ZWEITERWEIHNACHTSFEIERTAG', makeDate(year, 12, 26)),
  ];
}

function addHeiligeDreiKoenige(
  year: number,
  region: Region,
  feiertageObjects: Holiday[],
): void {
  if (
    region === 'BW' ||
    region === 'BY' ||
    region === 'ST' ||
    region === 'ALL'
  ) {
    feiertageObjects.push(
      newHoliday('HEILIGEDREIKOENIGE', makeDate(year, 1, 6)),
    );
  }
}

function addEasterAndPfingsten(
  year: number,
  region: Region,
  easterDate: Date,
  pfingstsonntag: Date,
  feiertageObjects: Holiday[],
): void {
  if (region === 'BB' || region === 'ALL') {
    feiertageObjects.push(
      newHoliday('OSTERSONNTAG', easterDate),
      newHoliday('PFINGSTSONNTAG', pfingstsonntag),
    );
  }
}

function addFronleichnam(
  region: Region,
  easterDate: Date,
  holidays: Holiday[],
): void {
  if (
    region === 'BW' ||
    region === 'BY' ||
    region === 'HE' ||
    region === 'NW' ||
    region === 'RP' ||
    region === 'SL' ||
    region === 'ALL'
  ) {
    const fronleichnam = addDays(new Date(easterDate.getTime()), 60);
    holidays.push(newHoliday('FRONLEICHNAM', fronleichnam));
  }
}

function addMariaeHimmelfahrt(
  year: number,
  region: Region,
  holidays: Holiday[],
): void {
  if (region === 'SL' || region === 'BY') {
    holidays.push(newHoliday('MARIAHIMMELFAHRT', makeDate(year, 8, 15)));
  }
}

function addReformationstag(
  year: number,
  region: Region,
  holidays: Holiday[],
): void {
  if (
    year === 2017 ||
    region === 'BB' ||
    region === 'MV' ||
    region === 'SN' ||
    region === 'ST' ||
    region === 'TH' ||
    region === 'ALL'
  ) {
    holidays.push(newHoliday('REFORMATIONSTAG', makeDate(year, 10, 31)));
  }
}

function addAllerheiligen(
  year: number,
  region: Region,
  holidays: Holiday[],
): void {
  if (
    region === 'BW' ||
    region === 'BY' ||
    region === 'NW' ||
    region === 'RP' ||
    region === 'SL' ||
    region === 'ALL'
  ) {
    holidays.push(newHoliday('ALLERHEILIGEN', makeDate(year, 11, 1)));
  }
}

function addBussUndBetttag(
  year: number,
  region: Region,
  holidays: Holiday[],
): void {
  if (region === 'SN' || region === 'ALL') {
    // @todo write test
    const bussbettag = getBussBettag(year);
    holidays.push(
      newHoliday(
        'BUBETAG',
        makeDate(
          bussbettag.getUTCFullYear(),
          bussbettag.getUTCMonth() + 1,
          bussbettag.getUTCDate(),
        ),
      ),
    );
  }
}

function addWeltkindertag(
  year: number,
  region: Region,
  holidays: Holiday[],
): void {
  if (year >= 2019 && (region === 'TH' || region === 'ALL')) {
    holidays.push(newHoliday('WELTKINDERTAG', makeDate(year, 9, 20)));
  }
}


function addWeltfrauenTag(
  year: number,
  region: Region,
  feiertageObjects: Holiday[],
): void {
  if (region !== 'BE') {
    return;
  }
  if (year < 2018) {
    return;
  }
  feiertageObjects.push(
    newHoliday('WELTFRAUENTAG', makeDate(year, 3, 8)),
  );
}


/**
 * Calculates the Easter date of a given year.
 * @param year {number}
 * @returns {Date} Easter date
 * @private
 */
function getEasterDate(year: number): Date {
  const C = Math.floor(year / 100);
  // tslint:disable:binary-expression-operand-order
  // tslint generates false positives in the following blocks
  const N = year - 19 * Math.floor(year / 19);
  const K = Math.floor((C - 17) / 25);
  let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
  I -= 30 * Math.floor(I / 30);
  I -=
    Math.floor(I / 28) *
    (1 -
      Math.floor(I / 28) *
      Math.floor(29 / (I + 1)) *
      Math.floor((21 - N) / 11));
  let J = year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4);
  J -= 7 * Math.floor(J / 7);
  const L = I - J;
  const M = 3 + Math.floor((L + 40) / 44);
  const D = L + 28 - 31 * Math.floor(M / 4);
  // tslint:enable:binary-expression-operand-order
  return new Date(year, M - 1, D);
}

/**
 * Computes the "Buss- und Bettag"'s date.
 * @param jahr {number}
 * @returns {Date} the year's "Buss- und Bettag" date
 * @private
 */
function getBussBettag(jahr: number): Date {
  const weihnachten = new Date(jahr, 11, 25, 12, 0, 0);
  const ersterAdventOffset = 32;
  let wochenTagOffset = weihnachten.getDay() % 7;

  if (wochenTagOffset === 0) {
    wochenTagOffset = 7;
  }

  const tageVorWeihnachten = wochenTagOffset + ersterAdventOffset;

  let bbtag = new Date(weihnachten.getTime());
  bbtag = addDays(bbtag, -tageVorWeihnachten);

  return bbtag;
}

/**
 * Adds {@code days} days to the given {@link Date}.
 * @param date
 * @param days
 * @returns {Date}
 * @private
 */
function addDays(date: Date, days: number): Date {
  const changedDate = new Date(date);
  changedDate.setDate(date.getDate() + days);
  return changedDate;
}

/**
 * Creates a new {@link Date}.
 * @param year
 * @param naturalMonth month (1-12)
 * @param day
 * @returns {Date}
 * @private
 */
function makeDate(year: number, naturalMonth: number, day: number): Date {
  return new Date(year, naturalMonth - 1, day);
}

/**
 *
 * @param name
 * @param date
 * @returns {Holiday}
 * @private
 */
function newHoliday(name: HolidayType, date: Date): Holiday {
  return {
    name,
    date,
    dateString: localeDateObjectToDateString(date),
    trans(lang: string = currentLanguage): string | undefined {
      return lang === undefined || lang === null
        ? undefined
        : translations[lang][this.name];
    },
    getNormalizedDate(): number {
      return toUtcTimestamp(this.date);
    },
    equals(otherDate: Date): boolean {
      const dateString = localeDateObjectToDateString(otherDate);
      return this.dateString === dateString;
    },
  };
}

/**
 *
 * @param date
 * @returns {string}
 * @private
 */
function localeDateObjectToDateString(date: Date): string {
  const normalizedDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60 * 1000,
  );
  normalizedDate.setUTCHours(0, 0, 0, 0);
  return normalizedDate.toISOString().slice(0, 10);
}

/**
 * Returns the UTC timestamp of the given date with hours, minutes, seconds, and milliseconds set to zero.
 * @param date
 * @returns {number} UTC timestamp
 */
function toUtcTimestamp(date: Date): number {
  const internalDate = new Date(date);
  internalDate.setHours(0, 0, 0, 0);
  return internalDate.getTime();
}
