// pages/user/myAddFood/myAddFood.js
const globalEnv = getApp()
Page({

  data: {
    userId:null,
    foodList:null,
  },
onLoad:function(){
  this.setData({
    userId: globalEnv.data.userId
  }) 
},
  onShow: function () {
    this.getFoodList()
  },

getFoodList(){
  wx.cloud.callFunction({
    name: 'getCustomFoodList',
    data: {
      userId:this.data.userId
    }
  }).then(res => {
      this.setData({
        foodList: res.result.data
      })
      console.log(this.data.foodList)
    })
  
},
onFoodClick(e) {
  const { goalId } = e.currentTarget.dataset
  wx.navigateTo({
    url: `/pages/detail/index?id=${goalId}`
  })
},
})