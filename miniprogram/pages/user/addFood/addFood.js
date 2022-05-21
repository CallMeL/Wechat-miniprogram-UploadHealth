
import { showToast } from '../../../utils/UIUtil'
const globalEnv = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    foodId:null,
    date:null,
    foodName:null,
    foodImage:" ",
    list: [{
        value: '100',
        name: '热量',
        unit: '千卡',
      }, {
        value: '10',
        name: '脂肪',
        unit: '克',
      }, {
        value: '50',
        name: '碳水化合物',
        unit: '克',
      }, {
        value: '20',
        name: '蛋白质',
        unit: '克',
      }   
    ],
      inputValue: '',
      focusId: '',
      isCreating: false,
  },
  onLoad: function (options){
    if(options.item){
      var item = JSON.parse(options.item);
      this.setData({
        foodName:item.item.name,
        foodId:item.item._id,
        date:item.item.createDate,
        list:item.item.detail
      })
    }
    
  },
  onAddFood() {
    //console.log(this.foodName)
    if (!this.data.foodName) {
      showToast('食物名不能为空')
      return
    }
    if(this.data.foodId){
      wx.cloud.callFunction({
        name:'editCustomFood',
        data:{
          foodId:this.data.foodId,
          fat:this.data.list[1],
          cho:this.data.list[2],
          kcal:this.data.list[0],
          foodname:this.data.foodName,
          foodDetail:this.data.list
        },
        success: res => {
          console.log('done!')
          showToast('修改成功', true)
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
    }else{
      wx.cloud.callFunction({
        name: 'createFood',
        data: {
          userId:globalEnv.data.userId,
          fat:this.data.list[1],
          cho:this.data.list[2],
          kcal:this.data.list[0],
          
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
    }

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
      var up = 'list[' + id + '].value';
      this.setData({
        [up]:value,
        list:this.data.list
      })
      //console.log(that.data.focusId)
      console.log(that.data.list)
    },
    onInput(e) {
      this.data.value = e.detail.value
      this.triggerEvent('input', e.detail.value, {})
    },
    onCancel() {
      wx.navigateBack({
        delta: 1
      })
    },



})