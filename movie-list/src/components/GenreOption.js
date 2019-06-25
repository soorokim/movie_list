
import React, { Component } from 'react';

class GenreOption extends Component {
  render(){
    const { genre } = this.props

    return (
      <option value={genre}>{genre}</option>
    )
  }
}

export default GenreOption
