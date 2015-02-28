'use strict';

var Brisket = require('brisket');

var Routers = Brisket.Routers.toUse({

    CatchAllRouter: require('./ApplicationRouter'),

    routers: [
        require('../home/HomeRouter'),
        require('../theramax/TheramaxRouter'),
        require('../resume/ResumeRouter')
    ]

});

module.exports = Routers;
