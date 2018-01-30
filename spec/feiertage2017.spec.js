// @flow

// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

import {
  getHolidayByDate,
  isHoliday,
  isSpecificHoliday,
} from '../src/feiertage';

describe('get Specific holiday by Date', () => {
  it('find BUBE-TAG 2016', () => {
    const bubebtag = new Date(2016, 10, 16);
    expect(getHolidayByDate(bubebtag, 'SN')).toEqual(
      expect.objectContaining({
        name: 'BUBETAG',
      }),
    );
  });

  it('find heiligeDreiKoenige 2015', () => {
    const heiligeDreiKoenige = new Date(2015, 0, 6);
    expect(getHolidayByDate(heiligeDreiKoenige, 'BY')).toEqual(
      expect.objectContaining({
        name: 'HEILIGEDREIKOENIGE',
      }),
    );
  });

  it('Maria Himmelfahrt not be a holiday', () => {
    const mariaHimmelfahrt = new Date(2015, 9, 15);
    expect(getHolidayByDate(mariaHimmelfahrt, 'BY')).toBeUndefined();
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
    expect(isHoliday(bubebtag, 'SN')).toEqual(true);
  });
  it('BUBE-TAG 2017', () => {
    const bubebtag = new Date(2017, 10, 22);
    expect(isHoliday(bubebtag, 'SN')).toEqual(true);
  });
  it('2017/11/22 is BUBE TAG', () => {
    const bubebtag = new Date(2017, 10, 22);
    expect(isSpecificHoliday(bubebtag, 'BUBETAG', 'SN')).toEqual(true);
  });
  it('BUBE-TAG 2018', () => {
    const bubebtag = new Date(2018, 10, 21);
    expect(isHoliday(bubebtag, 'SN')).toEqual(true);
  });
  it('BUBE-TAG 2018 in BY/BW', () => {
    const bubebtag = new Date(2018, 10, 21);
    expect(isHoliday(bubebtag, 'BY')).toEqual(false);
    expect(isHoliday(bubebtag, 'BW')).toEqual(false);
  });
});
