$(document).delegate('[data-method="delete"]', "click", function(e){
  e.preventDefault();
  var element = $(this);
  if (OpenFest.confirm(element.data("confirm"))){
    $.ajax({
      url:  element.attr("href"),
      type: "DELETE"
    });
    element.trigger("action:delete");
  }
});