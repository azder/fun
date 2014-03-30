/**
 * Created by azder on 2014-03-23.
 */

/*jshint node:true*/

//ALWAYS
'use strict';

module.exports = {

    docs: {

        src: '<%= files.sources %>',

        options: {
            layout:    'parallel',
            output:    '<%= files.out.docco %>',
            css:       '<%= files.conf.docco%>/parallel.css',
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
