'use strict';

var BaseView = require('../base/BaseView');
var T = require('../../vendor/timbre');
var _ = require('lodash');

var TheramaxView = BaseView.extend({
    template: 'theramax/theramax',

    video: function() {
        return this.$('#webcam')[0];
    },

    setupVideo: function() {
        var video = this.video();

        var webcamError = function(e) {
            alert('Webcam error', e);
        };
        
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true, video: true}, function(stream) {
                video.src = stream;
            }, webcamError);
        } else if (navigator.webkitGetUserMedia) {
                 navigator.webkitGetUserMedia({audio:true, video:true}, function(stream) {
                video.src = window.webkitURL.createObjectURL(stream);
            }, webcamError);
        }
    },

    onDOM: function() {
        var timeOut, lastImageData;
        var canvasSource = this.$("#canvas-source")[0];
        var canvasBlended = this.$("#canvas-blended")[0];
        var canvasSquares = this.$("#canvas-squares")[0];
        var contextSource = canvasSource.getContext('2d');
        var contextBlended = canvasBlended.getContext('2d');
        var contextSquares = canvasSquares.getContext('2d');

        contextSource.translate(canvasSource.width, 0);
        contextSource.scale(-1, 1);

        
        this.setupVideo();

    
        var video = this.video();

        function update() {
            drawVideo();
            blend();
            timeOut = setTimeout(update, 100);
        }

        function drawVideo() {
            contextSource.drawImage(video, 0, 0, video.width, video.height);
        }

        function blend() {
            var width = canvasSource.width;
            var height = canvasSource.height;
            // get webcam image data
            var sourceData = contextSource.getImageData(0, 0, width, height);
            // create an image if the previous image doesn’t exist
            if (!lastImageData) lastImageData = contextSource.getImageData(0, 0, width, height);
            // create a ImageData instance to receive the blended result
            var blendedData = contextSource.createImageData(width, height);
            // blend the 2 images
            difference(blendedData.data, sourceData.data, lastImageData.data);
            // draw the result in a canvas
            contextBlended.putImageData(blendedData, 0, 0);
            // store the current webcam image
            lastImageData = sourceData;
        }

        var width = canvasSource.width;
        var height = canvasSource.height;
        var zoneWidth = width / 5;
        var zoneHeight = height / 5;
        var baseFrequency = 76 / 1.5;
        var prevFrequency = 0;
        var freq;
        var note1 = T("sin", {freq: T("param")});
        // var note2 = T("sin", {freq: T("param")});

        // var chordArray = _.chunk(new Array(5*6), 5);

        note1.play();
        // note2.play();

        function checkAreas() {
            var maxAvg = 0;
            var maxAvgFreq = 0;
            var secMaxAvg = 0;
            var secMaxAvgFreq = 0;
            var activeX, activeY, secActiveX, secActiveY;
            _.times(5, function(n) {
                _.times(5, function(m) {
                    var blendedData = contextBlended.getImageData(
                    (n) * zoneWidth,
                    (m) * zoneHeight,
                    zoneWidth,
                    zoneHeight);

                    var i = 0;
                    var average = 0;
                    while (i < (blendedData.data.length / 4)) {
                        // make an average between the color channel
                        average += (blendedData.data[i*4] + blendedData.data[i*4+1] + blendedData.data[i*4+2]) / 3;
                        ++i;
                    }
                    // calculate an average between of the color values of the note area
                    average = Math.round(average / (blendedData.data.length / 4));
                    if (average > maxAvg && average > 20) {
                        maxAvg = average;
                        maxAvgFreq = ((n + 1) * 1.5 * baseFrequency) * (1 + (m)/8);
                        activeX = n * zoneWidth;
                        activeY = m * zoneHeight;
                    } 
                    // else if (average > secMaxAvg && average > 20) {
                    //     secMaxAvg = average;
                    //     secMaxAvgFreq = ((n + 1) * 1.5 * baseFrequency) * (1 + (m)/4);
                    //     secActiveX = n * zoneWidth;
                    //     secActiveY = m * zoneHeight;
                    // }
                });
                
            });
        
            note1.freq.linTo(maxAvgFreq, "100ms");
            // note2.freq.linTo(secMaxAvgFreq, "100ms");

            // http://www.paulirish.com/2009/random-hex-color-code-snippets/
            contextSquares.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            
            contextSquares.clearRect(0, 0, width, height);
            contextSquares.fillRect(activeX, activeY, zoneWidth, zoneHeight);
            // contextSquares.fillRect(secActiveX, secActiveY, zoneWidth, zoneHeight);

            setTimeout(checkAreas, 100);
        }

        update();
        checkAreas();

    },

});

function fastAbs(value) {
    // equivalent to Math.abs();
    return (value ^ (value >> 31)) - (value >> 31);
}

function difference(target, data1, data2) {
    // blend mode difference

    if (data1.length != data2.length) return null;
    var i = 0;
    while (i < (data1.length * 0.25)) {
        var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
        var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
        var diff = threshold(fastAbs(average1 - average2));
        target[4*i] = diff;
        target[4*i+1] = diff;
        target[4*i+2] = diff;
        target[4*i+3] = 0xFF;
        ++i;
    }
    // if (data1.length != data2.length) return null;
    // var i = 0;
    // while (i < (data1.length * 0.25)) {
    //     target[4*i] = data1[4*i] == 0 ? 0 : fastAbs(data1[4*i] - data2[4*i]);
    //     target[4*i+1] = data1[4*i+1] == 0 ? 0 : fastAbs(data1[4*i+1] - data2[4*i+1]);
    //     target[4*i+2] = data1[4*i+2] == 0 ? 0 : fastAbs(data1[4*i+2] - data2[4*i+2]);
    //     target[4*i+3] = 0xFF;

    //     ++i;
    // }
}

function threshold(value) {
    return (value > 0x15) ? 0xFF : 0;
}

module.exports = TheramaxView;
