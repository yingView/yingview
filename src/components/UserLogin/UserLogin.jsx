import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Input, CheckBoxItem, Button, Dialog, Ajax, Utils } from 'yingview-form';
const { setCookie } = Utils;


class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
        this.sendData = {
            userName: '',
            password: '',
            remain: true
        }
    }

    sendAjax() {

        const { userName, password, remain } = this.sendData;
        let message = null;
        if (!password) {
            message = '请填写密码';
        }
        if (!userName) {
            message = '请填写用户名';
        }
        if (message) {
            Dialog.info({ content: message });
            return;
        }

        Ajax.get({
            url: window.hostname + '',
            data: {
                method: 'login',
                rpcname: 'user',
                userName,
                password
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    const cookie = {
                        nickName: content.user.nickName,
                        userName: content.user.userName,
                        passCode: content.user.passCode,
                        photoImage: content.user.photoImage,
                        userCode: content.user.userCode,
                        userJob: content.user.userJob
                    }
                    const time = this.sendData.remain ? 1000 * 60 * 60 * 24 * 7 : 1000 * 60 * 60;
                    setCookie('user', JSON.stringify(cookie), time);
                    Dialog.success({ content: content.message, submit: this.props.submit });
                } else {
                    Dialog.info({ content: content.message });
                }
            }
        })
    }

    render() {
        return (
            <div id="ying-view-user-login">
                <div className="username username-password">
                    <Input
                        type='word'
                        fileName='用户名/英文/数字'
                        placeholder='用户名/英文/数字'
                        value={this.sendData.userName}
                        onChange={(value) => { this.sendData.userName = value; this.setState({ userName: value }) }}
                    />
                </div>
                <div className="password username-password">
                    <Input
                        type='password'
                        fileName='密码/英文/数字'
                        placeholder='密码/英文/数字'
                        value={this.sendData.password}
                        onChange={(value) => { this.sendData.password = value; }}
                    />
                </div>
                <div className="checkbox username-password">
                    <CheckBoxItem
                        text='记住密码'
                        checked={this.sendData.remain}
                        onChange={(value) => { this.sendData.remain = value; }}
                    />
                    <a href="#" style={{ float: 'right' }}>忘记密码?</a>
                </div>
                <div className="button username-password" style={{ textAlign: 'center' }}>
                    <Button
                        text='登录'
                        type='submit'
                        onClick={this.sendAjax.bind(this)}
                    />
                    <span style={{ padding: '0 12px' }} />
                    <Link to={{ pathname: '/register', query: this.sendData.userName ? { userName: decodeURI(this.sendData.userName) } : {} }}>
                        <Button text='注册' />
                    </Link>
                </div>
                <div className="button username-password" />
            </div>
        )
    }

}

export default UserLogin;