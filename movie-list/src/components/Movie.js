import React, { Component } from 'react';
import { Col, Row, Card, CardImg, CardText, CardBody,
  CardTitle, CardHeader,CardSubtitle, Container } from 'reactstrap';

import './Movie.css'

class Movie extends Component {

  render(){
    const { title, enTitle, releaseDate, rate, imgURL, genre, URL, story,genres, director,actors } = this.props
    let genreList = genres.map((genre)=> {
       return genre.genre+','
    })
    let actorList = actors.map((actor)=> {
       return actor.name+','
    })



    return (
          <Col md="2" style={{marginBottom:'15px'}}>
            <Card>
                <CardHeader style={{height:"407px",padding:0}}>
                <a href={URL} target="_blank">
                  <CardImg top width="100%" height='407px'src={imgURL} alt="Card image cap"/>
                </a>
              </CardHeader>
              <CardBody style={{height:"275px", padding: "0.5rem"}}>
                <CardTitle style={{marginBottom:'0'}}>{title}</CardTitle>
              <CardSubtitle
                class="en_name"
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
                감독 및 출연 : {director},{actorList})</CardSubtitle>
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
