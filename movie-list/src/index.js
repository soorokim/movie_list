import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'


import App from './App';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { store } from "./store";
import createHistory from 'history/createBrowserHistory';


const history = createHistory();

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component history={history}/>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);
