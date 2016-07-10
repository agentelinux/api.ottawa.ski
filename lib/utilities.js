"use strict";

const path = require("path"),
    fs = require("fs"),
    fpCities = path.resolve("/opt/data"),
    condition = new Map();

let cities = [];

function read (map, key, file) {
    console.log("Checking if file exists:", file);
    fs.exists(file, exists => {
        if (exists) {
            console.log(file, "exists");
            fs.readFile(file, (e1, arg) => {
                let data;

                if (!e1) {
                    try {
                        data = JSON.parse(arg);
                        map.set(key, data);
                    } catch (e2) {
                        console.error(e2);
                    }
                }
            });
        } else {
            console.error(file, "doesn't exist");
        }
    });
}

console.log("Reading", fpCities);

fs.readdir(fpCities, (e1, items) => {
    if (e1) {
        console.error(e1);
        process.exit(1);
    } else {
        items.forEach(i => {
            let fpPath = path.join(fpCities, i);

            fs.stat(fpPath, (e2, stat) => {
                if (stat.isDirectory()) {
                    let files = [
                        ["warnings", path.join(fpPath, "warnings.json")],
                        ["weather", path.join(fpPath, "weather.json")]
                    ], map;

                    cities.push(i);
                    condition.set(i, new Map());
                    map = condition.get(i);

                    files.forEach(file => {
                        map.set(file[0], null);
                        read(map, file[0], file[1]);
                        fs.watch(file[1], () => {
                            read(map, file[0], file[1]);
                        });
                    });
                }
            });
        });
    }
});

function weather (req, res) {
    const city = req.params.city,
        map = condition.get(city);

    if (map) {
        res.send({id: city, warnings: map.get("warnings"), weather: map.get("weather")});
    } else {
        res.error(404);
    }
}

function sendCities (req, res) {
    res.send(cities);
}

function soon (req, res) {
    const city = req.params.city,
        map = condition.has(city);

    if (map) {
        res.send({id: city, message: "Coming Soon"});
    } else {
        res.error(404);
    }
}

module.exports = {
    sendCities: sendCities,
    soon: soon,
    weather: weather
};
