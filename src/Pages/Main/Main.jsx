import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Pagination } from 'yingview-form';

import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';
import ArticalLine from '../../components/ArticalLine';

class Main extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return (
      <div id="ying-view-home">
        <Header />
        <div style={{ padding: '10px 0' }}>
          <Carousel />
        </div>
        <div className="ying-view-content">
          <div className="content-title clearfix">
            <h2>最新作品</h2>
            <p>
              <Link to={{ pathname: '/articallist', query: { keyword: 'new' } }} target='_blank'>
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
              <Link to={{ pathname: '/articallist', query: { keyword: 'great' } }} target='_blank'>
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
              <Link to={{ pathname: '/articallist', query: { keyword: 'hot' } }} target='_blank'>
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
        <Footer />
      </div>
    )
  }
}

export default Main;