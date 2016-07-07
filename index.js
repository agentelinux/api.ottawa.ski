'use strict';

const tenso = require('tenso'),
    path = require('path'),
    merge = require('tiny-merge'),
    config = require(path.join(__dirname, 'config.json')),
    routes = require(path.join(__dirname, 'src', 'routes.js'));

let app = tenso(merge({routes: routes}, config));
