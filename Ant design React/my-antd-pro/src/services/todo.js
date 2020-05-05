import request from '@/utils/request';


export async function getAllTodo() {
  return request('/service/api/get')
}

export async function addTodo(todo) {
  return request('/service/api/add', {
    method: 'POST',
    body: JSON.stringify(todo),
  })
}

export async function deleteById(todo) {
  return request('/service/api/delete', {
    method: "POST",
    body: JSON.stringify(todo)
  })
}


export async function getPageTodos(current) {
  const data = request(`/service/api/initData/${current}`)
  return data;
}

export async function deleteByIds(payload) {
  const todos = request.post("/service/api/deleteByIds", {
    method: "POST",
    body: JSON.stringify(payload)
  })
  return todos;
}
