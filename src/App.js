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
import Users from './Components/AdminOptions/Users.js'
import {FaUser} from 'react-icons/fa'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      loggedUser: null, // change back to loggedUsser: {isAdmin: true}
      screenDimentions: {
        screenHeight: 0,
        screenWidth: 0
      }
    };

    // bind handlers
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // lifecycle method - will be called once the component mounts
  componentDidMount() {
    // get screen dimentions and set an event listener for screen resizing 
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    if(localStorage && localStorage.getItem("loggedUser")){
      this.setState({loggedUser: JSON.parse(localStorage.getItem("loggedUser"))});
      console.log(localStorage.getItem("loggedUser"));
    }

    
  }

  // lifecycle method - will be called once the component unmounts
  componentWillUnmount = () => {
      // remove the  event listener
      window.removeEventListener('resize', this.updateWindowDimensions);
      // delete the user from localstorage
      localStorage.removeItem("loggedUser");
  }

  // get the screen dimentions
  updateWindowDimensions = () => {
    this.setState({ screenDimentions: {screenWidth: window.innerWidth, screenHeight: window.innerHeight} });
  }

  // login and logout handlers
  handleUserLogin = (user) => {
    console.log(user);
    this.setState({loggedUser: {user}});
  }

  handleLogout = () => {
    this.setState({loggedUser: null});
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

              <NavLoginControl loggedUser={this.state.loggedUser} handleLogout={this.handleLogout} />

            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* add more pathes once the pages are built */}
        <Switch>
            <Route path="/about" >
              <About screenDimentions={this.state.screenDimentions} />
            </Route>

            <Route path="/register" >
              <Register screenDimentions={this.state.screenDimentions} />
            </Route>

            <Route path="/login" >
              <Login screenDimentions={this.state.screenDimentions} handleUserLogin={this.handleUserLogin} />
            </Route>

            <Route path="/users" >
              <Users screenDimentions={this.state.screenDimentions}/>
            </Route>
            
            <Route path="/">
              <Home screenDimentions={this.state.screenDimentions} />
            </Route>
          </Switch>
          <Footer></Footer>
      </div>
    );
  }
}

/* function to control the view of the dropdown menu inside the navigatiion bar 
  Adds user menu to the navigation bar - 
        if a user is logged in - display user menu
        else - display defualt menu
*/
function NavLoginControl(props) {
    let addChild;

    if(props.loggedUser === null){
      addChild = <div>
                    <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                  </div>
    }
    else{
      if(props.loggedUser.isAdmin){
        addChild =  <div>
                      <NavDropdown.Item as={Link} to="/option1">option 1</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/option2">option 2</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/users">Users Table</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={props.handleLogout} >Logout</NavDropdown.Item>
                    </div>
      }
      else {
        addChild =  <div>
                      <NavDropdown.Item as={Link} to="/option1">option 1</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/option2">option 2</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={props.handleLogout} >Logout</NavDropdown.Item>
                    </div>
      }
    }

    return(<NavDropdown style={{position: "absolute", right: "0", marginRight: "7%"}} id="basic-nav-dropdown" title={
      <div style={{display: "inline-block"}}><FaUser style={{color: "grey"}}/></div>
    }>{addChild}</NavDropdown>);
}

export default App;
