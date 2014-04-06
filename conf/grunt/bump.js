/**
 * Created by azder on 2014-04-06.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = {

    options: {
        files:              ['package.json', 'bower.json'],
        updateConfigs:      [],
        commit:             true,
        commitMessage:      'bump to version %VERSION%',
        commitFiles:        ['package.json'], // '-a' for all files
        createTag:          false,
        tagName:            '%VERSION%',
        tagMessage:         'version %VERSION%',
        push:               false,
        pushTo:             'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
    }

};
