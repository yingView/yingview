import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Pagination, Ajax, Utils } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { decodeHTML, getCookie } = Utils;

require('./style.less');

class ArticalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : null;
        this.queryList();
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

    queryList() {
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                rpcname: 'artical',
                method: 'GetArticalByCode',
                articalCode: this.props.location.query.articalCode
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({
                        data: content.articalInfo
                    });
                } else {
                    Dialog.info({ content: content.message });
                }
            }
        })
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return null;
        }
        return (
            <div id="ying-view-artical-detail">
                <div className="content-top">
                    <div className="title-and-user">
                        <div className="artical-title">
                            <div className="title">
                                <h1>{data.articalTitle}</h1>
                                <div className="mark">标签</div>
                                {
                                    data.userCode === this.userInfo.userCode ?
                                        <Link to={{ pathname: 'index/person/articaledit', query: { articalCode: data.articalCode } }} target='_blank'>
                                            <div className="artical-edit">编辑</div>
                                        </Link> : null
                                }
                            </div>
                            <p className="category-date">
                                <span className="category">{data.categoryCode}</span>
                                <span className="date">发布时间:</span>
                                <span>{this.beforeDate(data.articalCreateDate)}</span>
                            </p>
                            <p className="view-great-com">
                                <span className="view">{data.articalView}</span>
                                <span className="great">{data.articalMark}</span>
                                <span className="comment">{data.articalCommentNum}</span>
                                <span>著作权归作者本人所有</span>
                            </p>
                        </div>
                        <div className="user-info">
                            <div className="photo">
                                <img src={window.hostname + data.photoImage} alt={data.nickName} />
                            </div>
                            <div className="user">
                                <div className="user-infomation">
                                    <div className="user-name">{data.nickName}</div>
                                    <div className="user-level">{data.userLevel}陆地飞仙</div>
                                </div>
                                <div className="operation">
                                    <button>关注</button>
                                    <button>私信</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detaile-wrap">
                    {
                        data.articalType === '1' ? <div className="desc" dangerouslySetInnerHTML={{ __html: decodeHTML(data.articalContent) }} /> : null
                    }
                    <div className="content">
                        {
                            data.articalType === '1' ?
                                <div>
                                    {
                                        data.articalImages && data.articalImages.map((item) => (
                                            <div className="img-wrap">
                                                <img src={window.hostname + item.viewAdd} alt="图片" />
                                            </div>
                                        ))
                                    }
                                </div> :
                                <div className="text-warp" dangerouslySetInnerHTML={{ __html: decodeHTML(data.articalContent) }} />
                        }
                    </div>
                    <div className="zan-button">
                        <div>
                            赞
                        </div>
                    </div>
                </div>
                <div className="share-wrap">
                    <div className="content">
                        <div>
                            <i className="iconfont icon-QQ"></i>
                        </div>
                        <div>
                            <i className="iconfont icon-weibo"></i>
                        </div>
                        <div>
                            <i className="iconfont icon-kongjian"></i>
                        </div>
                        <div>
                            <i className="iconfont icon-weixin"></i>
                        </div>
                    </div>
                </div>
                <div className="commente-wrap">
                    <h3 className="comment-title">作者很希望看到你的用心评论哦</h3>
                    <textarea className="comment-text" />
                    <div className="button-wrap">
                        <button>评&nbsp;论</button>
                    </div>
                    <div className="all-comment">
                        <p>全部评论(11)</p>
                        <ul className="comment-list">
                            <li className="line">
                                <div className="user-info">
                                    <div className="photo" />
                                    <div className="user-name-talk">
                                        <div className="user-name">
                                            <span className="name">我的名字是什么</span>
                                            <span className="date">20天前</span>
                                        </div>
                                        <div className="user-talking">
                                            我说把啦啦啦啦啦啦啦啦啦
                                        </div>
                                    </div>
                                </div>
                                <div className="operate">
                                    <button>赞</button>
                                    <button>评论</button>
                                    <button>删除</button>
                                </div>
                            </li>
                            <li className="line">
                                <div className="user-info">
                                    <div className="photo" />
                                    <div className="user-name-talk">
                                        <div className="user-name">
                                            <span className="name">我的名字是什么</span>
                                            <span className="date">20天前</span>
                                        </div>
                                        <div className="user-talking">
                                            我说把啦啦啦啦啦啦啦啦啦
                                    </div>
                                    </div>
                                </div>
                                <div className="operate">
                                    <button>赞</button>
                                    <button>评论</button>
                                    <button>删除</button>
                                </div>
                            </li>
                            <li className="line">
                                <div className="user-info">
                                    <div className="photo" />
                                    <div className="user-name-talk">
                                        <div className="user-name">
                                            <span className="name">我的名字是什么</span>
                                            <span className="date">20天前</span>
                                        </div>
                                        <div className="user-talking">
                                            我说把啦啦啦啦啦啦啦啦啦
                                        </div>
                                    </div>
                                </div>
                                <div className="operate">
                                    <button>赞</button>
                                    <button>评论</button>
                                    <button>删除</button>
                                </div>
                            </li>
                            <li className="line">
                                <div className="user-info">
                                    <div className="photo" />
                                    <div className="user-name-talk">
                                        <div className="user-name">
                                            <span className="name">我的名字是什么</span>
                                            <span className="date">20天前</span>
                                        </div>
                                        <div className="user-talking">
                                            我说把啦啦啦啦啦啦啦啦啦
                                        </div>
                                    </div>
                                </div>
                                <div className="operate">
                                    <button>赞</button>
                                    <button>评论</button>
                                    <button>删除</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="page-change-wrap">
                        <Pagination />
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = ArticalDetail;