import React, { Component } from 'react';
import MovieListTemplate from './components/MovieListTemplate'
import MovieList from './components/MovieList'
import SearchForm from './components/SearchForm'

class App extends Component {
  render() {
    return (
      <MovieListTemplate
        form={(
          <SearchForm />
        )}>
        <MovieList/>
      </MovieListTemplate>
    );
  }
}

export default App;
