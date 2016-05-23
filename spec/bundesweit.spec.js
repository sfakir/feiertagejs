
var feiertagejs = require('../lib/feiertage.js');
var expect = require('chai').expect;
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

describe("Holidays 2015 in Germany:", function () {

    it("should be an array", function () {
        var result = feiertagejs.getHolidays(2015,'BUND');
        expect(result).to.be.an('array');
        expect(result).to.have.length(9);
    });

    //
    it("New Year should be a holiday", function () {
        var day = new Date(2015,0,1);
        var result = feiertagejs.isHoliday(day,'BUND');

        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });


    it("6th of january should not be a holiday", function () {
        var day = new Date(2015,0,6);
        var result = feiertagejs.isHoliday(day,'BUND');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);
    });


    it("Simons Birthday is not a holiday", function () {
        var feiertag = new Date(2015,4,31);
        var result = feiertagejs.isHoliday(feiertag,'BUND');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);
    });
    it("Eastermonday should be a holiday", function () {
        var heiligeDreiKoenige = new Date(2015,3,6); //6. april
        var result = feiertagejs.isHoliday(heiligeDreiKoenige,'BUND');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });

    it("First May to be a holiday", function () {
        var heiligeDreiKoenige = new Date(2015,4,1);
        var result = feiertagejs.isHoliday(heiligeDreiKoenige,'BUND');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);
    });


    it("Christmas  to be a holiday", function () {
        var christmas1 = new Date(2015,11,25);
        var result = feiertagejs.isHoliday(christmas1,'BUND');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);

        var christmas2 = new Date(2015,11,26);
        result = feiertagejs.isHoliday(christmas2,'BUND');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);

    });


    it("Allerheiligen should not to be a holiday", function () {
        var day = new Date(2015,10,1);
        var result = feiertagejs.isHoliday(day,'BUND');
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);
    });

    it("cache should be an object", function () {
        //build cache
        var today = new Date();
        feiertagejs.isHoliday(today,'BUND');

        // getcache()
        var result = feiertagejs.getCache();
        expect(result).to.be.an('object');
        //expect(result['BUND']).to.be.an('object');
        expect(result[today.getFullYear()]['BUND'].integers).to.have.length(9);
        expect(result[today.getFullYear()]['BUND'].objects).to.have.length(9);

    });


});




