import { CLOUD_ENV_ID } from './config'

App({
  globalData:{
    electedIndex: 0
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

    this.data = {
      timerId: -1,
      goalId: '',
      goalTitle: '',
      duration: 0,
      beginDate: 0,
      pauseDate: 0,
      pauseDuration: 0
    }
  },
})
