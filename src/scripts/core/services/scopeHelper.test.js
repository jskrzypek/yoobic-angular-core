'use strict';
/*eslint consistent-this:[0] */
var angular = require('angular-mocks');
var app = require('../')('app');
var servicename = 'scopeHelper';
describe(app.name, function() {

    describe('Services', function() {

        describe(servicename, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.service = $injector.get(app.name + '.' + servicename);
                this.$scope = $injector.get('$rootScope').$new();
            }));

            it('should be defined', function() {
                expect(this.service).toBeDefined();

            });

            it('$watchPostDigest() should succeed', function() {
                var vm = {
                    toto: 'toto'
                };
                this.$scope.$digest();
                var test = jasmine.createSpy();
                this.$scope.vm = vm;
                this.$scope.$watch(function() {
                    return vm.toto;
                }, function(newvalue, oldvalue) {
                    test(1);
                });
                this.service.$watchPostDigest(this.$scope, function() {
                    return vm.toto;
                }, function(newvalue, oldvalue) {
                    test(2);
                });

                vm.toto = 'titi';
                this.$scope.$digest();

                expect(test.calls.allArgs()).toEqual([
                    [1],
                    [2]
                ]);

            });
        });
    });
});
