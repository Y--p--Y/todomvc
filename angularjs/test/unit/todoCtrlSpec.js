/*global describe, it, beforeEach, inject, expect*/
(function () {
  'use strict';

  describe('Todo Controller', function () {
    var ctrl, scope, store;

    beforeEach(module('todomvc'));

    beforeEach(inject(function ($controller, $rootScope, localStorage) {
      // init scope
      scope = $rootScope.$new();

      // init storage
      store = localStorage;
      // overwrite method
      store._getStorage = function () {
        return [];
      };
      store._setStorage = function (todos) {
        store.todos = todos;
      };
      store.query();

      // init controller
      ctrl = $controller('TodoCtrl', {
        $scope: scope,
        store: store
      });

      scope.$digest();
    }));

    it('should not have an edited Todo on start', function () {
      expect(scope.editing).toBeFalsy();
    });

    it('should not have any Todos on start', function () {
      expect(scope.todos.length).toBe(0);
    });

    describe('the filter', function () {
      it('should default to ""', function () {
        scope.$emit('$routeChangeSuccess');
        expect(scope.status).toBe('');
        expect(scope.statusFilter).toEqual({});
      });

      describe('being at /active state', function () {
        it('should filter out completed', inject(function ($controller) {
          ctrl = $controller('TodoCtrl', {
            $scope: scope,
            store: store,
            $routeParams: {
              status: 'active'
            }
          });

          scope.$emit('$routeChangeSuccess');
          expect(scope.status).toBe('active');
          expect(scope.statusFilter.completed).toBeFalsy();
        }));
      });
    });

    describe('having no Todos', function () {
      it('should not add empty Todos', function () {
        scope.newTodo = '';
        scope.addTodo();
        scope.$digest();
        expect(scope.todos.length).toBe(0);
      });

      it('should not add items consisting only of whitespaces', function () {
        scope.newTodo = '  \n ';
        scope.addTodo();
        scope.$digest();
        expect(scope.todos.length).toBe(0);
      });

      it('should trim white space from new todo', function () {
        var newTodo = '  a ';
        scope.newTodo = newTodo;
        scope.addTodo();
        scope.$digest();
        expect(scope.todos.length).toBe(1);
        expect(scope.todos[0].title).toBe(newTodo.trim());
      });
    });

    describe('having some saved todos', function () {
      var ctrl;

      beforeEach(inject(function($controller) {
        store.add({ title: 'Uncompleted Item 0', completed: false });
        store.add({ title: 'Uncompleted Item 1', completed: false });
        store.add({ title: 'Uncompleted Item 2', completed: false });
        store.add({ title: 'Uncompleted Item 3', completed: false });
        store.add({ title: 'Uncompleted Item 4', completed: false });
        store.add({ title: 'Completed Item 0', completed: true});
        store.add({ title: 'Completed Item 1', completed: true});

        ctrl = $controller('TodoCtrl', {
          $scope: scope,
          store: store
        });

        scope.$digest();
      }));

      it('should count todos correctly', function () {
        expect(scope.todos.length).toBe(7);
        expect(scope.completedCount).toBe(2);
        expect(scope.allChecked).toBe(false);
      });

      it('should save todos to local storage', function () {
        expect(scope.todos.length).toBe(7);
      });

      it('should trim Todos on saving', function () {
        var todo = scope.todos[0];
        var title = ' hhh ';
        todo.title = title;
        scope.saveEdits(todo);
        expect(scope.todos[0].title).toBe('hhh');
      });

      it('should remove todo w/o title', function () {
        var todo = scope.todos[0];
        var length = scope.todos.length;

        todo.title = '';
        scope.saveEdits(todo);
        scope.$digest();

        expect(scope.todos.length).toBe(length - 1);
      });

      it('toggleAll() should mark all todos completed', function () {
        scope.toggleAll(true);
        scope.$digest();
        expect(scope.allChecked).toBe(true);

        scope.toggleAll(false);
        scope.$digest();
        expect(scope.completedCount).toBe(0);
      });

      it('clearCompleted() should clear completed todos', function () {
        scope.clearCompleted();
        scope.$digest();

        expect(store.todos.length).toBe(5);
        expect(scope.todos.length).toBe(5);
        expect(scope.completedCount).toBe(0);
      });

      it('revertTodo() get a Todo to its previous state', function () {
        var prevTitle = scope.todos[0].title;
        scope.editTodo(scope.todos[0]);
        scope.todos[0].title = '';
        scope.revertEdits();

        expect(scope.todos[0].title).toBe(prevTitle);
      });
    });
  });
})();
