"use strict";

var hoganAdapter = require("../templating/hoganAdapter");
var templates = require("../../build/templates.js");

var UsesHogan = {

    templateAdapter: hoganAdapter(templates)

};

module.exports = UsesHogan;
