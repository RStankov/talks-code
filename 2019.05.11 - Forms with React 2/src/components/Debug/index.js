import * as React from 'react';

export default function Debug({ value }) {
  return (
    <div className="card">
      <div className="card-body">
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </div>
  );
}
