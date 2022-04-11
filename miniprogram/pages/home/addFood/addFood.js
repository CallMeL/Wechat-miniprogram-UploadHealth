// pages/home/addFood/addFood.js
import HomeModel from '../../../models/home'
import { showToast } from '../../../utils/UIUtil'
const globalEnv = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCreating: false,
  },
  /**点击“添加食物按钮“ */
  onCreateFood(){
    this.setData({
      isCreating: true  
    })
  },
  /**点击“取消” 弹窗消失 */
  onCancelCreate() {
    this.setData({
      isCreating: false
    })
  },
  onAddFood(e) {
    const foodInform = e.detail
    const foodName = foodInform.foodName
    const foodDetail = foodInform.list
    console.log(foodName)
    console.log(foodDetail)
    if (!foodInform.foodName) {
      showToast('食物名不能为空')
      return
    }
    if (this.data.isUploading) {
      return
    }
    this.data.isUploading = true
    wx.cloud.callFunction({
      name: 'createFood',
      data: {
        userId:globalEnv.data.userId,
        foodname:foodName,
        foodDetail:foodDetail
      },
      success: res => {
        console.log('done!')
        this.setData({
          isCreating: false
        })
        this.data.isUploading = false
        showToast('创建成功', true)
        // this.getGoalList()
      },
      fail: res => {
        console.log('fail!')
        this.setData({
          isCreating: false,
          isUploading: false
        })
        showToast('创建失败')
     },
    })
/**
        HomeModel.addFood(globalEnv.data.userId, foodName,foodDetail).then(
      res => {
        this.setData({
          isCreating: false
        })
        this.data.isUploading = false
        showToast('创建成功', true)
       // this.getGoalList()
      },
      err => {
        this.setData({
          isCreating: false,
          isUploading: false
        })
        showToast('创建失败')
      }
    )
 */


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})