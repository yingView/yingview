import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button, Pagination } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Album extends Component {
    render() {
        return (
            <div className="person-album-wrap">
                <ul className="person-album-list clearfix">
                    <li className="person-album-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-album-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-album-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-album-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-album-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-album-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-album-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-album-item">
                        <img src="" alt=""/>
                    </li>
                </ul>
                <div className="person-album-pagination">
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

module.exports = Album;