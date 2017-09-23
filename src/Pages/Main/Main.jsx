import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';
class Main extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div style={{ padding: '10px 0' }}>
                    <Carousel />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Main;