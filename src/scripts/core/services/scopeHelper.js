'use strict';
var servicename = 'scopeHelper';
var _ = require('lodash');
var angular = require('angular');
module.exports = function(app) {

    var dependencies = ['$rootScope'];

    function service($rootScope) {

        /**
         * Registers a watch on the post digest cycle
         * @param  {Object} scope - The scope object
         * @param  {(function() | string)} watchExpression - The watch expression
         * @param  {function(newVal, oldVal, scope)} listener - Callback called whenever the value of `watchExpression` changes
         * @param  {boolean=} objectEquality - ompare for object equality using {@link angular.equals} instead of comparing for reference equality
         * @returns {function()} Returns a deregistration function for this listener
         */
        var $watchPostDigest = function(scope, watchExpression, listener, objectEquality) {

            var __postDigestQueued = false;
            return scope.$watch(watchExpression, function(newVal, oldVal, scope) {
                if(__postDigestQueued) {
                    return;
                }
                __postDigestQueued = true;
                scope.$$postDigest(function() {
                    __postDigestQueued = false;
                    listener(newVal, oldVal, scope);
                });
            }, objectEquality);

        };

        function getScopes(root) {
            var scopes = [];

            function traverse(scope) {
                scopes.push(scope);
                if(scope.$$nextSibling) {
                    traverse(scope.$$nextSibling);
                }
                if(scope.$$childHead) {
                    traverse(scope.$$childHead);
                }
            }
            traverse(root);
            return scopes;
        }

        /**
         * Gets the total numer of watches
         * @returns {integer} The total number of watches
         */
        var getTotalWatches = function() {
            var rootScope = $rootScope; //angular.element(document.querySelectorAll('[ng-app]')).scope();
            var scopes = getScopes(rootScope);
            var watcherLists = scopes.map(function(s) {
                return s.$$watchers;
            });
            return _.uniq(_.flatten(watcherLists)).length;
        };

        return {
            $watchPostDigest: $watchPostDigest,
            getTotalWatches: getTotalWatches
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
