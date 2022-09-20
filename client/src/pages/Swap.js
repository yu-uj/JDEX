import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../assets/css/Swap.css';
import { Modal, Button, Container, Row, Col, Form, ButtonGroup } from 'react-bootstrap';


const Caver = require('caver-js');
const caver = new Caver(new Caver.providers.WebsocketProvider("wss://public-node-api.klaytnapi.com/v1/baobab/ws"));
const KIP7ABI = require('../build/contracts/KIP7.json');

const Swap = ({form, former, children, todo, todoo, teacher}) => {
  const [show, setShow] = useState(false);
	const [create, setCreate] = useState(false);
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 
	
	const handleCreate = () => setCreate(true);
	const createClose = () => setCreate(false);

  const address = useSelector(state => state.counter);

  const dummydata = {
    token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1'
  }

  const [swapData, setSwapData] = useState([{ token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1' }]);
  
  const [SwapToken, setSwapToken] = useState([dummydata]);
  const getSwapToken = async () => {
    await axios.get(`http://localhost:4000/mytoken/`)
      .then((res) => {
        console.log(res);
        setSwapToken(() => {
          return res.data['data']
        })
      })
  };

  useEffect(() => {
    getSwapToken();
  }, []);

  const Swap_Token = async (list) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      let el = list[i];

      const KIP7Contract = await new caver.klay.Contract(
        KIP7ABI,
        el.token_address
      );
      let bal = await KIP7Contract.methods.balanceOf(address.number).call();
      let amount = await caver.utils.fromPeb(bal, "KLAY");

      let obj = {
        token_name: el.token_name,
        token_amount: amount,
        token_symbol: el.token_symbol,
        token_price: "가격",
        token_address: el.token_address,
      };
      arr.push(obj);
    }
    setSwapData(arr);
  };

  useEffect(() => {
    Swap_Token(SwapToken);
  }, [SwapToken])

  const options1 = swapData.map((el) => {
    return <option value={el.token_name} key={el.token_name}>{el.token_name}</option>;
    
  });

  const options2 = swapData.map((el) => {
    return <option value={el.token_name} key={el.token_name}>{el.token_name}</option>;
  });

  const handleSwap1 = (e) => {
    setChoice1(e.target.value);
  };

  const handleSwap2 = (e) => {
    setChoice2(e.target.value);
  };
  // console.log(choice);
  // console.log(choice == el.token_name ? :);


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
           
          <Row>
            <Col sm={4}>
            <>
            <Form>
              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <strong><Form.Label>Token Select</Form.Label></strong>
              <Form.Select onChange={handleSwap1} value={choice1}>
                {options1}
              </Form.Select>
              </Form.Group>
            </Form>
            </>
            </Col>
          <Col className="about" sm={8}>
            <h3><input className="number" placeholder="토큰 수량" onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
              }
              }}
              /></h3>
            </Col>
          </Row>
          
          <br/>
          <Row>
            <Col sm={4}>잔액 </Col>
            <Col className="about" sm={8}>약$0.0000</Col>
          </Row>
        </Container>
      </section>

      <section className="todoo-wrapper">
        {todoo} 
        <Button><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
        </svg>
        </Button>
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
                <Form.Select onChange={handleSwap2} value={choice2}>
                  {options2}
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
      /></h3>
      <h3>{choice2}</h3>
      </Col>
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