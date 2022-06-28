import { showToast } from '../../utils/UIUtil'
import HomeModel from '../../models/home'
const globalEnv = getApp()
Page({
  data: {
    showAthoButton:true,
    avatarUrl:' ',
    nickname:' ',
    BF:false,LC:false,DN:false,SN:false,
    pieOpt: {},
    hasCreateUser:false,
    userId:null,
    userInfo: null,
    foodList: null,
    isDataLoaded: false,
    isPieInited: false,
    isCreating: false,
    isUploading: false,
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
  getTodayFoodList:function(){
   wx.cloud.callFunction({
      // 云函数名称
      name: 'getTodayFoodList',//getTodayFoodList
      // 传给云函数的参数
      data: {
        userId:globalEnv.data.userId
      },
      success: res => {
        //console.log(this.data.userId)
        this.setData({
          foodList: res.result.data
        })
        for (let index = 0; index < this.data.foodList.length; index++) {

          var up ='foodList['+index+'].Date'
          var time = new Date(this.data.foodList[index].Date)
          var hour = time.getHours()
          var min = time.getMinutes()
          //console.log(num)
          this.setData({
            [up] : (hour+':'+min),
            foodDetail:this.data.foodDetail
          })
          //BF:false,LC:false,DN:false,SN:false,
          if (this.data.foodList[index].belongsto=='早餐'){
            this.setData({BF:true})
          }
         
          if (this.data.foodList[index].belongsto=='午餐'){
            this.setData({LC:true})
          }
          if (this.data.foodList[index].belongsto=='晚餐'){
            this.setData({DN:true})
          }
          if (this.data.foodList[index].belongsto=='零食'){
            this.setData({SN:true})
          }
          
        }
        console.log(this.data.SN)
        console.log(this.data.foodList)
      },
      fail: res => {
        console.log('fail!')
     },
    })
  },

  onLoad() {
    this.setData({
      nickname:globalEnv.globalData.userInfo.nickName,
      avatarUrl:globalEnv.globalData.userInfo.avatarUrl,
     })
     
     if(globalEnv.globalData.showAthoButton==false){
      this.setData({
        showAthoButton:false
      })
     }
    this.initUserInfo()
  },
  initUserInfo() {
    HomeModel.getUserInfo().then(
      res => {
        this.setData({
          userInfo: res.userInfo
        })
        console.log(this.data.userInfo)
      },
      err => {
        showToast('请先授权登录')
        console.log(err)
      }
    )
  },

  onShow() {
    this.setData({
      nickname:globalEnv.globalData.userInfo.nickName,
      avatarUrl:globalEnv.globalData.userInfo.avatarUrl,
     })
    if(globalEnv.globalData.showAthoButton==false){
      this.setData({
        showAthoButton:false
      })
     }

    this.setData({
     nickname:globalEnv.globalData.userInfo.nickName,
     avatarUrl:globalEnv.globalData.userInfo.avatarUrl,
    })
    //若初始化id失败则在catch中初始化userId，否则直接获取列表
    this.initOpenIdAndUserId()
      .then()
      .catch(err => {
        if (err === 0) {
          this.data.hasCreateUser = true
          return this.initUserId()        
        }
      })
      .then(() => { 
        this.getTodayFoodList()
      })
  },

  onAuthorize(e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
    }
  },


  onShareAppMessage() {
    return {
      title: '我在用 UploadHealth 来记录饮食'
    }
  },


  JumpToAddFoodPage(){
    if (!this.data.userInfo) {
      showToast('请先授权登录')
      return
    }
    wx.navigateTo({
      url: '../../pages/home/addFood/addFood'
    })
  },



  initOpenIdAndUserId() {
    return new Promise((resolve, reject) => {
      HomeModel.getOpenIdAndUserId().then(
        res => {
          const idData = res.result
          console.log(idData)
          globalEnv.data.openid = idData.openId
          if (idData.userId) {
            globalEnv.data.userId = idData.userId
            this.setData({
              userId:globalEnv.data.userId,
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
 
  onFoodClick(e) {
    var queryBean = JSON.stringify(e.currentTarget.dataset.inform)
    wx.navigateTo({
      url: './food-detail/food-detail?queryBean='+ queryBean+"&fromSearch="+0
    })
  },

})
