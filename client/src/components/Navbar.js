import { Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
// import '../assets/css/Navbar.css';

function Navbar() {
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
          	<Nav.Link as={Link} to="/swap">Swap</Nav.Link>
        </Nav>
      	</Container>
    	</Navbar>
		</div>
  );
}

export default Navbar;