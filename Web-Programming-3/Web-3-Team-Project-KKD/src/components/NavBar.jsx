import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand  href="/">Team KKD</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" className="ms-auto"/>
            <Navbar.Collapse id="main-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/albums/">Albums</Nav.Link>
                <Nav.Link as={NavLink} to="/artists/">Artists</Nav.Link>
                <Nav.Link as={NavLink} to="/genres/">Genres</Nav.Link>
                <Nav.Link as={NavLink} to="/mediatypes/">Media Types</Nav.Link>
                <Nav.Link as={NavLink} to="/tracks/">Tracks</Nav.Link>
              </Nav>
            </Navbar.Collapse>

        </Container>
      </Navbar>
  )
}

export default NavBar;