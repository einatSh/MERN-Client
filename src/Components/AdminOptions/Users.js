import React from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    // lifecycle method - will be called once the component mounts
    componentDidMount() {
        axios.get("/users").then(res => {
            this.setState({
                users: res.data.users.map((user) => ({
                    index: user.index,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    email: user.email,
                    password: user.password
                }))
            });
        })
    }

    render() {
        const userList = this.state.users;

        return (
            <div style={{width: this.props.screenDimentions.screenWidth, height: this.props.screenDimentions.screenHeight-120}}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map(user => {
                                return(
                                    <tr>
                                        <td>{user.index}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
            
        );
    }
}

export default Users;