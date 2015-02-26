'use strict';
var servicename = 'scopeHelper';

module.exports = function(app) {

    var dependencies = [];

    function service() {

        var $watchPostDigest = function(scope, watchExpression, listener, objectEquality) {

            var __postDigestQueued = false;
            scope.$watch(watchExpression, function(newVal, oldVal, scope) {
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
        return {
            $watchPostDigest: $watchPostDigest
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
