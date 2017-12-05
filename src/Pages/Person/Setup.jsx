import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Setup extends Component {
    render() {
        return (
            <div className="person-setup-wrap">
                <div className="person-setup-content">
                    <div className="person-setup-content-wrap">
                        <ul className="person-setup-left">
                            <li className="person-setup-item">
                                <span>用户名:</span><input />
                            </li>
                            <li className="person-setup-item">
                                <span>电话号码:</span><input />
                            </li>
                            <li className="person-setup-item">
                                <span>邮箱地址:</span><input />
                            </li>
                        </ul>
                        <ul className="person-setup-right">
                            <li className="person-setup-item">
                                <span>所在城市:</span><input />
                            </li>
                            <li className="person-setup-item">
                                <span>出生日期:</span><input />
                            </li>
                            <li className="person-setup-item">
                                <span>从事工作:</span><input />
                            </li>
                        </ul>
                    </div>
                    <div className="person-setup-content-other">
                        <div className="person-setup-item">
                            <span>个性签名:</span><textarea />
                        </div>
                    </div>
                    <div className="person-setup-button">
                        <button>保存</button>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Setup;