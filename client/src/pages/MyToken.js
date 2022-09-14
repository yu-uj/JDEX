import { Row, Col, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';
import Token from '../components/mytoken/token'

const Caver = require('caver-js');
const caver = new Caver(new Caver.providers.WebsocketProvider("wss://public-node-api.klaytnapi.com/v1/baobab/ws"));
const KIP7ABI = require('../contract/build/contracts/KIP7.json');

function MyToken() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Toaddress, setToAddress] = useState(""); // 받는 사람 주소
  const [amount, setAmount] = useState(""); // 전송할 토큰 양
  // console.log(Toaddress);
  // console.log(amount);
  let Amount = amount // amount * token_decimal,
  const address = useSelector(state => state.counter);
  // console.log(address.number);
  const [balance, setbalance] = useState("");
  const [KIP7bal, setKIP7bal] = useState("");

  const dummydata = {
    token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1'
  }


  const handleTransfer = () => {
    const req_body = {
      sender_address: address.number, // kaikas 연결된 지갑 주소?
      recipient_address: Toaddress,
      token_amount: Amount
    }
    console.log(req_body);
    // 서버로 토큰 transfer하는 요청 전송
    axios.post(`http://localhost:4000/mytoken/token_transfer`, req_body)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.alert("토큰 전송 완료!");
          window.location.reload();
        }
        else {
          window.alert("토큰 전송 실패!");
          window.location.reload();
        }
      })
    setShow(false); // 모달 창 닫기
  }

  const [TokenList, setTokenList] = useState([dummydata]);
  const getTokenLists = () => {
    axios.get(`http://localhost:4000/mytoken/`)
      .then((res) => {
        console.log(res);
        setTokenList(() => {
          return res.data['data']
        })
      })
  };

  useEffect(() => {
    getTokenLists();
  }, []);

  const Token_List = (list) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      let el = list[i];
      // const KIP7Contract = new caver.klay.Contract(KIP7ABI, el.token_address);
      // let bal = await KIP7Contract.methods.balanceOf(address.number).call();
      // let a = await caver.utils.fromPeb(bal, "KLAY");
      
      let obj = {
        token_name: el.token_name,
        token_amount: "balanceOf로 불러오기",
        token_price: "가격",
        token_address: el.token_address
      }
      arr.push(obj);
    }
    return arr;
  }
  const data = Token_List(TokenList);

  const handleInput1 = (e) => { setToAddress(e.target.value); };
  const handleInput2 = (e) => { setAmount(e.target.value); };

  useEffect(() => {
    const klaybalance = async () => {
      let bal = await caver.klay.getBalance(address.number);
      let a = await caver.utils.fromPeb(bal, "KLAY");
      console.log(a);
      setbalance(a);
    };
    klaybalance();
  }, [])

  useEffect(() => {
    const KIP7balance = async () => {
      const KIP7Contract = await new caver.klay.Contract(KIP7ABI, data[2].token_address);
      let bal = await KIP7Contract.methods.balanceOf(address.number).call();
      let a = await caver.utils.fromPeb(bal, "KLAY");
      setKIP7bal(a);
    };
    KIP7balance();
  }, [TokenList])
  console.log(KIP7bal)


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
          <Row>
            <Col xs={8} sm={5}>klay</Col>
            <Col xs={4} sm={3}>{balance}</Col>
            <Col xs={4} sm={2}>price</Col>
            <Col xs={4} sm={1}><Button variant="primary" onClick={handleShow}>Transfer
            </Button>
            </Col>
          </Row>
        </ListGroup.Item>
        {data.map((el) => (
          <ListGroup.Item as="li">
            <Row>
              <Col xs={8} sm={5}>{el.token_name}</Col>
              <Col xs={4} sm={3}>{KIP7bal}</Col>
              <Col xs={4} sm={2}>{el.token_price}</Col>
              <Col xs={4} sm={1}>
                <Button variant="primary" onClick={handleShow}>Transfer
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))
        }

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
                onChange={(e) => handleInput1(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>보낼 수량</Form.Label>
              <Form.Control as="textarea" rows={1} onChange={(e) => handleInput2(e)} />
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