/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = {

    base: process.cwd(),

    source: '<%= files.base%>/source',
    conf:   '<%= files.base%>/conf',
    docs:   '<%= files.base%>/docs',

    sources: '<%= files.source%>/**.js',

    out: {
        docco: '<%= files.docs%>/docco'
    }

};
