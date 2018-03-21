import React, { Component } from 'react';
import { Modal, Button, Icon, Input, Form, Row, Col } from 'antd';
import TreeItem from './conpment/TreeItem'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      inputValue: "",
      aItem: [],
      jsonItem: []
    };
    this.headleCancle = this.headleCancle.bind(this);
    this.headleShow = this.headleShow.bind(this);
    this.headleCancle = this.headleCancle.bind(this);
    this.inputValueChange = this.inputValueChange.bind(this);
    this.aItemADD = this.aItemADD.bind(this);
  };
  headleShow() {
    this.setState({
      visible: true
    });
  };
  headleCancle() {
    this.setState({
      visible: false
    });
  };
  inputValueChange(event) {
    this.setState({
      inputValue: event.target.value
    })
  }
  aItemADD(event) {
    let { aItem, jsonItem } = this.state;
    aItem.push(this.state.inputValue);
    // http://fengyitong.name:8095/api/test/gettest?name=0
    fetch(this.state.inputValue).then(res => {
      res.json().then(data => {
        // console.log(data);
        jsonItem.push(data)
        this.setState({
          aItem: aItem,
          jsonItem: jsonItem,
          visible: false,
          inputValue: "",
          loading: false
        })
      })
    });

  }
  aItemRemove(event) {
    let { aItem, jsonItem } = this.state;
    aItem.splice(event, 1);
    jsonItem.splice(event, 1);
    this.setState({
      aItem: aItem,
    })
  }

  render() {
    const { aItem, inputValue, jsonItem, loading } = this.state;
    let aItemArr = aItem.length !== 0 ? aItem.map((value, key) => {
      return <div key={value}>
        <Input style={{ width: '60%', marginRight: 8 }} value={value} readOnly />
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => this.aItemRemove(key)}
        />
      </div>
    }) : <div>无数据</div>
    let jsonItemLength = jsonItem.length;
    let listTree = jsonItem.map((value, index) => {
      return (
        <Col span={24 / jsonItemLength} key={`${index}${Math.random(100)}`}>
          <TreeItem data={value} flgdata={jsonItem[0]} />
        </Col>
      )
    });
    return (
      <div >
        <div className="App">
          <Modal
            visible={this.state.visible}
            title="请填写需要添加的连接"
            footer={[
              <Button key="back" onClick={this.headleCancle}>取消</Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.aItemADD}>
                确认
              </Button>,
            ]}
          >
            <Form>
              <Input placeholder="http://118.24.62.236:3021" value={inputValue} onChange={this.inputValueChange} />
            </Form>
          </Modal>
          接口地址：
        {aItemArr}
          <Button type="dashed" onClick={this.headleShow} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加地址
        </Button>
        </div>
        <Row gutter={16}>
          {listTree}
        </Row>
      </div >
    );
  }
}

export default App;
