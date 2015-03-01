'use strict';

var RouterBrewery = require('../routing/RouterBrewery');
var EarthTonesView = require('./EarthTonesView');

var HomeRouter = RouterBrewery.create({

    routes: {
        'earth-tones': 'earthTones'
    },

    earthTones: function() {
        return new EarthTonesView();
    }

});

module.exports = HomeRouter;
