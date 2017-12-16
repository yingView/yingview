import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pagination, Ajax, Utils, Textarea, Button, Dialog } from 'yingview-form';
import { Link } from 'react-router';

import CommentList from '../../components/CommentList';

const { getCookie, decodeHTML } = Utils;

require('./BookDetail.less');

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            menu: 'artical',
            categoryList: [],
            articalList: null,
            commentList: null,
            total: 0
        }
        this.current = 1;
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
        if (props.location.query.bookCode) {
            this.queryDetail();
            this.queryComment();
        }
    }

    componentDidMount() {

        // Ajax.get({
        //     url: window.hostname + 'yingview.php',
        //     data: {
        //         rpcname: 'comment',
        //         method: 'queryByBookCode',
        //         bookCode: this.props.location.query.bookCode,
        //         current: this.current,
        //         size: 40
        //     },
        //     dataType: 'json',
        //     success: (res) => {
        //         const { content } = res;
        //         if (content.isSuccess) {
        //             this.setState({
        //                 total: content.total,
        //                 commentList: content.commentList
        //             })
        //         }
        //     }
        // })
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

    queryComment() {
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                rpcname: 'comment',
                method: 'queryByBookCode',
                bookCode: this.props.location.query.bookCode,
                current: this.current,
                size: 40
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({
                        total: content.total,
                        commentList: content.commentList
                    })
                }
            }
        })
    }

    queryArtical(userCode) {
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                rpcname: 'artical',
                method: 'getArticalListByBookCode',
                bookCode: this.props.location.query.bookCode,
                self: userCode === this.userInfo.userCode
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({
                        articalList: content.articalList
                    })
                }
            }
        })
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
                            bookCode: item.bookCode,
                            comParentType: item.comParentType,
                            comParentCode: item.bookCode
                        },
                        dataType: 'json',
                        success: (res) => {
                            const { content } = res;
                            if (content.isSuccess) {
                                Dialog.info({ content: content.message });
                                this.queryComment();
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
                    userCode: this.userInfo.userCode,
                    commentCode: item.commentCode,
                    bookCode: item.bookCode,
                    comContent: this.comment,
                    comParentType: 2,
                    comParentCode: item.bookCode
                },
                dataType: 'json',
                success: (res) => {
                    const { content } = res;
                    if (content.isSuccess) {
                        Dialog.info({ content: content.message });
                        this.queryComment();
                    } else {
                        Dialog.error({ content: content.message });
                    }
                }
            })
        }
    }

    queryDetail() {
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                rpcname: 'book',
                method: 'getBookByCode',
                bookCode: this.props.location.query.bookCode
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    content.bookInfo.bookContent = decodeHTML(content.bookInfo.bookContent);
                    this.queryArtical(content.bookInfo.userCode);
                    this.setState({
                        data: content.bookInfo
                    });
                } else {
                    Dialog.info({ content: content.message });
                }
            }
        })
    }

    renderArtical() {
        const { articalList } = this.state;
        if (!articalList) {
            return <div />;
        }
        const list = [];
        let items = null;
        articalList.forEach((item, idx) => {
            if (idx % 4 === 0) {
                items = list[parseInt(idx / 4)] = [item];
            } else {
                items.push(item);
            }
        })
        return (
            <table className="artical-list clearfix">
                {
                    list.map((item) => (
                        <tr>
                            {
                                item && item.map((item) => (
                                    <Link to={{ pathname: '/index/articaldetail', query: { articalCode: item.articalCode } }} target='_blank'>
                                        <td className="artical-item">{item.articalTitle}</td>
                                    </Link>
                                ))
                            }
                        </tr>
                    ))
                }
            </table>
        )
    }

    renderComment() {
        const data = this.state.commentList;
        return (
            <div className="comment-list clearfix">
                <div className="add-comment">
                    <div className="content">
                        <Textarea
                            width={'1160px'}
                            height="140px"
                            onChange={(value) => { this.comment = value; }}
                        />
                    </div>
                    <div className="btn-wrap">
                        <Button
                            text="评 论"
                            type="submit"
                            size="large"
                            onClick={this.operaComment.bind(this, 'add', this.state.data)}
                        />
                    </div>
                </div>
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
                                    {
                                        this.userInfo && item.userCode === this.userInfo.userCode ?
                                            <button onClick={this.operaComment.bind(this, 'delete', item)}>删除</button>
                                            :
                                            null
                                    }
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

    render() {
        const { categoryList, data, menu, total } = this.state;
        if (!data) {
            return <div />;
        }
        return (
            <div id="ying-view-book-detail">
                <div className="book-detail-wrap">
                    <div className="book-detail-top">
                        <div className="book-photo">
                            <img src={window.hostname + data.bookPhoto.url} alt={data.bookName} />
                        </div>
                        <div className="book-info">
                            <div className="title-author">
                                <h3 className="title">{data.bookName}</h3>
                                <p className="author">{data.nickName} 著</p>
                            </div>
                            <div className="other-info">
                                <p><span className="title">点击:</span>{data.bookView}</p>
                                <p><span className="title">推荐:</span>{data.bookMark}</p>
                                <p><span className="title">收藏:</span>{0}</p>
                            </div>
                            <div className="book-desc">
                                {data.bookDesc}
                            </div>
                            <div className="div-btn">
                                <div className="collection-btn">
                                    加入收藏
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="book-page-nav">
                        <div
                            className={`${menu === 'artical' ? 'active' : ''} artical-tab`}
                            onClick={() => { this.setState({ menu: 'artical' }) }}
                        >
                            文章列表
                        </div>
                        <div
                            className={`${menu === 'comment' ? 'active' : ''} artical-tab`}
                            onClick={() => { this.setState({ menu: 'comment' }) }}
                        >
                            评论列表
                        </div>
                    </div>
                    <div className="book-content">
                        {
                            menu === 'artical' ? this.renderArtical() : this.renderComment()
                        }
                        {
                            menu === 'artical' ? null :
                                <div className="book-comment-page-wrap">
                                    <Pagination
                                        onChange={(value) => { this.current = value; this.queryComment(); }}
                                        total={total}
                                        current={this.current}
                                        pageSize={40}
                                    />
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}

module.exports = BookDetail;