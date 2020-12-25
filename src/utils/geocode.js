const request = require('request')

const geocode = (address,callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibmlzaGlnYW5kaGExNzA3IiwiYSI6ImNraXdrOW1tZjFqM3Eyd21teGxmaXB2d3oifQ.Cl2KEhVs6cYzJgz6iw8olQ"
    request({url : url, json : true},(error,response) => {
        if(error){
            callback('No network',undefined)
        }else if(response.body.features === 0){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                lat : response.body.features[0].center[1],
                lon : response.body.features[0].center[0],
                place : response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode