import React from 'react'
import '../assets/css/Swap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';




const Swap = ({form, former, children, todo, todoo, teacher}) => {
  return (
<main className="box-model">
    
      <div className="title">
        스왑
      </div>

      <section className="former-wrapper">
        {former}
        <Container>
        <Row>
        <Col sm={7}>제공</Col>
        <Col sm={5}><ButtonGroup size="sm">
        <Button>25%</Button>
        <Button>50%</Button>
        <Button>75%</Button>
        <Button>최대치</Button>  
      </ButtonGroup></Col>
      </Row>
      </Container>
      </section>

      <section className="form-wrapper">
        {form}    
    <Container className="form-wrap">
        <p>
      <Row>
        <Col sm={9}><Button variant="primary">토큰</Button>{' '}</Col>
        <Col sm={3}><h3>개수</h3></Col>
      </Row>
      </p>
      <Row>
        <Col sm={9}>잔액0.0000</Col>
        <Col sm={3}>약$0.0000</Col>
      </Row>
    </Container>
      </section>

      <section className="todoo-wrapper">
        {todoo} 
       화살표버튼
      </section>

      <section className="todo-wrapper">
        {todo}
        <Container>
        <Row>
        <Col sm={8}>수령</Col>
        <Col sm={4}>
        <Form>
        {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="수수료포함"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
              </div>))}
            </Form>
        </Col>
      </Row>
      </Container>     
    
      </section>

      <section className="todos-wrapper">
        { children }
        <Container className="todos-wrap">
            <p>
      <Row>
        <Col sm={9}><Button variant="primary">토큰</Button>{' '}</Col>
        <Col sm={3}><h3>개수</h3></Col>
      </Row>
      </p>
      
      <Row>
        <Col sm={9}>잔액0.0000</Col>
        <Col sm={3}>약$0.0000</Col>
      </Row>
      
    </Container>
      </section>

      <section className="button-wrapper">
        {teacher}
        <div className="d-grid gap-2">
      <Button variant="primary" size="lg">
        지갑 연결   
      </Button>
        </div>
        </section>
        
    </main>
  )
}

export default Swap
