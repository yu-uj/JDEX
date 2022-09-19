import { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';

const Caver = require('caver-js');
const caver = new Caver(new Caver.providers.WebsocketProvider("wss://public-node-api.klaytnapi.com/v1/baobab/ws"));


function Token(data) {

    const [balance, setbalance] = useState("");
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const address = useSelector(state => state.counter);

    console.log(data.address[0]);
    // const klaybalance = async () => {  
    //     bal = await caver.klay.getBalance(address);
    //     // a = await caver.utils.fromPeb(bal, "KLAY");
    //     return bal;
    // }

    return (
    <ListGroup.Item as="li">
    <Row>
            <Col xs={8} sm={5}>klay</Col>
            <Col xs={4} sm={3}>hi</Col>
            <Col xs={4} sm={2}>price</Col>
            <Col xs={4} sm={1}><Button variant="primary" onClick={handleShow}>Transfer
                </Button>
            </Col>
    </Row>
    </ListGroup.Item>
    );
}

export default Token;