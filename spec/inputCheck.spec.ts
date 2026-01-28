import { describe, it, expect } from 'vitest';
import {
  getHolidayByDate,
  getHolidays,
} from '../src/feiertage';

// Helper to create timezone-independent dates (at noon UTC)
const dateUTC = (year: number, month: number, day: number) =>
  new Date(Date.UTC(year, month, day, 12, 0, 0, 0));

describe('Wrong Inputs', () => {
  it.each([[2017], [2018]])(
    'Year %i should be the same as integer and string',
    (year) => {
      const result = getHolidays(year, 'BUND');
      const result2 = getHolidays(String(year), 'BUND');
      expect(result.length).toEqual(result2.length);
    },
  );
});
describe('Check if holiday properties are set', () => {
  const holiday = getHolidayByDate(dateUTC(2024, 11, 25), 'BUND'); // Christmas (December = month 11)

  it('should have a name', () => {
    expect(holiday?.name).toBeDefined();
  });
  it('should have a dateString', () => {
    expect(holiday?.dateString).toBeDefined();
  });
  it('should have a date', () => {
    expect(holiday?.date).toBeDefined();
  });
  it('should have regions', () => {
    expect(holiday?.regions).toBeDefined();
  });
});
