/*global define:false, module:false */

//: The fun to play with functional supplement for JS
//: Created by Azder [(azhder@gmail.com)](mailto:azhder@gmail.com) on 2014-03-05.

//noinspection ThisExpressionReferencesGlobalObjectJS
(function (G, factory) {

    //: A function that handles the exporting of
    //: this library into the environment

    // ALWAYS
    'use strict';

    //: the name to use as a global for this library
    var name = 'fun';

    //: In case there is CommonJS module system in place
    //: (used by _Node.js_) then `module.exports` will export the library
    if ('object' === typeof module && 'object' === typeof module.exports) {
        module.exports = factory(G);
        return;

    }

    //: If the module loading system is AMD, us it's `define` function
    if ('function' === typeof define && define.amd) {
        define(name, factory);
        return;
    }

    //: In case this file is included via Browser's `script` tag,
    //: just export it as a global using `name` variable

    G[name] = factory(G);


}(this, function () {

    // ALWAYS
    'use strict';


    function fun() {

        if (!(this instanceof fun)) {
            return new fun();
        }

        return this;

    };


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

    elvis = function (value, dfault) {
        return nil(value) ? dfault : value;
    },

    //: ### empty
    //: returns a prototypless empty object
    //: i.e. _not even_ `Object` is in it's prototype chain
    //:
    //:  **Note:** requires support of `Object.create` (ES5 standard)
    //: to guarantee there will be no implicit `Object` in prototype

    empty = (Object.create ? function () {
        return Object.create(null);
    } : function () {
        return {};
    }),


    //: ### isa
    //: returns `true` when `value` is an `Array`, `false` otherwise
    //:
    //: **Note:** requires support of `Array.isArray` (ES5 standard)
    //: to guarantee that all edge cases are covered

    isa = elvis(Array.isArray, function (value) {
        return tos(value) === '[object Array]';
    }),

    //: ### isn
    //: returns `true` when `value` is a `Number`, `false` otherwise

    isn = function (value) {
        return value === +value;
    },

    //: ### streq
    //: returns `true` when `value1` and `value2` converted to strings  are equal, `false` otherwise

    streq = function (value1, value2) {
        return tos(value1) === tos(value2);
    },

    //: ### nostreq
    //: returns `true` when `value1` and `value2` converted to strings are not equal, `false` otherwise

    nostreq = function (value1, value2) {
        return tos(value1) !== tos(value2);
    },


    //: ### valeq
    //TODO: implement valeq
    valeq = unimplemented,

    //: ### novaleq
    //TODO: implement novaleq
    novaleq = unimplemented,


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

    keys = ( Object.keys ? function (o) {

        var keys = [], props;

        if (nil(o)) {
            return k;
        }

        if (o !== Object(o)) {
            return k;
        }

        return Object.keys(o);

    } : function (o) {

        var keys = [], props;

        if (nil(o)) {
            return k;
        }

        if (o !== Object(o)) {
            return k;
        }

        for (props in o) {
            if (owns(o, props)) {
                keys.push(props);
            }
        }

        return keys;

    }),

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

    //: ## mixin
    //: **Note:** overwrites the values of the preceding objects' fields if found in the following ones

    mixin = function () {

        var key, i, arg, args = slice(arguments), obj = args.shift(), len = args.length;

        obj = (nil(obj) ? empty() : obj);

        for (i = 0; i < len; i += 1) {

            arg = args[i];

            for (key in arg) {
                if (owns(arg, key)) {
                    obj[key] = arg[key];
                }
            }

        }

        return obj;

    },

    //: ## enclose
    //: captures the value in a context
    //: to be used by the provided functions
    //TODO: implement enclose
    enclose = unimplemented,

    //: ## extend
    //: like `mixin` only difference is preserving already present values
    //TODO: implement extend
    extend = unimplemented,

    //: ## switcher

    switcher = function (map) {

        map = object(map);

        return function (key) {
            return elvis(map[string(key)], map['']);
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

    //: ## strategist
    //TODO: implement strategist
    strategist = unimplemented,

    //: ### compose
    //: composes multiple functions into one

    compose = function () {

        var functions = slice(arguments), len = functions.length, fn;

        fn = function () {

            var args = slice(arguments);

            while (0 < len) {
                len -= 1;
                args = [functions[len].apply(this, args)];
            }

            return args[0];

        };

        fn.toString = function () {
            return 'compose(' + functions + ')';
        };

        return fn;

    },

    //: ### compose
    //: composes multiple functions into one

    ocompose = function () {

        var functions = slice(arguments), len = functions.length, fn;

        fn = function (o) {

            while (0 < len) {
                len -= 1;
                o = functions[len].call(this, o);
            }

            return o;

        };

        fn.toString = function () {
            return 'ocompose(' + functions + ')';
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

    //: ### curry

    curry = function (fn) {

        var args = slice(arguments, 1);
        return function () {
            return fn.apply(this, args.concat(slice(arguments)));
        };
    },

    //: ### acurry

    acurry = function (fn, argn) {

        fn = elvis(fn, noop);
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

    },

    //: ### augment

    augment = function (string, o) {
        //TODO: implement augment
        // it should actually augment an object/function with fun's properties
        // based on a class of properties
        // Example: fun.augment(Function.prototype).with('testers,iterator')
    }    ,

    //: ## Subs

    is = function (operator, value) {

        if (missing(value)) {

            if (!nil(operator)) {
                return curry(is, operator);
            }


        }

        //TODO: use enclose

        return {
            nil: function () {
                return nil(value);
            }
        };

    },

    to = function (operator, value) {

    },

    eq = function (operator, value) {

    },

    fx = function (operator, value) {

    }


    ;


    //:## Exposed
    //:only these are accessible from the outside

    fun.fn = fun.prototype = mixin(fun, {

        constructor: fun,

        nil: nil,

        elvis: elvis,
        empty: empty,

        dot: dot,
        nav: nav,

        extend: extend,
        mixin:  mixin,

        switcher:   switcher,
        selector:   selector,
        strategist: strategist,

        enclose: enclose,

        augment: augment,

        iterator: iterator,

        compose:  compose,
        ocompose: ocompose,

        curry:  curry,
        acurry: acurry,

        tos:   tos,
        slice: slice,
        owns:  owns,

        cbind: cbind,
        abind: abind,


        fx: mixin(fx, {
            noop:  noop,
            ident: ident,
            y:     y
        }),

        eq: mixin(eq, {
            str:   streq,
            nostr: nostreq,
            val:   valeq,
            noval: novaleq,
        }),

        to: mixin(to, {
            bool:   bool,
            object: object,
            string: string,
            number: number,
            array:  array,
            values: values,
            keys:   keys
        }),

        is: mixin(is, {
            nil:     nil,
            missing: missing,
            array:   isa,
            number:  isn,
            truthy:  truthy,
            falsy:   falsy,
        })

    });

    return fun;

}));
