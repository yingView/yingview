import React, { Component } from 'react';
import { Ajax, Utils, Dialog } from 'yingview-form';
import { Link } from 'react-router';

const logo = require('./../../images/logo.jpg');

const { getCookie, setCookie } = Utils;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: []
    }
    this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
    this.systemInfo = getCookie('systemInfo') ? JSON.parse(getCookie('systemInfo')) : {};
    this.queryNavList();
  }

  queryNavList() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'navlist',
        rpcname: 'nav'
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

  searchBtn() {
    if (!this.queryData && this.queryData !== '0') {
      return;
    }
    window.open('/#/index/searchlist?keyword=' + encodeURIComponent(this.queryData), '_blank');
  }

  logOut() {
    setCookie('user', '', -1);
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'logout',
        rpcname: 'user'
      },
      dataType: 'json',
      success: (res) => {
        window.location.href = '/';
      }
    });
  }
  render() {
    const { navList } = this.state;
    return (
      <div id="ying-view-header">
        <div className="logo-title">
          <div className="logo-name">
            <a href="#"><img src={this.systemInfo.logo ? (window.hostname + this.systemInfo.logo) : logo} alt="login" /></a>
          </div>
          <div className="search-part">
            <div className="select">
              <span>文章</span><span className="icon" />
            </div>
            <input
              type="text"
              className="search-input"
              placeholder={'请输入...'}
              onChange={(e) => {
                this.queryData = e.target.value;
              }}
            />
            <button
              className="search-botton"
              onClick={this.searchBtn.bind(this)}
            >
              <span />
            </button>
          </div>
          <div className="login-or-sign">
            {
              this.userInfo.userPhoto ?
                <div className="user-info">
                  <div className="photo">
                    <img src={window.hostname + this.userInfo.userPhoto} alt={this.userInfo.nickName} className="user_photo" />
                    <ul className="nav">
                      <Link to={{ pathname: '/index/person', query: { userCode: this.userInfo.userCode, operate: 'edit' } }} target="_blank"><li>个人中心</li></Link>
                      <Link to={{ pathname: '/index/person/setup', query: { userCode: this.userInfo.userCode, operate: 'edit' } }} target="_blank"><li>账号设置</li></Link>
                      <Link to={{ pathname: '/index/person/artical', query: { userCode: this.userInfo.userCode, operate: 'edit' } }} target="_blank"><li>作品管理</li></Link>
                      <Link to={{ pathname: '/index/person/comment', query: { userCode: this.userInfo.userCode, operate: 'edit' } }} target="_blank"><li>评论管理</li></Link>
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
                  <Link key={idx} to={item.navUrl} target={item.navTarget === '0' ? '_blank' : 'self'}>
                    <li>{item.navName}</li>
                  </Link>
                ))
              }
            </ul>
            <div className="publish">
              <Link to="/index/articaledit" target={'_blank'}>
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
