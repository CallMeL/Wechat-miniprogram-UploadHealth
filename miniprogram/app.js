import { CLOUD_ENV_ID } from './config'

App({
  globalData:{
    userInfo : {"nickName":"你好","avatarUrl":" "},
    showAthoButton:false,
    electedIndex: 0
  },
  data:{
    openid:""
  },
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: CLOUD_ENV_ID
      })
    }
    try {
      this.globalData.userInfo.nickName = wx.getStorageSync('nickName')
      this.globalData.userInfo.avatarUrl = wx.getStorageSync('avatarUrl')
      if (this.globalData.userInfo.avatarUrl == "") {
        this.globalData.showAthoButton=true
        this.globalData.userInfo.nickName = "用户您好"
        this.globalData.userInfo.avatarUrl = "https://636c-cloud1-6gaunktybd5c7902-1310837650.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2022-06-28%2019.03.05.png?sign=1de464542c43ddd19f7d121322eb2694&t=1656414206"
      }
      console.log(this.globalData.userInfo)
    } catch (e) {
      this.globalData.showAthoButton=true
      console.log(e)
    }
    console.log(this.globalData.showAthoButton)
  },
  

})
