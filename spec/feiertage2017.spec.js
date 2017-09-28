const feiertagejs = require('../lib/feiertage.js');
const expect = require('chai').expect;
const _ = require('lodash');
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

const isHolidayToday = feiertagejs.isHoliday(new Date(2017, 1, 1), 'BW');

describe("get Specific holiday by Date", () => {
    // use strict is required by node 4
    'use strict';

    it("find BUBE-TAG 2016", () => {
        const bubebtag = new Date(2016, 10, 16);
        const result = feiertagejs.getHolidayByDate(bubebtag, 'SN');
        expect(result).to.be.an('object');
        expect(result.name).to.equal('BUBETAG');
    });

    it("find heiligeDreiKoenige 2015", () => {

        const heiligeDreiKoenige = new Date(2015, 0, 6);
        const result = feiertagejs.getHolidayByDate(heiligeDreiKoenige, 'BY');
        expect(result).to.be.an('object');
        expect(result.name).to.equal('HEILIGEDREIKOENIGE');
    });

    it("Maria Himmelfahrt not be a holiday", () => {
        const mariaHimemlfahrt = new Date(2015, 9, 15);
        const result = feiertagejs.getHolidayByDate(mariaHimemlfahrt, 'BY');
        expect(result).to.equal(null);
    });


});


/**
 * driven by this issue (https://github.com/sfakir/feiertagejs/issues/6),
 * we added a unit test for Buß und Betttag
 *
 */
describe("Holidays 2017 in Saxony:", () => {
    // use strict is required by node 4
    'use strict';

    it("BUBE-TAG 2016", () => {
        const bubebtag = new Date(2016, 10, 16);
        const result = feiertagejs.isHoliday(bubebtag, 'SN');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });
    it("BUBE-TAG 2017", () => {
        const bubebtag = new Date(2017, 10, 22);
        const result = feiertagejs.isHoliday(bubebtag, 'SN');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });
    it("2017/11/22 is BUBE TAG", () => {
        const bubebtag = new Date(2017, 10, 22);
        const result = feiertagejs.isSpecificHoliday(bubebtag, feiertagejs.Holidays.BUBETAG, 'SN');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });
    it("BUBE-TAG 2018", () => {
        const bubebtag = new Date(2018, 10, 21);
        const result = feiertagejs.isHoliday(bubebtag, 'SN');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });
    it("BUBE-TAG 2018 in BY/BW", () => {
        const bubebtag = new Date(2018, 10, 21);
        let result = feiertagejs.isHoliday(bubebtag, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);

        result = feiertagejs.isHoliday(bubebtag, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);
    });



    it("cache should be an object", () => {
        const today = new Date(2017, 1, 1);

        feiertagejs.isHoliday(today, 'SN');
        const result = feiertagejs.getCache();

        expect(result).to.be.an('object');
        expect(result[today.getFullYear()]['SN'].integers).to.have.length(11);
        expect(result[today.getFullYear()]['SN'].objects).to.have.length(11);




    });


});


