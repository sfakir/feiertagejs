/*!
 * feiertage.js
 * @repository https://github.com/sfakir/feiertagejs
 * @docs https://github.com/sfakir/feiertagejs/blob/master/docs.md
 *
 * Copyright 2015-2021 Simon Fakir
 * Released under the MIT license
 */

//
// Additional readings
// - how to format a javascript date: http://blog.stevenlevithan.com/archives/date-time-format
// - the right javascript date: http://stackoverflow.com/questions/10286204/the-right-json-date-format
//

import { englishTranslations } from './translations/english-translations';
import { germanTranslations } from './translations/german-translations';
import { Holiday } from './holiday';
import { allHolidays, HolidayType } from './holiday-type';
import { allRegions, Region } from './regions';

// translations

const defaultLanguage = 'de';
let currentLanguage: string = defaultLanguage;

/**
 * Map of {@link HolidayType} to translation string.
 */
export type TranslationTable = { [key in HolidayType]?: string };

const translations: { [key: string]: TranslationTable } = {
  de: germanTranslations,
  en: englishTranslations,
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
 * Checks if a specific date is sunday or holiday in German timezone.
 * @param date
 * @param region
 * @returns {boolean}
 */
export function isSunOrHoliday(date: Date, region: Region): boolean {
  checkRegion(region);
  // Use German timezone to determine the day of week
  const dayOfWeek = getDayOfWeekInGermanTimezone(date);
  return dayOfWeek === 0 || isHoliday(date, region);
}

/**
 * Gets the day of week (0-6, Sunday-Saturday) in German timezone.
 * @param date
 * @returns {number} Day of week (0 = Sunday, 6 = Saturday)
 * @private
 */
function getDayOfWeekInGermanTimezone(date: Date): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
  });
  const dayStr = formatter.format(date);
  const days: { [key: string]: number } = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return days[dayStr] ?? 0;
}

/**
 * Check is specific date is holiday.
 * @param date
 * @param {Region} region two character {@link Region} code
 * @returns {boolean}
 */
export function isHoliday(date: Date, region: Region): boolean {
  checkRegion(region);

  // Get the year in German timezone, not local timezone
  const year = getYearInGermanTimezone(date);
  // Convert input date to German timezone for comparison
  const internalDate = toGermanTimezoneTimestamp(date);
  const holidays = getHolidaysAsGermanTimezoneTimestamps(year, region);

  return holidays.indexOf(internalDate) !== -1;
}

