import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, Radio, Button, Calendar, Select } from 'yingview-form';

class Register extends Component {

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
                                    type='text'
                                    fileName='用户名'
                                    placeholder='用户名/英文/数字'
                                />
                            </div>
                            <div className="info-form">
                                <span>密码:</span>
                                <Input
                                    type='text'
                                    fileName='密码'
                                    placeholder='密码/英文/数字'
                                />
                            </div>
                            <div className="info-form">
                                <span>确认密码:</span>
                                <Input
                                    type='text'
                                    fileName='确认密码'
                                    placeholder='密码/英文/数字'
                                />
                            </div>
                            <div className="info-form">
                                <span>出生日期:</span>
                                <Calendar
                                    fileName='出生年月'
                                    placeholder='出生年月'
                                />
                            </div>
                            <div className="info-form">
                                <span>性别:</span>
                                <Radio
                                    options={{ man: '男', woman: '女' }}
                                    value="man"
                                />
                            </div>
                            <div className="info-form">
                                <span>职业:</span>
                                <Select
                                    options={{ it: '互联网', eb: '电商', des: '设计' }}
                                    value={'it'}
                                />
                            </div>
                            <div className="info-form">
                                <span>激活邮箱:</span>
                                <Input
                                    type='email'
                                    fileName='激活邮箱'
                                    placeholder='请输入邮箱'
                                />
                            </div>
                            <div className="info-form" style={{ textAlign: 'center' }}>
                                <Button text='注册' type="submit" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;