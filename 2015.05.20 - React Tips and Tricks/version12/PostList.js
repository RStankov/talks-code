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
