import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Ajax, Utils } from 'yingview-form';
const { getCookie } = Utils;
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.systemInfo = getCookie('systemInfo') ? JSON.parse(getCookie('systemInfo')) : {};
    }
    render() {
        return (
            <div id="ying-view-footer">
                <div className="content">
                    <div className="part-one">
                        <img src={window.hostname + this.systemInfo.logo2} alt="logo2" />
                        <span></span>
                    </div>
                    <div className="part-two">
                        <dl>
                            <dt>频道</dt>
                            <dd><a href="#">原创作品</a></dd>
                            <dd><a href="#">原创作品</a></dd>
                            <dd><a href="#">原创作品</a></dd>
                            <dd><a href="#">原创作品</a></dd>
                        </dl>
                        <dl>
                            <dt>频道</dt>
                            <dd><a href="#">原创作品</a></dd>
                            <dd><a href="#">原创作品</a></dd>
                            <dd><a href="#">原创作品</a></dd>
                            <dd><a href="#">原创作品</a></dd>
                        </dl>
                        <dl>
                            <dt>频道</dt>
                            <dd><a href="#">原创作品</a></dd>
                            <dd><a href="#">原创作品</a></dd>
                            <dd><a href="#">原创作品</a></dd>
                            <dd><a href="#">原创作品</a></dd>
                        </dl>
                    </div>
                    <div className="part-three">
                        <dl>
                            <dt>平台简介</dt>
                            <dd>{this.systemInfo.desc || ''}</dd>
                        </dl>
                    </div>
                </div>
                <div className="foot-line">
                    <div className="content-footer">
                        <span className="left">{this.systemInfo.markLeft || ''}</span>
                        <span className="right">{this.systemInfo.markRight || ''}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;