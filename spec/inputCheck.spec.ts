import { describe, it, expect } from 'vitest';
import {
  getHolidayByDate,
  getHolidays
} from '../src/feiertage';

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
describe.only('Check if holiday properties are set', () => {
  const holiday = getHolidayByDate(new Date(2024, (12 - 1), 25), 'BUND'); // Christmas

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
