/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true*/

//ALWAYS
'use strict';


module.exports = {

    docs: {

        src: ['<%= files.source %>/*.js'],

        options: {
            output:    '<%= files.out.docco %>',
            layout:    'parallel',
            css:       '<%= files.conf%>/docco/parallel.css',
            languages: {
                '.js': {
                    'name':   'javascript',
                    'symbol': '//:'
                }
            },
            dst:       '<%= files.out.docco %>'
        }
    }
};
