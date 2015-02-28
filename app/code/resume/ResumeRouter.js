'use strict';

var RouterBrewery = require('../routing/RouterBrewery');
var ResumeView = require('./ResumeView');

var HomeRouter = RouterBrewery.create({

    routes: {
        'resume': 'resume'
    },

    resume: function() {
        return new ResumeView();
    }

});

module.exports = HomeRouter;
