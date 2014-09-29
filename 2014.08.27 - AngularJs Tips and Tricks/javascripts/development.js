app.invoke = function(fn) {
  var dom = document.querySelector('[ng-app="' + this.name + '"]'),
      element = angular.element(dom);

  return element.injector().invoke(fn);
}
