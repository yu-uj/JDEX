import React, { useState } from 'react';
import '../assets/css/Swap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';




const Swap = ({form, former, children, todo, todoo, teacher}) => {
  const [show, setShow] = useState(false);
	const [create, setCreate] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true); 
	
	const handleCreate = () => setCreate(true);
	const createClose = () => setCreate(false);

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
        <Col sm={4}>
        <>
      <Button variant="primary" onClick={handleCreate}>
        토큰
      </Button>
      <Modal show={create} onHide={createClose}>
        <Modal.Header closeButton>
          <Modal.Title>제공</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
           <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
           <p><Form.Label>Token Select</Form.Label></p>
           <Form.Select >
												<option>Token 1</option>
												<option>Token 2</option>
                        <option>Token 3</option>
                        <option>Token 4</option>
						</Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={createClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
</Col>
        <Col className="about" sm={8}><h3><input className="number"
      onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
    /></h3></Col>
      </Row>
      </p>
      <Row>
        <Col sm={4}>잔액0.0000</Col>
        <Col className="about" sm={8}>약$0.0000</Col>
      </Row>
    </Container>
      </section>

      <section className="todoo-wrapper">
        {todoo} 
        <Button><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg></Button>
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
        <Col sm={4}>
          <>
      <Button variant="primary" onClick={handleShow}>
        토큰
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>수령</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <p><Form.Label>Token Select</Form.Label></p>
              <Form.Select >
												<option>Token 1</option>
												<option>Token 2</option>
                        <option>Token 3</option>
                        <option>Token 4</option>
						</Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </></Col>
    <Col className="about" sm={8}><h3><input className="number"
      onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
    /></h3></Col>
      </Row>
      </p>
      
      <Row>
        <Col sm={4}>잔액0.0000</Col>
        <Col className="about" sm={8}>약$0.0000</Col>
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