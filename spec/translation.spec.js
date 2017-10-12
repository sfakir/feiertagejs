// @flow

import { expect } from 'chai';
import {
  getHolidays,
  setLanguage,
  getLanguage,
  addTranslation
} from '../src/feiertage';

describe('set Custom Translations', () => {
  it('dont allow missing language', () => {
    setLanguage('de');
    expect(getLanguage()).to.equal('de');
    setLanguage('it');
    expect(getLanguage()).to.equal('de');
  });

  it('setAndGetLanguage', () => {
    expect(getLanguage()).to.equal('de');

    addTranslation('en', {});
    expect(getLanguage()).to.equal('de');

    setLanguage('en');
    expect(getLanguage()).to.equal('en');
  });

  it('setEnglish', () => {
    addTranslation('en', {
      NEUJAHRSTAG: 'New Years Eve',
      HEILIGEDREIKOENIGE: 'Holy Three Kings'
    });
    setLanguage('en');
    const holidays = getHolidays(2016, 'BUND');
    const newYearsEve = holidays[0];

    expect(newYearsEve.trans()).to.equal('New Years Eve');
    expect(newYearsEve.trans('en')).to.equal('New Years Eve');
    expect(newYearsEve.trans('de')).to.equal('Neujahrstag');
  });

  it('German Fallback for missing translations', () => {
    addTranslation('en', {
      NEUJAHRSTAG: 'New Years Eve'
    });
    setLanguage('en');
    const holidays = getHolidays(2016, 'BUND');

    const threeKings = holidays[3];

    // fallback
    expect(threeKings.trans()).to.equal('Tag der Arbeit');
  });
});
