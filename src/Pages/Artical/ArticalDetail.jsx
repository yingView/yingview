import React, { Component } from 'react';
import { Link } from 'react-router';
import { Pagination, Ajax, Utils, Dialog, Textarea, Button } from 'yingview-form';
import CommentList from '../../components/CommentList';
import SendEmailModal from '../../components/SendEmailModal';

const { decodeHTML, getCookie } = Utils;

require('./style.less');

class ArticalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      style: {},
      comment: [],
      total: 0,
      showComment: false
    };
    this.current = 1;
    this.comment = ''; // 评论内容
    this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
    this.queryDetail();
  }

  componentDidMount() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'artical',
        method: 'articalView',
        articalCode: this.props.location.query.articalCode
      }
    })
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

  queryDetail() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'artical',
        method: 'getArticalByCode',
        articalCode: this.props.location.query.articalCode
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          this.setState({
            data: content.articalInfo
          });
          this.queryComment();
        } else {
          Dialog.info({ content: content.message });
        }
      }
    })
  }

  articalMark() {
    if (!this.userInfo.userCode) {
      Dialog.info({ content: '您还没有登录' });
      return;
    }
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'artical',
        method: 'articalMark',
        articalCode: this.props.location.query.articalCode,
        userCode: this.userInfo.userCode
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          this.setState({ style: { fontSize: '16px', transform: 'translateY(-50px)', opacity: 1 } });
        }
      }
    });
  }

  focusUser() {
    if (!this.userInfo.userCode) {
      Dialog.info({ content: '您还没有登录' });
      return;
    }
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'focus',
        method: 'addFocus',
        byFocusUserCode: this.state.data.userCode,
        focusUserCode: this.userInfo.userCode
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          Dialog.info({ content: content.message });
        } else {
          Dialog.error({ content: content.message });
        }
      }
    });
  }

  addComment() {
    if (!this.userInfo.userCode) {
      Dialog.info({ content: '您还没有登录' });
      return;
    }
    if (!this.comment) {
      Dialog.info({ content: '请填写评论内容' });
      return;
    }
    const { data } = this.state;
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'comment',
        method: 'add',
        articalCode: data.articalCode,
        userCode: this.userInfo.userCode,
        bookCode: null,
        comContent: this.comment,
        comParentType: 0,
        comParentCode: data.articalCode
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
    });
  }

  queryComment() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'comment',
        method: 'queryByArticalCode',
        articalCode: this.state.data.articalCode,
        current: this.current,
        size: 10
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          const arr = [];
          for (const i in content.commentList) {
            arr.push(content.commentList[i]);
          }
          this.setState({ comment: arr, total: content.total });
        }
      }
    });
  }

  sendEmail() {
    if (!this.userInfo.userCode) {
      Dialog.info({ content: '您还没有登录' });
      return;
    }
    const { data } = this.state;
    SendEmailModal.show({
      data: {
        sendUserCode: this.userInfo.userCode,
        receiveUserCode: data.userCode,
        receiveName: data.nickName
      }
    });
  }

  render() {
    const { data, comment, total } = this.state;
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
                  this.userInfo && data.userCode === this.userInfo.userCode ?
                    <Link to={{ pathname: 'index/articaledit', query: { articalCode: data.articalCode } }} target='_blank'>
                      <div className="artical-edit">编辑</div>
                    </Link> : null
                }
              </div>
              <p className="category-date">
                <span className="category">
                  {
                    data.articalType === '2' ?
                      <Link to={{ pathname: 'index/book', query: { bookCode: data.bookCode } }} target='_blank'>
                        <span>{data.bookName}</span>
                      </Link>
                      : <span>{data.categoryCode}</span>
                  }
                </span>
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
                <Link to={{ pathname: '/index/person', query: { userCode: data.userCode, operate: 'view' } }} target='_blank'>
                  <img src={window.hostname + data.userPhoto} alt={data.nickName} />
                </Link>
              </div>
              <div className="user">
                <div className="user-infomation">
                  <Link to={{ pathname: '/index/person', query: { userCode: data.userCode, operate: 'view' } }} target='_blank'>
                    <div className="user-name">{data.nickName}</div>
                  </Link>
                  <div className="user-level">{data.userLevel}陆地飞仙</div>
                </div>
                <div className="operation">
                  <Button
                    onClick={this.focusUser.bind(this)}
                    type={'submit'}
                    size={'smaller'}
                    text={'关注'}
                  />
                  <Button
                    size={'smaller'}
                    text={'私信'}
                    onClick={this.sendEmail.bind(this)}
                  />
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
              data.articalType === '0' ? <div className="text-warp" dangerouslySetInnerHTML={{ __html: decodeHTML(data.articalContent) }} /> : null
            }
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
                </div> : null

            }
            {
              data.articalType === '2' ?
                <div className="text-warp">
                  <pre>{data.articalContent}</pre>
                </div> : null
            }
          </div>
          <div className="zan-button">
            <div onClick={this.articalMark.bind(this)}>
              <span className="add-shadow" style={this.state.style}>+1</span>
              <span>赞</span>
            </div>
          </div>
        </div>
        <div className="share-wrap">
          <div className="content">
            <div>
              <i className="iconfont icon-QQ" />
            </div>
            <div>
              <i className="iconfont icon-weibo" />
            </div>
            <div>
              <i className="iconfont icon-kongjian" />
            </div>
            <div>
              <i className="iconfont icon-weixin" />
            </div>
          </div>
        </div>
        <div className="commente-wrap">
          <h3 className="comment-title">作者很希望看到你的用心评论哦</h3>
          <Textarea
            // className="comment-text"
            fontSize={'14px'}
            width={'1200'}
            height={'130px'}
            onChange={(value) => { this.comment = value; }}
          />
          <div className="button-wrap">
            <Button
              type={'submit'}
              size={'large'}
              text={'评  论'}
              onClick={this.addComment.bind(this)}
            />
          </div>
          <div className="all-comment">
            <p>全部评论({total})</p>
            <CommentList data={comment} queryComment={this.queryComment.bind(this)} />
          </div>
          <div className="page-change-wrap">
            <Pagination
              onChange={(value) => { this.current = value; this.queryComment(); }}
              total={total}
              current={this.current}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ArticalDetail;