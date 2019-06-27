import React, {Component} from 'react';
import MovieDetail from "../components/detail/MovieDetail";

class Detail extends Component {
    render() {
      const id = this.props.match.params.id
        return (
          <MovieDetail id={id}/>
        )
    }
}


export default Detail;
