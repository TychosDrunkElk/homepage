'use strict';

var Brisket = require('brisket');
var Routers = require('../routing/Routers');

var ClientApp = Brisket.ClientApp.extend({

    routers: Routers,

    start: function(options) {
        var environmentConfig = options.environmentConfig;
    }

});

module.exports = ClientApp;
