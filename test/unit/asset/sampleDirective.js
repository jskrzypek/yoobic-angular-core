'use strict';
/*eslint consistent-this:[2,  "sampleDirectiveCtrl"] */

var directivename = 'sampleDirective';
var angular = require('angular');

module.exports = function(app) {
    var controllerDeps = [];
    var controller = function() {
        var sampleDirectiveCtrl = this;

        sampleDirectiveCtrl.preAction = function() {
            sampleDirectiveCtrl.title += 'x';
            sampleDirectiveCtrl.message += 'x';

            sampleDirectiveCtrl.action();
        };
    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = [app.name + '.directiveBinder'];
    var directive = function(directiveBinder) {

        return {
            restrict: 'AE',
            scope: true,
            controller: controller,
            controllerAs: 'sampleDirectiveCtrl',
            bindToController: true,
            template: require('./sampleDirective.html'),
            link: function(scope, element, attrs, sampleDirectiveCtrl) {

                directiveBinder['@'](scope, attrs, sampleDirectiveCtrl, 'title');
                directiveBinder['@'](scope, attrs, sampleDirectiveCtrl, 'stylemovie');
                directiveBinder['='](scope, attrs, sampleDirectiveCtrl, 'message');
                directiveBinder['&'](scope, attrs, sampleDirectiveCtrl, 'action');

            }
        };
    };

    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
