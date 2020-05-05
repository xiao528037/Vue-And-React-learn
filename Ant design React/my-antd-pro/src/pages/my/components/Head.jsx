import React, {Component} from 'react';
import {Input} from 'antd';
import {connect} from "dva";

@connect(({todo}) => ({
  todo
}))

class Head extends Component {
  constructor(props) {
    super(props);
    // 绑定ref
    this.myInput = React.createRef();
  }

  render() {
    return (
      <div className="todo-header">
        <Input type="text" ref={this.myInput} onKeyDown={(e) => this._handleEvent(e)} placeholder="请输入今天的任务清单，按回车键确认"/>
      </div>
    )
  }

  _handleEvent(e) {
    const {todos} = this.props.todo;
    const lastTodoId = todos.length === 0 ? 0 : todos[todos.length - 1].t_id;
    // 1. 判断是否是回车键
    if (13 === e.keyCode) {
      // 2. 判断输入的内容是否为空
      if (!this.myInput.current.state.value) {
        alert('输入的内容不能为空！');
        return;
      }
      // 3. 创建todo对象返回
      const todo = todos === "" ? {
        current: 1,
        title: this.myInput.current.state.value
      } : {
        current: this.props.todo.todos[0].current,
        title: this.myInput.current.state.value
      }
      const {dispatch} = this.props;
      dispatch({
        type: 'todo/add',
        payload: todo
      })
      // 4. 清空内容
      this.myInput.current.state.value = '';
    }
  }


}

export default Head
