var OpenFest = {
  createDynamicWidget: function(widget, options){
    widget  = $(widget);
    options = jQuery.extend({ list: "ol", item: "li" }, options || {});

    var list = widget.children(options.list);

    widget.bind("action:insert", function(e, content){
      list.prepend(content);
    });

    widget.delegate(options.item, "action:delete", function(){
      $(this).remove();
    });

    list.sortable({
      placeholder: "ui-state-highlight",
      update:      function(){ list.trigger("action:reorder", $(this).sortable("serialize")); }
    });
  },
  confirm: function(question){
    return !question || confirm(question);
  },
  errorMessage: function(errorMessage){
    alert(errorMessage);
  },
  preview: function(image){
    var overlay = $('<div class="overlay"></div>');

    overlay.click(function(){
      overlay.html("").hide();
    });

    overlay.appendTo(document.body);

    (OpenFest.preview = function(src){
      overlay.prepend(getImage(src)).show();
    })(image);

    function getImage(src){
      var image = new Image();

      image.src = src;
      image.style.visibility = "hidden";
      image.onload = function(){
        setTimeout(function(){
          image.onload = null;
          $(image).css({
            visibility: "visible",
            top:        Math.max(0, ($(window).height() - image.height) / 2) + "px",
            left:       Math.max(0, ($(window).width()  - image.width)  / 2) + "px"
          });
        }, 1);
      };

      return image;
    }
  }
};