export function getHolidayByDate(
  date: Date,
  region: Region = 'ALL',
): Holiday | void {
  checkRegion(region);
  // Get the year in German timezone, not local timezone
  const year = getYearInGermanTimezone(date);
  const holidays = getHolidaysOfYear(year, region);
  // Use German timezone conversion for accurate date comparison
  const dateInGermanTz = toGermanTimezoneTimestamp(date);
  return holidays.find((holiday) => {
    const holidayInGermanTz = toGermanTimezoneTimestamp(holiday.date);
    return holidayInGermanTz === dateInGermanTz;
  });
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
  // Get the year in German timezone, not local timezone
  const year = getYearInGermanTimezone(date);
  const holidays = getHolidaysOfYear(year, region);
  // Use German timezone conversion for accurate date comparison
  const dateInGermanTz = toGermanTimezoneTimestamp(date);
  const foundHoliday = holidays.find((holiday) => {
    const holidayInGermanTz = toGermanTimezoneTimestamp(holiday.date);
    return holidayInGermanTz === dateInGermanTz;
  });
  if (!foundHoliday) {
    return false;
  }
  return foundHoliday.name === holidayName;
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
 * Gets all holidays for a year as timestamps normalized to midnight in German timezone.
 * @param {number} year
 * @param region
 * @returns {number[]}
 * @private
 */
function getHolidaysAsGermanTimezoneTimestamps(
  year: number,
  region: Region,
): number[] {
  const holidays = getHolidaysOfYear(year, region);
  return holidays.map((holiday) => toGermanTimezoneTimestamp(holiday.date));
}

/**
 *
 * @param {number} year
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
    newHoliday('KARFREITAG', karfreitag, ['ALL']),
    newHoliday('OSTERMONTAG', ostermontag, ['ALL']),
    newHoliday('CHRISTIHIMMELFAHRT', christiHimmelfahrt, ['ALL']),
    newHoliday('PFINGSTMONTAG', pfingstmontag, ['ALL']),
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

  addRegionalHolidays(year, region, holidays);

  return holidays.sort(
    (a: Holiday, b: Holiday) => a.date.getTime() - b.date.getTime(),
  );
}

function getCommonHolidays(year: number): Holiday[] {
  return [
    newHoliday('NEUJAHRSTAG', makeDate(year, 1, 1), ['ALL']),
    newHoliday('TAG_DER_ARBEIT', makeDate(year, 5, 1), ['ALL']),
    newHoliday('DEUTSCHEEINHEIT', makeDate(year, 10, 3), ['ALL']),
    newHoliday('ERSTERWEIHNACHTSFEIERTAG', makeDate(year, 12, 25), ['ALL']),
    newHoliday('ZWEITERWEIHNACHTSFEIERTAG', makeDate(year, 12, 26), ['ALL']),
  ];
}
function addRegionalHolidays(
  year: number,
  region: Region,
  feiertageObjects: Holiday[],
) {
  if (region === 'AUGSBURG') {
    feiertageObjects.push(
      newHoliday('AUGSBURGER_FRIEDENSFEST', makeDate(year, 8, 8), ['AUGSBURG']),
    );
  }
}
function addHeiligeDreiKoenige(
  year: number,
  region: Region,
  feiertageObjects: Holiday[],
): void {
  const validRegions: Region[] = ['BW', 'BY', 'AUGSBURG', 'ST'];
  if (validRegions.includes(region) || region === 'ALL') {
    feiertageObjects.push(
      newHoliday('HEILIGEDREIKOENIGE', makeDate(year, 1, 6), validRegions),
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
  const validRegions: Region[] = ['BB'];
  if (validRegions.includes(region) || region === 'ALL') {
    feiertageObjects.push(
      newHoliday('OSTERSONNTAG', easterDate, validRegions),
      newHoliday('PFINGSTSONNTAG', pfingstsonntag, validRegions),
    );
  }
}

function addFronleichnam(
  region: Region,
  easterDate: Date,
  holidays: Holiday[],
): void {
  const validRegions: Region[] = ['BW', 'BY', 'AUGSBURG', 'HE', 'NW', 'RP', 'SL'];
  if (validRegions.includes(region) || region === 'ALL') {
    const fronleichnam = addDays(new Date(easterDate.getTime()), 60);
    holidays.push(newHoliday('FRONLEICHNAM', fronleichnam, validRegions));
  }
}

function addMariaeHimmelfahrt(
  year: number,
  region: Region,
  holidays: Holiday[],
): void {
  const validRegions: Region[] = ['SL', 'BY', 'AUGSBURG'];

  if (validRegions.includes(region) || region === 'ALL') {
    holidays.push(
      newHoliday('MARIAHIMMELFAHRT', makeDate(year, 8, 15), validRegions),
    );
  }
}

function addReformationstag(
  year: number,
  region: Region,
  holidays: Holiday[],
): void {
  const validRegions: Region[] = [
    'NI',
    'BB',
    'MV',
    'SN',
    'ST',
    'TH',
    'HB',
    'HH',
    'SH',
  ];
  if (year === 2017 || validRegions.includes(region) || region === 'ALL') {
    holidays.push(
      newHoliday('REFORMATIONSTAG', makeDate(year, 10, 31), validRegions),
    );
  }
}

function addAllerheiligen(
  year: number,
  region: Region,
  holidays: Holiday[],
): void {
  const validRegions: Region[] = ['BW', 'BY', 'NW', 'RP', 'SL', 'AUGSBURG'];
  if (validRegions.includes(region) || region === 'ALL') {
    holidays.push(
      newHoliday('ALLERHEILIGEN', makeDate(year, 11, 1), validRegions),
    );
  }
}

function addBussUndBetttag(
  year: number,
  region: Region,
  holidays: Holiday[],
): void {
  const validRegions: Region[] = ['SN'];
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
        validRegions,
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
    holidays.push(newHoliday('WELTKINDERTAG', makeDate(year, 9, 20), ['TH']));
  }
}

function addWeltfrauenTag(
  year: number,
  region: Region,
  feiertageObjects: Holiday[],
): void {
  if (year <= 2018) {
    return;
  }
  if (region === 'BE' || region === 'ALL') {
    // in Berlin ist der Weltfrauentag ein Feiertag seit 2018
    feiertageObjects.push(newHoliday('WELTFRAUENTAG', makeDate(year, 3, 8), ['MV', 'BE']));
  }
  if (region === 'MV' && year >= 2023) {
    // in MV wird der Weltfrauentag erst ab 2023 eingeführt
    feiertageObjects.push(newHoliday('WELTFRAUENTAG', makeDate(year, 3, 8), ['MV', 'BE']));
  }
}

/**
 * Calculates the Easter date of a given year.
 * @param year {number}
 * @returns {Date} Easter date at noon UTC
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
  // Use noon UTC to ensure timezone independence
  return new Date(Date.UTC(year, M - 1, D, 12, 0, 0, 0));
}

/**
 * Computes the "Buss- und Bettag"'s date.
 * @param jahr {number}
 * @returns {Date} the year's "Buss- und Bettag" date at noon UTC
 * @private
 */
function getBussBettag(jahr: number): Date {
  // Use noon UTC to ensure timezone independence
  const weihnachten = new Date(Date.UTC(jahr, 11, 25, 12, 0, 0, 0));
  const ersterAdventOffset = 32;
  let wochenTagOffset = weihnachten.getUTCDay() % 7;

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
 * Uses UTC methods to ensure timezone independence.
 * @param date
 * @param days
 * @returns {Date}
 * @private
 */
function addDays(date: Date, days: number): Date {
  const changedDate = new Date(date);
  changedDate.setUTCDate(date.getUTCDate() + days);
  return changedDate;
}

/**
 * Creates a new {@link Date} for a holiday.
 * 
 * Uses noon UTC to ensure the date is unambiguous across all timezones.
 * Noon UTC is always the same calendar day in German timezone (UTC+1/+2),
 * regardless of the server's local timezone.
 * 
 * @param year
 * @param naturalMonth month (1-12)
 * @param day
 * @returns {Date}
 * @private
 */
function makeDate(year: number, naturalMonth: number, day: number): Date {
  // Use noon UTC to ensure the date is timezone-independent
  // Noon UTC = 13:00 CET or 14:00 CEST, always the same calendar day in Germany
  return new Date(Date.UTC(year, naturalMonth - 1, day, 12, 0, 0, 0));
}

/**
 *
 * @param name
 * @param date
 * @returns {Holiday}
 * @private
 */
function newHoliday(name: HolidayType, date: Date, regions: Region[]): Holiday {
  if (regions.length === 1 && regions[0] === 'ALL') {
    regions = allRegions;
  }

  return {
    name,
    date,
    dateString: localeDateObjectToDateString(date),
    regions,
    trans(lang: string = currentLanguage): string | undefined {
      throw new Error('Method deprecated. Please replace trans() with translate(). This method will be removed in the next major release.');
    },
    translate(lang: string = currentLanguage): string | undefined {
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
 * Gets the year of a date in German timezone (Europe/Berlin).
 * Uses Intl when available; otherwise DST-based fallback for small-icu / CI.
 * @param date
 * @returns {number} Year in German timezone
 * @private
 */
function getYearInGermanTimezone(date: Date): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    const yearPart = parts.find((p) => p.type === 'year');
    if (yearPart) {
      const year = parseInt(yearPart.value, 10);
      const fallbackYear = getYearInGermanTimezoneFallback(date);
      if (!Number.isNaN(year) && year === fallbackYear) return year;
    }
  } catch {
    /* Intl failed or timezone not available */
  }
  return getYearInGermanTimezoneFallback(date);
}

/**
 * Year in Europe/Berlin using DST rules only (no Intl).
 * @private
 */
function getYearInGermanTimezoneFallback(date: Date): number {
  const utcMidnight = toGermanTimezoneTimestampFallback(date);
  const offsetMs = getBerlinOffsetMs(utcMidnight);
  const localMs = utcMidnight + offsetMs;
  return new Date(localMs).getUTCFullYear();
}

/** MS per hour for DST offset. */
const MS_PER_HOUR = 3600 * 1000;

/** CET (winter): UTC+1. CEST (summer): UTC+2. */
const OFFSET_CET_MS = 1 * MS_PER_HOUR;
const OFFSET_CEST_MS = 2 * MS_PER_HOUR;

/**
 * Returns the last Sunday of a month (1-based) in UTC.
 * @private
 */
function getLastSundayUtc(year: number, month: number): number {
  const lastDay = new Date(Date.UTC(year, month, 0));
  const dayOfWeek = lastDay.getUTCDay();
  return lastDay.getUTCDate() - dayOfWeek;
}

/**
 * UTC offset for Europe/Berlin at a given UTC timestamp (ms).
 * DST: last Sun Mar 01:00 UTC -> CEST (+2); last Sun Oct 01:00 UTC -> CET (+1).
 * @private
 */
function getBerlinOffsetMs(utcMs: number): number {
  const d = new Date(utcMs);
  const y = d.getUTCFullYear();
  const lastSunMar = getLastSundayUtc(y, 3);
  const lastSunOct = getLastSundayUtc(y, 10);
  const marTransition = Date.UTC(y, 2, lastSunMar, 1, 0, 0, 0);
  const octTransition = Date.UTC(y, 9, lastSunOct, 1, 0, 0, 0);
  if (utcMs < marTransition) return OFFSET_CET_MS;
  if (utcMs < octTransition) return OFFSET_CEST_MS;
  return OFFSET_CET_MS;
}

/**
 * Converts a date to the UTC timestamp of midnight on that calendar day in
 * Europe/Berlin, using DST rules only (no Intl). Works on small-icu / CI.
 * @private
 */
function toGermanTimezoneTimestampFallback(date: Date): number {
  const utcMs = date.getTime();
  let offsetMs = getBerlinOffsetMs(utcMs);
  let localMs = utcMs + offsetMs;
  const dayMs = 24 * MS_PER_HOUR;
  const localDayStartMs = Math.floor(localMs / dayMs) * dayMs;
  for (let i = 0; i < 3; i++) {
    const utcMidnight = localDayStartMs - offsetMs;
    const offsetAtMidnight = getBerlinOffsetMs(utcMidnight);
    if (offsetAtMidnight === offsetMs) return utcMidnight;
    offsetMs = offsetAtMidnight;
  }
  return localDayStartMs - offsetMs;
}

/**
 * Converts a date to German timezone (CET/CEST) and returns the UTC timestamp
 * representing midnight in German timezone for that date.
 * Uses Intl when Europe/Berlin is available; otherwise DST-based fallback.
 * @param date The date to convert
 * @returns {number} UTC timestamp representing midnight in German timezone
 * @private
 */
function toGermanTimezoneTimestamp(date: Date): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      hourCycle: 'h23',
    });
    const parts = formatter.formatToParts(date);
    const hourPart = parts.find((p) => p.type === 'hour');
    const minutePart = parts.find((p) => p.type === 'minute');
    const secondPart = parts.find((p) => p.type === 'second');
    if (hourPart && minutePart && secondPart) {
      const hour = parseInt(hourPart.value, 10);
      const minute = parseInt(minutePart.value, 10);
      const second = parseInt(secondPart.value, 10);
      if (!Number.isNaN(hour) && !Number.isNaN(minute) && !Number.isNaN(second)) {
        const millisecondsFromMidnight =
          hour * 3600 * 1000 + minute * 60 * 1000 + second * 1000;
        const result = date.getTime() - millisecondsFromMidnight;
        const fallback = toGermanTimezoneTimestampFallback(date);
        if (Math.abs(result - fallback) < 60000) return result;
      }
    }
  } catch {
    /* Intl failed or timezone not available, use fallback */
  }
  return toGermanTimezoneTimestampFallback(date);
}

/**
 * Returns the UTC timestamp of the given date with hours, minutes, seconds, and milliseconds set to zero.
 * This function is used for holiday creation and maintains backward compatibility.
 * For date comparisons, use toGermanTimezoneTimestamp instead.
 * @param date
 * @returns {number} UTC timestamp
 * @private
 */
function toUtcTimestamp(date: Date): number {
  const internalDate = new Date(date);
  internalDate.setHours(0, 0, 0, 0);
  return internalDate.getTime();
}
