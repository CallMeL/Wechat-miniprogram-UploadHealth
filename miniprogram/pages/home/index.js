import * as echarts from '../../libs/ec-canvas/echarts'
import pieOptions from '../../config/pieDefOption'
import { showToast } from '../../utils/UIUtil'
import HomeModel from '../../models/home'
import TimerState from '../../config/timerState'
import { formatDurationToTimer } from '../../utils/dateTimeUtil'

const globalEnv = getApp()
let pie = null

Page({
  data: {
    pieOpt: {},
    hasCreateUser:false,
    userId:null,
    userInfo: null,
    foodList: null,
    wholeTime: '',
    isDataLoaded: false,
    isPieInited: false,
    isCreating: false,
    isUploading: false,
    timerGoalTitle: '',
    timer: '00:00:00',
    timerState: null
  },
  getTodayFoodList() {
    wx.cloud.callFunction({
      name: 'getTodayFoodList',
      data: {
        ID:this.data.userId
      }
    }).then(res => {
      console.log(this.data.userId)
        this.setData({
          foodList: res.result.data
        })
      console.log(this.data.foodList)       
      })  
    },
    getTodayCustomFood(){
     
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
      })

    this.setTimerTips()
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
 
  onGoalClick(e) {
    const { goalId } = e.currentTarget.dataset

    wx.navigateTo({
      url: `/pages/detail/index?id=${goalId}`
    })
  },

  onJumpToTimerPage() {
    wx.navigateTo({
      url: '/pages/timer/index'
    })
  },

  setTimerTips() {
    const timerInfo = globalEnv.data
    let stateDesc = ''

    switch (timerInfo.timerState) {
      case TimerState.NONE:
        stateDesc = ''
        break
      case TimerState.PAUSE:
        stateDesc = '暂停中'
        this.setData({
          timer: formatDurationToTimer(timerInfo.duration),
          timerGoalId: timerInfo.goalId
        })
        break
      case TimerState.ONGOING:
        stateDesc = '进行中'
        this.setData({
          timer: formatDurationToTimer(timerInfo.duration)
        })
        globalEnv.startTimer(null, null, duration => {
          this.setData({
            timer: formatDurationToTimer(duration),
            timerGoalId: timerInfo.goalId
          })
        })
    }
    this.setData({
      timerState: stateDesc,
      timerGoalTitle: timerInfo.goalTitle
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
