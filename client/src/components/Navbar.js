import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React, { useState, Component } from "react";
import Modal from 'react-modal';
import CounterContainer from '../redux/CounterContainer';

function Navigation() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [cw, setCw] = useState("Connect Wallet")
	const [ctk, setCtk] = useState("Connect to Kaikas")
	const [account, setAccount] = useState('');

	const connectWallet = async () => {

		if (window.klaytn !== 'undefined') { // 카이카스가 설치되어있으면
			if (window.klaytn.isKaikas) {
				const accounts = await window.klaytn.enable()
				const account = accounts[0]
				setAccount(accounts[0]);
				setCw(accounts[0]);
				setCtk(accounts[0]);
			}
		} else { //카이카스 설치가 되어있지 않을때
			//          카이카스 설치 팝업 
		}
	};

	return (
		<div className="Navbar">
			<Navbar bg="light" variant="light">
				<Container>
					<Navbar.Brand href="/">
						JDex
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">Home</Nav.Link>
						<Nav.Link as={Link} to="/mytoken">MyToken</Nav.Link>
						<Nav.Link as={Link} to="/swap">Swap</Nav.Link>
						<NavDropdown title="Staking" id="navbarScrollingDropdown">
							<NavDropdown.Item as={Link} to="/staking/single">Single</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/staking/pair">Pair</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link as={Link} to="/dashboard">DashBoard</Nav.Link>
						<Nav.Link as={Link} to="/Testpage">Testpage</Nav.Link>
						<CounterContainer />
					</Nav>
				</Container>
			</Navbar>
		</div>
	);
}


export default Navigation;