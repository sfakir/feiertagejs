declare type Region =
  | 'BW' // Baden-Württemberg
  | 'BY' // Bayern
  | 'BE' // Berlin
  | 'BB' // Brandenburg
  | 'HB' // Bremen
  | 'HE' // Hessen
  | 'HH' // Hamburg
  | 'MV' // Mecklenburg-Vorpommern
  | 'NI' // Niedersachsen
  | 'NW' // Nordrhein-Westfalen
  | 'RP' // Rheinland-Pfalz
  | 'SL' // Saarland
  | 'SN' // Sachsen
  | 'ST' // Sachsen-Anhalt
  | 'SH' // Schleswig-Holstein
  | 'TH' // Thüringen
  | 'BUND' // Gesamt-Deutschland
  | 'AUGSBURG'
  | 'ALL';

declare type Holiday = {
  name: HolidayType;
  date: Date;
  trans?: (lang: string | undefined) => string; // deprecated;
  translate: (lang?: string | undefined) => string;
  dateString: string;
  equals: (date: Date) => boolean;
};

declare type HolidayType =
  | 'NEUJAHRSTAG'
  | 'HEILIGEDREIKOENIGE'
  | 'KARFREITAG'
  | 'OSTERSONNTAG'
  | 'OSTERMONTAG'
  | 'TAG_DER_ARBEIT'
  | 'CHRISTIHIMMELFAHRT'
  | 'MARIAHIMMELFAHRT'
  | 'PFINGSTSONNTAG'
  | 'PFINGSTMONTAG'
  | 'FRONLEICHNAM'
  | 'DEUTSCHEEINHEIT'
  | 'REFORMATIONSTAG'
  | 'ALLERHEILIGEN'
  | 'BUBETAG'
  | 'ERSTERWEIHNACHTSFEIERTAG'
  | 'ZWEITERWEIHNACHTSFEIERTAG';

/**
 * Map of {@link HolidayType} to translation string.
 */
export type TranslationTable = {
  [key: string]: string;
};

/**
 * adds a translation for the holidays (e.g. english).
 * This also allows to override the German names.
 * Hint: Interpolates German for missing translations
 * @param {string} isoCode of the new language
 * @param {TranslationTable} newTranslation  map of {HolidayType} to translation stringg
 */
declare function addTranslation(
  isoCode: string,
  newTranslation: TranslationTable,
): void;

/**
 * Set a language to default language
 * @param {string} isoCode
 */
declare function setLanguage(isoCode: string): void;

/**
 * Get currently set language
 * @returns {string}
 */
declare function getLanguage(): string;

// holidays api

/**
 * Checks if a specific date is sunday or holiday.
 * @param date
 * @param region
 * @returns {boolean}
 */
declare function isSunOrHoliday(date: Date, region: Region): boolean;

/**
 * Check is specific date is holiday.
 * @param date
 * @param {Region} region two character {@link Region} code
 * @returns {boolean}
 */
declare function isHoliday(date: Date, region: Region): boolean;

declare function getHolidayByDate(date: Date, region: Region): Holiday | void;

declare function isSpecificHoliday(
  date: Date,
  holidayName: HolidayType,
  region: Region,
): boolean;

/**
 * Returns all holidays of a year in a {@link Region}.
 * @param year
 * @param region
 * @returns {Array.<Holiday>}
 */
declare function getHolidays(year: number | string, region: Region): Holiday[];
