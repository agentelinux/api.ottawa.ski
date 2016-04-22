'use strict';

const regex = {
    email: /\w*@\w*/,
    encoding: /form|json|querystring/,
    extension: /\..*$/,
    firstname: /(\w*){1,}/,
    invite: /^\/invite/,
    lastname: /(\w*){2,}/,
    payload: /string|object/,
    send: /_send$/,
    std_port: /^(80|443)$/,
    trailing_s: /s$/,
    trailing_slash: /\/$/,
    uri_collection: /.*\//
};

module.exports = regex;
