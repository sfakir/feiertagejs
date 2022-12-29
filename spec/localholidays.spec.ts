import { describe, it, expect } from 'vitest';
import { getHolidays, isHoliday } from '../src/feiertage';

describe('localholiday', () => {
  it('find some days from AUGSBURG', () => {
    const augsburgsHolidays = getHolidays(2020, 'AUGSBURG');
    const friedensfest = augsburgsHolidays.find(
      (holiday) => holiday.name === 'AUGSBURGER_FRIEDENSFEST',
    );
    expect(friedensfest).not.toBeNull();
  });
  it('find Friedensfest by Date', () => {
    const date = new Date('2020-08-08');
    const friedensfest = isHoliday(date, 'AUGSBURG');
    expect(friedensfest).toEqual(true);
  });
});
