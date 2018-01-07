import React, { Component } from 'react';
import { Link } from 'react-router';
import { Ajax, Utils, Dialog, Textarea, Button } from 'yingview-form';

const { getCookie } = Utils;

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            showComment: false
        }
        this.comment = ''; // 评论内容
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    }

    beforeDate(time) {
        this.now = (new Date()).getTime();
        let day = Math.round((this.now - time * 1000) / 86400000);
        if (day > 0) {
            day += '天前';
        } else {
            day = '今天';
        }
        return day;
    }

    operaComment(method, item) {
        if (!this.userInfo.userCode) {
            Dialog.info({ content: '您还没有登录' });
            return;
        }

        if (!this.comment && method === 'add') {
            Dialog.info({ content: '请填写评论内容' });
            return;
        }

        if (method === 'delete') {
            Dialog.confirm({
                content: '确定要删除该评论?',
                submit: () => {
                    Ajax.get({
                        url: window.hostname + 'yingview.php',
                        data: {
                            rpcname: 'comment',
                            method: method,
                            commentCode: item.commentCode,
                            userCode: this.userInfo.userCode,
                            articalCode: item.articalCode,
                            comParentType: item.comParentType,
                            comParentCode: item.commentCode
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
                },
                cancel: () => { }
            })
        } else {
            Ajax.get({
                url: window.hostname + 'yingview.php',
                data: {
                    rpcname: 'comment',
                    method: method,
                    commentCode: item.commentCode,
                    userCode: this.userInfo.userCode,
                    articalCode: item.articalCode,
                    bookCode: null,
                    comContent: this.comment,
                    comParentType: 1,
                    comParentCode: item.commentCode
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
    }

    // addComment(data) {
    //     Ajax.post({
    //         url: window.hostname + 'yingview.php',
    //         data: {
    //             rpcname: 'comment',
    //             method: 'add',
    //             articalCode: data.articalCode,
    //             userCode: this.userInfo.userCode,
    //             bookCode: null,
    //             comContent: this.comment,
    //             comParentType: 1,
    //             comParentCode: data.commentCode
    //         },
    //         dataType: 'json',
    //         success: (res) => {
    //             const { content } = res;
    //             if (content.isSuccess) {
    //                 Dialog.info({ content: content.message });
    //                 this.props.queryComment();
    //             } else {
    //                 Dialog.error({ content: content.message });
    //             }
    //         }
    //     })
    // }

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
                                        <Link to={{ pathname: '/index/person', query: { userCode: item.userCode, operate: 'view' } }} target='_blank'>
                                            <img src={window.hostname + item.userPhoto} alt={item.nickName} />
                                        </Link>
                                    </div>
                                    <div className="user-name-talk">
                                        <div className="user-name">
                                            <Link to={{ pathname: '/index/person', query: { userCode: item.userCode, operate: 'view' } }} target='_blank'>
                                                <span className="name">{item.nickName}</span>
                                            </Link>
                                            <span className="date">{this.beforeDate(item.comCreateDate)}</span>
                                        </div>
                                        <div className="user-talking">{item.comContent}</div>
                                    </div>
                                </div>
                                <div className="operate">
                                    <button onClick={this.operaComment.bind(this, 'mark', item)}>赞({item.comMark})</button>
                                    <button onClick={() => {
                                        data.forEach(item => {
                                            item.showComment = false;
                                        })
                                        item.showComment = true;
                                        this.setState({ data });
                                    }}>评论({item.children && item.children.length})</button>
                                    {
                                        this.userInfo && item.userCode === this.userInfo.userCode ?
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
                                                            <Link to={{ pathname: '/index/person', query: { userCode: item.userCode, operate: 'view' } }} target='_blank'>
                                                                <span className="name">{item.nickName}</span>
                                                            </Link>
                                                            <span className="date">{this.beforeDate(item.comCreateDate)}</span>
                                                        </div>
                                                        <div className="user-talking">{item.comContent}</div>
                                                    </div>
                                                </div>
                                                <div className="operate">
                                                    <button onClick={this.operaComment.bind(this, 'mark', item)}>赞({item.comMark})</button>
                                                    {
                                                        this.userInfo && item.userCode === this.userInfo.userCode ?
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
                                                <Textarea
                                                    width={'1144px'}
                                                    height={'76px'}
                                                    onChange={(value) => { this.comment = value; }}
                                                />
                                                <div>
                                                    <Button
                                                        text={'评 论'}
                                                        type={'submit'}
                                                        size={'small'}
                                                        onClick={this.operaComment.bind(this, 'add', item)}
                                                    />
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