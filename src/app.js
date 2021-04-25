const path = require('path')
const express = require('express')

const app = express()

// Home
const publicPath = path.join(__dirname, '../public/')

app.use(express.static(publicPath))

// Forecast weather message
app.get('/weather', (req, res) => {
    res.send({
        forecast: `It's 11 degrees outside in New York City, New York, and there are chances to rain because there's 90% of humidity, and it feels like 8 degrees`,

        locatoion: 'NYC'
    })
})

// Run at PORT
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
