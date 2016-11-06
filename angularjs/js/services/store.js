angular.module('todomvc')
  .service('store', ['$injector', '$http',
    function ($injector, $http) {
      return $http.get('/api').then(
        function () {
          return $injector.get('api');
        }, function () {
          var localStorage = $injector.get('localStorage');
          localStorage.query();
          return localStorage;
        }
      );
    }
  ])
  .service('api', [
    '$resource',
    function ($resource) {
      return $resource('/api/todos/:id', {}, {
        getAll: {
          isArray: true
        }
      });
    }
  ])
  .service('localStorage', [
    '$q',
    function ($q) {
      'use strict';
      var DB_NAME = 'todomvc';

      var store = {
        todos: [],
        _getStorage: function () {
          return JSON.parse(localStorage.getItem(DB_NAME) || '[]');
        },
        _setStorage: function (todos) {
          localStorage.setItem(DB_NAME, JSON.stringify(todos));
        },
        query: function () {
          var defer = $q.defer();
          store.todos = store._getStorage();
          defer.resolve(store.todos);
          return defer.promise;
        },
        add: function (todo) {
          var defer = $q.defer();
          store.todos = store.todos.concat(todo);
          store._setStorage(store.todos);
          defer.resolve(store.todos);
          return defer.promise;
        },
        update: function (index, newTodo) {
          var defer = $q.defer();
          store.todos = store.todos.map(function (todo, i) {
            return index === i ? newTodo : todo;
          });
          store._setStorage(store.todos);

          defer.resolve(store.todos);
          return defer.promise;
        },
        remove: function (toRemove) {
          var defer = $q.defer();

          store.todos = store.todos.filter(function (todo) {
            return toRemove != todo;
          });
          store._setStorage(store.todos);

          defer.resolve(store.todos);
          return defer.promise;
        },
        clearCompleted: function () {
          var defer = $q.defer();

          store.todos = store.todos.filter(function (todo) {
            return !todo.completed;
          });
          store._setStorage(store.todos);

          defer.resolve(store.todos);
          return defer.promise;
        }
      };
      return store;
    }
  ]);
