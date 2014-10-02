$(document).delegate('[data-action="preview"]', "click", function(e){
  e.preventDefault();
  OpenFest.preview($(this).attr("href"));
});