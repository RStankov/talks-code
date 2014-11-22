"use strict";

mocha.setup('bdd');
window.expect = chai.expect;


window.app = {};

app.Events = {
  trigger: function(eventName, arg) {
    var events = this.events || {};
    (events[eventName] || []).forEach(function(handler) {
      handler(arg);
    });
  },
  on: function(eventName, handler) {
    this.events || (this.events = {});
    this.events[eventName] || (this.events[eventName] = [])
    this.events[eventName].push(handler);
  }
}

app.Search = function() {
  this.loading = false;
};

app.Search.prototype.newQuery = function(query) {
  if (!query.length || this.loading) {
    return;
  }

  this.loading = true;
  this.trigger('query:new');

  var self = this;
  $.getJSON('/search?q=' + query, function(results) {
    self.loading = false;
    self.trigger('query:results', results);
  });
}

$.extend(app.Search.prototype, app.Events);

app.initSearch = function(search) {
  search || (search = new app.Search());

  search.on('query:new', function() {
    $('#search-results').addClass('loading').empty();
  });

  search.on('query:results', function(results) {
    $('#search-results').removeClass('loading');
    results.forEach(function(item) {
      $('#search-results').append('<a href="/products/' + item.id + '">' + item.name + '</a>');
    });
  });

  $('#search-form').on('submit', function(e) {
    e.preventDefault();
    search.newQuery($('#search-input').val().trim());
  });
};


describe("Search", function() {
  var form, input, results, search;

  function FakeSearch() {}

  FakeSearch.prototype.newQuery = function(query) {
    this.query = query;
  }

  $.extend(FakeSearch.prototype, app.Events);

  beforeEach(function() {
    form    = $('<form id="search-form"></form>').appendTo('body');
    results = $('<div id="search-results" />').appendTo(form);
    input   = $('<input id="search-input" type="text" />').appendTo(form);

    input.val('query');

    search = new FakeSearch;
    app.initSearch(search);
  });

  afterEach(function() {
    form.remove();
  })

  it("sets new query on submit", function() {
    input.val('query');
    form.submit();

    expect(search.query).to.eq('query');
  });

  it("adds loading class during search", function() {
    search.trigger('query:new');

    expect(results).to.have.class('loading');
  });

  it("removes loading class after search", function() {
    search.trigger('query:results', []);

    expect(results).not.to.have.class('loading');
  });

  it("renders results", function() {
    search.trigger('query:results', [
      {id: 1, name: 'Phone'},
      {id: 2, name: 'Tablet'}
    ]);

    expect(results).to.have.descendants('a[href="/products/1"]')
    expect(results).to.have.descendants('a[href="/products/2"]')
  });
});


