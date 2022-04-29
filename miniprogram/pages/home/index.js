import * as echarts from '../../libs/ec-canvas/echarts'
import pieOptions from '../../config/pieDefOption'
import { showToast } from '../../utils/UIUtil'
import HomeModel from '../../models/home'
const globalEnv = getApp()
Page({
  data: {
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
        console.log(this.data.foodList)
      },
      fail: res => {
        console.log('fail!')
     },
    })
  },
  loadFoodInfom:function(){
    
  },
  onLoad() {
    this.initUserInfo()  
  },
  onShow() {
    // 若初始化id失败则在catch中初始化userId，否则直接获取列表
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
        //this.loadFoodInfom()
        
      })
  },

  onAuthorize(e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
    }
  },

  onReady() {
    const $chart = this.selectComponent('#chart')
    $chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width,
        height
      })
      canvas.setChart(chart)
      this.pie = chart
      this.data.isPieInited = true
      if (this.data.isDataLoaded) {
        this.updatePieOption()
      }
      return chart
    })
  },
  onShareAppMessage() {
    return {
      title: '我在用 UploadHealth 来记录饮食'
    }
  },
  onCancelCreate() {
    this.setData({
      isCreating: false
    })
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

  initUserInfo() {
    HomeModel.getUserInfo().then(
      res => {
        this.setData({
          userInfo: res.userInfo,
          hasCreateUser:true
        })
      },
      err => {
        showToast('请先授权登录')
        console.log(err)
      }
    )
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
      url: './food-detail/food-detail?queryBean='+ queryBean+"&fromSearch="+false
    })
  },


  updatePieOption() {
    const data = HomeModel.serializeForChart(this.data.goalList)
    const { min, max, list } = data
    const option = pieOptions
    option.visualMap.min = min
    option.visualMap.max = max
    option.series[0].data = list
    this.pie.setOption(option)
  }
})
