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
