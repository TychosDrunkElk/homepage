'use strict';

var Brisket = require('brisket');
var Routers = require('../routing/Routers');

var ServerApp = Brisket.ServerApp.extend({

    routers: Routers,

    start: function(options) {
        var environmentConfig = options.environmentConfig;
        var serverConfig = options.serverConfig;
    }

});

module.exports = ServerApp;
