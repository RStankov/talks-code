"use strict";

mocha.setup('tdd');
window.assert = chai.assert;


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


suite("searching", function() {
  var form, input, results, server;

  setup(function() {
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

  teardown(function() {
    form.remove();
    server.restore();
  });

  test("empty search", function() {
    input.val('');
    form.submit();

    assert(server.requests.length == 0);
  });

  test("double submit", function() {
    form.submit();
    form.submit();

    assert(server.requests.length == 1);
  });

  test("adds loading class during search", function() {
    form.submit();

    assert(results.hasClass('loading'));
  });

  test("removes loading class after search", function() {
    form.submit();

    server.respond();

    assert(!results.hasClass('loading'));
  });

  test("renders results", function() {
    form.submit();

    server.respond();

    assert(results.find('a').length == 2);
    assert(results.find('a[href="/products/1"]').length == 1);
    assert(results.find('a[href="/products/2"]').length == 1);
  });
});
