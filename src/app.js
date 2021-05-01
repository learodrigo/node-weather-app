require('dotenv').config()
const MY_NAME = 'Leandro Rodrigo'
const PORT = 3000

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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

// Home route
app.get('', (req, res) => {
    res.render('index', {
        name: MY_NAME,
        title: 'Weather'
    })
})

// About route
app.get('/about', (req, res) => {
    res.render('about', {
        name: MY_NAME,
        title: 'About'
    })
})

// Help route
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Quis mollitia esse maxime doloremque accusamus qui sed.Reiciendis temporibus molestiae cupiditate sit ea recusandae velit.Corrupti non laboriosam illo.Repellendus unde saepe dolor sit rerum et ducimus praesentium',
        name: MY_NAME,
        title: 'Help'
    })
})

// Weather route
app.get('/weather', (req, res) => {
    const city = req.query.address

    if (!city) {
        return res.send({
            error: 'Address is a require term'
        })
    }

    geocode(city, (err, { latitude, longitude, placeName } = {}) => {
        if (err) console.log(chalk.red(err))

        if (latitude || longitude || placeName) {
            forecast({ latitude, longitude, placeName }, (err, forecastData) => {
                if (err) console.log(chalk.red(err))

                if (forecastData) {
                    console.log(chalk.bold(placeName))
                    console.log(forecastData)
                }
            })
        }
    })

    res.send({
        address: city,
        forecast: `It's 11 degrees outside in New York City, New York, and there are chances to rain because there's 90% of humidity, and it feels like 8 degrees`,
        locatoion: 'NYC',
        name: MY_NAME
    })
})

// 404 route for help pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: `This help article doesn't exist yet. Sorry :(`,
        name: MY_NAME,
        title: 'Article not found'
    })
})

// 404 route
app.get('*', (req, res) => {
    res.render('404', {
        message: `Looks like you're looking for a page that doens't exist :(`,
        name: MY_NAME,
        title: 'Page not found'
    })
})

// Run at PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
