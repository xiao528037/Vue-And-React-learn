import React, {Component, useContext, useState, useEffect, useRef} from 'react';
import {Table, Input, Button, Popconfirm, Form, Radio, Divider} from 'antd';
import {connect} from "dva";


//从model中的state获取数据
@connect(({todo}) => ({
  todo
}))

class List extends Component {
  constructor(props) {
    super(props);
  }

  handleDelete = (id) => {
    const {dispatch, todo} = this.props;
    const {selectedRowKeys, todos} = this.props.todo;
    const current = todos[0].current;
    dispatch({
      type: 'todo/delete',
      payload: {id, current}
    })
  };

  pageTodos = (current) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'todo/myInit',
      payload: current
    })
  }

  onSelectChange = selectedRowKeys => {
    const {dispatch} = this.props;
    dispatch({type: 'todo/changRowIndex', payload: selectedRowKeys})
  };

  render() {
    const {todos, selectedRowKeys} = this.props.todo;
    const columns = [
      {
        title: '序号',
        width: '10%',
        fixed: 'left',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '业务编号',
        dataIndex: 'id',
        width: '10%',
        fixed: 'left'
      },
      {
        title: '消息',
        dataIndex: 'title',
        width: '30%',
        fixed: 'left',
      },
      {
        title: '操作',
        dataIndex: (record) => {
          return record.id.toString();
        },
        render: (text, record) =>
          todos.length >= 1 ? (
            <Popconfirm title="您确认删除吗？"
                        onConfirm={() => this.handleDelete(record.id)}>
              <Button>删除</Button>
            </Popconfirm>
          ) : null
      },
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          key: 'odd',
          text: '选择奇数行',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.props.dispatch({type: 'todo/changRowIndex', payload: newSelectedRowKeys})
          },
        },
        {
          key: 'even',
          text: '选择偶数行',
          onSelect: (changableRowKeys) => {
            console.log(changableRowKeys)
            let newSelectedRowKeys = [];
            //changgableRowkeys遍历行的key
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.props.dispatch({type: 'todo/changRowIndex', payload: newSelectedRowKeys})
          },
        },
      ],
    };

    let {paginationProps} = this.props.todo;
    paginationProps = {...paginationProps, onChange: (current) => this.pageTodos(current)}


    return (
      <Table
        pagination={paginationProps}
        dataSource={todos}
        rowKey={(record, index) => {
          return index;
        }}
        rowSelection={rowSelection}
        bordered
        columns={columns}
      />
    )
  }
}

export default List
