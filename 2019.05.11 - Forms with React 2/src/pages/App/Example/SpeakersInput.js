import React from 'react';
import Form from 'components/Form';

export default function SpeakersInput({ fields }) {
  return (
    <React.Fragment>
      {fields.map((name, index) => (
        <div className="form-row" key={name}>
          <div className="form-group mr-1">
            <div className="badge badge-secondary">{index + 1}</div>
          </div>
          <div className="form-group mr-1">
            <Form.Input
              name={`${name}.firstName`}
              placeholder="First Name"
              className="form-control form-control-sm"
            />
          </div>
          <div className="form-group mr-1">
            <Form.Input
              name={`${name}.lastName`}
              placeholder="Last Name"
              className="form-control form-control-sm"
            />
          </div>
          <div className="form-group ">
            <button
              className="btn btn-danger btn-sm"
              onClick={e => {
                e.preventDefault();
                fields.remove(index);
              }}>
              remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          fields.push(undefined);
        }}
        className="btn btn-link p-0">
        add speaker
      </button>
    </React.Fragment>
  );
}

SpeakersInput.isArray = true;
