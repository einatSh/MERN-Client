import React from 'react';
import {Table} from 'react-bootstrap';

class Users extends React.Component {
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Address</th>
                        <th>Password</th>
                    </tr>
                </thead>
            </Table>
        );
    }
}

export default Users;