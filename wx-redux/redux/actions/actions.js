/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

/*
 * 异步action
 */

export function fetchPosts(parmes) {
  return function (dispatch) {
    console.log("开始请求")
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    }).then(() => {
      console.log("请求成功")
      dispatch(toggleTodo())
    })
  }
}