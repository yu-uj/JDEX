import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../assets/css/Navbar.css';

function Navigation() {
  return (
    <div className="Navbar">
			<Navbar bg="light" variant="light">
      	<Container>
				<Navbar.Brand href="#home">
					{/* <img
						alt=""
						src="/logo.svg"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{' '} */}
					Navbar
				</Navbar.Brand>
        <Nav className="me-auto">
          	<Nav.Link as={Link} to="/">Home</Nav.Link>
			<Nav.Link as={Link} to="/mytoken">MyToken</Nav.Link>
          	<Nav.Link as={Link} to="/swap">Swap</Nav.Link>
			<NavDropdown title="Staking" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/staking">Single</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/staking">Pair</NavDropdown.Item>
            </NavDropdown>
          	<Nav.Link as={Link} to="/dashboard">DashBoard</Nav.Link>
        </Nav>
      	</Container>
    	</Navbar>
		</div>
  );
}

export default Navigation;