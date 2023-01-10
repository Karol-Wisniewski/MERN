import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const root = ReactDOM.createRoot(document.getElementById('root'));

const history = createMemoryHistory();

root.render(
  <Router location={history.location} navigator={history}>
    <App />
  </Router>
);


