
var feiertagejs = require('../lib/feiertage.js');
var expect = require('chai').expect;
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

var isHolidayToday =  feiertagejs.isHoliday(new Date(),'BW');



describe("Check Feiertage by Name", function () {
    it("check ChristiHimmelfahrt 2016: check wrong dates", function () {
        // source: http://www.schulferien.org/Feiertage/2016/feiertage_2016.html
        var result = feiertagejs.isSpecificHoliday(new Date(2016,9,15), feiertagejs.Holidays.CHRISTIHIMMELFAHRT);
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);

        var result = feiertagejs.isSpecificHoliday(new Date(2016,12,24), feiertagejs.Holidays.CHRISTIHIMMELFAHRT);
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);


    });
    it("check ChristiHimmelfahrt 2016: check right date", function () {

        var somedate = new Date(2016,5,5);
        var result = feiertagejs.isSpecificHoliday(somedate, feiertagejs.Holidays.CHRISTIHIMMELFAHRT);
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);

    });


    it("every holiday should have a translation", function () {


        var somedate = new Date(2016,5,5);
        var holidays = feiertagejs.getHolidays(somedate.getFullYear(),'ALL');

        for (var i in holidays){
            if (holidays.hasOwnProperty(i)){
                var translation = holidays[i].trans();
                expect(translation).to.be.an('string');
            }
        }

    });



});




