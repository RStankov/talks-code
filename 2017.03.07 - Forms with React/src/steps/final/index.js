import React from 'react';

import { Form, Field, SubmitButton } from './Form';

let SpeakerLinks = () => (
  <ul>
    <li>Name: <input type="text" name="via" /></li>
    <li>Link: <input type="text" name="via" /></li>
    <li><button>remove link</button></li>
  </ul>
);

const LENGTH_OPTIONS = [
  {value: 15, label: '15 minutes'},
  {value: 30, label: '30 minutes'},
  {value: 45, label: '45 minutes'},
];

const VIA_OPTIONS = [
  {value:'email', label: 'Email'},
  {value:'push', label: 'Push notification'},
  {value:'phone', label: 'Phone'},
];

const FIELDS = [
  {name: 'speakerName'},
  {name: 'speakerEmail'},
  // {name: 'speakerLinks', value: []},
  {name: 'talkTitle'},
  {name: 'talkDescription'},
  {name: 'talkLength', value: 15},
  {name: 'notifyVia', value: 'email'},
  {name: 'acceptTerms', value: false},
];

let SubmissionForm = () => (
  <Form fields={FIELDS} onSubmit={handleSubmit}>
    <h2>Speaker</h2>
    <Field name="speakerName" label="Name" />
    <Field name="speakerEmail" label="Email" input="email" />
    <h2>Talk</h2>
    <Field name="talkTitle" label="Title" />
    <Field name="talkDescription" label="Description" input="textarea" />
    <Field name="talkLength" label="Length" input="select" options={LENGTH_OPTIONS} />
    <Field name="notifyVia" label="Notify me via" input="radios" options={VIA_OPTIONS} />
    <SubmitButton>Submit</SubmitButton>
  </Form>
);

async function handleSubmit(values) {
  if (!values.speakerName) {
    return { errors: { speakerName: ['required'] } };
  }

  // do ajax and redirect
  return { result: 'success' };
};

export default SubmissionForm;
