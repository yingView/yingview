import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pagination, Ajax, Utils } from 'yingview-ui';
import { Link } from 'react-router';
const { getCookie, setCookie } = Utils;
const logo = require('./../../images/logo.jpg');
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: []
        }
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : null;
        this.queryNavList();
    }

    queryNavList() {
        Ajax.post({
            url: 'http://127.0.0.1:8080/query.json',
            data: {
                method: 'navlist'
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({ navList: content.navList });
                } else {
                    Dialog.info({ content: content.message });
                }
            }
        });
    }

    logOut() {
        setCookie('user', '', -1);
        Ajax.get({
            url: 'http://127.0.0.1:8080/user.json',
            data: {
                method: 'logout'
            },
            dataType: 'json',
            success: (res) => {
                window.location.href = '/';
            }
        })
    }
    render() {
        const { navList } = this.state;
        return (
            <div id="ying-view-header">
                <div className="logo-title">
                    <div className="logo-name">
                        <a href="#"><img src={logo} alt="login" /></a>
                    </div>
                    <div className="search-part">
                        <div className="select">
                            <span>全站</span><span className="icon"></span>
                        </div>
                        <input type="text" className="search-input" />
                        <button className="search-botton">
                            <span></span>
                        </button>
                    </div>
                    <div className="login-or-sign">
                        {
                            this.userInfo ?
                                <div className="user-info">
                                    <div className="photo">
                                        <img src={this.userInfo.photoadd} alt={this.userInfo.nickName} className="user_photo" />
                                        <ul className="nav">
                                            <li>个人中心</li>
                                            <li>账号设置</li>
                                            <li>作品管理</li>
                                            <li onClick={this.logOut.bind(this)}>退出</li>
                                        </ul>
                                    </div>
                                </div> :
                                <div>
                                    <Link to="login">
                                        <button className="login">登录</button>
                                    </Link>
                                    <Link to="register" target='_blank'>
                                        <button className="resgister">注册</button>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
                <div className="ying-nav">
                    <div className="nav-wrap">
                        <ul className="nav">
                            {
                                navList.map((item, idx) => (
                                    <li>
                                        <Link to={item.url} target={item.target}>{item.navname}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="publish">
                            <Link to="/index/person/articaledit" target='_blank'>
                                <div className="publish-text">发布作品</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;