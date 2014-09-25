"use strict";

window.app = angular.module('Demo', []);

app.controller('MessagesCtrl', function($scope) {
  $scope.messages = []
  $scope.message = '';
  $scope.post = function() {
    if ($scope.message.length) {
      $scope.messages.push({text: $scope.message});
      $scope.message = '';
    }
  };
});
