/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true */

var path = require('path');

module.exports = function (grunt) {

    // ALWAYS
    'use strict';

    var options;

    options = {

        //path to task.js files, defaults to grunt dir
        configPath:     path.join(process.cwd(), 'conf/grunt'),

//        configPath: path.join(process.cwd(), 'vendor'),
//        overridePath: path.join(process.cwd(), 'config-'+process.env.USER)

        //auto grunt.initConfig
        init:           true,

        //data passed into config.
        data:           {
            //Can use with <%= test %>
            test: false
        },

        // pass options to load-grunt-tasks. false disables loading tasks.
        loadGruntTasks: {
            pattern: ['*', '!load-grunt-config'],
            config:  require('./package.json'),
            scope:   'devDependencies'
        }

    };

    grunt.registerMultiTask('doxo', 'custom docco task', function () {

        var
        docco = require('docco'),
        args = '-o docs/docco -l parallel -c conf/docco/parallel.css -L conf/docco/languages.json source/fun.js'.split(' ');
        docco.run(args);

    });

    require('load-grunt-config')(grunt, options);

};
