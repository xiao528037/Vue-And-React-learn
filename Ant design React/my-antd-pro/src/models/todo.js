import {getAllTodo, deleteById, deleteByIds, getPageTodos, addTodo} from '@/services/todo'
import todo from "../../mock/todo";


const TodoModel = {

  namespace: 'todo',
  //初始化state中的数据
  state: {
    todos: [],
    selectedRowKeys: [],
    finishedCount: [],
    paginationProps: {
      showTitle: false,
      current: 1,
      showSizeChanger: false,
      total: 0,
      pageSize: 10,
      showQuickJumper: false,
      onChange: (current) => this.pageTodos(current)
    }
  },
  effects: {
    * initState({payload}, {put}) {
      const todos = payload;
      let paginationProps = null;
      if (todos.length == 0 || todos === "") {
        paginationProps = {
          showTitle: false,
          current: 1,
          showSizeChanger: false,
          total: 0,
          pageSize: 10,
          showQuickJumper: false,
          onChange: (current) => this.pageTodos(current)
        }
      } else {
        const todo = todos[0];
        paginationProps = {
          showTitle: todo.showTitle,
          current: todo.current,
          showSizeChanger: todo.showSizeChanger,
          total: todo.total,
          totalPage: todo.totalPage,
          pageSize: todo.pageSize,
          showQuickJumper: todo.showQuickJumper,
        }
      }
      yield put({
        type: "initData",
        payload: {todos, paginationProps}
      })
    },
    * fetch({payload}, {call, put}) {
      const todos = yield call(getAllTodo);
      yield  put({
        type: 'update',
        payload: todos
      });
    },
    * delete({payload}, {call, put}) {
      const todos = yield call(deleteById, payload)
      yield put({type: 'initState', payload: todos})
    },
    * add({payload}, {call, put}) {
      console.log(payload)
      const todos = yield call(addTodo, payload)
      yield put({type: 'initState', payload: todos})
    },
    * changRowIndex({payload}, {put}) {
      yield  put({type: 'changeIndex', payload})
    },
    * deleteByIds({payload}, {put, call, select}) {
      const {todo} = yield select((state) => state)
      const arr = payload.selectedRowKeys.map((value) => {
        return todo.todos[value].id;
      })
      payload.selectedRowKeys = arr;
      const todos = yield call(deleteByIds, payload)
      yield put({type: "initState", payload: todos})
    },
    * myInit({payload}, {call, put}) {
      const pageTodos = yield call(getPageTodos, payload)
      yield put({type: "initState", payload: pageTodos})
    }
  },
  reducers: {
    update(state, {payload}) {
      return {...state, todos: payload};
    },
    changeIndex(state, {payload}) {
      return {...state, selectedRowKeys: payload}
    },
    //初始化数据
    initData(state, {payload}) {
      return {...state, todos: payload.todos, paginationProps: payload.paginationProps, selectedRowKeys: []}
    },
    addTodos(state, {payload}) {
      return {...state, todos: payload.todos, paginationProps: state.paginationProps, selectedRowKeys: []}
    }
  }
}
export default TodoModel;
