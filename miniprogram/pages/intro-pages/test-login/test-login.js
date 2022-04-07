// pages/intro-pages/test-login/test-login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  loadByWechat(){
    wx.cloud.callFunction({
      name:"getUserInfor",
      success(res){
        console.log("success",res.result.openid)
      },
      fail(res){
        console.log("fail",res)
      }
    })
  }
})