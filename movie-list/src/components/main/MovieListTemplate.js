import React from 'react'
import { Container, Row, Col} from 'reactstrap'

const MovieListTemplate = ({form, children}) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <section className="form-wrapper">
            {form}
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <section className="movies-wrapper">
            {children}
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default MovieListTemplate
