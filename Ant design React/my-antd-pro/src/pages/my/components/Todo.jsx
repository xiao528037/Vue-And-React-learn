import React, {PureComponent} from 'react';
import Head from "@/pages/my/components/Head";
import Foot from "@/pages/my/components/Foot";
import {connect} from "dva";

//这个{}中的名字必须和model的namespace对应，否则取不到数据到props中
@connect(({todo}) => ({
  todo
}))

class Todo extends PureComponent {
  constructor(props) {
    super(props);
  }

  //启动页面后获取数据
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'todo/myInit',
      payload: 1
    })
  }

  render() {
    const {todos, finishedCount} = this.props.todo;
    return (
      <div className="todo-container">
        {
          <div className="todo-wrap">
            {/*头部*/}
            <Head/>
            {/*尾部*/}
            <Foot/>
          </div>}
      </div>
    );
  }

  _getTodoAll() {
    const {dispatch} = this.props;
    dispatch({type: 'todo/fetch'})
  }
}


export default Todo;
