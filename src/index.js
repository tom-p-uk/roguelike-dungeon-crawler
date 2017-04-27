import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import '../assets/css/styles.css';
import Map from './components/map';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

ReactDOM.render(

    <Map />

  , document.querySelector('.container-fluid')
);
