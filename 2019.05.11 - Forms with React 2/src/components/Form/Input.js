import * as React from 'react';
import * as FinalForm from 'react-final-form';

export default function Input({ type, ...props }) {
  return <FinalForm.Field component="input" type={type || 'text'} {...props} />;
}
