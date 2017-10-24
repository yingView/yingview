import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
const artical = require('../../images/artical.png');
class ArticalLine extends Component {
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
                  return (
                    <dl className={idx === 3 && 'last'}>
                      <dt>
                        <Link to={{ pathname: 'index/articaldetail', query: { code: '1111' } }} target='_blank'>
                          <img src={artical} alt="artical-photo" />
                        </Link>
                      </dt>
                      <dd>
                        <h3>
                          <Link to={{ pathname: 'index/articaldetail', query: { code: '1111' } }} target='_blank'>
                            官网设计 | 酷九设计品牌官网
                        </Link>
                        </h3>
                      </dd>
                      <dd>
                        <div className="look">1</div>
                        <div className="mark">1</div>
                        <div className="say">1</div>
                      </dd>
                      <dd className="clearfix">
                        <a href="#" target="_blank">
                          <div className="user">
                            <div className="photo"></div>
                            <div className="name">古川</div>
                          </div>
                        </a>
                        <div className="time">20天前</div>
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