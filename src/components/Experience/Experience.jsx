import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Ajax, Utils, Textarea, Calendar } from 'yingview-form';


class Experience extends Component {
    render() {
        const { data } = this.props;
        return (
            <div id="ying-view-experience">
                <div className="experience-item">
                    <div className="experience-time">
                        <Calendar
                            width={'128px'}
                        />
                         <span style={{ padding: '0 3px'}}>--</span> 
                        <Calendar
                            width={'128px'}
                        />
                    </div>
                    <div className="experience-desc">
                        <Textarea 
                            width={'280px'}
                            height={'40px'}
                            fontSize={'12px'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Experience;