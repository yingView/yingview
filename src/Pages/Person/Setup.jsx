import React, { Component } from 'react';
import { Radio, Button, Textarea, Input, Select, Calendar, Utils, Ajax, Dialog } from 'yingview-form';

const { setCookie, getCookie } = Utils;

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      readOnly: false
    };
    this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
    this.queryData();
  }

  queryData() {
    const { userCode, operate } = this.props.location.query;
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'getUserInfo',
        rpcname: 'user',
        userCode,
        concurrent: true
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          if (operate === 'view' || userCode !== this.userInfo.userCode) {
            this.state.readOnly = true;
          }
          this.setState({
            userInfo: content.userInfo,
            readOnly: this.state.readOnly
          });
        }
      }
    });
  }

  submit() {
    const { userInfo } = this.state;
    if (userInfo.userCode !== this.userInfo.userCode) {
      return;
    }
    let message = null;
    if (!userInfo.email) {
      message = '请填邮箱';
    }
    if (!userInfo.userName) {
      message = '请填写用户名';
    }
    if (!userInfo.nickName) {
      message = '请填写昵称';
    }
    if (message) {
      Dialog.info({ content: message });
      return;
    }
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'updateUserInfo',
        rpcname: 'user',
        userInfo: JSON.stringify(userInfo)
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          const cookie = {
            nickName: content.userInfo.nickName,
            userName: content.userInfo.userName,
            passCode: userInfo.passCode,
            userPhoto: userInfo.userPhoto,
            userCode: userInfo.userCode,
            userJob: content.userInfo.userJob,
            userPower: content.user.userPower,
            userStatus: content.user.userStatus,
            userLevel: content.user.userLevel
          };
          const time = 1000 * 60 * 60;
          setCookie('user', JSON.stringify(cookie), time);
          Dialog.success({ content: content.message, submit: () => { window.location.href = '/#/index/person/artical?userCode=' + userInfo.userCode; } });
        } else {
          Dialog.info({ content: content.message });
        }
      }
    });
  }

  render() {
    const { userInfo, readOnly } = this.state;
    if (!userInfo) {
      return <div />;
    }
    return (
      <div className="person-setup-wrap">
        <div className="person-setup-content">
          <div className="person-setup-content-wrap">
            <ul className="person-setup-left">
              <li className="person-setup-item">
                <span>用户名:</span>
                <Input
                  width={'270px'}
                  type={'text'}
                  value={userInfo.userName}
                  disabled
                  onChange={(value) => { userInfo.userName = value; }}
                />
              </li>
              <li className="person-setup-item">
                <span>昵称:</span>
                <Input
                  width={'270px'}
                  type={'text'}
                  value={userInfo.nickName}
                  disabled={readOnly}
                  onChange={(value) => { userInfo.nickName = value; }}
                />
              </li>
              <li className="person-setup-item">
                <span>性别:</span>
                <Radio
                  options={[{ key: 1, value: '男' }, { key: 0, value: '女' }]}
                  value={userInfo.sax}
                  disabled={readOnly}
                  onChange={(value) => { userInfo.sax = value.key; }}
                />
              </li>
              {
                readOnly ? null :
                  (<li className="person-setup-item">
                    <span>出生年月:</span>
                    <Calendar
                      width={'270px'}
                      type={'text'}
                      value={userInfo.bithday}
                      disabled={readOnly}
                      onChange={(value) => { userInfo.bithday = value; }}
                    />
                  </li>)
              }
            </ul>
            <ul className="person-setup-right">
              {
                readOnly ? null :
                  (<li className="person-setup-item">
                    <span>邮箱地址:</span>
                    <Input
                      width={'270px'}
                      type={'email'}
                      disabled={readOnly}
                      value={userInfo.email}
                      onChange={(value) => { userInfo.email = value; }}
                    />
                  </li>)
              }
              <li className="person-setup-item">
                <span>所在城市:</span>
                <Input
                  width={'270px'}
                  type={'text'}
                  value={userInfo.city}
                  disabled={readOnly}
                  onChange={(value) => { userInfo.city = value; }}
                />
              </li>
              {
                readOnly ? null :
                  (<li className="person-setup-item">
                    <span>电话号码:</span>
                    <Input
                      width={'270px'}
                      type={'tel'}
                      value={userInfo.tel}
                      disabled={readOnly}
                      onChange={(value) => { userInfo.tel = value; }}
                    />
                  </li>)
              }
              <li className="person-setup-item">
                <span>从事工作:</span>
                <Select
                  options={{ it: '互联网', eb: '电商', des: '设计' }}
                  width={'270px'}
                  value={userInfo.userJob}
                  disabled={readOnly}
                  onChange={(value) => { userInfo.userJob = value.key; }}
                />
              </li>
            </ul>
          </div>
          <div className="person-setup-content-other">
            <div className="person-setup-item">
              <span>个性签名:</span>
              <Textarea
                width={'674px'}
                height={'70px'}
                value={userInfo.sign}
                disabled={readOnly}
                onChange={(value) => { userInfo.sign = value; }}
              />
            </div>
          </div>
          {
            readOnly ? null :
              (<div className="person-setup-button">
                <Button
                  type={'submit'}
                  size={'small'}
                  text={'保 存'}
                  onClick={this.submit.bind(this)}
                />
              </div>)
          }
        </div>
      </div>
    );
  }
}

module.exports = Setup;
