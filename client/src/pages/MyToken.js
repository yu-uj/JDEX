import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';

const Caver = require('caver-js');
const caver = new Caver(new Caver.providers.WebsocketProvider("wss://public-node-api.klaytnapi.com/v1/baobab/ws"));
const KIP7ABI = require('../contract/KIP7.json');

function MyToken() {
  // 수정
  const [currentTokenAddress, setCurrentTokenAddress] = useState("");

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  // 수정
  const handleShow = (el) => {
    setCurrentTokenAddress(el.token_address);
    setShow(true);
  };
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [Toaddress, setToAddress] = useState(""); // 받는 사람 주소
  const [amount, setAmount] = useState(""); // 전송할 토큰 양

  const address = useSelector(state => state.counter);

  const [tokendata, settokendata] = useState([{ token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1' }]);

  const [balance, setbalance] = useState("");
  const [KIP7bal, setKIP7bal] = useState("");
  // let checksum_address = caver.utils.toChecksumAddress('0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1');
  const dummydata = {
    token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1'
  }
  const handleInput1 = (e) => { setToAddress(e.target.value); };
  const handleInput2 = (e) => { setAmount(e.target.value) };

  const handleTransfer = () => {
    const contract = new window.caver.klay.Contract(KIP7ABI, currentTokenAddress); // abi, contract 주소 
    const transfer = contract.methods.transfer(Toaddress, caver.utils.toPeb(amount, 'KLAY')).send(
      {
        from: window.klaytn.selectedAddress,
        gas: 8000000
      });
    // console.log(transfer);
    setShow(false); // 모달 창 닫기
  }
  const handleTransfer1 = () => {
    window.caver.klay
      .sendTransaction({
        type: 'VALUE_TRANSFER',
        from: address.number, // 내 주소
        to: Toaddress, // 관리자 공개키 
        value: caver.utils.toPeb(amount, 'KLAY'),
        gas: 8000000
      })
      .once('transactionHash', transactionHash => {
      })
      .once('receipt', receipt => {
        const recipientAddress = receipt.from;
      })
      .once('error', error => {
        alert('취소되었습니다.')
      })
    setShow(false); // 모달 창 닫기
  }


  const [TokenList, setTokenList] = useState([dummydata]);
  const getTokenLists = async () => {
    await axios.get(`http://localhost:4000/mytoken/`)
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

  // 수정
  const Token_List = async (list) => {
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
        token_price: "가격",
        token_address: el.token_address,
      };
      arr.push(obj);
    }
    settokendata(arr);
  };

  //console.log(tokendata)

  const klaybalance = async () => {
    let bal = await caver.klay.getBalance(address.number);
    let a = await caver.utils.fromPeb(bal, "KLAY");
    console.log(a);
    setbalance(a);
  };

  const KIP7balance = async () => {
    const KIP7Contract = await new caver.klay.Contract(KIP7ABI, tokendata[2].token_address);
    let bal = await KIP7Contract.methods.balanceOf(address.number).call();
    let a = await caver.utils.fromPeb(bal, "KLAY");
    setKIP7bal(a);
  };

  useEffect(() => {
    klaybalance();
    KIP7balance();
    Token_List(TokenList);
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
            <Col xs={4} sm={1}><Button variant="primary" onClick={handleShow1}>Transfer
            </Button>
            </Col>
          </Row>
        </ListGroup.Item>
        {tokendata.map((el) => (
          <ListGroup.Item as="li">
            <Row>
              <Col xs={8} sm={5}>{el.token_name}</Col>
              <Col xs={4} sm={3}>{el.token_amount}</Col>
              <Col xs={4} sm={2}>{el.token_price}</Col>
              <Col xs={4} sm={1}>
                <Button variant="primary" onClick={() => handleShow(el)}>Transfer
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
              <Form.Label>토큰 트랜잭션 주소</Form.Label>
              <Form.Control
                placeholder={currentTokenAddress}
                autoFocus
                onChange={(e) => handleInput1(e)}
              />
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

      <Modal show={show1} onHide={handleClose1}>
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
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTransfer1}>
            토큰 전송
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default MyToken;