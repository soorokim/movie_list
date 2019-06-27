import React, { Component } from 'react';

class YearOption extends Component {
  render(){
    const { year } = this.props

    return (
      <option value={year}>{year}</option>
    )
  }
}

export default YearOption
