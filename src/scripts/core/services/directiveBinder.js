'use strict';
var servicename = 'directiveBinder';
var angular = require('angular');
module.exports = function(app) {

    var dependencies = ['$parse', '$interpolate'];

    function service($parse, $interpolate) {
        var binder = {
            '@': function(scope, attrs, ctrl, name) {
                //ctrl[name] = scope.$parent.$eval(attrs[name]);
                //attrs.$observe(name, function(value) {
                //   ctrl[name] = value;
                //});

                attrs.$observe(name, function(value) {
                    ctrl[name] = value;
                });
                attrs.$$observers[name].$$scope = scope;
                if(attrs[name]) {
                    // If the attribute has been provided then we trigger an interpolation to ensure
                    // the value is there for use in the link fn
                    ctrl[name] = $interpolate(attrs[name])(scope);
                }

            },
            '=': function(scope, attrs, ctrl, name) {
                // ctrl[name] = scope.$parent.$eval(attrs[name]);
                // scope.$watch(attrs[name], function(value) {
                //     ctrl[name] = value;
                // });
                // scope.$watch(function() {
                //     return ctrl[name];
                // }, function(value) {
                //     var prop = $parse(attrs[name]);
                //     //console.log('prop', prop);
                //     //if(prop && prop.assign) {
                //     prop.assign(scope, value);
                //     //}
                // });

                var compare;
                var parentGet;
                var parentSet;
                var lastValue;

                parentGet = $parse(attrs[name]);
                if(parentGet.literal) {
                    compare = angular.equals;
                } else {
                    compare = function(a, b) {
                        return a === b || a !== a && b !== b;
                    };
                }
                parentSet = parentGet.assign || function() {
                    // reset the change, or we will throw this exception on every $digest
                    lastValue = ctrl[name] = parentGet(scope);
                    throw new Error('Expression ' + attrs[name] + ' is non-assignable!');
                };
                lastValue = ctrl[name] = parentGet(scope);

                var parentValueWatch = function parentValueWatch(parentValue) {
                    if(!compare(parentValue, ctrl[name])) {
                        // we are out of sync and need to copy
                        if(!compare(parentValue, lastValue)) {
                            // parent changed and it has precedence
                            ctrl[name] = parentValue;
                        } else {
                            // if the parent can be assigned then do so
                            parentSet(scope, parentValue = ctrl[name]);
                        }
                    }
                    lastValue = parentValue;
                    return lastValue;
                };
                parentValueWatch.$stateful = true;
                var unwatch;
                //if(definition.collection) {
                //    unwatch = scope.$watchCollection(attrs[attrName], parentValueWatch);
                //} else {
                unwatch = scope.$watch($parse(attrs[name], parentValueWatch), null, parentGet.literal);
                //}
                scope.$on('$destroy', function() {
                    unwatch();
                });

            },
            '&': function(scope, attrs, ctrl, name) {
                var parentGet;
                parentGet = $parse(attrs[name]);
                ctrl[name] = function(locals) {
                    return parentGet(scope, locals);
                };
            }
        };

        return binder;

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
