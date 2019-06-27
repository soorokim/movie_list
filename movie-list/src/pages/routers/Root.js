import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect,Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { store } from "../../store";

import Main from '../Main'
import Detail from '../Detail'
import Chart from '../Chart'

 class Root extends Component {
    constructor() {
      super();
      autoBind(this)
    }
    render() {
        return (
          <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/detail/:id" component={Detail}/>
            <Route path="/chart/" component={Chart}/>
          </Switch>
        )
    }
}


export default Root;
