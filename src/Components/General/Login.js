import React, {useState} from "react";
import {Row, Col, Form, Button, InputGroup} from 'react-bootstrap';
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            controlFlags: {
                isInitialState: true,
                isEmailLogin: false,
                isOtherLogin: false,
            },
            loggedUser: null
        }

        // bind handlers
        this.handlers.handleInitialStateChange = this.handlers.handleInitialStateChange.bind(this);
        this.handlers.handleOtherLoginChange = this.handlers.handleOtherLoginChange.bind(this);
        this.handlers.handleEmailLoginChange = this.handlers.handleEmailLoginChange.bind(this);
        this.handlers.handleLoginSuccess = this.handlers.handleLoginSuccess.bind(this);
    }

    handlers = {
        handleInitialStateChange: () => {
            this.setState({controlFlags: {isInitialState: !this.state.controlFlags.isInitialState}});
        },
        handleOtherLoginChange: () => {
            this.setState({controlFlags: {isOtherLogin: !this.state.controlFlags.isOtherLogin}});
        },
        handleEmailLoginChange: () => {
            this.setState({controlFlags: {isEmailLogin: !this.state.controlFlags.isEmailLogin}})
        },
        handleLoginSuccess: (user) => {
            this.setState({loggedUser: user});
            if(user.isAdmin){
                this.props.handleIsAdmin();
            }
            this.props.handleUserLogin(user);

            // redirect back to the main page
            window.location.href = "/";
        }
    }

    render() {
        const leftStyle = {
            textAlign: "center", 
            border: "1px solid rgba(117, 116, 116, 0.2)", 
            borderRadius: "15px", 
            padding: "10px",
            backgroundColor: "rgba(124, 123, 123, 0.05)"
        }
        const rightStyle = {
            textAlign: "center", 
            border: "1px solid rgba(117, 116, 116, 0.2)", 
            borderRadius: "15px", 
            padding: "10px",
            backgroundColor: "rgba(124, 123, 123, 0.05)"
        }

        return (
            <div style={{width: "100%", height: "100%"}}>
                <Row>
                    <Col style={leftStyle}>
                        <h1 style={{fontSize: "25px"}}>Header</h1>
                        
                    </Col>

                    <LoginControl controlFlags={this.state.controlFlags} handlers={this.handlers} />
                    
                    <Col style={rightStyle}>
                        <p>News</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

// function to control the content of the page
function LoginControl(props){
    let addChild;

    const handleEmailLogin = () => {
        props.handlers.handleInitialStateChange();
        props.handlers.handleEmailLoginChange();
    }

    const handleOtherLogin = () => {
        props.handlers.handleInitialStateChange();
        props.handlers.handleOtherLoginChange();
    }

    if(props.controlFlags.isInitialState){
        addChild = <div style={{marginTop: "15%"}}>
                        <Button variant="outline-primary" style={{marginRight: "5%"}} onClick={() => handleEmailLogin()}>Login with email</Button> 
                        <Button variant="outline-primary" disabled onClick={() => handleOtherLogin()}>Other Login</Button>
                    </div>
    }
    else if(props.controlFlags.isEmailLogin){
        addChild = <div>
                        <p style={{color: "rgba(97, 96, 96)"}}>Fill in all fields to log-in</p>
                        <LoginForm handleLoginSuccess={props.handlers.handleLoginSuccess} ></LoginForm>
                    </div>
    }
    else if(props.controlFlags.isOtherLogin){

    }

    return <Col style={{textAlign: "center"}}>
        <h1>Log-in Form</h1>
        {addChild}              
    </Col>
}

function LoginForm(props){
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = event => {
        const form = event.currentTarget;
        const toLogin = {
            email: email,
            password: password
        }
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            // try to login user from db
            const result = axios.get("/users/login", toLogin);

            // user doesn't exist or password mismatch email
            if(result.user == null || result.user.passMismatch){
                alert(result.user == null);
                //alert(result.user == null ? "Email address doesn't exist" : "Password doesn't match email");
                
                event.preventDefault();
                event.stopPropagation();
            }
            else{
                props.handleLoginSuccess(result.user);
            }
            
        }


        setValidated(true);
        
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return(
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" aria-describedby="inputGroupPrepend" placeholder="Email@email.com" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" onChange={handleEmailChange} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid email address.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom06">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="Password" placeholder="Password" required minLength="5" maxLength="10" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" onChange={handlePasswordChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter password (length between 5-10 letters). Password must contain at least one upper case letter, at least one lower case letter and at least one number.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default Login;