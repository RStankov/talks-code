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
      return (
        <article className="post-item" key={'post-' + post.id}>
          <button className="vote-button">{post.votesCount}</button>
          <div>
            <h1>{post.name}</h1>
            <p>{post.headline}</p>
          </div>
          <button className="comment-button">{post.commentsCount}</button>
        </article>
      );
    });
  }
});
