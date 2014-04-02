/**
 * Created by azder on 2014-04-01.
 */

/*globals, describe, it, beforeEach*/
/*jshint node:true*/


(function (G, factory) {

    // ALWAYS
    'use strict';

    // AMD, require.js, ...
    if ('function' === typeof define && define.amd) {
        require(['mocha', 'chai', 'fun'], factory);
        return;
    }

    // CJS, node.js, ...
    if ('object' === typeof module && 'object' === typeof module.exports) {
        factory(require('mocha'), require('chai'), require('../source/fun.js'));
        return;
    }

    factory(G.mocha, G.chai, G.fun);


}(this, function (mocha, chai, fun) {

    // ALWAYS
    'use strict';

    var expect = chai.expect;

    describe('subnamespace', function () {

        var commons = function (name) {

            var sub = fun[name];

            describe(name, function () {

                it('should exist at the top namespace', function () {
                    expect(fun).to.have.a.property(name);
                });

                it('should be a function', function () {
                    expect(sub).to.be.a('function');
                });

            });

            return sub;

        };

        commons('eq');
        commons('is');
        commons('to');


    });

    describe('tester function number', function () {

        it('should exist at the sub-namespace "is"', function () {
            expect(fun.is).to.have.a.property('number');
        });

        it('should return true for the number: 0', function () {
            expect(fun.is.number(0)).to.equal(true);
        });

        it('should return false for the number: NaN', function () {
            expect(fun.is.number(NaN)).to.equal(false);
        });

        it('should return false for the string: "0"', function () {
            expect(fun.is.number('0')).to.equal(false);
        });

        it('should return false for each element in the array: [\'0\', true, false, NaN, /./, {}, []]', function () {
            ['0', true, false, NaN, /./, {}, []].forEach(function (value) {
                expect(fun.is.number(value)).to.equal(false);
            });
        });


    });


}));
