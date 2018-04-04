import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';

import 'normalize.css/normalize.css';
import './styles/main.scss';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers(), composeEnhacers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('app')
);