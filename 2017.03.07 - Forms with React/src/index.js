import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import * as STEPS from './steps';

function App({ step }) {
  const Component = STEPS[step || 'final'] || (() => <strong>Missing component</strong>);
  return (
    <div className="app">
      <h1>Submit a talk</h1>
      <Component />
    </div>
  );
}

const step = (window.location.search || '').substr(1).toLowerCase();
ReactDOM.render(<App step={step} />, document.getElementById('root'));
