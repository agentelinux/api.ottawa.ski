'use strict';

const path = require('path'),
    fs = require('fs'),
    fpCities = path.resolve('/opt/data'),
    condition = new Map();

let cities = [];

function read (map, key, file) {
    console.log('Checking if file exists:', file);
    fs.exists(file, exists => {
        if (exists) {
            console.log(file, 'exists');
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
        } else {
            console.error(file, 'doesn\'t exist');
        }
    });
}

console.log('Reading', fpCities);

fs.readdir(fpCities, (e, items) => {
    if (e) {
        console.error(e);
        process.exit(1);
    } else {
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
        res.send({warnings: map.get('warnings'), weather: map.get('weather')});
    } else {
        res.error(404, new Error(404));
    }
}

function sendCities (req, res) {
    res.send(cities);
}

function soon (req, res) {
    const city = req.params.city,
        map = condition.has(city);

    if (map) {
        res.send('Coming Soon');
    } else {
        res.error(404, new Error(404));
    }
}

module.exports = {
    sendCities: sendCities,
    soon: soon,
    weather: weather
};
