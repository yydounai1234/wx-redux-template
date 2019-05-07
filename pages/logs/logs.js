//logs.js
import {PageConnect} from '../../wx-redux/connect/index.js'
import {toggleTodo,fetchPosts} from '../../wx-redux/redux/actions/actions'
import {getVisibleTodos} from '../../wx-redux/redux/reselect/reselect'
const util = require('../../utils/util.js')

Page(PageConnect({
  data: {
    logs: []
  },
  mapStateToProps(state){
    return {
      todos: state.todos,
      visibilityFilter:getVisibleTodos(state)
    }
  },
  mapDispatchToProps(dispatch){
    return {
      onTodoClick: id => {
        dispatch(toggleTodo(5))
      },
      onAsyncTodoClick: id => {
        dispatch(fetchPosts(5))
      }

    }
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
}))
