/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = function (grunt) {

    return {
        all: [
            'Gruntfile.js',
            'grunt/*.js',
            'lib/*.js',
            'test/*.js'
        ]
    };
};
