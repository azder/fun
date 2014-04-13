/**
 * Created by azder on 2014-04-06.
 */

/*jshint node:true*/

module.exports = function (grunt) {

    //ALWAYS
    'use strict';

    var files = ['package.json', 'bower.json'];

    return {
        options: {
            files:              files,
            commitFiles:        files, // '-a' for all files
            updateConfigs:      [],
            commit:             false,
            commitMessage:      'bump to version %VERSION%',
            createTag:          false,
            tagName:            '%VERSION%',
            tagMessage:         'version %VERSION%',
            push:               false,
            pushTo:             'upstream',
            gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
        }
    };

};
