// @flow

// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

import {
  getHolidayByDate,
  isHoliday,
  isSpecificHoliday
} from '../src/feiertage';
import { expect } from 'chai';

describe('get Specific holiday by Date', () => {
  it('find BUBE-TAG 2016', () => {
    const bubebtag = new Date(2016, 10, 16);
    const result = getHolidayByDate(bubebtag, 'SN');
    expect(result).to.be.an('object');
    expect(result.name).to.equal('BUBETAG');
  });

  it('find heiligeDreiKoenige 2015', () => {
    const heiligeDreiKoenige = new Date(2015, 0, 6);
    const result = getHolidayByDate(heiligeDreiKoenige, 'BY');
    expect(result).to.be.an('object');
    expect(result.name).to.equal('HEILIGEDREIKOENIGE');
  });

  it('Maria Himmelfahrt not be a holiday', () => {
    const mariaHimmelfahrt = new Date(2015, 9, 15);
    const result = getHolidayByDate(mariaHimmelfahrt, 'BY');
    expect(result).to.be.undefined;
  });
});

/**
 * driven by this issue (https://github.com/sfakir/feiertagejs/issues/6),
 * we added a unit test for Buß und Betttag
 *
 */
describe('Holidays 2017 in Saxony:', () => {
  it('BUBE-TAG 2016', () => {
    const bubebtag = new Date(2016, 10, 16);
    const result = isHoliday(bubebtag, 'SN');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });
  it('BUBE-TAG 2017', () => {
    const bubebtag = new Date(2017, 10, 22);
    const result = isHoliday(bubebtag, 'SN');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });
  it('2017/11/22 is BUBE TAG', () => {
    const bubebtag = new Date(2017, 10, 22);
    const result = isSpecificHoliday(bubebtag, 'BUBETAG', 'SN');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });
  it('BUBE-TAG 2018', () => {
    const bubebtag = new Date(2018, 10, 21);
    const result = isHoliday(bubebtag, 'SN');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });
  it('BUBE-TAG 2018 in BY/BW', () => {
    const bubebtag = new Date(2018, 10, 21);
    let result = isHoliday(bubebtag, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);

    result = isHoliday(bubebtag, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });
});
