import React from 'react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default class Input extends React.Component {
  static propTypes = {
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func,
    initialValue: React.PropTypes.string,
    placeholder: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value || '' });
  }

  handleKeyDown(e) {
    if (e.keyCode === ESCAPE_KEY) {
      this.setState({
        value: '',
      });

      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }

    if (e.keyCode === ENTER_KEY) {
      var value = this.state.value.trim();
      if (value) {
        this.setState({
          value: '',
        });

        this.props.onSave(value);
      }
    }
  }

  render() {
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.state.value} />
    );
  }
}


