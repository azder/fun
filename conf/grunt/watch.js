/**
 * Created by azder on 2014-03-24.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = {

    docco: {
        files: '<%=files.sources%>',
        tasks: ['docco'],
        event: 'change'
    }
};
