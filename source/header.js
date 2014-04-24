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
