'use strict';
/*eslint consistent-this:[0] */
var angular = require('angular-mocks');
var app = require('../')('app');
var directivename = 'faTest';
var unitHelper = require('unitHelper');

describe(app.name, function() {

    describe('Directives', function() {

        describe(directivename, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.$templateCache = $injector.get('$templateCache');
                this.$compile = $injector.get('$compile');
                this.$scope = $injector.get('$rootScope').$new();
                this.$timeout = $injector.get('$timeout');
            }));

            it('should succeed with html', function() {
                var element = unitHelper.compileDirective.call(this, directivename, '<fa-test></fa-test>');
                expect(element.html().trim()).toBeDefined();
            });

            it('should succeed with famous', function(done) {
                var element = unitHelper.compileDirectiveFamous.call(this, directivename, '<fa-test></fa-test>');
                expect(element.html().trim()).toBeDefined();
                this.$timeout.flush();
                setTimeout(function() {
                    console.log('test is done', element.html());
                    done();
                }, 100);
            });

        });
    });
});
