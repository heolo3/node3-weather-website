const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000 // Define port from Heroku or default of port 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Graeme Nelson"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        description: "This page is about Graeme learning Node",
        name: "Graeme Nelson"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title:  "Help Page",
        description: "Coming soon",
        name: "Graeme Nelson"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Provide an address to search."
        })
    }
    
    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({
                error: "Error: check input for correctness."
            })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: "Error: check input for correctness."
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/products", (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error",
        errorMessage: "Help article not found.",
        name: "Graeme Nelson"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error",
        errorMessage: "Page not found.",
        name: "Graeme Nelson"
    })
})
 
app.listen(port, () => {
    console.log("Server is up on port " + port)
})