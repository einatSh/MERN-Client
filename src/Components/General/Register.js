import React, {useState} from "react";
import {Row, Col, Form, Button, InputGroup} from 'react-bootstrap';

class Register extends React.Component {
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

                    <Col style={{textAlign: "center"}}>
                        <h1>Registration Form</h1>
                        <p style={{color: "rgba(97, 96, 96)"}}>Fill in all fields to register</p>
                        <RegisterForm></RegisterForm>
                    </Col>
                    
                    <Col style={rightStyle}>
                        <p>News</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

function RegisterForm(){
    const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

    return(
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control required type="text" placeholder="First name" defaultValue="" minLength="3" maxLength="12" pattern="^[a-zA-Z]+-?\s?[a-zA-Z]+$"/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid first name. First name can contain upper/lower case letters, '-' and space.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control required type="text" placeholder="Last name" defaultValue="" minLength="3" maxLength="10" pattern="^[a-zA-Z]+\s?[a-zA-Z]+$"/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid last name. Last name can contain upper/lower case letters and '-'.
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
                        <Form.Control type="text" aria-describedby="inputGroupPrepend" placeholder="Email@email.com" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid email address.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
            
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="05012345678" required minLength="3" pattern="(050|052|054)+[0-9]{8}"/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid phone number.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom05">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" required minLength="3" />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid address.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom06">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="Password" placeholder="Password" required minLength="5" maxLength="10" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"/>
                    <Form.Control.Feedback type="invalid">
                        Please enter password. Password must contain at least one upper case letter, at least one lower case letter and at least one number.
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