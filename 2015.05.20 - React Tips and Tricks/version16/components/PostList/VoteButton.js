import React from 'react';
import classNames from 'classnames';

import VotesStore from '../../stores/VotesStore';
import VoteActionCreators from '../../actions/VoteActionCreators';

export default React.createClass({
  propTypes: {
    id:          React.PropTypes.number.isRequired,
    votesCount:  React.PropTypes.number.isRequired,
  },

  getInitialState() {
    return this.getStateFromStore();
  },

  getStateFromStore() {
    return {
      hasVoted:   VotesStore.hasVoted(this.props.id),
      votesCount: VotesStore.voteCount(this.props.id, this.props.votesCount)
    }
  },

  componentDidMount() {
    VotesStore.addChangeListener(this.handleStoreChange);
  },

  componentWillUnmount() {
    VotesStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange() {
    this.setState(this.getStateFromStore());
  },

  render() {
    var className = classNames('vote-button', {active: this.state.hasVoted});

    return <button className={className} onClick={this.handleClick}>{this.state.votesCount}</button>
  },

  handleClick() {
    VoteActionCreators.toggleVote(this.props.id, this.state.votesCount);
  }
});
