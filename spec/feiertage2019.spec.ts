// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

import {
  getHolidayByDate,
} from '../src/feiertage';

/**
 * Test for this comment https://github.com/sfakir/feiertagejs/commit/fefa9958b7105df9f7f964d27661bc775995871b
 */
describe('get Specific holiday by Date', () => {
  it('find WELTKINDERTAG 2019', () => {
    const weltkindertab = new Date(2020, 8, 20);
    expect(getHolidayByDate(weltkindertab, 'TH')).toEqual(
      expect.objectContaining({
        name: 'WELTKINDERTAG',
      }),
    );
  });

  it('find Weltfrauentag >2019 8th or March in Berlin', () => {
    const WELTFRAUENTAG = new Date(2020, 2, 8);
    expect(getHolidayByDate(WELTFRAUENTAG, 'BE')).toEqual(
      expect.objectContaining({
        name: 'WELTFRAUENTAG',
      }),
    );
  });
  it('find Weltfrauentag >2019 8th or March should not be a holiday in BY', () => {
    const WELTFRAUENTAG = new Date(2020, 2, 8);
    expect(getHolidayByDate(WELTFRAUENTAG, 'BY')).toEqual(undefined );
  });
  it('find Weltfrauentag <2019 should not be a holiday in Berlin', () => {
    const WELTFRAUENTAG = new Date(2016, 2, 8);
    expect(getHolidayByDate(WELTFRAUENTAG, 'BE')).toEqual(
      undefined
    );
  });
  it('find Weltfrauentag <2019 should not be a holiday in BW', () => {
    const WELTFRAUENTAG = new Date(2016, 2, 8);
    expect(getHolidayByDate(WELTFRAUENTAG, 'BW')).toEqual(
      undefined
    );
  });
});
