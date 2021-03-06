angular.module('todomvc')
  .directive('todoFocus', ['$timeout', function ($timeout) {
    'use strict';

    return function (scope, elem, attrs) {
      scope.$watch(attrs.todoFocus, function (newVal) {
        if (newVal) {
          $timeout(function () {
            elem[0].focus();
          }, 0);
        }
      });
    };
  }]);
