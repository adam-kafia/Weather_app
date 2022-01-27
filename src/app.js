const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geo = require("./utils/geocode.js");
const fore = require("./utils/forcast.js");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

//setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Adam Kafia",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Adam Kafia",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        help: "This is a help message",
        title: "Help",
        name: "Adam Kafia",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        error: "Help article not found",
        title: "404 Not found",
        name: "Adam Kafia",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: "Address must be provided!",
        });
    }
    geo.geoCode(req.query.adress, (error, { latitude, longitude, place_name } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }
        fore.forecast(
            latitude,
            longitude,
            (error, { temperature, feelslike, weather_descriptions } = {}) => {
                if (error) {
                    return res.send({
                        error,
                    });
                }
                res.send({
                    place_name,
                    latitude,
                    longitude,
                    temperature,
                    feelslike,
                    weather_descriptions,
                });
            }
        );
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }
    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        error: "Page not found",
        title: "404 Not found",
    });
});

app.listen(port, () => {
    console.log("Server is upp on port " + port + ".");
});
