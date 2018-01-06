import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route } from 'react-router';
import { Pagination } from 'yingview-form';

import Header from './components/Header';
import Footer from './components/Footer';
import ArticalLine from './components/ArticalLine';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <div>
          {
            this.props.children
          }
        </div>
        <Footer />
      </div>
    )
  }
}

module.exports = Index;