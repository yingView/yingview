import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Ajax, Button, Pagination, Utils, Dialog } from 'yingview-form';

const { getCookie } = Utils;
require('./email.less');

class Email extends Component {
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
            <div className="admin-email-wrap">
                <div className="user-content-wrap">
                    <nav className="user-nav">
                        <p>4578</p>
                    </nav>
                    <div className="add-user">
                        <div className="message">
                            <span>总消息：</span>
                            <span>4578</span>
                            <span>条</span>
                        </div>
                        <button className="add-user-btn">发站内信</button>
                    </div>
                    <div className="user-list">
                        <ul className="user-list-head">
                            <li>标题</li>
                            <li>用户</li>
                            <li>电话</li>
                            <li>邮箱</li>
                            <li>日期</li>
                            <li style={{ textIndent: '30px' }}>操作</li>
                        </ul>
                        <ul className="user-list-item" >
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
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

module.exports = Email;