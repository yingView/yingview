import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'yingview-form';


import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';

const artical = require('../../images/artical.png');
class Main extends React.Component {
    render() {
        return (
            <div id="ying-view-home">
                <Header />
                <div style={{ padding: '10px 0' }}>
                    <Carousel />
                </div>
                <div className="ying-view-content">
                    <div className="content-title clearfix">
                        <h2>最新作品</h2><p><a href="#" target="_blank">更多&gt;&gt;</a></p>
                    </div>
                    <div className="content">
                        <div className="content-part clearfix">
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl className="last">
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                        </div>
                        <div className="content-part clearfix">
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl className="last">
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="content-title clearfix">
                        <h2>精品推荐</h2><p><a href="#" target="_blank">更多&gt;&gt;</a></p>
                    </div>
                    <div className="content">
                        <div className="content-part clearfix">
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl className="last">
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                        </div>
                        <div className="content-part clearfix">
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl className="last">
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="content-title clearfix">
                        <h2>热门文章</h2><p><a href="#" target="_blank">更多&gt;&gt;</a></p>
                    </div>
                    <div className="content">
                        <div className="content-part clearfix">
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl className="last">
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                        </div>
                        <div className="content-part clearfix">
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                            <dl className="last">
                                <dt><a href="#" target="_blank"><img src={artical} alt="artical-photo" /></a></dt>
                                <dd><h3><a href="#" target="_blank">官网设计 | 酷九设计品牌官网</a></h3></dd>
                                <dd>
                                    <div className="look">1</div>
                                    <div className="mark">1</div>
                                    <div className="say">1</div>
                                </dd>
                                <dd className="clearfix">
                                    <a href="#" target="_blank">
                                        <div className="user">
                                            <div className="photo"></div>
                                            <div className="name">古川</div>
                                        </div>
                                    </a>
                                    <div className="time">20天前</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Main;