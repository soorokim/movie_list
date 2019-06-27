import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';


class Detail extends Component {
    render() {
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
              <h1>Chart Page</h1>
            </Col>
          </Row>
        </Container>
      )
    }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
