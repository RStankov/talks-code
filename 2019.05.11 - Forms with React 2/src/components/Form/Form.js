import * as React from 'react';
import * as FinalForm from 'react-final-form';
import arrayMutators from 'final-form-arrays';

const MUTATORS = { ...arrayMutators };

export default function Form({ initialValues, onSubmit, children }) {
  return (
    <FinalForm.Form
      onSubmit={onSubmit}
      initialValues={initialValues || {}}
      mutators={MUTATORS}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>{children}</form>
      )}
    </FinalForm.Form>
  );
}
