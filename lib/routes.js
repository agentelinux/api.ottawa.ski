"use strict";

const path = require("path"),
    util = require(path.join(__dirname, "utilities.js"));

const routes = {
    "get": {
        "/": ["weather", "news", "reviews"],
        "/news": util.sendCities,
        "/news/:city": util.soon,
        "/reviews": util.sendCities,
        "/reviews/:city": util.soon,
        "/weather": util.sendCities,
        "/weather/:city": util.weather
    }
};

module.exports = routes;
