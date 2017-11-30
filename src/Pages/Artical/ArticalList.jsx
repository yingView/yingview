import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Pagination, Ajax } from 'yingview-form';

import ArticalLine from '../../components/ArticalLine';

class ArticalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: this.props.location.query.keyword,
            total: 0
        }
        this.current = 1;
    }

    componentDidMount() {
        this.queryList();
    }

    queryList() {
        Ajax.get({
            url: window.hostname + 'yingview.php',
            data: {
                method: 'articalQuery',
                rpcname: 'artical',
                needType: this.state.keyword || 'all',
                current: this.current,
                size: 40
            },
            dataType: 'json',
            success: (res) => {
                const { content } = res;
                if (content.isSuccess) {
                    this.setState({
                        data: content.retValue.articalList,
                        total: content.retValue.total
                    });
                    this.current = content.retValue.current
                }
            }
        })
    }

    setKeyWord(keyword) {
        if (keyword === this.state.keyword) {
            return;
        }
        this.state.keyword = keyword;
        this.setState({ keyword }, this.queryList);

    }
    render() {
        const { keyword, data, total } = this.state;
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
                        <ArticalLine data={data} />
                    </div>
                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                        {
                            total ?
                                <Pagination
                                    onChange={(value) => { this.current = value; this.queryList() }}
                                    total={total} current={this.current} 
                                    pageSize={40} 
                                /> : null
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default ArticalList;