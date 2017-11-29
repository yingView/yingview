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
      data: { articalType: 0, articalContent: '<p>徐志飞测试</p><p>徐志飞测试2</p>', articalText: '123', articalDesc: '作品说明' },
      photoIdx: 1,
      categoryList: []
    }
    this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : null;
  }

  componentDidMount() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
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
                key: item.categoryCode,
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
    const data = Utils.deepCopy(this.state.data);
    if (!data.articalTitle) {
      Dialog.info({ content: '请填写标题' });
      return;
    }
    if (!data.categoryCode && data.articalType !== 2) {
      Dialog.info({ content: '请选择分类' });
      return;
    }
    if (!data.bookId && data.articalType === 2) {
      Dialog.info({ content: '请选择专栏' });
      return;
    }
    if (!data.articalPhoto && data.articalType !== 2) {
      Dialog.info({ content: '请上传封面' });
      return;
    }

    if ((!data.articalContent || !data.articalText) && data.articalType !== 1) {
      Dialog.info({ content: '请填写正文' });
      return;
    }

    if (!data.articalDesc && data.articalType === 1) {
      Dialog.info({ content: '请填写作品说明' });
      return;
    }

    if (!data.articalImages && data.articalType === 1) {
      Dialog.info({ content: '请上传作品' });
      return;
    }

    const arr = [];
    data.articalImages && data.articalImages.forEach(item => {
      arr.push(item.fileCode);
    });

    if (data.articalType === 2) {
      data.articalContent = data.articalText;
      data.articalPhoto = 1;
      data.categoryCode = 1;
      delete data.articalText;
    }
    if (data.articalType === 1) {
      data.articalContent = data.articalDesc;
      delete data.articalDesc;
    }

    data.articalImages = String(arr);
    data.userCode = this.userInfo.userCode;
    // 存储附件的名字 + mine
    data.articalPhoto = data.articalPhoto && data.articalPhoto.fileName;
    Ajax.post({
      url: window.hostname + 'yingview.php',
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
              <p
                className={`${page === 'book' ? 'active ' : ''}tab`}
                onClick={() => { this.setState({ page: 'book' }); data.articalType = 2; }}
              >专栏作品</p>
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
                {
                  page === 'book' ?
                    <tr>
                      <td className="title">专栏选择</td>
                      <td className="content">
                        <Radio
                          options={categoryList}
                          value={data.bookId}
                          onChange={(value) => { data.bookId = value.key; }}
                        />
                      </td>
                    </tr> :
                    <tr>
                      <td className="title">文章分类</td>
                      <td className="content">
                        <Radio
                          options={categoryList}
                          value={data.categoryCode}
                          onChange={(value) => { data.categoryCode = value.key; }}
                        />
                      </td>
                    </tr>
                }
                {
                  page === 'book' ? null :
                    <tr>
                      <td className="title">上传封面</td>
                      <td className="content">
                        <FileUpload
                          text='上传封面'
                          showFiles={false}
                          tip={'图片尺寸： 290 * 180 px单个文件最大支持200k超过将无法显示'}
                          accept={['.jpg', '.jpeg', '.gif', '.png']}
                          params={{ type: 1, userCode: this.userInfo.userCode }}
                          onChange={(value) => {
                            data.articalPhoto = value[value.length - 1];
                            if (value.length) {
                              this.setState({ photoIdx: this.state.photoIdx += 1 });
                            }
                          }}
                        />
                      </td>
                    </tr>
                }
                {
                  page === 'book' ? null :
                    <tr>
                      <td className="title2">封面预览</td>
                      <td className="content2">
                        <div className="photo-wrap" key={this.state.photoIdx}>
                          {
                            data.articalPhoto && <img src={window.hostname + data.articalPhoto.url} alt={data.articalPhoto.fileName} />
                          }
                          {
                            data.articalPhoto && <div className="delete-photo" onClick={this.deletePhoto.bind(this)} />
                          }
                        </div>
                      </td>
                    </tr>
                }
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
                    </tr> : null
                }
                {
                  page === 'img' ?
                    <tr>
                      <td className="title">作品说明</td>
                      <td className="content">
                        <textarea
                          className="text-area"
                          defaultValue={data.articalDesc}
                          onChange={(e) => {
                            data.articalDesc = e.target.value;
                          }}
                        ></textarea>
                      </td>
                    </tr> : null
                }
                {
                  page === 'img' ?
                    <tr>
                      <td className="title">上传作品</td>
                      <td className="content">
                        <FileUpload
                          text='上传作品'
                          tip={'支持格式jpg、jpeg、git、png, 最多可上传20张'}
                          accept={['.jpg', '.jpeg', '.gif', '.png']}
                          showFiles
                          multiple
                          data={data.articalImages}
                          params={{ type: 2, userCode: this.userInfo.userCode }}
                          onChange={(value) => {
                            data.articalImages = value;
                          }}
                        />
                      </td>
                    </tr> : null
                }
                {
                  page === 'book' ?
                    <tr>
                      <td className="title">文章内容</td>
                      <td className="content">
                        <div className="artical-value">
                          <textarea
                            defaultValue={data.articalText}
                            className="textarea-text"
                            onChange={(e) => { const value = e.target.value; data.articalText = value; }}
                          />
                        </div>
                      </td>
                    </tr> : null
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