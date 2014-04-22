/**
 * Created by azder on 2014-03-31.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = {

    sources: {

        options: {
            sourceMap: true
        },

        files: [
            {
                expand: false,
                src:    '<%= files.out.full%>',
                dest:   '<%= files.out.min%>'
            }
        ]
    }

};
