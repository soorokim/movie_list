import React, {Component} from 'react';
import MovieListTemplate from "../components/main/MovieListTemplate";
import SearchForm from "../components/main/SearchForm";
import MovieList from "../components/main/MovieList";

class Main extends Component {
    render() {
        return (
          <MovieListTemplate form={(<SearchForm/>)}>
            <MovieList/>
          </MovieListTemplate>
        )
    }
}


export default Main;
