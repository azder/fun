/**
 * Created by azder on 2014-03-05.
 */

//  The fun to play with functional supplement for JS
var fun = (function () {

    // ## use strict
    // ALWAYS use this flavor of JS which saves headaches
    'use strict';

    // ## var
    // start of all the variables declarations/definitions
    var

    //
    privates = {

    },

    // ## noop
    // the _no operation_ function that doesn't do anything but
    //  can be used as a default in places  where a function is expected
    noop = function () {
    },

    // ## ident
    // the identity function which only takes 1 parameter
    // and just returns that same parameter
    ident = function (value) {
        return value;
    },

    // a **test** function which gives `true` when
    // the provided `value` is either `null` or `undefined`
    // and returns `false` for everything else
    nil = function (value) {
        return null === value || void 0 === value;
    },

    object = function (value, dfault) {
        return (nil(value) ? (nil(dfault) ? {} : dfault) : value);
    },

    string = function (value, dfault) {
        return (nil(value) ? (nil(dfault) ? '' : '' + dfault) : '' + value);
    },

    elvis = function (value, dfault) {
        return (nil(value) ? dfault : value);
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

    switcher = function () {

        return function (dfault, map) {

            map = elvis(map, {});

            return function (key) {
                return elvis(map[key], dfault);
            };

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

    }
    // var ends here
    ;


    return {
        nil:    nil,
        object: object,
        nav:    nav
    };

}());
