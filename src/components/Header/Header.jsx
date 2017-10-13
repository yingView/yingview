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
            navs: []
        }
        this.nickName = getCookie('user') ? JSON.parse(getCookie('user')).nickname : null;
        this.queryNavList();
    }

    queryNavList() {
        Ajax.get({
            url: 'http://127.0.0.1:8080/query.json',
            data: {
                method: 'navlist'
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({ navs: content.navs });
                } else {
                    Dialog.info({ content: content.message });
                }
            }
        })
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
        const { navs } = this.state;
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
                            this.nickName ?
                                <div className="user-info">
                                    <div className="photo">
                                        <img src="" alt={this.nickName} className="user_photo" />
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
                                navs.map((item, idx) => (
                                    <li>
                                        <Link to={item.url} target={item.target}>{item.navname}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="publish" onSelectStart={() => { console.log(123) }}>
                            <div className="publish-text">发布作品</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;