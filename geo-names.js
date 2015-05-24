/**
 * Created by tigran on 5/24/15.
 */

var request = require('request');
console.log("Getting Country Codes");
request.get('http://download.geonames.org/export/dump/countryInfo.txt', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var lines = body.split("\n"), fields;

        for(var i in lines)
        {
            if(lines[i].charAt(0) == "#") continue;
            fields = lines[i].split("\t");
            console.log(fields[0]);
        }
    }
});