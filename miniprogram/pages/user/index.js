// pages/user/index.js
//import { userInfo } from 'os'
import HomeModel from '../../models/home'
import { showToast } from '../../utils/UIUtil'
const globalEnv = getApp()

Page({
  data: {
    showAthoButton:true,
    userId:null,
    userInfo: null,
    Details:null,
  },
  getUserProfile: function (e) {
    wx.getUserProfile({
      desc: '业务需要',
      success: res => {
        var jsonStr = res.rawData .replace(" ", "")
        if (typeof jsonStr != 'object') {

        jsonStr = jsonStr.replace(/\ufeff/g, "");
        var jj = JSON.parse(jsonStr);
        console.log(jj)
        }      
        this.setData({
          avatarUrl:jj.avatarUrl,
          nickname:jj.nickName,
          userInfo: jj,
          showAthoButton: false
        })
        globalEnv.globalData.userInfo = jj
        try {
          wx.setStorageSync('avatarUrl', jj.avatarUrl)
          wx.setStorageSync('nickName', jj.nickName)
          console.log("storage done")
        } catch (e) { console.log(e)}
      }
    })
  },
  onLoad() {
    if(globalEnv.globalData.showAthoButton==false){
      this.setData({
        showAthoButton:false
      })
     }
    console.log(globalEnv.globalData.userInfo)
    this.setData({
      userInfo:globalEnv.globalData.userInfo
     })
     this.setData({
      nickname:globalEnv.globalData.userInfo.nickName,
      avatarUrl:globalEnv.globalData.userInfo.avatarUrl,
     })

  },
  onShow() {
    if(globalEnv.globalData.showAthoButton==false){
      this.setData({
        showAthoButton:false
      })
     }
    this.setData({
      nickname:globalEnv.globalData.userInfo.nickName,
      avatarUrl:globalEnv.globalData.userInfo.avatarUrl,
     })
    console.log(globalEnv.globalData.userInfo)
   this.setData({
    userInfo:globalEnv.globalData.userInfo
   })
    
  },
  // initUserInfo() {
  //   HomeModel.getUserInfo().then(
  //     res => {
  //       this.setData({
  //         userInfo: res.userInfo
  //       })
  //       console.log(res.userInfo)
  //     },
  //     err => {
  //       showToast('请先授权登录')
  //       console.log(err)
  //     }
  //   )
  // },
  // onAuthorize(e) {
  //   if (e.detail.userInfo) {
  //     this.setData({
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },
  // initOpenIdAndUserId() {
  //   return new Promise((resolve, reject) => {
  //     HomeModel.getOpenIdAndUserId().then(
  //       res => {
  //         const idData = res.result
  //         globalEnv.data.openid = idData.openId
  //         if (idData.userId) {
  //           globalEnv.data.userId = idData.userId
  //           this.setData({
  //             userId:globalEnv.data.userId
  //           })
  //           resolve()
  //         } else {
  //           reject(0)
  //         }
  //       },
  //       err => {
  //         if (err.errCode === -1) {
  //           showToast('网络不佳，登录失败')
  //         } else {
  //           showToast(`登录失败，错误码：${err.errCode}`)
  //         }
  //         reject(-1)
  //       }
  //     )
  //   })
  // },

  // initUserId() {
  //   return new Promise((resolve, reject) => {
  //     HomeModel.addUserId().then(
  //       res => {
  //         globalEnv.data.userId = res._id
  //         resolve()
  //       },
  //       err => {
  //         showToast(`添加用户id失败，错误码：${err.errCode}`)
  //         reject()
  //       }
  //     )
  //   })
  // },
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
    if (!this.data.userInfo) {
      showToast('请先授权登录')
      return
    }
    wx.navigateTo({
      url: `../user/myAddFood/myAddFood?id=${this.data.userId}`
    })
  },
  jumptoAdvice(){
    //this.getFoodList()
    if (!this.data.userInfo) {
      showToast('请先授权登录')
      return
    }
    //console.log(this.data.userId)
    wx.navigateTo({
      url: `../user/advice/index?id=${this.data.userId}`
    })
  },

})