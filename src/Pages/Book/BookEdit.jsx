import React, { Component } from 'react';
import { Radio, FileUpload, Button, Ajax, Utils, Dialog, Input, Textarea } from 'yingview-form';

const { getCookie, decodeHTML } = Utils;

require('./BookEdit.less');

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { bookType: 0, bookContent: '', bookText: '', bookDesc: '' },
      photoIdx: 1,
      categoryList: []
    };
    this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
    if (props.location.query.bookCode) {
      this.queryDetail();
    }
  }

  componentDidMount() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'category',
        method: 'quertCategory'
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
              });
            });
            this.setState({ categoryList });
          }
        } else {
          Dialog.info({ content: content.message });
        }
      }
    });
  }

  queryDetail() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        rpcname: 'book',
        method: 'getBookByCode',
        bookCode: this.props.location.query.bookCode
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          if (content.bookInfo.userCode !== this.userInfo.userCode) { // 如果编辑人和文章作者不符合
            window.location.href = '/#/index/bookdetail?bookCode=' + content.bookInfo.bookCode;
          }
          content.bookInfo.bookContent = decodeHTML(content.bookInfo.bookContent);
          this.setState({
            data: content.bookInfo
          });
        } else {
          Dialog.info({ content: content.message });
        }
      }
    });
  }

  deletePhoto() {
    this.state.data.bookPhoto = null;
    this.setState({ photoIdx: this.state.photoIdx += 1 });
  }

  submit(operate) {
    const data = Utils.deepCopy(this.state.data);
    if (!data.bookName) {
      Dialog.info({ content: '请填写标题' });
      return;
    }
    if (!data.categoryCode) {
      Dialog.info({ content: '请选择分类' });
      return;
    }
    if (!data.bookPhoto) {
      Dialog.info({ content: '请上传封面' });
      return;
    }

    if (!data.bookDesc) {
      Dialog.info({ content: '请填写作品说明' });
      return;
    }

    data.userCode = this.userInfo.userCode;
    // 存储附件的名字 + mine
    data.bookPhoto = data.bookPhoto && data.bookPhoto.fileName;
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'edit',
        rpcname: 'book',
        operate,
        content: JSON.stringify(data)
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          Dialog.success({ content: content.message, submit: () => { window.location.href = '/#/index/book?bookCode' + content.bookCode; } });
        } else {
          Dialog.error({ content: content.message });
        }
      }
    });
  }

  render() {
    const { categoryList, data } = this.state;
    return (
      <div id="ying-view-book-eidt">
        <div className="book-edit-wrap">
          <div className="book-edit">
            <div className="head-tab">
              <p className={'active tab'}>专栏</p>
              <p className="info">{`Hi，${this.userInfo.nickName}，请确认您拥有该作品的版权；带有 * 的项目是必填的哦。`}</p>
            </div>
            <div className="book-content">
              <table>
                <tr>
                  <td className="title">专栏名称</td>
                  <td className="content">
                    <Input
                      type="text"
                      value={data.bookName}
                      onChange={(value) => { data.bookName = value; }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">专栏分类</td>
                  <td className="content">
                    <Radio
                      options={categoryList}
                      value={data.categoryCode}
                      onChange={(value) => { data.categoryCode = value.key; }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">上传封面</td>
                  <td className="content">
                    <FileUpload
                      text={'上传封面'}
                      showFiles={false}
                      tip={'图片尺寸： 290 * 180 px单个文件最大支持200k超过将无法显示'}
                      accept={['.jpg', '.jpeg', '.gif', '.png']}
                      params={{ type: 1, userCode: this.userInfo.userCode }}
                      onChange={(value) => {
                        data.bookPhoto = value[value.length - 1];
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
                        data.bookPhoto && <img src={window.hostname + data.bookPhoto.url} alt={data.bookPhoto.fileName} />
                      }
                      {
                        data.bookPhoto && <div className="delete-photo" onClick={this.deletePhoto.bind(this)} />
                      }
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="title">简介</td>
                  <td className="content">
                    <Textarea
                      width={'960px'}
                      height={'130px'}
                      value={data.bookDesc}
                      onChange={(value) => {
                        data.bookDesc = value;
                      }}
                    />
                  </td>
                </tr>
              </table>
            </div>
            <div className="book-button-wrap">
              <Button type="submit" text="发布" onClick={this.submit.bind(this, 'submit')} />
              <span style={{ padding: '0 10px' }} />
              <Button text="暂存" onClick={this.submit.bind(this, 'save')} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

module.exports = BookDetail;
