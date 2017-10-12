import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, Radio, Button, Calendar, Select, Dialog, Ajax, Utils } from 'yingview-form';

class Register extends Component {
    constructor(props) {
        super(props);
        this.sendData = {
            username: this.props.location.query.username || '',
            password: '',
            repassword: '',
            sax: 'man',
            job: 'it',
            email: ''
        }
    }

    sendAjax() {

        const { username, password, repassword, sax, job, email } = this.sendData;
        let message = null;
        if (!email || !Utils.isEmail(email)) {
            message = '邮箱格式不正确';
        }
        if (password !== repassword) {
            message = '两次密码不一致';
        }
        if (!repassword) {
            message = '请填写确认密码';
        }
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
                method: 'regist',
                content: JSON.stringify({
                    username,
                    password,
                    sax,
                    job: job.key,
                    email,
                    birthday: ''
                })
            },
            dataType: 'json',
            success: function (res) {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.success({ content: content.message });
                } else {
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
                                    value={this.sendData.username}
                                    onChange={(value) => { this.sendData.username = value; }}
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
                                    value={this.sendData.repassword}
                                    onChange={(value) => { this.sendData.repassword = value; }}
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
                                    options={{ man: '男', woman: '女' }}
                                    value={this.sendData.sax}
                                    onChange={(value) => { this.sendData.sax = value; }}
                                />
                            </div>
                            <div className="info-form">
                                <span>职业:</span>
                                <Select
                                    options={{ it: '互联网', eb: '电商', des: '设计' }}
                                    value={this.sendData.job}
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