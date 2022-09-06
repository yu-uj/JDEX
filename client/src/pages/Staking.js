import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux'
import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { Pool, Single, Pair, Create } from '../components/staking'

function Staking () {
	const [show, setShow] = useState(false);
	const [create, setCreate] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true); 
	
	const handleCreate = () => setCreate(true);
	const createClose = () => setCreate(false);

    return (
        <div className="Pool">
            <div>
				
                <h1>Pool List</h1>
                <Row xs={1} md={1} className="g-4">
				{Array.from({ length: 5 }).map((_, idx) => (
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
						<Card.Title>Token Name</Card.Title>
						<Card.Text>
							<p>총 예치규모</p>
							
							<p>내 보유량</p>
						</Card.Text>
						</Card.Body>
						<Card.Footer>
							<>
								<Button variant="primary" onClick={handleShow} >Deposit</Button>
								<Button variant="primary" onClick={handleShow}>Withdraw</Button>
								<Modal
									size="lg"
									show={show}
									onHide={handleClose}
									backdrop="static"
									keyboard={false}
									aria-labelledby="example-modal-sizes-title-sm"
								>
									<Modal.Header closeButton>
									<Modal.Title>Pool Name</Modal.Title>
									</Modal.Header>
									<Modal.Body>
									<p>현재 보유 토큰</p>
										<Form>
											<Form.Group className="mb-3">
												<Form.Label>Select Pool Type</Form.Label>
												<Form.Select >
												<option>Single Pool</option>
												<option>Pair Pool</option>
												</Form.Select>
											</Form.Group>
											<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
												<Form.Label>Token Name</Form.Label>
												<Form.Control
												type="text"
												placeholder="EX) ETH"
												autoFocus
												/>
											</Form.Group>
											<Form.Group
												className="mb-3"
												controlId="exampleForm.ControlTextarea1"
											>
												<Form.Label>Price</Form.Label>
												<Form.Control as="textarea" rows={1} />
											</Form.Group>
										</Form>
									</Modal.Body>
									<Modal.Footer>
									<Button variant="secondary" onClick={handleClose}>
										취소하기
									</Button>
									<Button variant="primary">Deposit</Button>
									</Modal.Footer>
								</Modal>
								
							</>
						</Card.Footer>
					</Card>
					</Col>
				))}
				</Row>
            </div>
			<div className="createbtn">
				<div className="d-grid gap-2">
					<Button variant="primary" size="lg" onClick={handleCreate}>
						Create New Pool
					</Button>
					<Modal
						size="lg"
						show={create}
						onHide={createClose}
						backdrop="static"
						keyboard={false}
						aria-labelledby="example-modal-sizes-title-sm"
					>
						<Modal.Header closeButton>
						<Modal.Title>Create New Pool</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group className="mb-3">
									<Form.Label>Select Pool Type</Form.Label>
									<Form.Select >
									<option>Single Pool</option>
									<option>Pair Pool</option>
									</Form.Select>
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>Token Name</Form.Label>
									<Form.Control
									type="text"
									placeholder="EX) ETH"
									autoFocus
									/>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlTextarea1"
								>
									<Form.Label>Price</Form.Label>
									<Form.Control as="textarea" rows={1} />
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
						<Button variant="secondary" onClick={createClose}>
							취소하기
						</Button>
						<Button variant="primary">Create</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
        </div>
    );
};

export default Staking;