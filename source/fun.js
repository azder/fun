/**
 * Created by azder on 2014-03-05.
 */

//  The fun to play with functional supplement for JS
var fun = (function () {

    // ## use strict
    // ALWAYS use this flavor of JS which saves headaches
    'use strict';

    // ## var
    // start of all the definitions
    var

    //
    privates = {

    },

    // ## Combinables

    // ### noop
    // doesn't do anything but can be used as a default in places where a function is expected

    noop = function () {
    },

    // ### ident
    // the identity function which only takes 1 parameter
    // and just returns that same parameter

    ident = function (value) {
        return value;
    },

    // ## Testers

    // ### nil
    // returns `true` when  `value` is either `null` or `undefined`
    // and returns `false` for everything else

    nil = function (value) {
        return null === value || void 0 === value;
    },

    // ### isa
    // returns `true` when `value` is an `Array`, `false` otherwise

    isa = Array.isArray,

    // ### streq
    // returns `true` when `value1` and `value2` converted to strings  are equal, `false` otherwise

    streq = function (value1, value2) {
        return ('' + value1) === ('' + value2);
    },

    // ### nostreq
    // returns `true` when `value1` and `value2` converted to strings are not equal, `false` otherwise

    nostreq = function (value1, value2) {
        return ('' + value1) !== ('' + value2);
    },

    // ### truthy
    // returns `true` for any value that is not:
    // `false`, `"false"` (false in quotes),
    // `0` (zero), `"0"` (zero in quotes),
    // `null`, `undefined`, `NaN`,
    // `""` (empty string), `"off"`, `"no"`
    // and returns `false` otherwise

    truthy = function (value) {

        if (null === value || void 0 === value) {
            return false;
        }

        if (!value) {
            return false;
        }

        value = '' + value;

        return 'null' !== value && 'undefined' !== value && '0' !== value && 'false' !== value && 'off' !== value && 'no' !== value;

    },

    // ### falsy
    // returns `true` for any value that is:
    // `false`, `"false"` (false in quotes),
    // `0` (zero), `"0"` (zero in quotes),
    // `null`, `undefined`, `NaN`,
    // `""` (empty string), `"off"`, `"no"`
    // and returns `false` otherwise

    falsy = function (value) {

        if (null === value || void 0 === value) {
            return true;
        }

        if (!value) {
            return true;
        }

        value = '' + value;

        return 'null' === value || 'undefined' === value || '0' === value || 'false' === value || 'off' === value || 'no' === value;


    },

    // ## Converters

    // ### bool
    // returns either `true` or `false` based on `value`

    bool = function (value) {
        return !!value;
    },

    // ## Pickers

    // ### elvis
    // returns `value` if it is not nil, the `dfault` otherwise
    // even if `undefined`
    // **trivia**: name comes from the `?:` (elvis) operator in some languages

    elvis = function (value, dfault) {
        return (nil(value) ? dfault : value);
    },


    object = function (value, dfault) {

        var i = 1, len = arguments.length;

        while (nil(value) && i < len) {
            value = arguments[i];
            i += 1;
        }

        return nil(value) ? {} : value;

    },

    string = function (value, dfault) {

        var i = 1, len = arguments.length;

        while (nil(value) && i < len) {
            value = arguments[i];
            i += 1;
        }

        return nil(value) ? '' : '' + value;

    },

    array = function (value, dfault) {

        var i = 1, len = arguments.length;

        while (nil(value) && !isa(value) && i < len) {

            value = arguments[i];
            i += 1;

        }

        return nil(value) && !isa(value) ? [] : value;

    },

    nav = function (obj, path) {

        var i, props, len;

        if (nil(obj)) {
            return obj;
        }

        props = string(path).split('.');
        len = props.length;

        for (i = 0; i < len; i += 1) {

            obj = obj[props[i]];

            if (nil(obj)) {
                return obj;
            }

        }

        return obj;

    },

    extend = function () {

    },

    enrich = function () {

    },

    switcher = function (dfault, map) {

        map = object(map);

        return function (key) {
            return elvis(map[key], dfault);
        };

    },

    strategist = function (dfault, map, tests) {

        var s = switcher(dfault, map);

        return function () {
            var args; //TODO: to array
            return s[key].apply();
        };

    },

    enclose = function (value, map) {

    },

    is = function (value) {

        return {
            nil: function () {
                return nil(value);
            }
        };

    },

    to = function (value) {

    }

    ;

    // ## Exposed
    // only these are accessible from the outside

    return {
        noop:      noop,
        ident:     ident,
        nil:       nil,
        streq:     streq,
        nostreq:   nostreq,
        truthy:    truthy,
        falsy:     falsy,
        bool:      bool,
        elvis:     elvis,
        object:    object,
        string:    string,
        nav:       nav,
        extend:    extend,
        switcher:  switcher,
        stategist: strategist,
        enclose:   enclose,
        is:        is
    };

}
());
