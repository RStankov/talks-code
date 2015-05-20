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
