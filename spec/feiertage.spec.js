var feiertagejs = require('../lib/feiertage.js');
var expect = require('chai').expect;
var _ = require('lodash');
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

var isHolidayToday = feiertagejs.isHoliday(new Date(), 'BW');


describe("Holidays 2015 in Bavaria:", function () {
    it("should be an array", function () {
        var result = feiertagejs.getHolidays(2015, 'BY');
        expect(result).to.be.an('array');
        expect(result).to.have.length(12);
    });

    //
    it("Maria Himmelfahrt not be a holiday", function () {
        var mariaHimemlfahrt = new Date(2015, 9, 15);
        var result = feiertagejs.isHoliday(mariaHimemlfahrt, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);
    });


    it("Simons Birthday is not a holiday", function () {
        var feiertag = new Date(2015, 4, 31);
        var result = feiertagejs.isHoliday(feiertag, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);
    });
    it("Maria HeiligeDreiKönige  be a holiday", function () {
        var heiligeDreiKoenige = new Date(2015, 0, 6);
        var result = feiertagejs.isHoliday(heiligeDreiKoenige, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });

    it("First May to be a holiday", function () {
        var heiligeDreiKoenige = new Date(2015, 0, 6);
        var result = feiertagejs.isHoliday(heiligeDreiKoenige, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });


    it("Christmas  to be a holiday", function () {
        var christmas1 = new Date(2015, 11, 25);
        var result = feiertagejs.isHoliday(christmas1, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);

        var christmas2 = new Date(2015, 11, 26);
        result = feiertagejs.isHoliday(christmas2, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);

    });

    it("cache should be an object", function () {
        var today = new Date(2016,1,1);

        feiertagejs.isHoliday(today, 'BY');
        var result = feiertagejs.getCache();
        expect(result).to.be.an('object');

        expect(result[today.getFullYear()]['BY'].integers).to.have.length(12);
        expect(result[today.getFullYear()]['BY'].objects).to.have.length(12);

    });


});
describe("Holidays 2016 in BW:", function () {
    it("BW should have 12 holidays", function () {
        var result = feiertagejs.getHolidays(2016, 'BW');
        
        expect(result).to.be.an('array');
        expect(result).to.have.length(12)
    });

});

describe("Holidays 2016 in NW:", function () {


    it("Heilige Drei Könige should not be available", function () {

        var result = feiertagejs.getHolidays(2016, 'NW');
        var hkoenige = _.find(result,function(f){ return f.name == 'HEILIGEDREIKOENIGE'});
        expect(hkoenige).to.equal(undefined);
    });
 it("TAg der Arbeit should be on first may", function () {

        var result = feiertagejs.getHolidays(2016, 'NW');
        var firstMay = _.find(result,function(f){ return f.name == 'TAG_DER_ARBEIT'});

        expect(firstMay).to.be.an('object');
        var realDate = new Date(2016,4, 1);

        var isTrue = firstMay.equals(realDate);
        expect(isTrue).to.equal(true);
    });



});


