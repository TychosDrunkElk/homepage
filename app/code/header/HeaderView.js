'use strict';

var Brisket = require('brisket');
var BaseView = require('../base/BaseView');
var HeaderView = BaseView.extend({

    template: 'header/header'

});

module.exports = HeaderView;