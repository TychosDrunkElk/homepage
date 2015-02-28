'use strict';

var BaseView = require('../base/BaseView');

var DefaultErrorView = BaseView.extend({
    template: 'errors/500'
});

module.exports = DefaultErrorView;
