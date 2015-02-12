'use strict';
var servicename = 'directiveBinder';

module.exports = function(app) {

    var dependencies = ['$parse'];

    function service($parse) {
        var binder = {
            '@': function(scope, attrs, ctrl, name) {
                ctrl[name] = scope.$parent.$eval(attrs[name]);
                attrs.$observe(name, function(value) {
                    ctrl[name] = value;
                });
            },
            '=': function(scope, attrs, ctrl, name) {
                ctrl[name] = scope.$parent.$eval(attrs[name]);
                scope.$watch(attrs[name], function(value) {
                    ctrl[name] = value;
                });
                scope.$watch(function() {
                    return ctrl[name];
                }, function(value) {
                    var prop = $parse(attrs[name]);
                    //console.log('prop', prop);
                    //if(prop && prop.assign) {
                    prop.assign(scope, value);
                    //}
                });
            },
            '&': function(scope, attrs, ctrl, name) {
                ctrl[name] = $parse(attrs[name]).bind(scope.$parent, scope);
            }
        };

        return binder;

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
