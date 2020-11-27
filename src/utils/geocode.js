const request = require('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+
    '.json?access_token=pk.eyJ1IjoiZWxtZWhkaWkiLCJhIjoiY2tnMHY3bTR2MDdxYzMzbng5aGVraXQ2MCJ9.9a69sPX4jh7AZRUxhjDqfA'

    request ({url:url, json: true}, (error,response)=> {
    if (error) {
        callback('Unable to connect to the geocoding service !',undefined);
    }else if (response.body.features.length===0) {
        callback('Unable to find this location !',undefined);
    }else {
        callback(undefined, {
            longitude : response.body.features[0].center[0],
            latitude  : response.body.features[0].center[1],
            location  : response.body.features[0].place_name
        })  
    }
    })
}

module.exports = geocode