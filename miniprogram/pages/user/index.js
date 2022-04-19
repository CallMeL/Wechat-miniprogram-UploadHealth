// pages/user/index.js
//import { userInfo } from 'os'
import HomeModel from '../../models/home'
import { showToast } from '../../utils/UIUtil'
const globalEnv = getApp()
Page({
  data: {
    userId:null,
    userInfo: null,
    Details:null,

  },
  onLoad() {
    this.initUserInfo()
  },
  onShow() {
    this.initOpenIdAndUserId()
      .then()
      .catch(err => {
        if (err === 0) {
          return this.initUserId()        
        }
      })
    
  },
  initUserInfo() {
    HomeModel.getUserInfo().then(
      res => {
        this.setData({
          userInfo: res.userInfo
        })
        console.log(res.userInfo)
      },
      err => {
        showToast('请先授权登录')
        console.log(err)
      }
    )
  },
  onAuthorize(e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
    }
  },
  initOpenIdAndUserId() {
    return new Promise((resolve, reject) => {
      HomeModel.getOpenIdAndUserId().then(
        res => {
          const idData = res.result
          globalEnv.data.openid = idData.openId
          if (idData.userId) {
            globalEnv.data.userId = idData.userId
            this.setData({
              userId:globalEnv.data.userId
            })
            resolve()
          } else {
            reject(0)
          }
        },
        err => {
          if (err.errCode === -1) {
            showToast('网络不佳，登录失败')
          } else {
            showToast(`登录失败，错误码：${err.errCode}`)
          }
          reject(-1)
        }
      )
    })
  },

  initUserId() {
    return new Promise((resolve, reject) => {
      HomeModel.addUserId().then(
        res => {
          globalEnv.data.userId = res._id
          resolve()
        },
        err => {
          showToast(`添加用户id失败，错误码：${err.errCode}`)
          reject()
        }
      )
    })
  },
  jumptoEditInform(){
    if (!this.data.userInfo) {
      showToast('请先授权登录')
      return
    }
    wx.navigateTo({
      url: `../user/editInform/editInform?id=${this.data.userId}`
    })
  },
  jumptoAddMyFood(){  
    if (!this.data.userInfo) {
      showToast('请先授权登录')
      return
    }
    wx.navigateTo({
      url: `../user/addFood/addFood?id=${this.data.userId}`
    })
  },
  jumptoMyAddFood(){
    //this.getFoodList()
    if (!this.data.userInfo) {
      showToast('请先授权登录')
      return
    }
    //console.log(this.data.userId)
    wx.navigateTo({
      url: `../user/myAddFood/myAddFood?id=${this.data.userId}`
    })
  },
})