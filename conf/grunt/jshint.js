/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = {

    options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
    },

    dev: {

        options: {
            force: true
        },

        files: {
            src: [
                'Gruntfile.js',
                'conf/grunt/*.js',
                '<%= files.sourcedir %>/fun.js',
                '<%= files.tests %>'
            ]
        }

    },

    asi: {

        options: {
            asi: true
        },

        files: {
            src: [
                '<%= files.sourcedir %>/header.js'
            ]
        }

    },

    built: '<%= files.out.built%>'

};
