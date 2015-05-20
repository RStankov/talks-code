import React from 'react';

import Item from './Item';

export default React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return { posts: [] };
  },

  render() {
    return (
      <div className="post-list">
        {this.renderItems()}
      </div>
    )
  },

  renderItems() {
    return this.props.posts.map(function(post) {
      return <Item key={'post-' + post.id} {...post} />
    });
  }
});
