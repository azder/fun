/**
 * Created by azder on 2014-04-24.
 */


/*jshint node:true, globalstrict:true*/

'use strict';

var fun = require('../fun.js');

console.log('is', fun.is);
console.log('is.fn', fun.is.fn);
console.log('is.nil', fun.is.nil);
console.log('is.nil(1)', fun.is.nil(1));

console.log('is(1)', fun.is(1));
console.log('is(1).nil()', fun.is(1).nil());

var z = {

    zero: function (value) {
        return 0 === value;
    },

    abc: function (a, b, c) {
        console.log('abc', a, b, c);
        return a + b + c;
    },

    sum: function () {
        var s = 0, i;
        for (i = 1; i < arguments.length; i += 1) {
            s += arguments[i];
        }
        return arguments[0] === s;
    }
};

fun.mixout(z, fun.is, fun.is.fn);

console.log('is.zero(0)', fun.is.zero(0));
console.log('is(0).zero()', fun.is(0).zero());
console.log('is(0,1).abc(2)', fun.is(0, 1).abc(2));

var sum = fun.acurry(fun.is(4).sum, 4);

console.log('fun.is(4).sum(1,1,1,1)', fun.is(4).sum(1, 1, 1, 1));
console.log('sum', sum(1, 1)(1, 1));



