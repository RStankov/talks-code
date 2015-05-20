import React from 'react';
import classNames from 'classnames';

import Votes from '../../lib/Votes.js';

export default React.createClass({
  getInitialState: function() {
    return this.getStateFromStore();
  },

  getStateFromStore: function() {
    return {
      hasVoted:   VotesStore.hasVoted(this.props.id),
      votesCount: VotesStore.voteCount(this.props.id, this.props.votesCount)
    }
  },

  componentDidMount: function() {
    VotesStore.addChangeListener(this.handleStoreChange);
  },

  componentWillUnmount: function () {
    VotesStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange: function() {
    this.setState(this.getStateFromStore());
  },

  render: function() {
    var className = classNames('vote-button', {active: this.state.hasVoted});

    return <button className={className} onClick={this.handleClick}>{this.state.votesCount}</button>
  },

  handleClick: function () {
    VoteActionCreators.toggleVote(this.props.id, this.state.votesCount);
  }
});
