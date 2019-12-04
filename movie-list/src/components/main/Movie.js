import React, { Component } from 'react';
import { Col, Row, Card, CardImg, CardText, CardBody,
  CardTitle, CardHeader,CardSubtitle, Container } from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppActions } from "../../reducers/app"
import autoBind from 'react-autobind'

import MakeSpanList from '../commons/MakeSpanList'
import './Movie.css'

class Movie extends Component {
  constructor(props){
    super(props);
    autoBind(this)
    this.state = {
      fav_icon: props.favorite? faHeart:farHeart,
      fav_color: props.favorite? "pink":"grey"
    }
  }
    _handleClickFavorite(id){
        this.props.changeFavoriteRequest(id)
    }

  render(){
      const { id,title, enTitle, releaseDate, rate, imgURL, genre, URL, story,genres, director,actors, favorite } = this.props

      const actorList = actors.map(
          (actor) => (<MakeSpanList
              key = {id+actor.id}
              item={actor.name}
          />)
      );
      const genreList = genres.map(
          (genre) => (<MakeSpanList
              key = {id+genre.genre}
              item={genre.genre}
          />)
      );


      const changeFav = (id) => {
        if(this.state.fav_icon===farHeart){
            this.setState({
                fav_icon: faHeart,
                fav_color: "pink"
            })
        } else {
            this.setState({
                fav_icon: farHeart,
                fav_color: "gray"
            })
        }
        this._handleClickFavorite(id)
      }
      /*this.setState({
                  fav_icon: faHeart,
                  fav_color: "pink"
              })
              */
      return (
          <Col md="2" style={{marginBottom:'15px'}}>
              {() => (favorite ? this.setState({ fav_icon: faHeart, fav_color: "pink" }) : "")}
              <Card>
                  <CardHeader style={{height:"407px",padding:0}}>
                      <Link to={'/detail/'+id}>
                          <CardImg top width="100%" height='407px'src={imgURL} alt="Card image cap"/>
                      </Link>
                  </CardHeader>
                  <CardBody style={{height:"275px", padding: "0.5rem"}}>
                      <CardTitle style={{marginBottom:'0'}}>
                          <FontAwesomeIcon 
                          icon={this.state.fav_icon} 
                          color={this.state.fav_color} 
                          onClick={()=>(changeFav(id))}
                          />
                          {title}
                      </CardTitle>
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

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = {
    changeFavoriteRequest: AppActions.changeFavoriteRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);

