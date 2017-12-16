import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Ajax, Button, Pagination, Utils, Dialog } from 'yingview-form';

const { getCookie } = Utils;
require('./category.less');

class Category extends Component {
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
            <div className="admin-category-wrap">
                <div className="column-className-wrap">
                    <div className="query-form">
                        <input type="text" className="input-text" />
                        <button className="query-btn">查询</button>
                    </div>
                    <ul className="className-list">
                        <li >
                            <p className="name left">
                                <input type="text" />
                                <span>1</span>
                            </p>
                            <p className="right"><span>编辑</span><span >删除</span></p>
                        </li>
                    </ul>
                    <div className="btn-wrap">
                        <span>122112</span>
                        <span>条</span>
                        <button className="add-btn">添加</button>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Category;