import * as React from 'react';
import Form from './Form';
import { Mutation as ApolloMutation } from 'react-apollo';
import { FORM_ERROR } from 'final-form';

export default function Mutation({
  children,
  mutation,
  mutationInput,
  updateCache,
  initialValues,
  onSubmit,
}) {
  return (
    <ApolloMutation mutation={mutation} update={updateCache}>
      {(mutate) => {
        const submit = async (values) => {
          const response = await mutate({
            variables: {
              input: buildInput(values, mutationInput),
            },
          });

          const errors = extractErrors(response);
          if (errors) {
            return errors;
          }

          if (onSubmit) {
            onSubmit(extractObject(response));
          }
        };

        return (
          <Form initialValues={initialValues} onSubmit={submit}>
            {children}
          </Form>
        );
      }}
    </ApolloMutation>
  );
}

function buildInput(input, mutationInput) {
  if (typeof mutationInput === 'function') {
    return mutationInput(input);
  }

  if (mutationInput) {
    return { ...mutationInput, ...input };
  }

  return input;
}

function extractErrors(response) {
  if (!response.data || response.errors) {
    return {
      [FORM_ERROR]: 'Server error',
    };
  }

  const result = response.data[Object.keys(response.data)[0]];
  if (!result || typeof result.errors === 'undefined') {
    return {
      [FORM_ERROR]: 'Server error',
    };
  }

  if (result.errors.length > 0) {
    return result.errors.reduce(normalizeErrors, {});
  }

  return null;
}

function extractObject(response) {
  return response.data[Object.keys(response.data)[0]].object;
}
