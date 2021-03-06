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

        ['eq', 'is', 'to'].forEach(function (name) {

            describe(name, function () {

                it('should exist at the top namespace', function () {
                    expect(fun).to.have.a.property(name);
                });

                it('should be a function', function () {
                    expect(fun[name]).to.be.a('function');
                });

            });

        });


    });


}));
