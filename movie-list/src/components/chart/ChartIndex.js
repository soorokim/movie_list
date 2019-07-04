import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
import autoBind from 'react-autobind'

import { AppActions } from "../../reducers/app"
import ReactEcharts from 'echarts-for-react'

class Detail extends Component {
    constructor(props){
      super(props);
      autoBind(this)
    }

    componentDidMount() {
      this.props.chartRequest()
    }

    onChartClick = (param, echarts) => {
      this.props.detailChartRequest(param.name)
    }
    render() {
      let onEvents = {
        'click': this.onChartClick
      }

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
            <Col md="12">
            <ReactEcharts option={this.props.chartOption? this.props.chartOption:{}}
            onEvents={onEvents}/>
          </Col>
          </Row>
          <Row>
            <Col md="6">
            <ReactEcharts  style={{height:'600px'}} ref={(e) => {this.echarts_react=e;}} option={this.props.monthlyChart? this.props.monthlyChart:{}}
            />
          </Col>
            <Col md="6">
            <ReactEcharts style={{height:'600px'}} ref={(e) => {this.echarts_react=e;}} option={this.props.genreChart? this.props.genreChart:{}}
            />
          </Col>
          </Row>
        </Container>
      )
    }
}

const mapStateToProps = (state, ownProps) => ({
  chartOption: state.app.chartOption.data,
  select: state.app.detailChart.select,
  monthlyChart: state.app.detailChart.monthlyChart,
  genreChart: state.app.detailChart.genreChart,
})

const mapDispatchToProps = {
  chartRequest: AppActions.chartRequest,
  detailChartRequest: AppActions.detailChartRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
