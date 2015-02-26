'use strict';
var servicename = 'directiveBinder';
var angular = require('angular');
module.exports = function(app) {

    var dependencies = ['$parse', '$interpolate'];

    function service($parse, $interpolate) {
        var binder = {
            /**
             * Performs a one way binding
             * @param  {Object} scope - The scope of the directive
             * @param  {Object} attrs - The attributes object of the directive pre or post link function
             * @param  {Object} ctrl - The controller of the directive
             * @param  {String} name  - The name of the binded property
             */
            '@': function(scope, attrs, ctrl, name) {
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

            /**
             * Performs a two way binding
             * @param  {Object} scope - The scope of the directive
             * @param  {Object} attrs - The attributes object of the directive pre or post link function
             * @param  {Object} ctrl - The controller of the directive
             * @param  {String} name  - The name of the binded property
             */
            '=': function(scope, attrs, ctrl, name) {
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

            /**
             * Performs a "&" binding (function)
             * @param  {Object} scope - The scope of the directive
             * @param  {Object} attrs - The attributes object of the directive pre or post link function
             * @param  {Object} ctrl - The controller of the directive
             * @param  {String} name  - The name of the binded property
             */
            '&': function(scope, attrs, ctrl, name) {
                var parentGet;
                parentGet = $parse(attrs[name]);
                ctrl[name] = function(locals) {
                    return parentGet(scope, locals);
                };
            },

            /**
             * Transform a one way bind to a primitive type (boolean, double, etc...) instead of simple string
             * @param  {Object} scope - The scope of the directive
             * @param  {Object} attrs - The attributes object of the directive pre or post link function
             * @param  {Object} ctrl - The controller of the directive
             * @param  {String} name - The name of the one way binded property
             * @param  {Object} [defaultValue] - The default value of the one way binded property
             * @param  {String} [typename] - The type name of the property
             */
            toPrimitive: function(scope, attrs, ctrl, name, defaultValue, typename) {
                ctrl[name] = scope.$eval(attrs[name]) || defaultValue;
                attrs.$observe(name, function() {
                    ctrl[name] = scope.$eval(attrs[name]);
                    if(typename && typeof ctrl[name] !== typename) {
                        throw new Error('Attribute "' + name + '" should be of type "' + typename + '"');
                    }
                });
            }
        };

        return binder;

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
