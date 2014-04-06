/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true */

var path = require('path');

module.exports = function (grunt) {

    // ALWAYS
    'use strict';

    require('load-grunt-config')(grunt, {

        // path to task.js files, defaults to grunt dir
        configPath:     path.join(process.cwd(), 'conf/grunt'),
        overridePath:   path.join(process.cwd(), 'conf/grunt-' + process.env.USER),

        // pass options to load-grunt-tasks. false disables loading tasks.
        loadGruntTasks: {
            pattern: ['*', '!load-grunt-config', '!chai', '!mocha'],
            config:  require('./package.json'),
            scope:   'devDependencies'
        },

        //auto grunt.initConfig
        init:           true,

        //data passed into config.
        config:         {

            files: {

                base: process.cwd(),

                sourcedir: '<%= files.base%>/source',
                sources:   '<%= files.sourcedir%>/**.js',

                confdir: '<%= files.base %>/conf',
                conf:    {
                    docco: '<%= files.confdir %>/docco'
                },

                docs: '<%= files.base %>/docs',

                out: {
                    docco: '<%= files.docs %>/docco',
                    dist:  '.'
                }

            }

        }

    });

};
