'use strict';

var fullname = 'yoobic.angular.core';

var angular = require('angular');
var app = angular.module(fullname, []);
// inject:folders start
require('./services')(app);
// inject:folders end

module.exports = function() {
    return app;
};
