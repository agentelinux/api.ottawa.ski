'use strict';

const path = require('path'),
    config = require(path.join(__dirname, 'config.js')),
    regex = require(path.join(__dirname, 'regex.js')),
    fs = require('fs'),
    fpCities = path.resolve('/opt/data'),
    watchers = new Map();

let cities = [];

fs.readDir(fpCities, (e, items) => {
    cities.length = 0;
    items.forEach(i => {
        cities.push(i);
        watch(i.replace(/\..*$/, ''), i);
    });
});

function watch (key, file) {
    if (!watchers.has(key)) {
        watchers.set(key, fs.watch(path.join(fpCities, file), () => {
            updateConditions(key);
            this.unwatch(uri, fpath);
        }));

        this.log("Created watcher for " + fpath + " (" + uri + ")", "debug");
    }

    return this;
}

function conditions (req, res) {
    res.send(cities);
}

function register (req, res) {
    let args;

    if (req.isAuthenticated()) {
        res.error(400, config.error.already_authenticated);
    } else if (req.body !== undefined) {
        args = load('users', req.body);

        if (stores.users.indexes.get('email').has(args.email)) {
            res.error(400, config.error.email_used);
        } else if (args.firstname === undefined || args.lastname === undefined || args.email === undefined || args.password === undefined || !regex.firstname.test(args.firstname) || !regex.lastname.test(args.lastname) || !regex.email.test(args.email) || !regex.password.test(args.password)) {
            res.error(400, config.error.invalid_arguments);
        } else {
            new_user(args).then(function (arg) {
                res.respond({user_id: arg.user[0], instruction: config.instruction.verify});
                notify('email', stores.users.toArray([arg.user])[0], config.template.email.verify, (req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] + ':' : req.parsed.protocol) + '//' + (req.headers['x-forwarded-protocol'] || req.parsed.host)).then(null, function (e) {
                    log(e, 'error');
                });
            }, function (e) {
                res.error(500, e);
                log(e, 'error');
            });
        }
    } else {
        res.error(400, config.error.invalid_arguments);
    }
}

function soon (req, res) {
    res.send('Coming Soon');
}

module.exports = {
    conditions: conditions,
    register: register,
    soon: soon
};
