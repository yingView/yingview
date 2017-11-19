import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Input, CheckBoxItem, Button, Dialog, Ajax, Utils } from 'yingview-ui';
const { setCookie } = Utils;


class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.sendData = {
            username: '',
            password: '',
            remain: true
        }
    }

    sendAjax() {

        const { username, password, remain } = this.sendData;
        let message = null;
        if (!password) {
            message = '请填写密码';
        }
        if (!username) {
            message = '请填写用户名';
        }
        if (message) {
            Dialog.info({ content: message });
            return;
        }

        Ajax.get({
            url: 'http://127.0.0.1:8080/user.json',
            data: {
                method: 'login',
                username,
                password
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    const cookie = {
                        nickname: content.user.nickname,
                        username: content.user.username,
                        passcode: content.user.passcode,
                        photoadd: content.user.photoadd,
                        usercode: content.user.usercode,
                        userid: content.user.userId,
                        userjob: content.user.userjob
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
                        value={this.sendData.username}
                        onChange={(value) => { this.sendData.username = value; this.setState({ username: value }) }}
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
                    <Link to={{ pathname: '/register', query: this.sendData.username ? { username: decodeURI(this.sendData.username) } : {} }}>
                        <Button text='注册' />
                    </Link>
                </div>
                <div className="button username-password" />
            </div>
        )
    }

}

export default UserLogin;