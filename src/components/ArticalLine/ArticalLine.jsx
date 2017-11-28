import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
class ArticalLine extends Component {
  constructor(props) {
    super(props);
    this.now = (new Date()).getTime();
  }

  beforeDate(time) {
    let day = Math.floor((this.now - time * 1000)/86400000);
    if (day > 0) {
      day += '天前';
    } else {
      day = '今天';
    }
    return day;
  }

  render() {
    const { data } = this.props;
    
    if (!data || !data.length) {
      return null;
    }
    const list = [];
    let items = null;
    data.forEach((item, idx) => {
      if (idx % 4 === 0) {
        items = list[parseInt(idx / 4)] = [item];
      } else {
        items.push(item);
      }
    })
    return (
      <div className="artical-line">
        {
          list.map((item, idx) => (
            <div className="content-part clearfix" key={idx}>
              {
                item && item.map((item, idx) => {
                  console.log(item);
                  return (
                    <dl className={idx === 3 && 'last'}>
                      <dt>
                        <Link to={{ pathname: 'index/articaldetail', query: { code: item.articalcode } }} target='_blank'>
                          <div className="artical-photo" style={{ backgroundImage: `url(${window.hostname}yingview.php?fileCode=${item.articalPhoto}&method=miniImage)`}}/>
                        </Link>
                      </dt>
                      <dd>
                        <h3>
                          <Link to={{ pathname: 'index/articaldetail', query: { code: item.articalcode } }} target='_blank'>
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
                        <a href="#" target="_blank">
                          <div className="user">
                            <div className="user-photo" style={{ backgroundImage: `url(${item.photoImage || ''})`}}>
                            </div>
                            <div className="name">{item.nickName}</div>
                          </div>
                        </a>
                        <div className="time">{this.beforeDate(item.articalCreateDate)}</div>
                      </dd>
                    </dl>
                  );
                })
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default ArticalLine;