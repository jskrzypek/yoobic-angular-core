'use strict';

module.exports = function(app) {
    // inject:start
    require('./directiveBinder')(app);
    require('./scopeHelper')(app);
    // inject:end
};