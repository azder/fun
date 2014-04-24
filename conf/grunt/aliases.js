/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true*/

module.exports = {

    default: [
        'clean',
        'concat',
        'jshint:built',
        'docco',
        'uglify'
    ],

    dev: [
        'watch:sources'
    ],

    prepublish: [
        'default', 'bump:build'
    ],

    patch: [
        'default', 'bump-only', 'bump-commit'
    ]

};
