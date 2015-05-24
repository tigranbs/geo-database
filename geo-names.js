/**
 * Created by tigran on 5/24/15.
 */

var country = require("./lib/country")
    , city = require("./lib/city");

console.log("Loading Countries !");

country.load(function (err) {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("Getting cities for " + country.countries[0].code);
    city.geoData(country.countries[0].code, function(error, data){
        city.parseGeoData(data, function(){
            console.log(city.geoInfo[0]);
        });
    });
});
