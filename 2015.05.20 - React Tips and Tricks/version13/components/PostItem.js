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
