const request = require('postman-request')

const forecast = (lat,long,callback) => {
    url= 'http://api.weatherstack.com/current?access_key=2ff1e58eb343e3dbc56378aed773f32b&query='
         +lat+','+long
    
    request ({url, json: true} , (error,response) => {
    if (error) {
        callback('Unable to connect to the weather service !',undefined);
    }else if (response.body.error) {
        callback('Unable to find this location !',undefined);
    }else {
        callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out, and it feels like  ' + response.body.current.feelslike + ' degrees. There is a ' +
        response.body.current.precip + '% chance of rain')
        
   
    }
})  
}

module.exports = forecast