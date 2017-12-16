import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Ajax, Button, Pagination, Utils, Dialog } from 'yingview-form';

const { getCookie } = Utils;
require('./user.less');

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.current = 1;
        this.size = 16;
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
    }

    queryData() {
        let { userCode, operate } = this.props.location.query;
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'queryByUserCode',
                rpcname: 'file',
                userCode: userCode,
                current: this.current,
                size: this.size,
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({
                        photoList: content.fileList,
                        total: content.total,
                        readOnly: this.state.readOnly
                    });
                }
            }
        })
    }
    render() {
        const { photoList, readOnly, total } = this.state;
        return (
            <div className="admin-user-wrap">
                <div className="user-content-wrap">
                    <nav className="user-nav">
                        <p>初级会员</p>
                    </nav>
                    <div className="add-user">
                        <div className="message">
                            <span>总人数：</span>
                            <span>4578</span>
                        </div>
                        <button className="add-user-btn">添加用户</button>
                    </div>
                    <div className="user-list">
                        <ul className="user-list-head">
                            <li>姓名</li>
                            <li>性别</li>
                            <li>职业</li>
                            <li>电话</li>
                            <li>邮箱</li>
                            <li style={{ textIndent: '30px' }}>操作</li>
                        </ul>
                        <ul className="user-list-item">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li>
                                <i className="iconfont"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = User;