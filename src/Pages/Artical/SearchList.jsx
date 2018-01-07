import React, { Component } from 'react';
import { Link } from 'react-router';
import { Pagination, Ajax } from 'yingview-form';

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotList: [],
      searchList: null,
      total: 0
    };
    this.current = 1;
    this.queryHot();
    this.searchByKeyWord();
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

  formatDate(time) {
    const createDate = new Date(time * 1000);
    const Y = createDate.getFullYear();
    const M = createDate.getMonth() + 1;
    const D = createDate.getDate();
    return `${Y}-${M < 10 ? '0' + M : M}-${D < 10 ? '0' + D : D}`;
  }

  searchByKeyWord() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'queryByKeyWork',
        keyword: decodeURIComponent(this.props.location.query.keyword),
        current: this.current,
        size: 15
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          this.setState({
            searchList: content.articalList,
            total: content.total
          });
        }
      }
    });
  }

  queryHot() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'articalQuery',
        rpcname: 'artical',
        needType: 'hot',
        current: 1,
        size: 5
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          this.setState({
            hotList: content.retValue.articalList
          });
        }
      }
    });
  }
  render() {
    const { hotList, total, searchList } = this.state;
    return (
      <div id="ying-view-search-list-warp" className="clearfix">
        <div className="search-list">
          {
            searchList ?
              searchList.map((item, index) => (
                <div className="list-item" key={index}>
                  <h3>
                    <Link to={{ pathname: 'index/articaldetail', query: { articalCode: item.articalCode } }} target={'_blank'}>
                      <span className="item-title">{item.articalTitle}</span>
                    </Link>
                  </h3>
                  <pre className="item-desc">{item.articalContent}</pre>
                  <div className="time-and-author">
                    <span className="time">{this.formatDate(item.articalCreateDate)}</span>
                    <Link to={{ pathname: '/index/person', query: { userCode: item.userCode, operate: 'view' } }} target={'_blank'}>
                      <span className="author">{item.nickName}</span>
                    </Link>
                  </div>
                </div>
              ))
              : <div>没有搜索到数据</div>
          }
          <div className="page-wrap">
            <Pagination
              onChange={(value) => { this.current = value; this.searchByKeyWord(); }}
              total={total}
              current={this.current}
              pageSize={15}
            />
          </div>
        </div>
        <div className="hot-artical-list">
          {
            hotList.map((item, index) => (
              <dl className="hot-item" key={index}>
                <dt>
                  <Link to={{ pathname: 'index/articaldetail', query: { articalCode: item.articalCode } }} target={'_blank'}>
                    <div className="artical-photo" style={{ backgroundImage: `url(${window.hostname + item.articalPhoto})` }} />
                  </Link>
                </dt>
                <dd>
                  <h3>
                    <Link to={{ pathname: 'index/articaldetail', query: { articalCode: item.articalCode } }} target={'_blank'}>
                      {item.articalTitle}
                    </Link>
                  </h3>
                </dd>
                <dd>
                  <div className="look">{item.articalView}</div>
                  <div className="mark">{item.articalMark}</div>
                  <div className="say">{item.articalCommentNum}</div>
                </dd>
                <dd className="clearfix">
                  <a href="#" target={'_blank'}>
                    <div className="user">
                      <div className="user-photo" style={{ backgroundImage: `url(${window.hostname + item.userPhoto})` }} />
                      <div className="name">{item.nickName}</div>
                    </div>
                  </a>
                  <div className="time">{this.beforeDate(item.articalCreateDate)}</div>
                </dd>
              </dl>
            ))
          }
        </div>
      </div>
    );
  }

}

module.exports = SearchList;
