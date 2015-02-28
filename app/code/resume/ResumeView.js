"use strict";

var BaseView = require("../base/BaseView");

var ResumeView = BaseView.extend({
    events: {
        "click .resume-open-toggle": "toggleAllSections",
        "click .resume__section": "toggleSection"
    },

    template: "resume/resume",

    toggleAllSections: function(e) {
        e.preventDefault();

        this.$(".resume__section").toggleClass("open");
    },

    toggleSection: function(e) {
        e.stopPropagation();
        this.$(e.currentTarget).toggleClass("open");

    }
});

module.exports = ResumeView;
