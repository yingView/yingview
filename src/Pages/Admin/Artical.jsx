import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Ajax, Button, Utils, Dialog } from 'yingview-form';

const { getCookie } = Utils;
require('./artical.less');

class Artical extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.current = 1;
        this.size = 16;
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
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
    render() {
        const { photoList, readOnly, total } = this.state;
        return (
            <div className="admin-artical-wrap">
               45478
            </div>
        )
    }
}

module.exports = Artical;