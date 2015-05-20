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
  },

  toggleVote: function(postId) {
    // TODO: implementation
  },

  onVoteChange: function(postId, callback) {
    // TODO: implementation
  },


  offVoteChange: function(postId, callback) {
    // TODO: implementation
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
      hasVoted:       Votes.hasVoted(this.props.id),
      votesCount:     this.props.votesCount
    };
  },

  componentDidMount: function() {
    Votes.onVoteChange(this.props.id, this.handleVotesUpdate);
  },

  componentWillUnmount: function () {
    Votes.offVoteChange(this.props.id, this.handleVotesUpdate);
  },

  render: function() {
    var className = classNames('vote-button', {active: this.state.hasVoted});

    return (
      <article className="post-item">
        <button className={className} onClick={this.handleVoteClick}>{this.state.votesCount}</button>
        <div>
          <h1>{this.props.name}</h1>
          <p>{this.props.headline}</p>
        </div>
        <button className="comment-button">{this.state.commentsCount}</button>
      </article>
    );
  },

  handleVotesUpdate: function(count) {
    this.setState({
      hasVoted:   Votes.hasVoted(this.props.id),
      votesCount: count
    });
  },

  handleVoteClick: function () {
    var voted = Votes.toggleVote(this.props.id);

    this.setState({
      hasVoted: voted,
      votesCount: this.state.votesCount + (voted ? 1 : -1)
    });
  }
});

