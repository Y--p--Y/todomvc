angular
  .module('todomvc', ['ngResource', 'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';

    var routeConfig = {
      controller: 'TodoCtrl',
      templateUrl: 'todomvc-index.html',
      resolve: {
        store: ['store', function (store) {
          return store;
        }]
      }
    };
    $routeProvider
      .when('/', routeConfig)
      .when('/:status', routeConfig)
      .otherwise({
        redirectTo: '/'
      });
  }]);
