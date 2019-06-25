import React, { Component } from 'react';
import { connect } from "react-redux";
import Movie from './Movie'
import { AppActions } from "../reducers/app"
import { Row } from "reactstrap"

class MovieList extends Component {
  componentDidMount() {
    this.props.movieListRequest()
    window.addEventListener('scroll', this.infinitiScroll, true)
  }

  infinitiScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

     if (scrollTop + clientHeight === scrollHeight) {
       console.log(this.props.nextPage)
       if(this.props.nextPage){
         this.props.movieListRequest()
       }
     }
  }
  render(){
    const { movies } = this.props;
    const movieList = movies.map(
      (movie) => (<Movie
        {...movie}
        key={movie.id}
        />)
    )

    return (
      <div className='movie-list'>
        <Row>
          {movieList}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  movies: state.app.movieList.data,
  nextPage: state.app.page
})

const mapDispatchToProps = {
  movieListRequest: AppActions.movieListRequest,
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
