"use strict";

mocha.setup('bdd');
window.expect = chai.expect;


window.app = {};

app.initSearch = function() {
  $('#search-form').on('submit', function(e) {
    e.preventDefault();

    var query = $('#search-input').val().trim();

    if (!query.length) { return; }
    if ($('#search-results').hasClass('loading')) { return; }

    $('#search-results').empty()
    $('#search-results').addClass('loading');

    $.getJSON('/search?q=' + query, function(results) {
      $('#search-results').removeClass('loading');
      results.forEach(function(item) {
        $('#search-results').append('<a href="/products/' + item.id + '">' + item.name + '</a>');
      });
    });
  });
};


describe("Search", function() {
  var form, input, results, server;

  beforeEach(function() {
    form    = $('<form id="search-form"></form>').appendTo('body');
    results = $('<div id="search-results" />').appendTo(form);
    input   = $('<input id="search-input" type="text" />').appendTo(form);

    input.val('query');

    var data = [
      {id: 1, name: 'Phone'},
      {id: 2, name: 'Tablet'}
    ]

    server = sinon.fakeServer.create();
    server.respondWith("GET", "/search?q=query", JSON.stringify(data));

    app.initSearch();
  });

  afterEach(function() {
    form.remove();
    server.restore();
  })


  it("doesn't search on empty query", function() {
    input.val('');
    form.submit();

    expect(server.requests.length).to.eq(0);
  });

  it("guards against double submit", function() {
    form.submit();
    form.submit();

    expect(server.requests.length).to.eq(1);
  });

  it("adds loading class during search", function() {
    form.submit();

    expect(results).to.have.class('loading');
  });

  it("removes loading class after search", function() {
    form.submit();

    server.respond();

    expect(results).not.to.have.class('loading');
  });

  it("renders results", function() {
    form.submit();

    server.respond();

    expect(results).to.have.descendants('a[href="/products/1"]')
    expect(results).to.have.descendants('a[href="/products/2"]')
  });
});
