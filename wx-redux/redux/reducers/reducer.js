import { combineReducers } from '../../src/index'
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
  } from '../actions/actions'
  const { SHOW_ALL } = VisibilityFilters
  
  function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return action.filter
      default:
        return state
    }
  }
  
  function todos(state = 1, action) {
    switch (action.type) {
      case ADD_TODO:
        return ++state
      case TOGGLE_TODO:
        return --state
      default:
        return state
    }
  }
  
  const todoApp = combineReducers({
    visibilityFilter,
    todos
  })
  
  export default todoApp