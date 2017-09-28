const feiertagejs = require('../lib/feiertage.js');
const expect = require('chai').expect;
const _ = require('lodash');
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

const isHolidayToday = feiertagejs.isHoliday(new Date(), 'BW');


describe("Holidays 2015 in Bavaria:", () => {
    it("should be an array", () => {
        const result = feiertagejs.getHolidays(2015, 'BY');
        expect(result).to.be.an('array');
        expect(result).to.have.length(12);
    });

    //
    it("Maria Himmelfahrt not be a holiday", () => {
        const mariaHimemlfahrt = new Date(2015, 9, 15);
        const result = feiertagejs.isHoliday(mariaHimemlfahrt, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);
    });


    it("Simons Birthday is not a holiday", () => {
        const feiertag = new Date(2015, 4, 31);
        const result = feiertagejs.isHoliday(feiertag, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);
    });
    it("Maria HeiligeDreiKönige  be a holiday", () => {
        const heiligeDreiKoenige = new Date(2015, 0, 6);
        const result = feiertagejs.isHoliday(heiligeDreiKoenige, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });

    it("First May to be a holiday", () => {
        const heiligeDreiKoenige = new Date(2015, 0, 6);
        const result = feiertagejs.isHoliday(heiligeDreiKoenige, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });


    it("Christmas  to be a holiday", () => {
        const christmas1 = new Date(2015, 11, 25);
        let result = feiertagejs.isHoliday(christmas1, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);

        const christmas2 = new Date(2015, 11, 26);
        result = feiertagejs.isHoliday(christmas2, 'BY');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);

    });

    it("cache should be an object", () => {
        const today = new Date(2016, 1, 1);

        feiertagejs.isHoliday(today, 'BY');
        const result = feiertagejs.getCache();
        expect(result).to.be.an('object');

        expect(result[today.getFullYear()]['BY'].integers).to.have.length(12);
        expect(result[today.getFullYear()]['BY'].objects).to.have.length(12);

    });


});
describe("Holidays 2016 in BW:", () => {
    it("BW should have 12 holidays", () => {
        const result = feiertagejs.getHolidays(2016, 'BW');

        expect(result).to.be.an('array');
        expect(result).to.have.length(12)
    });

});

describe("Holidays 2016 in NW:", () => {


    it("Heilige Drei Könige should not be available", () => {

        const result = feiertagejs.getHolidays(2016, 'NW');
        const hkoenige = _.find(result, f => f.name === 'HEILIGEDREIKOENIGE');
        expect(hkoenige).to.equal(undefined);
    });
 it("TAg der Arbeit should be on first may", () => {

     const result = feiertagejs.getHolidays(2016, 'NW');
     const firstMay = _.find(result, f => f.name === 'TAG_DER_ARBEIT');

     expect(firstMay).to.be.an('object');
     const realDate = new Date(2016, 4, 1);

     const isTrue = firstMay.equals(realDate);
     expect(isTrue).to.equal(true);
    });



});


