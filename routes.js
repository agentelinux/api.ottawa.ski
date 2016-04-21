'use strict';

const routes = {
    'get': {
        '/': ['conditions', 'news', 'reviews'],
        '/(conditions|news|reviews)': (req, res) => {
            res.send('Coming Soon');
        }
    }
};

module.exports = routes;
