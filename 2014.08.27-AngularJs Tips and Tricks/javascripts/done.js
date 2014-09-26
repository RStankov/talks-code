app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('dashboard', {
      url: '/',
      controller: 'DashboardCtrl',
      templateUrl: 'templates/dashboard.html'
    }).state('settings', {
      abstract: true,
      url: '/settings',
      templateUrl: 'templates/settings/layout.html'
    }).state('settings.terms', {
      url: '/terms',
      templateUrl: 'templates/settings/terms.html'
    }).state('settings.profile', {
      url: '/profile',
      controller: 'SettingsProfileCtrl',
      templateUrl: 'templates/settings/profile.html'
    }).state('settings.products', {
      url: '/products',
      controller: 'SettingsProductsCtrl',
      templateUrl: 'templates/settings/products/list.html',
      resolve: {
        products: function(Product) { return Product.all() }
      }
    }).state('settings.new_product', {
      url: '/products/new',
      controller: 'SettingsProductCtrl',
      templateUrl: 'templates/settings/products/form.html',
      resolve: {
        product: function() { return {}; }
      }
    }).state('settings.product', {
      url: '/products/:id',
      controller: 'SettingsProductCtrl',
      templateUrl: 'templates/settings/products/form.html',
      resolve: {
        product: function($stateParams, Product) { return Product.find($stateParams.id); }
      }
    });
});

app.controller('DashboardCtrl', function($scope){ });

app.controller('SettingsProfileCtrl', function($scope, User){
  $scope.profile = angular.extend({}, User);

  $scope.save = function() {
    $scope.saved = false;

    if (!$scope.profile.name) {
      return;
    }

    angular.extend(User, $scope.profile);
    $scope.saved = true;
  }
});

app.controller('SettingsProductsCtrl', function($scope, products){
  $scope.products = products
});

app.controller('SettingsProductCtrl', function($scope, $location, $window, Product, product){
  $scope.product = product

  $scope.save = function() {
    Product.save($scope.product, function() {
      $location.path('/settings/products');
    });
  };

  $scope.destroy = function() {
    if (!$window.confirm('Are you sure?')) {
      return;
    }

    Product.destroy($scope.product, function() {
      $location.path('/settings/products');
    });
  }
});
