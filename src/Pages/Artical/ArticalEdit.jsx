import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Radio, FileUpload, Button, EditText, Ajax, Utils, Dialog } from 'yingview-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { getCookie } = Utils;
require('./style.less');
class ArticalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'artical',
      data: { articalType: 0, articalContent: '<p>徐志飞测试</p><p>徐志飞测试2</p>' },
      photoIdx: 1,
      categoryList: []
    }
    this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : null;
  }
  componentDidMount() {
    Ajax.get({
      url: window.hostname + '',
      data: {
        method: 'category'
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          if (content.categoryList && content.categoryList.length) {
            const categoryList = [];
            content.categoryList.forEach((item) => {
              categoryList.push({
                key: item.categoryId,
                value: item.categoryName
              })
            })
            this.setState({ categoryList });
          }
        } else {
          Dialog.info({ content: content.message });
        }
      }
    })
  }

  deletePhoto() {
    this.state.data.articalPhoto = null;
    this.setState({ photoIdx: this.state.photoIdx += 1 });
  }

  submit(operate) {
    const { data } = this.state;

    if (!this.userInfo) {
      // Dialog.info({ content: "请登录", submit: () => { window.location.href = '/#/login'; } });
      window.location.href = '/#/login';
      return;
    }

    if (!data.articalTitle) {
      Dialog.info({ content: '请填写标题' });
    }
    if (!data.categoryId) {
      Dialog.info({ content: '请选择分类' });
    }
    if (!data.articalPhoto) {
      Dialog.info({ content: '请上传封面' });
    }
    if (!data.articalContent && data.articalType === 0) {
      Dialog.info({ content: '请填写正文' });
    }
    if (!data.articalContent && data.articalType === 1) {
      Dialog.info({ content: '请填写作品说明' });
    }
    if (!data.ararticalImages && data.articalType === 1) {
      Dialog.info({ content: '请填写正文' });
    }

    data.userCode = this.userInfo.userCode;
    data.articalPhoto = data.articalPhoto && data.articalPhoto.fileviewAdd;
    Ajax.post({
      url: window.hostname + '',
      data: {
        method: 'edit',
        rpcname: 'artical',
        operate,
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
    const { page, categoryList, data } = this.state;
    if (!this.userInfo) { // 没有登录信息;
      window.location.href = '/#/login';
    }
    return (
      <div id="ying-view-artical-eidt">
        <div className="artical-edit-wrap">
          <div className="artical-edit">
            <div className="head-tab">
              <p
                className={`${page === 'artical' ? 'active ' : ''}tab`}
                onClick={() => { this.setState({ page: 'artical' }); data.articalType = 0; }}
              >发布文章</p>
              <p
                className={`${page === 'img' ? 'active ' : ''}tab`}
                onClick={() => { this.setState({ page: 'img' }); data.articalType = 1; }}
              >发布作品</p>
              <p className="info">{`Hi，${this.userInfo.nickName}，请确认您拥有该作品的版权；带有 * 的项目是必填的哦。`}</p>
            </div>
            <div className="artical-content">
              <table>
                <tr>
                  <td className="title">文章标题</td>
                  <td className="content">
                    <input
                      type="text"
                      className="text"
                      placeholder="请填写文章标题"
                      onChange={(e) => { data.articalTitle = e.target.value; }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">文章分类</td>
                  <td className="content">
                    <Radio
                      options={categoryList}
                      value={data.categoryId}
                      onChange={(value) => { data.categoryId = value.key; }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">上传封面</td>
                  <td className="content">
                    <FileUpload
                      text='上传封面'
                      showFiles={false}
                      // multiple
                      tip={'图片尺寸： 290 * 180 px单个文件最大支持200k超过否则将无法显示'}
                      accept={['.jpg', '.jpeg', '.gif', '.png']}
                      params={{type: 1, userCode: this.userInfo.userCode}}
                      onChange={(value) => {
                        data.articalPhoto = value[value.length - 1];
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
                        data.articalPhoto && <img src={data.articalPhoto.fileviewAdd} alt={data.articalPhoto.filename} />
                      }
                      {
                        data.articalPhoto && <div className="delete-photo" onClick={this.deletePhoto.bind(this)}>删除</div>
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
                            onChange={(value) => { data.articalContent = value; }}
                            value={data.articalContent}
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
                            data.articalContent = e.target.value;
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
                          // url={window.hostname}
                          onChange={(value) => {
                            data.ararticalImages = value;
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