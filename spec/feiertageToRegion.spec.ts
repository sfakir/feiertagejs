// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

import { describe, it, expect } from 'vitest';
import { getHolidayByDate, getHolidays } from '../src/feiertage';

/**
 * Test for this comment https://github.com/sfakir/feiertagejs/commit/fefa9958b7105df9f7f964d27661bc775995871b
 */
describe('find the regions of a holiday', () => {
  it('find WELTKINDERTAG 2019', () => {
    const weltkindertag = new Date(2020, 8, 20);
    const holiday = getHolidayByDate(weltkindertag, 'TH');
    if (!holiday) {
      throw new Error('Holiday not found');
    }

    expect(holiday.regions).contain('TH');
  });
  it('should find a region on every holiday', () => {
    const holidays = getHolidays(2024, 'ALL');
    for (const holiday of holidays) {
      expect(holiday.regions.length).to.be.greaterThan(0);
    }
  });
});
