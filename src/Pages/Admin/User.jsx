import React, { Component } from 'react';
import { Ajax, Pagination, Utils, Dialog, Input } from 'yingview-form';
import EditUser from '../../components/EditUser';

const { getCookie } = Utils;
require('./user.less');
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
            userlist: [],
            total: 0,
            alltotal: 0
        }
        this.current = 1;
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
        this.queryUserList();
    }

    queryUserList() {
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'queryUserByKeyWord',
                rpcname: 'user',
                p: 'admin',
                keyword: this.state.keyword,
                current: this.current,
                size: 10,
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({
                        userList: content.userList || [],
                        total: content.total || 0,
                        alltotal: content.alltotal || 0
                    });
                } else {
                    this.setState({
                        userList: [],
                        total: 0
                    });
                }
            }
        })
    }
    updateUserInfo(userInfo) {
        Ajax.post({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'updateUserInfo',
                rpcname: 'user',
                p: 'admin',
                userInfo: JSON.stringify(userInfo)
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.success({ content: '修改成功！' });
                } else {
                    Dialog.success({ content: '修改失败！' });
                }
            }
        });
    }

    deleteUser(userCode) {
        Dialog.confirm({
            content: '确定要删除用户?删除后不可恢复！',
            submit: () => {
                Ajax.get({
                    url: window.hostname + 'yingview.php',
                    data: {
                        method: 'deleteByUserCode',
                        rpcname: 'user',
                        p: 'admin',
                        userCode
                    },
                    dataType: 'json',
                    success: (res) => {
                        const { content } = res;
                        if (content.isSuccess) {
                            Dialog.success({ content: '删除成功！' });
                        } else {
                            Dialog.success({ content: '删除失败！' });
                        }
                    }
                })
            },
            cancel: () => { }
        })
    }
    power(status, power) {
        let flag = '';
        if (status == '1') {
            switch (power) {
                case '0': flag = '未激活'; break;
                case '1': flag = '普通会员'; break;
                case '2': flag = '普通会员'; break;
                case '3': flag = '高级会员'; break;
                case '4': flag = '资深会员'; break;
                case '5': flag = '黑名单'; break;
                case '6': flag = '封号'; break;
                case '7': flag = '管理员'; break;
                case '8': flag = '高级管理'; break;
                case '9': flag = '超级管理员'; break;
            }
        } else if (status == '2') {
            flag = '短期封号';
        } else if (status == '3') {
            flag = '常期封号';
        } else {
            flag = '未激活';
        }
        return flag;
    }
    render() {
        const { userList, total, alltotal, keyword } = this.state;
        return (
            <div className="admin-user-wrap">
                <div className="user-content-wrap">
                    <nav className="user-nav">
                        <p
                            className={!keyword ? 'focus' : ''}
                            onClick={() => {
                                if (!keyword) {
                                    return;
                                }
                                this.state.keyword = null;
                                this.queryUserList();
                                this.setState({ keyword: this.state.keyword });
                            }}
                        >注册会员</p>
                        <p
                            className={keyword === 'normal' ? 'focus' : ''}
                            onClick={() => {
                                if (keyword === 'normal') {
                                    return;
                                }
                                this.state.keyword = 'normal';
                                this.queryUserList();
                                this.setState({ keyword: this.state.keyword });
                            }}
                        >普通会员</p>
                        <p
                            className={keyword === 'vip' ? 'focus' : ''}
                            onClick={() => {
                                if (keyword === 'vip') {
                                    return;
                                }
                                this.state.keyword = 'vip';
                                this.queryUserList();
                                this.setState({ keyword: this.state.keyword });
                            }}
                        >高级会员</p>
                        <p
                            className={keyword === 'limit' ? 'focus' : ''}
                            onClick={() => {
                                if (keyword === 'limit') {
                                    return;
                                }
                                this.state.keyword = 'limit';
                                this.queryUserList();
                                this.setState({ keyword: this.state.keyword });
                            }}
                        >异常会员</p>
                        <p
                            className={keyword === 'admin' ? 'focus' : ''}
                            onClick={() => {
                                if (keyword === 'admin') {
                                    return;
                                }
                                this.state.keyword = 'admin';
                                this.queryUserList();
                                this.setState({ keyword: this.state.keyword });
                            }}
                        >管理员</p>
                    </nav>
                    <div className="add-user">
                        <div className="message">
                            <span>总人数：</span>
                            <span>{alltotal}</span>
                        </div>
                        <button className="add-user-btn">添加用户</button>
                    </div>
                    <div className="query-user">
                        <Input
                            placeholder={'请输入用户名/昵称'}
                            width={'300px'}
                        />
                        <div className="search-botton">
                            <span />
                        </div>
                        <span className="query-btn" />
                    </div>
                    <div className="user-list">
                        <ul className="user-list-head">
                            <li>用户名</li>
                            <li>昵称</li>
                            <li>职业</li>
                            <li>权限</li>
                            <li>等级</li>
                            <li style={{ textIndent: '30px' }}>操作</li>
                        </ul>
                        {
                            userList && userList.map((user, index) => (
                                <ul className="user-list-item">
                                    <li>{user.userName}</li>
                                    <li>{user.nickName}</li>
                                    <li>{user.userJob}</li>
                                    <li>{this.power(user.userStatus, user.userPower)}</li>
                                    <li>{user.userLevel}</li>
                                    <li className="operate-wrap">
                                        <span
                                            onClick={() => {
                                                EditUser.show({
                                                    data: user,
                                                    onSubmit: this.updateUserInfo.bind(this)
                                                });
                                            }}
                                        >编辑</span>
                                        <span
                                            onClick={this.deleteUser.bind(this, user.userCode)}
                                        >删除</span>
                                    </li>
                                </ul>
                            ))
                        }
                        <div className="page-wrap">
                            <Pagination
                                onChange={(value) => { this.current = value; this.queryUserList(); }}
                                total={total}
                                current={this.current}
                                pageSize={10}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = User;