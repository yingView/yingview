import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Input, Button, Dialog, Ajax, Utils, Modal, Textarea } from 'yingview-form';
const { setCookie, getCookie } = Utils;


class SendEmailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show
        }
        this.data = {};
    }

    sendEmail(opera) {
        if (opera === 'cancel') {
            this.setState({ show: false});
            return;
        }
        if (opera === 'submit') {
            this.data.emailStatus = 0;
        } else if (opera === 'save') {
            this.data.emailStatus = 2;
        }
        const { sendUserCode, ReceiveUserCode } = this.props;
        const { eamilTitle, eamilContent, emailStatus } = this.data;

        let message = null;
        if (!ReceiveUserCode && emailStatus != 2) {
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
                ReceiveUserCode,
                eamilTitle,
                eamilContent,
                emailStatus
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.success({ content: '发送成功！'});
                } else {
                    Dialog.success({ content: '发送失败！'});
                }
            }
        })
    }

    render() {
        const { sendUserCode, ReceiveUserCode, editReceive, receiveName } = this.props;
        return (
            <Modal
                show={this.state.show}
                title={'写邮件'}
                width={'580px'}
                height={'410px'}
                onSubmit={this.sendEmail.bind(this, 'submit')}
                otherButton={[
                    {
                        text: '暂存',
                        onClick: this.sendEmail.bind(this, 'save')
                    },
                    {
                        text: '取消',
                        onClick: this.sendEmail.bind(this, 'cancel')
                    }
                ]}
            >
                <div className="ying-view-send-email">
                    <table className="ying-view-email-wrap">
                        <tr className="email-line">
                            <td className="email-title">收件人</td>
                            <td className="email-recevice">
                                {
                                    editReceive ? <Input /> :
                                        <span style={{ lineHeight: '48px', color: '#24d0fb' }} onClick={() => { window.open('/#/index/person?operate=view&userCode=' + ReceiveUserCode, '_blakn') }}>
                                            {receiveName}
                                        </span>
                                }

                            </td>
                        </tr>
                        <tr className="email-line">
                            <td className="email-title">主题</td>
                            <td className="email-recevice">
                                <Input
                                    onChange={(value) => { this.data.eamilTitle = value; }}
                                />
                            </td>
                        </tr>
                        <tr className="email-line">
                            <td className="email-title">内容</td>
                            <td className="email-recevice">
                                <Textarea
                                    width={'456px'}
                                    height={'170px'}
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
    editReceive: true
};

SendEmailModal.show = (props) => {
    props = props || {};
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<SendEmailModal {...props} show />, div);
}

export default SendEmailModal;