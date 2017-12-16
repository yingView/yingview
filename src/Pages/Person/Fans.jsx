import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Radio, FileUpload, Ajax, Button, Pagination, Utils, Dialog } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { getCookie } = Utils;

class Fans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusList: [],
            readOnly: false,
            total: 0
        }
        this.current = 1;
        this.size = 16;
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
        this.queryData();
    }
    queryData() {
        let { userCode, operate } = this.props.location.query;
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'queryFocusByUserCode',
                rpcname: 'focus',
                userCode: userCode,
                current: this.current,
                size: this.size,
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    if (operate === 'view' || userCode !== this.userInfo.userCode) {
                        this.state.readOnly = true;
                        this.props.location.query.readOnly = true;
                    }
                    this.setState({
                        focusList: content.focusList,
                        total: content.total,
                        readOnly: this.state.readOnly
                    });
                }
            }
        })
    }

    add(user) {
        if (!this.userInfo.userCode) {
            Dialog.error({ content: '你没有登录' });
            return;
        }
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                rpcname: 'focus',
                method: 'addFocus',
                byFocusUserCode: user.userCode,
                focusUserCode: this.userInfo.userCode
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.info({ content: content.message });
                } else {
                    Dialog.error({ content: content.message });
                }
            }
        })
    }

    delete(user) {
        if (!this.userInfo.userCode) {
            Dialog.error({ content: '你没有登录' });
            return;
        }
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                rpcname: 'focus',
                method: 'deleteFocus',
                byFocusUserCode: user.userCode,
                focusUserCode: this.userInfo.userCode
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.info({ content: content.message });
                } else {
                    Dialog.error({ content: content.message });
                }
            }
        })
    }

    render() {
        const { focusList, readOnly, total } = this.state;
        return (
            <div className="person-fans-wrap">
                <ul className="person-fans-list clearfix">
                    {
                        focusList && focusList.length ? focusList.map((user) => (

                            <li className="person-fans-item">
                                <div className="fans-content">
                                    <div className="fans-photo">
                                        <Link to={{ pathname: '/index/person', query: { userCode: user.userCode, operate: 'view' } }} target={'_blank'}>
                                            <img src={window.hostname + user.userPhoto} alt={user.nickName} />
                                        </Link>
                                    </div>
                                    <div className="name-operate">
                                        <Link to={{ pathname: '/index/person', query: { userCode: user.userCode, operate: 'view' } }} target={'_blank'}>
                                            <div className="user-name">
                                                {user.nickName}
                                            </div>
                                        </Link>
                                        <div className="user-operate">
                                            <Button
                                                text={'关注'}
                                                type={'submit'}
                                                size={'smaller'}
                                                onClick={this.add.bind(this, user)}
                                            />
                                            <Button
                                                text={'取消'}
                                                size={'smaller'}
                                                onClick={this.delete.bind(this, user)}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </li>
                        )) :
                            <li className="person-fans-empty">
                                没有信息
                            </li>
                    }
                </ul>
                <div className="person-fans-pagination">
                    <Pagination
                        size={this.size}
                        current={this.current}
                        total={total}
                        onChange={(value) => { this.current = value; this.queryData() }}
                    />
                </div>
            </div>
        )
    }
}

module.exports = Fans;