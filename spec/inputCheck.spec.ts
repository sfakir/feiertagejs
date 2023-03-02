import { describe, it, expect } from 'vitest';
import { getHolidays } from '../src/feiertage';

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
