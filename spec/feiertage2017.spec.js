var feiertagejs = require('../lib/feiertage.js');
var expect = require('chai').expect;
var _ = require('lodash');
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

var isHolidayToday = feiertagejs.isHoliday(new Date(2017,1,1), 'BW');

describe("get Specific holiday by Date", function () {
    it("find BUBE-TAG 2016", function () {
        var bubebtag = new Date(2016, 10, 16);
        var result = feiertagejs.getHolidayByDate(bubebtag, 'SN');
        expect(result).to.be.an('object');
        expect(result.name).to.equal('BUBETAG');
    });

    it("find heiligeDreiKoenige 2015", function () {

        var heiligeDreiKoenige = new Date(2015, 0, 6);
        var result = feiertagejs.getHolidayByDate(heiligeDreiKoenige, 'BY');
        expect(result).to.be.an('object');
        expect(result.name).to.equal('HEILIGEDREIKOENIGE');
    });

    it("Maria Himmelfahrt not be a holiday", function () {
        var mariaHimemlfahrt = new Date(2015, 9, 15);
        var result = feiertagejs.getHolidayByDate(mariaHimemlfahrt, 'BY');
        expect(result).to.equal(null);
    });


});


/**
 * driven by this issue (https://github.com/sfakir/feiertagejs/issues/6),
 * we added a unit test for Buß und Betttag
 *
 */
describe("Holidays 2017 in Saxony:", function () {
    it("BUBE-TAG 2016", function () {
        var bubebtag = new Date(2016, 10, 16);
        var result = feiertagejs.isHoliday(bubebtag, 'SN');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });
    it("BUBE-TAG 2017", function () {
        var bubebtag = new Date(2017, 10, 22);
        var result = feiertagejs.isHoliday(bubebtag, 'SN');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });
    it("2017/11/22 is BUBE TAG", function () {
        var bubebtag = new Date(2017, 10, 22);
        var result = feiertagejs.isSpecificHoliday(bubebtag, feiertagejs.Holidays.BUBETAG ,'SN');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });
    it("BUBE-TAG 2018", function () {
        var bubebtag = new Date(2018, 10, 21);
        var result = feiertagejs.isHoliday(bubebtag, 'SN');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });
    it("BUBE-TAG 2018 in BY/BW", function () {
        var bubebtag = new Date(2018, 10, 21);
        var result = feiertagejs.isHoliday(bubebtag, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);

        result = feiertagejs.isHoliday(bubebtag, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);
    });



    it("cache should be an object", function () {
        var today = new Date(2017,1,1);

        feiertagejs.isHoliday(today, 'SN');
        var result = feiertagejs.getCache();

        expect(result).to.be.an('object');
        expect(result[today.getFullYear()]['SN'].integers).to.have.length(11);
        expect(result[today.getFullYear()]['SN'].objects).to.have.length(11);




    });


});


