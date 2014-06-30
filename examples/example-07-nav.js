/**
 * Created by azder on 2014-06-25.
 */


(function () {

    // ALWAYS
    'use strict';
    var fun = require('../fun.js'), level = fun.nav('levels.0.school_levels'), extracted, data, levels;
    //.0.school_level_name

    levels = fun.fx.acomp(fun.to.object, fun.to.array);

    data = {
        "_id":             "53a2ef8a6282291416000000",
        "created_by":      1,
        "created_at":      "2014-05-07 15:16:39",
        "updated_at":      "2014-05-08 12:36:55",
        "published":       0,
        "deleted":         0,
        "collection_year": 2,
        "school_subject":  1,
        "levels":          [
            {
                "id":              46,
                "collection_id":   "53a2ef8a6282291416000000",
                "school_level_id": 1,
                "school_levels":   {
                    "id":                1,
                    "school_level_name": "Havo"
                }
            }
        ]
    };

    extracted = level(data);


    console.log(levels(data));


}());
