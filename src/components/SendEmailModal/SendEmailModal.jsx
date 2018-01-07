import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, Dialog, Ajax, Modal, Textarea } from 'yingview-form';

class SendEmailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    }
    this.data = props.data || {};
    this.read();
  }

  componentWillreceiveProps(nextProps) {
    this.data = nextProps.data || {};
    this.state.show = nextProps.show;
    this.render();
    this.read();
  }

  read() {
    // 已读邮件
    const { receiveUserCode, receiveName, type, emailCode, emailStatus } = this.props.data;
    if (type === 'view' && !receiveUserCode && !receiveName && emailStatus == 0) {
      Ajax.get({
        url: window.hostname + 'yingview.php',
        data: {
          rpcname: 'email',
          method: 'readEmail',
          emailCode,
          emailStatus: 1
        },
        dataType: 'json'
      })
    }
  }

  sendEmail(opera) {
    if (opera === 'submit') {
      this.data.emailStatus = 0;
    } else if (opera === 'save') {
      this.data.emailStatus = 2;
    }
    const { eamilTitle, eamilContent, emailStatus, sendUserCode, receiveUserCode, type, emailCode } = this.data;

    if (opera === 'cancel' || type === 'view') {
      this.setState({ show: false });
      return;
    }

    let message = null;
    if (!receiveUserCode && emailStatus != 2) {
      message = '请填写收件人';
    }
    if (!eamilContent) {
      message = '请填写内容';
    }
    if (!eamilTitle) {
      message = '请填写主题';
    }
    if (message) {
      return;
    }

    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'email',
        method: 'addEmail',
        sendUserCode,
        emailCode,
        receiveUserCode,
        eamilTitle,
        eamilContent,
        emailStatus
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          Dialog.success({ content: '发送成功！' });
        } else {
          Dialog.success({ content: '发送失败！' });
        }
      }
    })
  }

  render() {
    const { sendUserCode, receiveUserCode, receiveName, eamilContent, eamilTitle, type } = this.props.data;
    return (
      <Modal
        show={this.state.show}
        title={'写邮件'}
        width={'580px'}
        height={type === 'view' && !receiveUserCode && !receiveName ? '345px' : '410px'}
        submitText={type === 'view' ? '关闭' : '发送'}
        onSubmit={this.sendEmail.bind(this, 'submit')}
        otherButton={
          type === 'view' ? [] :
            [
              {
                text: '暂存',
                onClick: this.sendEmail.bind(this, 'save')
              },
              {
                text: '取消',
                onClick: this.sendEmail.bind(this, 'cancel')
              }
            ]
        }
      >
        <div className="ying-view-send-email">
          <table className="ying-view-email-wrap">
            {
              receiveName && receiveUserCode ?
                <tr className="email-line">
                  <td className="email-title">收件人</td>
                  {
                    type === 'view' ?
                      <td className="email-recevice">
                        <span style={{ lineHeight: '48px', color: '#24d0fb', cursor: 'pointer' }} onClick={() => { window.open('/#/index/person?operate=view&userCode=' + receiveUserCode, '_blakn') }}>
                          {receiveName}
                        </span>
                      </td> :
                      <td className="email-recevice">
                        <Input
                          value={receiveName}
                          disabled={type === 'view'}
                        />
                        <span style={{ lineHeight: '22px', color: '#24d0fb', cursor: 'pointer' }} onClick={() => { window.open('/#/index/person?operate=view&userCode=' + receiveUserCode, '_blakn') }}>
                          {receiveName}
                        </span>
                      </td>
                  }

                </tr> : null
            }
            <tr className="email-line">
              <td className="email-title">主题</td>
              <td className="email-recevice">
                <Input
                  value={eamilTitle}
                  onChange={(value) => { this.data.eamilTitle = value; }}
                  disabled={type === 'view'}
                />
              </td>
            </tr>
            <tr className="email-line">
              <td className="email-title">内容</td>
              <td className="email-recevice">
                <Textarea
                  width={'456px'}
                  height={'170px'}
                  disabled={type === 'view'}
                  value={eamilContent}
                  onChange={(value) => { this.data.eamilContent = value; }}
                />
              </td>
            </tr>
          </table>
        </div>
      </Modal>
    )
  }
}

Modal.defaultProps = {
  editreceive: true
};

SendEmailModal.show = (props) => {
  props = props || {};
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<SendEmailModal {...props} show />, div);
}

export default SendEmailModal;