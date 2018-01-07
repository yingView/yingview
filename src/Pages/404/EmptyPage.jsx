import React, { Component } from 'react';
import Header from '../../components/Header';

class EmptyPage extends Component {
  render() {
    return (
      <div id="ying-view-404">
        <Header />
        <div className="login-wrap-ying">
          <div className="head-ying-view">
            404 NOT FOND
                    </div>
        </div>
        {/* <div style={{ position: 'absolute', bottom: '0', width: '100%'}}>
                    <Footer />
                </div> */}
      </div>
    );
  }
}

export default EmptyPage;
