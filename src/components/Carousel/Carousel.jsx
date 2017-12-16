import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const banner = require('./../../images/banner.jpg');

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: 0,
      className: 'move-wrap',
      nowImgIdx: 0
    }
    this.data = props;
    this.number = 0;
  }

  componentDidMount() {
    const { autoplay } = this.data;
    if (autoplay) {
      clearInterval(this.timer);
      // this.number = 1;
      this.autoPlay();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.data = nextProps;
    const { autoplay } = this.data;
    if (autoplay) {
      clearInterval(this.timer);
      this.autoPlay();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  autoPlay() {
    const { time, banners, width } = this.data;
    this.timer = setInterval(() => {
      this.play(this.number);
      this.number += 1;
      if (this.number === banners.length + 1) {
        this.setState({ now: 0 });
        setTimeout(() => {
          this.setState({ className: 'default-position' });
          this.setState({ nowImgIdx: 0 });
          setTimeout(() => {
            this.setState({ className: 'move-wrap' })
          }, 500)
        }, 500);
        this.number = 1;
      }
    }, time)
  }

  play(number) {
    this.setState({ now: number, nowImgIdx: number });
  }

  next() {
    if (this.number === this.data.banners.length) {
      this.play(0);
      this.number = 1;
    } else {
      this.play(this.number);
      this.number += 1;
    }
  }

  prev() {
    this.number -= 1;
    if (this.number <= 0) {
      this.play(this.data.banners.length - 1);
      this.number = this.data.banners.length - 1;
    } else {
      this.play(this.number);
    }
  }

  render() {
    const { width, banners, height, tab } = this.data;
    if (!banners || !banners.length) {
      return <div />;
    }
    return (
      <div id="ying-view-carousel">
        <div
          className="banner-wrap"
          style={{ width: width + 'px', height: height + 'px', overflow: 'hidden' }}
          onMouseEnter={() => { clearInterval(this.timer); }}
          onMouseLeave={() => {
            if (this.data.autoplay) {
              this.autoPlay();
            }
          }}
        >
          <div className="next" style={{ top: height/2 + 'px'}} onClick={this.next.bind(this)}>下一个</div>
          <div className="prev" style={{ top: height/2 + 'px'}} onClick={this.prev.bind(this)}>前一个</div>
          <ul className={this.state.className} style={{ transform: `translateX(-${width * this.state.nowImgIdx}px)`, height: height + 'px' }}>
            {
              banners && banners.map((item, idx) => {
                const { imgUrl, href, target } = item;
                return (<li key={idx} style={{ width: width + 'px', height: height + 'px' }}>
                  <a href={href} target={target || '_blank'}>
                    <img src={imgUrl} alt="banner" style={{ width: width + 'px', height: height + 'px', display: 'block', border: 'none' }}/>
                  </a>
                </li>);
              })
            }
            {
              banners ? <li style={{ width: width + 'px', height: height + 'px' }}>
                <a href={banners[0].href} target={banners[0].target || '_blank'}>
                  <img src={banners[0].imgUrl} alt="banner" style={{ width: width + 'px', height: height + 'px', display: 'block', border: 'none' }} />
                </a>
              </li> : null
            }
          </ul>
          <ul className="tab-radius" style={{ left: ((width - (banners.length * 34)) / 2) + 'px' }}>
            {
              banners && banners.map((item, idx) => {
                return (<li key={idx} style={idx === this.state.now ? { opacity: 1 } : { opacity: 0.6 }} onClick={() => {
                  this.number = idx;
                  this.play(idx);
                }} />);
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  time: React.PropTypes.number,
  tab: React.PropTypes.bool,
  banners: React.PropTypes.array,
  autoplay: React.PropTypes.bool,
};
Carousel.defaultProps = {
  width: 1200,
  height: 400,
  time: 3000,
  tab: true,
  banners: [
    { imgUrl: banner, href: 'http://www.yingview.com', target: '_blank' },
    { imgUrl: banner, href: 'http://www.yingview.com', target: '_blank' },
    { imgUrl: banner, href: 'http://www.yingview.com', target: '_blank' }
  ],
  autoplay: true
};

export default Carousel;