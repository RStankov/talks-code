import * as React from 'react';
import { capitalize } from 'lodash';
import { FieldArray } from 'react-final-form-arrays';
import * as FinalForm from 'react-final-form';
import { uniqueId } from 'lodash';

function FieldRow({
  label,
  control: Control,
  meta,
  input,
  fields,
  id,
  ...inputProps
}) {
  const error = meta.error || meta.submitError;
  const name = input ? input.name : fields.name;

  id = React.useMemo(() => id || uniqueId(`form-${name}-`), [id, name]);

  return (
    <div className="form-group d-block">
      <div className="form-label d-block">
        <label htmlFor={id}>{label || capitalize(name)}:</label>
        {error && <span className="text-danger float-right">{error}</span>}
      </div>
      {fields ? (
        <Control fields={fields} id={id} {...inputProps} />
      ) : (
        <Control id={id} {...input} {...inputProps} />
      )}
    </div>
  );
}

export default function Field({ control, ...inputProps }) {
  control = typeof control === 'function' ? control : CONTROLS[control];

  const Field = control.isArray ? FieldArray : FinalForm.Field;
  return <Field control={control} component={FieldRow} {...inputProps} />;
}

const CONTROLS = {
  undefined: props => <input type="text" className="form-control" {...props} />,
  text: props => <input type="text" className="form-control" {...props} />,
  email: props => <input type="email" className="form-control" {...props} />,
  textarea: props => <textarea className="form-control" {...props} />,
  select: ({ options, ...props }) => (
    <select className="form-control" {...props}>
      {options.map(({ label, value }, i) => (
        <option key={i} value={value}>
          {label || value}
        </option>
      ))}
    </select>
  ),
  radioGroup: ({ id: _id, value, options, name, onChange, ...props }) => (
    <ul className="pl-4">
      {options.map((option, i) => (
        <li key={i}>
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
              {...props}
            />
            {option.label || option.value}
          </label>
        </li>
      ))}
    </ul>
  ),
};
