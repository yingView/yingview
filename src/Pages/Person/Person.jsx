import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Person extends Component {
    render() {
        return (
            <div id="ying-view-person">
                {
                    this.props.children
                }
          </div>
        )
    }
}

export default Person;