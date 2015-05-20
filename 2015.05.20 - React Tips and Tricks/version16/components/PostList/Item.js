import React from 'react';

import VoteButton from './VoteButton';
import CommentButton from './CommentButton';

export default React.createClass({
  propTypes: {
    name:      React.PropTypes.string.isRequired,
    headline:  React.PropTypes.string.isRequired
  },

  render() {
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
