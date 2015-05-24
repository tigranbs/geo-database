/**
 * Created by tigran on 5/24/15.
 */

var fs = require("fs")
    , request = require("request")
    , AdmZip = require("adm-zip")
    , async = require("async");

var city = {
    geoInfo: [],
    cities: [],
    geoData: function(country_code, callback) {
        request.get('http://download.geonames.org/export/dump/' + country_code + '.zip', function(error, response, body){
            if (error || response.statusCode != 200) {
                callback(error, null);
            }
            else
            {
                var zip = new AdmZip(country_code + '.zip');
                callback(null, zip.readAsText(country_code + ".txt"));
                fs.unlink(country_code + '.zip', function(){
                    // File will be deleted
                });
            }
        }).pipe(fs.WriteStream(country_code + ".zip"));
    },
    parseGeoData: function(data_text, callback){
        var line_split = data_text.split("\n")
            , fields = [] ;
        async.forEach(line_split, function (line, next) {
            fields = line.split("\t");
            city.geoInfo.push({
                name: fields[1],
                latitude: fields[4],
                longitude: fields[5],
                population: fields[14],
                elevation: fields[15],
                timezone: fields[17]
            });
            next();
        }, callback);
    }
};


module.exports = city;