/*jshint node:true, globalstrict:true*/

/**
 * Created by azder on 2014-03-23.
 */

'use strict';

var fun = require('../source/fun.js');

//fun({ mixin: this });

var log = fun.ut.cbind(console.log, console);

var add3 = fun.acurry(function (a, b, c) {
    return a + b + c;
});

log('add3', add3, add3(2, 5), add3(2, 5, 7));


var log3 = fun.acurry(log, 3);

log('log3', log3(undefined, 2));

log3(undefined, 2)(3);




