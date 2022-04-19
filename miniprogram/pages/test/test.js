// pages/test/test.js
import Promisify from '../../utils/Promisify'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
    showLoginBtn: false,
    list:[
        {
           name:'嘻嘻1',
           task_startTime:'2020/12/03 12:56',
           task_endTime:'2020/12/03 15:56',
           work_hours:'3.0',
           money:0
         },
         {
          name:'嘻嘻2',
          task_startTime:'2020/12/03 12:56',
          task_endTime:'2020/12/03 15:56',
          work_hours:'3.0',
          money:0
        },
        {
          name:'嘻嘻3',
          task_startTime:'2020/12/03 12:56',
          task_endTime:'2020/12/03 15:56',
          work_hours:'3.0',
          money:0
        }
        
       ],
    inputValue: '',
    focusId: ''
   },
   onLoad: function () {
    // 获取用户授权，更新用户昵称与头像
    Promisify(wx.getUserInfo)()
      .then(this._updateUserInfo)
      .catch(() => this.setData({showLoginBtn: true}))
  },
  onClickLoginBtn: function (e) {
    let { errMsg } = e.detail
    if (errMsg.indexOf('fail') === -1) {
      this._updateUserInfo(e.detail).then(() => {
        this.setData({showLoginBtn: false})
      })
      wx.showToast({title: '授权成功'})
    }
  },
  _updateUserInfo: function (userInfo) {
    return updateUserInfoById(getUID(), {
      nickname: userInfo.userInfo.nickName,
      avatar: userInfo.userInfo.avatarUrl
    }).then(res => app.setUserInfo(res))
  }
  
})