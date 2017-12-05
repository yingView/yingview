import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button, Pagination } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Follow extends Component {
    render() {
        return (
            <div className="person-follow-wrap">
                <ul className="person-follow-list clearfix">
                    <li className="person-follow-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-follow-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-follow-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-follow-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-follow-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-follow-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-follow-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-follow-item">
                        <img src="" alt=""/>
                    </li>
                </ul>
                <div className="person-follow-pagination">
                    <Pagination
                        size={10}
                        current={1}
                        total={1}
                    />
                </div>
            </div>
        )
    }
}

module.exports = Follow;