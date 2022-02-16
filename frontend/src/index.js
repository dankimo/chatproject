import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as reducers from './store/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import './polyfill';

const process = reducers.process;
const setkey = reducers.setkey; 

const initState = { process: {}, setkey: {key: ""}};
const store = createStore(combineReducers({
    process,
    setkey,
}), initState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);