import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import '../../assets/css/Staking.css';
import { useSelector } from "react-redux";
import JdFarm_ABI from '../../contract/JdFarm.json';
import YUFarm_ABI from "../../contract/YUFarm.json";
import YKTFarm_ABI from "../../contract/YKTFarm.json";
const Caver = require('caver-js');
const caver = new Caver(window.klaytn);

function Single() {
    const [depo, setDeposit] = useState(false);
    const [widr, setWithdraw] = useState(false);

    const [depo1, setDeposit1] = useState(false);
    const [widr1, setWithdraw1] = useState(false);

    const [depo2, setDeposit2] = useState(false);
    const [widr2, setWithdraw2] = useState(false);

    const depositShow = () => setDeposit(true);
    const depositClose = () => setDeposit(false);

    const depositShow1 = () => setDeposit1(true);
    const depositClose1 = () => setDeposit1(false);

    const depositShow2 = () => setDeposit2(true);
    const depositClose2 = () => setDeposit2(false);

    const withdrawShow = () => setWithdraw(true);
    const withdrawClose = () => setWithdraw(false);

    const withdrawShow1 = () => setWithdraw1(true);
    const withdrawClose1 = () => setWithdraw1(false);

    const withdrawShow2 = () => setWithdraw2(true);
    const withdrawClose2 = () => setWithdraw2(false);

    const JdToken_Address = "0xE807326D86f631495Bb9c1F8888604879c18E5BB";
    const JdFarm_Address = "0xf53aeBC779c9B5Bc981C2A07b25A335C54aae59A";
    const JdFarm_Contract = new caver.klay.Contract(JdFarm_ABI, JdFarm_Address);

    const YUToken_Address = "0xd7877710190E492561F692a08117c63e32cf8ac1";
    const YUFarm_Address = "0x40BA9AE12F82D92A970c9FE3b437dC4eCef4c79b";
    const YUFarm_Contract = new caver.klay.Contract(YUFarm_ABI, YUFarm_Address);

    const YKTToken_Address = "0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d";
    const YKTFarm_Address = "0xcA2d1DB62217Ad30767fAdFDe656A98ABF448A2f";
    const YKTFarm_Contract = new caver.klay.Contract(YKTFarm_ABI, YKTFarm_Address);

    const address = useSelector((state) => state.counter);

    const [amount, setAmount] = useState("");

    const handleInput2 = (e) => { setAmount(e.target.value) };

    const handleTransfer1 = async () => {

        const kip7 = new caver.klay.KIP7(JdToken_Address);

        const allowed = await kip7.allowance(address.number, JdFarm_Address);
        if (allowed.toString() === "0") {
            try {
                await kip7.approve(JdFarm_Address, caver.utils.toPeb("100000000"), {
                    from: address.number,
                });
            } catch (err) {
                console.log(err);
            }
        }
        await JdFarm_Contract.methods.stakeTokens(caver.utils.toPeb(amount))
            .send({ from: address.number, gas: 200000000 });
    };

    const handleTransfer2 = async () => {
        await JdFarm_Contract.methods.unstakeTokens()
            .send({ from: address.number, gas: 200000000 });
    };

    const handleTransfer3 = async () => {

        const kip7 = new caver.klay.KIP7(YUToken_Address);

        const allowed = await kip7.allowance(address.number, YUFarm_Address);
        if (allowed.toString() === "0") {
            try {
                await kip7.approve(YUFarm_Address, caver.utils.toPeb("100000000"), {
                    from: address.number,
                });
            } catch (err) {
                console.log(err);
            }
        }
        await YUFarm_Contract.methods.stakeTokens(caver.utils.toPeb(amount))
            .send({ from: address.number, gas: 200000000 });
    };

    const handleTransfer4 = async () => {
        await YUFarm_Contract.methods.unstakeTokens()
            .send({ from: address.number, gas: 200000000 });
    };

    const handleTransfer5 = async () => {

        const kip7 = new caver.klay.KIP7(YKTToken_Address);

        const allowed = await kip7.allowance(address.number, YKTFarm_Address);
        if (allowed.toString() === "0") {
            try {
                await kip7.approve(YKTFarm_Address, caver.utils.toPeb("100000000"), {
                    from: address.number,
                });
            } catch (err) {
                console.log(err);
            }
        }
        await YKTFarm_Contract.methods.stakeTokens(caver.utils.toPeb(amount))
            .send({ from: address.number, gas: 200000000 });
    };

    const handleTransfer6 = async () => {
        await YKTFarm_Contract.methods.unstakeTokens()
            .send({ from: address.number, gas: 200000000 });
    };

    return (
        <div className='Pool'>
            <h1>Single Pool List</h1>
            <Row xs={1} md={1} className="g-4">
                <Col>

                    <Card
                        bg={'Secondary'}
                        key={'Secondary'}
                        text={'dark'}
                        border={'Secondary'}
                        style={{ width: '50rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title>JdToken</Card.Title>
                            {/* {tokendata.map(el => (
                                        <Card.Title>{el.token_name}</Card.Title>
                                    ))} */}
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
                                        <Modal.Title>JdToken Deposit</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            <h5>내 예치 자산</h5>
                                            <strong>0{/*[예치한토큰갯수]*/}</strong>
                                            <span>JD</span>
                                            <br />
                                            <br />
                                            <h5>내 지분</h5>
                                            <strong>[보유지분율]</strong>
                                            <span>%</span>
                                            <br />
                                            <br />
                                        </div>
                                        <Form>
                                            {/* Deposit Input  */}
                                            {/* 토큰 이름, 심볼, 매핑 필요  */}
                                            <Form.Label>JdToken</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="예치할 토큰 수량"
                                                    autoFocus
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    onChange={(e) => handleInput2(e)}
                                                />
                                                <InputGroup.Text id="inputGroup-sizing-default">JD</InputGroup.Text>
                                            </InputGroup>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={depositClose}>
                                            취소
                                        </Button>
                                        <Button type="submit" variant="primary" onClick={handleTransfer1}>확인</Button>
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
                                        <Modal.Title>JdToken Withdraw</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            <h5>내 예치 자산</h5>
                                            <strong>0{/*[예치한토큰갯수]*/}</strong>
                                            <span>JD</span>
                                            <br />
                                            <br />
                                            <h5>내 지분</h5>
                                            <strong>[보유지분율]</strong>
                                            <span>%</span>
                                            <br />
                                            <br />
                                        </div>
                                        <Form>
                                            {/* Withdraw Input  */}
                                            {/* 토큰 이름, 심볼, 매핑 필요  */}
                                            <Form.Label>JdToken</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="출금할 토큰 수량"
                                                    autoFocus
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    onChange={(e) => handleInput2(e)}
                                                />
                                                <InputGroup.Text id="inputGroup-sizing-default">JD</InputGroup.Text>
                                            </InputGroup>
                                        </Form>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={withdrawClose}>
                                            취소
                                        </Button>
                                        <Button type="submit" variant="primary" onClick={handleTransfer2}>확인</Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            <Row xs={1} md={1} className="g-4">
                <Col>

                    <Card
                        bg={'Secondary'}
                        key={'Secondary'}
                        text={'dark'}
                        border={'Secondary'}
                        style={{ width: '50rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title>YUToken</Card.Title>
                            {/* {tokendata.map(el => (
                                        <Card.Title>{el.token_name}</Card.Title>
                                    ))} */}
                            <Card.Text>
                                <p>총 예치규모</p>
                                <p>내 보유량</p>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <>
                                <Button variant="primary" onClick={depositShow1} >Deposit</Button>
                                <Modal
                                    size="lg"
                                    show={depo1}
                                    onHide={depositClose1}
                                    backdrop="static"
                                    keyboard={false}
                                    aria-labelledby="example-modal-sizes-title-sm"
                                >
                                    <Modal.Header closeButton>
                                        {/* 선택한 카드의 풀 이름과 맵핑 */}
                                        <Modal.Title>YUToken Deposit</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            <h5>내 예치 자산</h5>
                                            <strong>0{/*[예치한토큰갯수]*/}</strong>
                                            <span>YU</span>
                                            <br />
                                            <br />
                                            <h5>내 지분</h5>
                                            <strong>[보유지분율]</strong>
                                            <span>%</span>
                                            <br />
                                            <br />
                                        </div>
                                        <Form>
                                            {/* Deposit Input  */}
                                            {/* 토큰 이름, 심볼, 매핑 필요  */}
                                            <Form.Label>YUToken</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="예치할 토큰 수량"
                                                    autoFocus
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    onChange={(e) => handleInput2(e)}
                                                />
                                                <InputGroup.Text id="inputGroup-sizing-default">YU</InputGroup.Text>
                                            </InputGroup>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={depositClose1}>
                                            취소
                                        </Button>
                                        <Button type="submit" variant="primary" onClick={handleTransfer3}>확인</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Button variant="primary" onClick={withdrawShow1}>Withdraw</Button>
                                <Modal
                                    size="lg"
                                    show={widr1}
                                    onHide={withdrawClose1}
                                    backdrop="static"
                                    keyboard={false}
                                    aria-labelledby="example-modal-sizes-title-sm"
                                >
                                    <Modal.Header closeButton>
                                        {/* 선택한 카드의 풀 이름과 맵핑 */}
                                        <Modal.Title>YUToken Withdraw</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            <h5>내 예치 자산</h5>
                                            <strong>0{/*[예치한토큰갯수]*/}</strong>
                                            <span>YU</span>
                                            <br />
                                            <br />
                                            <h5>내 지분</h5>
                                            <strong>[보유지분율]</strong>
                                            <span>%</span>
                                            <br />
                                            <br />
                                        </div>
                                        <Form>
                                            {/* Withdraw Input  */}
                                            {/* 토큰 이름, 심볼, 매핑 필요  */}
                                            <Form.Label>YUToken</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="출금할 토큰 수량"
                                                    autoFocus
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    onChange={(e) => handleInput2(e)}
                                                />
                                                <InputGroup.Text id="inputGroup-sizing-default">YU</InputGroup.Text>
                                            </InputGroup>
                                        </Form>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={withdrawClose1}>
                                            취소
                                        </Button>
                                        <Button type="submit" variant="primary" onClick={handleTransfer4}>확인</Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            <Row xs={1} md={1} className="g-4">
                <Col>

                    <Card
                        bg={'Secondary'}
                        key={'Secondary'}
                        text={'dark'}
                        border={'Secondary'}
                        style={{ width: '50rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title>YKToken</Card.Title>
                            {/* {tokendata.map(el => (
                                        <Card.Title>{el.token_name}</Card.Title>
                                    ))} */}
                            <Card.Text>
                                <p>총 예치규모</p>
                                <p>내 보유량</p>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <>
                                <Button variant="primary" onClick={depositShow2} >Deposit</Button>
                                <Modal
                                    size="lg"
                                    show={depo2}
                                    onHide={depositClose2}
                                    backdrop="static"
                                    keyboard={false}
                                    aria-labelledby="example-modal-sizes-title-sm"
                                >
                                    <Modal.Header closeButton>
                                        {/* 선택한 카드의 풀 이름과 맵핑 */}
                                        <Modal.Title>YKToken Deposit</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            <h5>내 예치 자산</h5>
                                            <strong>0{/*[예치한토큰갯수]*/}</strong>
                                            <span>YKT</span>
                                            <br />
                                            <br />
                                            <h5>내 지분</h5>
                                            <strong>[보유지분율]</strong>
                                            <span>%</span>
                                            <br />
                                            <br />
                                        </div>
                                        <Form>
                                            {/* Deposit Input  */}
                                            {/* 토큰 이름, 심볼, 매핑 필요  */}
                                            <Form.Label>YKToken</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="예치할 토큰 수량"
                                                    autoFocus
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    onChange={(e) => handleInput2(e)}
                                                />
                                                <InputGroup.Text id="inputGroup-sizing-default">YKT</InputGroup.Text>
                                            </InputGroup>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={depositClose2}>
                                            취소
                                        </Button>
                                        <Button type="submit" variant="primary" onClick={handleTransfer5}>확인</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Button variant="primary" onClick={withdrawShow2}>Withdraw</Button>
                                <Modal
                                    size="lg"
                                    show={widr2}
                                    onHide={withdrawClose1}
                                    backdrop="static"
                                    keyboard={false}
                                    aria-labelledby="example-modal-sizes-title-sm"
                                >
                                    <Modal.Header closeButton>
                                        {/* 선택한 카드의 풀 이름과 맵핑 */}
                                        <Modal.Title>YKToken Withdraw</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            <h5>내 예치 자산</h5>
                                            <strong>0{/*[예치한토큰갯수]*/}</strong>
                                            <span>YKT</span>
                                            <br />
                                            <br />
                                            <h5>내 지분</h5>
                                            <strong>[보유지분율]</strong>
                                            <span>%</span>
                                            <br />
                                            <br />
                                        </div>
                                        <Form>
                                            {/* Withdraw Input  */}
                                            {/* 토큰 이름, 심볼, 매핑 필요  */}
                                            <Form.Label>YKToken</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="출금할 토큰 수량"
                                                    autoFocus
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    onChange={(e) => handleInput2(e)}
                                                />
                                                <InputGroup.Text id="inputGroup-sizing-default">YKT</InputGroup.Text>
                                            </InputGroup>
                                        </Form>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={withdrawClose2}>
                                            취소
                                        </Button>
                                        <Button type="submit" variant="primary" onClick={handleTransfer6}>확인</Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

        </div>


    );
}

export default Single;

