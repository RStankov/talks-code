import React from 'react';

let SubmitButton = ({ children }, { formState: { isSubmitting }}) => (
  <input type="submit" value={isSubmitting ? 'Submitting...' : children} disabled={isSubmitting} />
);

SubmitButton.contextTypes = {
  formState: React.PropTypes.object.isRequired,
};

export default SubmitButton;
