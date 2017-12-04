import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Pagination, Ajax, Utils, Dialog } from 'yingview-form';

const { decodeHTML, getCookie } = Utils;

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            showComment: false
        }
        this.comment = ''; // 评论内容
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : null;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    }

    beforeDate(time) {
        this.now = (new Date()).getTime();
        let day = Math.floor((this.now - time * 1000) / 86400000);
        if (day > 0) {
            day += '天前';
        } else {
            day = '今天';
        }
        return day;
    }

    operaComment(opera, item) {
        if (opera === 'addComment') {
            this.state.data.forEach(item => {
                item.showComment = false;
            })
            item.showComment = true;
            this.setState({ data: this.state.data });
            return;
        }
        const method = opera === 'delete' ? 'commentDelete' : 'commentMark';
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                rpcname: 'comment',
                method: method,
                commentCode: item.commentCode,
                userCode: this.userInfo.userCode
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.info({ content: content.message });
                    this.props.queryComment();
                } else {
                    Dialog.error({ content: content.message });
                }
            }
        })
    }

    addComment(data) {
        if (!this.userInfo) {
            Dialog.info({ content: '您还没有登录' });
            return;
        }
        if (!this.comment) {
            Dialog.info({ content: '请填写评论内容' });
            return;
        }
        Ajax.post({
            url: window.hostname + 'yingview.php',
            data: {
                rpcname: 'comment',
                method: 'addComment',
                articalCode: data.articalCode,
                userCode: this.userInfo.userCode,
                bookCode: null,
                comContent: this.comment,
                comParentType: 1,
                comParentCode: data.commentCode
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    Dialog.info({ content: content.message });
                    this.props.queryComment();
                } else {
                    Dialog.error({ content: content.message });
                }
            }
        })
    }

    render() {
        const { data, showComment } = this.state;
        return (
            <div id="ying-view-comment">
                <ul className="comment-list">
                    {
                        data && data.map((item) => (
                            <li className="line clearfix">
                                <div className="user-info">
                                    <div className="photo">
                                        <img src={window.hostname + item.photoImage} alt={item.nickName} />
                                    </div>
                                    <div className="user-name-talk">
                                        <div className="user-name">
                                            <span className="name">{item.nickName}</span>
                                            <span className="date">{this.beforeDate(item.comCreateDate)}</span>
                                        </div>
                                        <div className="user-talking">{item.comContent}</div>
                                    </div>
                                </div>
                                <div className="operate">
                                    <button onClick={this.operaComment.bind(this, 'mark', item)}>赞({item.comMark})</button>
                                    <button onClick={this.operaComment.bind(this, 'addComment', item)}>评论({item.comCommentNum})</button>
                                    {
                                        item.userCode === this.userInfo.userCode ?
                                            <button onClick={this.operaComment.bind(this, 'delete', item)}>删除</button>
                                            :
                                            null
                                    }
                                </div>
                                <div className="child-comment clearfix">
                                    {
                                        item.children && item.children.map((item) => (
                                            <div className="clearfix child-line">
                                                <div className="user-info">
                                                    <div className="user-name-talk">
                                                        <div className="user-name">
                                                            <span className="name">{item.nickName}</span>
                                                            <span className="date">{this.beforeDate(item.comCreateDate)}</span>
                                                        </div>
                                                        <div className="user-talking">{item.comContent}</div>
                                                    </div>
                                                </div>
                                                <div className="operate">
                                                    <button onClick={this.operaComment.bind(this, 'mark', item)}>赞({item.comMark})</button>
                                                    {
                                                        item.userCode === this.userInfo.userCode ?
                                                            <button onClick={this.operaComment.bind(this, 'delete', item)}>删除</button>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {
                                        item.showComment ?
                                            <div className="child-textarea">
                                                <textarea onChange={(e) => { const value = e.target.value; this.comment = value; }} />
                                                <div>
                                                    <button onClick={this.addComment.bind(this, item)}>评论</button>
                                                </div>
                                            </div> : null
                                    }
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Comment;