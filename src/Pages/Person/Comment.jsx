import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button, Pagination } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Comment extends Component {
    render() {
        return (
            <div className="person-comment-wrap">
                <ul className="person-comment-list">
                    <li className="person-comment-item">
                        <div className="person-comment-photo">
                            <img src="" alt=""/>
                        </div>
                        <div className="person-comment-content">
                            <div className="person-comment-title">
                                <h3>文章标题</h3>
                                <p><span className="title">创作时间:</span><span className="value">2017-11-10</span></p>
                                <p><span className="title">查看:</span><span className="value">2017-11-10</span></p>
                                <p><span className="title">点赞:</span><span className="value">2017-11-10</span></p>
                                <p><span className="title">评论:</span><span className="value">2017-11-10</span></p>
                            </div>
                            <div className="person-comment-desc">
                                评论内容
                            </div>
                        </div>
                        <ul className="person-comment-operate">
                            <li>查看</li>
                            <li>编辑</li>
                            <li>删除</li>
                        </ul>
                    </li>
                </ul>
                <div className="person-comment-pagination">
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

module.exports = Comment;