// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

import { describe, it, expect } from 'vitest';
import { isSpecificHoliday } from '../src/feiertage';

/**
 * Test for this comment https://github.com/sfakir/feiertagejs/commit/fefa9958b7105df9f7f964d27661bc775995871b
 */
describe('get Specific holiday by Date', () => {
  it('Christi Himmelfahrt is not the second christmas holiday', () => {
    const secondChristmasDay  = new Date('2021-12-25T09:30:00.000+01:00');


    expect(isSpecificHoliday(secondChristmasDay, 'CHRISTIHIMMELFAHRT', 'ALL')).toBeFalsy();
  });

});
