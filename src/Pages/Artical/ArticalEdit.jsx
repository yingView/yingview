import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button, EditText, Ajax, Utils, Dialog } from 'yingview-ui';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { getCookie } = Utils;
require('./style.less');
class ArticalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'artical',
      data: { articaltype: 'artical' },
      photoIdx: 1,
      typeList: []
    }
  }
  componentDidMount() {
    Ajax.get({
      url: 'http://127.0.0.1:8080/query.json',
      data: {
        method: 'typelist'
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          if (content.typeList && content.typeList.length) {
            const types = [];
            content.typeList.forEach((item) => {
              types.push({
                key: item.typeId,
                value: item.typeName
              })
            })
            this.setState({ typeList: types });
          }
        } else {
          Dialog.info({ content: content.message });
        }
      }
    })
  }

  deletePhoto() {
    this.state.data.articalphoto = null;
    this.setState({ photoIdx: this.state.photoIdx += 1 });
  }

  submit(opera) {
    const { data } = this.state;
    const userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : null;
    if (!userInfo) {
      // Dialog.info({ content: "请登录", submit: () => { window.location.href = '/#/login'; } });
      window.location.href = '/#/login';
      return;
    }

    if (!data.articaltitle) {
      Dialog.info({content: '请填写标题'});
    }
    if (!data.typeId) {
      Dialog.info({content: '请选择分类'});
    }
    if (!data.articalphoto) {
      Dialog.info({content: '请上传封面'});
    }
    if (!data.articalcontent && data.articaltype === 'artical') {
      Dialog.info({content: '请填写正文'});
    }
    if (!data.articalcontent && data.articaltype === 'image') {
      Dialog.info({content: '请填写作品说明'});
    }
    if (!data.articalimages && data.articaltype === 'image') {
      Dialog.info({content: '请填写正文'});
    }

    data.userId = userInfo.userid;
    data.articalphoto = data.articalphoto && data.articalphoto.fileviewAdd;
    Ajax.post({
      url: 'http://127.0.0.1:8080/artical.json',
      data: {
        method: 'edit',
        type: opera,
        content: JSON.stringify(data)
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          Dialog.success({ content: content.message, submit: () => { window.location.href = '/#/index/articallist?keyword=new' } });
        } else {
          Dialog.error({ content: content.message });
        }
      }
    })
  }

  render() {
    const { page, typeList, data } = this.state;
    return (
      <div id="ying-view-artical-eidt">
        <div className="artical-edit-wrap">
          <div className="artical-edit">
            <div className="head-tab">
              <p
                className={`${page === 'artical' ? 'active ' : ''}tab`}
                onClick={() => { this.setState({ page: 'artical' }); data.articaltype = 'artical'; }}
              >发布文章</p>
              <p
                className={`${page === 'img' ? 'active ' : ''}tab`}
                onClick={() => { this.setState({ page: 'img' }); data.articaltype = 'image'; }}
              >发布作品</p>
              <p className="info">Hi，蜗牛视界，请确认您拥有该作品的版权；带有 * 的项目是必填的哦。</p>
            </div>
            <div className="artical-content">
              <table>
                <tr>
                  <td className="title">文章标题</td>
                  <td className="content">
                    <input type="text" className="text" onChange={(e) => { data.articaltitle = e.target.value; }} />
                  </td>
                </tr>
                <tr>
                  <td className="title">文章分类</td>
                  <td className="content">
                    <Radio
                      options={typeList}
                      value={data.typeId}
                      onChange={(value) => { data.typeId = value.key; }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">上传封面</td>
                  <td className="content">
                    <FileUpload
                      text='上传封面'
                      showFiles={false}
                      tip={'图片尺寸： 290 * 180 px单个文件最大支持200k超过否则将无法显示'}
                      accept={['.jpg', '.jpeg', '.gif', '.png']}
                      onChange={(value) => {
                        data.articalphoto = value[value.length - 1];
                        if (value.length) {
                          this.setState({ photoIdx: this.state.photoIdx += 1 });
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title2">封面预览</td>
                  <td className="content2">
                    <div className="photo-wrap" key={this.state.photoIdx}>
                      {
                        data.articalphoto && <img src={data.articalphoto.fileviewAdd} alt={data.articalphoto.filename} />
                      }
                      {
                        data.articalphoto && <div className="delete-photo" onClick={this.deletePhoto.bind(this)}>删除</div>
                      }
                    </div>
                  </td>
                </tr>
                {
                  page === 'artical' ?
                    <tr>
                      <td className="title">文章内容</td>
                      <td className="content">
                        <div className="artical-value">
                          <EditText
                            onChange={(value) => { data.articalcontent = value; }}
                            value={'<p>徐志飞测试</p><p>徐志飞测试2</p>'}
                          />
                        </div>
                      </td>
                    </tr> :
                    <tr>
                      <td className="title">作品说明</td>
                      <td className="content">
                        <textarea
                          className="text-area"
                          onChange={(e) => {
                            data.articalcontent = e.target.value;
                          }}
                        ></textarea>
                      </td>
                    </tr>
                }
                {
                  page === 'artical' ?
                    null :
                    <tr>
                      <td className="title">上传作品</td>
                      <td className="content">
                        <FileUpload
                          text='上传作品'
                          tip={'图片尺寸： 290 * 180 px单个文件最大支持200k超过否则将无法显示'}
                          accept={['.jpg', '.jpeg', '.gif', '.png']}
                          showFiles
                          onChange={(value) => {
                            data.articalimages = value;
                          }}
                        />
                      </td>
                    </tr>
                }
              </table>
            </div>
            <div className="artical-button-wrap">
              <Button type="submit" text="发布" onClick={this.submit.bind(this, 'submit')} />
              <span style={{ padding: '0 10px' }} />
              <Button text="暂存" onClick={this.submit.bind(this, 'save')} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

module.exports = ArticalEdit;