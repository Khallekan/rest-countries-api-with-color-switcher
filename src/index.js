import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './context';
import App from './containers/App';
import './style/index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
