import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button, Pagination, Ajax } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Artical extends Component {
    render() {
        return (
            <div className="person-artical-wrap">
                <ul className="person-artical-list">
                    <li className="person-artical-item">
                        <div className="person-artical-photo">
                            <img src="" alt=""/>
                        </div>
                        <div className="person-artical-content">
                            <div className="person-artical-title">
                                <h3>文章标题</h3>
                                <p><span className="title">创作时间:</span><span className="value">2017-11-10</span></p>
                                <p><span className="title">查看:</span><span className="value">2017-11-10</span></p>
                                <p><span className="title">点赞:</span><span className="value">2017-11-10</span></p>
                                <p><span className="title">评论:</span><span className="value">2017-11-10</span></p>
                            </div>
                            <div className="person-artical-desc">
                                文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述
                            </div>
                        </div>
                        <ul className="person-artical-operate">
                            <li>查看</li>
                            <li>编辑</li>
                            <li>删除</li>
                        </ul>
                    </li>
                </ul>
                <div className="person-artical-pagination">
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

module.exports = Artical;