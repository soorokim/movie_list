import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'


import Root from './pages/routers/Root';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

import App from "./App"
import { store } from "./store";

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component history={history}/>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);
