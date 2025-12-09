const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/search/geocode/v6/forward?q=" + encodeURIComponent(address) + "&country=US&limit=1&access_token=pk.eyJ1IjoiZ25lbHNvbjMiLCJhIjoiY21peGdiamFjMDQzYjNmcTA0eDZ5cHBicSJ9.ohJ2tGB1FJqBpc8QPwO9NQ"

    request({
        url,
        json: true
    }, (error, { body }) => {
        if(error){
            callback("Unable to connect to location services.", undefined)
        }else if(body.features.length === 0){
            callback("Unable to find location. Try another search.", undefined)
        }else{
            callback(undefined, {
                lat: body.features[0].properties.coordinates.latitude,
                long: body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.full_address
            })
        }
    })
}

module.exports = geocode