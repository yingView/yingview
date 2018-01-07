import React, { Component } from 'react';
import { Pagination, Ajax, Utils, Dialog } from 'yingview-form';
import { Link } from 'react-router';

const { getCookie, decodeHTML } = Utils;

class SpecialColumn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
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
        method: 'getBookListByUserCode',
        rpcname: 'book',
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
            bookList: content.bookList,
            total: content.total,
            readOnly: this.state.readOnly
          });
        }
      }
    });
  }

  delete(book) {
    Dialog.confirm({
      content: '确定要删除该栏目么,删除后不能恢复?',
      submit: () => {
        if (this.userInfo.userCode !== book.userCode) {
          Dialog.error({ content: '您没有权限进行该操作' });
          return;
        }
        Ajax.get({
          url: window.hostname + 'yingview.php',
          data: {
            method: 'deleteBookByCode',
            rpcname: 'book',
            bookCode: book.bookCode
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
    const { bookList, readOnly, total } = this.state;
    return (
      <div className="person-book-wrap">
        <ul className="person-book-list">
          {
            bookList && bookList.length ? bookList.map((book, index) => (
              <li className="person-book-item" key={index}>
                <div className="person-book-photo">
                  <Link
                    to={{
                      pathname: 'index/book/bookdetail', query: { bookCode: book.bookCode }
                    }}
                    target={'_blank'}
                  >
                    <img src={window.hostname + book.bookPhoto.url} alt={book.bookName} />
                  </Link>
                </div>
                <div className="person-book-content">
                  <div className="person-book-title">
                    <Link to={{ pathname: 'index/book/bookdetail', query: { bookCode: book.bookCode } }} target={'_blank'}>
                      <h3>{book.articalTitle}</h3>
                    </Link>
                    <p><span className="title">创作时间:</span><span className="value">{this.formatDate(book.bookCreateDate)}</span></p>
                    <p><span className="title">查看:</span><span className="value">{book.bookView}</span></p>
                    <p><span className="title">点赞:</span><span className="value">{book.bookMark}</span></p>
                    <p><span className="title">评论:</span><span className="value">{book.bookCommentNum}</span></p>
                  </div>
                  <div className="person-book-desc-wrap">
                    <div className="person-book-desc" dangerouslySetInnerHTML={{ __html: decodeHTML(book.bookDesc) }} />
                  </div>
                </div>
                <ul className="person-book-operate">
                  {
                    readOnly ? <li>&nbsp;</li> :
                      (<Link to={{ pathname: 'index/book/bookedit' }} target={'_blank'}>
                        <li>新建</li>
                      </Link>)
                  }
                  {
                    readOnly ?
                      <Link to={{ pathname: 'index/book/bookEdit' }} target={'_blank'}>
                        <li>新建</li>
                      </Link> :
                      <Link to={{ pathname: 'index/book/bookdetail', query: { bookCode: book.bookCode } }} target={'_blank'}>
                        <li>查看</li>
                      </Link>
                  }
                  {
                    readOnly ?
                      <Link to={{ pathname: 'index/book/bookdetail', query: { bookCode: book.bookCode } }} target={'_blank'}>
                        <li>查看</li>
                      </Link> :
                      <Link to={{ pathname: 'index/book/bookedit', query: { bookCode: book.bookCode } }} target={'_blank'}>
                        <li>编辑</li>
                      </Link>
                  }
                  {
                    readOnly ? <li>&nbsp;</li> : <li onClick={this.delete.bind(this, book)}>删除</li>
                  }
                </ul>
              </li>
            )) :
              (<li className="person-book-empty">
                <span>
                  您还没有创建专栏,&nbsp;&nbsp;
                </span>
                <Link to={{ pathname: 'index/book/bookEdit' }} target={'_blank'} style={{ color: '#24d0fb' }}>
                  立即创建
                </Link>
              </li>)
          }
        </ul>
        <div className="person-book-pagination">
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

module.exports = SpecialColumn;
