
export default class HomeModel {
  static getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: res => {
                resolve(res)
              }
            })
          } else {
            reject(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
  static removeRecord(recordId) {
    console.log(recordId)
    return wx.cloud.callFunction({
      name: 'removeRecord',
      data: { recordId }
    })
  }
  static getOpenIdAndUserId() {
    return wx.cloud.callFunction({
      name: 'login',
      data: {}
    })
  }

  static addUserId() {
    return wx.cloud.callFunction({
      name: 'addUser',
      data: null
    })
  }
  static addFood(userId, foodname,foodDetail) {
    return  wx.cloud.callFunction({
      name: 'createFood',
      data: {
        userId,
        foodname,
        foodDetail
      },
      success: res => {
        console.log('done!')
      },
      fail: res => {
        console.log('fail!')
              },
    })
  }
  

}
