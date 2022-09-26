import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Kip7Pair() {

	const [depo, setDeposit] = useState(false);
	const [widr, setWithdraw] = useState(false);

	const [selectPair, setSelectPair] = useState([]);

	const depositShow = (el) => {
		setSelectPair(el);
		setDeposit(true);
	};
	const depositClose = () => setDeposit(false);

	const withdrawShow = (el) => {
		setSelectPair(el);
		setWithdraw(true);
	}
	const withdrawClose = () => setWithdraw(false);

	const dummydata = {
		token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1'
	}

	// 페어풀 조회
	// kip7 pair

	const [Kip7Data, setKip7Data] = useState([{ token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1' }]);
	const [Kip7Pool, setKip7Pool] = useState([dummydata]);
	const getKip7Pool = async () => {
		await axios.get(`http://localhost:4000/staking/kip7pool/`)
			.then((res) => {
				setKip7Pool(() => {
					return res.data['data']
				})
			})
	};
	// console.log(Kip7Pool);

	useEffect(() => {
		getKip7Pool();
	}, []);

	const Kip7_Pool = (list) => {
		let arr = [];
		for (let i = 0; i < list.length; i++) {
			let el = list[i];
			// console.log(el.token_address)
			let obj = {
				pair_name: el.pair_name,
				pair_address: el.pair_address,
				tokenA_address: el.tokenA_address,
				tokenB_address: el.tokenB_address,
				token_amount: '토큰 수량',
				token_price: "가격",
			}
			arr.push(obj);
		}
		setKip7Data(arr);
	}
	useEffect(() => {
		Kip7_Pool(Kip7Pool);
	}, [Kip7Pool])


	return (
		<div>
			<Row xs={1} md={1} className="g-4">
				{Array.from({ length: 1 }).map((_, idx) => (
					<Col xs={18} md={12}>
						{Kip7Data.map((el) => (
							<Card
								bg={'Secondary'}
								key={'Secondary'}
								text={'dark'}
								border={'Secondary'}
								// style={{ width: '50rem' }}
								className="mb-4"
							>
								<Card.Body>
									<Card.Title>{el.pair_name}</Card.Title>
									<Card.Text>
										<p>총 예치규모</p>
										<p>내 보유량</p>
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<>
										<Button variant="primary" onClick={() => depositShow(el)} >Deposit</Button>
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
												<Modal.Title>{selectPair.pair_name} Deposit</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<div>
													
													<h5>내 예치 자산</h5>
													<strong>0{/*[예치한토큰갯수]*/}</strong>
													<span>{/*[토큰심볼]*/}</span>
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
													<Form.Label>Token1 Name</Form.Label>
													<p>address: {selectPair.tokenA_address}</p>
													<InputGroup className="mb-3">
														<Form.Control
															type="text"
															placeholder="예치할 토큰1 수량"
															autoFocus
															aria-label="Default"
															aria-describedby="inputGroup-sizing-default"
														/>
														<InputGroup.Text id="inputGroup-sizing-default">KLAY[토큰1심볼]</InputGroup.Text>
													</InputGroup>

													<Form.Label>Token2 Name</Form.Label>
													<p>address: {selectPair.tokenB_address}</p>
													<InputGroup className="mb-3">
														<Form.Control
															type="text"
															placeholder="예치할 토큰2 수량"
															autoFocus
															aria-label="Default"
															aria-describedby="inputGroup-sizing-default"
														/>
														<InputGroup.Text id="inputGroup-sizing-default">KLAY[토큰2심볼]</InputGroup.Text>
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

										<Button variant="primary" onClick={() => withdrawShow(el)}>Withdraw</Button>
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
												<Modal.Title>{selectPair.pair_name} Withdraw</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<div>
													<h5>내 예치 자산</h5>
													<strong>0{/*[예치한토큰갯수]*/}</strong>
													<span>{/*[토큰심볼]*/}</span>
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
													<Form.Label>{selectPair.pair_name}</Form.Label>
													<p>address: {selectPair.pair_address}</p>
													<InputGroup className="mb-3">
														<Form.Control
															type="text"
															placeholder="출금할 토큰1 수량"
															autoFocus
															aria-label="Default"
															aria-describedby="inputGroup-sizing-default"
														/>
														<InputGroup.Text id="inputGroup-sizing-default">KLAY[토큰1심볼]</InputGroup.Text>
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
		</div>
	);
}

export default Kip7Pair;