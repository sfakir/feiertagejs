const feiertagejs = require('../lib/feiertage.js');
const expect = require('chai').expect;
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland


describe("set Custom Translations", () => {
    // use strict is required by node 4
    'use strict';

    it("dont allow missing language", () => {
        feiertagejs.setLanguage('de');
        expect(feiertagejs.getLanguage()).to.equal('de');
        feiertagejs.setLanguage('it');
        expect(feiertagejs.getLanguage()).to.equal('de');
    });

    it("setAndGetLanguage", () => {
        expect(feiertagejs.getLanguage()).to.equal('de');

        feiertagejs.addTranslation('en',{});
        expect(feiertagejs.getLanguage()).to.equal('de');

        feiertagejs.setLanguage('en');
        expect(feiertagejs.getLanguage()).to.equal('en');

    });

    it("setEnglish", () => {
        feiertagejs.addTranslation('en',{
            NEUJAHRSTAG: "New Years Eve",
            HEILIGEDREIKOENIGE: "Holy Three Kings"
        });
        feiertagejs.setLanguage('en');
        const holidays = feiertagejs.getHolidays('2016', 'BUND');
        const newYearsEve = holidays[0];

        expect(newYearsEve.trans()).to.equal("New Years Eve");
        expect(newYearsEve.trans('en')).to.equal("New Years Eve");
        expect(newYearsEve.trans('de')).to.equal("Neujahrstag");

    });

    it("German Fallback for missing translations", () => {
        feiertagejs.addTranslation('en',{
            NEUJAHRSTAG: "New Years Eve"
        });
        feiertagejs.setLanguage('en');
        const holidays = feiertagejs.getHolidays('2016', 'BUND');

        const threeKings = holidays[3];

        // fallback
        expect(threeKings.trans()).to.equal("Tag der Arbeit");
    });
});

