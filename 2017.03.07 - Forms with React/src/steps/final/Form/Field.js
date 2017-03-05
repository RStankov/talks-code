import React from 'react';

let Textarea = ({ value, ...props }) => (
  <textarea {...props} />
);

let Select = ({ options, ...props }) => (
  <select {...props}>
    {options.map(({ label, value }, i) => <option key={i} value={value}>{label || value}</option>)}
  </select>
);

let Radios = ({ value: fieldValue, options, name, id, ...props }) => (
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

let Input = ({ ...props }) => (
  <input {...props} />
);

const INPUTS = {
  'textarea': Textarea,
  'select': Select,
  'radios': Radios,
  'text': Input,
};

let Field = ({ name, input, label, id, ...props }, { formState: { fields }, formHandleInputChange }) => {
  const { value, touched, errors } = fields[name];
  const Component = typeof input === 'function' ? input : INPUTS[input || 'text'] || Input;
  const inputProps = Component === Input ? { type: input, ...props } : props;

  return (
    <div>
      <label htmlFor={id || name}>{ label || name }:</label>
      <Component id={id || name} name={name} value={value} onChange={formHandleInputChange} {...inputProps} />
      { touched && errors.length > 0 && (
        <strong>{errors[0]}</strong>
      )}
    </div>
  );
}

Field.defaultProps = {
  input: 'text',
};

Field.contextTypes = {
  formState: React.PropTypes.object.isRequired,
  formHandleInputChange: React.PropTypes.func.isRequired,
};

export default Field;
