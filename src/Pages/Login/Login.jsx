import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserLogin from '../../components/UserLogin';

class Login extends Component {
    
    render() {
        return (
            <div id="ying-view-login">
                <UserLogin />
            </div>
        )
    }
}

export default Login;