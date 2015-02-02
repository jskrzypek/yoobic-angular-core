'use strict';
/*eslint consistent-this:[2,  "faTestCtrl"] */
var directivename = 'faTest';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var faTestCtrl = this;
        faTestCtrl.name = directivename;
    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = ['$famous', '$timeout'];
    var directive = function($famous, $timeout) {
        return {
            restrict: 'AE',
            scope: true,
            controller: controller,
            controllerAs: 'faTestCtrl',
            bindToController: true,
            template: require('./faTest.html'),
            link: function(scope, element, attrs) {
                $timeout(function() {
                    //console.log($famous.find('fa-surface'));
                }, 0);

            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
