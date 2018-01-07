import React, { Component } from 'react';
import { Pagination, Ajax, Utils, Dialog } from 'yingview-form';
import { Link } from 'react-router';

const { getCookie, decodeHTML } = Utils;

class Artical extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articalList: [],
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
        method: 'getArticalListByUserCode',
        rpcname: 'artical',
        userCode,
        current: this.current,
        size: 10,
        self: userCode === this.userInfo.userCode
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
            articalList: content.articalList,
            total: content.total,
            readOnly: this.state.readOnly
          });
        }
      }
    });
  }

  deleteArtical(artical) {
    Dialog.confirm({
      content: '确定要删除该文章?',
      submit: () => {
        if (this.userInfo.userCode !== artical.userCode) {
          Dialog.error({ content: '您没有权限进行该操作' });
          return;
        }
        Ajax.get({
          url: window.hostname + 'yingview.php',
          data: {
            method: 'deleteArticalByCode',
            rpcname: 'artical',
            articalCode: artical.articalCode
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
    const { articalList, readOnly, total } = this.state;
    return (
      <div className="person-artical-wrap">
        <ul className="person-artical-list">
          {
            articalList && articalList.length ? articalList.map((artical, index) => (
              <li className="person-artical-item" key={index}>
                <div className="person-artical-photo">
                  <Link to={{ pathname: 'index/articaldetail', query: { articalCode: artical.articalCode } }} target={'_blank'}>
                    <img src={window.hostname + artical.articalPhoto.url} alt={artical.articalTitle} />
                  </Link>
                </div>
                <div className="person-artical-content">
                  <div className="person-artical-title">
                    <Link to={{ pathname: 'index/articaldetail', query: { articalCode: artical.articalCode } }} target={'_blank'}>
                      <h3>{artical.articalTitle}</h3>
                    </Link>
                    <p><span className="title">创作时间:</span><span className="value">{this.formatDate(artical.articalCreateDate)}</span></p>
                    <p><span className="title">查看:</span><span className="value">{artical.articalView}</span></p>
                    <p><span className="title">点赞:</span><span className="value">{artical.articalMark}</span></p>
                    <p><span className="title">评论:</span><span className="value">{artical.articalCommentNum}</span></p>
                  </div>
                  <div className="person-artical-desc-wrap">
                    <div className="person-artical-desc" dangerouslySetInnerHTML={{ __html: decodeHTML(artical.articalContent) }} />
                  </div>
                </div>
                <ul className="person-artical-operate">
                  {
                    readOnly ? <li>&nbsp;</li> :
                      (<Link to={{ pathname: 'index/articaledit' }} target={'_blank'}>
                        <li>新建</li>
                      </Link>)
                  }
                  {
                    readOnly ?
                      <Link to={{ pathname: 'index/articaledit' }} target={'_blank'}>
                        <li>新建</li>
                      </Link> :
                      <Link to={{ pathname: 'index/articaldetail', query: { articalCode: artical.articalCode } }} target={'_blank'}>
                        <li>查看</li>
                      </Link>
                  }
                  {
                    readOnly ?
                      <Link to={{ pathname: 'index/articaldetail', query: { articalCode: artical.articalCode } }} target={'_blank'}>
                        <li>查看</li>
                      </Link> :
                      <Link to={{ pathname: 'index/articaledit', query: { articalCode: artical.articalCode } }} target={'_blank'}>
                        <li>编辑</li>
                      </Link>
                  }
                  {
                    readOnly ? <li>&nbsp;</li> : <li onClick={this.deleteArtical.bind(this, artical)}>删除</li>
                  }
                </ul>
              </li>
            )) :
              (<li className="person-artical-empty">
                您还没有写任何文章&nbsp;&nbsp;
                                <Link to={{ pathname: 'index/articaledit' }} target={'_blank'}>
                  立即创建
                                </Link>
              </li>)
          }
        </ul>
        <div className="person-artical-pagination">
          <Pagination
            size={10}
            current={this.current}
            total={total}
            onChange={(value) => { this.current = value; this.queryData(); }}
          />
        </div>
      </div>
    );
  }
}

module.exports = Artical;
