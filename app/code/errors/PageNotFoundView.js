'use strict';

var BaseView = require('../base/BaseView');

var PageNotFoundView = BaseView.extend({
    template: 'errors/404'
});

module.exports = PageNotFoundView;
