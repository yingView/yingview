import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Ajax, Utils } from 'yingview-form';
const logo = require('./../../images/logo2.png');
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
                        <img src={this.systemInfo.logo2 ? (window.hostname + this.systemInfo.logo2) : logo} alt="logo2" />
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
                            <dd>{this.systemInfo.desc || '鹰视觉(yingview.com）,专业的电商设计师交流平台。最活跃的电商设计师学习交流分享社区。集原创作品+灵感图库+经验教程+设计专访+设计培训+社群活动为一体，全方位服务电商设计师。成立3年来，聚集20万电商设计师，定期线下设计沙龙，覆盖北京、上海、广州、杭州等城市，在电商设计领域收到广泛关注和好评。 我们是80，90电商设计师，不是淘宝美工---鹰视觉'}</dd>
                        </dl>
                    </div>
                </div>
                <div className="foot-line">
                    <div className="content-footer">
                        <span className="left">{this.systemInfo.markLeft || '©2017鹰视觉 (学习交流平台)'}</span>
                        <span className="right">{this.systemInfo.markRight || '网站建设中....'}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;