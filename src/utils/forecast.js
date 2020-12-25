const request = require('request')

const forecast = (lat,lon,callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=9031ae265db4fc4a44ae1d73c4127a04&query='+lat+','+lon
    
    request({url , json : true}, (error , {body}) =>  {
        if(error){
            callback('no network',undefined)
        }else if(body.error){
            callback('bad data,try another',undefined)
        }else{
            callback(undefined,{
                lat : body.location.lat,
                lon : body.location.lon,
                place : body.location.name
            })
        }
    })
}

module.exports = forecast