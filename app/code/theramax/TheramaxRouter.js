'use strict';

var RouterBrewery = require('../routing/RouterBrewery');
var TheramaxView = require('./TheramaxView');

var HomeRouter = RouterBrewery.create({

    routes: {
        'theremax': 'theramax'
    },

    theramax: function() {
        return new TheramaxView();
    }

});

module.exports = HomeRouter;
