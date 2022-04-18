// pages/user/myAddFood/myAddFood.js
const globalEnv = getApp()
Page({

  data: {
    userId:null,
    foodList:null,
  },
onLoad: function(options) {
    this.data.userId = options.id
    //console.log(this.data.userId)
    this.getFoodList()
},

onShow: function () {
    this.getFoodList()
},

getFoodList(){
  wx.cloud.callFunction({
    name: 'getCustomFoodList',
    data: {
      ID:this.data.userId
    }
  }).then(res => {
      this.setData({
        foodList: res.result.data
      })
      console.log(this.data.userId)
      
    })
  
},
onFoodClick(e) {
  const { goalId } = e.currentTarget.dataset
  wx.navigateTo({
    url: `/pages/detail/index?id=${goalId}`
  })
},
})