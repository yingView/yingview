import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pagination } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

require('./style.less');

class ArticalDetail extends Component {
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
                <div>详情页</div>
            </div>
        )
    }

}

module.exports =  ArticalDetail;