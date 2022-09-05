import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux'
import { Card, Row, Col, Container, Button, Modal } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import { Deposit, Withdraw } from '../components/staking'

function Staking () {
	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

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
							{/* 총 예치규모 */}
							<p>내 보유량</p>
						</Card.Text>
						</Card.Body>
						<Card.Footer>
							<>
								<Button variant="primary" onClick={handleShow} >Deposit</Button>
								<Button as={Link} to="/staking/withdraw" variant="primary">Withdraw</Button>
								<Modal
									show={show}
									onHide={handleClose}
									backdrop="static"
									keyboard={false}
								>
									<Modal.Header closeButton>
									<Modal.Title>Pool Name</Modal.Title>
									</Modal.Header>
									<Modal.Body>
									<p>예치하실</p>
									</Modal.Body>
									<Modal.Footer>
									<Button variant="secondary" onClick={handleClose}>
										Close
									</Button>
									<Button variant="primary">Deposit</Button>
									</Modal.Footer>
								</Modal>
								{/* <Button as={Link} to="/staking/deposit" variant="primary">Deposit</Button>
								<Button as={Link} to="/staking/withdraw" variant="primary">Withdraw</Button> */}
								{/* <Route exact path={Link} render={()=>(<h3>Please select any Button</h3>)}/>
           						<Route path={Link} component={Deposit}/> */}
							</>
						</Card.Footer>
					</Card>
					</Col>
				))}
				</Row>
            </div>
			<div>

			</div>
        </div>
    );
};

export default Staking;