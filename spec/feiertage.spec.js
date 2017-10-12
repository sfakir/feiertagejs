// @flow

import { expect } from 'chai';
import { getHolidays, isHoliday } from '../src/feiertage';

describe('Holidays 2015 in Bavaria:', () => {
  // use strict is required by node 4
  'use strict';

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
  // use strict is required by node 4
  'use strict';

  it('BW should have 12 holidays', () => {
    const result = getHolidays(2016, 'BW');

    expect(result).to.be.an('array');
    expect(result).to.have.length(12);
  });
});

describe('Holidays 2016 in NW:', () => {
  // use strict is required by node 4
  'use strict';

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
