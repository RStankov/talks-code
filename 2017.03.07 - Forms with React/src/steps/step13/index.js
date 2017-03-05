import React from 'react';


let Select = ({ options, ...props }) => (
  <select {...props}>
    {options.map(({ label, value }, i) => (
      <option key={i} value={value}>{label || value}</option>
    ))}
  </select>
);

let Textarea = ({ value, ...props }) => (
  <textarea {...props} />
);

let Input = ({ ...props }) => (
  <input {...props} />
);

let RadioGroup = ({ value: fieldValue, options, name, id, ...props }) => (
  <ul>
    {options.map(({ label, value }, i) => (
      <li key={i}>
        <label>
          <input type="radio" name={name} value={value} checked={value === fieldValue} {...props} /> {label || value}
        </label>
      </li>
    ))}
  </ul>
);

const INPUTS = {
  'textarea': Textarea,
  'select': Select,
  'text': Input,
  'radioGroup': RadioGroup,
};


let Field = ({ name, input, label, ...props }, { formState: { fields }, formHandleInputChange }) => {
  const value = fields[name];
  const Component = typeof input === 'function' ? input : INPUTS[input] || Input;
  const inputProps = Component === Input ? { type: input, ...props } : props;

  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <Component id={name} name={name} value={value} onChange={formHandleInputChange} {...inputProps} />
    </div>
  );
};

Field.defaultProps = {
  input: 'text',
};

Field.contextTypes = {
  formState: React.PropTypes.object.isRequired,
  formHandleInputChange: React.PropTypes.func.isRequired,
};

let SubmitButton = ({ children }, { formState: { isSubmitting }}) => (
  <input type="submit" value={isSubmitting ? 'Submitting...' : children} disabled={isSubmitting} />
);

SubmitButton.contextTypes = {
  formState: React.PropTypes.object.isRequired,
};

class Form extends React.Component {
  state = {
    fields: this.props.fields,
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.children}
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

    await this.props.onSubmit(this.state.fields);
  };
}

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

const FIELDS = {
  speakerName: '',
  speakerEmail: '',
  talkTitle: '',
  talkDescription: '',
  talkLength: '15',
};

export default class SubmissionForm extends React.Component {
  render() {
    return (
      <Form fields={FIELDS} onSubmit={remoteCall}>
        <h2>Speaker</h2>
        <Field name="speakerName" label="Name" />
        <Field name="speakerEmail" label="Email" input="email" />
        <h2>Talk</h2>
        <Field name="talkTitle" label="Title" />
        <Field name="talkDescription" label="Description" input="textarea" />
        <Field name="talkLength" label="Length" input="select" options={LENGTH_OPTIONS} />
        <Field name="notifyVia" label="Notify me via" input="radioGroup" options={VIA_OPTIONS} />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    );
  }
}

async function remoteCall(values) {
  // simulate remote call
  console.log(values);
}
