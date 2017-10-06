import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
const logo = require('./../../images/logo.jpg');
class Header extends Component {
    render() {
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
                        <Link to="login">
                            <button className="login">登录</button>
                        </Link>
                        <Link to="register">
                            <button className="resgister">注册</button>
                        </Link>
                    </div>
                </div>
                <div className="ying-nav">
                    <div className="nav-wrap">
                        <ul className="nav">
                            <li><a href="#">首页</a></li>
                            <li><a href="#">原创文章</a></li>
                            <li><a href="#">经验教程</a></li>
                            <li><a href="#">人气榜</a></li>
                            <li><a href="#">欣赏</a></li>
                            <li><a href="#">商城</a></li>
                            <li><a href="#">图库</a></li>
                            <li><a href="#">更多</a></li>
                            <li><a href="#">首页</a></li>
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