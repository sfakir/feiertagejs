import { describe, it, expect } from 'vitest';
import { Holiday } from '../src/Holiday';
import { getHolidays, isHoliday, isSunOrHoliday } from '../src/feiertage';

describe('Holidays 2015 in Bavaria:', () => {
  it('should be an array', () => {
    expect(getHolidays(2015, 'BY')).toHaveLength(13);
  });

  it('Maria Himmelfahrt not be a holiday', () => {
    const mariaHimemlfahrt = new Date(2015, 9, 15);
    expect(isHoliday(mariaHimemlfahrt, 'BY')).toBe(false);
  });

  it('Simons Birthday is not a holiday', () => {
    const feiertag = new Date(2015, 4, 31);
    expect(isHoliday(feiertag, 'BY')).toBe(false);
  });
  it('Maria HeiligeDreiKönige  be a holiday', () => {
    const heiligeDreiKoenige = new Date(2015, 0, 6);
    expect(isHoliday(heiligeDreiKoenige, 'BY')).toBe(true);
  });

  it('First May to be a holiday', () => {
    const heiligeDreiKoenige = new Date(2015, 0, 6);
    expect(isHoliday(heiligeDreiKoenige, 'BY')).toBe(true);
  });

  it('check is Sun Or Holiday Method', () => {
    const sunday = new Date(2015, 0, 6);
    sunday.setDate(sunday.getDate() + ((7 - sunday.getDay()) % 7));

    expect(isSunOrHoliday(sunday, 'BY')).toBe(true);

    sunday.setDate(sunday.getDate() + ((1 + 7 - sunday.getDay()) % 7));
    expect(isSunOrHoliday(sunday, 'BY')).toBe(false);
  });

  it('Christmas to be a holiday', () => {
    const christmas1 = new Date(2015, 11, 25);
    expect(isHoliday(christmas1, 'BY')).toEqual(true);

    const christmas2 = new Date(2015, 11, 26);
    expect(isHoliday(christmas2, 'BY')).toBe(true);
  });
});

describe('Holidays 2016 in BW:', () => {
  it('BW should have 12 holidays', () => {
    expect(getHolidays(2016, 'BW')).toHaveLength(12);
  });
});

describe('Holidays ALL', () => {
  it('Maria Himmelfahrt should be a holiday if region type is set to ALL', () => {
    const himmelfahrt = new Date(2022, 7, 15); // 15.08.2022

    expect(isHoliday(himmelfahrt, 'ALL')).toBe(true);
  });
});

describe('Holidays 2016 in NW:', () => {
  it('Heilige Drei Könige should not be available', () => {
    const result = getHolidays(2016, 'NW');
    const hkoenige = result.find((f) => f.name === 'HEILIGEDREIKOENIGE');
    expect(hkoenige).toBeUndefined();
  });
  it('Tag der Arbeit should be on first may', () => {
    const result = getHolidays(2016, 'NW');
    const firstMay: Holiday | undefined = result.find(
      (f) => f.name === 'TAG_DER_ARBEIT',
    );
    expect(firstMay).toBeDefined();
    expect(firstMay!.equals(new Date(2016, 4,1))).toBe(true);
  });
});
