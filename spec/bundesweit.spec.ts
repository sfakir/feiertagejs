import { describe, it, expect } from 'vitest';
import { getHolidays, isHoliday } from '../src/feiertage';

// Helper to create timezone-independent dates (at noon UTC)
const dateUTC = (year: number, month: number, day: number) =>
  new Date(Date.UTC(year, month, day, 12, 0, 0, 0));

describe('Holidays 2015 in Germany:', () => {
  it('should be an array', () => {
    expect(getHolidays(2015, 'BUND')).toHaveLength(9);
  });

  it('New Year should be a holiday', () => {
    const day = dateUTC(2015, 0, 1);
    expect(isHoliday(day, 'BUND')).toBe(true);
  });

  it('6th of january should not be a holiday', () => {
    const day = dateUTC(2015, 0, 6);
    expect(isHoliday(day, 'BUND')).toBe(false);
  });

  it('Simons Birthday is not a holiday', () => {
    const feiertag = dateUTC(2015, 4, 31);
    expect(isHoliday(feiertag, 'BUND')).toBe(false);
  });
  it('Eastermonday should be a holiday', () => {
    const ostermontag = dateUTC(2015, 3, 6); //6. april
    expect(isHoliday(ostermontag, 'BUND')).toBe(true);
  });

  it('First May to be a holiday', () => {
    const firstMay = dateUTC(2015, 4, 1);
    expect(isHoliday(firstMay, 'BUND')).toBe(true);
  });

  it('Christmas to be a holiday', () => {
    const christmas1 = dateUTC(2015, 11, 25);
    expect(isHoliday(christmas1, 'BUND')).toBe(true);

    const christmas2 = dateUTC(2015, 11, 26);
    expect(isHoliday(christmas2, 'BUND')).toBe(true);
  });

  it('Allerheiligen should not to be a holiday', () => {
    const day = dateUTC(2015, 10, 1);
    expect(isHoliday(day, 'BUND')).toBe(false);
  });

  it('in 2017 we have REFORMATIONSTAG in whole Germany', () => {
    const result = getHolidays(2017, 'BUND');
    expect(result).toHaveLength(10);

    const reftag = result.find((r) => r.name === 'REFORMATIONSTAG');
    expect(reftag).toBeDefined();
  });
  it('in 2016 we do not have REFORMATIONSTAG in whole Germany', () => {
    const result = getHolidays(2016, 'BUND');
    expect(result).toHaveLength(9);
    const ref = result.find((r) => r.name === 'REFORMATIONSTAG');
    expect(ref).toBeUndefined();
  });
});
