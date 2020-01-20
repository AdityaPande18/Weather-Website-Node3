const request = require('request')

const geocode = (address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFydmVsNjkiLCJhIjoiY2s1YjA4YmM1MWNocTNtcGF1bzNoZTZwMSJ9.EXlWXm1KwQhYQ_fw3HYLEg'
    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to server!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find Location. Try another search!', undefined)
        }else{
            callback(undefined,{
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode