import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, Link} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Footer from './Components/General/Footer.js'
import Home from './Components/MainPage/Home.js'
import About from './Components/AboutPage/About.js'
import Register from './Components/General/Register.js'
import Login from './Components/General/Login.js'
import {FaUser} from 'react-icons/fa'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { isLoggedIn: false };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  }

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  }
  render() {   
    return (
      <div className="App">
        <Navbar sticky="top" expand="lg" bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">Rommies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>

              <LoginControl isLoggedIn={this.state.isLoggedIn} />

            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* add more pathes once the pages are built */}
        <Switch>
            <Route path="/about">
              <About />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer></Footer>
      </div>
    );
  }
}

/* Adds user menu to the navigation bar - 
        if a user is logged in - display user menu
        else - display defualt menu
*/
function LoginControl(props) {
    let addChild;

    if(props.isLoggedIn){
      addChild =  <div>
        <NavDropdown.Item as={Link} to="/option1">option 1</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/option2">option 2</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item >Logout</NavDropdown.Item>
        </div>
    }
    else{
      addChild = <div>
        <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item></div>
    }

    return(<NavDropdown style={{position: "absolute", right: "0", marginRight: "7%"}} id="basic-nav-dropdown" title={
      <div style={{display: "inline-block"}}><FaUser style={{color: "grey"}}/></div>
    }>{addChild}</NavDropdown>);
}

export default App;
