// pages/home/food-detail/food-detail.js

const globalEnv = getApp()
Page({ 
  data: {
    temp:[],
    isShow_03: true,
    listData_03:[['1', '2','3', '4','5'],['1/2','1/4'],['碗','克']],
    picker_03_data:[],
    food:Object,
    foodId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var queryBean = JSON.parse(options.queryBean);
    that.setData({
      food: queryBean
    })
    console.log(this.data.food)
    
  },
  showPicker_03: function () {
    this.setData({
      isShow_03: true
    })
  },
  sureCallBack_03 (e) {
    let data = e.detail
    this.setData({
      isShow_03: false,
      picker_03_data: e.detail.choosedData,
      picker_03_index:JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_03 () {
    this.setData({
      isShow_03: false,
    })
  },
})