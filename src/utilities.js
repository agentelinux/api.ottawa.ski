'use strict';

const path = require('path'),
    fs = require('fs'),
    fpCities = path.resolve('/opt/data'),
    condition = new Map();

let cities = [];

function read (map, key, file) {
    fs.exists(file, exists => {
        if (exists) {
            fs.readFile(file, (e, arg) => {
                let data;

                if (!e) {
                    try {
                        data = JSON.parse(arg);
                        map.set(key, data);
                    } catch (e) {
                        console.error(e);
                    }
                }
            });
        }
    });
}

fs.readdir(fpCities, (e, items) => {
    items.forEach(i => {
        let fpPath = path.join(fpCities, i);

        fs.stat(fpPath, (e, stat) => {
            if (stat.isDirectory()) {
                let files = [
                    ['warnings', path.join(fpPath, 'warnings.json')],
                    ['weather', path.join(fpPath, 'weather.json')]
                ], map;

                cities.push(i);
                condition.set(i, new Map());
                map = condition.get(i);

                files.forEach(file => {
                    map.set(file[0], null);
                    read(map.get(file[0]), file[0], file[1]);
                    watch(file[1], () => {
                        read(map.get(file[0]), file[0], file[1]);
                    });
                });
            }
        });
    });
});

function weather (req, res) {
    const map = condition.get(req.param.location);

    if (map) {
        res.send({warnings: map.get('warnings'), weather: map.get('weather')});
    } else {
        res.error(404, new Error(404));
    }
}

function weatherCities (req, res) {
    res.send(cities);
}

function soon (req, res) {
    res.send('Coming Soon');
}

module.exports = {
    soon: soon,
    weather: weather,
    weatherCities: weatherCities
};
