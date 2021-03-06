const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request') 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aditya Pande'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please Provide Address'
        })
    }
    geocode(req.query.address, (error, {Location, Latitude, Longitude}={})=>{
        if(error){
            return res.send({ error })
        }
        
        forecast(Latitude, Longitude, (forecaseError, {summary, temperature, precipProbability,icon,temperature_min,temperature_max}) =>{
            if(forecaseError){
                return res.send({ forecaseError })
            }
            res.send({
                Location,
                summary,
                icon,
                temperature_min,
                temperature_max,
                temperature,
                precipProbability
                
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aditya Pande',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})