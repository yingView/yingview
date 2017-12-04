import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Person extends Component {
    render() {
        console.log(this.props);
        return (
            <div id="ying-view-person">
                <div className="user-top">
                    <div className="user-info">
                        <div className="user-info-top">
                            <div className="photo-name">
                                <div className="photo">
                                    <img src="" alt="photo" />
                                </div>
                                <div className="user-name">
                                    徐志飞
                                </div>
                            </div>
                            <div className="infomation">
                                <p>
                                    <span>作品:</span>
                                    <span>6691</span>
                                </p>
                                <p>
                                    <span>人气:</span>
                                    <span>6691</span>
                                </p>
                                <p>
                                    <span>粉丝:</span>
                                    <span>6691</span>
                                </p>
                            </div>
                        </div>
                        <div className="user-desc">
                            传奇写下第一个篇章，英雄也和我们一样
                        </div>
                        <div className="address">
                            黑龙江-哈尔滨
                        </div>
                        <div className="operate">
                            <button>关注</button>
                            <button>私信</button>
                        </div>
                    </div>
                    <div className="user-banner">
                        <img src="" alt="banber" />
                    </div>
                </div>
                <div className="user-content">
                    <div className="content">
                        123131
                    </div>
                </div>
            </div>
        )
    }
}

export default Person;