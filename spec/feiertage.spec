
var feiertagejs = require('../lib/feiertage.js');


var feiertageBW =  feiertagejs.getHolidays(2015,'BW');


describe('Feiertage BW', function() {

  it('global setup should be an array', function() {
    var result = feiertagejs.getHolidays(2015,'BW');

    expect(result).toEqual(frisby.globalSetup());
  });


});



console.log(feiertageBW);



