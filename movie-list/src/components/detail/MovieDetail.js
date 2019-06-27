import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { Container, Row, Col, Table } from 'reactstrap';
import MakeSpanList from '../commons/MakeSpanList'

class Detail extends Component {
    render() {
      console.log(this)
      let id = this.props.id
      let movie = this.props.movies.filter(movie => movie.id===id ? movie:false)
      if(movie.length){
        let { URL, imgURL, title,enTitle,releaseDate,rate,genres,director,actors, story } = movie[0]
        const actorList = actors.map(
          (actor) => (<MakeSpanList
            item={actor.name}
          />)
        )
        const genreList = genres.map(
          (genre) => (<MakeSpanList
            item={genre.genre}
          />)
        )
        return (
          <Container fluid>
            <Row>
              <Col md="2">
                <Link to="/">
                  <p className="logo">
                    Movie List
                  </p>
                </Link>
              </Col>
            </Row>
            <Row>
            <Col md={{ size:4 }}>
              <img src={imgURL} width='100%'/>
            </Col>
            <Col md={{ size:8 }}>
              <Row><Col style={{textAlign:'right'}} sm="2"> 제  목 : </Col><Col style={{textAlign:'left'}}> {title} ({enTitle}) </Col></Row>
              <Row><Col style={{textAlign:'right'}} sm="2"> 개봉일 : </Col><Col style={{textAlign:'left'}}> {releaseDate}  평점 {rate}점</Col></Row>
              <Row><Col style={{textAlign:'right'}} sm="2"> 감  독 : </Col><Col style={{textAlign:'left'}}> {director} </Col></Row>
              <Row><Col style={{textAlign:'right'}} sm="2"> 출  연 : </Col><Col style={{textAlign:'left'}}> {actorList} </Col></Row>
              <Row><Col style={{textAlign:'right'}} sm="2"> 장  르 : </Col><Col style={{textAlign:'left'}}> {genreList} </Col></Row>
              <Row><Col style={{textAlign:'right'}} sm="2"> 줄거리 : </Col><Col style={{textAlign:'left'}}> {story} </Col></Row>
            </Col>
          </Row>
          <Row>
          </Row>
        </Container>
      )
    } else {
      return (
        <Container fluid>
          <Row>
            <Col md="2">
              <Link to="/">
              <p className="logo">
                Movie List
              </p>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>잘못된 경로로 접근하셨습니다. 로고를 눌러 홈으로 가세요</h1>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  movies: state.app.movieList.data,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
