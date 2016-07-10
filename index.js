"use strict";

const tenso = require("tenso"),
    path = require("path"),
    merge = require("tiny-merge"),
    config = require(path.join(__dirname, "config.json")),
    routes = require(path.join(__dirname, "lib", "routes.js"));

tenso(merge({routes: routes}, config));
