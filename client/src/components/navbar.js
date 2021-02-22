import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const ButtonStyle = {
    marginRight: '20px'
};
const navStyle = {
  position: 'absolute',
  width: '100%',
}
function SiteNavbar(){
    return(
<>
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" style={navStyle}>
    <Navbar.Brand href="#"> <img
        alt=""
        src="box.svg"
        width="40"
        height="40"
        className="d-inline-block align-top"
      />{' '}Package Tracking</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#">Home</Nav.Link>
      <Nav.Link href="#tracking">Tracking</Nav.Link>
    </Nav>
    <Button variant="success" style={ButtonStyle}>Logowanie</Button>{' '}
    <Button variant="success">Rejestracja</Button>
    </Navbar.Collapse>
  </Navbar>
</>
    )
}

export default SiteNavbar;