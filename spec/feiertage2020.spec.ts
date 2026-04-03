// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

import { describe, it, expect } from 'vitest';
import { getHolidayByDate, getHolidays, isHoliday, isSpecificHoliday } from '../src/feiertage';

// Helper to create timezone-independent dates (at noon UTC)
const dateUTC = (year: number, month: number, day: number) =>
  new Date(Date.UTC(year, month, day, 12, 0, 0, 0));

/**
 * Test for this comment https://github.com/sfakir/feiertagejs/commit/fefa9958b7105df9f7f964d27661bc775995871b
 */
describe('get Specific holiday by Date', () => {
  it('Christi Himmelfahrt is not the second christmas holiday', () => {
    const secondChristmasDay = new Date('2021-12-25T09:30:00.000+01:00');

    expect(
      isSpecificHoliday(secondChristmasDay, 'CHRISTIHIMMELFAHRT', 'ALL'),
    ).toBeFalsy();
  });

  it('find Tag der Befreiung on 8th of May 2020 in Berlin', () => {
    const tagDerBefreiung = dateUTC(2020, 4, 8);

    expect(getHolidayByDate(tagDerBefreiung, 'BE')).toEqual(
      expect.objectContaining({
        name: 'TAGDERBEFREIUNG',
      }),
    );
    expect(isHoliday(tagDerBefreiung, 'BE')).toBe(true);
    expect(
      isSpecificHoliday(tagDerBefreiung, 'TAGDERBEFREIUNG', 'BE'),
    ).toBe(true);
  });

  it('find Tag der Befreiung on 8th of May 2025 in Berlin', () => {
    const tagDerBefreiung = dateUTC(2025, 4, 8);

    expect(getHolidayByDate(tagDerBefreiung, 'BE')).toEqual(
      expect.objectContaining({
        name: 'TAGDERBEFREIUNG',
      }),
    );
    expect(
      getHolidays(2025, 'BE').some((holiday) => holiday.name === 'TAGDERBEFREIUNG'),
    ).toBe(true);
  });

  it('does not find Tag der Befreiung in Berlin outside 2020 and 2025', () => {
    const notHoliday = dateUTC(2024, 4, 8);

    expect(getHolidayByDate(notHoliday, 'BE')).toEqual(undefined);
    expect(isHoliday(notHoliday, 'BE')).toBe(false);
    expect(isSpecificHoliday(notHoliday, 'TAGDERBEFREIUNG', 'BE')).toBe(false);
  });

  it('does not find Tag der Befreiung outside Berlin', () => {
    const tagDerBefreiung = dateUTC(2025, 4, 8);

    expect(getHolidayByDate(tagDerBefreiung, 'BB')).toEqual(undefined);
    expect(isHoliday(tagDerBefreiung, 'BB')).toBe(false);
    expect(
      getHolidays(2025, 'ALL').some(
        (holiday) =>
          holiday.name === 'TAGDERBEFREIUNG' &&
          holiday.regions.length === 1 &&
          holiday.regions[0] === 'BE',
      ),
    ).toBe(true);
  });
});
