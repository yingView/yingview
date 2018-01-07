import React, { Component } from 'react';
import UserLogin from '../../components/UserLogin';

class Login extends Component {
  render() {
    return (
      <div id="ying-view-login">
        <div className="login-wrap-ying">
          <div className="head-ying-view">
            用户登录
                    </div>
          <UserLogin submit={() => { window.location.href = '/'; }} />
        </div>
      </div>
    );
  }
}

export default Login;
