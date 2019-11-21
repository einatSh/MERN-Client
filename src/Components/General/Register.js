import React, {useState} from "react";
import {Row, Col, Form, Button, InputGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isValid: false
        }
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleValidation = () => {
        this.setState({isValid: true});
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
            <div style={{width: "100%", height: "100vh"}}>
                <Row style={{height: "100%"}}>
                    <Col style={leftStyle}>
                        <h1 style={{fontSize: "25px"}} >Header</h1>
                    </Col>

                    <RegisterFormControl isValid={this.state.isValid} handleValidation={this.handleValidation} />

                    <Col style={rightStyle}>
                        <p>News</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

// function to control the view of the page
function RegisterFormControl(props){
    let addChild;

    if(props.isValid){
        addChild = <div style={{marginTop: "10%"}}>
                        <h3>Thank you for registering!</h3>
                        <Button variant="success" as={Link} to="/login">Login</Button>
                    </div>;
    }
    else{
        addChild = <div>
                        <p style={{color: "rgba(97, 96, 96)"}}>Fill in all fields to register</p>
                        <RegisterForm handleValidation={props.handleValidation} />
                    </div>;
    }
    return <Col style={{textAlign: "center", height: "100%"}}>
                <h1>Registration Form</h1>
                {addChild}
            </Col>;
}

// the registration form
function RegisterForm(props){
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    
    // handle form submition
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        let valid = true;
        const toRegister = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            password: password
        }

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        // validity checks
        if(password !== passwordConfirm){
            alert("Passwords missmatch!");
            valid = false;
        }

        let userExists = null;
        axios.get("/users/getUser", toRegister).then(res => alert(res.data.email)
        // .then(res => 
        //     {
        //     alert("Email: " + res.email + " is already registered to the system");
        //     valid = false;
        // }
        );
        // if(userExists !== null){
        //     //alert("Email: " + userExists.email + " is already registered");
        //     valid = false;
        // }


        // add the user
        if(valid){
            let result = axios.post("/users/register", toRegister);
            // .then(res => res.json()).then(res => {
            //     if(res.data != "user added"){
            //         alert("Email is already registered in the system.");
            //     }
            //     else {
            //         // complete registration
            //         props.handleValidation();
            //     }
            // });
        }
        setValidated(true);

    };

    // onChange handlers for the form feilds
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    }

    return(
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control required type="text" placeholder="First name" defaultValue="" minLength="3" maxLength="12" pattern="^[a-zA-Z]+-?\s?[a-zA-Z]+$" onChange={handleFirstNameChange} />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid first name (length between 3-12 letters). First name can contain upper/lower case letters, '-' and space.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control required type="text" placeholder="Last name" defaultValue="" minLength="3" maxLength="10" pattern="^[a-zA-Z]+\s?[a-zA-Z]+$" onChange={handleLastNameChange} />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid last name (length between 3-10 letters). Last name can contain upper/lower case letters and '-'.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

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
                <Form.Group as={Col} md="12" controlId="validationCustom04">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="User Name" required minLength="4" maxLength="8" pattern="[a-zA-Z0-9]{4,8}" onChange={handleUserNameChange} />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid user name (length between 4-8 letters). User name can contain lower/capital letters or numbers (0-9).
                    </Form.Control.Feedback>
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

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom07">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="Password" placeholder="Confirm Password" required minLength="5" maxLength="10" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" onChange={handlePasswordConfirmChange} />
                    <Form.Control.Feedback type="invalid">
                        Please re-enter password (length between 5-10 letters). Password must contain at least one upper case letter, at least one lower case letter and at least one number.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Group>
                <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                />
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default Register;