app = angular.module('demo', []);

app.controller('demoCtrl', function($scope) {
  $scope.value = 0;
  $scope.increase = function() {
    $scope.value += 1;
  };
  $scope.decrease = function() {
    $scope.value -= 1;
  };
});
