# yoobic-angular-core 
[![NPM version](https://badge.fury.io/js/yoobic-angular-core.svg)](http://badge.fury.io/js/yoobic-angular-core) [![Downloads](http://img.shields.io/npm/dm/yoobic-angular-core.svg)](http://badge.fury.io/js/yoobic-angular-core)   
[![Build Status](https://travis-ci.org/Yoobic/yoobic-angular-core.svg?branch=master)](https://travis-ci.org/Yoobic/yoobic-angular-core) [![Test Coverage](https://codeclimate.com/github/Yoobic/yoobic-angular-core/badges/coverage.svg)](https://codeclimate.com/github/Yoobic/yoobic-angular-core) [![Code Climate](https://codeclimate.com/github/Yoobic/yoobic-angular-core/badges/gpa.svg)](https://codeclimate.com/github/Yoobic/yoobic-angular-core)   
[![Dependency Status](https://david-dm.org/Yoobic/yoobic-angular-core.svg)](https://david-dm.org/Yoobic/yoobic-angular-core) [![devDependency Status](https://david-dm.org/Yoobic/yoobic-angular-core/dev-status.svg)](https://david-dm.org/Yoobic/yoobic-angular-core#info=devDependencies) [![peerDependency Status](https://david-dm.org/Yoobic/yoobic-angular-core/peer-status.svg)](https://david-dm.org/Yoobic/yoobic-angular-core#info=peerDependencies)    


> A yoobic angular core module

[![NPM](https://nodei.co/npm/yoobic-angular-core.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yoobic-angular-core)

## Usage
For the time beeing, this package only exists as a npm library (you have to use browserify to use it)
I will be publishing a bower package later on.

The componants of this package are namespace with 'yoobic.angular.core' which happens to be the name of the angular module.

```bash
npm install --save yoobic-angular-core
```

Then in your project add the following dependency to 'yoobic-angular-core'
```js
var yoobicCore = require('yoobic-angular-core');
var angular = require('angular');
var app = angular.module('app', [yoobicCore.name]);
```

and in a controller:

```js
app.controller('home', [
     '$scope', 'yoobic.angular.core.directiveBinder', 
     function($scope, directiveBinder) {
        ...
}]);
```

> **NOTE:**   
> Because of the namespacing you have to use the explicit form of DI when using this library

## Documentation

### Services
#### directiveBinder
The `directiveBinder` service is a helper to create the the usual bindings (@,=,&) in a directive that has a `scope:true`

Example:
```js
app.directive('sampleDirective', [
    'yoobic.angular.core.directiveBinder', 
    function(directiveBinder) {

        return {
            restrict: 'AE',
            scope: true,
            controller: function() {},
            controllerAs: 'sampleDirectiveCtrl',
            bindToController: true,
            template: require('./sampleDirective.html'),
            link: function(scope, element, attrs, sampleDirectiveCtrl) {
                directiveBinder['@'](scope, attrs, sampleDirectiveCtrl, 'title');
                directiveBinder['='](scope, attrs, sampleDirectiveCtrl, 'message');
                directiveBinder['&'](scope, attrs, sampleDirectiveCtrl, 'action');

            }
        };
    }]);
```

## Testing
Run 
```bash
gulp unit
```
or 
```bash
npm test
```

## Changelog

Recent changes can be viewed on Github on the [Releases Page](https://github.com/Yoobic/yoobic-angular-core/releases)

## License
MIT

