import React from 'react';

export default class SubmissionForm extends React.Component {
  state = {
    fields: {
      speakerName: '',
      speakerEmail: '',
    },
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Speaker</h2>
        <div>
          <label htmlFor="speakerName">Name: </label>
          <input type="text" id="speakerName" name="speakerName" value={this.state.fields.speakerName} onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="speakerEmail">Email: </label>
          <input type="email" id="speakerEmail" name="speakerEmail" value={this.state.fields.speakerEmail} onChange={this.handleInputChange} />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const fields = {
      ...this.state.fields,
      [name]: value
    };

    this.setState({ fields });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    remoteCall(this.state.fields);
  };
}

function remoteCall(values) {
  // simulate remote call
  console.log(values);
}
