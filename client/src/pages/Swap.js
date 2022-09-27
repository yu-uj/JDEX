import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../assets/css/Swap.css";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
} from "react-bootstrap";

const Caver = require("caver-js");
const caver = new Caver(window.klaytn);

const KIP7ABI = require("../contract/KIP7.json");
const DexRouterabi = require('../contract/router.json');

const RouterAddress = '0x63e3cB8C959068DD947c3FadF7455044B5C36b8f';

const DexRouterContract = new caver.klay.Contract(DexRouterabi, RouterAddress);

const Swap = ({ form, former, children, todo, todoo, teacher }) => {
  const [show, setShow] = useState(false);
  const [create, setCreate] = useState(false);

  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");

  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");

  const [tokenAddress1, setTokenAddress1] = useState("");
  const [tokenAddress2, setTokenAddress2] = useState("");

  const [amount, setAmount] = useState("");

  const [tokenAmount1, setTokenAmount1] = useState("");
  const [tokenAmount2, setTokenAmount2] = useState("");

  const [save, setSave] = useState("");

  const address = useSelector((state) => state.counter);
  const deadline = parseInt(''+new Date().getTime() / 1000) + 100000;

  // const handleInput = async (e) => {
  //   setAmount(e.target.value);

  //   const a = await DexRouterContract.methods.getAmountsOut(caver.utils.toPeb(e.target.value, "KLAY"), [
  //     tokenAddress1,
  //     tokenAddress2,
  //   ]).call();

  //   setSave(caver.utils.fromPeb(a[1], "KLAY"));

  //   console.log(save);
  // };

  const GetAmountsOut = async () => {
      const a = await DexRouterContract.methods.getAmountsOut(caver.utils.toPeb(amount, "KLAY"), [
      tokenAddress1,
      tokenAddress2,
    ]).call();

    setSave(caver.utils.fromPeb(a[1], "KLAY"));
  }
  useEffect(() => {
    GetAmountsOut();
  }, [amount]);
 
  const handleCreate = () => setCreate(true);

  const createClose = ({ isSave }) => {
    if (isSave) {
      setChoice1(selected1);
    }
    setCreate(false);
  };

  const handleShow = () => setShow(true);

  const handleClose = ({ isSave }) => {
    if (isSave) {
      setChoice2(selected2);
    }
    setShow(false);
  };


  const dummydata = {
    token_address: "0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1",
  };

  const getToken1 = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    const Tokenbalance1 = await kip7.balanceOf(address.number); // 내 주소가 갖고 있는 그 토큰의 잔액
    console.log(caver.utils.fromPeb(Tokenbalance1));
    setTokenAmount1(caver.utils.fromPeb(Tokenbalance1)) //-> 예시로 usestate사용해 토큰 잔액 넣고 불러와서 사용하면 될듯 
  }

  const getToken2 = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress2);
    const Tokenbalance2 = await kip7.balanceOf(address.number); // 내 주소가 갖고 있는 그 토큰의 잔액
    console.log(caver.utils.fromPeb(Tokenbalance2));
    setTokenAmount2(caver.utils.fromPeb(Tokenbalance2)) //-> 예시로 usestate사용해 토큰 잔액 넣고 불러와서 사용하면 될듯 
  }

  const swap = async () => {

    const kip7 = new caver.klay.KIP7(tokenAddress1);

    const allowed = await kip7.allowance(address.number, RouterAddress);
    if (allowed<= tokenAmount1) {
      try {
        await kip7.approve(RouterAddress, caver.utils.toPeb("100000000"), {
          from: address.number,
          gas: 2000000,
        });
      } catch (err) {
        console.log(err);
      }
    }
    let a = await DexRouterContract.methods.swapExactTokensForTokens(caver.utils.toPeb(amount, "KLAY"), 0, [tokenAddress1,tokenAddress2],address.number,deadline).send(
      {
        from: address.number,
        gas: 200000000 
      });
    console.log(a);
  };

  const [swapData, setSwapData] = useState([
    { token_address: "0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1" },
  ]);

  const [SwapToken, setSwapToken] = useState([dummydata]);
  const getSwapToken = async () => {
    await axios.get(`http://localhost:4000/mytoken/`).then((res) => {
      console.log(res);
      setSwapToken(() => {
        return res.data["data"];
      });
    });
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
  }, [SwapToken]);

  useEffect(() => {
    getToken1();
    GetAmountsOut();
  }, [tokenAddress1])

  useEffect(() => {
    getToken2();
    GetAmountsOut();
  }, [tokenAddress2])

  const options1 = swapData.map((el) => {
    return (
      <option value={el.token_name} key={el.token_name}>
        {el.token_name}
      </option>
    );
  });

  const options2 = swapData.map((el) => {
    return (
      <option value={el.token_name} key={el.token_name}>
        {el.token_name}
      </option>
    );
  });

  const handleSwap1 = (e) => {
    setSelected1(e.target.value);
  };

  const handleSwap2 = (e) => {
    setSelected2(e.target.value);
  };

  useEffect(() => {
    const targetToken1 = SwapToken.find((el) => el.token_name === choice1);
    setTokenAddress1(targetToken1?.token_address);
  }, [choice1]);
  useEffect(() => {
    const targetToken2 = SwapToken.find((el) => el.token_name === choice2);
    setTokenAddress2(targetToken2?.token_address);
  }, [choice2]);
  
  const handleInputquarter = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    setAmount(Number(caver.utils.fromPeb(await kip7.balanceOf(address.number)) / 4).toFixed(3))
  }
  const handleInputhalf = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    setAmount(Number(caver.utils.fromPeb(await kip7.balanceOf(address.number)) / 2).toFixed(3))
  }
  const handleInputthreequarters = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    setAmount(Number(caver.utils.fromPeb(await kip7.balanceOf(address.number)) *3 /4).toFixed(3))
  }
  const handleInputMax = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    setAmount(Number(caver.utils.fromPeb(await kip7.balanceOf(address.number))).toFixed(3))
  }


  return (
    <div>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
        <div className="swapPageInfo">
				<h2>Token Swap</h2>
          <p>보유하고 있는 <b>JDEX 토큰</b>과 <b>KIP7 토큰</b>을 <br /> 원하는 다른 토큰과 <b>스왑</b> 할 수 있습니다.</p>
        </div>
        </Col>
        <Col sm={3}></Col>
      </Row>
      <div className="box-model">
        <div className="former-wrapper">
          {former}
          <Container>
            <Row className="g-4">
              <Col sm={6}><h4>제공</h4></Col>
              <Col sm={6}>
                <ButtonGroup>
                <Button onClick={handleInputquarter}>25%</Button>
                <Button onClick={handleInputhalf}>50%</Button>
                <Button onClick={handleInputthreequarters}>75%</Button>
                <Button onClick={handleInputMax}>최대치</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </div>

        <section className="form-wrapper">
          {form}
          <Container className="form-wrap">

            <Row>
              <Col sm={8}>
                <>
                  <Button variant="primary" onClick={handleCreate}>
                    토큰
                  </Button>

                  <Modal
                    show={create}
                    onHide={() => createClose({ isSave: false })}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>제공 토큰</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group
                          className="mb-1"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label><h5>Token Select</h5></Form.Label>
                          <Form.Select onChange={handleSwap1} value={selected1}>
                            <option value="">---토큰 선택---</option>
                            {options1}
                          </Form.Select>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => createClose({ isSave: false })}
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => createClose({ isSave: true })}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </Col>
              <Col sm={4}>
                <h3 className="about">{choice1}</h3>
              </Col>
            </Row>
            <Row>
              <Col className="about" sm={12}>
                <h3>
                  <input
                    className="number"
                    onChange={(e) => setAmount(e.target.value)}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    value={(amount)}
                  />
                </h3>
              </Col>
            </Row>


            <Row>
              <Col className="swapInfo" sm={4}><h6>잔액</h6></Col>
              <Col className="about" sm={8}>
              {Number(tokenAmount1).toFixed(3)}
              </Col>
            </Row>
          </Container>
        </section>

        <section className="todoo-wrapper">
          {todoo}
          <Button variant="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
            </svg>
          </Button>
        </section>

        <section className="todo-wrapper">
          {todo}
          <Container>
            <Row>
              <Col sm={8}><h4>수령</h4></Col>
              <Col sm={4}>
                <Form>
                  {["checkbox"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="수수료포함"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                    </div>
                  ))}
                </Form>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="todos-wrapper">
          {children}
          <Container className="todos-wrap">

            <Row>
              <Col sm={8}>
                <>
                  <Button variant="primary" onClick={handleShow}>
                    토큰
                  </Button>

                  <Modal
                    show={show}
                    onHide={() => handleClose({ isSave: false })}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>수령 토큰</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <p>
                            <Form.Label><h5>Token Select</h5></Form.Label>
                          </p>
                          <Form.Select onChange={handleSwap2} value={selected2}>
                            <option value="">---토큰 선택---</option>
                            {options2}
                          </Form.Select>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => handleClose({ isSave: false })}
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleClose({ isSave: true })}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </Col>
              <Col sm={4}>
                <h3 className="about">{choice2}</h3>
              </Col>

            </Row>
            <Row>

              <Col className="about" sm={12}>
                <h3>
                  <input
                    className="number"
                    value={Number(save).toFixed(5)}
                    placeholder="0.0000"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                </h3>
              </Col>
            </Row>

            <Row>
            <Col className="swapInfo" sm={4}><h6>잔액</h6></Col>
              <Col className="about" sm={8}>
              {Number(tokenAmount2).toFixed(3)}
              </Col>
            </Row>
          </Container>
        </section>

        <div className="button-wrapper">
          {teacher}
          <br/>
          <div className="d-grid gap-2">
            <Button variant="dark" size="lg" onClick={swap}>
              Swap
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Swap;