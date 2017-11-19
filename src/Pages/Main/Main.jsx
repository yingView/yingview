import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Pagination, Ajax } from 'yingview-ui';

import Carousel from '../../components/Carousel';
import ArticalLine from '../../components/ArticalLine';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Ajax.post({
    //   url: 'http://127.0.0.1:8080/artical.json',
    //   data: {
    //       method: 'querylist',
    //       needType: 'indexlist'
    //   },
    //   dataType: 'json',
    //   success: (res) => {
    //       const { content } = res;
    //       if (content.isSuccess) {
    //           this.setState({ data: content.articallist});
    //       }
    //     }
    // })
  }
  render() {
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
            <ArticalLine data={[1, 2, 3, 4, 5, 6, 7, 8]} />
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
            <ArticalLine data={[1, 2, 3, 4, 5, 6, 7, 8]} />
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
            <ArticalLine data={[1, 2, 3, 4, 5, 6, 7, 8]} />
          </div>
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <Pagination />
          </div>
        </div>
      </div>
    )
  }
}

export default Main;