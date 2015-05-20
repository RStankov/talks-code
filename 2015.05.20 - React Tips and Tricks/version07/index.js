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

var Votes = {
  hasVoted: function(postId) {
    // TODO: implementation
    return true;
  }
};

var PostItem = React.createClass({
  propTypes: {
    votesCount:     React.PropTypes.number.isRequired,
    commentsCount:  React.PropTypes.number.isRequired,
    name:           React.PropTypes.string.isRequired,
    headline:       React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      hasVoted: Votes.hasVoted(this.props.id)
    };
  },

  render: function() {
    var className = classNames('vote-button', {active: this.state.hasVoted});

    return (
      <article className="post-item">
        <button className={className}>{this.props.votesCount}</button>
        <div>
          <h1>{this.props.name}</h1>
          <p>{this.props.headline}</p>
        </div>
        <button className="comment-button">{this.props.commentsCount}</button>
      </article>
    );
  }
});


