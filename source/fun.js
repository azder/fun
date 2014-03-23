/*global define:true*/
/*jshint node:true*/

//noinspection ThisExpressionReferencesGlobalObjectJS
/**
 * Created by azder on 2014-03-05.
 */

//  The fun to play with functional supplement for JS
(function (G, factory) {

    'use strict';

    var name = 'fun';

    if ('object' === typeof module && 'object' === typeof module.exports) {
        module.exports = factory(G);
        return;

    }


    if ('function' === typeof define && define.amd) {
        define(name, factory);
        return;
    }

    // Browser global
    G[name] = factory(G);


}(this, function () {

    // ## use strict
    // ALWAYS use this flavor of JS which saves headaches
    'use strict';

    // ## var
    // start of all the definitions
    var

    // ## "Imports"

    OP = Object.prototype,
    AP = Array.prototype,
    FP = Function.prototype,

    call = FP.call,
    slice = call.bind(AP.slice),
    tos = call.bind(OP.toString),
    owns = call.bind(OP.hasOwnProperty),


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


    // ### nil
    // returns `true` when  `value` is either `null` or `undefined`
    // and returns `false` for everything else

    nil = function (value) {
        return null === value || void 0 === value;
    },

    // ### ensure
    // returns `value` if it is not nil, the `dfault` otherwise
    // even if `undefined`

    ensure = function (value, dfault) {
        return nil(value) ? dfault : value;
    },

    // ### isa
    // returns `true` when `value` is an `Array`, `false` otherwise

    isa = ensure(Array.isArray, function (value) {
        return tos(value) === '[object Array]';
    }),

    // ### isn
    // returns `true` when `value` is a `Number`, `false` otherwise

    isn = function (value) {
        return value === +value;
    },

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

    object = function (value) {

        var i = 1, len = arguments.length;

        while (nil(value) && i < len) {
            value = arguments[i];
            i += 1;
        }

        return nil(value) ? {} : value;

    },

    string = function (value) {

        var i = 1, len = arguments.length;

        while (nil(value) && i < len) {
            value = arguments[i];
            i += 1;
        }

        return nil(value) ? '' : '' + value;

    },

    number = function (value) {

        var i, len = arguments.length;

        for (i = 0; i < len; i += 1) {

            value = parseFloat('' + arguments[i]);

            if (!nil(value) && !isNaN(value) && isFinite(value)) {
                return value;
            }

        }

        return 0;

    },

    values = function (o) {

        var key, values = [];
        o = object(o);

        for (key in o) {
            //noinspection JSUnfilteredForInLoop
            if (owns(o, key)) {
                //noinspection JSUnfilteredForInLoop
                values.push(o[key]);
            }
        }

        return values;

    },

    array = function () {

        var i, arg, len = arguments.length;

        for (i = 0; i < len; i += 1) {

            arg = arguments[i];

            if (nil(arg)) {
                continue;
            }

            if (isa(arg)) {
                return arg;
            }

            return values(arg);

        }

        return [];

    },


    dot = function (field) {
        return function (obj) {
            return object(obj)[field];
        };
    },

    nav = function (path) {


        return function (obj) {

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
        };

    },


    // ##
    iterator = function (callback, context) {

        var fn = callback.bind(context);

        return function (object) {

            var length, i;

            if (nil(object) || nil(callback)) {
                return object;
            }

            length = object.length;

            if (!isn(length)) {
                for (i in object) {
                    //noinspection JSUnfilteredForInLoop
                    if (owns(object, i) && null === fn(object[i], i, object)) {
                        return object;
                    }
                }
                return object;
            }

            for (i = 0; i < length; i += 1) {
                if (null === fn(object[i], i, object)) {
                    return object;
                }
            }

            return object;

        };

    },


    extend = function () {

    },

    switcher = function (map) {

        map = object(map);

        return function (key) {
            return ensure(map[string(key)], map['']);
        };

    },

    selector = function (map) {

        map = object(map);

        return function () {

            var key, result, args;

            args = slice(arguments);

            for (key in map) {

                //noinspection JSUnfilteredForInLoop
                if (!owns(map, key)) {
                    continue;
                }

                //noinspection JSUnfilteredForInLoop
                result = string(map(key).apply(this, args));

                if (result) {
                    return result;
                }

            }

            return '';

        };


    },


    is = function (value) {

        return {
            nil: function () {
                return nil(value);
            }
        };

    },

    to = function () {

    },

    curry = function (fn) {

        var args = slice(arguments, 1);
        return function () {
            return fn.apply(this, args.concat(slice(arguments)));
        };
    },

    acurry = function (fn, argn) {

        fn = ensure(fn, noop);
        argn = number(argn, fn.length);

        var f = function () {

            var diff = argn - arguments.length;

            if (0 >= diff) {
                return fn.apply(this, arguments);
            }

            return acurry(curry.apply(this, [fn].concat(slice(arguments))), diff);

        };

        f.toString = function () {
            return fn.toString();
        };

        f.curried = true;
        return f;

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
        ensure:    ensure,
        object:    object,
        string:    string,
        number:    number,
        array:     array,
        nav:       nav,
        iterator:  iterator,
        extend:    extend,
        switcher:  switcher,
        selector:  selector,
        stategist: noop,
        enclose:   noop,
        to:        to,
        is:        is,
        dot:       dot,
        curry:     curry,
        acurry:    acurry,
        slice:     slice,
        owns:      owns
    };

}));
