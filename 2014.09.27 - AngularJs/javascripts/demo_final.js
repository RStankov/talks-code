"use strict";

window.app = angular.module('Demo', []);

app.config(function(UserProvider) {
  UserProvider.set({
    name: 'Radoslav Stankov',
    avatar: 'images/avatar.jpg'
  });
});

app.factory('Message', function() {
  var messages = [];

  return {
    fetch: function() {
      return messages;
    },
    post: function(user, text) {
      messages.push({user: user, text: text});
    }
  };
});

app.provider('User', function() {
  var details = {}

  this.set = function(user) {
    angular.extend(details, user);
  };

  this.$get = function(Message) {
    return {
      say: function (message) {
        Message.post(details, message);
      }
    };
  };
});

app.controller('MessagesCtrl', function($scope, Message) {
  $scope.messages = Message.fetch();
});

app.controller('PostCtrl', function($scope, User) {
  $scope.message = '';
  $scope.post = function() {
    if ($scope.message.length) {
      User.say($scope.message);
      $scope.message = '';
    }
  };
});
