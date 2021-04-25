const MY_NAME = 'Leandro Rodrigo'

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const publicPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        name: MY_NAME,
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: MY_NAME,
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Quis mollitia esse maxime doloremque accusamus qui sed.Reiciendis temporibus molestiae cupiditate sit ea recusandae velit.Corrupti non laboriosam illo.Repellendus unde saepe dolor sit rerum et ducimus praesentium',
        name: MY_NAME,
        title: 'Help'
    })
})

// Forecast weather message
app.get('/weather', (req, res) => {
    res.send({
        forecast: `It's 11 degrees outside in New York City, New York, and there are chances to rain because there's 90% of humidity, and it feels like 8 degrees`,
        locatoion: 'NYC',
        name: MY_NAME
    })
})

// Run at PORT
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
