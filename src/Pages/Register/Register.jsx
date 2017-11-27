import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, Radio, Button, Calendar, Select, Dialog, Ajax, Utils } from 'yingview-form';
const { setCookie } = Utils;

class Register extends Component {
    constructor(props) {
        super(props);
        this.sendData = {
            userName: this.props.location.query.userName || '',
            password: '',
            rePassword: '',
            nickName: '',
            sax: 1,
            job: {key: 'it', value: '互联网'},
            email: ''
        }
    }

    sendAjax() {

        const { userName, password, rePassword, nickName, sax, job, email } = this.sendData;
        let message = null;
        if (!email || !Utils.isEmail(email)) {
            message = '邮箱格式不正确';
        }
        if (!nickName) {
            message = '请填写昵称';
        }
        if (password !== rePassword) {
            message = '两次密码不一致';
        }
        if (!rePassword) {
            message = '请填写确认密码';
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
            url: window.hostname + '',
            data: {
                method: 'regist',
                rpcname: 'user',
                content: JSON.stringify({
                    userName,
                    password,
                    nickName,
                    sax,
                    userJob: job.key,
                    email
                })
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
                    Dialog.success({ content: content.message, submit: () => { window.location.href = '/' } });
                } else {
                    setCookie('user', '', -1);
                    Dialog.info({ content: content.message });
                }
            }
        })
    }
    render() {
        return (
            <div id="ying-view-register">
                <div className="login-wrap-ying">
                    <div className="background-input">
                        <div className="head-ying-view">
                            用户注册
                    </div>
                        <div className="info-mation">
                            <div className="info-form">
                                <span>用户名:</span>
                                <Input
                                    type='word'
                                    fileName='用户名'
                                    placeholder='用户名/英文/数字'
                                    value={this.sendData.userName}
                                    onChange={(value) => { this.sendData.userName = value; }}
                                />
                            </div>
                            <div className="info-form">
                                <span>密码:</span>
                                <Input
                                    type='word'
                                    fileName='密码'
                                    placeholder='密码/英文/数字'
                                    value={this.sendData.password}
                                    onChange={(value) => { this.sendData.password = value; }}
                                />
                            </div>
                            <div className="info-form">
                                <span>确认密码:</span>
                                <Input
                                    type='word'
                                    fileName='确认密码'
                                    placeholder='密码/英文/数字'
                                    value={this.sendData.rePassword}
                                    onChange={(value) => { this.sendData.rePassword = value; }}
                                />
                            </div>
                            <div className="info-form">
                                <span>昵称:</span>
                                <Input
                                    type='text'
                                    fileName='昵称'
                                    placeholder='请填写你喜欢的名字'
                                    value={this.sendData.nickName}
                                    onChange={(value) => { this.sendData.nickName = value; }}
                                />
                            </div>
                            {/* <div className="info-form">
                                <span>出生日期:</span>
                                <Calendar
                                    fileName='出生年月'
                                    placeholder='出生年月'
                                    onChange={(value) => { this.sendData.birthday = value; }}
                                />
                            </div> */}
                            <div className="info-form">
                                <span>性别:</span>
                                <Radio
                                    options={[{ key: 1, value: '男' }, {key: 0, value: '女'}]}
                                    value={this.sendData.sax}
                                    onChange={(value) => { this.sendData.sax = value.key; }}
                                />
                            </div>
                            <div className="info-form">
                                <span>职业:</span>
                                <Select
                                    options={{ it: '互联网', eb: '电商', des: '设计' }}
                                    value={this.sendData.job.key}
                                    onChange={(value) => { this.sendData.job = value; }}
                                />
                            </div>
                            <div className="info-form">
                                <span>激活邮箱:</span>
                                <Input
                                    type='email'
                                    required
                                    fileName='激活邮箱'
                                    placeholder='请输入邮箱'
                                    value={this.sendData.email}
                                    onChange={(value) => { this.sendData.email = value; }}
                                />
                            </div>
                            <div className="info-form" style={{ textAlign: 'center' }}>
                                <Button text='注册' type="submit" onClick={this.sendAjax.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;