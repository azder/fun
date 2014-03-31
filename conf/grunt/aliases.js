/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true*/

module.exports = {

    default: [
        'docco',
        'uglify'
    ],

    'dev': [
        'docco',
        'uglify',
        'watch:docco'
    ]

};
