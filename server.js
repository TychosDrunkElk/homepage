'use strict';

var express = require('express');
var Brisket = require('brisket');

var PORT = process.env.PORT || 8080;

var app = express()

    .use(express.static(__dirname + '/public'))

    .use(Brisket.createServer({
        apiHost: 'http://localhost:' + PORT,

        clientAppRequirePath: 'app/ClientApp',

        ServerApp: require('./app/code/server/ServerApp'),

        // add properties here that you want to expose to ServerApp
        //  and ClientApp
        environmentConfig: {},

        // add properties that you only want to expose to the ServerApp
        serverConfig: {},

        onRouteHandled: function(options) {
            console.log("Original request was for: " + options.request.path);
            console.log("Responded to matched route: " + options.route);
        }

    }))

    .use(function(request, response) {
        response.status(500).sendfile(__dirname + '/public/unrecoverable-error.html');
    })
;


app.listen(PORT);
console.log("Brisket app is listening on port: %s", PORT);
