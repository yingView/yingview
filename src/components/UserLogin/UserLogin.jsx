import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Input, CheckBoxItem, Button, Dialog, Ajax, Utils } from 'yingview-form';
const { setCookie, getCookie } = Utils;


class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            captcha: false,
            captchaIdx: 1
        }
        // 验证码
        if (getCookie('captcha') >= 3) {
            this.state.captcha = true;
        }
        this.sendData = {
            userName: '',
            password: '',
            captcha: '',
            remain: true
        }
    }

    sendAjax() {

        const { userName, password, captcha, remain } = this.sendData;
        let message = null;
        if (!captcha && this.state.captcha) {
            message = '请填写验证码';
        }
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
            url: window.hostname + 'yingview.php',
            data: {
                method: 'login',
                rpcname: 'user',
                userName,
                password,
                captcha
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
                    let captcha = Number(getCookie('captcha') || 0);
                    captcha += 1;
                    setCookie('captcha', captcha, 86400);
                    if (captcha >= 3) {
                        this.setState({ captcha: true });
                    }
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
                {
                    this.state.captcha ?
                    <div className="password username-password" style={{display: 'flex'}}>
                        <div>
                            <Input
                                type='word'
                                fileName='验证码'
                                placeholder='请输入验证码'
                                value={this.sendData.captcha}
                                onChange={(value) => { this.sendData.captcha = value; }}
                            />
                        </div>
                        <div style={{paddingLeft: '12px', paddingTop: '1px'}} onClick={() => { this.setState({ captchaIdx: Math.random() })}}>
                            <img src={window.hostname + '?method=getCaptcha&tem=' + this.state.captchaIdx} alt="验证码" style={{height: '30px'}}/>
                        </div>
                    </div> : null
                }
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