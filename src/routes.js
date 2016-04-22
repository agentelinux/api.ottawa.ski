'use strict';

const path = require('path'),
    util = require(path.join(__dirname, 'utilities.js'));

const routes = {
    'get': {
        '/': ['conditions', 'news', 'reviews'],
        '/(conditions|news|reviews)': (req, res) => {
            res.send('Coming Soon');
        }
    }
};

module.exports = routes;
