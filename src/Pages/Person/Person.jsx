import React, { Component } from 'react';
import { Button, Ajax, Utils, Textarea, Dialog } from 'yingview-form';
import { Link } from 'react-router';

const { getCookie, deepCopy } = Utils;
class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      focusList: [],
      editDesc: false,
      editExper: false,
      readOnly: false
    };
    this.newDesc = '';
    this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
  }

  componentDidMount() {
    const { userCode, operate } = this.props.location.query;
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'getUserInfo',
        rpcname: 'user',
        userCode
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          const focusList = [];
          let items = null;
          content.focusList.forEach((item, idx) => {
            if (idx % 3 === 0) {
              items = focusList[parseInt(idx / 3)] = [item];
            } else {
              items.push(item);
            }
          });
          if (operate === 'view' || userCode !== this.userInfo.userCode) {
            this.state.readOnly = true;
            this.props.location.query.readOnly = true;
          }
          if (content.userInfo) {
            for (const i in content.userInfo) {
              content.userInfo[i] = content.userInfo[i] === 'null' ? '' : content.userInfo[i];
            }
          }
          this.setState({
            userInfo: content.userInfo,
            focusList,
            readOnly: this.state.readOnly
          });
        }
      }
    });
  }

  updateUserInfo(origin) {
    if (this.state.userInfo.userCode !== this.userInfo.userCode) {
      return;
    }
    const data = deepCopy(this.state.userInfo);
    if (origin === 'experience') {
      if (data.description === this.newExper) {
        this.setState({ editExper: false });
        return;
      }
      data.experience = this.newExper;
    } else {
      if (data.description === this.newDesc) {
        this.setState({ editDesc: false });
        return;
      }
      data.description = this.newDesc;
    }
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'updateUserInfo',
        rpcname: 'user',
        userInfo: JSON.stringify(data)
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          Dialog.success({ content: content.message });
          if (origin === 'experience') {
            this.setState({ editExper: false, userInfo: data });
          } else {
            this.setState({ editDesc: false, userInfo: data });
          }
        } else {
          Dialog.info({ content: content.message });
        }
      }
    });
  }

  focusUser() {
    if (!this.userInfo.userCode) {
      Dialog.info({ content: '您还没有登录' });
      return;
    }
    if (this.userInfo.userCode === this.state.userInfo.userCode) {
      Dialog.info({ content: '你不能关注自己' });
      return;
    }
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'focus',
        method: 'addFocus',
        byFocusUserCode: this.state.userInfo.userCode,
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
    });
  }

  render() {
    const { userInfo, focusList, editDesc, editExper, readOnly } = this.state;
    const { query } = this.props.location;
    if (!userInfo) {
      return <div />;
    }
    this.newDesc = userInfo.description;
    this.newExper = userInfo.experience;
    return (
      <div id="ying-view-person">
        <div className="user-top">
          <div className="user-info">
            <div className="user-info-top">
              <div className="photo-name">
                <div className="photo">
                  <img src={window.hostname + userInfo.userPhoto} alt={userInfo.nickName} />
                </div>
                <div className="user-name">
                  {userInfo.nickName}
                </div>
              </div>
              <div className="infomation">
                <p>
                  <span>作品:</span>
                  <span>{userInfo.articalsNum || 0}</span>
                </p>
                <p>
                  <span>人气:</span>
                  <span>{userInfo.popularity || 0}</span>
                </p>
                <p>
                  <span>粉丝:</span>
                  <span>{userInfo.fansNum || 0}</span>
                </p>
              </div>
            </div>
            <div className="user-desc">
              {userInfo.sign}
            </div>
            <div className="address">
              <i className="iconfont icon-location" />
              <span>{userInfo.city}</span>
            </div>
            <div className="operate">
              <Button
                text={'关 注'}
                size={'small'}
                type={'submit'}
                disabled={!readOnly}
                onClick={this.focusUser.bind(this)}
              />
              <Button
                text={'私 信'}
                disabled={!readOnly}
                size={'small'}
              />
            </div>
          </div>
          <div className="user-banner">
            <img src={window.hostname + userInfo.userBanner} alt={userInfo.nickName} />
          </div>
        </div>
        <div className="user-content">
          <div className="user-part">
            <div className="visit-content">
              <h3 className="mark-title">最新关注</h3>
              <ul className="mark-list">
                {
                  focusList.map((list, idx) => (
                    <li className="user-item" key={idx}>
                      {
                        list.map((item, i) => (
                          <div className="user-item" key={i}>
                            <Link to={{ pathname: '/index/person', query: { userCode: item.userCode, operate: 'view' } }} target={'_blank'}>
                              <img src={window.hostname + item.userBanner} alt={item.nickName} title={item.nickName} />
                              <div className="nick-name">{item.nickName}</div>
                            </Link>
                          </div>
                        ))
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="education">
              <div className="title-and-opera clearfix">
                <h3 className="education-title">
                  <i className="iconfont icon-fengfulvli" />
                  <span>过往经历</span>
                </h3>
                {
                  readOnly ? null :
                    (<div className="edit-btn-icon" onClick={() => { this.setState({ editExper: true }) }}>
                      <i className="iconfont icon-bi" />
                    </div>)
                }
              </div>
              {
                editExper ?
                  <div className="edit-description">
                    <Textarea
                      width={'280px'}
                      value={userInfo.experience}
                      onChange={(value) => { this.newExper = value; }}
                    />
                    <div className="edit-description-button">
                      <Button
                        size={'small'}
                        text={'确定'}
                        type={'submit'}
                        onClick={this.updateUserInfo.bind(this, 'experience')}
                      />
                      <Button
                        size={'small'}
                        text={'取消'}
                        onClick={() => { this.setState({ editExper: false }); }}
                      />
                    </div>
                  </div> :
                  <ul className="education-list">
                    <li className="education-item">
                      <pre>{userInfo.experience}</pre>
                    </li>
                  </ul>
              }
            </div>
            <div className="myself clearfix">
              <div className="title-and-opera clearfix">
                <h3 className="education-title">
                  <i className="iconfont icon-my" />
                  <span>关于我</span>
                </h3>
                {
                  readOnly ? null :
                    (<div className="edit-btn-icon" onClick={() => { this.setState({ editDesc: true }) }}>
                      <i className="iconfont icon-bi" />
                    </div>)
                }
              </div>
              {
                editDesc ?
                  <div className="edit-description">
                    <Textarea
                      width={'280px'}
                      value={userInfo.description}
                      onChange={(value) => { this.newDesc = value; }}
                    />
                    <div className="edit-description-button">
                      <Button
                        size={'small'}
                        text={'确定'}
                        type={'submit'}
                        onClick={this.updateUserInfo.bind(this, 'description')}
                      />
                      <Button
                        size={'small'}
                        text={'取消'}
                        onClick={() => { this.setState({ editDesc: false }); }}
                      />
                    </div>
                  </div> :
                  <ul className="education-list">
                    <li className="education-item">
                      <pre>{userInfo.description}</pre>
                    </li>
                  </ul>
              }
            </div>
          </div>
          <div className="other-content">
            <ul className="user-nav">
              <Link to={{ pathname: '/index/person/artical', query }}>
                <li className={!query.route || query.route === 'artical' ? 'item active' : 'item'}>文章</li>
              </Link>
              <Link to={{ pathname: '/index/person/special', query }}>
                <li className={query.route === 'special' ? 'item active' : 'item'}>专栏</li>
              </Link>
              {
                readOnly ? null :
                  (<Link to={{ pathname: '/index/person/album', query }}>
                    <li className={query.route === 'album' ? 'item active' : 'item'}>图片</li>
                  </Link>)
              }
              <Link to={{ pathname: '/index/person/comment', query }}>
                <li className={query.route === 'comment' ? 'item active' : 'item'}>评论</li>
              </Link>
              <Link to={{ pathname: '/index/person/fans', query }}>
                <li className={query.route === 'fans' ? 'item active' : 'item'}>粉丝</li>
              </Link>
              <Link to={{ pathname: '/index/person/focus', query }}>
                <li className={query.route === 'focus' ? 'item active' : 'item'}>关注</li>
              </Link>
              <Link to={{ pathname: '/index/person/setup', query }}>
                <li className={query.route === 'setup' ? 'item active' : 'item'}>个人信息</li>
              </Link>
              {
                readOnly ? null :
                  (<Link to={{ pathname: '/index/person/email', query }}>
                    <li className={query.route === 'email' ? 'item active' : 'item'}>站内信</li>
                  </Link>)
              }
            </ul>
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Person;
