$(document).delegate("[data-sortable-url]", "action:reorder", function(e, data){
  $.ajax({
    url:  $(this).data("sortable-url"),
    type: "PUT",
    data: data
  });
});