import React, { useState } from "react";
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";

function Counter(props) {
    const { number } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cw, setCw] = useState("Connect Wallet");
    const [ctk, setCtk] = useState("Connect to Kaikas");

    const modalClose = () => setModalIsOpen(false);
    const modalOpen = () => setModalIsOpen(true);

    const dispatch = useDispatch();
    const dispatchSetCW = (cw) => dispatch({ type: "SET_CW", number: cw });

    const connectWallet = async () => {
        if (window.klaytn !== 'undefined') { // 카이카스가 설치되어있으면
            if (window.klaytn.isKaikas) {
                const accounts = await window.klaytn.enable()
                setCw(accounts[0]);
                setCtk(accounts[0]);
                dispatchSetCW(accounts[0]);
            }
        } else { //카이카스 설치가 되어있지 않을때
            //          카이카스 설치 팝업 
        }
    };

    return (
        <>
            <Button size="sm" variant="outline-secondary" onClick={modalOpen}>{number}</Button>
            <Modal 
            show={modalIsOpen} 
            onHide={modalClose}
            backdrop="static"
            keyboard={false}
            >   <Modal.Header closeButton>
                    <Modal.Title>Connect Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You can start using JDex right away, using Kaikas.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    className="metaConnect"
                    variant="primary"
                    onClick={() => {
                        connectWallet();
                    }}>
                        {ctk}
                    </Button>
                </Modal.Footer>
            </Modal>

            

        </>
    );


    // const { number, increment } = props;

    // const handleIncrease = () => {
    //     increment();
    // };



    // return (
    //     <>
    //         <div>
    //             {number}
    //         </div>
    //         <div>
    //             <button onClick={handleIncrease}>+</button>
    //         </div>

    //     </>
    // );
};

export default Counter;


// import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
// import { Link } from "react-router-dom";
// import React, { useState, Component } from "react";
// import Modal from 'react-modal';

// export default function Navigation() {
// 	const [modalIsOpen, setModalIsOpen] = useState(false);
// 	const [cw, setCw] = useState("Connect Wallet")
// 	const [ctk, setCtk] = useState("Connect to Kaikas")

// 	const connectWallet = async () => {

// 		if (window.klaytn !== 'undefined') { // 카이카스가 설치되어있으면
// 			if (window.klaytn.isKaikas) {
// 				const accounts = await window.klaytn.enable()
// 				setCw(accounts[0]);
// 				setCtk(accounts[0]);
// 			}
// 		} else { //카이카스 설치가 되어있지 않을때
// 			//          카이카스 설치 팝업 
// 		}
// 	};

// 	return (

// 		<div className="Navbar">
// 			<Navbar bg="light" variant="light">
// 				<Container>
// 					<Navbar.Brand href="/">
// 						JDex
// 					</Navbar.Brand>
// 					<Nav className="me-auto">
// 						<Nav.Link as={Link} to="/">Home</Nav.Link>
// 						<Nav.Link as={Link} to="/mytoken">MyToken</Nav.Link>
// 						<Nav.Link as={Link} to="/swap">Swap</Nav.Link>
// 						{/* <Nav.Link as={Link} to="/staking">Staking</Nav.Link> */}
// 						<NavDropdown title="Staking" id="navbarScrollingDropdown">
// 							<NavDropdown.Item as={Link} to="/staking">Single</NavDropdown.Item>
// 							<NavDropdown.Item as={Link} to="/staking">Pair</NavDropdown.Item>
// 						</NavDropdown>
// 						<Nav.Link as={Link} to="/dashboard">DashBoard</Nav.Link>
// 						<button onClick={() => setModalIsOpen(true)}>{cw}</button>
// 						<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
// 							<h2>Connect Wallet</h2>
// 							<div>You can start using JDex right away, using Kaikas</div>
// 							<button
// 								className="metaConnect"
// 								onClick={() => {
// 									connectWallet();
// 								}}
// 							>
// 								{ctk}
// 							</button>
// 						</Modal>
// 					</Nav>
// 				</Container>
// 			</Navbar>
// 		</div>
// 	);
// }