'use strict';

module.exports = function(app) {
    // inject:start
    require('./directiveBinder')(app);
    // inject:end
};