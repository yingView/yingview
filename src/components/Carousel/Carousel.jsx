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
    this.number = 1;
  }

  componentDidMount() {
    const { autoplay } = this.props;
    if (autoplay) {
      this.autoPlay();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  autoPlay() {
    const { time, imgs, width } = this.props;
    this.timer = setInterval(() => {
      this.play(this.number);
      this.number += 1;
      if (this.number === imgs.length + 1) {
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

  render() {
    const { width, imgs } = this.props;
    return (
      <div id="ying-view-carousel">
        <div
          className="banner-wrap"
          style={{ width: width + 'px' }}
          onMouseEnter={() => { clearInterval(this.timer) }}
          onMouseLeave={() => {
            if (this.props.autoplay) {
              this.autoPlay();
            }
          }}
        >
          <ul className={this.state.className} style={{ transform: `translateX(-${width * this.state.nowImgIdx}px)` }}>
            {
              imgs && imgs.map((item, idx) => {
                const { img, href, tab } = item;
                return (<li key={idx}><a href={href} target={tab}><img src={img} alt="banner" /></a></li>);
              })
            }
            {
              imgs ? <li><a href={imgs[0].href} target={imgs[0].tab}><img src={imgs[0].img} alt="banner" /></a></li> : null
            }
          </ul>
          <ul className="tab-radius" style={{ left: ((width - (imgs.length * 34)) / 2) + 'px' }}>
            {
              imgs && imgs.map((item, idx) => {
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
  time: React.PropTypes.number,
  imgs: React.PropTypes.array,
  autoplay: React.PropTypes.bool,
};
Carousel.defaultProps = {
  width: 1200,
  time: 3000,
  imgs: [
    { img: banner, href: 'http://www.yingview.com', tab: '_blank' },
    { img: banner, href: 'http://www.yingview.com', tab: '_blank' },
    { img: banner, href: 'http://www.yingview.com', tab: '_blank' }
  ],
  autoplay: true
};

export default Carousel;