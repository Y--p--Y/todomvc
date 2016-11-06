angular.module('todomvc')
  .controller('TodoCtrl', [
    '$scope', '$routeParams', 'store',
    function ($scope, $routeParams, store) {
      'use strict';

      $scope.$on('$routeChangeSuccess', function () {
        $scope.status = $routeParams.status || '';
        if ($scope.status === 'active') {
          $scope.statusFilter = {completed: false};
        } else if ($scope.status === 'completed') {
          $scope.statusFilter = {completed: true};
        } else {
          $scope.statusFilter = {};
        }
      })

      var todos = $scope.todos = store.todos;
      var prevTitle;

      $scope.$watch('todos', function () {
        $scope.completedCount = todos.reduce(function (count, todo) {
          return count + (todo.completed ? 1 : 0);
        }, 0);
        $scope.allChecked = todos.length && $scope.completedCount === todos.length;
      });

      function sync() {
        todos = $scope.todos = store.todos;
      }

      $scope.addTodo = function () {
        var title = ($scope.newTodo || '').trim();

        if (title) {
          $scope.saving = true;
          store.add({
            title: title,
            completed: false
          }).then(function () {
            sync();
            $scope.newTodo = '';
          }).finally(function () {
            $scope.saving = false;
          });
        }
      };

      $scope.toggleTodo = function (todo, completed) {
        if (angular.isDefined(completed)) {
          todo.completed = completed;
        }
        store.update(todos.indexOf(todo), todo)
              .then(sync);
      }

      $scope.editTodo = function (todo) {
        $scope.editingTodo = todo;
        prevTitle = todo.title;
      };

      $scope.revertEdits = function () {
        $scope.editingTodo.title = prevTitle;
        $scope.editingTodo = null;
      };

      $scope.saveEdits = function (todo, event) {
        // eenter key will trigger 'submit' followed by 'blur',
        // so check $scope.editingTodo first
        if (event === 'blur' && !$scope.editingTodo) {
          return false;
        }

        todo.title = todo.title.trim();
        (todo.title ?
          store.update(todos.indexOf(todo), todo) :
          store.remove(todo)
        ).then(sync)
          .finally(function () {
            $scope.editingTodo = null;
          });
      };

      $scope.removeTodo = function (todo) {
        store.remove(todo).then(sync);
      };

      $scope.toggleAll = function (completed) {
        todos.forEach(function (todo) {
          todo.completed !== completed && $scope.toggleTodo(todo, completed);
        });
      };

      $scope.clearCompleted = function () {
        store.clearCompleted().then(sync);
      }
    }]
  );
