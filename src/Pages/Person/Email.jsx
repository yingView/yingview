import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Radio, FileUpload, Button, Pagination, CheckBoxItem, Utils, Ajax, Dialog } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SendEmailModal from '../../components/SendEmailModal';

const { getCookie } = Utils;

class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailList: [],
            total: 0,
            page: 'receive'
        }
        this.emaildCodes = [];
        this.current = 1;
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
        this.type = 'receive';
        this.queryData();
    }

    queryData(type) {
        if (type) {
            this.type = type;
            this.setState({ page: type });
        }
        let { userCode, operate } = this.props.location.query;
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'queryEmail',
                rpcname: 'email',
                type: this.type,
                userCode: userCode,
                current: this.current,
                size: 10
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({
                        emailList: content.emailList,
                        total: content.total
                    });
                }
            }
        })
    }

    selectAll(value) {
        this.emaildCodes = [];
        if (this.state.emailList && this.state.emailList.length) {
            this.state.emailList && this.state.emailList.forEach((item) => {
                if (value) {
                    this.emaildCodes.push(item.emailCode);
                }
                item.checked = value;
            });
            this.setState({ emailList: this.state.emailList });
        }
    }

    formatDate(time) {
        const createDate = new Date(time * 1000);
        const Y = createDate.getFullYear();
        const M = createDate.getMonth() + 1;
        const D = createDate.getDate();
        const h = createDate.getHours();
        const m = createDate.getMinutes();
        const s = createDate.getSeconds();
        return `${Y}-${M < 10 ? '0' + M : M}-${D < 10 ? '0' + D : D} ${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    }

    sendEmail(data) {
        SendEmailModal.show({
            data
        })
    }

    withdrawEmail(emailCode) {
        Dialog.confirm({
            content: '确定要撤回该邮件?',
            submit: () => {
                Ajax.get({
                    url: window.hostname + 'yingview.php',
                    data: {
                        method: 'withdrawEmail',
                        rpcname: 'email',
                        emailCode
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
                })
            },
            cancel: () => { }
        })
    }

    delete(emailCodes) {
        Dialog.confirm({
            content: '确定要删除该邮件?',
            submit: () => {
                Ajax.get({
                    url: window.hostname + 'yingview.php',
                    data: {
                        method: 'deleteEmail',
                        rpcname: 'email',
                        emailCodes: JSON.stringify(emailCodes)
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
                })
            },
            cancel: () => { }
        })
    }

    render() {
        const { page, total, emailList } = this.state;
        return (
            <div className="person-email-wrap">
                <div className="person-email-opera">
                    <Button
                        type={page === 'receive' && 'submit'}
                        size={'small'}
                        text={'收件箱'}
                        onClick={this.queryData.bind(this, 'receive')}
                    />
                    <Button
                        type={page === 'send' && 'submit'}
                        size={'small'}
                        text={'已发送'}
                        onClick={this.queryData.bind(this, 'send')}
                    />
                    <Button
                        type={page === 'draft' && 'submit'}
                        size={'small'}
                        text={'草稿箱'}
                        onClick={this.queryData.bind(this, 'draft')}
                    />
                    <Button
                        size={'small'}
                        onClick={this.sendEmail.bind(this, {})}
                        text={'新建站内信'}
                    />
                    {
                        page === 'receive' ?
                            <Button
                                size={'small'}
                                text={'删除站内信'}
                                onClick={() => {
                                    if (this.emaildCodes && this.emaildCodes.length) {
                                        this.delete(this.emaildCodes);
                                    }
                                }}
                            /> : null
                    }
                </div>
                <table style={{ width: '100%' }}>
                    <tr className="person-email-title">
                        <th>
                            <CheckBoxItem
                                text='全选'
                                onChange={this.selectAll.bind(this)}
                            />
                        </th>
                        <th>标题</th>
                        {
                            page === 'receive' ? <th>寄件人</th> : <th>收件人</th>
                        }
                        <th>时间</th>
                        <th>操作</th>
                    </tr>
                    {
                        emailList && emailList.length ? emailList.map((item) => (
                            <tr className="person-email-list">
                                <td>
                                    <CheckBoxItem
                                        text='邮件'
                                        checked={item.checked}
                                        onChange={(value) => {
                                            item.checked = value;
                                            if (value) {
                                                this.emaildCodes.push(item.emailCode);
                                            } else {
                                                const arr = [];
                                                this.emaildCodes.forEach(emailCode => {
                                                    if (emailCode !== item.emailCode) {
                                                        arr.push(emailCode);
                                                    }
                                                });
                                                this.emaildCodes = arr;
                                            }
                                        }}
                                    />
                                </td>
                                <td onClick={this.sendEmail.bind(this, {
                                    receiveUserCode: page === 'receive' ? '' : item.userCode,
                                    receiveName: page === 'receive' ? '' : item.nickName,
                                    eamilContent: item.eamilContent,
                                    eamilTitle: item.eamilContent,
                                    emailCode: item.emailCode,
                                    type: 'view',
                                    emailStatus: item.emailStatus
                                })} style={{ color: '#24d0fb' }}>{item.eamilTitle}</td>
                                <td>
                                    <Link to={{ pathname: '/index/person', query: { userCode: item.userCode, operate: 'view' } }} target='_blank'>
                                        <span style={{ color: '#24d0fb' }}>{item.nickName}</span>
                                    </Link>
                                </td>
                                <td>{this.formatDate(item.emailCreateDate)}</td>
                                <td>
                                    {
                                        page !== 'draft' ?
                                            <a
                                                href="javascript:;"
                                                className="operate"
                                                onClick={this.sendEmail.bind(this, {
                                                    receiveUserCode: page === 'receive' ? '' : item.userCode,
                                                    receiveName: page === 'receive' ? '' : item.nickName,
                                                    eamilContent: item.eamilContent,
                                                    eamilTitle: item.eamilContent,
                                                    emailCode: item.emailCode,
                                                    type: 'view',
                                                    emailStatus: item.emailStatus
                                                })}
                                            >查看</a> : null
                                    }
                                    {
                                        page === 'draft' ?
                                            <a
                                                href="javascript:;"
                                                className="operate"
                                                onClick={this.sendEmail.bind(this, {
                                                    sendUserCode: this.userInfo.userCode,
                                                    receiveUserCode: page === 'receive' ? '' : item.userCode,
                                                    receiveName: page === 'receive' ? '' : item.nickName,
                                                    eamilContent: item.eamilContent,
                                                    eamilTitle: item.eamilContent,
                                                    emailCode: item.emailCode
                                                })}
                                            >编辑</a> : null
                                    }
                                    {
                                        page === 'send' ?
                                            <a
                                                href="javascript:;"
                                                className="operate"
                                                onClick={this.withdrawEmail.bind(this, item.emailCode)}
                                            >撤回</a> : null
                                    }
                                    {
                                        page === 'receive' ?
                                            <a
                                                href="javascript:;"
                                                className="operate"
                                                onClick={this.sendEmail.bind(this, {
                                                    sendUserCode: this.userInfo.userCode,
                                                    receiveUserCode: item.userCode,
                                                    receiveName: item.nickName
                                                })}
                                            >回复</a> : null

                                    }
                                    {
                                        page !== 'send' ?
                                            <a
                                                href="javascript:;"
                                                className="operate"
                                                onClick={this.delete.bind(this, [item.emailCode])}
                                            >删除</a> : null
                                    }
                                </td>
                            </tr>
                        )) : <tr><td colSpan='5' style={{ textAlign: 'center' }}>没有邮件</td></tr>
                    }
                </table>
                <div className="person-email-pagination">
                    <Pagination
                        size={10}
                        current={this.current}
                        total={total}
                        onChange={(value) => { this.current = value; this.queryData() }}
                    />
                </div>
            </div>
        )
    }
}

module.exports = Email;