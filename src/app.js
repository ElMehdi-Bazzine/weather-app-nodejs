const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve     
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'El Mehdi Bazzine'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About',
        name : 'El Mehdi Bazzine'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help',
        name : 'El Mehdi Bazzine',
        helpText: 'Here is the weather documentation'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error : 'Please provide an address term'
        })
    }
    geocode (req.query.address, (error,{latitude, longitude, location}={}) => {
        if (error) {
          return res.send({ error })
        }
          
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error })
          } 
          res.send({
            location : location,
            forecast : forecastData             
          })  
          
        }) 
      })
    
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title : '404 page',
        errorText : ' The data help requested is not available', 
        name : 'El Mehdi Bazzine'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title : '404 page',
        errorText : 'This is the 404 error page', 
        name : 'El Mehdi Bazzine'
    })
})




app.listen(3000, () =>{
    console.log('The app is running at the port 3000')
})