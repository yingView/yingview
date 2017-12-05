import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button, Pagination } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Fans extends Component {
    render() {
        return (
            <div className="person-fans-wrap">
                <ul className="person-fans-list clearfix">
                    <li className="person-fans-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-fans-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-fans-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-fans-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-fans-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-fans-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-fans-item">
                        <img src="" alt=""/>
                    </li>
                    <li className="person-fans-item">
                        <img src="" alt=""/>
                    </li>
                </ul>
                <div className="person-fans-pagination">
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

module.exports = Fans;