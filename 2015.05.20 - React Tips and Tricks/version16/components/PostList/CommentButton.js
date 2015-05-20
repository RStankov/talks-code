import React from 'react';

import CommentsStore from '../../stores/CommentsStore';

export default React.createClass({
  propTypes: {
    id:             React.PropTypes.number.isRequired,
    commentsCount:  React.PropTypes.number.isRequired,
  },

  getInitialState() {
    return this.getStateFromStore();
  },

  getStateFromStore() {
    return {
      commentsCount:  CommentsStore.commentCount(this.props.id, this.props.commentsCount);
    }
  },

  componentDidMount() {
    CommentsStore.addChangeListener(this.handleStoreChange);
  },

  componentWillUnmount() {
    CommentsStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange() {
    this.setState(this.getStateFromStore());
  },

  render() {
    return <button className="comment-button">{this.state.commentsCount}</button>;
  }
});
