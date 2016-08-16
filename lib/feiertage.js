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
    var defaultLanguage = 'de';


    var feiertagejs = {
        isHoliday: isHoliday,                   // check is specific date is holiday
        isSpecificHoliday: isSpecificHoliday,    // check if specific date is specific holiday
        getHolidays: getHolidays,               // list of all holidays
        isSunOrHoliday: isSunOrHoliday,         // is Sunday or Holiday
        isMariaHimmelfahrt: isMariaHimmelfahrt, // is Maria Himmelfahrt @deprecat
        getCache: getCache,
        addTranslation: addTranslation,          // add new translation
        setLanguage: setLanguage,
        getLanguage: getLanguage
    };

    /**
     * Array of all constants (e.g. NEUJAHRSTAG:NEUJAHRSTAG)
     * @type {Array}
     */
    feiertagejs.Holidays = {};
    feiertagejs.currentLanguage = defaultLanguage;
    feiertagejs.translation = {
        'de': {
            NEUJAHRSTAG: "Neujahrstag",
            HEILIGEDREIKOENIGE: "Heilige Drei Könige",
            KARFREITAG: "Karfreitag",
            OSTERSONNTAG: "Ostersonntag",
            OSTERMONTAG: "Ostermontag",
            TAG_DER_ARBEIT: "Tag der Arbeit",
            CHRISTIHIMMELFAHRT: "Christi Himmelfahrt",
            PFINGSTSONNTAG: "Pfingstsonntag",
            PFINGSTMONTAG: "Pfingstmontag",
            FRONLEICHNAM: "Fronleichnam",
            MARIAHIMMELFAHRT: "Mariä Himmelfahrt",
            DEUTSCHEEINHEIT: "Tag der deutschen Einheit",
            REFORMATIONSTAG: "Reformationstag",
            ALLERHEILIGEN: "Allerheiligen",
            BUBETAG: "Buß- und Bettag",
            ERSTERWEIHNACHTSFEIERTAG: "1. Weihnachtstag",
            ZWEITERWEIHNACHTSFEIERTAG: "2. Weihnachtstag"
        }
    };

    /**
     * cache in two dimensional array with 2 types
     *  2015 : Array
     *     - BW : Array
     *        dates: [ date:integer, date:integer, date:integer ]
     *        objects: [ { date: Date, name: String} ]
     * @type {{}}
     * @private
     */
    var _cache = {};

    //extract keys only
    for (var key in feiertagejs.translation['de']) {
        if (feiertagejs.translation['de'].hasOwnProperty(key)) {
            feiertagejs.Holidays[key] = key;
        }
    }



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

    var validRegions = ['BW', 'BY', 'BE', 'BB', 'HB', 'HE', 'HH', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH', 'BUND', 'ALL'];


    /**
     * Add new Translation
     * @param isoCode string of the new language
     * @param newTranslation object key Value Pairs
     */
    function addTranslation(isoCode, newTranslation){
        isoCode = isoCode.toLowerCase();
        var defaultTranslation = feiertagejs.translation[defaultLanguage];
        var missingFields = false;


        // fill new Translation with default Language
        for (var prop in defaultTranslation) {
            if(!defaultTranslation.hasOwnProperty(prop)) continue;
            if (!newTranslation[prop]){
                missingFields = true;
                newTranslation[prop] = defaultTranslation[prop];
            }
        }
        if (missingFields){
            console.log('[feiertagejs] addTranslation: you did not add all holidays in your translation! Took German as fallback: ',newTranslation);
        }

        feiertagejs.translation[isoCode] = newTranslation;
    }

    /**
     * Set a language to default language
     * @param isoCode string
     */
    function setLanguage(isoCode){
        isoCode = isoCode.toLowerCase();
        if (!feiertagejs.translation[isoCode]){
            console.error('[feiertagejs] tried to set lanague to ', isoCode, ' but the translation is missing. Please use addTranslation(isoCode,object) first');
            return;
        }
        feiertagejs.currentLanguage = isoCode;
    }

    /**
     * get currently set language
     * @returns {string}
     */
    function getLanguage(){
        return feiertagejs.currentLanguage;
    }
    

    /**
     *
     * @param date DateObject
     * @param region as two Digit String
     * @returns {boolean}
     */
    function isSunOrHoliday(date, region) {
        return (date.getDay() === 0 || isHoliday(date, region));
    }

    /**
     *
     * @param date DateObject
     * @param region as two Digit String
     * @returns {*|boolean}
     */
    function isHoliday(date, region) {
        date = new Date(date); //make a copy to not change the original date.
        var internalDate = _getGetNormalizedDate(date);
        var holidays = _getHolidaysIntegerRepresentation(date.getFullYear(), region);
        return (holidays.indexOf(internalDate) !== -1);
    }

    /**
     *
     * @param date Date Object
     * @param holidayName String (see feiertage.holidays.xxx)
     * @param region optional
     *
     * @return {Boolean}
     */
    function isSpecificHoliday(date, holidayName, region) {

        region = region || 'ALL';

        if (feiertagejs.Holidays[holidayName] === null) {
            throw new Error('[Feiertage.js] PLEASE USE THE CONSTANTS FROM feiertagejs.Holidays.xx');
        }

        var holidays = _getHolidaysObjectRepresentation(date.getFullYear(), region);

        var foundHoliday = null;
        for (var i in holidays) {
            if (holidays.hasOwnProperty(i) && holidays[i].name == holidayName) {
                foundHoliday = holidays[i];
            }
        }
        if (!foundHoliday) {
            return false;
        }

        return (_getGetNormalizedDate(date) == foundHoliday.getNormalizedDate());
    }


    /**
     *
     * @param date
     * @deprecated
     * @returns {boolean}
     */
    function isMariaHimmelfahrt(date) {
        return (date.getMonth() === 8 && date.getDay() === 15 )
    }

    function getHolidays(j, region) {
        return _getHolidaysObjectRepresentation(j, region);
    }

    /**
     *
     * @param j
     * @param region
     * @returns {*}
     * @private
     */
    function _getHolidaysIntegerRepresentation(j, region) {
        var holidays = _getHolidaysOfYear(j, region);
        return holidays.integers;
    }

    /**
     *
     * @param j
     * @param region
     * @returns {*}
     * @private
     */
    function _getHolidaysObjectRepresentation(j, region) {
        var holidays = _getHolidaysOfYear(j, region);
        return holidays.objects;
    }

    /***
     *
     * @param j year, integer
     * @param region Short form for each Bundesland
     * @returns Object { integers: [int,int,int,..], objects:[{date:Date, name: String}] }
     */
    function _getHolidaysOfYear(j, region) {

        if (!region || validRegions.indexOf(region) === -1) {
            throw new Error('FEIERTAGEJS_INVALID_REGION', region);
        }

        // check if cache is available
        if (_cache[j] && _cache[j][region]) {

            return _cache[j][region];
        }
        //console.log('CACHE NOT HIT');


        // Feste Feiertage in allen Bundeslaendern:

        //
        //NEUJAHRSTAG: "Neujahrstag",
        //    HEILIGEDREIKOENIGE: "Heilige Drei Könige",
        //    KARFREITAG: "Karfreitag",
        //    OSTERSONNTAG: "Ostersonntag",
        //    TAG_DER_ARBEIT: "Tag der Arbeit",
        //    CHRISTIHIMMELFAHRT: "Christi Himmelfahrt",
        //    PFINGSTSONNTAG: "Pfingstsonntag",
        //    PFINGSTMONTAG: "Pfingstmontag",
        //    FRONLEICHNAM: "Fronleichnam",
        //    DEUTSCHEEINHEIT: "Tag der deutschen Einheit",
        //    REFORMATIONSTAG: "Reformationstag",
        //    ALLERHEILIGEN: "Allerheiligen",
        //    BUBETAG: "Buß- und Bettag",
        //    ERSTERWEIHNACHTSFEIERTAG: "1. Weihnachtstag",
        //    ZWEITERWEIHNACHTSFEIERTAG: "1. Weihnachtstag"

        //var feiertage = [_newDate(j, 1, 1), _newDate(j, 5, 1), _newDate(j, 10, 3), _newDate(j, 12, 25), _newDate(j, 12, 26)];
        var feiertageObjects = [_newHoliday('NEUJAHRSTAG', j, 1, 1), _newHoliday('HEILIGEDREIKOENIGE', j, 5, 1), _newHoliday('DEUTSCHEEINHEIT', j, 10, 3), _newHoliday('ERSTERWEIHNACHTSFEIERTAG', j, 12, 25), _newHoliday('ZWEITERWEIHNACHTSFEIERTAG', j, 12, 26)];


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

        feiertageObjects.unshift(_newHoliday('KARFREITAG', karfreitag));
        feiertageObjects.unshift(_newHoliday('OSTERMONTAG', ostermontag));
        feiertageObjects.unshift(_newHoliday('CHRISTIHIMMELFAHRT', christi_himmelfahrt));
        feiertageObjects.unshift(_newHoliday('PFINGSTMONTAG', pfingstmontag));


        // Heilige 3 Koenige
        if (region == 'BW' || region == 'BY' || region == 'ST' || region == 'ALL') {
            feiertageObjects.unshift(_newHoliday('HEILIGEDREIKOENIGE', j, 1, 6));
        }
        if (region == 'BB' || region == 'ALL') {
            feiertageObjects.unshift(_newHoliday('OSTERSONNTAG', easter_date));
            feiertageObjects.unshift(_newHoliday('PFINGSTSONNTAG', pfingstsonntag));
        }
        // Fronleichnam
        if (region == 'BW' || region == 'BY' || region == 'HE' || region == 'NW' || region == 'RP' || region == 'SL' || region == 'ALL') {
            var fronleichnam = new Date(easter_date.getTime());
            fronleichnam.addDays(60);
            feiertageObjects.unshift(_newHoliday('FRONLEICHNAM', fronleichnam));
        }

        // Maria Himmelfahrt
        if (region == 'SL' || region == 'ALL') {
            feiertageObjects.unshift(_newHoliday('MARIAHIMMELFAHRT', j, 8, 15));
        }
        // Reformationstag
        if (region == 'BB' || region == 'MV' || region == 'SN' || region == 'ST' || region == 'TH' || region == 'ALL') {
            feiertageObjects.unshift(_newHoliday('REFORMATIONSTAG', j, 10, 31));
        }

        // Allerheiligen
        if (region == 'BW' || region == 'BY' || region == 'NW' || region == 'RP' || region == 'SL' || region == 'ALL') {
            feiertageObjects.unshift(_newHoliday('ALLERHEILIGEN', j, 11, 1));
        }

        // Buss und Bettag
        if (region == 'SN' || region == 'ALL') { //@todo write test
            var bussbettag = getBussBettag(j);
            feiertageObjects.unshift(_newHoliday('BUBETAG', bussbettag.getUTCFullYear(), bussbettag.getUTCMonth(), bussbettag.getUTCDay()));
        }

        feiertageObjects.sort(function (a, b) {
            return a.getNormalizedDate() - b.getNormalizedDate();
        });

        var feiertage = {
            objects: feiertageObjects,
            integers: generateIntegerRepresentation(feiertageObjects)
        };
        // covert date to day in year
        // store cache
        if (!_cache[j]) {
            _cache[j] = {};
        }

        _cache[j][region] = feiertage;
        //// end cache

        return feiertage;
    }

    function getCache() {
        return _cache;
    }

    /**
     *
     * @param objects
     * @returns {*|Array}
     */
    function generateIntegerRepresentation(objects) {
        return _Map(objects, function (element) {
            return element.getNormalizedDate();
        });
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
        return new Date(Y, M - 1, D);
    }

    function getBussBettag(jahr) {
        var weihnachten = new Date(jahr, 11, 25, 12, 0, 0);
        var dow = weihnachten.getDate();
        var tageVorWeihnachten = (((dow == 0) ? 7 : dow) + 21 );
        var bbtag = new Date(weihnachten.getTime());
        bbtag.addDays(-tageVorWeihnachten);

        return bbtag;
    }


    // Erweitert Date um eine addDays()-Methode
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + days);
    };

    /**
     * Creates a new holiday Object. While it accepcts
     *  (name,year,month,day)
     *  or
     *  (name,date)
     *
     * @param name
     * @param year 4-digit-year: 2015 -- optional: could also be a date.
     * @param realMonth Month [1-12]
     * @param day real Day [1-31]
     *
     * @returns {{name: *, date: Date}}
     * @private
     */
    function _newHoliday(name, year, realMonth, day) {
        var date = null;
        if (typeof year.getMonth === 'function' && !realMonth) {
            date = year;
        } else {
            date = new Date(year, realMonth - 1, day);
        }

        return {
            name: name,
            date: date,
            getNormalizedDate: function () {
                return _getGetNormalizedDate(this.date);
            },
            trans: function (lang) {
                lang = lang || feiertagejs.currentLanguage;
                return feiertagejs.translation[lang][this.name];
            }
        };
    }

    /**
     * method to conver Date object to
     * internal date format (utc timestamp)
     * @param date
     * @returns {number}
     * @private
     */
    function _getGetNormalizedDate(date) {
        date.setHours(0, 0, 0, 0);
        return date.getTime();
    }

    /**
     *
     * @param array
     * @param method
     * @returns {*|Array}
     * @private
     */
    function _Map(array, method) {
        return array.map(method);
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