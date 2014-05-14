app = angular.module('demo', []);

app.controller('demoCtrl', function($scope) {
  $scope.people = [];
  $scope.newPerson = "";
  $scope.addPerson = function() {
    if ($scope.newPerson.length > 0) {
      $scope.people.push({name: $scope.newPerson});
      $scope.newPerson = "";
    }
  };
});
