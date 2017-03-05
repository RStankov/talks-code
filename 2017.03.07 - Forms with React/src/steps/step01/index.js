import React from 'react';

export default class SubmissionForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Speaker</h2>
        <div>
          <label htmlFor="speakerName">Name: </label>
          <input type="text" id="speakerName" name="speakerName" defaultValue="" />
        </div>
        <div>
          <label htmlFor="speakerEmail">Email: </label>
          <input type="email" id="speakerEmail" name="speakerEmail" defaultValue="" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const allValues = Array.from(e.target.elements).reduce((data, input) => {
      console.log(input);
      data[input.name] = input.value;
      return data;
    }, {});

    remoteCall({
      speakerName: allValues.speakerName,
      speakerEmail: allValues.speakerEmail,
    });
  };
}

function remoteCall(values) {
  // simulate remote call
  console.log(values);
}
