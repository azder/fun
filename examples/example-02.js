/*jshint node:true, globalstrict:true*/

'use strict';

/**
 * Created by azder on 2014-03-23.
 */

var fun = require('../source/fun.js');

var add3 = fun.acurry(function (a, b, c) {
    return a + b + c;
});

console.log(add3, add3(2), add3(2, 5));
