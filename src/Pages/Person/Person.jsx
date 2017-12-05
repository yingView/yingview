import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button } from 'yingview-form';
import { Link } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Person extends Component {
    render() {
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
                    <div className="user-part">
                        <div className="visit-content">
                            <h3 className="mark-title">最新关注</h3>
                            <ul className="mark-list">
                                <li className="user-item">
                                    <div className="user-item">
                                        <img src="" alt=""/>
                                    </div>
                                    <div className="user-item">
                                        <img src="" alt=""/>
                                    </div>
                                    <div className="user-item">
                                        <img src="" alt=""/>
                                    </div>
                                </li>
                                <li className="user-item">
                                    <div className="user-item">
                                        <img src="" alt=""/>
                                    </div>
                                    <div className="user-item">
                                        <img src="" alt=""/>
                                    </div>
                                    <div className="user-item">
                                        <img src="" alt=""/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="education">
                            <h3 className="education-title">过往经历</h3>
                            <ul className="education-list">
                                <li className="education-item">
                                    <p>2012-2013</p>
                                    <p>哈哈哈啊哈</p>
                                </li>
                            </ul>
                        </div>
                        <div className="myself">
                            <h3 className="education-title">关于我</h3>
                            <ul className="education-list">
                                <li className="education-item">
                                    <p>2012-2013</p>
                                    <p>哈哈哈啊哈</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="other-content">
                        <ul className="user-nav">
                            <Link to="/index/person/artical">
                                <li className="item">文章</li>
                            </Link>
                            <Link to="/index/person/special">
                                <li className="item">专栏</li>
                            </Link>
                            <Link to="/index/person/album">
                                <li className="item">相册</li>
                            </Link>
                            <Link to="/index/person/comment">
                                <li className="item">评论</li>
                            </Link>
                            <Link to="/index/person/fans">
                                <li className="item">粉丝</li>
                            </Link>
                            <Link to="/index/person/follow">
                                <li className="item">关注</li>
                            </Link>
                            <Link to="/index/person/setup">
                                <li className="item">个人信息</li>
                            </Link>
                            <Link to="/index/person/email">
                                <li className="item">站内信</li>
                            </Link>
                        </ul>
                        <div className="content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Person;