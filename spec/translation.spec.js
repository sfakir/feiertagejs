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
        expect(threeKings.trans()).to.equal("Tag der Arbeit");

    });


});




