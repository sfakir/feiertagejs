/*!
 * feiertage.js
 * https://github.com/sfakir/feiertagejs
 *
 * Copyright 2015 Simon Fakir
 * Released under the MIT license
 */

//
// Additional readings
// - how to format a javascript date: http://blog.stevenlevithan.com/archives/date-time-format
// - the right javascript date: http://stackoverflow.com/questions/10286204/the-right-json-date-format


/*jshint onevar: false, indent:4 */
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var feiertagejs = {
        isHoliday: isHoliday,
        getHolidays: getHolidays,
        isSunOrHoliday: isSunOrHoliday,
        isMariaHimmelfahrt: isMariaHimmelfahrt,
        getCache: getCache
    };

    /**
     * cache in two dimensional array
     *  2015 BW : [ date, date, date ]
     * @type {{}}
     * @private
     */
    var _cache = {};

    var root, previous_module;
    root = this;
    if (root != null) {
        previous_module = root.feiertagejs;
    }


    // noConflict Mode
    feiertagejs.noConflict = function () {
        root.feiertagejs = previous_module;
        return feiertagejs;
    };

    /*
     * Jahr: 2015
     * Bundesland:
     * 	BE = Berlin
     * 	BB = Brandenburg
     * 	BW = Baden-Württemberg
     * 	BY = Bayern
     * 	HB = Bremen
     * 	HH = Hamburg
     * 	HE = Hessen
     * 	MV = Mecklenburg-Vorpommern
     * 	NI = Niedersachsen
     * 	NW = Nordrhein-Westfalen
     * 	RP = Rheinland-Pfalz
     * 	SL = Saarland
     * 	SN = Sachsen
     * 	ST = Sachsen-Anhalt
     * 	SH = Schleswig-Holstein
     * 	TH = Thüringen

     */

    var validRegions = ['BW', 'BY', 'BE', 'BB', 'HB', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'];

    /**
     *
     * @param date DateObject
     * @param region as two Digit String
     */
    function isSunOrHoliday(date, region)
    {
        if (date.getDay() === 0){
            return true;
        }
        if (isHoliday(date,region)) {
            return true;
        }
        return false;
    }
    /**
     *
     * @param date DateObject
     * @param region as two Digit String
     * @returns {*|boolean}
     */
    function isHoliday(date, region) {

        var date = _normalizeDate(date);
        // @todo: diese Methode muss nach Datum vergleichen..
        return (getHolidays(date.getFullYear(), region).indexOf(date) !== -1);
    }


    /**
     *
     * @param date
     * @returns {boolean}
     */
    function isMariaHimmelfahrt(date){
        return (date.getMonth() === 8 && date.getDay() === 15 )
    }
    /***
     *
     * @param j year, integer
     * @param region Short form for each Bundesland
     * @returns {*[]}
     */
    function getHolidays(j, region) {

        if (!region || validRegions.indexOf(region) === -1) {
            throw new Error('INVALID_REGION', region);
        }

        // check if cache is available
        if (_cache[j] && _cache[j][region]){
            return _cache[j][region];
        }


        //@todo: might be better to build up a cache for each bundesland.

        // Feste Feiertage in allen Bundeslaendern:

        var feiertage = [_newDate(j, 1, 1), _newDate(j, 5, 1), _newDate(j, 10, 3), _newDate(j, 12, 25), _newDate(j, 12, 26)];

        var maria_himmelfahrt = _newDate(j, 8, 15);
        var reformationstag = _newDate(j, 10, 31);
        var allerheiligen = _newDate(j, 11, 1);

        var bussbettag = getBussBettag(j);
        var easter_date = getEastern(j);
        //var easter_date = new Date(easter_str.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var karfreitag = new Date(easter_date.getTime());
        karfreitag.addDays(-2);
        var ostermontag = new Date(easter_date.getTime());
        ostermontag.addDays(1);
        var christi_himmelfahrt = new Date(easter_date.getTime());
        christi_himmelfahrt.addDays(39);
        var pfingstsonntag = new Date(easter_date.getTime());
        pfingstsonntag.addDays(49);
        var pfingstmontag = new Date(easter_date.getTime());
        pfingstmontag.addDays(50);
        var fronleichnam = new Date(easter_date.getTime());
        fronleichnam.addDays(60);


        feiertage = feiertage.concat([karfreitag, ostermontag, christi_himmelfahrt, pfingstmontag]);

        // Jetzt Bundeslandspezifisch
        // Heilige 3 Koenige 
        if (region == 'BW' || region == 'BY' || region == 'ST') {
            feiertage.unshift(_newDate(j,1,6));
        }
        if (region == 'BB') {
            feiertage.unshift(easter_date);
            feiertage.unshift(pfingstsonntag);
        }
        // Fronleichnam
        if (region == 'BW' || region == 'BY' || region == 'HE' || region == 'NW' || region == 'RP' || region == 'SL') {
            feiertage.unshift(fronleichnam);

        }

        // Maria Himmelfahrt
        if (region == 'SL') {
            feiertage.unshift(maria_himmelfahrt);
        }
        // Reformationstag
        if (region == 'BB' || region == 'MV' || region == 'SN' || region == 'ST' || region == 'TH') {
            feiertage.unshift(reformationstag);
        }
        // Allerheiligen

        if (region == 'BW' || region == 'BY' || region == 'NW' || region == 'RP' || region == 'SL') {

            feiertage.unshift(allerheiligen);
        }

        // Buss und Bettag
        if (region == 'SN') {
            feiertage.unshift(bussbettag);
        }

        var result =  feiertage.sort(function(a,b){return a-b});

        // store cache
        if (!_cache[j]) {
            _cache[j] = {};
        }
        _cache[j][region] = result;
        // end cache

        return result;
    }

    function getCache() {
        return _cache;
    }
// Magic Gauss, irgendwo gefunden, hoffe, es stimmt.
    function getEastern(Y) {
        var C = Math.floor(Y / 100);
        var N = Y - 19 * Math.floor(Y / 19);
        var K = Math.floor((C - 17) / 25);
        var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        var L = I - J;
        var M = 3 + Math.floor((L + 40) / 44);
        var D = L + 28 - 31 * Math.floor(M / 4);
        return _newDate(Y,M,D);
    }

    function getBussBettag(jahr) {
        var weihnachten = new Date(jahr, 11, 25, 12, 0, 0);
        var dow = weihnachten.getDate();
        var tageVorWeihnachten = (((dow == 0) ? 7 : dow) + 21 );
        var bbtag = new Date(weihnachten.getTime());
        bbtag.addDays(-tageVorWeihnachten);

        return bbtag;

        //var monat = bbtag.getMonth() + 1;
        //var tag = bbtag.getDate();
        //return _newDate(jahr,monat,tag);
    }

// macht aus 1 => 01
    function two(number) {
        return (number < 10) ? '0' + number : number;
    }

    /**
     * receives a date object,
     * and returns it normales to Europe time 0:00
     *
     * @param date
     * @private
     */
    function _normalizeDate(date){
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;

    }
// wandelt ein Date-Objekt in einen datesstring um yyy-mm-dd
    function _toDateString(date) {
        var year = date.getYear() + 1900;
        var month = date.getMonth() + 1;
        month = two(month);
        var day = two(date.getDate());
        return year + '-' + month + '-' + day;
    }

// Erweitert Date um eine addDays()-Methode
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + days);
    };


    /**
     *
     * @param year 4-digit-year: 2015
     * @param realMonth Month [1-12]
     * @param day real Day [1-31]
     * @returns {Date}
     * @private
     */
    function _newDate(year, realMonth, day) {
        return new Date(year, realMonth - 1, day);

    }


    //*******************************
    // Register Module
    //*******************************

    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = feiertagejs;
    }
    // AMD / RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return feiertagejs;
        });
    }
    // included directly via <script> tag
    else {
        root.feiertagejs = feiertagejs;
    }


}());