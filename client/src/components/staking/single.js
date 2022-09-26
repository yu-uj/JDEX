import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Create from "./create";
import '../../assets/css/Page.css';

// const Caver = require('caver-js');
// const caver = new Caver(new Caver.providers.WebsocketProvider("wss://public-node-api.klaytnapi.com/v1/baobab/ws"));
// const KIP7ABI = require('../../contract/build/contracts/KIP7.json');

function Single() {
    const [depo, setDeposit] = useState(false);
    const [widr, setWithdraw] = useState(false);

    const depositShow = () => setDeposit(true);
	const depositClose = () => setDeposit(false);

    const withdrawShow = () => setWithdraw(true);
	const withdrawClose = () => setWithdraw(false);

    const dummydata = {
        token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1'
    }

    // 싱글풀 조회
    // const [SingleData, setSingleData] = useState([{ token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1' }])
    const [tokendata, settokendata] = useState([{ token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1' }]);
    const [SinglePool, setSinglePool] = useState([dummydata]);
    const getSinglePool = async () => {
        await axios.get(`http://localhost:4000/staking/singlepool/`)
        .then((res) => {
            // console.log(res);
            setSinglePool(() => {
            return res.data['data']
            })
        })
    };

    useEffect(() => {
        getSinglePool();
    }, []);
    // console.log(SinglePool);

    const Single_Pool = (list) => {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          let el = list[i];
            // console.log(el.token_address)
          let obj = {
            token_name: el.token_name,
            token_address: el.token_address, 
            token_symbol: el.token_symbol,
            token_amount: '토큰 수량',
            token_price: "가격",
          }
          arr.push(obj);
        }
        // return arr;
        // setSingleData(arr);
        settokendata(arr);
    }
    useEffect(() => {
        Single_Pool(SinglePool);
    }, [SinglePool])
    // const data = Single_Pool(SinglePool);
    // console.log(Single_Pool(SinglePool));
    // console.log(data[0].token_name);
    // console.log(el.token_name);
      
    return (
        <div className="Pool">
            <div className="pageInfo">
                <h2>Single Pool List</h2>
                <p>KLAY와 KIP7 토큰의 <b>싱글 풀</b> 목록을 확인하고, <br/> 원하는 풀에 <b>예치</b> 및 <b>출금</b> 할 수 있습니다.</p>
            </div>
            <br/>
            <Row className="g-4">
            {Array.from({ length: 1 }).map((_, idx) => (
                <Col xs={18} md={12}>
                {tokendata.map((el) => (
                <Card
                bg={'Secondary'}
                key={'Secondary'}
                text={'dark'}
                border={'Secondary'}
                className="mb-4" 
                >
                    <Card.Body>
                    <Card.Title>{el.token_name}</Card.Title>
                    <Card.Text>
                        <p>총 예치규모</p>
                        <p>내 보유량</p>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <>
                            <Button variant="primary" onClick={depositShow} >Deposit</Button>
                            <Modal
                                size="lg"
                                show={depo}
                                onHide={depositClose}
                                backdrop="static"
                                keyboard={false}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                <Modal.Header closeButton>
                                {/* 선택한 카드의 풀 이름과 맵핑 */}
                                <Modal.Title>{el.token_name} Deposit</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>  
                                        <h5>내 예치 자산</h5>
                                        <strong>0{/*[예치한토큰갯수]*/}</strong>
                                        <span>{el.token_symbol}</span>
                                        <br/>
                                        <br/>                         
                                        <h5>내 지분</h5>
                                        <strong>[보유지분율]</strong>
                                        <span>%</span>
                                        <br/>
                                        <br/> 
                                    </div>
                                    <Form>
                                        {/* Deposit Input  */}
                                        {/* 토큰 이름, 심볼, 매핑 필요  */}
                                        <Form.Label>{el.token_name}</Form.Label> 
                                        <InputGroup className="mb-3">
                                            <Form.Control 
                                                type="text"
                                                placeholder="예치할 토큰 수량"
                                                autoFocus
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default"
                                            />
                                            <InputGroup.Text id="inputGroup-sizing-default">KLAY{el.token_symbol}</InputGroup.Text>
                                        </InputGroup>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={depositClose}>
                                    취소
                                </Button>
                                <Button type="submit" variant="primary">확인</Button>
                                </Modal.Footer>
                            </Modal>

                            <Button variant="primary" onClick={withdrawShow}>Withdraw</Button>
                            <Modal
                                size="lg"
                                show={widr}
                                onHide={withdrawClose}
                                backdrop="static"
                                keyboard={false}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                <Modal.Header closeButton>
                                {/* 선택한 카드의 풀 이름과 맵핑 */}
                                <Modal.Title>{el.token_name} Withdraw</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>  
                                        <h5>내 예치 자산</h5>
                                        <strong>0{/*[예치한토큰갯수]*/}</strong>
                                        <span>{el.token_symbol}</span>
                                        <br/>
                                        <br/>                         
                                        <h5>내 지분</h5>
                                        <strong>[보유지분율]</strong>
                                        <span>%</span>
                                        <br/>
                                        <br/> 
                                    </div>
                                    <Form>
                                        {/* Withdraw Input  */}
                                        {/* 토큰 이름, 심볼, 매핑 필요  */}
                                        <Form.Label>{el.token_name}</Form.Label> 
                                        <InputGroup className="mb-3">
                                            <Form.Control 
                                                type="text"
                                                placeholder="출금할 토큰 수량"
                                                autoFocus
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default"
                                            />
                                            <InputGroup.Text id="inputGroup-sizing-default">KLAY{el.token_symbol}</InputGroup.Text>
                                        </InputGroup>
                                    </Form>
                                </Modal.Body>

                                <Modal.Footer>
                                <Button variant="secondary" onClick={withdrawClose}>
                                    취소
                                </Button>
                                <Button type="submit" variant="primary">확인</Button>
                                </Modal.Footer>
                            </Modal>      
                        </>
                    </Card.Footer>
                </Card>
                ))}
                
                </Col>
            ))}
            </Row>

            <Create />

        </div>
    );
}
  
export default Single;