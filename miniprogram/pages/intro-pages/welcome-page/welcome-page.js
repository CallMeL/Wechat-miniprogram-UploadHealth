
// 获取应用实例
const app = getApp()

Page({
  loadByWechat(){

    wx.getUserProfile({
      desc: 'getusr',
    })
    .then(res=>{
      console.log("",res.userInfo);
      wx.reLaunch({
        url: '/pages/user-pages/user-page?nickName='+res.userInfo.nickName+'&avatarUrl=' +res.userInfo.avatarUrl+res,
      })
      wx/wx.setStorageSync('userInfo', res.userInfo)
    })
    .catch(err=>{
      console.log("reject",err)
    })
  }
})
