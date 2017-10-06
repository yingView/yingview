import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, CheckBoxItem, Button } from 'yingview-form';

class UserLogin extends Component {
    render() {
        return (
            <div id="ying-view-user-login">
                <div className="username username-password">
                    <Input
                        type='text'
                        fileName='用户名/英文/数字'
                        placeholder='用户名/英文/数字'
                    />
                </div>
                <div className="password username-password">
                    <Input
                        type='password'
                        fileName='密码/英文/数字'
                        placeholder='密码/英文/数字'
                    />
                </div>
                <div className="checkbox username-password">
                    <CheckBoxItem
                        text='记住密码'
                    />
                    <a href="#" style={{ float: 'right' }}>忘记密码?</a>
                </div>
                <div className="button username-password" style={{ textAlign: 'center' }}>
                    <Button
                        text='登录'
                        type='submit'
                    />
                    <span style={{ padding: '0 12px' }} />
                    <Button text='注册' />
                </div>
                <div className="button username-password" />
            </div>
        )
    }

}

export default UserLogin;