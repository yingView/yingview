import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pagination, Ajax, Utils } from 'yingview-form';
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
        Ajax.get({
            url: window.hostname + 'yingview.php',
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
                                        <img src={window.hostname + this.userInfo.photoImage} alt={this.userInfo.nickName} className="user_photo" />
                                        <ul className="nav">
                                            <Link to="/index/person" target="_blank"><li>个人中心</li></Link>
                                            <Link to="/index/person/setup" target="_blank"><li>账号设置</li></Link>
                                            <Link to="/index/person/artical" target="_blank"><li>作品管理</li></Link>
                                            <Link to="/index/person/comment" target="_blank"><li>评论管理</li></Link>
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
                                    <Link to={item.navUrl} target={item.navTarget}>
                                        <li>{item.navName}</li>
                                    </Link>
                                ))
                            }
                        </ul>
                        <div className="publish">
                            <Link to="/index/articaledit" target='_blank'>
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