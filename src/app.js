const path = require('path')
const express = require('express')

const app = express()

const publicPath = path.join(__dirname, '../public/')

app.set('view engine', 'hbs')
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Leandro Rodrigo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Leandro Rodrigo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Leandro Rodrigo',
        message: 'Quis mollitia esse maxime doloremque accusamus qui sed.Reiciendis temporibus molestiae cupiditate sit ea recusandae velit.Corrupti non laboriosam illo.Repellendus unde saepe dolor sit rerum et ducimus praesentium'
    })
})

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
