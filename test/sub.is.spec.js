/**
 * Created by azder on 2014-04-03.
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

    describe('subnamespace "is" ', function () {

        var is = fun.is;

        ['nil', 'missing', 'array', 'number', 'truthy', 'falsy' ].forEach(function (name) {


            it('should have property "' + name + '"', function () {
                expect(is).to.have.a.property(name);
            });

            it('"' + name + '" should be a function', function () {
                expect(is[name]).to.be.a('function');
            });


        });

    });


}));
