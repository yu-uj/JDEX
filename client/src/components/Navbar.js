import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React from "react";
// import Modal from 'react-modal';
import CounterContainer from '../redux/CounterContainer';
import '../assets/css/Navbar.css'

function Navigation() {

	return (
		<div className="Navbar">
			<Navbar bg="dark" variant="dark" expand="xl" style={{ height: 70 }}>
				<Container>
					<Navbar.Brand href="/">
						JDex
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">Home</Nav.Link>
						<Nav.Link as={Link} to="/mytoken">My Token</Nav.Link>
						<Nav.Link as={Link} to="/swap">Swap</Nav.Link>
						<NavDropdown title="Staking" id="navbarScrollingDropdown">
							<NavDropdown.Item as={Link} to="/staking/single">Single</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/staking/pair">Pair</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link as={Link} to="/dashboard">DashBoard</Nav.Link>
					</Nav>
					<CounterContainer variant="outline-success" />
				</Container>
			</Navbar>
		</div>
	);
}


export default Navigation;