import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, Link} from 'react-router-dom'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import Footer from './Components/General/Footer.js'
import Home from './Components/MainPage/Home.js'
import About from './Components/AboutPage/About.js'

function App() {
  return (
    <div className="App">
      <Navbar sticky="top" expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">My Amazing Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Header>Some header</NavDropdown.Header>
              <NavDropdown.Item as={Link} to="/option1">Option 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/option2">Option 2</NavDropdown.Item>      
              <NavDropdown.Item as={Link} to="/option3">Option 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/option4">Option4</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-secondary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      {/* add more pathes once the pages are built */}
      <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer></Footer>
    </div>
  );
}

export default App;
