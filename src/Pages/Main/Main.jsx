import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Pagination, Ajax } from 'yingview-form';

import Carousel from '../../components/Carousel';
import ArticalLine from '../../components/ArticalLine';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: [],
      greatData: [],
      hotData: [],
      total: 0
    }
    this.current = 1;
  }
  componentDidMount() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'articalQuery',
        rpcname: 'artical',
        needType: null,
        current: this.current,
        size: 8
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          this.setState({
            newData: content.retValue.new.articalList,
            greatData: content.retValue.great.articalList,
            hotData: content.retValue.hot.articalList,
            total: content.retValue.hot.total
          });
        }
      }
    })
  }
  render() {
    const {newData, greatData, hotData, total} = this.state;
    return (
      <div id="ying-view-home">
        <div style={{ padding: '10px 0' }}>
          <Carousel />
        </div>
        <div className="ying-view-content">
          <div className="content-title clearfix">
            <h2>最新作品</h2>
            <p>
              <Link to={{ pathname: '/index/articallist', query: { keyword: 'new' } }} target='_blank'>
                <span className="more">更多&gt;&gt;</span>
              </Link>
            </p>
          </div>
          <div className="content">
            <ArticalLine data={newData} />
          </div>
          <div className="content-title clearfix">
            <h2>精品推荐</h2>
            <p>
              <Link to={{ pathname: 'index/articallist', query: { keyword: 'great' } }} target='_blank'>
                <span className="more">更多&gt;&gt;</span>
              </Link>
            </p>
          </div>
          <div className="content">
            <ArticalLine data={greatData} />
          </div>
          <div className="content-title clearfix">
            <h2>热门文章</h2>
            <p>
              <Link to={{ pathname: 'index/articallist', query: { keyword: 'hot' } }} target='_blank'>
                <span className="more">更多&gt;&gt;</span>
              </Link>
            </p>
          </div>
          <div className="content">
            <ArticalLine data={hotData} />
          </div>
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <Pagination total={total} />
          </div>
        </div>
      </div>
    )
  }
}

export default Main;