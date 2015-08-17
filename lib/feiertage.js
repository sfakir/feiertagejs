/*!
 * feiertage.js
 * https://github.com/sfakir/feiertagejs
 *
 * Copyright 2015 Simon Fakir
 * Released under the MIT license
 */


/*jshint onevar: false, indent:4 */
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var feiertagejs = {
        isHoliday: isHoliday,
        getHolidays: getHolidays
    };

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
     * 	BW = Baden-Württemberg
     * 	BY = Bayern
     * 	BE = Berlin
     * 	BB = Brandenburg
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
     * @param region as two Digit Strin
     * @returns {*|boolean}
     */
    function isHoliday(date, region) {
        return (getHolidays(date.getYear(), region).indexOf(_toDateString(date)) !== -1);
    }

    /***
     *
     * @param j year, integer
     * @param region Short form for each Bundesland
     * @returns {*[]}
     */
    function getHolidays(j, region) {

        if (!region || validRegions.indexOf(region) === -1){
            throw new Error('INVALID_REGION', region);
        }

        //@todo: might be better to build up a cache for each bundesland.

        // Feste Feiertage in allen Bundeslaendern:
        var feiertage = [j + '-01-01', j + '-05-01', j + '-10-03', j + '-12-25', j + '-12-26'];

        var maria_himmelfahrt = j + '-08-15';
        var reformationstag = j + '-10-31';
        var allerheiligen = j + '-11-01';

        var bussbettag = getBussBettag(j);
        var easter_str = getEastern(j);
        var easter_date = new Date(easter_str.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
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


        feiertage = feiertage.concat([_toDateString(karfreitag), _toDateString(ostermontag), _toDateString(christi_himmelfahrt), _toDateString(pfingstmontag)]);

        // Jetzt Bundeslandspezifisch
        // Heilige 3 Koenige 
        if (region == 'BW' || region == 'BY' || region == 'ST') {
            feiertage.unshift(j + '-01-06');
        }
        if (region == 'BB') {
            feiertage.unshift(easter_str);
            feiertage.unshift(_toDateString(pfingstsonntag));
        }
        // Fronleichnam
        if (region == 'BW' || region == 'BY' || region == 'HE' || region == 'NW' || region == 'RP' || region == 'SL') {
            feiertage.unshift(_toDateString(fronleichnam));

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
            feiertage.unshift(_toDateString(bussbettag));
        }
        feiertage.sort();
        return feiertage;
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
        return Y + '-' + two(M) + '-' + two(D);
    }

    function getBussBettag(jahr) {
        var weihnachten = new Date(jahr, 11, 25, 12, 0, 0);
        var dow = weihnachten.getDate();
        var tageVorWeihnachten = (((dow == 0) ? 7 : dow) + 21 );
        var bbtag = new Date(weihnachten.getTime());
        bbtag.addDays(-tageVorWeihnachten);
        var monat = two(bbtag.getMonth() + 1);
        var tag = two(bbtag.getDate());
        return jahr + '-' + monat + '-' + tag;
    }

// macht aus 1 => 01
    function two(number) {
        return (number < 10) ? '0' + number : number;
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