import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button, EditText, Ajax } from 'yingview-ui';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
require('./style.less');
class ArticalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'artical'
    }
  }
  componentDidMount() {
  }

  render() {
    const { page } = this.state;
    return (
      <div id="ying-view-artical-eidt">
        <div className="artical-edit-wrap">
          <div className="artical-edit">
            <div className="head-tab">
              <p
                className={`${page === 'artical' ? 'active ' : ''}tab`}
                onClick={() => { this.setState({ page: 'artical' }) }}
              >发布文章</p>
              <p
                className={`${page === 'img' ? 'active ' : ''}tab`}
                onClick={() => { this.setState({ page: 'img' }) }}
              >发布作品</p>
              <p className="info">Hi，蜗牛视界，请确认您拥有该作品的版权；带有 * 的项目是必填的哦。</p>
            </div>
            <div className="artical-content">
              {
                page === 'artical' ?
                  <table>
                    <tr>
                      <td className="title">文章标题</td>
                      <td className="content"><input type="text" className="text" /></td>
                    </tr>
                    <tr>
                      <td className="title">文章分类</td>
                      <td className="content">
                        <Radio
                          options={{ man: '男', woman: '女' }}
                        // value={this.sendData.sax}
                        // onChange={(value) => { this.sendData.sax = value; }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="title">上传封面</td>
                      <td className="content">
                        <FileUpload
                          text='上传封面'
                          tip={'图片尺寸： 290 * 180 px单个文件最大支持200k超过否则将无法显示'}
                          accept={['.jpg', '.jpeg', '.gif', '.png']}
                          onChange={(value) => {
                            console.log(value);
                          }}
                        />
                        <a href="http://127.0.0.1:8080/download.json?code=4DEA0766C06D49B9A089EA60F3DB6E1F.jpg" target="_blank">C3A47E663E294E2F8186E3CC17876177.jpg</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="title2">封面预览</td>
                      <td className="content2">
                        <div />
                      </td>
                    </tr>
                    <tr>
                      <td className="title">文章内容</td>
                      <td className="content">
                      <div className="artical-value">
                          <EditText
                            onChange={(value) => {console.log(value)}}
                            value={'<p>徐志飞测试</p><p>徐志飞测试2</p>'}
                          />
                      </div>
                      </td>
                    </tr>
                  </table> :
                  <table>
                    <tr>
                      <td className="title">文章标题</td>
                      <td className="content"><input type="text" className="text" /></td>
                    </tr>
                    <tr>
                      <td className="title">文章分类</td>
                      <td className="content">
                        <Radio
                          options={{ man: '男', woman: '女' }}
                        // value={this.sendData.sax}
                        // onChange={(value) => { this.sendData.sax = value; }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="title">作品说明</td>
                      <td className="content">
                        <textarea className="text-area"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="title">上传封面</td>
                      <td className="content">
                        <FileUpload
                          text='上传封面'
                          tip={'图片尺寸： 290 * 180 px单个文件最大支持200k超过否则将无法显示'}
                          accept={['.jpg', '.jpeg', '.gif', '.png']}
                          onChange={(value) => {
                            console.log(value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="title2">封面预览</td>
                      <td className="content2">
                        <div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="title">上传作品</td>
                      <td className="content">
                        <FileUpload
                          text='上传作品'
                          tip={'图片尺寸： 290 * 180 px单个文件最大支持200k超过否则将无法显示'}
                          accept={['.jpg', '.jpeg', '.gif', '.png']}
                          onChange={(value) => {
                            console.log(value);
                          }}
                        />
                      </td>
                    </tr>
                  </table>
              }
            </div>
            <div className="artical-button-wrap">
              <Button type="submit" text="发布" />
              <span style={{ padding: '0 10px'}} />
              <Button text="暂存"/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

module.exports = ArticalEdit;