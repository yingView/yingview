import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Ajax, Utils, Textarea, Button, Modal, Input, Select, Calendar, Radio, FileUpload } from 'yingview-form';

const { decodeHTML, deepCopy } = Utils;

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      data: deepCopy(props.data)
    }
  }

  render() {
    const { data, show } = this.state;
    return (
      <Modal
        show={this.state.show}
        width={'800px'}
        height={'auto'}
        onSubmit={() => {
          this.props.onSubmit && this.props.onSubmit(data);
          this.setState({ show: false });
        }}
        onCancel={() => {

        }}
      >
        <div className="edit-user-modal-warp">
          <h2 className="modal-title">编辑用户</h2>
          <div className="user-info-warp">
            <div className="user-info-item">
              <div className="info-title">用户名</div>
              <div className="info-content">
                <Input
                  value={data.userName}
                  onChange={(value) => {
                    data.userName = value;
                  }}
                />
              </div>
            </div>
            <div className="user-info-item">
              <div className="info-title">密码</div>
              <div className="info-content">
                <Input
                  value={data.password}
                  onChange={(value) => {
                    data.password = value;
                  }}
                />
              </div>
            </div>
          </div>
          <div className="user-info-warp">
            <div className="user-info-item">
              <div className="info-title">昵称</div>
              <div className="info-content">
                <Input
                  value={data.nickName}
                  onChange={(value) => {
                    data.nickName = value;
                  }}
                />
              </div>
            </div>
            <div className="user-info-item">
              <div className="info-title">Email</div>
              <div className="info-content">
                <Input
                  value={data.email}
                  onChange={(value) => {
                    data.email = value;
                  }}
                />
              </div>
            </div>
          </div>
          <div className="user-info-warp">
            <div className="user-info-item">
              <div className="info-title">职业</div>
              <div className="info-content">
                <Select
                  options={{ it: '互联网', eb: '电商', des: '设计' }}
                  value={data.userJob}
                  onChange={(value) => { data.userJob = value.key }}
                />
              </div>
            </div>
            <div className="user-info-item">
              <div className="info-title">权限</div>
              <div className="info-content">
                <Select
                  options={
                    {
                      "1": '普通会员',
                      "2": '普通会员2',
                      "3": '普通会员3',
                      "4": 'vip1',
                      "5": 'vip2',
                      "6": '管理员1',
                      "7": '管理员2',
                      "8": '高级管理',
                      "9": '超级管理员'
                    }
                  }
                  value={data.userPower}
                  onChange={(value) => { data.userPower = value.key }}
                />

              </div>
            </div>
          </div>
          <div className="user-info-warp">
            <div className="user-info-item">
              <div className="info-title">性别</div>
              <div className="info-content">
                <Radio
                  options={[{ key: 1, value: '男' }, { key: 0, value: '女' }]}
                  value={data.sax}
                  onChange={(value) => { data.sax = value.key }}
                />
              </div>
            </div>
            <div className="user-info-item">
              <div className="info-title">状态</div>
              <div className="info-content">
                <Radio
                  options={[
                    { key: 0, value: '未激活' },
                    { key: 1, value: '已激活' },
                    { key: 2, value: '封号' },
                    { key: 3, value: '封号2' }
                  ]}
                  value={data.userStatus}
                  onChange={(value) => { data.userStatus = value.key }}
                />
              </div>
            </div>
          </div>
          <div className="user-info-warp">
            <div className="user-info-item">
              <div className="info-title">等级</div>
              <div className="info-content">
                <Input
                  value={data.userLevel}
                  onChange={(value) => {
                    data.userLevel = value;
                  }}
                />
              </div>
            </div>
            <div className="user-info-item">
              <div className="info-title">出生年月</div>
              <div className="info-content">
                <Calendar
                  type={'text'}
                  value={data.bithday}
                  onChange={(value) => { data.bithday = value }}
                />
              </div>
            </div>
          </div>
          <div className="user-info-warp">
            <div className="user-info-item">
              <div className="info-title">电话</div>
              <div className="info-content">
                <Input
                  value={data.tel}
                  onChange={(value) => {
                    data.tel = value;
                  }}
                />
              </div>
            </div>
            <div className="user-info-item">
              <div className="info-title">城市</div>
              <div className="info-content">
                <Input
                  value={data.city || ''}
                  onChange={(value) => {
                    data.city = value;
                  }}
                />
              </div>
            </div>
          </div>

          <div className="user-info-warp">
            <div className="user-info-other">
              <div className="info-title">个性签名</div>
              <div className="info-oher">
                <Textarea
                  value={data.sign || ''}
                  width={'645px'}
                  height={'65px'}
                  onChange={(value) => {
                    data.sign = value;
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ height: '50px' }} />
        </div>
      </Modal>
    );
  }
}

EditUser.show = (props) => {
  props = props || {};
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<EditUser {...props} show />, div);
}

export default EditUser;