"use strict";

window.app = angular.module('Demo', []);

app.factory('Message', function() {
  var messages = [];

  return {
    fetch: function() {
      return messages;
    },
    post: function(text) {
      messages.push({text: text});
    }
  };
});

app.controller('MessagesCtrl', function($scope, Message) {
  $scope.messages = Message.fetch();
  $scope.message = '';
  $scope.post = function() {
    if ($scope.message.length) {
      Message.post($scope.message);
      $scope.message = '';
    }
  };
});
