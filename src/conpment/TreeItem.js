import React, { Component } from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

class TreeItem extends Component {
  constructor(props) {
    super(props);
    this.onShowTreeNodeChild = this.onShowTreeNodeChild.bind(this);
  };
  onShowTreeNodeChild(data) {
    let list = [];
    for (let i = 0; i < data.length; i++) {
      let temp = data[i];
      for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
          const element = temp[key];
          if (typeof (element) === 'object') {
            list.push(
              <TreeNode title={`${key}`} key={`${i}${Math.random(100)}`} >
                {this.onShowTreeNodeChild(element)}
              </TreeNode>
            )
          } else {
            list.push(<TreeNode title={`${key}:${element}`} key={`${i}${Math.random(100)}`} />)
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
    let data = this.props.data;
    let a = data.length !== 0 ? this.onShowTreeNodeChild(data) : <TreeNode title="无" />;
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