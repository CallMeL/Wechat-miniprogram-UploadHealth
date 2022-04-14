// pages/user/editInform/editInform.js
import HomeModel from '../../../models/home'
import { showToast } from '../../../utils/UIUtil'
const globalEnv = getApp()
Page({

  /**
   * 页面的初始数据
   */
  properties: {
    Details:{
      activity:170,
      age:20,
      email:'@example',
      gender:1,
      height:170,
      weight:70
    }
  },
  data: {
    userInfo: null,

  },
  onLoad() {
    HomeModel.getUserInfo().then(
      res => {
        this.setData({
          userInfo: res.userInfo
        })
      },
      err => {
        showToast('请先授权登录')
        console.log(err)
      })
      wx.cloud.database().collection('users')
      .doc(globalEnv.data.userId).get()
     .then(res =>{
      console.log(res.data.details)
        this.setData({
          Details:res.data.details
        })
     })
     
  },
})