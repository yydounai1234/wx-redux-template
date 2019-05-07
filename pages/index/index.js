//index.js
//获取应用实例
const app = getApp()
import {PageConnect} from '../../wx-redux/connect/index.js'
import {toggleTodo,fetchPosts} from '../../wx-redux/redux/actions/actions'
import {getVisibleTodos} from '../../wx-redux/redux/reselect/reselect'
Page(PageConnect({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
}))
