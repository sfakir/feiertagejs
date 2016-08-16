var feiertagejs = require('../lib/feiertage.js');
var expect = require('chai').expect;
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland


describe("set Custom Translations", function () {

    it("dont allow missing language", function () {
        feiertagejs.setLanguage('de');
        expect(feiertagejs.getLanguage()).to.equal('de');
        feiertagejs.setLanguage('it');
        expect(feiertagejs.getLanguage()).to.equal('de');
    });
    
    it("setAndGetLanguage", function () {
        

        expect(feiertagejs.getLanguage()).to.equal('de');

        feiertagejs.addTranslation('en',{});
        expect(feiertagejs.getLanguage()).to.equal('de');

        feiertagejs.setLanguage('en');
        expect(feiertagejs.getLanguage()).to.equal('en');

    });
    it("setEnglish", function () {

        feiertagejs.addTranslation('en',{
            NEUJAHRSTAG: "New Years Eve",
            HEILIGEDREIKOENIGE: "Holy Three Kings"
        });
        feiertagejs.setLanguage('en');
        var holidays = feiertagejs.getHolidays('2016','BUND');
        var newYearsEve = holidays[0];

        expect(newYearsEve.trans()).to.equal("New Years Eve");
        expect(newYearsEve.trans('en')).to.equal("New Years Eve");
        expect(newYearsEve.trans('de')).to.equal("Neujahrstag");

    });
    it("German Fallback for missing translations", function () {

        feiertagejs.addTranslation('en',{
            NEUJAHRSTAG: "New Years Eve"
        });
        feiertagejs.setLanguage('en');

        var holidays = feiertagejs.getHolidays('2016','BUND');
        var threeKings = holidays[3];

        // fallback
        expect(threeKings.trans()).to.equal("Heilige Drei Könige");




    });
    // it("check ChristiHimmelfahrt 2016: check right date", function () {
    //     // 5.5.2016
    //     var somedate = new Date(2016, 4, 5);
    //     var result = feiertagejs.isSpecificHoliday(somedate, feiertagejs.Holidays.CHRISTIHIMMELFAHRT);
    //     expect(result).to.be.an('boolean');
    //     expect(result).to.equal(true);
    //
    // });
    //
    // it("check Erster Weihnachtsfeiertag 2016: check right date", function () {
    //     // 25.12.2016
    //     var somedate = new Date(2016, 11, 25);
    //     var result = feiertagejs.isSpecificHoliday(somedate, feiertagejs.Holidays.ERSTERWEIHNACHTSFEIERTAG);
    //     expect(result).to.be.an('boolean');
    //     expect(result).to.equal(true);
    //
    // });
    //
    // it("check Erster Weihnachtsfeiertag 2016: check wrong date", function () {
    //
    //     // 5.5.2016
    //     var somedate = new Date(2016, 11, 29);
    //     var result = feiertagejs.isSpecificHoliday(somedate, feiertagejs.Holidays.ERSTERWEIHNACHTSFEIERTAG);
    //     expect(result).to.be.an('boolean');
    //     expect(result).to.equal(false);
    //
    // });
    // it("every holiday should have a translation", function () {
    //
    //
    //     var somedate = new Date(2016, 5, 5);
    //     var holidays = feiertagejs.getHolidays(somedate.getFullYear(), 'ALL');
    //
    //     for (var i in holidays) {
    //         if (holidays.hasOwnProperty(i)) {
    //             var translation = holidays[i].trans();
    //             expect(translation).to.be.an('string');
    //         }
    //     }
    //
    // });


});




