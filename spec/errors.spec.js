// @flow

import {expect} from 'chai';
import {getHolidays, isSpecificHoliday, isHoliday} from '../src/feiertage';

describe('Throw errors:', () => {
  it('should throw an invalid region error', () => {
    let badFn = function () {
      isHoliday(new Date(), 'SWISS');
    };
    expect(badFn).to.throw(Error);
  });
  it('should throw an invalid holiday error', () => {
    let badFn = function () {
      isSpecificHoliday(new Date(), 'RANDOM');
    };
    expect(badFn).to.throw(Error);

  });

  //
  it('New Year should be a holiday', () => {
    const day = new Date(2015, 0, 1);
    const result = isHoliday(day, 'BUND');

    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('6th of january should not be a holiday', () => {
    const day = new Date(2015, 0, 6);
    const result = isHoliday(day, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });

  it('Simons Birthday is not a holiday', () => {
    const feiertag = new Date(2015, 4, 31);
    const result = isHoliday(feiertag, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });
  it('Eastermonday should be a holiday', () => {
    const ostermontag = new Date(2015, 3, 6); //6. april
    const result = isHoliday(ostermontag, 'BUND');

    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('First May to be a holiday', () => {
    const heiligeDreiKoenige = new Date(2015, 4, 1);
    const result = isHoliday(heiligeDreiKoenige, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('Christmas  to be a holiday', () => {
    const christmas1 = new Date(2015, 11, 25);
    let result = isHoliday(christmas1, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);

    const christmas2 = new Date(2015, 11, 26);
    result = isHoliday(christmas2, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('Allerheiligen should not to be a holiday', () => {
    const day = new Date(2015, 10, 1);
    const result = isHoliday(day, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });

  it('in 2017 we have REFORMATIONSTAG in whole Germany', () => {
    //build cache
    const result = getHolidays(2017, 'BUND');

    expect(result).to.be.an('array');
    expect(result).to.have.length(10);
    expect(result[0]).to.be.an('object');

    const reftag = result.find(r => r.name === 'REFORMATIONSTAG');
    expect(reftag).to.be.an('object');
  });
  it('in 2016 we do not have REFORMATIONSTAG in whole Germany', () => {
    //build cache
    const result = getHolidays(2016, 'BUND');

    expect(result).to.be.an('array');
    expect(result).to.have.length(9);
    expect(result[0]).to.be.an('object');

    const ref = result.find(r => r.name === 'REFORMATIONSTAG');
    expect(typeof ref).to.be.equal('undefined');
  });
});
