/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = {
    build: ['<%= files.out.full%>', '<%= files.out.min%>', '<%= files.out.map%>'],
    docco: ['<%= files.out.docco %>']
};
