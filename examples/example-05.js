/**
 * Created by azder on 2014-04-23.
 */

/*jshint node:true, globalstrict:true*/

'use strict';

var fun = require('../fun.js');
var log = fun.ut.cbind(console.log, console);

log(fun.maybe, fun.maybe(), fun.maybe(0), fun.maybe(fun.noop));

log('' + fun.maybe, '' + fun.maybe(), '' + fun.maybe(0), '' + fun.maybe(fun.noop));





