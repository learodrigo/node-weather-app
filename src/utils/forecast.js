const request = require('postman-request')

const forecast = ({ latitude, longitude }, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_KEY}&query=${latitude},${longitude}`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            return callback(`Huh, something didn't go as expected. The connection to weather service failed. Check the error: ${err}`)
        }

        if (body.error) {
            return callback(`Looks like your request to weather stack failed. Checkout the full message for details. Check the error: ${body.error}`)
        }

        const { name } = body.location
        const { feelslike, humidity, temperature } = body.current

        callback(undefined, `It's ${temperature} degrees outside in ${name}, and there is ${humidity}% of humidity, and it feels like ${feelslike} degrees`)
    })
}

module.exports = forecast
