import React, { Component } from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

class TreeItem extends Component {
  constructor(props) {
    super(props);
    this.onShowTreeNodeChild = this.onShowTreeNodeChild.bind(this);
  };
  onShowTreeNodeChild(data, flgdata) {
    let list = [];
    //当字段为字符串类型就调用下面的字符串方法
    if (typeof (data) === 'object') {
      list.push(
        <TreeNode title="" key={`${Math.random(100)}`} >
          {this.onShowObj(data, flgdata)}
        </TreeNode>
      )
    } else {
      for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        let flgtemp = flgdata[i];
        for (const key in temp) {
          if (temp.hasOwnProperty(key)) {
            const element = temp[key];
            const flgelement = flgtemp.hasOwnProperty(key) ? flgtemp[key] : null;
            if (typeof (element) === 'object') {
              list.push(
                <TreeNode title={`${key}`} key={`${i}${Math.random(100)}`} >
                  {this.onShowTreeNodeChild(element, flgelement)}
                </TreeNode>
              )
            } else {
              if (element === flgelement) {
                list.push(<TreeNode title={`${key}:${element}`} key={`${i}${Math.random(100)}`} />)
              } else {
                list.push(<TreeNode title={
                  <span style={{ color: '#1890ff' }}>{`${key}:${element}`}</span>
                } key={`${i}${Math.random(100)}`} />)
              }
            }
          }
        }
      }
    }
    return list;
  }
  onShowObj(data, flgdata) {
    let list = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        //判断新加语句的时候直接就返回当前语句
        if (flgdata === null) {
          list.push(<TreeNode title={
            <span style={{ color: '#1890ff' }}>{`${key}:${element}`}</span>
          } key={`${key}${Math.random(100)}`} />)
          return list
        }
        const flgelement = flgdata.hasOwnProperty(key) ? flgdata[key] : null;
        if (typeof (element) === 'object') {
          list.push(
            <TreeNode title={`${key}`} key={`${key}${Math.random(100)}`} >
              {this.onShowTreeNodeChild(element, flgelement)}
            </TreeNode>
          )
        } else {
          if (element === flgelement) {
            list.push(<TreeNode title={`${key}:${element}`} key={`${key}${Math.random(100)}`} />)
          } else {
            list.push(<TreeNode title={
              <span style={{ color: '#1890ff' }}>{`${key}:${element}`}</span>
            } key={`${key}${Math.random(100)}`} />)
          }
        }
      }
    }
    return list;
  }
  onSelect(selectedKeys, info) {
    console.log('selected', selectedKeys, info);
  };
  render() {
    let { data, flgdata } = this.props;
    let a = data.length !== 0 ? this.onShowTreeNodeChild(data, flgdata) : <TreeNode title="无" />;
    return (
      <Tree
        showLine
        className="draggable-tree"
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
        defaultExpandAll={true}
      >
        {a}
      </Tree>
    );
  }
}

export default TreeItem;