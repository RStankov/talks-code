app = angular.module('demo', []);

app.value('Calculator', {
  value: 0
});

app.controller('actionsCtrl', function($scope, Calculator) {
  $scope.increase = function() {
    Calculator.value += 1;
  };
  $scope.decrease = function() {
    Calculator.value -= 1;
  };
});

app.controller('displayCtrl', function($scope, Calculator) {
  $scope.calculator = Calculator
});

