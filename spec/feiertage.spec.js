// @flow

import { expect } from 'chai';
import { getHolidays, isSunOrHoliday, isHoliday } from '../src/feiertage';

describe('Holidays 2015 in Bavaria:', () => {
  it('should be an array', () => {
    const result = getHolidays(2015, 'BY');
    expect(result).to.be.an('array');
    expect(result).to.have.length(12);
  });

  //
  it('Maria Himmelfahrt not be a holiday', () => {
    const mariaHimemlfahrt = new Date(2015, 9, 15);
    const result = isHoliday(mariaHimemlfahrt, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });

  it('Simons Birthday is not a holiday', () => {
    const feiertag = new Date(2015, 4, 31);
    const result = isHoliday(feiertag, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });
  it('Maria HeiligeDreiKönige  be a holiday', () => {
    const heiligeDreiKoenige = new Date(2015, 0, 6);
    const result = isHoliday(heiligeDreiKoenige, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('First May to be a holiday', () => {
    const heiligeDreiKoenige = new Date(2015, 0, 6);
    const result = isHoliday(heiligeDreiKoenige, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('check is Sun Or Holiday Method', () => {
    const sunday = new Date(2015, 0, 6);
    sunday.setDate(sunday.getDate() + (7 - sunday.getDay()) % 7);

    let result = isSunOrHoliday(sunday, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);

    sunday.setDate(sunday.getDate() + (1 + 7 - sunday.getDay()) % 7);
    result = isSunOrHoliday(sunday, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });

  it('Christmas  to be a holiday', () => {
    const christmas1 = new Date(2015, 11, 25);
    let result = isHoliday(christmas1, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);

    const christmas2 = new Date(2015, 11, 26);
    result = isHoliday(christmas2, 'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });
});

describe('Holidays 2016 in BW:', () => {
  it('BW should have 12 holidays', () => {
    const result = getHolidays(2016, 'BW');

    expect(result).to.be.an('array');
    expect(result).to.have.length(12);

    // test normalized date. Shoudl only be used internally.
    expect(result[0].getNormalizedDate()).to.be.a('number');
  });
});

describe('Holidays 2016 in NW:', () => {
  it('Heilige Drei Könige should not be available', () => {
    const result = getHolidays(2016, 'NW');
    const hkoenige = result.find(f => f.name === 'HEILIGEDREIKOENIGE');
    expect(hkoenige).to.equal(undefined);
  });
  it('TAg der Arbeit should be on first may', () => {
    const result = getHolidays(2016, 'NW');
    const firstMay = result.find(f => f.name === 'TAG_DER_ARBEIT');

    expect(firstMay).to.be.an('object');
    const realDate = new Date(2016, 4, 1);

    const isTrue = firstMay.equals(realDate);
    expect(isTrue).to.equal(true);
  });
});
