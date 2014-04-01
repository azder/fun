/**
 * Created by azder on 2014-04-01.
 */

/*globals, describe, it*/
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

    describe('fun', function () {
        it('nil', function () {
            expect(fun).to.have.a.property('nil');
        });
    });

}));
