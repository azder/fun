/*jshint node:true, globalstrict:true*/

/**
 * Created by azder on 2014-03-23.
 */

'use strict';

var fun = require('../fun.js');

//noinspection JSHint
//fun({ mixin: this });

var add3 = fun.acurry(function (a, b, c) {
    return a + b + c;
});

console.log(add3, add3(2), add3(2, 5));

