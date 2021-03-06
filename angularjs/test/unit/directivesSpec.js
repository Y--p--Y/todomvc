(function () {
  'use strict';

  beforeEach(module('todomvc'));

  describe('todomvc focus directive', function () {
    var compiler, scope;

    beforeEach(inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      compiler = $compile;
    }));

    it('should focus on truthy expression', inject(function (_$timeout_) {
      var el = angular.element('<input todo-focus = "focus" />');
      spyOn(el[0], 'focus');

      scope.focus = false;
      compiler(el)(scope);

      scope.$apply(function () {
				scope.focus = true;
			});

      _$timeout_.flush();
      expect(el[0].focus).toHaveBeenCalled();

      el.remove();
    }));
  });
})();
