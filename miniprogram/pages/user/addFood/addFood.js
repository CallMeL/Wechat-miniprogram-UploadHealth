// pages/home/addFood/addFood.js
import HomeModel from '../../../models/home'
import { showToast } from '../../../utils/UIUtil'
const globalEnv = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    foodName:"",
    list: [{
        inputData: '',
        name: '蛋白质',
        union: '100g',
      }, {
        inputData: '',
        name: '脂肪',
        union: '50g',
      }],
      inputValue: '',
      focusId: '',
      isCreating: false,
  },
  onAddFood() {
    //console.log(this.foodName)
    if (!this.data.foodName) {
      showToast('食物名不能为空')
      return
    }
    wx.cloud.callFunction({
      name: 'createFood',
      data: {
        userId:globalEnv.data.userId,
        foodname:this.data.foodName,
        foodDetail:this.data.list
      },
      success: res => {
        console.log('done!')
        showToast('创建成功', true)
        // this.getGoalList()
        wx.navigateBack({
          delta: 1,
        })
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
  },
    bindFocus: function (event) {
      let id = event.currentTarget.dataset.id
      console.log(id)
      this.setData({
        focusId: id
      })
    },
    inputTitle:function(event){
      //let that = this;
      this.setData({
        foodName: event.detail.value
      })
      //console.log(this.data.foodName)
    },
    bindKeyInput: function (event) {
      let that = this;
      let value = Number(event.detail.value)
      let id = event.currentTarget.dataset.id
      var up = 'list[' + id + '].inputData';
      this.setData({
        [up]:value,
        list:this.data.list
      })
      //console.log(that.data.focusId)
      console.log(that.data.list)
    },
    onInput(e) {
      this.data.inputData = e.detail.value
      this.triggerEvent('input', e.detail.value, {})
    },
    onCancel() {
      wx.navigateBack({
        delta: 1
      })
    },



})