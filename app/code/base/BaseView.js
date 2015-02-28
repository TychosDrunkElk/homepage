'use strict';

var Brisket = require('brisket');
var usesHogan = require('../concerns/usesHogan');
var _ = require("lodash");

var BaseView = Brisket.View.extend(_.extend({},
    usesHogan, {

    })
);

module.exports = BaseView;
