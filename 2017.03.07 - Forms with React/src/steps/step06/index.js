import React from 'react';


let Field = ({ name, type, label, ...props }) => {
  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <input type={type || 'text'} id={name} name={name} {...props} />
    </div>
  );
};

export default class SubmissionForm extends React.Component {
  state = {
    fields: {
      speakerName: '',
      speakerEmail: '',
      talkTitle: '',
    },
    isSumitting: false,
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Speaker</h2>
        <Field name="speakerName" label="Name" value={this.state.fields.speakerName} onChange={this.handleInputChange} />
        <Field name="speakerEmail" label="Email" type="email" value={this.state.fields.speakerEmail} onChange={this.handleInputChange} />
        <h2>Talk</h2>
        <Field name="talkTitle" label="Title" value={this.state.fields.talkTitle} onChange={this.handleInputChange} />
        <input type="submit" value="Submit" disabled={this.state.isSubmitting} />
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

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });

    await remoteCall(this.state.fields);
  };
}

async function remoteCall(values) {
  // simulate remote call
  console.log(values);
}
