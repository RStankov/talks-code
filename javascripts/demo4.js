app = angular.module('demo', []);

app.controller('demoCtrl', function($scope) {
  $scope.tasks = [];
  $scope.newTask = "";
  $scope.createTask = function() {
    if ($scope.newTask.length > 0) {
      $scope.tasks.push({text: $scope.newTask});
      $scope.newTask = "";
    }
  };
});
