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

var Comment = {
  observe: function(postId, callback) {

  },

  stopObserving: function(postId, callback) {

  }
};

var PostItem = React.createClass({
  propTypes: {
    name:      React.PropTypes.string.isRequired,
    headline:  React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <article className="post-item">
        <VoteButton {...this.props} />
        <div>
          <h1>{this.props.name}</h1>
          <p>{this.props.headline}</p>
        </div>
        <CommentButton {...this.props} />
      </article>
    );
  }
});

var CommentButton = React.createClass({
  propTypes: {
    id:             React.PropTypes.number.isRequired,
    commentsCount:  React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      commentsCount:  this.props.commentsCount
    };
  },

  componentDidMount: function() {
    Comment.observe(this.props.id, this.handleUpdate);
  },

  componentWillUnmount: function () {
    Comment.stopObserving(this.props.id, this.handleUpdate);
  },

  render: function() {
    return <button className="comment-button">{this.state.commentsCount}</button>;
  },

  handleUpdate: function (count) {
    this.setState({
      commentsCount: count
    });
  }
});

var VoteButton = React.createClass({
  getInitialState: function() {
    return {
      hasVoted:    Votes.hasVoted(this.props.id),
      votesCount:  this.props.votesCount,
    };
  },

  componentDidMount: function() {
    Votes.onVoteChange(this.props.id, this.handleUpdate);
  },

  componentWillUnmount: function () {
    Votes.offVoteChange(this.props.id, this.handleUpdate);
  },

  render: function() {
    var className = classNames('vote-button', {active: this.state.hasVoted});

    return <button className={className} onClick={this.handleClick}>{this.state.votesCount}</button>
  },

  handleUpdate: function(count) {
    this.setState({ votesCount: count });
  },

  handleClick: function () {
    var voted = Votes.toggleVote(this.props.id);

    this.setState({
      hasVoted: voted,
      votesCount: this.state.votesCount + (voted ? 1 : -1)
    });
  }
});
