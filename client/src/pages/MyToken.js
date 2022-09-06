import { Row, Col, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

function MyToken() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTransfer = () => {
    const req_body = {
      send_address: "",
      receive_address: "",
      token_amount: ""
    }
    // 서버로 토큰 transfer하는 요청 전송
    axios.post(`http://localhost:4000/mytoken/token_transfer`)
      .then((res) => {
        console.log(res);
        setTokenList(res.data['data']);
      })
    setShow(false); // 모달 창 닫기
  }


  const Token_List = (list) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      let el = list[i];
      let obj = {
        token_name: el.token_name,
        token_amount: 'data에서 token address 받아 getbalance함수로 불러오기',
        token_price: '토큰가격 어떻게 정할지 생각',
      }
      arr.push(obj);
    }
    return arr;
  }


  const [TokenList, setTokenList] = useState([]);
  const getTokenLists = async () => {
    axios.get(`http://localhost:4000/mytoken/`)
      .then((res) => {
        console.log(res);
        setTokenList(res.data['data']);
      })
  };

  useEffect(() => {
    getTokenLists();
  }, []);

  const data = Token_List(TokenList);

  return (
    <>
      <div>my Token</div>
      <ListGroup as="ul">

        <ListGroup.Item as="li" active>
          <Row>
            <Col xs={8} sm={5}>token_name</Col>
            <Col xs={4} sm={3}>amount</Col>
            <Col xs={4} sm={2}>price</Col>
            <Col xs={4} sm={1}>transfer
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          {data.map((el) => (
            <Row>
              <Col xs={8} sm={5}>{el.token_name}</Col>
              <Col xs={4} sm={3}>{el.token_amount}</Col>
              <Col xs={4} sm={2}>{el.token_price}</Col>
              <Col xs={4} sm={1}>
                <Button variant="primary" onClick={handleShow}>Transfer
                </Button>
              </Col>
            </Row>
          ))
          }
        </ListGroup.Item>
      </ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Token Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>받는 사람 주소</Form.Label>
              <Form.Control
                placeholder="0x..."
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>보낼 수량</Form.Label>
              <Form.Control as="textarea" rows={1} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTransfer}>
            토큰 전송
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default MyToken;