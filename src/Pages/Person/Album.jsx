import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Clipboard from 'clipboard';
import { Radio, FileUpload, Ajax, Button, Pagination, Utils, Dialog } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { getCookie } = Utils;

class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoList: null,
            readOnly: false,
            total: 0
        }
        this.current = 1;
        this.size = 16;
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : null;
        this.queryData();
    }

    queryData() {
        let { userCode, operate } = this.props.location.query;
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'queryByUserCode',
                rpcname: 'file',
                userCode: userCode,
                current: this.current,
                size: this.size,
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    if (operate === 'view' || userCode !== this.userInfo.userCode) {
                        this.state.readOnly = true;
                        this.props.location.query.readOnly = true;
                    }
                    this.setState({
                        photoList: content.fileList,
                        total: content.total,
                        readOnly: this.state.readOnly
                    });
                }
            }
        })
    }

    delete(data) {
        Dialog.warn({
            content: '确定要删除该图片?',
            submit: () => {
                if (this.userInfo.userCode !== data.userCode) {
                    Dialog.error({ content: '您没有权限进行该操作' });
                    return;
                }
                Ajax.get({
                    url: window.hostname + 'yingview.php',
                    data: {
                        method: 'deleteByFileCode',
                        rpcname: 'file',
                        fileCode: data.fileCode,
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
        const { photoList, readOnly, total } = this.state;
        return (
            <div className="person-album-wrap">
                <ul className="person-album-list clearfix">
                    {
                        photoList && photoList.length ? photoList.map((photo, index) => (
                            <li className="person-album-item">
                                <img className="ablum-photo" src={window.hostname + photo.url} alt={photo.fileName} />
                                <p className="photo-operate">
                                    <span>
                                        <a href={window.hostname + photo.download} target={'_blank'}><i className="iconfont icon-xiazai" /></a>
                                    </span>
                                    <span>
                                        <i
                                            ref={c => {
                                                if (!c) {
                                                    return;
                                                }
                                                const clipboard = new Clipboard(c, {
                                                    text: () => (window.hostname + photo.url)
                                                });
                                                clipboard.on('success', () => {
                                                    Dialog.success({ content: '复制成功' });
                                                });
                                                clipboard.on('error', () => {
                                                    Dialog.error({ content: '复制失败' });
                                                });
                                            }}
                                            className="iconfont icon-fuzhi"
                                        />
                                    </span>
                                    <span>
                                        <i
                                            className="iconfont icon-shanchu"
                                            onClick={this.delete.bind(this, photo)}
                                        />
                                    </span>
                                </p>
                            </li>
                        )) :
                            <li className="person-album-empty">
                                暂无图片
                            </li>
                    }
                </ul>
                <div className="person-album-pagination">
                    <Pagination
                        size={this.size}
                        current={this.current}
                        total={total}
                        onChange={(value) => { this.current = value; this.queryData() }}
                    />
                </div>
            </div>
        )
    }
}

module.exports = Album;