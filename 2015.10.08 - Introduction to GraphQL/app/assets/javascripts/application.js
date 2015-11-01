//= require 'graphiql'

(function() {
  var parameters = {};
  window.location.search.substr(1).split('&').forEach(function (entry) {
    var eq = entry.indexOf('=');
    if (eq >= 0) {
      parameters[decodeURIComponent(entry.slice(0, eq))] = decodeURIComponent(entry.slice(eq + 1));
    }
  });

  if (parameters.variables) {
    try {
      parameters.variables = JSON.stringify(JSON.parse(query.variables), null, 2);
    } catch (e) { }
  }

  function updateURL() {
    var newSearch = '?' + Object.keys(parameters).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]);
    }).join('&');
    history.replaceState(null, null, newSearch);
  }

  React.render(
    React.createElement(GraphiQL, {
      query: parameters.query || "",
      variables: parameters.variables,
      fetcher: function(params) {
        return fetch(window.location.origin + '/queries', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }).then(function (response) {
          return response.json()
        });
      },
      onEditQuery: function(query) {
        parameters.query = query;
        updateURL();
      },
      onEditVariables: function(variables) {
        parameters.variables = variables;
        updateURL();
      }
    }),
    document.body
  );
})();
