import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pagination } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ArticalLine from '../../components/ArticalLine';

class ArticalList extends Component {
    render() {
        return (
            <div id="ying-view-artical">
                <Header />
                <div className="artical-content">
                    <div className="tag-nav clearfix">
                        <div className="checked nav-button">
                            所有文章
                        </div>
                        <div className="new-artical nav-button">
                            最新作品
                        </div>
                        <div className="great-artical nav-button">
                            精品推荐
                        </div>
                        <div className="hot-artical nav-button">
                            热门文章
                        </div>
                        <div className="add-artical">
                            发布作品
                        </div>
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

export default ArticalList;