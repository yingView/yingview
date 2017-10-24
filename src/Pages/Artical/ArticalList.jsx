import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Pagination } from 'yingview-form';

import ArticalLine from '../../components/ArticalLine';

class ArticalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: this.props.location.query.keyword
        }
        this.current = 1;
    }

    queryList() {
        console.log('查询接口');
    }

    setKeyWord(keyword) {
        if (keyword === this.state.keyword) {
            return;
        }
        this.state.keyword = keyword;
        this.setState({ keyword });
        this.queryList();
    }
    render() {
        const { keyword } = this.state;
        return (
            <div id="ying-view-artical">
                <div className="artical-content">
                    <div className="tag-nav clearfix">
                        <div
                            className={`${!keyword ? 'checked ' : ''}nav-button`}
                            onClick={this.setKeyWord.bind(this, '')}
                        >
                            所有文章
                        </div>
                        <div
                            className={`${keyword === 'new' ? 'checked ' : ''}new-artical nav-button`}
                            onClick={this.setKeyWord.bind(this, 'new')}
                        >
                            最新作品
                        </div>
                        <div
                            className={`${keyword === 'great' ? 'checked ' : ''}great-artical nav-button`}
                            onClick={this.setKeyWord.bind(this, 'great')}
                        >
                            精品推荐
                        </div>
                        <div
                            className={`${keyword === 'hot' ? 'checked ' : ''}hot-artical nav-button`}
                            onClick={this.setKeyWord.bind(this, 'hot')}
                        >
                            热门文章
                        </div>
                        <Link to="/index/person/articaledit" target='_blank'>
                            <div className="add-artical">发布作品</div>
                        </Link>
                    </div>
                    <div className="content">
                        <ArticalLine data={[1, 2, 3, 4, 5, 6, 7, 8]} />
                    </div>
                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                        <Pagination
                            onChange={(value) => { this.current = value; this.queryList() }}
                            current={this.current}
                            total={100}
                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default ArticalList;