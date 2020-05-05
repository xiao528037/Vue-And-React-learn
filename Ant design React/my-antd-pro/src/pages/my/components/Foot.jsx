import React, {Component} from 'react';
import {Card, Button, Popconfirm} from "antd";
import {connect} from "dva";
import List from "@/pages/my/components/List";

@connect(({todo}) => ({
    todo
  })
)
class Foot extends Component {
  constructor(props) {
    super(props);
  }

  //删除所有选中的数据
  deleteTodoByIds = () => {
    const {selectedRowKeys, todos} = this.props.todo;
    const current = todos[0].current;
    this.props.dispatch({
      type: 'todo/deleteByIds',
      payload: {selectedRowKeys, current}
    })
  }



  render() {
    const {paginationProps, selectedRowKeys} = this.props.todo;
    const total = paginationProps.total;
    const keys = selectedRowKeys.length;
    return (
      <Card title={`当前选中有:${keys},总共有:${total}`} extra={
        <Popconfirm title="您确认删除吗？" onConfirm={() => this.deleteTodoByIds()}>
          <Button>删除</Button>
        </Popconfirm>} style={{width: '100%'}}>
        {/*列表*/}
        <List/>
      </Card>
    )
  }
}


export default Foot
