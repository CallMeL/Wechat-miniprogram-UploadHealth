import { showToast} from '../../../utils/UIUtil'
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
  this.data.userId = globalEnv.data.userId
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
      console.log(this.data.foodList)
      
    })
  
},
editFood(e) {
  const item = JSON.stringify(e.currentTarget.dataset)
  wx.navigateTo({
    url:`../addFood/addFood?item=${item}`
  })
},
deleteFood(e){
  var that = this
  wx.showModal({
    title: '提示',
    content: '是否确定删除',
    success (res) {
      if (res.confirm) {
        wx.cloud.callFunction({
          name:'deleteCustomFood',
          data:{
            foodId:e.currentTarget.dataset.id
          },
          success: res => {
            console.log('done!')
            showToast('删除成功', true)
            that.getFoodList()
          },
          fail: res => {
            console.log('fail!')
            showToast('删除失败',false)
         },
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  //console.log(e.currentTarget.dataset)

}
})