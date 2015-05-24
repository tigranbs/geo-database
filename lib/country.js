/**
 * Created by tigran on 5/24/15.
 */

var request = require('request')
    , fs = require("fs");

var country = {
    countries: [],
    load: function(callback) {
        request.get('http://download.geonames.org/export/dump/countryInfo.txt', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var lines = body.split("\n"), fields;
                country.countries = [];
                for(var i in lines)
                {
                    if(lines[i].charAt(0) == "#") continue;
                    fields = lines[i].split("\t");
                    country.countries.push({
                        code: fields[0],
                        name: fields[4],
                        capital: fields[5],
                        area: fields[6], // sq/km
                        population: fields[7],
                        currency: fields[10],
                        phone: fields[12]
                    });
                }
                callback(null);
            }
            else
            {
                callback(error);
            }
        });
    }
};

module.exports = country;