/**
 * Created by azder on 2014-04-21.
 */

//: The fun to play with functional supplement for JS
//: Created by Azder [(azhder@gmail.com)](mailto:azhder@gmail.com) on 2014-03-05.

//: **Note**: Requires support of ES5.1, you can check the [compatibility table](http://kangax.github.io/es5-compat-table/)

/*global define:false, module:false */


(function (G) {

    // ALWAYS
    'use strict';

    //: A function that handles the exporting of
    //: this library into the environment

    return function (name, factory) {

        //: In case there is CommonJS module system in place
        //: (used by _Node.js_) then `module.exports` will export the library
        if (module && typeof module.exports) {
            module.exports = factory();
            return;

        }

        //: If the module loading system is AMD, us it's `define` function
        if ('function' === typeof define && define.amd) {
            define(factory);
            return;
        }

        //: In case this file is included via Browser's `script` tag,
        //: just export it as a global using the `name` argument

        G[name] = factory(G);


    };

}(this))


//noinspection CommaExpressionJS

/**
 * Created by azder on 2014-03-05.
 */

//: first parameter is the name to use as a global for this library
//: when included by `<script src="">` tag in browser

('fun', function () { // jshint ignore:line

    // ALWAYS
    'use strict';


    function Fun(options) {

        if (!(this instanceof Fun)) {
            return new Fun(options);
        }

        options = object(options);

        if (options.mixin) {
            mixin(options.mixin, Fun);
        }

        return this;

    }


    var

    //: ## "Imports"

    OP = Object.prototype,
    AP = Array.prototype,
    FP = Function.prototype,

    //: ## Binders

    abind = function (/*Function*/ fn, /*Object,optional*/ context) {
        return 'undefined' === typeof context ? FP.apply.bind(fn) : FP.apply.bind(fn, context);
    },

    cbind = function (/*Function*/ fn, /*Object,optional*/ context) {
        return 'undefined' === typeof context ? FP.call.bind(fn) : FP.call.bind(fn, context);
    },

    //: ## Borrowed
    //: Useful functions from the `Object` and `Array` prototypes

    slice = cbind(AP.slice),
    tos = cbind(OP.toString),
    owns = cbind(OP.hasOwnProperty),


    //: ## Basics
    //: i.e. the most basic helpers

    //: ### noop
    //: doesn't do anything but can be used as a default in places where a function is expected

    noop = function () {
    },

    //: ### unimplemented
    unimplemented = function () {
        throw new Error('Not implemented!');
    },

    //: ### ident
    //: the identity function which only takes 1 parameter
    //: and just returns that same parameter

    ident = function (value) {
        return value;
    },

    //: ### nil
    //: returns `true` when  `value` is either `null` or `undefined`
    //: and returns `false` for everything else

    nil = function (value) {
        return null === value || void 0 === value;
    },

    //: ### missing
    //: returns `true` when  `value` is `undefined`
    //: and returns `false` for everything else

    missing = function (value) {
        return void 0 === value;
    },

    //: ### elvis
    //: returns `value` if it is `null` or `undefined`, the `dfault` otherwise
    //:
    //: **Note:** if `dfault` is returned, the result can still be `null` or `undefined`

    elvis = function (dfault, value) {
        return nil(value) ? dfault : value;
    },

    //: ### maybe

    maybe = function (fn, length) {

        return function f() {

            var i = 0, args = slice(arguments), len = elvis(args.length, length);

            if (0 === len) {
                return void 0;
            }

            while (i < len) {
                if (nil(args[i])) {
                    return void 0;
                }
                i += 1;
            }

            f.toString = function () {
                return '/*maybe: ' + len + ' */ ' + fn.toString();
            };

            return fn.apply(this, args);

        };

    },

    //: ### addtos
    //:  **Note:** requires support of `Object.defineProperty`
    //: (ES5 standard, supported by these [browsers](http://kangax.github.io/es5-compat-table/#Object.defineProperty))

    addtos = function (o) {

        return Object.defineProperty(o, 'toString', {
            enumerable:   false,
            configurable: true,
            writable:     true,
            value:        tos.bind(o)
        });

    },

    //: ### empty
    //: returns a prototypless empty object
    //: i.e. _not even_ `Object` is in it's prototype chain
    //:
    //:  **Note:** requires support of `Object.create`
    //: (ES5 standard, supported by these [browsers](http://kangax.github.io/es5-compat-table/#Object.create))

    empty = function (options) {
        return options && false === options.tos ? Object.create(null) : addtos(Object.create(null));
    },


    //: ### isa
    //: returns `true` when `value` is an `Array`, `false` otherwise
    //:
    //: **Note:** requires support of `Array.isArray` (ES5 standard)
    //: to guarantee that all edge cases are covered

    isa = elvis(function (value) {
        return tos(value) === '[object Array]';
    }, Array.isArray),

    //: ### isn
    //: returns `true` when `value` is a `Number`, `false` otherwise

    isn = function (value) {
        return value === +value;
    },

    //: ### streq
    //: returns `true` when `value1` and `value2` converted to strings  are equal, `false` otherwise

    streq = function (value1, value2) {
        return ('' + value1) === ('' + value2);
    },

    //: ### nostreq
    //: returns `true` when `value1` and `value2` converted to strings are not equal, `false` otherwise

    nostreq = function (value1, value2) {
        return ('' + value1) !== ('' + value2);
    },


    // ### valeq
    //TODO: implement valeq
    // valeq = unimplemented,

    // ### novaleq
    //TODO: implement novaleq
    // novaleq = unimplemented,


    //: ### truthy
    //: returns `true` for any value that is not:
    //:   - `false`,
    //:   - `"false"` (false in quotes),
    //:   - `0` (zero),
    //:   - `"0"` (zero in quotes),
    //:   - `null`,
    //:   - `undefined`,
    //:   - `NaN`,
    //:   - `""` (empty string),
    //:   - `"off"`,
    //:   - `"no"`
    //:
    //: and returns `false` otherwise

    truthy = function (value) {

        if (nil(value)) {
            return false;
        }

        if (!value) {
            return false;
        }

        value = '' + value;

        return 'null' !== value && 'undefined' !== value && '0' !== value && 'false' !== value && 'off' !== value && 'no' !== value;

    },

    //: ### falsy
    //: returns `true` for any value that is:
    //:   - `false`,
    //:   - `"false"` (false in quotes),
    //:   - `0` (zero),
    //:   - `"0"` (zero in quotes),
    //:   - `null`,
    //:   - `undefined`,
    //:   - `NaN`,
    //:   - `""` (empty string),
    //:   - `"off"`,
    //:   - `"no"`
    //:
    //: and returns `false` otherwise

    falsy = function (value) {

        if (nil(value)) {
            return true;
        }

        if (!value) {
            return true;
        }

        value = '' + value;

        return 'null' === value || 'undefined' === value || '0' === value || 'false' === value || 'off' === value || 'no' === value;


    },

    //: ## Converters

    //: ### bool
    //: returns either `true` or `false` based on `value`

    bool = function (value) {
        return !!value;
    },


    //: ### object

    object = function (value) {

        var i = 1, len = arguments.length;

        while (nil(value) && i < len) {
            value = arguments[i];
            i += 1;
        }

        return nil(value) ? {} : value;

    },

    //: ### string

    string = function (value) {

        var i = 1, len = arguments.length;

        while (nil(value) && i < len) {
            value = arguments[i];
            i += 1;
        }

        if (nil(value)) {
            return '';
        }

        try {
            return '' + value;
        } catch (e) {
            return tos(value);
        }

    },

    //: ### number

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

    //: ### keys
    //:  **Note:** requires support of `Object.keys`
    //: (ES5 standard, supported by these [browsers](http://kangax.github.io/es5-compat-table/#Object.keys))

    keys = function (o) {

        var k = [];

        if (nil(o)) {
            return k;
        }

        if (o !== Object(o)) {
            return k;
        }

        return Object.keys(o);

    },

    //: ### values

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

    //: ### array

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

    //: ## Accesesors

    //: ### dot

    dot = function (field) {
        return function (obj) {
            return object(obj)[field];
        };
    },


    //: ### nav

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


    //: ## iterator

    iterator = function (callback, context) {

        var fn = callback.bind(context);

        return function (object) {

            var length, index;

            if (nil(object) || nil(callback)) {
                return object;
            }

            length = object.length;

            if (!isn(length)) {
                for (index in object) {
                    //noinspection JSUnfilteredForInLoop
                    if (owns(object, index) && null === fn(object[index], index, object)) {
                        return object;
                    }
                }
                return object;
            }

            for (index = 0; index < length; index += 1) {
                if (null === fn(object[index], index, object)) {
                    return object;
                }
            }

            return object;

        };

    },

    //: ## mapper

    mapper = function (callback, context) {

        var fn = callback.bind(context);

        return function (object) {

            var length, index, mapped = [];

            if (nil(object) || nil(callback)) {
                return mapped;
            }

            length = object.length;

            if (!isn(length)) {
                mapped = {};
                for (index in object) {
                    //noinspection JSUnfilteredForInLoop
                    if (!owns(object, index)) {
                        continue;
                    }
                    //noinspection JSUnfilteredForInLoop
                    mapped[index] = fn(object[index], index, object);
                }
                return mapped;
            }

            for (index = 0; index < length; index += 1) {
                mapped.push(fn(object[index], index, object));
            }

            return mapped;

        };

    },

    //: ## mixin
    //: **Note:** overwrites the values of the preceding objects' fields if found in the following ones

    mixin = function () {

        var key, i, arg, args = slice(arguments), obj = args.shift(), len = args.length;

        obj = (nil(obj) ? empty() : obj);

        for (i = 0; i < len; i += 1) {

            arg = args[i];

            for (key in arg) {
                //noinspection JSUnfilteredForInLoop
                if (owns(arg, key)) {
                    //noinspection JSUnfilteredForInLoop
                    obj[key] = arg[key];
                }
            }

        }

        return obj;

    },

    //: ## mixout
    //: **Note:** overwrites the values of the following objects' fields if found in the first one

    mixout = function () {

        var key, i, args = slice(arguments), obj = args.shift(), len = args.length;

        obj = (nil(obj) ? empty() : obj);

        for (key in obj) {

            //noinspection JSUnfilteredForInLoop
            if (!owns(obj, key)) {
                continue;
            }

            for (i = 0; i < len; i += 1) {

                if (nil(args[i])) {
                    continue;
                }

                //noinspection JSUnfilteredForInLoop
                args[i][key] = obj[key];

            }

        }

        return args;

    },


    // ## extend
    // like `mixin` only difference is preserving already present values
    //TODO: implement extend
    // extend = unimplemented,

    //: ## switcher

    switcher = function (map) {

        map = object(map);

        return function (key) {
            return elvis(map[''], map[string(key)]);
        };

    },


    //: ## selector

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

    // ## strategist
    //TODO: implement strategist
    // strategist = unimplemented,

    //: ### acomp
    //: composes multiple functions into one

    acomp = function () {

        var functions = slice(arguments), len = functions.length, fn;

        fn = function () {

            var args = slice(arguments);

            while (0 < len) {
                len -= 1;
                args = array(functions[len].apply(this, args));
            }

            return args[0];

        };

        fn.toString = function () {
            return 'acomp(' + functions + ')';
        };

        return fn;

    },

    //: ### ocomp
    //: composes multiple functions into one

    ocomp = function () {

        var functions = slice(arguments), len = functions.length, fn;

        fn = function (o) {

            while (0 < len) {
                len -= 1;
                o = functions[len].call(this, o);
            }

            return o;

        };

        fn.toString = function () {
            return 'ocomp(' + functions + ')';
        };

        return fn;

    },

    //: ### y
    //: the Y combinator, because Y not?

    y = function (le) {
        return (function (f) {
            return f(f);
        }(
        function (g) {
            return le(function (x) {
                return g(g)(x);
            });
        })
        );
    },


    //: ### part

    part = function (fn) {

        var fixed, f;

        fn = elvis(noop, fn);
        fixed = slice(arguments, 1);

        f = function () {

            var i, args = slice(fixed), supplied = slice(arguments), len = args.length;

            for (i = 0; i < len; i += 1) {
                if (missing(args[i])) {
                    args[i] = supplied.shift();
                }
            }

            return fn.apply(this, args.concat(supplied));

        };

        f.toString = function () {
            return '/*fixed: [' + fixed + ']*/ ' + fn.toString();
        };

        f.partied = true;

        return f;

    },

    //: ### curry

    curry = function (fn) {

        var f, args;

        fn = elvis(noop, fn);
        args = slice(arguments, 1);

        f = function () {
            return fn.apply(this, args.concat(slice(arguments)));
        };

        f.toString = function () {
            return '/*fixed: [' + args + ']*/ ' + fn.toString();
        };

        f.curried = true;

        return f;

    },

    //: ### acurry

    acurry = function (fn, argn) {

        fn = elvis(noop, fn);
        argn = number(argn, fn.length);

        var f = function () {

            var args = slice(arguments), diff = argn - args.length;

            if (0 >= diff) {
                return fn.apply(this, args);
            }

            return acurry(curry.apply(this, [fn].concat(args)), diff);

        };

        f.toString = function () {
            return fn.toString();
        };

        f.auted = true;

        return f;

    },

    //: ## encloser
    //: generates an "encloser" function that captures its arguments in a context
    //: to be supplied by the `applier` to the `functions`

    //: **Note**: functions are added to the fn property of the generated ecloser

    encloser = function (applier, functions) {

        var f = function () {

            var args = slice(arguments);

            return mapper(function (fn) {
                return applier.apply(this, [fn].concat(args));
            })(f.fn);

        };

        f.fn = object(functions);

        return f;

    },

    //: ## encurry
    //: generates a function that
    //: captures the arguments in a context by the curry method
    //: to be used by the provided functions

    encurry = curry(encloser, curry),

    //: ## enpart
    //: generates a function that
    //: captures the arguments in a context by the part method
    //: to be used by the provided functions

    enpart = curry(encloser, part),


//    plugin = function () {
//        //TODO: implement plugin
//    },


    //: ### sub
    //: create a sub-namespace out of the provided functions

    sub = function (functions) {
        return mixin(encurry(functions), functions);
    }

    // var
    ;


    //:## Exposed
    //:only these are accessible from the outside

    Fun.fn = Fun.prototype = mixin(Fun, {

//        constructor: Fun,

        noop:  noop, // in ?
        ident: ident, // in ?
        maybe: maybe, // in ?

        iterator: iterator, // in ?
        mapper:   mapper, // in ?

        nil:   nil, // in `is`
        elvis: elvis, // in `ob`
        empty: empty, // in `ob`
        dot: dot, // in `ob`
        nav: nav, // in `ob`
        mixin:  mixin, // in `ob`
        mixout: mixout, // in `ob`

        switcher: switcher, // in `fx`
        compose: ocomp, // in `fx`

        part:   part, // in `fx`
        curry:  curry, // in `fx`
        acurry: acurry, // in `fx`

//        extend: extend,

        ob: sub({
            //iterator: iterator,
            //mapper:   mapper,
            elvis:  elvis,
            empty:  empty,
            dot:    dot,
            nav:    nav,
            mixin:  mixin,
            mixout: mixout
        }),

        ut: sub({
            tos:   tos,
            slice: slice,
            owns:  owns,
            cbind: cbind,
            abind: abind,
            sub:   sub
        }),

        eq: sub({
            str:   streq,
            nostr: nostreq,
            val:   unimplemented, // valeq,
            noval: unimplemented // novaleq
        }),

        fx: sub({
            //iterator: iterator,
            //mapper:   mapper,
            compose:  ocomp,
            acomp:    acomp,
            ocomp:    ocomp,
            y:        y,
            part:     part,
            curry:    curry,
            acurry:   acurry,
            encloser: encloser,
            encurry:  encurry,
            enpart:   enpart,
            switcher: switcher,
            selector: selector
        }),

        to: sub({
            ident:  ident,
            bool:   bool,
            object: object,
            string: string,
            number: number,
            array:  array,
            values: values,
            keys:   keys
        }),

        is: sub({
            nil:     nil,
            missing: missing,
            array:   isa,
            number:  isn,
            truthy:  truthy,
            falsy:   falsy
        })

    });

    return Fun;

});  // jshint ignore:line
