// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

import { getHolidayByDate } from '../src/feiertage';

/**
 * Test for this comment https://github.com/sfakir/feiertagejs/commit/fefa9958b7105df9f7f964d27661bc775995871b
 */
describe('get Specific holiday by Date', () => {
  it('find WELTKINDERTAG 2019', () => {
    const weltkindertag = new Date(2020, 8, 20);
    expect(getHolidayByDate(weltkindertag, 'TH')).toEqual(
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
  it('find Weltfrauentag >2019 8th or March in Mecklenburg-Vorpommenr', () => {
    const WELTFRAUENTAG = new Date(2024, 2, 8);
    expect(getHolidayByDate(WELTFRAUENTAG, 'MV')).toEqual(
      expect.objectContaining({
        name: 'WELTFRAUENTAG',
      }),
    );
  });
  it('find Weltfrauentag >2019 8th or March should not be a holiday in BY', () => {
    const WELTFRAUENTAG = new Date(2020, 2, 8);
    expect(getHolidayByDate(WELTFRAUENTAG, 'BY')).toEqual(undefined);
  });
  it('find Weltfrauentag <2019 should not be a holiday in Berlin', () => {
    const WELTFRAUENTAG = new Date(2016, 2, 8);
    expect(getHolidayByDate(WELTFRAUENTAG, 'BE')).toEqual(undefined);
  });
  it('find Weltfrauentag <2019 should not be a holiday in BW', () => {
    const WELTFRAUENTAG = new Date(2016, 2, 8);
    expect(getHolidayByDate(WELTFRAUENTAG, 'BW')).toEqual(undefined);
  });

  // because: https://github.com/sfakir/feiertagejs/issues/33
  it('find Fronleichname in 2019 8th or March in Bacvaria', () => {
    const FRONLEICHNAM = new Date(2019, 5, 20); // 20.6.2019

    expect(getHolidayByDate(FRONLEICHNAM, 'BY')).toEqual(
      expect.objectContaining({
        name: 'FRONLEICHNAM',
      }),
    );
  });


  /**
   * Neu:
   *  Reformationstag am 31. Oktober in
   * Bremen, Hamburg, Niedersachsen und Schleswig-Holstein.
   */
  it('find Reformationstag >2019 31. Oktober in Bremen', () => {
    const REFORMANTIONSTAG = new Date(2020, 9, 31);

    expect(getHolidayByDate(REFORMANTIONSTAG, 'NI')).toEqual(
      expect.objectContaining({
        name: 'REFORMATIONSTAG',
      }),
    );
    expect(getHolidayByDate(REFORMANTIONSTAG, 'ST')).toEqual(
      expect.objectContaining({
        name: 'REFORMATIONSTAG',
      }),
    );
    expect(getHolidayByDate(REFORMANTIONSTAG, 'HB')).toEqual(
      expect.objectContaining({
        name: 'REFORMATIONSTAG',
      }),
    );
    expect(getHolidayByDate(REFORMANTIONSTAG, 'TH')).toEqual(
      expect.objectContaining({
        name: 'REFORMATIONSTAG',
      }),
    );
    expect(getHolidayByDate(REFORMANTIONSTAG, 'SN')).toEqual(
      expect.objectContaining({
        name: 'REFORMATIONSTAG',
      }),
    );
  });

});
