'use strict';

var Brisket = require('brisket');

var Routers = Brisket.Routers.toUse({

    CatchAllRouter: require('./ApplicationRouter'),

    routers: [
        require('../home/HomeRouter'),
        require('../theramax/TheramaxRouter'),
        require('../resume/ResumeRouter'),
        require('../earthTones/EarthTonesRouter')
    ]

});

module.exports = Routers;
