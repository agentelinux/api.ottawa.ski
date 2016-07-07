'use strict';

const path = require('path'),
    util = require(path.join(__dirname, 'utilities.js'));

const routes = {
    'get': {
        '/': ['weather', 'news', 'reviews'],
        '/news': util.soon,
        '/news/:location': util.soon,
        '/reviews': util.soon,
        '/reviews/:location': util.soon,
        '/weather': util.weatherCities,
        '/weather/:location': util.weather
    }
};

module.exports = routes;
