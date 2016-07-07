'use strict';

const path = require('path'),
    util = require(path.join(__dirname, 'utilities.js'));

const routes = {
    'get': {
        '/': ['weather', 'news', 'reviews'],
        '/news': util.soon,
        '/news/:city': util.soon,
        '/reviews': util.soon,
        '/reviews/:city': util.soon,
        '/weather': util.weatherCities,
        '/weather/:city': util.weather
    }
};

module.exports = routes;
