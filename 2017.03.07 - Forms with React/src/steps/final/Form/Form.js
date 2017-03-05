import React from 'react';

export default class Form extends React.Component {
  state = {
    fields: this.props.fields.reduce((fields, { name, ...others}) => {
      fields[name] = { value: '', touched: false, errors: [], ...others };
      return fields;
    }, {}),
    isSumitting: false,
  };

  static childContextTypes = {
    formState: React.PropTypes.object.isRequired,
    formHandleInputChange: React.PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      formState: this.state,
      formHandleInputChange: this.handleInputChange,
    };
  }

  isUnmounted: boolean = false;

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const fields = {
      ...this.state.fields,
      [name]: { ...this.state.fields[name], value, touched: true, }
    };

    this.setState({ fields });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.isSubmitting) {
      return;
    }

    const values = Object.keys(this.state.fields).reduce((data, name) => {
      data[name] = this.state.fields[name].value;
      return data;
    }, {});

    this.setState({ isSubmitting: true });

    const { errors = [] } = await this.props.onSubmit(values)

    if (!this.isUnmounted) {
      this.setState({
        isSubmitting: false,
        fields: Object.keys(this.state.fields).reduce((data, name) => {
          data[name] = { ...this.state.fields[name], touched: true, errors: errors[name] || [] };
          return data;
        }, {}),
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.children}
      </form>
    );
  }
}
