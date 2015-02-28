'use strict';

var Brisket = require('brisket');
var BaseView = require('../base/BaseView');
var usesHogan = require('../concerns/usesHogan');
var _ = require('lodash');
var HeaderView = require('../header/HeaderView');

var Layout = Brisket.Layout.extend(_.extend({}, 
    usesHogan,
    {
        defaultTitle: 'Your first Brisket site',

        content: '#content',

        template: 'layout/layout',

        beforeRender: function() {
            this.createChildView(HeaderView)
                .andReplace('header');
        }
    })
);



module.exports = Layout;
