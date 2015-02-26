'use strict';
/*eslint consistent-this:[0] */
var angular = require('angular-mocks');
var app = require('../')('app');
var servicename = 'scopeHelper';
var unitHelper = require('unitHelper');
describe(app.name, function() {

    describe('Services', function() {

        describe(servicename, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.service = $injector.get(app.name + '.' + servicename);
                this.$scope = $injector.get('$rootScope').$new();
                this.$compile = $injector.get('$compile');
                this.$templateCache = $injector.get('$templateCache');
            }));

            it('should be defined', function() {
                expect(this.service).toBeDefined();

            });

            it('$watchPostDigest() should succeed', function() {
                var vm = {
                    dummy: 'dummy'
                };
                this.$scope.$digest();
                var test = jasmine.createSpy();
                this.$scope.vm = vm;
                this.$scope.$watch(function() {
                    return vm.dummy;
                }, function(newvalue, oldvalue) {
                    test(1);
                });
                this.service.$watchPostDigest(this.$scope, function() {
                    return vm.dummy;
                }, function(newvalue, oldvalue) {
                    test(2);
                });

                vm.dummy = 'new dummy';
                this.$scope.$digest();

                expect(test.calls.allArgs()).toEqual([
                    [1],
                    [2]
                ]);

            });

            it('$watchPostDigest() should returns a deregistration function', function() {
                var vm = {
                    dummy: 'dummy'
                };
                this.$scope.$digest();
                var test = jasmine.createSpy();
                this.$scope.vm = vm;

                var unwatch = this.service.$watchPostDigest(this.$scope, function() {
                    return vm.dummy;
                }, function(newvalue, oldvalue) {
                    test();
                });
                // create a change and digest
                vm.dummy = 'new dummy';
                this.$scope.$digest();

                expect(test.calls.count()).toEqual(1);

                // reset the spy and call the derigistration function
                test.calls.reset();
                unwatch();

                // create a change and digest
                vm.dummy = 'again new dummy';
                this.$scope.$digest();

                expect(test.calls.count()).toEqual(0);
            });

            it('getTotalWatches() should succeed', function() {
                var vm = {
                    dummy1: 'dummy1',
                    dummy2: 'dummy2'
                };

                this.$scope.$digest();
                var initialWatches = this.service.getTotalWatches();
                this.$scope.vm = vm;

                this.$scope.$watch(function() {
                    return vm.dummy1;
                }, function(newvalue, oldvalue) {

                });
                this.$scope.$watch(function() {
                    return vm.dummy2;
                }, function(newvalue, oldvalue) {

                });
                expect(this.service.getTotalWatches()).toBe(initialWatches + 2);
            });

        });
    });
});
