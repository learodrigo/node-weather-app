const request = require('postman-request')

const geocode = (city, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            return callback(`Unable to connect to location services. Check out the full error ${err}`)
        }

        if (!body.features) {
            const msg = city ?
                `Your search was ${city}, but we couldn't find it. Try again` :
                'You forgot to add a city when running the script. Try with "La Plata" or "Hong Kong"'

            return callback(msg)
        }

        const longitude = body.features[0].center[0]
        const latitude = body.features[0].center[1]
        const placeName = body.features[0].place_name

        callback(undefined, { latitude, longitude, placeName })
    })
}

module.exports = geocode
