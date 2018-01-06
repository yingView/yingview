import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Clipboard from 'clipboard';
import { Radio, FileUpload, Ajax, Button, Pagination, Utils, Dialog, Input, Textarea } from 'yingview-form';

const { getCookie, deepCopy } = Utils;
require('./setup.less');

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [],
            bannerList: [],
            system: null,
            fileList: null,
            fileTotal: 0
        }
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
        this.current = 1;
        this.queryNavList();
        this.queryBannerList();
        this.querySystem();
        this.queryFile();
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
                    this.setState({
                        photoList: content.fileList,
                        total: content.total,
                        readOnly: this.state.readOnly
                    });
                }
            }
        })
    }

    querySystem() {
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                p: 'admin'
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({ system: content.system || {} });
                }
            }
        });
    }

    submitSystem() {
        const data = deepCopy(this.state.system);
        if (typeof data.logo === 'object') {
            data.logo = data.logo.viewAdd;
        }
        if (typeof data.logo2 === 'object') {
            data.logo2 = data.logo2.viewAdd;
        }
        Ajax.post({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'updateSystem',
                p: 'admin',
                system: JSON.stringify(data)
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.success({ content: content.message });
                } else {
                    Dialog.error({ content: content.message });
                }
            }
        });
    }

    queryBannerList() {
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'bannerList',
                p: 'admin'
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({ bannerList: content.bannerList });
                }
            }
        });
    }

    submitBanner() {
        Ajax.post({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'editBanner',
                p: 'admin',
                bannerList: JSON.stringify(this.state.bannerList)
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.success({ content: content.message });
                } else {
                    Dialog.error({ content: content.message });
                }
            }
        });
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
                }
            }
        });
    }

    submitNav() {
        Ajax.post({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'editNav',
                rpcname: 'nav',
                navList: JSON.stringify(this.state.navList)
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.success({ content: content.message });
                } else {
                    Dialog.error({ content: content.message });
                }
            }
        });
    }

    queryFile() {
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                p: 'admin',
                method: 'querySystemFile',
                size: 10,
                current: this.current
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({ fileList: content.fileList || {}, fileTotal: content.total });
                }
            }
        });
    }

    deleteFile(data) {
        Dialog.confirm({
            content: '确定要删除该图片?',
            submit: () => {
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
            }
        })
    }

    render() {
        const { navList, bannerList, system, fileList, fileTotal } = this.state;
        if (!system) {
            return <div />;
        }
        return (
            <div className="admin-setup-wrap">
                <div className="set-content">
                    <h3 style={{ padding: '10px', fontSize: '14px', color: '#000' }}>基本设置</h3>
                    <tr>
                        <td className="set-title">网站名称</td>
                        <td className="set-value">
                            <Input
                                value={system.name}
                                onChange={(value) => { system.name = value; }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="set-title">网站地址</td>
                        <td className="set-value">
                            <Input
                                value={system.host}
                                onChange={(value) => { system.host = value; }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="set-title">LOGO预览</td>
                        <td className="set-value">
                            <img src={window.hostname + system.logo.viewAdd} alt="" className="logo" />
                        </td>
                    </tr>
                    <tr>
                        <td className="set-title">网站LOGO</td>
                        <td className="set-value">
                            <FileUpload
                                text='上传LOGO'
                                showFiles={false}
                                tip={'图片尺寸： 313 * 49 px单个文件最大支持200k超过将无法显示'}
                                accept={['.jpg', '.jpeg', '.gif', '.png']}
                                data={[system.logo]}
                                params={{ type: 3 }}
                                onChange={(value) => {
                                    system.logo = value[value.length - 1].url;
                                    this.setState({ system })
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="set-title">平台简介</td>
                        <td className="set-value">
                            <Textarea
                                width="700px"
                                value={system.desc}
                                onChange={(value) => { system.desc = value; }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="set-title">底部标记-左</td>
                        <td className="set-value">
                            <Input
                                value={system.markLeft}
                                onChange={(value) => { system.markLeft = value; }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="set-title">底部标记-右</td>
                        <td className="set-value">
                            <Input
                                value={system.markRight}
                                onChange={(value) => { system.markRight = value; }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="set-title">底部LOGO</td>
                        <td className="set-value">
                            <FileUpload
                                text='上传LOGO'
                                tip={'图片尺寸： 136 * 64 px单个文件最大支持150k超过将无法显示'}
                                accept={['.jpg', '.jpeg', '.gif', '.png']}
                                params={{ type: 3 }}
                                data={[system.logo2]}
                                onChange={(value) => {
                                    system.logo2 = value[value.length - 1].url;
                                }}
                            />
                        </td>
                    </tr>
                    <div style={{ padding: '15px 0 15px 66px' }}>
                        <Button
                            size="small"
                            text="保存"
                            type="submit"
                            onClick={this.submitSystem.bind(this)}
                        />
                    </div>
                </div>
                <div className="set-content">
                    <h3 style={{ padding: '10px', fontSize: '14px', color: '#000' }}>导航设置</h3>
                    {
                        navList && navList.map((item, idx) => (
                            <tr>
                                <td className="set-title">导航{idx + 1}</td>
                                <td className="set-value">
                                    <div className="banner-image">
                                        <span className="title">导航名称:</span>
                                        <Input
                                            width="300px"
                                            value={item.navName}
                                            placeholder={'请输入链接地址'}
                                            onChange={(value) => { item.navName = value; }}
                                        />
                                        <span style={{ padding: '6px 0 0 20px' }}>
                                            <Radio
                                                value={item.navTarget}
                                                options={[{ key: '0', value: '新页面' }, { key: '1', value: "当前页面" }]}
                                                onChange={(value) => { item.navTarget = value.key; }}
                                            />
                                        </span>
                                    </div>
                                    <div className="banner-image">
                                        <span className="title">跳转链接:</span>
                                        <Input
                                            width="600px"
                                            placeholder={'请输入链接地址'}
                                            value={item.navUrl}
                                            onChange={(value) => { item.navUrl = value; }}
                                        />
                                    </div>
                                </td>
                                <td
                                    className="delete-btn"
                                    style={{ verticalAlign: 'middle' }}
                                    onClick={() => {
                                        navList.splice(idx, 1);
                                        this.setState({ navList });
                                    }}
                                >删除</td>
                            </tr>
                        ))
                    }

                    <div style={{ padding: '15px 0 15px 66px' }}>
                        <Button
                            size="small"
                            text="保存"
                            type="submit"
                            onClick={this.submitNav.bind(this)}
                        />
                        <Button
                            size="small"
                            text="添加"
                            onClick={() => {
                                navList.push({
                                    navIndex: '1',
                                    navName: '',
                                    navTarget: '0',
                                    navUrl: '/',
                                    parentId: '0'
                                });
                                this.setState({ navList });
                            }}
                        />
                    </div>
                </div>
                <div className="set-content">
                    <h3 style={{ padding: '10px', fontSize: '14px', color: '#000' }}>海报设置</h3>
                    {
                        bannerList && bannerList.map((item, idx) => (
                            <tr>
                                <td className="set-title">海报{idx + 1}</td>
                                <td className="set-value">
                                    <div className="banner-image">
                                        <span className="title">链接地址:</span>
                                        <Input
                                            width="600px"
                                            placeholder={'请输入链接地址'}
                                            value={item.toUrl}
                                            onChange={(value) => { item.toUrl = value; }}
                                        />
                                    </div>
                                    <div className="banner-image">
                                        <span className="title">图片地址:</span>
                                        <Input
                                            width="600px"
                                            placeholder={'请输入图片地址'}
                                            value={item.imgUrl}
                                            onChange={(value) => { item.imgUrl = value; }}
                                        />
                                    </div>
                                    <div className="banner-image">
                                        <span className="title">图片上传:</span>
                                        <FileUpload
                                            text='图片上传'
                                            showFiles={false}
                                            tip={'图片尺寸： 1200 * 399 px单个文件最大支持800k超过将无法显示'}
                                            accept={['.jpg', '.jpeg', '.gif', '.png']}
                                            params={{ type: 3 }}
                                            onChange={(value) => {
                                                item.imgUrl = value[value.length - 1].url;
                                                this.setState({ bannerList });
                                            }}
                                        />
                                    </div>
                                </td>
                                <td
                                    className="delete-btn"
                                    style={{ verticalAlign: 'middle' }}
                                    onClick={() => {
                                        bannerList.splice(idx, 1);
                                        this.setState({ bannerList });
                                    }}
                                >删除</td>
                            </tr>
                        ))
                    }
                    <div style={{ padding: '15px 0 15px 66px' }}>
                        <Button
                            size="small"
                            text="保存"
                            type="submit"
                            onClick={this.submitBanner.bind(this)}
                        />
                        <Button
                            size="small"
                            text="添加"
                            onClick={() => {
                                bannerList.push({
                                    imgUrl: '',
                                    toUrl: '',
                                });
                                this.setState({ navList });
                            }}
                        />
                    </div>
                </div>
                <div className="set-content">
                    <h3 style={{ padding: '10px', fontSize: '14px', color: '#000' }}>系统附件</h3>
                    {
                        fileList && fileList.map((item, idx) => (
                            <tr>
                                <td className="set-title">附件{idx + 1}</td>
                                <td className="file-img-td">
                                    <a href={window.hostname + item.download} target="_blank">
                                        <img className="file-img" src={window.hostname + item.url} alt="" />
                                    </a>
                                </td>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <span
                                        ref={c => {
                                            if (!c) {
                                                return;
                                            }
                                            const clipboard = new Clipboard(c, {
                                                text: () => (item.url)
                                            });
                                            clipboard.on('success', () => {
                                                Dialog.success({ content: '复制成功' });
                                            });
                                            clipboard.on('error', () => {
                                                Dialog.error({ content: '复制失败' });
                                            });
                                        }}
                                        className="delete-btn"
                                    >复制</span>
                                    <span
                                        className="delete-btn"
                                        onClick={this.deleteFile.bind(this, item)}
                                    >删除</span>
                                </td>
                            </tr>
                        ))
                    }
                    <div style={{ padding: '15px 0 15px 66px', textAlign: 'center' }}>
                        <Pagination
                            total={fileTotal}
                            size={10}
                            current={this.current}
                            onChange={(value) => { this.current = value; this.queryFile(); }}
                        />
                    </div>
                </div>
                <div className="set-content">
                    <h3 style={{ padding: '10px', fontSize: '14px', color: '#000' }}>友情关联</h3>
                    <tr>
                        <td className="set-title">网站标题</td>
                        <td className="set-value"><Input /></td>
                    </tr>
                    <tr>
                        <td className="set-title">网站LOGO</td>
                        <td className="set-value"><Input /></td>
                    </tr>
                    <tr>
                        <td className="set-title">LOGO预览</td>
                        <td className="set-value"><Input /></td>
                    </tr>
                    <tr>
                        <td className="set-title">网站描述</td>
                        <td className="set-value"><Input /></td>
                    </tr>
                    <div style={{ padding: '15px 0 15px 66px' }}>
                        <Button size="small" text="保存" type="submit" />
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Setup;