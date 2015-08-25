
var feiertagejs = require('../lib/feiertage.js');
var expect = require('chai').expect;
// https://de.wikipedia.org/wiki/Feiertage_in_Deutschland

var isHolidayToday =  feiertagejs.isHoliday(new Date(),'BW');



describe("Holidays 2015 in Bavaria:", function () {
  it("should be an array", function () {
    var result = feiertagejs.getHolidays(2015,'BY');
    expect(result).to.be.an('array');
    expect(result).to.have.length(12);
  });

  //
  it("Maria Himmelfahrt not be a holiday", function () {
    var mariaHimemlfahrt = new Date(2015,9,15);
    var result = feiertagejs.isHoliday(mariaHimemlfahrt,'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });


  it("Simons Birthday is not a holiday", function () {
    var feiertag = new Date(2015,4,31);
    var result = feiertagejs.isHoliday(feiertag,'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(false);
  });
  it("Maria HeiligeDreiKönige  be a holiday", function () {
    var heiligeDreiKoenige = new Date(2015,0,6);
    var result = feiertagejs.isHoliday(heiligeDreiKoenige,'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });

  it("First May to be a holiday", function () {
    var heiligeDreiKoenige = new Date(2015,0,6);
    var result = feiertagejs.isHoliday(heiligeDreiKoenige,'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);
  });


  it("Christmas  to be a holiday", function () {
    var christmas1 = new Date(2015,11,25);
    var result = feiertagejs.isHoliday(christmas1,'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);

    var christmas2 = new Date(2015,11,26);
    result = feiertagejs.isHoliday(christmas2,'BY');
    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);

  });

  it("cache should be an object", function () {
    var today = new Date();

    feiertagejs.isHoliday(today,'BY');
    var result = feiertagejs.getCache();
    expect(result).to.be.an('object');
    //expect(result['BY']).to.be.an('object');
    expect(result[today.getFullYear()]['BY']).to.have.length(12);

  });


});




