var PostList = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return { posts: [] };
  },

  render: function() {
    return (
      <div className="post-list">
        {this.renderItems()}
      </div>
    )
  },

  renderItems: function () {
    return this.props.posts.map(function(post) {
      return <PostItem key={'post-' + post.id} {...post} />
    });
  }
});

var PostItem = React.createClass({
  render: function() {
    return (
      <article className="post-item">
        <button className="vote-button">{this.props.votesCount}</button>
        <div>
          <h1>{this.props.name}</h1>
          <p>{this.props.headline}</p>
        </div>
        <button className="comment-button">{this.props.commentsCount}</button>
      </article>
    );
  }
});
