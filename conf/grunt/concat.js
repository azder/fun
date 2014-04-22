/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = {

    options: {
        separator: '\n\n'
    },

    dist: {
        src:  '<%=files.sources%>',
        dest: '<%= files.out.full%>'
    }

};
