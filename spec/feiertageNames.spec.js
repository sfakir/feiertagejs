const feiertagejs = require('../lib/feiertage.js');
const expect = require('chai').expect;
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland


describe("Check Feiertage by Name", () => {
    it("check ChristiHimmelfahrt 2016: check wrong dates", () => {
        // source: http://www.schulferien.org/Feiertage/2016/feiertage_2016.html
        let result = feiertagejs.isSpecificHoliday(new Date(2016, 9, 15), feiertagejs.Holidays.CHRISTIHIMMELFAHRT);
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);

        result = feiertagejs.isSpecificHoliday(new Date(2016, 12, 24), feiertagejs.Holidays.CHRISTIHIMMELFAHRT);
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);


    });
    it("check ChristiHimmelfahrt 2016: check right date", () => {
        // 5.5.2016
        const somedate = new Date(2016, 4, 5);
        const result = feiertagejs.isSpecificHoliday(somedate, feiertagejs.Holidays.CHRISTIHIMMELFAHRT); // und Vatertag
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);

    });

    it("check Erster Weihnachtsfeiertag 2016: check right date", () => {
        // 25.12.2016
        const somedate = new Date(2016, 11, 25);
        const result = feiertagejs.isSpecificHoliday(somedate, feiertagejs.Holidays.ERSTERWEIHNACHTSFEIERTAG);
        expect(result).to.be.an('boolean');
        expect(result).to.equal(true);

    });

    it("check Erster Weihnachtsfeiertag 2016: check wrong date", () => {

        // 5.5.2016
        const somedate = new Date(2016, 11, 29);
        const result = feiertagejs.isSpecificHoliday(somedate, feiertagejs.Holidays.ERSTERWEIHNACHTSFEIERTAG);
        expect(result).to.be.an('boolean');
        expect(result).to.equal(false);

    });
    it("every holiday should have a translation", () => {


        const somedate = new Date(2016, 5, 5);
        const holidays = feiertagejs.getHolidays(somedate.getFullYear(), 'ALL');

        for (let i in holidays) {
            if (holidays.hasOwnProperty(i)) {
                const translation = holidays[i].trans();
                expect(translation).to.be.an('string');
            }
        }

    });


});




