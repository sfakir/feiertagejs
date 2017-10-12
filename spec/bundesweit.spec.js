const feiertagejs = require('../lib/feiertage.js');
const expect = require('chai').expect;
const _ = require('lodash');
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

describe('Holidays 2015 in Germany:', () => {
  // use strict is required by node 4
  'use strict';

  it('should be an array', () => {
    const result = feiertagejs.getHolidays(2015, 'BUND');
    expect(result).to.be.an('array');
    expect(result).to.have.length(9);
    expect(result[0]).to.be.an('object');
  });

  //
  it('New Year should be a holiday', () => {
    const day = new Date(2015, 0, 1);
    const result = feiertagejs.isHoliday(day, 'BUND');

    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('6th of january should not be a holiday', () => {
    const day = new Date(2015, 0, 6);
    const result = feiertagejs.isHoliday(day, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });

  it('Simons Birthday is not a holiday', () => {
    const feiertag = new Date(2015, 4, 31);
    const result = feiertagejs.isHoliday(feiertag, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });
  it('Eastermonday should be a holiday', () => {
    const ostermontag = new Date(2015, 3, 6); //6. april
    const result = feiertagejs.isHoliday(ostermontag, 'BUND');

    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('First May to be a holiday', () => {
    const heiligeDreiKoenige = new Date(2015, 4, 1);
    const result = feiertagejs.isHoliday(heiligeDreiKoenige, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('Christmas  to be a holiday', () => {
    const christmas1 = new Date(2015, 11, 25);
    let result = feiertagejs.isHoliday(christmas1, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);

    const christmas2 = new Date(2015, 11, 26);
    result = feiertagejs.isHoliday(christmas2, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it('Allerheiligen should not to be a holiday', () => {
    const day = new Date(2015, 10, 1);
    const result = feiertagejs.isHoliday(day, 'BUND');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });

  it('cache should be an object', () => {
    //build cache
    const today = new Date(2015);
    feiertagejs.isHoliday(today, 'BUND');

    // getcache()
    const result = feiertagejs.getCache();
    expect(result).to.be.an('object');
    //expect(result['BUND']).to.be.an('object');
    expect(result[today.getFullYear()]['BUND'].integers).to.have.length(9);
    expect(result[today.getFullYear()]['BUND'].objects).to.have.length(9);
  });

  it('in 2017 we have REFORMATIONSTAG in whole Germany', () => {
    //build cache
    const result = feiertagejs.getHolidays(2017, 'BUND');

    expect(result).to.be.an('array');
    expect(result).to.have.length(10);
    expect(result[0]).to.be.an('object');

    const reftag = _.find(
      result,
      r => r.name === feiertagejs.Holidays.REFORMATIONSTAG
    );
    expect(reftag).to.be.an('object');
  });
  it('in 2016 we do not have REFORMATIONSTAG in whole Germany', () => {
    //build cache
    const result = feiertagejs.getHolidays(2016, 'BUND');

    expect(result).to.be.an('array');
    expect(result).to.have.length(9);
    expect(result[0]).to.be.an('object');

    const ref = _.find(
      result,
      r => r.name === feiertagejs.Holidays.REFORMATIONSTAG
    );
    expect(typeof ref).to.be.equal('undefined');
  });
});
