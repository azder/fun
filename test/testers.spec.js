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

    describe('tester function nil', function () {

        var values;

        it('should exist at the top namespace', function () {
            expect(fun).to.have.a.property('nil');
        });

        it('should exist at the sub-namespace "is"', function () {
            expect(fun.is).to.have.a.property('nil');
        });

        values = function (nil) {
            return function () {
                it('should return true for: null', function () {
                    expect(nil(null)).to.equal(true);
                });

                it('should return true for: undefined', function () {
                    expect(nil(void 0)).to.equal(true);
                });

                it('should return true when no parameter provided', function () {
                    expect(nil()).to.equal(true);
                });

                it('should return false for each element in the array: [\'\', 0, false, NaN, /./, {}, []]', function () {
                    ['', 0, false, NaN, /./, {}, []].forEach(function (value) {
                        expect(nil(value)).to.equal(false);
                    });
                });
            };
        };

        describe('in the top namespace', values(fun.nil));
        describe('in the namespace: is', values(fun.is.nil));

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
