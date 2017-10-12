// @flow

import { getHolidays, isSpecificHoliday } from '../src/feiertage';
import { expect } from 'chai';
import type { Holiday } from '../src/holiday';

describe('Check Feiertage by Name', () => {
  // use strict is required by node 4
  'use strict';

  it('check ChristiHimmelfahrt 2016: check wrong dates', () => {
    // source: http://www.schulferien.org/Feiertage/2016/feiertage_2016.html
    let result = isSpecificHoliday(new Date(2016, 9, 15), 'CHRISTIHIMMELFAHRT');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);

    result = isSpecificHoliday(new Date(2016, 12, 24), 'CHRISTIHIMMELFAHRT');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });
  it('check ChristiHimmelfahrt 2016: check right date', () => {
    // 5.5.2016
    const somedate = new Date(2016, 4, 5);
    const result = isSpecificHoliday(somedate, 'CHRISTIHIMMELFAHRT'); // und Vatertag
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('check Erster Weihnachtsfeiertag 2016: check right date', () => {
    // 25.12.2016
    const somedate = new Date(2016, 11, 25);
    const result = isSpecificHoliday(somedate, 'ERSTERWEIHNACHTSFEIERTAG');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('check Erster Weihnachtsfeiertag 2016: check wrong date', () => {
    // 5.5.2016
    const somedate = new Date(2016, 11, 29);
    const result = isSpecificHoliday(somedate, 'ERSTERWEIHNACHTSFEIERTAG');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });
  it('every holiday should have a translation', () => {
    const somedate = new Date(2016, 5, 5);
    const holidays: Array<Holiday> = getHolidays(somedate.getFullYear(), 'ALL');

    for (let holiday of holidays) {
      const translation = holiday.trans();
      expect(translation).to.be.an('string');
    }
  });
});
