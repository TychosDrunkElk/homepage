'use strict';

var BaseView = require('../base/BaseView');
var _ = require("lodash");
var T = require('../../vendor/timbre');

var EarthTonesView = BaseView.extend({
    template: 'earthTones/earth_tones',

    onDOM: function() {
        var datamaps = require('datamaps-all-browserify');
        var earthquakeData = require('../../vendor/all_day.json')


        var map = new Datamap({
            element: document.getElementById('earth-tones-map'),
            geographyConfig: {
                popupOnHover: false,
                highlightOnHover: false,
                borderWidth: 0
            },
            fills: {
                defaultFill: '#666',
                earthquake: '#fff'
            },
            bubblesConfig: {
                popupOnHover: true,
            }
        });

        var sortedData = _.sortBy(earthquakeData.features, function(earthquake) {
            return earthquake.properties.time;
        });

        var note = T("tri", {freq: T("param")});

        note.play();

        var prevTime = 0;

        var timeTracker = sortedData[0].properties.time;
        var interval = Math.round((sortedData[sortedData.length -1].properties.time - sortedData[0].properties.time)/(1500))
        var i = 0;
        var playFunction = function(){
            if(sortedData[i]) {

                if (sortedData[i].properties.time <= timeTracker) {
                    var bubble = {
                        name: sortedData[i].id,
                        radius: (sortedData[i].properties.mag || 0) * 5,
                        latitude: sortedData[i].geometry.coordinates[1],
                        longitude: sortedData[i].geometry.coordinates[0],
                        fillKey: "earthquake"
                    }

                    map.bubbles([bubble]);

                    console.log(Math.pow(sortedData[i].properties.mag +1, 2));

                    note.freq.linTo(Math.pow(sortedData[i].properties.mag +1, 2) * 100, "100ms");
                    ++i;
                }

            } else {
                clearInterval(playFunction);
            }
            timeTracker += interval;
            console.log(timeTracker);
        }
        
        setInterval(playFunction, 100);
    }
});

module.exports = EarthTonesView;
