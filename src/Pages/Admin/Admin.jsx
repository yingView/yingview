import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import { Ajax, Utils } from 'yingview-form';

const { getCookie } = Utils;


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: 0
        }
        let str = '';
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const week = date.getDay();
        str += year + '-';
        str += month + 1 > 9 ? (month - 0 + 1) : (0 + '' + (month - 0 + 1));
        str += '-' + (day > 9 ? day : 0 + '' + day) + ' , ';
        switch (week) {
            case 0: str += '星期日'; break;
            case 1: str += '星期一'; break;
            case 2: str += '星期二'; break;
            case 3: str += '星期三'; break;
            case 4: str += '星期四'; break;
            case 5: str += '星期五'; break;
            case 6: str += '星期六'; break;
        }
        str += ' , ';
        str += hours > 9 ? hours : 0 + '' + hours;
        str += ':'
        str += minutes > 9 ? minutes : (0 + '' + minutes);
        this.state.date = str;
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
    }

    componentDidMount() {
        setInterval(() => {
            let str = '';
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const week = date.getDay();
            str += year + '-';
            str += month + 1 > 9 ? (month - 0 + 1) : (0 + '' + (month - 0 + 1));
            str += '-' + (day > 9 ? day : 0 + '' + day) + ' , ';
            switch (week) {
                case 0: str += '星期日'; break;
                case 1: str += '星期一'; break;
                case 2: str += '星期二'; break;
                case 3: str += '星期三'; break;
                case 4: str += '星期四'; break;
                case 5: str += '星期五'; break;
                case 6: str += '星期六'; break;
            }
            str += ' , ';
            str += hours > 9 ? hours : 0 + '' + hours;
            str += ':'
            str += minutes > 9 ? minutes : (0 + '' + minutes);
            this.setState({ date: str })
        }, 30000)
    }

    logOut() {
        setCookie('user', '', -1);
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'logout',
                rpcname: 'user',
            },
            dataType: 'json',
            success: (res) => {
                window.location.href = '/';
            }
        })
    }

    render() {
        const { date } = this.state;
        const { query } = this.props.location;
        return (
            <div className="ying-view-admin-wrap">
                <div id="ying-vue-mange-wrap">
                    <div className="vue-mange-menu">
                        <div className="vue-mange-top">
                            <div className="photo">
                                <img src={window.hostname + this.userInfo.userPhoto} alt="" />
                            </div>
                            <div className="user-name">
                                {this.userInfo.nickName}
                            </div>
                        </div>
                        <ul className="vue-menu-list">
                            <Link to={{ pathname: '/admin/index', query }}>
                                <li className="vue-menu-item">
                                    <i className="iconfont icon-shouye" />
                                    <span className="menu-text">网站信息</span>
                                    <span className="mark"></span>
                                </li>
                            </Link>
                            <Link to={{ pathname: '/admin/setup', query }}>
                                <li className="vue-menu-item">
                                    <i className="iconfont icon-shezhi" />
                                    <span className="menu-text">基本设置</span>
                                    <span className="mark"></span>
                                </li>
                            </Link>
                            <Link to={{ pathname: '/admin/category', query }}>
                                <li className="vue-menu-item">
                                    <i className="iconfont icon-leimupinleifenleileibie" />
                                    <span className="menu-text">分类管理</span>
                                    <span className="mark"></span>
                                </li>
                            </Link>
                            <Link to={{ pathname: '/admin/book', query }}>
                                <li className="vue-menu-item">
                                    <i className="iconfont icon-xiangqing" />
                                    <span className="menu-text">专栏管理</span>
                                    <span className="mark"></span>
                                </li>
                            </Link>
                            <Link to={{ pathname: '/admin/artical', query }}>
                                <li className="vue-menu-item">
                                    <i className="iconfont icon-wenzhang" />
                                    <span className="menu-text">文章管理</span>
                                    <span className="mark"></span>
                                </li>
                            </Link>
                            <Link to={{ pathname: '/admin/user', query }}>
                                <li className="vue-menu-item">
                                    <i className="iconfont icon-yonghu" />
                                    <span className="menu-text">用户管理</span>
                                    <span className="mark"></span>
                                </li>
                            </Link>
                            <Link to={{ pathname: '/admin/email', query }}>
                                <li className="vue-menu-item">
                                    <i className="iconfont icon-message" />
                                    <span className="menu-text">系统信件</span>
                                    <span className="mark"></span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="vue-mange-content">
                        <div className="time-and-user">
                            <div className="time">{date}</div>
                            <div className="user">
                                <div className="photo"><img src={window.hostname + this.userInfo.userPhoto} alt="" /></div>
                                <div className="name">{this.userInfo.nickName}</div>
                                <div className="out" onClick={this.logOut.bind(this)}>退出</div>
                            </div>
                        </div>
                        <div className="content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// {this.props.children}
export default Admin;