import React, { Component } from 'react';
import { Col, Row, Card, CardImg, CardText, CardBody,
  CardTitle, CardHeader,CardSubtitle, Container } from 'reactstrap';
import { Link } from 'react-router-dom'

import MakeSpanList from '../commons/MakeSpanList'
import './Movie.css'

class Movie extends Component {

  render(){
    const { id,title, enTitle, releaseDate, rate, imgURL, genre, URL, story,genres, director,actors } = this.props
    
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
          <Col md="2" style={{marginBottom:'15px'}}>
            <Card>
                <CardHeader style={{height:"407px",padding:0}}>
                <Link to={'/detail/'+id}>
                  <CardImg top width="100%" height='407px'src={imgURL} alt="Card image cap"/>
                </Link>
              </CardHeader>
              <CardBody style={{height:"275px", padding: "0.5rem"}}>
                <CardTitle style={{marginBottom:'0'}}>{title}</CardTitle>
              <CardSubtitle
                className="en_name"
                style={{
                  fontSize:'9pt'
                  ,overflow:'hidden'
                  ,textOverflow:'ellipsis'
                  ,whiteSpace:'nowrap'
                }}>
                {enTitle}
              </CardSubtitle>
                <CardSubtitle>평점(개봉일) : {rate}({releaseDate})</CardSubtitle>
              <CardSubtitle
                style={{
                  overflow:'hidden'
                  ,textOverflow:'ellipsis'
                  ,whiteSpace:'nowrap'
                }}>
                감독 및 출연 : {director},{actorList}</CardSubtitle>
              <CardSubtitle
                style={{
                  overflow:'hidden'
                  ,textOverflow:'ellipsis'
                  ,whiteSpace:'nowrap'
                }}>
                장르 : {genreList} </CardSubtitle>
              <CardText>줄거리 : {story}</CardText>
              </CardBody>
            </Card>
          </Col>
    )
  }
}

export default Movie
