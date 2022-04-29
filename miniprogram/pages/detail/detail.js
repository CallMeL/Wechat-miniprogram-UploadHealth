// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DataGet:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var queryBean = JSON.parse(options.queryBean);
    console.log(queryBean)
    this.setData({
      foodId:queryBean._id,
      belongsto:queryBean.belongsto
    })
  },

  onReachBottom: function () {

  },


})