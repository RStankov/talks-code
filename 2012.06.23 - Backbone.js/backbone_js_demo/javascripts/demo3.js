var AppRouter = Backbone.Router.extend({
  routes: {
    'pages':            'index',
    'pages/search/:q':  'search',
    'pages/:id':        'show'
  },
  initialize: function() {
    console.log('initialize');
  },
  index:  function()      { console.log('index'); },
  search: function(query) { console.log('search ->', query); },
  show:   function(id)    { console.log('show ->', id); }
});

var app = new AppRouter();

Backbone.history.start();

// server required
// Backbone.history.start({pushState: true, root: '/backbone_js_demo/'});
