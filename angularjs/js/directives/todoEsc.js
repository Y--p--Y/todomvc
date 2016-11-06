angular.module('todomvc')
  .directive('todoEsc', [function () {
    'use strict';

    return function (scope, elem, attr) {
        elem.on('keydown', function (e) {
          if (e.keyCode === 27) { // esc
            scope.$apply(attr.todoEsc);
          }
        });

        scope.$on('$destroy', function () {
          elem.off('keydown');
        });
    };
  }]);
