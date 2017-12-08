import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button, Pagination, CheckBoxItem } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Email extends Component {
    render() {
        return (
            <div className="person-email-wrap">
                <div className="person-email-opera">
                    <Button
                        type={'submit'}
                        size={'small'}
                        text={'新建站内信'}
                    />
                    <Button
                        size={'small'}
                        text={'删除站内信'}
                    />
                </div>
                <table style={{ width: '100%' }}>
                    <tr className="person-email-title">
                        <th>
                            <CheckBoxItem
                                text='全选'
                                checked={true}
                                // onChange={(value) => { this.sendData.remain = value; }}
                            />
                        </th>
                        <th>标题</th>
                        <th>内容</th>
                        <th>时间</th>
                        <th>寄件人</th>
                    </tr>
                    <tr className="person-email-list">
                        <td>
                        <CheckBoxItem
                            text='全选'
                            checked={true}
                            // onChange={(value) => { this.sendData.remain = value; }}
                        />
                        </td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </table>
                <div className="person-email-pagination">
                    <Pagination
                        size={10}
                        current={1}
                        total={1}
                    />
                </div>
            </div>
        )
    }
}

module.exports = Email;