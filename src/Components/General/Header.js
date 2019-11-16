import React from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

class Header extends React.Component {
    state = {
        isOpen: false
    };
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <Navbar sticky="top" bg="light" expand="lg">
            <Navbar.Brand href="#home">My App Thingy</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="https://github.com/einatSh">Github</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Header>Some header</NavDropdown.Header>
                    <NavDropdown.Item href="#action/3.1">Option 1</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Option 2</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Option 3</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;