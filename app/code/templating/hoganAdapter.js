"use strict";

var Brisket = require("brisket");
var _ = require("lodash");


function resolvePartials(partials, compiledTemplates) {
    if (_.isEmpty(partials)) {
        return null;
    }

    var resolvedPartials = {};

    for (var partialName in partials) {
        if (partials.hasOwnProperty(partialName)) {
            var partialPath = partials[partialName];
            resolvedPartials[partialName] = compiledTemplates.templates[partialPath];
        }
    }

    return resolvedPartials;
}
var HoganAdapter = Brisket.Templating.TemplateAdapter.extend({

    templateToHTML: function(templateId, data, partials) {
        var template = this.compiledTemplates[templateId];

        if (!template) {
            throw new Error("Could not find template: " + templateId);
        }

       return template(data, resolvePartials(partials, this.compiledTemplates));
    }

});

var hoganAdapter = function(compiledTemplates) {
    if (typeof compiledTemplates !== "object") {
        throw new Error(
            "You must pass compiled templates to create a HoganAdapter."
        );
    }
    return HoganAdapter.extend({
        compiledTemplates: compiledTemplates
    });
};

module.exports = hoganAdapter;
