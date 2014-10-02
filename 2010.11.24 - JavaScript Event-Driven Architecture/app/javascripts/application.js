//= require "jquery/core"
//= require "jquery/ui"
//= require "jquery/html5_upload"

//= require "open_fest"

//= require "behaviors/error"
//= require "behaviors/delete"
//= require "behaviors/preview"
//= require "behaviors/reorder"

OpenFest.createDynamicWidget("#images_widget");

$.fileUploadSupported && $('#new_image').submit(function(e){
  var form  = $(this),
      file  = form.children('input[type="file"]'),
      files = file[0].files;

  if (files && files.length > 0){
    $.uploadFile({
      url:        form.attr("action"),
    	type:       form.attr("method").toUpperCase(),
      dataType:   "html",
      name:       file.attr("name"),
      beforeSend: function(){       form.css("opacity", "0.4").children(":input").attr("disabled", "disabled"); },
      complete:   function(){       form.css("opacity", "1").children(":input").removeAttr("disabled");         },
      error:      function(xhr){    xhr.status == 422 && form.trigger("action:error", xhr.responseText);        },
      success:    function(html){   form.trigger("action:insert", html);                                        },
    }, files[0]);
  }
  this.reset();

  return false;
});