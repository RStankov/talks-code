(function() {
  function graphQLQuery(query) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        var status = xhr.status === 1223 ? 204 : xhr.status
        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'))
          return
        }

        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(JSON.parse(body));
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open('post', '/graphql', true);

      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/graphql');

      xhr.send(query);
    });
  }

  React.render(
    React.createElement(GraphiQL, {
      defaultQuery: "#",
      fetcher: function(params) {
        return graphQLQuery(params.query);
      },
    }),
    document.body
  );
})();

