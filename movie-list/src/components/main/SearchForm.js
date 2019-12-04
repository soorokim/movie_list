import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col, Row, Container, InputGroup
        , Input, Button, InputGroupAddon
        , CustomInput, Label, Form
        , FormGroup } from 'reactstrap'
import autoBind from 'react-autobind'

import { Link } from 'react-router-dom'

import './SearchForm.css'
import { AppActions } from "../../reducers/app"
import YearOption from './YearOption'
import GenreOption from './GenreOption'


class SearchForm extends Component {
  constructor(props) {
    super(props);
    autoBind(this)
  }

  _handleSubmit(e) {
    e.preventDefault()
    this.props.searchChange(e.target.search.value)
    this.props.movieListRequest()
  }

    _handleGenreChange(e){
      this.props.genreChange(e.target.value)
      this.props.movieListRequest()
    }

    _handleYearChange(e){
      this.props.yearChange(e.target.value)
      this.props.movieListRequest()
    }

    _handleSortChange(e){
      this.props.sortChange(e.target.value)
      this.props.movieListRequest()
    }

    render() {
      const genreList = ["드라마", "판타지", "서부", "공포", "멜로/로맨스", "모험",
      "스릴러", "느와르", "컬트", "다큐멘터리", "코미디", "가족", "미스터리",
      "전쟁", "애니메이션", "범죄", "뮤지컬", "SF", "액션", "무협", "에로",
      "서스팬스", "서사", "블랙코미디", "실험", "공연실황"]

      const startYear = 1990
      const thisYear = 2019
      const YearArray = []
      for(let year = thisYear; year >= startYear; year--){
        YearArray.push(year)
      }
      const yearOptions = YearArray.map(
        (year) => (
          <YearOption year={year}/>
        )
      )
      const genreOptions = genreList.map(
        (genre) => (
          <GenreOption genre={genre}/>
        )
      )
      console.log(this)
      return(
      <Container fluid>
        <Form onSubmit={this._handleSubmit}>
          <Row>
            <Col md="1">
            </Col>
            <Col md="2">
              <p className="logo">
                Movie List
                  </p>
            </Col>
            <Col md="1">
              <CustomInput type="select" id="genre" name="genre" style={{ border: "2px solid pink", backgroundColor: "pink", color: "white" }} onChange={this._handleSortChange}>
                <option value="-rate">평점 순</option>
                <option value="rate">평점 역순</option>
                <option value="releaseDate">개봉 순</option>
                <option value="-releaseDate">개봉 역순</option>
                <option value="title">제목 순</option>
                <option value="-title">제목 역순</option>
              </CustomInput>
            </Col>
            <Col md="4">
              <InputGroup>
                <Input name="search" style={{ border: "2px solid pink" }} />
                <InputGroupAddon addonType="append">
                  <Button style={{ backgroundColor: "pink", borderColor: "pink" }}>Search</Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
            <Col md="1">
              <CustomInput type="select" id="genre" name="genre" style={{ border: "2px solid pink", backgroundColor: "pink", color: "white" }} onChange={this._handleGenreChange}>
                <option value="">전체 장르</option>
                {genreOptions}
              </CustomInput>
            </Col>
            <Col md="1">
              <CustomInput type="select" id="year" name="year" style={{ border: "2px solid pink", backgroundColor: "pink", color: "white" }} onChange={this._handleYearChange}>
                <option value="">개봉 년도</option>
                {yearOptions}
              </CustomInput>
            </Col>
            <Col md="1">
              <Link to="/chart">
                <Button style={{ border: "2px solid pink", backgroundColor: "pink", color: "white" }}>
                  통계 보기
                      </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  movies: state.app.movieList.data
})

const mapDispatchToProps = {
  sortChange: AppActions.sortChange,
  genreChange: AppActions.genreChange,
  yearChange: AppActions.yearChange,
  searchChange: AppActions.searchChange,
  movieListRequest: AppActions.movieListRequest,
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
