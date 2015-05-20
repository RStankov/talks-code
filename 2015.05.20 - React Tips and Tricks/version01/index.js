var PostList = React.createClass({
  render: function() {
    var posts = this.props.posts.map(function(post) {
      return (
        React.createElement("article", {className: "post-item"},
          React.createElement("button", {className: "vote-button"}, post.votesCount),
          React.createElement("div", null,
            React.createElement("h1", null, post.name),
            React.createElement("p", null, post.headline)
          ),
          React.createElement("button", {className: "comment-button"}, post.commentsCount)
        )
      );
    });

    return (
      React.createElement("div", {className: "post-list"}, posts)
    )
  }
});
