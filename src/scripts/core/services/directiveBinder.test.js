'use strict';
/*eslint consistent-this:[0] */
var angular = require('angular-mocks');
var app = require('../')('app');

var directivename = 'sampleDirective';
require('../../../../test/unit/asset/sampleDirective')(app);
var unitHelper = require('unitHelper');

var servicename = 'directiveBinder';
describe(app.name, function() {

    describe('Services', function() {

        describe(servicename, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.service = $injector.get(app.name + '.' + servicename);
            }));

            beforeEach(inject(function($injector) {
                this.$templateCache = $injector.get('$templateCache');
                this.$compile = $injector.get('$compile');
                this.$scope = $injector.get('$rootScope').$new();
                this.$timeout = $injector.get('$timeout');

            }));

            it('should be defined', function() {
                expect(this.service).toBeDefined();
            });

            it('should work with one-way binding', function() {
                var vm = {
                    title: 'toto',
                    message: 'message',
                    action: angular.noop()
                };
                this.$scope.vm = vm;
                unitHelper.compileDirective.call(this, directivename, '<sample-directive title="{{vm.title}}" message="vm.message" action="vm.action()"></sample-directive>');
                var sampleDirectiveCtrl = this.scope.sampleDirectiveCtrl;
                expect(sampleDirectiveCtrl.title).toBe(vm.title);
                vm.title = 'new title';
                this.$scope.$digest();
                expect(sampleDirectiveCtrl.title).toBe(vm.title);

                sampleDirectiveCtrl.title = 'another title';
                this.$scope.$digest();
                expect(vm.title).toBe('new title');
            });

            it('should work with two-way binding', function() {
                var vm = {
                    title: 'toto',
                    message: 'message',
                    action: angular.noop()
                };
                this.$scope.vm = vm;
                unitHelper.compileDirective.call(this, directivename, '<sample-directive title="{{vm.title}}" message="vm.message" action="vm.action()"></sample-directive>');
                var sampleDirectiveCtrl = this.scope.sampleDirectiveCtrl;
                expect(sampleDirectiveCtrl.message).toBe(vm.message);
                vm.message = 'new message';
                this.$scope.$digest();
                expect(sampleDirectiveCtrl.message).toBe(vm.message);
                sampleDirectiveCtrl.message = 'another new message';
                this.$scope.$digest();
                expect(sampleDirectiveCtrl.message).toBe(vm.message);
            });

            it('should work with function binding', function() {
                var vm = {
                    title: 'toto',
                    message: 'message',
                    action: jasmine.createSpy()
                };

                this.$scope.vm = vm;
                var element = unitHelper.compileDirective.call(this, directivename, '<sample-directive title="{{vm.title}}" message="vm.message" action="vm.action()"></sample-directive>');
                var button = element.find('button');
                button[0].click();

                var sampleDirectiveCtrl = this.scope.sampleDirectiveCtrl;
                expect(sampleDirectiveCtrl.message).toBe(vm.message);
                expect(sampleDirectiveCtrl.message).toBe('messagex');

            });

        });
    });
});
