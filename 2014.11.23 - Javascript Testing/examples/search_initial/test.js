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


test("searching", function() {
  var form = $('<form id="search-form"></form>').appendTo('body');

  var callback;
  var calls = 0;
  $.getJSON = function(url, success) {
    assert(url === '/search?q=value');
    callback = success;
    calls += 1 ;
  }

  app.initSearch();

  var input = $('<input id="search-input" type="text" />').appendTo(form);
  assert(input.val().length == 0);

  input.val('');
  form.submit();

  assert(calls == 0);

  input.val('value');

  var results = $('<div id="search-results" />').appendTo(form);

  form.submit();

  assert(results.hasClass('loading'));

  form.submit();
  form.submit();

  assert(calls == 1);

  callback([
    {id: 1, name: 'Phone'},
    {id: 2, name: 'Tablet'}
  ]);

  assert(!results.hasClass('loading'));
  assert(results.find('a').length == 2);

  assert(results.find('a[href="/products/1"]').length == 1);
  assert(results.find('a[href="/products/1"]').length == 1);
});

