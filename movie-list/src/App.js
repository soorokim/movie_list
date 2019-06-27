import React, { Component } from 'react';

import {Switch, Route, Router} from "react-router-dom"

import Root from './pages/routers/Root'

class App extends Component {
  render() {
      console.log(this)
    return (
      <Router history={this.props.history}>
        <Root/>
      </Router>
    )
  }
}
export default App;
