import React from 'react';

export default class SubmissionForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Speaker</h2>
        <div>
          <label htmlFor="speakerName">Name: </label>
          <input type="text" id="speakerName" name="speakerName" defaultValue="" ref={(ref) => this.speakerName = ref} />
        </div>
        <div>
          <label htmlFor="speakerEmail">Email: </label>
          <input type="email" id="speakerEmail" name="speakerEmail" defaultValue="" ref={(ref) => this.speakerEmail = ref} />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();

    remoteCall({
      speakerName: this.speakerName.value,
      speakerEmail: this.speakerEmail.value,
    });
  };
}

function remoteCall(values) {
  // simulate remote call
  console.log(values);
}
