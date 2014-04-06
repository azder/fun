/**
 * Created by azder on 2014-03-24.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = {

    sources: {
        files:   '<%=files.sources%>',
        tasks:   ['docco', 'uglify'],
        event:   'change',
        options: {
            atBegin: true
        }
    }
};
