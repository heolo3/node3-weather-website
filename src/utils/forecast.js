const request = require("request")

const forecast = (lat, long, callback) => {
    const url = "https://api.weatherstack.com/current?access_key=20d490acbabe9667f5cf98103a36a84d&query=" + lat + "," + long + "&units=f"

    request({
        url,
        json: true
    }, (error, { body }) => {
        if(error){
            callback("Unable to connect to weather services.", undefined)
        }else if(body.error){
            callback(body.error.info, undefined)
        }else{
            callback(undefined, {
                temperature: body.current.temperature,
                rainProb: body.current.precip,
                weather: body.current.weather_descriptions[0],
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast