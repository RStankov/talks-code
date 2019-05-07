import React from 'react';
import Debug from 'components/Debug';
import Form from 'components/Form';
import SpeakersInput from './SpeakersInput';

export default function SubmitTalkForm() {
  const debug = window.location.search === '?debug';
  return (
      <Form onSubmit={onSubmit}>
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Submit a talk</h1>
                <Form.Field name="title" />
                <Form.Field name="email" control="email" />
                <Form.Field name="description" control="textarea" />
                <Form.Field name="length" control="select" options={LENGTHS} />
                <Form.Field name="level" control="radioGroup" options={LEVELS} />
                <Form.Field name="speakers" control={SpeakersInput} />
                <div className="mt-2 pt-4 border-top">
                  <Form.Submit />
                </div>
              </div>
            </div>
          </div>
          {debug && (
            <div className="col-6">
              <Form.State>{state => <Debug value={state} />}</Form.State>
            </div>
          )}
        </div>
      </Form>
  );
}

const LENGTHS = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
];

const LEVELS = [
  { value: 'beginner' },
  { value: 'intermediate' },
  { value: 'expert' },
];

function onSubmit(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'required';
  }

  if (!values.description) {
    errors.description = 'required';
  }

  if (!values.level) {
    errors.level = 'required';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
}

