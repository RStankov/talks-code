import * as React from 'react';
import { FormSpy } from 'react-final-form';

export default function Submit() {
  return (
    <FormSpy>
      {form => (
        <React.Fragment>
          <input
            className="btn btn-primary"
            type="submit"
            disabled={form.submitting}
            value={`Submit${form.submitting ? '...' : ''}`}
          />
          {form.submitSucceeded && (
            <span className="ml-2 text-success">👌 Submitted</span>
          )}
          {form.submitting && (
            <span className="ml-2 text-muted">💾 Saving…</span>
          )}
          {form.submitFailed && (
            <span className="ml-2 text-danger">
              🙀 Oh-oh! There has been an error…
            </span>
          )}
        </React.Fragment>
      )}
    </FormSpy>
  );
}
