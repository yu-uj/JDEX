import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Token_List = (list) => {
  let arr = [];
  for(let i =0; i < list.length; i++) {
    let el = list[i];
    let obj = {
      token_name: el.token_name,
      token_amount: 'balanceof함수로 불러오기',
      token_price: '토큰가격',
    }
    arr.push(obj);
  }
    return arr;
}
const MyToken = () => {

  const [TokenList, setTokenList] = useState([]);
  const getTokenLists = async () => {
    axios.get(`http://localhost:4000/mytoken/gettoken`)
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
    <div>My Token</div>

          <Row>
            <Col xs={8} sm={5}>token_name</Col>
            <Col xs={4} sm={3}>amount</Col>
            <Col xs={4} sm={2}>price</Col>
            <Col xs={4} sm={1}>transfer</Col>
          </Row>
          {data.map((el) => (
            <Row>
            <Col xs={8} sm={5}>{el.token_name}</Col>
            <Col xs={4} sm={3}>{el.token_amount}</Col>
            <Col xs={4} sm={2}>{el.token_price}</Col>
            <Col xs={4} sm={1}>
                <Button>transfer</Button>
            </Col>
            </Row>
          ))
          }
    </>
  );
};

export default MyToken;