import React from 'react';
import {Row, Col} from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        const rowStyle = {
            position: "relative",
            bottom: "0",
            width: "100%",
            color: "rgba(128, 128, 128, 0.63)",
            paddingTop: "1%"
        }
      
        return (
            <Row style={rowStyle}>
                <Col><p>All Rights Reserved to @einatSh</p></Col>
            </Row>
        );
    }
}

export default Footer;