'use strict';
/*eslint consistent-this:[2,  "sampleDirectiveIsolatedCtrl"] */

var directivename = 'sampleDirectiveIsolated';
var angular = require('angular');

module.exports = function(app) {
    var controllerDeps = [];
    var controller = function() {
        var sampleDirectiveIsolatedCtrl = this;

        sampleDirectiveIsolatedCtrl.preAction = function() {
            sampleDirectiveIsolatedCtrl.title += 'x';
            sampleDirectiveIsolatedCtrl.message += 'x';

            sampleDirectiveIsolatedCtrl.action();
        };
    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = [app.name + '.directiveBinder'];
    var directive = function(directiveBinder) {

        return {
            restrict: 'AE',
            scope: {
                title: '@',
                message: '=',
                action: '&',
                flag: '@'
            },
            controller: controller,
            controllerAs: 'sampleDirectiveIsolatedCtrl',
            bindToController: true,
            template: require('./sampleDirective.html'),
            link: function(scope, element, attrs, ctrl) {
                directiveBinder.toPrimitive(scope, attrs, ctrl, 'flag', true, 'boolean');
            }

        };
    };

    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
