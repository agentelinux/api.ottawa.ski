'use strict';

const path = require('path'),
    util = require(path.join(__dirname, 'utilities.js'));

const routes = {
    'get': {
        '/': ['conditions', 'news', 'reviews'],
        '/conditions': util.conditions,
        '/conditions/:location': util.soon,
        '/news': util.soon,
        '/news/:location': util.soon,
        '/reviews': util.soon,
        '/reviews/:location': util.soon
    }
};

module.exports = routes;
