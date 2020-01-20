const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    url = 'https://api.darksky.net/forecast/7d28801533dfa7b4fee170b8eb3916b6/'+latitude+','+longitude+'?units=si'
    request({url, json:true},(error, {body}) =>{
        if(error){
            callback('Unable to connect to network!', undefined)
        }else if(body.error){
            callback('Unable to find location!', undefined)
        }else{
                callback(undefined,{
                    summary: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    precipProbability: body.currently.precipProbability
                })
        }
    })
}

module.exports = forecast