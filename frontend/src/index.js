import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { initialState } from './store';

import './index.css';
import './bootstrap.min.css'; //added, this is for the bootstrap styling which is used in the header and footer
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} serverState={initialState}> 
    <App />
  </Provider>
);


