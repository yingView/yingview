import React, { Component } from 'react';
import { Pagination, Ajax, Utils, Dialog } from 'yingview-form';
import { Link } from 'react-router';

const { getCookie } = Utils;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      readOnly: false,
      total: 0
    };
    this.current = 1;
    this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
    this.queryData();
  }

  queryData() {
    const { userCode, operate } = this.props.location.query;
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'queryByUserCode',
        rpcname: 'comment',
        userCode,
        current: this.current,
        size: 10
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          if (operate === 'view' || userCode !== this.userInfo.userCode) {
            this.state.readOnly = true;
            this.props.location.query.readOnly = true;
          }
          this.setState({
            commentList: content.commentList,
            total: content.total,
            readOnly: this.state.readOnly
          });
        }
      }
    });
  }

  deletecomment(comment) {
    Dialog.confirm({
      content: '确定要删除该评论么?',
      submit: () => {
        if (this.userInfo.userCode !== comment.userCode) {
          Dialog.error({ content: '您没有权限进行该操作' });
          return;
        }
        Ajax.get({
          url: window.hostname + 'yingview.php',
          data: {
            method: 'delete',
            rpcname: 'comment',
            userCode: this.userInfo.userCode,
            articalCode: comment.articalCode,
            comParentType: comment.comParentType,
            comParentCode: comment.comParentCode,
            commentCode: comment.commentCode
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
      },
      cancel: () => { }
    });
  }

  formatDate(time) {
    const createDate = new Date(time * 1000);
    const Y = createDate.getFullYear();
    const M = createDate.getMonth() + 1;
    const D = createDate.getDate();
    return `${Y}-${M < 10 ? '0' + M : M}-${D < 10 ? '0' + D : D}`;
  }

  render() {
    const { commentList, readOnly, total } = this.state;
    return (
      <div className="person-comment-wrap">
        <ul className="person-comment-list">
          {
            commentList && commentList.length ? commentList.map((comment, index) => (
              <li className="person-comment-item" key={index}>
                <div className="person-comment-photo">
                  <Link to={{ pathname: 'index/articaldetail', query: { articalCode: comment.articalCode } }} target={'_blank'}>
                    <img src={window.hostname + comment.articalPhoto.url} alt={comment.articalTitle} />
                  </Link>
                </div>
                <div className="person-comment-content">
                  <div className="person-comment-title">
                    <Link to={{ pathname: 'index/articaldetail', query: { articalCode: comment.articalCode } }} target={'_blank'}>
                      <h3>{comment.articalTitle}</h3>
                    </Link>
                    <p><span className="title">创作时间:</span><span className="value">{this.formatDate(comment.comCreateDate)}</span></p>
                    <p><span className="title">点赞:</span><span className="value">{comment.comMark}</span></p>
                    <p><span className="title">评论:</span><span className="value">{comment.commentNum}</span></p>
                  </div>
                  <div className="person-comment-desc-wrap">
                    <div className="person-comment-desc">{comment.comContent}</div>
                  </div>
                </div>
                <ul className="person-comment-operate">
                  <li>&nbsp;</li>
                  <Link to={{ pathname: 'index/articaldetail', query: { articalCode: comment.articalCode } }} target={'_blank'}>
                    <li>查看</li>
                  </Link>
                  {readOnly ? null : <li onClick={this.deletecomment.bind(this, comment)}>删除</li>}
                  <li>&nbsp;</li>
                </ul>
              </li>
            )) :
              (<li className="person-comment-empty">
                您还没有创建专栏&nbsp;&nbsp;
                                <Link to={{ pathname: 'index/commentedit' }} target={'_blank'}>
                  立即创建
                                </Link>
              </li>)
          }
        </ul>
        <div className="person-comment-pagination">
          <Pagination
            size={10}
            current={1}
            total={total}
            onChange={(value) => { this.current = value; this.queryData(); }}
          />
        </div>
      </div>
    );
  }
}

module.exports = Comment;
