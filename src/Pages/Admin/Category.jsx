import React, { Component } from 'react';
import { Ajax, Utils, Input } from 'yingview-form';

const { getCookie, deepCopy } = Utils;
require('./category.less');

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.current = 1;
    this.size = 16;
    this.userInfo = getCookie('user') ? JSON.parse(getCookie('user')) : {};
    this.line = {
      categoryCode: '',
      categoryName: '',
      parentCategoryId: null,
      categoryStatus: 1
    };
    if (!this.state.data.length) {
      this.state.data.push(deepCopy(this.line));
    }
    this.queryData();
  }

  queryData() {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'quertCategory',
        rpcname: 'category'
      },
      dataType: 'json',
      success: (res) => {
        const { content } = res;
        if (content.isSuccess) {
          this.setState({
            data: content.categoryList
          });
        }
      }
    });
  }

  addLine() {
    this.state.data.push(deepCopy(this.line));
    this.setState({ data: this.state.data });
  }

  deleteItem(code) {
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'deletetCategoryByCode',
        rpcname: 'category',
        categoryCode: code
      },
      dataType: 'json',
      success: (res) => {
      }
    })
  }

  saveData(item) {
    if (!item.categoryName) {
      return;
    }
    Ajax.get({
      url: window.hostname + 'yingview.php',
      data: {
        method: 'editCategory',
        rpcname: 'category',
        categoryCode: item.categoryCode,
        categoryName: item.categoryName,
        categoryStatus: item.categoryStatus,
        parentCategoryId: item.parentCategoryId
      },
      dataType: 'json',
      success: (res) => {
      }
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="admin-category-wrap">
        <div className="column-className-wrap">
          <ul className="className-list">
            {
              data.map((item, index) => {
                return (
                  <li key={index}>
                    <p className="name left">
                      <span>品类名称:</span>
                      <span>
                        <Input
                          value={item.categoryName}
                          width={'600px'}
                          onChange={(value) => {
                            item.categoryName = value;
                          }}
                        />
                      </span>
                    </p>
                    <p className="right">
                      <span
                        onClick={this.saveData.bind(this, item)}
                      >保存</span>
                      <span
                        onClick={() => {
                          this.state.data.splice(index, 1);
                          this.setState({ data: this.state.data });
                          if (item.categoryCode) {
                            this.deleteItem(item.categoryCode);
                          }
                        }}
                      >删除</span>
                    </p>
                  </li>
                );
              })
            }
          </ul>
          <div className="btn-wrap">
            <span>{this.state.data.length}</span>
            <span>条</span>
            <button
              className="add-btn"
              onClick={this.addLine.bind(this)}
            >添加</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Category;
