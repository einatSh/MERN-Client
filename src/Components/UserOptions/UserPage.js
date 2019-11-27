import React, {useState} from "react";
import {Row, Col, Form, Button, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class UserPage extends React.Component {
    constructor(props){
        super(props);

        // bind handlers
    }   

    render() {
        
        return (
            <div style={{width: this.props.screenDimentions.screenWidth, height: this.props.screenDimentions.screenHeight-120}}>
                <h1>user page</h1>
            </div>
        );
    }
}

export default UserPage;